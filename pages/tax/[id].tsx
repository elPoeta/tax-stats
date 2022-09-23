import { LogarithmicScale } from "chart.js";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Loader } from "../../components/common/Loader";

const ViewTax = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = router.query;

  useEffect(() => {
    setIsLoading(true);
    if (!id) return;
    ((async) => {
      if (id == "0") {
        console.log("Id ##", id);
      } else {
        console.log("Id >>>", id);
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
