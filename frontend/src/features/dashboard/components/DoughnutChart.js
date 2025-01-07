import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';
import Subtitle from '../../../components/Typography/Subtitle';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // Top 5 customers data
  const labels = ['Nanda Kharisma', 'Talia Aprianti', 'Risma Paramesti', 'Shafira', 'Nurul Izzah'];

  const data = {
    labels,
    datasets: [
      {
        label: '# of Orders',
        data: [150, 120, 100, 80, 60], // Replace with real data
        backgroundColor: [
          'rgba(62, 51, 200, 1)',
          'rgba(233, 231, 255, 1)',
          'rgba(70, 80, 202, 1)',
          'rgba(123, 116, 218, 1)',
          'rgba(180, 174, 255, 1)',
        ],
        borderColor: [
          'rgba(83, 71, 232, 1)',
          'rgba(233, 231, 255, 1)',
          'rgba(67, 56, 202, 1)',
          'rgba(123, 116, 218, 1)',
          'rgba(180, 174, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <TitleCard title={"Top 5 Customers by Orders"}>
      <Pie options={options} data={data} />
    </TitleCard>
  );
}

export default PieChart;