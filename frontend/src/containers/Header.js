import { themeChange } from 'theme-change'
import React, {  useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode"
import { useSelector, useDispatch } from 'react-redux'
import BellIcon  from '@heroicons/react/24/outline/BellIcon'
import Bars3Icon  from '@heroicons/react/24/outline/Bars3Icon'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import SunIcon from '@heroicons/react/24/outline/SunIcon'
import { openRightDrawer } from '../features/common/rightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../utils/globalConstantUtil'
import POS from "../features/sales/pos";
import axios from "axios";
import { NavLink,  Routes, Link , useLocation, useNavigate} from 'react-router-dom'


function Header() {
    const dispatch = useDispatch();
    const { noOfNotifications, pageTitle } = useSelector(state => state.header);
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"));
    const [profilImg, setprofilImg] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Fungsi untuk refresh token jika diperlukan
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);            
            setprofilImg(decoded.profilImg);
            setExpire(decoded.exp);
            console.log(decoded);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        themeChange(false);
        refreshToken();
        const theme = localStorage.getItem("theme");
        if (theme) {
            setCurrentTheme(theme);
        } else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                setCurrentTheme("light");
            } else {
                setCurrentTheme("dark");
            }
        }
    }, []);

    const handleClick = () => {
        navigate("/app/pos");
    };

    const openNotification = () => {
        dispatch(openRightDrawer({ header: "Notifications", bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION }));
    };

    const logoutUser = async () => {
        localStorage.clear();
        localStorage.setItem("theme", "light");
        try {
            await axios.delete('http://localhost:5000/logout');
            navigate('/login'); 
        } catch (error) {
            console.error(error); 
        }
    };
     

    return (
        <>
            <div className="navbar sticky top-0 bg-base-100 z-10 shadow-md ">
                <div className="flex-1">
                    <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
                        <Bars3Icon className="h-5 inline-block w-5" />
                    </label>
                    <h1 className="text-2xl font-bold ml-2 text-primary">{pageTitle}</h1>
                </div>

                <div className="flex-none ">
                    <button className="btn btn-sm btn-primary mx-7" onClick={handleClick}>
                        <span className="text-bold">POS</span>
                    </button>

                    <label className="swap ">
                        <input type="checkbox" />
                        <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 " + (currentTheme === "dark" ? "swap-on" : "swap-off")} />
                        <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 " + (currentTheme === "light" ? "swap-on" : "swap-off")} />
                    </label>

                    <button className="btn btn-ghost ml-4 btn-circle" onClick={openNotification}>
                        <div className="indicator">
                            <BellIcon className="h-6 w-6" />
                            {noOfNotifications > 0 ? <span className="indicator-item badge badge-primary badge-sm">{noOfNotifications}</span> : null}
                        </div>
                    </button>

                    <div className="dropdown dropdown-end ml-4">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="/Profile.svg" alt="Profil" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="justify-between">
                                <Link to="/app/settings-profile">
                                    Profile Settings                                    
                                </Link>
                            </li>
                            <div className="divider mt-0 mb-0"></div>
                            <li>
                                <a onClick={logoutUser} role="button" className="cursor-pointer">
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header

