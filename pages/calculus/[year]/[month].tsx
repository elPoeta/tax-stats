import { PostgrestError } from "@supabase/supabase-js";
import React from "react";
import { toast } from "react-toastify";
import { useTheme } from "../../../context/theme/useTheme";
import { ITax } from "../../../interfaces/ITax";
import { fetchAllByYear, fetchTaxesByMonthAndYear } from "../../../services/rpcQuerys";
import { getMonthNumber } from "../../../utils/dateUtils";

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
}) => {
  const {
    state: { colorTheme },
  } = useTheme();

  if (error) {
    toast.error(error.message, {
      autoClose: 3000,
      theme: colorTheme === "dark" ? "dark" : "light",
    });
  }

  const total = () =>
    taxes
      .filter((t) => t.tax_type_id !== 8 && t.tax_type_id !== 9)
      .reduce((acc, t) => acc + t.amount, 0);

  const totalRL = (id: number) => {
    const index = taxes.findIndex((t) => t.tax_type_id === id);
    if (index < 0) return (total() / 2).toFixed(2);
    return (total() / 2 + taxes[index].amount).toFixed(2);
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold capitalize text-center py-2">
        {month} - {year}
      </h2>
      <div className="flex flex-col border-t-2 border-l-2 border-r-2 rounded-md border-[#0ea5e9] w-[100%] md:w-[80%] lg:w-[60%] container my-0 mx-auto">
        <div className="grid grid-cols-[10%_50%_40%] text-xl items-center justify-center border-b-2 border-[#0ea5e9] font-bold text-[#0ea5e9] h-[40px]">
          <h4 className="h-[40px] border-r-2  border-[#0ea5e9] text-center flex items-center justify-center">
            Id
          </h4>
          <h4 className="h-[40px] border-r-2  border-[#0ea5e9] text-center flex items-center justify-center">
            Servicio
          </h4>
          <h4 className="h-[40px] text-center flex items-center justify-center">
            Monto
          </h4>
        </div>

        {taxes
          .sort((a, b) => a.tax_type_id - b.tax_type_id)
          .map((tax) => (
            <div
              key={tax.tax_type_id}
              className="grid grid-cols-[10%_50%_40%] text-xl items-center justify-center border-b-2 border-[#0ea5e9] rounded-md font-semibold"
            >
              <h4 className="h-[40px] border-r-2  border-[#0ea5e9] text-center flex items-center justify-center">
                {tax.tax_type_id}
              </h4>
              <h4 className="h-[40px] border-r-2  border-[#0ea5e9] text-center flex items-center justify-center">
                {tax.name}
              </h4>
              <h4 className="h-[40px] text-center flex items-center justify-center">
                {tax.amount}
              </h4>
            </div>
          ))}
      </div>
      <div className="mt-3 mb-5 flex flex-col border-t-2 border-l-2 border-r-2 rounded-md border-[#0ea5e9] w-[100%] md:w-[80%] lg:w-[60%] container my-0 mx-auto">
        <div className="grid grid-cols-[60%_40%] text-xl items-center justify-center border-b-2 border-[#0ea5e9] font-bold text-[#0ea5e9] h-[40px]">
          <h4 className="h-[40px] border-r-2  border-[#0ea5e9] text-center flex items-center justify-center">
            Totales
          </h4>
          <h4 className="h-[40px] text-center flex items-center justify-center">
            Monto
          </h4>
        </div>
        <div className="grid grid-cols-[60%_40%] text-xl items-center justify-center border-b-2 border-[#0ea5e9] rounded-md font-semibold">
          <h4 className="h-[40px] border-r-2  border-[#0ea5e9] text-center flex items-center justify-center">
            Total
          </h4>
          <h4 className="h-[40px] text-center flex items-center justify-center">
            {total().toFixed(2)}
          </h4>
        </div>
        <div className="grid grid-cols-[60%_40%] text-xl items-center justify-center border-b-2 border-[#0ea5e9] rounded-md font-semibold">
          <h4 className="h-[40px] border-r-2  border-[#0ea5e9] text-center flex items-center justify-center">
            Sub-Total
          </h4>
          <h4 className="h-[40px] text-center flex items-center justify-center">
            {(total() / 2).toFixed(2)}
          </h4>
        </div>
        <div className="grid grid-cols-[60%_40%] text-xl items-center justify-center border-b-2 border-[#0ea5e9] rounded-md font-semibold">
          <h4 className="h-[40px] border-r-2  border-[#0ea5e9] text-center flex items-center justify-center">
            Rodri
          </h4>
          <h4 className="h-[40px] text-center flex items-center justify-center">
            {totalRL(9)}
          </h4>
        </div>
        <div className="grid grid-cols-[60%_40%] text-xl items-center justify-center border-b-2 border-[#0ea5e9] rounded-md font-semibold">
          <h4 className="h-[40px] border-r-2  border-[#0ea5e9] text-center flex items-center justify-center">
            Leo
          </h4>
          <h4 className="h-[40px] text-center flex items-center justify-center">
            {totalRL(8)}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Month;

export async function getServerSideProps(context: any) {
  const { year, month } = context.query;
  const m = getMonthNumber(month).n
  const { taxes, error } = m !== 13 
    ? await fetchTaxesByMonthAndYear({
    year: parseInt(year),
    month: m,
  })
  : await fetchAllByYear(year);
  if (error) {
    return {
      props: {
        taxes: [],
        error: error,
        year,
        month,
      },
    };
  }
  return {
    props: {
      taxes,
      year,
      month,
      error: null,
    },
  };
}
