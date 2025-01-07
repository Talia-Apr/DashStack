import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react"
import { utils, write } from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TitleCard from "../../../components/Cards/TitleCard";
import SearchBar from "../../../components/Input/SearchBar";
import EllipsisVertical from '@heroicons/react/24/outline/EllipsisVerticalIcon';
import Eye from '@heroicons/react/24/outline/EyeIcon';
import PencilSquare from '@heroicons/react/24/outline/PencilSquareIcon';
import CreditCard from '@heroicons/react/24/outline/CreditCardIcon';
import Trash from '@heroicons/react/24/outline/TrashIcon';
import Funnel from '@heroicons/react/24/outline/FunnelIcon';
import PlusCircle from '@heroicons/react/24/outline/PlusCircleIcon';
import DocumentChartBar from '@heroicons/react/24/outline/DocumentChartBarIcon';
import DocumentText from '@heroicons/react/24/outline/DocumentTextIcon';
import { NavLink,  Routes, Link , useLocation} from 'react-router-dom'
import { openRightDrawer } from '../../../features/common/rightDrawerSlice';
import { showNotification } from "../../common/headerSlice";
import { openModal } from "../../common/modalSlice";
import { deleteCustomer, editCustomer, getCustomersContent } from "./customersSlice";
import { RIGHT_DRAWER_TYPES, CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../../../src/utils/globalConstantUtil';

export const CUSTOMERDATA = [
    { customerId: 1, code: "43567", name: "Gina Maulinda", phone: "0893847829", email: "gina@gmail.com", tax: "100", totalSales: "1", returnSales: "0", address: "Jl. Tunjungan No.10", city: "Surabaya", country: "Indonesia", creditCard: "4111-1111-1111-1111", accountNumber: "1234567890" },
    { customerId: 2, code: "43568", name: "Ahmad Fikri", phone: "08123456789", email: "fikri@gmail.com", tax: "150", totalSales: "5", returnSales: "1", address: "Jl. Sudirman No.25", city: "Jakarta", country: "Indonesia", creditCard: "4222-2222-2222-2222", accountNumber: "0987654321" },
    { customerId: 3, code: "43569", name: "Siti Nurhaliza", phone: "0876543210", email: "siti@gmail.com", tax: "200", totalSales: "10", returnSales: "2", address: "Jl. Braga No.5", city: "Bandung", country: "Indonesia", creditCard: "4333-3333-3333-3333", accountNumber: "1122334455" },
    { customerId: 4, code: "43567", name: "Gina Maulinda", phone: "0893847829", email: "gina@gmail.com", tax: "100", totalSales: "1", returnSales: "0", address: "Jl. Tunjungan No.10", city: "Surabaya", country: "Indonesia", creditCard: "4111-1111-1111-1111", accountNumber: "1234567890" },
    { customerId: 5, code: "43568", name: "Ahmad Fikri", phone: "08123456789", email: "fikri@gmail.com", tax: "150", totalSales: "5", returnSales: "1", address: "Jl. Sudirman No.25", city: "Jakarta", country: "Indonesia", creditCard: "4222-2222-2222-2222", accountNumber: "0987654321" },
    { customerId: 6, code: "43569", name: "Siti Nurhaliza", phone: "0876543210", email: "siti@gmail.com", tax: "200", totalSales: "10", returnSales: "2", address: "Jl. Braga No.5", city: "Bandung", country: "Indonesia", creditCard: "4333-3333-3333-3333", accountNumber: "1122334455" },
    { customerId: 7, code: "43567", name: "Gina Maulinda", phone: "0893847829", email: "gina@gmail.com", tax: "100", totalSales: "1", returnSales: "0", address: "Jl. Tunjungan No.10", city: "Surabaya", country: "Indonesia", creditCard: "4111-1111-1111-1111", accountNumber: "1234567890" },
    { customerId: 8, code: "43568", name: "Ahmad Fikri", phone: "08123456789", email: "fikri@gmail.com", tax: "150", totalSales: "5", returnSales: "1", address: "Jl. Sudirman No.25", city: "Jakarta", country: "Indonesia", creditCard: "4222-2222-2222-2222", accountNumber: "0987654321" },
    { customerId: 9, code: "43569", name: "Siti Nurhaliza", phone: "0876543210", email: "siti@gmail.com", tax: "200", totalSales: "10", returnSales: "2", address: "Jl. Braga No.5", city: "Bandung", country: "Indonesia", creditCard: "4333-3333-3333-3333", accountNumber: "1122334455" },
    { customerId: 10, code: "43569", name: "Siti Nurhaliza", phone: "0876543210", email: "siti@gmail.com", tax: "200", totalSales: "10", returnSales: "2", address: "Jl. Braga No.5", city: "Bandung", country: "Indonesia", creditCard: "4333-3333-3333-3333", accountNumber: "1122334455" },
    { customerId: 11, code: "43567", name: "Gina Maulinda", phone: "0893847829", email: "gina@gmail.com", tax: "100", totalSales: "1", returnSales: "0", address: "Jl. Tunjungan No.10", city: "Surabaya", country: "Indonesia", creditCard: "4111-1111-1111-1111", accountNumber: "1234567890" },
    { customerId: 12, code: "43568", name: "Ahmad Fikri", phone: "08123456789", email: "fikri@gmail.com", tax: "150", totalSales: "5", returnSales: "1", address: "Jl. Sudirman No.25", city: "Jakarta", country: "Indonesia", creditCard: "4222-2222-2222-2222", accountNumber: "0987654321" },
    { customerId: 13, code: "43569", name: "Siti Nurhaliza", phone: "0876543210", email: "siti@gmail.com", tax: "200", totalSales: "10", returnSales: "2", address: "Jl. Braga No.5", city: "Bandung", country: "Indonesia", creditCard: "4333-3333-3333-3333", accountNumber: "1122334455" },
];

function Customer() {
  const [customer] = useState(CUSTOMERDATA);

  // DROPDOWN
  const [openDropdown, setOpenDropdown] = useState(null);
  const dispatch = useDispatch();

  // Mengaktifkan Dropdown
  const handleActionClick = (index) => {
    setOpenDropdown(openDropdown === index ? null : index); 
  };

  // FILTER
  const openCustomerFilter = () => {
    dispatch(openRightDrawer({header : "Filters", bodyType : RIGHT_DRAWER_TYPES.CUSTOMER_FILTER}));
  };

  useEffect(() => {
    dispatch(getCustomersContent())
  }, [])  
    
  // PAGINATION
  const [searchText, setSearchText] = useState(""); // Untuk teks pencarian
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const itemsPerPage = 10; // Jumlah item per halaman

  // Filter data berdasarkan teks pencarian
  const filteredCustomers = CUSTOMERDATA.filter((customer) =>
    customer.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Hitung jumlah halaman
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  // Ambil data untuk halaman aktif
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

  // EXCEL
  const downloadExcel = () => {
    const worksheet = utils.json_to_sheet(CUSTOMERDATA); // Ubah data JSON ke format Excel
    const workbook = utils.book_new(); // Buat workbook baru
    utils.book_append_sheet(workbook, worksheet, "Customers"); // Tambahkan worksheet ke workbook
  
    // Buat file Excel
    const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });
  
    // Simpan file dengan nama 'CustomerData.xlsx'
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "CustomerData.xlsx");
  };

  // PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Judul PDF
    doc.text("Customer Data", 14, 10);
  
    // Data tabel
    const tableColumn = ["Code", "Name", "Phone", "Email", "Tax Number", "Address", "City", "Country", "Total Sale Due", "Total Sell Return Due", "Credit Card", "Account Number"];
    const tableRows = CUSTOMERDATA.map(item => [
      item.code,
      item.name,
      item.phone,
      item.email,
      item.tax,
      item.address,
      item.city,
      item.country,
      item.totalSales,
      item.returnSales,
      item.creditCard,
      item.accountNumber,
    ]);
  
    // Menambahkan tabel ke PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20, // Posisi awal tabel
    });
  
    // Simpan file sebagai 'CustomerData.pdf'
    doc.save("CustomerData.pdf");
  };

   
  // CREATE
  const openCreateCustomer = () => {
    dispatch(openModal({title : "Create Customer", bodyType : MODAL_BODY_TYPES.CUSTOMER_ADD_NEW}))
  }

  // EDIT
  const openEditCustomer = () => {
    dispatch(openModal({title : "Edit Customer", bodyType : MODAL_BODY_TYPES.CUSTOMER_EDIT}))
  }

  // VIEW
  const openViewCustomer = () => {
    dispatch(openModal({title : "Customer Details", bodyType : MODAL_BODY_TYPES.CUSTOMER_VIEW}))
  }

  // DELETE
  const deleteCustomer = (index) => {
    dispatch(openModal({
        title: "Delete",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: { 
            message: `Are you sure you want to delete this customer?`, 
            type: CONFIRMATION_MODAL_CLOSE_TYPES.CUSTOMER_DELETE, 
            index,
            onConfirm: () => handleDeleteConfirmation(index) 
        }
    }));
  };

  // INFO CARD
  const openCardCustomer = () => {
    dispatch(openModal({title : "Credit Card Info", bodyType : MODAL_BODY_TYPES.CUSTOMER_CARD}))
  }

  const handleDeleteConfirmation = async (index) => {
      dispatch(deleteCustomer(index)); 

      // Tampilkan notifikasi
      dispatch(showNotification({
          message: "Customer deleted successfully!",
          status: 1 
      }));
  };

  return (
    <>
      <TitleCard title="Customer Management">

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
                onClick={() => openCustomerFilter()} >
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
                onClick={() => openCreateCustomer()}>
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
                <th className="text-center text-primary text-base">Code</th>
                <th className="text-center text-primary text-base">Name</th>
                <th className="text-center text-primary text-base">Phone</th>
                <th className="text-center text-primary text-base">Email</th>
                <th className="text-center text-primary text-base">Tax Number</th>
                <th className="text-center text-primary text-base">
                    Total Sale <br /> Due
                    </th>
                    <th className="text-center text-primary text-base">
                    Total Sale <br /> Return Due
                    </th>
                <th className="text-center text-primary text-base">Action</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map((customer, index) => (
                  <tr key={index}>
                    <td className="text-center">{customer.code}</td>
                    <td className="text-center">{customer.name}</td>
                    <td className="text-center">{customer.phone}</td>
                    <td className="text-center">{customer.email}</td>
                    <td className="text-center">{customer.tax}</td>
                    <td className="text-center">{customer.totalSales}</td>
                    <td className="text-center">{customer.returnSales}</td>
                    <td>
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
                              <li onClick={() => openViewCustomer(customer.customerId)}>    
                                  <span>View</span>
                              </li>
                          </div>

                          {/* Card Info */}
                          <div className="flex items-center ml-2">
                            <CreditCard className="h-5 w-5 inline-block" />
                            <li onClick={() => openCardCustomer(customer.customerId)}> 
                                <span>Card</span>
                            </li>
                          </div>
                          
                          {/* Edit */}
                          <div className="flex items-center ml-2">
                            <PencilSquare className="h-5 w-5 inline-block" />
                            <li onClick={() => openEditCustomer(customer.customerId)}> 
                                <span>Edit</span>
                            </li>
                          </div>

                          {/* Delete */}
                          <div className="flex items-center ml-2">
                              <Trash className="h-5 w-5 inline-block" />
                              <li onClick={() => deleteCustomer(index)}>  
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
  );
}

export default Customer;
