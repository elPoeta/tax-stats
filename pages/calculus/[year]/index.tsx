import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

const Year = () => {
  const router = useRouter();
  const { year } = router.query;
  const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const countMonths = year  === (new Date().getFullYear()).toString() ? new Date().getMonth() + 1 : 12;
  const CURRENT_MONTHS = Array.from({ length: countMonths }, (_, index) => MONTHS[index]);
  return (
    <section>
    <h2 className="text-3xl font-bold p-2 text-center">Cálculos - {year}</h2>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:container lg:my-0 lg:mx-auto p-3">
      {CURRENT_MONTHS.map((month) => (
       <Link  key={month} href={`/calculus/${year}/${month.toLowerCase()}`} >
        <a className="p-3 rounded-md border-2 border-[#0ea5e9] flex items-center justify-evenly cursor-pointer font-bold">
          <CalendarDaysIcon className="w-8 h-8 fill-[#0ea5e9]" />
          <span className="text-xl">{month}</span>
        </a>
        </Link>
      ))}
    </div>
  </section>
  )
}

export default Year