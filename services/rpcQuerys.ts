import supabase from "../supabase/supabaseClient";

export const fetchByYearAndTaxTypeId = async (id: string) => {
  const year = new Date().getFullYear();
  const rpcParams: [string, object] =
    id == "0"
      ? ["all_tax_by_year", { year_tax: year }]
      : ["tax_by_year_and_by_id", { year_tax: year, id_tax_type: id }];
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

const getRows = async (rpcParams: [string, object]) => {
  const [fn, obj] = rpcParams;
  const { data, error } = await supabase.rpc(fn, obj);
  return { data, error };
};
