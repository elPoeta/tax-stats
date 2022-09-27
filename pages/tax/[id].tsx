import { PostgrestError } from "@supabase/supabase-js";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "../../components/common/Loader";
import { useTheme } from "../../context/theme/useTheme";
import supabase from "../../supabase/supabaseClient";

import {Doughnut } from 'react-chartjs-2'
import  { Chart, ArcElement, ChartOptions, Title, Tooltip, Legend   } from 'chart.js'

Chart.register(ArcElement, Title, Tooltip, Legend);

const fetchData = async (id:string) => {
  const year = new Date().getFullYear();
  const rpcParams:[string, object] = id == '0' ?
   ["all_tax_by_year",{ year_tax: year }] : 
   ["tax_by_year_and_by_id",{ year_tax: year, tax_type_id: id }];
  const {data: taxes, error} = await getRows(rpcParams);
  return { taxes, error };
}
const getRows = async (rpcParams:[string, object]) => {
  const [fn, obj] = rpcParams;
  const { data, error } = await supabase.rpc(fn, obj);
  return { data, error};
}

const ViewTax = ({taxes, error }:{taxes: [{id: number, amount: number, date: string, name: string}], error: PostgrestError | null }) => {
  const {state:{colorTheme}} = useTheme();
  const router = useRouter();
  const { id }  = router.query;

  console.log("TAXES ",taxes)
   if(error) {
    toast.error(error.message, {
      autoClose: 3000,
      theme: colorTheme === 'dark' ? 'dark' : 'light'
    });
   }

const data = {
 labels: taxes.map(tax => tax.date || tax.name ),
 datasets: [{
 label: 'dataset',
 data: taxes.map(tax => tax.amount ),
 backgroundColor: [
 'rgba(255, 99, 132, 0.8)',
 'rgba(255, 159, 64, 0.8)',
 'rgba(255, 205, 86, 0.8)',
 'rgba(75, 192, 192, 0.8)',
 'rgba(54, 162, 235, 0.8)',
 'rgba(153, 102, 255, 0.8)',
 'rgba(201, 203, 207, 0.8)'

 ],
 borderColor: [
 'rgb(255, 99, 132)',
 'rgb(255, 159, 64)',
 'rgb(255, 205, 86)',
 'rgb(75, 192, 192)',
 'rgb(54, 162, 235)',
 'rgb(153, 102, 255)',
 'rgb(201, 203, 207)'

        ],
 borderWidth: 2
    }],
    
}
const config: ChartOptions = {
 
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart'
      },
      tooltip: {
        enabled: true
      }
    }
  
};
  return (
    <div className='flex items-center justify-center'>
      <div className="w-[300px] h-[300px] ">

     <Doughnut
     data={data}
     options={config}
     />
     </div>
  
    </div>
  );
};

export default ViewTax;

export async function getServerSideProps({query}:{query:NextApiRequestQuery}) {
  const { id } = query;
  if(!id)   return { props: { taxes: [], error: null } }
  const { taxes, error } = await fetchData(id as string);
  return { props: { taxes, error} }
}