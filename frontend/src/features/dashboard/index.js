import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'
import axios from "axios";
import { jwtDecode } from "jwt-decode"
import {useNavigate} from "react-router-dom"
import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import PresentationChartBarIcon  from '@heroicons/react/24/outline/PresentationChartBarIcon'
import InboxArrowDownIcon  from '@heroicons/react/24/outline/InboxArrowDownIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon  from '@heroicons/react/24/outline/CreditCardIcon'
import UserChannels from './components/UserChannels'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import {showNotification} from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart'
import { useState, useEffect } from 'react'

const statsData = [
    {
        title: "Total Sales",
        value: "$22,110",
        icon: (
            <button className="btn btn-circle bg-primary text-white">
                <CreditCardIcon className="w-6 h-6" />
            </button>
        ),
        description: "↗︎ 2300 (22%)"
    },
    {
        title: "Purchase",
        value: "$7,545",
        icon: (
            <button className="btn btn-circle bg-primary text-white">
                <InboxArrowDownIcon className="w-6 h-6" />
            </button>
        ),
        description: "Current month"
    },
    {
        title: "Customers",
        value: "713",
        icon: (
            <button className="btn btn-circle bg-primary text-white">
                <UserGroupIcon className="w-6 h-6" />
            </button>
        ),
        description: "50 in hot leads"
    },
    {
        title: "Sales Amount",
        value: "$31,111",
        icon: (
            <button className="btn btn-circle bg-primary text-white">
                <PresentationChartBarIcon className="w-6 h-6" />
            </button>
        ),
        description: "↙ 300 (9%)"
    }
];

function Dashboard(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
    }, []);

    // Fungsi untuk refresh token jika diperlukan
    const refreshToken = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            console.log(decoded);
            setName(decoded.name);
            setEmail(decoded.email);
            setExpire(decoded.exp);
        } catch (error) {
            navigate('/login'); // Arahkan ke halaman login jika terjadi kesalahan
        }
    };

    const axiosJWT = axios.create();

    // Tambahkan interceptor axios untuk mengatur token di setiap permintaan
    axiosJWT.interceptors.request.use(
        async (config) => {
            const currentDate = new Date();
            if (expire * 1000 < currentDate.getTime()) {
                const response = await axios.get('http://localhost:5000/token');
                config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                setToken(response.data.accessToken);
                const decoded = jwtDecode(response.data.accessToken);
                setName(decoded.name);
                setEmail(decoded.email);
                setExpire(decoded.exp);
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const getUsers = async () => {
        try {
            console.log("Token:", token); // Debugging
            const response = await axios.get('http://localhost:5000/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                console.error("Error Response:", error.response.data);
            } else {
                console.error("Error:", error.message);
            }
        }
    };
    

    const dispatch = useDispatch()
 

    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({message : `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status : 1}))
    }

    return(
        <>
        {/** ---------------------- Select Period Content ------------------------- */}
            <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod}/>
        
        {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k}/>
                        )
                    })
                }
            </div>



        {/** ---------------------- Different charts ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <LineChart />
                <BarChart />
            </div>
            
        {/** ---------------------- Different stats content 2 ------------------------- */}
        
            <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                <AmountStats />
                <PageStats />
            </div>

        {/** ---------------------- User source channels table  ------------------------- */}
        
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels />
                <DoughnutChart />
            </div>
        </>
    )
}

export default Dashboard