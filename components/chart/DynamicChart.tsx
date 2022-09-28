import React, { FC } from "react";
import { ITax } from "../../interfaces/ITax";
import { ArcChart } from "./ArcChart";

export const DynamicChart: FC<{ type: string; taxes: ITax[]; id: string }> = (
  props
) => {
  const { type, id, taxes } = props;
  const setChart = () => {
    switch (type.toLocaleUpperCase()) {
      case "DOUGHNUT":
      case "PIE":
        return <ArcChart id={id} taxes={taxes} type={type} />;
    }
  };
  return <div className="w-[100%] p-2">{setChart()}</div>;
};
