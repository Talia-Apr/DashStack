import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function LineChart(){

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Using Average Cost',
      data: labels.map(() => { return Math.random() * 1600 + 200 }),
      borderColor: 'rgb(62, 51, 200)',
      backgroundColor: 'rgba(180, 174, 255, 0.5)',
    },
  ],
};
  

    return(
      <TitleCard title={"Profit Net"}>
          <Line data={data} options={options}/>
      </TitleCard>
    )
}


export default LineChart