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
  const [currentChart, setCurrentChart] = useState("DOUGHNUT");
  const router = useRouter();
  const { id } = router.query;

  console.log("TAXES ", taxes);
  if (error) {
    toast.error(error.message, {
      autoClose: 3000,
      theme: colorTheme === "dark" ? "dark" : "light",
    });
  }

  const chart = () => (
    <DynamicChart type={currentChart} id={id as string} taxes={taxes} />
  );

  return <div className="flex items-center justify-center">{chart()}</div>;
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
