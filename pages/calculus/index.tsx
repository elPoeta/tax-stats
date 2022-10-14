import { CalendarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Calculus = () => {
  const FIRST_YEAR = 2022;
  const countYears = new Date().getFullYear() - 2022 + 1;
  const YEARS = Array.from({ length: countYears }, (_, index) => index + FIRST_YEAR)
  

  return (
    <section>
      <h2 className="text-3xl font-bold p-2 text-center">Cálculos</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:container lg:my-0 lg:mx-auto p-3">
        {YEARS.map((year) => (
         <Link  key={year} href={`/calculus/${year}`} >
          <a className="p-3 rounded-md border-2 border-[#0ea5e9] flex items-center justify-evenly cursor-pointer font-bold">
            <CalendarIcon className="w-8 h-8 fill-[#0ea5e9]" />
            <span className="text-xl">{year}</span>
          </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Calculus;
