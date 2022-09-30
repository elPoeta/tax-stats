import React, { FC } from "react";
import { ITax } from "../../interfaces/ITax";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  RadialLinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, PolarArea, Radar, Pie, Doughnut } from "react-chartjs-2";
import { getBaseConfig, getDataset } from "../../utils/chartUtils";
import { useTheme } from "../../context/theme/useTheme";
import { title } from "process";
Chart.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  PointElement,
  RadialLinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const DynamicChart: FC<{ type: string; taxes: ITax[]; id: string; label:string; title:string;}> = (
  props
) => {
  const {
    state: { colorTheme },
  } = useTheme();
  const { type, id, taxes, label, title } = props;
  const setChart = () => {
    switch (type.toLocaleUpperCase()) {
      case "DOUGHNUT":
        return (
          <Doughnut
            data={getDataset(taxes, label)}
            options={getBaseConfig(colorTheme, title)}
          />
        );
      case "PIE":
        return (
          <Pie
            data={getDataset(taxes, label)}
            options={getBaseConfig(colorTheme, title)}
          />
        );
      case "BAR":
        return (
          <Bar
            data={getDataset(taxes, label)}
            options={getBaseConfig(colorTheme, title)}
          />
        );
      case "LINE":
        return (
          <Line
            data={getDataset(taxes, label)}
            options={getBaseConfig(colorTheme, title)}
          />
        );
      case "RADAR":
        return (
          <Radar
            data={getDataset(taxes, label)}
            options={getBaseConfig(colorTheme, title)}
          />
        );
      case "POLAR":
        return (
          <PolarArea
            data={getDataset(taxes, label)}
            options={getBaseConfig(colorTheme, title)}
          />
        );
    }
  };
  return <div className="w-[100%] md:w-[60%] lg:w-[40%] p-2">{setChart()}</div>;
};
