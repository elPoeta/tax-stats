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

export const DynamicChart: FC<{ type: string; taxes: ITax[]; id: string }> = (
  props
) => {
  const {
    state: { colorTheme },
  } = useTheme();
  const { type, id, taxes } = props;
  const setChart = () => {
    switch (type.toLocaleUpperCase()) {
      case "DOUGHNUT":
        return (
          <Doughnut
            data={getDataset(taxes, "dataset")}
            options={getBaseConfig(taxes, id as string, colorTheme)}
          />
        );
      case "PIE":
        return (
          <Pie
            data={getDataset(taxes, "dataset")}
            options={getBaseConfig(taxes, id as string, colorTheme)}
          />
        );
      case "BAR":
        return (
          <Bar
            data={getDataset(taxes, "dataset")}
            options={getBaseConfig(taxes, id as string, colorTheme)}
          />
        );
      case "LINE":
        return (
          <Line
            data={getDataset(taxes, "dataset")}
            options={getBaseConfig(taxes, id as string, colorTheme)}
          />
        );
      case "RADAR":
        return (
          <Radar
            data={getDataset(taxes, "dataset")}
            options={getBaseConfig(taxes, id as string, colorTheme)}
          />
        );
      case "POLAR":
        return (
          <PolarArea
            data={getDataset(taxes, "dataset")}
            options={getBaseConfig(taxes, id as string, colorTheme)}
          />
        );
    }
  };
  return <div className="w-[100%] md:w-[60%] lg:w-[40%] p-2">{setChart()}</div>;
};
