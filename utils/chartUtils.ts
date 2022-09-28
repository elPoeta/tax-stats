import { ChartOptions } from "chart.js";
import { ITax } from "../interfaces/ITax";

export const BG_COLORS = {
  "0": "rgba(239, 68, 68, 0.8)",
  "1": "rgba(16, 185, 129, 0.8)",
  "2": "rgba(251, 146, 60, 0.8)",
  "3": "rgba(8, 145, 178, 0.8)",
  "4": "rgba(244, 114, 182, 0.8)",
  "5": "rgba(251, 191, 36, 0.8)",
  "6": "rgba(131, 24, 67, 0.8)",
  "7": "rgba(3, 105, 161, 0.8)",
  "8": "rgba(13, 148, 136, 0.8)",
  "9": "rgba(71, 85, 105, 0.8)",
  "10": "rgba(113, 63, 18, 0.8)",
  "11": "rgba(134, 25, 143, 0.8)",
};

export const BORDER_COLORS = {
  "0": "rgb(239, 68, 68)",
  "1": "rgb(16, 185, 129)",
  "2": "rgb(251, 146, 60)",
  "3": "rgb(8, 145, 178)",
  "4": "rgb(244, 114, 188)",
  "5": "rgb(251, 191, 36)",
  "6": "rgb(131, 24, 67)",
  "7": "rgb(3, 105, 161)",
  "8": "rgb(13, 148, 136)",
  "9": "rgb(71, 85, 105)",
  "10": "rgb(113, 63, 18)",
  "11": "rgb(134, 25, 143)",
};

export const chartBGColors = (len: number, type: Record<string, string>) =>
  Array.apply(null, Array(len)).map((val, idx) => type[idx]);

export const getDataset = (taxes: ITax[], label: string) => {
  return {
    labels: taxes.map((tax) => tax.date || tax.name),
    datasets: [
      {
        label,
        data: taxes.map((tax) => tax.amount),
        backgroundColor: chartBGColors(taxes.length, BG_COLORS),
        borderColor: chartBGColors(taxes.length, BORDER_COLORS),
        borderWidth: 2,
        color: "#fff",
      },
    ],
  };
};

export const getBaseConfig = (
  taxes: ITax[],
  id: string,
  colorTheme: string
): ChartOptions => {
  return {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 15,
          },
          color: colorTheme === "dark" ? "#d1d5db" : "#0f172a",
        },
      },
      title: {
        display: true,
        text: id == "0" ? "Servicios" : taxes[0].name,
        font: {
          size: 25,
        },
        color: colorTheme === "dark" ? "#d1d5db" : "#0f172a",
      },
      tooltip: {
        enabled: true,
        backgroundColor: colorTheme === "dark" ? "#374151" : "#0f172a",
      },
    },
  };
};
