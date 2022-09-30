import { PostgrestError } from "@supabase/supabase-js";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../../context/theme/useTheme";
import supabase from "../../supabase/supabaseClient";
import { ITax } from "../../interfaces/ITax";
import { DynamicChart } from "../../components/chart/DynamicChart";

const fetchData = async (id: string) => {
  const year = new Date().getFullYear();
  const rpcParams: [string, object] =
    id == "0"
      ? ["all_tax_by_year", { year_tax: year }]
      : ["tax_by_year_and_by_id", { year_tax: year, tax_type_id: id }];
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
