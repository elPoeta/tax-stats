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


const fetchData = async (id: string) => {
  const year = new Date().getFullYear();
  const rpcParams: [string, object] =
    id == "0"
      ? ["all_tax_by_year", { year_tax: year }]
      : ["tax_by_year_and_by_id", { year_tax: year, id_tax_type: id }];
  const { data: taxes, error } = await getRows(rpcParams);
  return { taxes, error };
};
const getRows = async (rpcParams: [string, object]) => {
  const [fn, obj] = rpcParams;
  const { data, error } = await supabase.rpc(fn, obj);
  return { data, error };
};

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
            <select
              className="dark:bg-slate-800 rounded-full border-2 border-blue-400 p-2"
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
            <div className="flex m-3 flex-col">
              <label htmlFor="from">
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
              <label htmlFor="to">
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
              { id == '0' &&
              <>
              <div>
                <span>Enable Rodri</span>
                <PowerIcon className={`w-6 h6 cursor-pointer ${dateForm.enableRodri ? 'fill-green-400' : 'fill-red-500'}`}  onClick={() => setDateForm(prev => { return {...prev, enableRodri: !prev.enableRodri}})}/>
              </div>
              <div>
                <span>Enable Leo</span>
                <PowerIcon className={`w-6 h6 cursor-pointer ${dateForm.enableLeo ? 'fill-green-400' : 'fill-red-500'}`}  onClick={() => setDateForm(prev => { return {...prev, enableLeo: !prev.enableLeo}})}/>
              </div>
              </>
              }
            </div> 
            <pre>
              
            {JSON.stringify(dateForm, null, 2)}
            </pre>
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
  const { taxes, error } = await fetchData(id as string);
  return { props: { taxes, error } };
}
