import { PostgrestError } from "@supabase/supabase-js";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../../context/theme/useTheme";
import supabase from "../../supabase/supabaseClient";
import { ITax } from "../../interfaces/ITax";
import { DynamicChart } from "../../components/chart/DynamicChart";
import { formatDate } from "../../utils/dateUtils";
import {PowerIcon} from '@heroicons/react/24/solid';
import { fetchByYearAndTaxTypeId } from "../../services/rpcQuerys";

const ViewTax = ({
  taxes,
  error,
}: {
  taxes: ITax[];
  error: PostgrestError | null;
}) => {
  const {
    state: { colorTheme },
  } = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const [currentChart, setCurrentChart] = useState("DOUGHNUT");
  const [label, setLabel] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [title, setTitle] = useState<string>(
    id == "0"
      ? `Servicios - ${label}`
      : `${!taxes.length ? "" : taxes[0].name} - ${label}`
  );
  const [dateForm, setDateForm] = useState({
    from: formatDate(),
    to: formatDate(),
    enableRodri: false,
    enableLeo: false
  });
  const [minMaxDate, setMinMaxDate] = useState({
    max: formatDate(new Date(new Date(dateForm.from).setMonth(new Date(dateForm.from).getMonth()+12))),
    min: formatDate()
  });
  // const minDate = new Date()
  // const maxDate = new Date(minDate.setMonth(minDate.getMonth()+12));
  console.log("TAXES ", taxes);
  if (error) {
    toast.error(error.message, {
      autoClose: 3000,
      theme: colorTheme === "dark" ? "dark" : "light",
    });
  }

  const handleChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentChart(ev.target.value);
  };

  const handleDate = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = ev.target;
    setDateForm(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  };
useEffect(() => {
  setMinMaxDate({
     min: formatDate(new Date(dateForm.from)),
     max: formatDate(new Date(new Date(dateForm.from).setMonth(new Date(dateForm.from).getMonth()+12)))
  });
  
},[dateForm]);

  const chart = () => (
    <>
      {!taxes.length ? (
        <h2 className="text-2xl p-2">No hay datos.</h2>
      ) : (
        <DynamicChart
          type={currentChart}
          id={id as string}
          taxes={taxes}
          label={label}
          title={title}
        />
      )}
    </>
  );

  return (
    <div className="flex items-center justify-center flex-col">
      {chart()}
      <div className="pt-5">
        {taxes.length > 0 && (
          <div>
            <div className="flex items-center justify-center">

            <label htmlFor="chartSelection">
              Chart:
            <select
              className="dark:bg-slate-800 rounded-full border-2 border-blue-400 p-2 ml-1"
              id="chartSelection"
              name="chartSelection"
              value={currentChart}
              onChange={handleChange}
              >
              {["DOUGHNUT", "PIE", "BAR", "LINE", "POLAR", "RADAR"].map(
                (type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                )
                )}
            </select>
            </label>
           </div>
            <div className="flex m-3 flex-row items-center justify-evenly">
              <label htmlFor="from" className="px-1">
                From:
                <input
                  className="dark:bg-slate-800 rounded-full border-2 border-blue-400 p-2"
                  type="date"
                  id="from"
                  name="from"
                  value={dateForm.from}
                  onChange={handleDate}
                  max={formatDate()}
                  min={formatDate(new Date('2022-01-01'))}
                />
              </label>
              <label htmlFor="to" className="px-1">
                To:
                <input
                 className="dark:bg-slate-800 rounded-full border-2 border-blue-400 p-2"
                  type="date"
                  id="to"
                  name="to"
                  value={dateForm.to}
                  onChange={handleDate}
                  min={minMaxDate.min}
                  max={minMaxDate.max}
                />
              </label>
            </div> 
            { id == '0' &&
              <div>
              <div>
                <span>Enable Rodri</span>
                <PowerIcon className={`w-6 h6 cursor-pointer ${dateForm.enableRodri ? 'fill-green-400' : 'fill-red-500'}`}  onClick={() => setDateForm(prev => { return {...prev, enableRodri: !prev.enableRodri}})}/>
              </div>
              <div>
                <span>Enable Leo</span>
                <PowerIcon className={`w-6 h6 cursor-pointer ${dateForm.enableLeo ? 'fill-green-400' : 'fill-red-500'}`}  onClick={() => setDateForm(prev => { return {...prev, enableLeo: !prev.enableLeo}})}/>
              </div>
              </div>
              }
            <button>Search</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTax;

export async function getServerSideProps({
  query,
}: {
  query: NextApiRequestQuery;
}) {
  const { id } = query;
  if (!id) return { props: { taxes: [], error: null } };
  const { taxes, error } = await fetchByYearAndTaxTypeId(id as string);
  return { props: { taxes, error } };
}
