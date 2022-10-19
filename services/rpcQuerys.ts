import supabase from "../supabase/supabaseClient";

export const fetchByYearAndTaxTypeId = async (id: string, year: number) => {
  const rpcParams: [string, object] = [
    "tax_by_year_and_by_id",
    { year_tax: year, id_tax_type: id },
  ];
  const { data: taxes, error } = await getRows(rpcParams);
  return { taxes, error };
};

export const fetchAllByYear = async (year: number) => {
  const rpcParams: [string, object] = ["all_tax_by_year", { year_tax: year }];
  const { data: taxes, error } = await getRows(rpcParams);
  return { taxes, error };
};

export const fetchBetweenMonthAnTaxTypeById = async (
  id: string,
  f_date: string,
  t_date: string
) => {
  const rpcParams: [string, object] = [
    "tax_between_month_and_by_id",
    { id_tax_type: id, f_date, t_date },
  ];
  const { data: taxes, error } = await getRows(rpcParams);
  return { taxes, error };
};

export const fetchSumAllTaxesBetweenMonthsAndNotIn = async (
  ids: number[],
  f_date: string,
  t_date: string
) => {
  const rpcParams: [string, object] = [
    "sum_all_taxes_between_months_and_not_in",
    { ids_tax_type: ids, f_date, t_date },
  ];
  const { data: taxes, error } = await getRows(rpcParams);
  return { taxes, error };
};

export const fetchAllTaxesBetweenMonths = async (
  id_tax_type: number,
  f_date: string,
  t_date: string
) => {
  const rpcParams: [string, object] = [
    "all_taxes_between_months",
    { id_tax_type, f_date, t_date },
  ];
  const { data: taxes, error } = await getRows(rpcParams);
  return { taxes, error };
};

export const fetchSumAllTaxesBetweenMonths = async (
  f_date: string,
  t_date: string
) => {
  const rpcParams: [string, object] = [
    "sum_all_tax_between_months",
    { f_date, t_date },
  ];
  const { data: total, error } = await getRows(rpcParams);
  return { total, error };
};

export const fetchTaxesByMonthAndYear = async ({
  year,
  month,
}: {
  year: number;
  month: number;
}) => {
  const rpcParams: [string, object] = [
    "get_taxes_by_month_and_year",
    { year_tax: year, month_tax: month },
  ];
  const { data: taxes, error } = await getRows(rpcParams);
  return { taxes, error };
};

const getRows = async (rpcParams: [string, object]) => {
  const [fn, obj] = rpcParams;
  const { data, error } = await supabase.rpc(fn, obj);
  return { data, error };
};
