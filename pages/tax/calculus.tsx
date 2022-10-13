import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

const Calculus = () => {
  const FIRST_YEAR = 2022;
  const countYears = new Date().getFullYear() - 2022 + 1;
  const [years, setYears] = useState(
    Array.from({ length: countYears }, (_, index) => index + FIRST_YEAR)
  );

  return (
    <section>
      <h2 className="text-3xl font-bold p-2 text-center">Tax Calculus</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:container lg:my-0 lg:mx-auto p-3">
        {years.map((year) => (
          <div
            key={year}
            className="p-3 rounded-md border-2 border-[#0ea5e9] flex items-center justify-evenly cursor-pointer font-bold"
          >
            <CalendarDaysIcon className="w-8 h-8 fill-[#0ea5e9]" />
            <span className="text-xl">{year}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Calculus;
