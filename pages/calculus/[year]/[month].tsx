import { PostgrestError } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { NextRequest } from 'next/server';
import React from 'react'
import { toast } from 'react-toastify';
import { useTheme } from '../../../context/theme/useTheme';
import { ITax } from '../../../interfaces/ITax';
import { fetchTaxesByMonthAndYear } from '../../../services/rpcQuerys';
import { getMonthNumber } from '../../../utils/dateUtils';

const Month = ({
  taxes,
  year,
  month,
  error,
}: {
  taxes: ITax[];
  year: string;
  month: string;
  error: PostgrestError | null;
})=> {
  const {
    state: { colorTheme },
  } = useTheme();

  if (error) {
    toast.error(error.message, {
      autoClose: 3000,
      theme: colorTheme === "dark" ? "dark" : "light",
    });
  }

  console.log(taxes)

  return (
    <div>
      <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold capitalize text-center py-2'>{month} - {year}</h2>
      <div className='grid '></div>
    </div>
  )
}

export default Month

export async function getServerSideProps({ req }:{ req:NextRequest}) {
 const paramsString = req.url.split('?')[1];
 const params = new URLSearchParams(paramsString);
 if(!params.has('year') || !params.has('month')) {
  return {
    props: {
      taxes: [],
      year: '',
      month: '',
      error: null
    }
  }
 }
 const y = params.get('year') || '2022';
 const m = params.get('month') || 'enero';
 const year = parseInt(y);
 const month = getMonthNumber(m).n;
 const {taxes, error} = await fetchTaxesByMonthAndYear({ year, month });
 if(error) {
  return {
    props: {
      taxes: [],
      error: error,
      year: y,
      month: m
    }
  }
 }
  return {
     props: {
      taxes,
      year: y,
      month: m,
      error: null
     }
  }
}
