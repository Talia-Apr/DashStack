import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { jwtDecode } from "jwt-decode"
import {useNavigate} from "react-router-dom"
import { utils, write } from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TitleCard from "../../../components/Cards/TitleCard";
import SearchBar from "../../../components/Input/SearchBar";
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import EllipsisVertical from '@heroicons/react/24/outline/EllipsisVerticalIcon';
import Eye from '@heroicons/react/24/outline/EyeIcon';
import PencilSquare from '@heroicons/react/24/outline/PencilSquareIcon';
import CreditCard from '@heroicons/react/24/outline/CreditCardIcon';
import Trash from '@heroicons/react/24/outline/TrashIcon';
import Funnel from '@heroicons/react/24/outline/FunnelIcon';
import PlusCircle from '@heroicons/react/24/outline/PlusCircleIcon';
import DocumentChartBar from '@heroicons/react/24/outline/DocumentChartBarIcon';
import DocumentText from '@heroicons/react/24/outline/DocumentTextIcon';
import { openRightDrawer } from '../../../features/common/rightDrawerSlice';
import { showNotification } from "../../common/headerSlice";
import { openModal } from "../../common/modalSlice";
import { deleteUserById, editUserB, getUsersContent } from "../user/userSlice";
import { RIGHT_DRAWER_TYPES, CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../../../src/utils/globalConstantUtil';

export const USERDATA = [
    { userId: 1, firstName: "Talia", lastName: "Aprianti", userName: "Talianjay", email: "taliaaprianti46@gmail.com", phone: "083849727449", role: "Cashier", password: "123", profilImg: "/Profile.svg" },
];

function User(){
    
    const [users, setUser] =  useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(''); 
    const [status, setStatus] = useState('');    
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
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
        setLoading(true);
        try {
            const response = await axiosJWT.get('http://localhost:5000/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Failed to fetch users.");
            console.error("Error:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // DROPDOWN
    const [openDropdown, setOpenDropdown] = useState(null);
    const dispatch = useDispatch();

    // Mengaktifkan Dropdown
    const handleActionClick = (index) => {
        setOpenDropdown(openDropdown === index ? null : index); 
    };

    // FILTER
    const openUserFilter = () => {
        dispatch(openRightDrawer({header : "Filters", bodyType : RIGHT_DRAWER_TYPES.USER_FILTER}));
    };

    useEffect(() => {
        dispatch(getUsersContent())
    }, [])     

    // Status
    const getStatus = (status) => {
        if (status === "Active") {
            return (
                <div className="badge badge-success">
                    <span className="text-white px-5">Active</span>
                </div>
            );
        } else if (status === "Non Active") {
            return (
                <div className="badge bg-gray-500">
                    <span className="text-white px-2">Non Active</span>
                </div>
            );
        } else {
            return null; // Jika status tidak sesuai
        }
    };    
      
    // PAGINATION
    const [searchText, setSearchText] = useState(""); // Untuk teks pencarian
    const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
    const itemsPerPage = 10; // Jumlah item per halaman

    // Filter data berdasarkan teks pencarian
    const filteredUser = USERDATA.filter((user) =>
        user.firstName.toLowerCase().includes(searchText.toLowerCase())
        || user.email.toLowerCase().includes(searchText.toLowerCase())
        || user.role.toLowerCase().includes(searchText.toLowerCase())
    );

    // Hitung jumlah halaman
    const totalPages = Math.ceil(filteredUser.length / itemsPerPage);

    // Ambil data untuk halaman aktif
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUser.slice(indexOfFirstItem, indexOfLastItem);
    
    // CREATE
    const openCreateUser = () => {
        dispatch(openModal({title : "Create User", bodyType : MODAL_BODY_TYPES.USER_ADD_NEW}))
    }

    // EDIT
    const openEditUser = () => {
        dispatch(openModal({title : "Edit User", bodyType : MODAL_BODY_TYPES.USER_EDIT}))
    }

    // VIEW
    const openViewUser = (userId) => {
        dispatch(openModal({
            title: "User Details",
            bodyType: MODAL_BODY_TYPES.USER_VIEW,
        }));
    };
    

    // DELETE
    const deleteUser = (index) => {
        dispatch(openModal({
            title: "Delete",
            bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { 
                message: `Are you sure you want to delete this user?`, 
                type: CONFIRMATION_MODAL_CLOSE_TYPES.USER_DELETE, 
                index,
                onConfirm: () => handleDeleteConfirmation(index) 
            }
        }));
    };

    const handleDeleteConfirmation = async (index) => {
        dispatch(deleteUser(index)); 
  
        // Tampilkan notifikasi
        dispatch(showNotification({
            message: "User deleted successfully!",
            status: 1 
        }));
    };

    // EXCEL
    const downloadExcel = () => {
        const worksheet = utils.json_to_sheet(USERDATA); // Ubah data JSON ke format Excel
        const workbook = utils.book_new(); // Buat workbook baru
        utils.book_append_sheet(workbook, worksheet, "User"); // Tambahkan worksheet ke workbook
    
        // Buat file Excel
        const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });
    
        // Simpan file dengan nama 'CustomerData.xlsx'
        const file = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(file, "UserData.xlsx");
    };

    // PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
    
        // Judul PDF
        doc.text("User Data", 14, 10);
    
        // Data tabel
        const tableColumn = ["First Name", "Last Name", "Username", "Phone", "Email", "Password", "Role"];
        const tableRows = USERDATA.map(item => [
            item.firstName,
            item.lastName,
            item.userName,
            item.phone,
            item.email,
            item.password,
            item.role,
        ]);
    
        // Menambahkan tabel ke PDF
        doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20, // Posisi awal tabel
        });
    
        // Simpan file sebagai 'CustomerData.pdf'
        doc.save("UserData.pdf");
    };

    return(
        <>  
            <TitleCard title="User Management">

            <div className="flex justify-between items-center mb-4">

            <SearchBar
                searchText={searchText}
                setSearchText={(text) => {
                setSearchText(text);
                setCurrentPage(1); // Reset ke halaman pertama setelah search
                }}
            /> 

                <div className="flex items-center space-x-2">
                <button className="border btn-sm border-primary text-primary rounded-md px-4 py-2 flex items-center space-x-1 hover:bg-primary hover:text-white hover:shadow-xl transition duration-200"
                    onClick={() => openUserFilter()} >
                    <Funnel className="h-5 w-5"/>
                    <span>Filter</span>
                </button>
                <button className="border btn-sm border-success text-success rounded-md px-4 py-2 flex items-center space-x-1 hover:bg-success hover:text-white hover:shadow-xl transition duration-200"
                    onClick={downloadExcel}>
                    <DocumentChartBar className="h-5 w-5" /> 
                    <span>EXCEL</span>
                </button>
                <button className="border btn-sm border-error text-error rounded-md px-4 py-2 flex items-center space-x-1 hover:bg-error hover:text-white hover:shadow-xl transition duration-200"
                    onClick={downloadPDF}>
                    <DocumentText className="h-5 w-5" /> 
                    <span>PDF</span>
                </button>
                <button className="btn-sm bg-primary text-white rounded-md px-4 py-2 flex items-center space-x-1 hover:shadow-xl transition duration-200"
                    onClick={() => openCreateUser()}>
                    <PlusCircle className="h-5 w-5" />
                    <span>Create</span>
                </button>
                </div>
            </div>
            
        
            {/* Tabel pelanggan */}
            <div className="w-full">
                <table className="table w-full table-auto">
                <thead>
                    <tr>
                    <th className="text-center text-primary text-base">Name</th>
                    <th className="text-center text-primary text-base">Phone</th>
                    <th className="text-center text-primary text-base">Email</th>
                    <th className="text-center text-primary text-base">Role</th>
                    <th className="text-center text-primary text-base">Status</th>
                    <th className="text-center text-primary text-base">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                    <tr key={user.id}>
                        <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12 mr-4">
                                        <img src="/Profile.svg" alt="Avatar" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{user.name}</div>
                                </div>
                            </div>
                        </td>
                        <td className="text-center">{user.phone}</td>
                        <td className="text-center">{user.email}</td>
                        <td className="text-center">{user.role}</td>
                        <td className="text-center">{getStatus(user.status)}</td>
                        <td className="text-center">
                        <div className="dropdown dropdown-end ml-4">
                            <button onClick={() => handleActionClick(index)}>
                                <EllipsisVertical className="h-6 w-6" />
                            </button>
                            <ul
                                tabIndex={0}
                                className="menu menu-compact dropdown-content shadow bg-base-100 rounded-box w-30 z-50"
                                >
                                {/* View */}
                                <div className="flex items-center ml-2">
                                    <Eye className="h-5 w-5 inline-block" />
                                    <li onClick={() => openViewUser(user.userId)}>    
                                        <span>View</span>
                                    </li>
                                </div>
                                
                                {/* Edit */}
                                <div className="flex items-center ml-2">
                                    <PencilSquare className="h-5 w-5 inline-block" />
                                    <li onClick={() => openEditUser(user.userId)}> 
                                        <span>Edit</span>
                                    </li>
                                </div>

                                {/* Delete */}
                                <div className="flex items-center ml-2">
                                    <Trash className="h-5 w-5 inline-block" />
                                    <li onClick={() => deleteUser(index)}>  
                                        <span>Delete</span>
                                    </li>
                                </div>                            
                            </ul>
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>

            {/* Page Content */}
            <div className="flex justify-between items-center mt-5 mx-5 space-x-4">
            {/* Text for current page */}
            <span className="text-sm text-gray-500">
                Rows Per Page <span className="font-bold text-primary">{itemsPerPage}</span>
            </span>

            {/* Pagination */}
            <div className="flex justify-end items-center space-x-4">
                {/* Text for current page */}
                <span className="text-sm text-gray-500">
                Page <span className="font-bold text-primary">{currentPage}</span> of <span className="font-bold text-primary">{totalPages}</span>
                </span>

                {/* Pagination buttons */}
                <div className="join">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                    key={i + 1}
                    className={`join-item btn btn-sm ${currentPage === i + 1 ? 'btn-primary btn-active' : ''}`}
                    onClick={() => setCurrentPage(i + 1)}
                    >
                    {i + 1}
                    </button>
                ))}
                </div>
            </div>
            </div>
            </TitleCard>             
        </>
    )
}

export default User