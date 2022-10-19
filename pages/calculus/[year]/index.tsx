import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { getMonth } from '../../../utils/dateUtils';

const Year = () => {
  const router = useRouter();
  const { year } = router.query;
  const countMonths = year  === (new Date().getFullYear()).toString() ? new Date().getMonth() + 1 : 12;
  const CURRENT_MONTHS = Array.from({ length: countMonths }, (_, index) => getMonth(index)!.MM);
  return (
    <section>
    <h2 className="text-3xl font-bold p-2 text-center">Cálculos - {year}</h2>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:container lg:my-0 lg:mx-auto p-3">
      {CURRENT_MONTHS.map((month) => (
       <Link  key={month} href={`/calculus/${year}/${month.toLowerCase()}`} >
        <a className="p-2 rounded-md border-2 border-[#0ea5e9] flex items-center justify-center cursor-pointer font-bold">
          <CalendarDaysIcon className="w-6 h-6 fill-[#0ea5e9]" />
          <span className="text-xl px-2">{month}</span>
        </a>
        </Link>
      ))}
      <Link  key="anual" href={`/calculus/${year}/anual`} >
        <a className="p-3 rounded-md border-2 border-[#0ea5e9] flex items-center justify-center cursor-pointer font-bold col-span-full">
          <CalendarDaysIcon className="w-8 h-8 fill-[#0ea5e9]" />
          <span className="text-xl px-2">Anual</span>
        </a>
        </Link>
    </div>
  </section>
  )
}

export default Year