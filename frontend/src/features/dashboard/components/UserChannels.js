// import TitleCard from "../../../components/Cards/TitleCard"

// const userSourceData = [
//     {source : "Facebook Ads", count : "26,345", conversionPercent : 10.2},
//     {source : "Google Ads", count : "21,341", conversionPercent : 11.7},
//     {source : "Instagram Ads", count : "34,379", conversionPercent : 12.4},
//     {source : "Affiliates", count : "12,359", conversionPercent : 20.9},
//     {source : "Organic", count : "10,345", conversionPercent : 10.3},
// ]

// function UserChannels(){
//     return(
//         <TitleCard title={"User Signup Source"}>
//              {/** Table Data */}
//              <div className="overflow-x-auto">
//                 <table className="table w-full">
//                     <thead>
//                     <tr>
//                         <th></th>
//                         <th className="normal-case">Source</th>
//                         <th className="normal-case">No of Users</th>
//                         <th className="normal-case">Conversion</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             userSourceData.map((u, k) => {
//                                 return(
//                                     <tr key={k}>
//                                         <th>{k+1}</th>
//                                         <td>{u.source}</td>
//                                         <td>{u.count}</td>
//                                         <td>{`${u.conversionPercent}%`}</td>
//                                     </tr>
//                                 )
//                             })
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         </TitleCard>
//     )
// }
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
  
    // Top 5 selling products data
    const labels = ['Sunglasses', 'Bucket Hat', 'T-shirt', 'Running Shoes', 'Woll Syal'];
  
    const data = {
      labels,
      datasets: [
        {
          label: '# of Sales',
          data: [400, 400, 300, 250, 250], // Replace with actual sales data
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
      <TitleCard title={"Top 5 Selling Products"}>
        <Pie options={options} data={data} />
      </TitleCard>
    );
  }
  
  export default PieChart;
  // export default UserChannels