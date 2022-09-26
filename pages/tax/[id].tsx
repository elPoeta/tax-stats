import { PostgrestError } from "@supabase/supabase-js";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "../../components/common/Loader";
import { useTheme } from "../../context/theme/useTheme";
import supabase from "../../supabase/supabaseClient";

const getRows = async (rpcParams:[string, object]) => {
  const [fn, obj] = rpcParams;
  const { data, error } = await supabase.rpc(fn, obj);
  return { data, error};
}

const ViewTax = ({taxes, error}:{taxes: [], error: PostgrestError | null }) => {
  const {state:{colorTheme}} = useTheme();
  console.log("TAXES ",taxes)
  
  return (
    <div>

     {JSON.stringify(taxes)}
  
    </div>
  );
};

export default ViewTax;

export async function getServerSideProps({query}:{query:NextApiRequestQuery}) {
  const { id } = query;
  if(!id)   return { props: { taxes: [], error: null } }
  const year = new Date().getFullYear();
  const rpcParams:[string, object] = id == '0' ?
   ["all_tax_by_year",{ year_tax: year }] : 
   ["tax_by_year_and_by_id",{ year_tax: year, tax_type_id: id }];
  const {data: taxes, error} = await getRows(rpcParams);
  return { props: { taxes, error} }
}