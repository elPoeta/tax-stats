import { LogarithmicScale } from "chart.js";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Loader } from "../../components/common/Loader";
import supabase from "../../supabase/supabaseClient";

const ViewTax = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = router.query;

  useEffect(() => {
    setIsLoading(true);
    if (!id) return;
    const year = new Date().getFullYear();
    (async () => {
      if (id == "0") {
        console.log("Id ##", id);
        const { data, error } = await supabase.rpc("all_tax_by_year",{ year_tax: year });
        if(error) {
          console.log('Error',error)
          setIsLoading(false);
          return;
        }
        console.log('DATA ',data)
      } else {
        console.log("Id >>>", id);
        const { data, error } = await supabase.rpc("tax_by_year_and_by_id",{ year_tax: year, tax_type_id: id });

      if(error) {
        console.log('Error',error)
        setIsLoading(false);
        return;
      }
      console.log('DATA ',data)
    }
      setIsLoading(false);
    })();
  }, [id]);

  return (
    <div>
      {!id || isLoading ? (
        <Loader strokeColor="#0ea5e9" classNames="w-[12rem] h-[12rem]" />
      ) : (
        <div>Tax - {id}</div>
      )}
    </div>
  );
};

export default ViewTax;
