import { useRouter } from 'next/router';
import { NextRequest } from 'next/server';
import React from 'react'
import { fetchTaxesByMonthAndYear } from '../../../services/rpcQuerys';
import { getMonthNumber } from '../../../utils/dateUtils';

const Month = () => {
  const router = useRouter();
  const { month } = router.query;
  return (
    <div>{month}</div>
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
      error: 'missing param'
    }
  }
 }
 const y = params.get('year') || '2022';
 const m = params.get('month') || 'enero';
 const year = parseInt(y);
 const month = getMonthNumber(m).n;
 const {taxes, error} = await fetchTaxesByMonthAndYear({ year, month });
 console.log('TAXES ',taxes)
  return {
     props: {
      taxes,
      error: ''
     }
  }
}
