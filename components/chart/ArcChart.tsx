import {FC} from 'react'
import { getBaseConfig, getDataset } from "../../utils/chartUtils";
import {Doughnut, Pie } from 'react-chartjs-2'
import  { Chart, ArcElement, Title, Tooltip, Legend   } from 'chart.js'
import { ITax } from '../../interfaces/ITax';
import { useTheme } from '../../context/theme/useTheme';
Chart.register(ArcElement, Title, Tooltip, Legend);

export const ArcChart:FC<{type:string, taxes:ITax[], id:string}> = (props) => {
  const {state: { colorTheme } } = useTheme();
  const { type, taxes, id } = props;
  return (
    <>
      {type.toLocaleUpperCase() === 'PIE' ?
         <Pie
         data={getDataset(taxes, "dataset")}
         options={getBaseConfig(taxes, id as string, colorTheme)}
         /> :
         <Doughnut
         data={getDataset(taxes, "dataset")}
         options={getBaseConfig(taxes, id as string, colorTheme)}
         />
      }
    </>
  )
}
