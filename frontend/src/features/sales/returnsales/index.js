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
import { NavLink,  Routes, Link , useLocation, useNavigate} from 'react-router-dom'
import { openRightDrawer } from '../../../features/common/rightDrawerSlice';
import { showNotification } from "../../common/headerSlice";
import { openModal } from "../../common/modalSlice";
import ReturnDetail from "../returnsales/ReturnDetail";
import { deleteSales, editSales, getSalesContent } from "../../sales/allsales/salesSlice";
import { RIGHT_DRAWER_TYPES, CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../../../src/utils/globalConstantUtil';

export const ALLSALESDATA = [
  {
    salesId: 1, 
    date: "12-12-2024", 
    addedBy: "Cashier", 
    customerName: "Gina Maulinda", 
    warehouse: "Warehouse 1", 
    grandTotal: "1527.00", 
    paid: "1527.00", 
    due: "0.0",
    orderItems: [
        { 
          product: "MacBook", 
          unitPrice: "1300.000", 
          quantity: "1.0", 
          discount: "0.00", 
          tax: "0.00", 
          subtotal: "1300.000" 
        },
        {
          product: "MacBook", 
          unitPrice: "1300.000", 
          quantity: "1.0", 
          discount: "0.00", 
          tax: "0.00", 
          subtotal: "1300.000"
        },
    ],
  },
  { 
    salesId: 2, 
    date: "13-12-2024", 
    addedBy: "Cashier", 
    customerName: "Ahmad Fikri", 
    warehouse: "Warehouse 2", 
    grandTotal: "1038.00", 
    paid: "1038.00", 
    due: "0.0", 
    orderItems: [
      {
        product: "MacBook", 
        unitPrice: "1300.000", 
        quantity: "2.0", 
        discount: "0.00", 
        tax: "0.00", 
        subtotal: "2600.000"
      },
      {
        product: "Sunglass", 
        unitPrice: "100.000", 
        quantity: "1.0", 
        discount: "0.00", 
        tax: "0.00", 
        subtotal: "100.000"
      },
    ],     
  },
];

function ReturnSales() {
  const [allsales] = useState(ALLSALESDATA);

  // DROPDOWN
  const [openDropdown, setOpenDropdown] = useState(null);
  const dispatch = useDispatch();

  // Mengaktifkan Dropdown
  const handleActionClick = (index) => {
    setOpenDropdown(openDropdown === index ? null : index); 
  };

  // FILTER
  const openSalesFilter = () => {
    dispatch(openRightDrawer({header : "Filters", bodyType : RIGHT_DRAWER_TYPES.SALES_FILTER}));
  };

  useEffect(() => {
    dispatch(getSalesContent())
  }, [])  
    
  // PAGINATION
  const [searchText, setSearchText] = useState(""); // Untuk teks pencarian
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const itemsPerPage = 10; // Jumlah item per halaman

  // Filter data berdasarkan teks pencarian
  const filteredSales = ALLSALESDATA.filter((sales) =>
    sales.customerName.toLowerCase().includes(searchText.toLowerCase())
  );

  // Hitung jumlah halaman
  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

  // Ambil data untuk halaman aktif
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSales.slice(indexOfFirstItem, indexOfLastItem);

  // EXCEL
  const downloadExcel = () => {
    const worksheet = utils.json_to_sheet(ALLSALESDATA); 
    const workbook = utils.book_new(); 
    utils.book_append_sheet(workbook, worksheet, "All Sales"); 
  
    // Buat file Excel
    const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });
  
    // Simpan file dengan nama 'ReturnSalesData.xlsx'
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "ReturnSalesData.xlsx");
  };

  // PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Judul PDF
    doc.text("Sales Data", 14, 10);
  
    // Data tabel
    const tableColumn = ["Date", "Added By", "Customer Name", "Warehouse", "Grand Total", "Paid", "Due" ];
    const tableRows = ALLSALESDATA.map(item => [
      item.date,
      item.addedBy,
      item.customerName,
      item.warehouse,
      item.grandTotal,
      item.paid,
      item.due,
    ]);
  
    // Menambahkan tabel ke PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20, // Posisi awal tabel
    });
  
    // Simpan file sebagai 'AllSalesData.pdf'
    doc.save("ReturnSalesData.pdf");
  };

  // VIEW
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/app/returndetail");
  };

  // DELETE
  const deleteSales = (index) => {
    dispatch(openModal({
        title: "Delete",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: { 
            message: `Are you sure you want to delete this data?`, 
            type: CONFIRMATION_MODAL_CLOSE_TYPES.SALES_DELETE, 
            index,
            onConfirm: () => handleDeleteConfirmation(index) 
        }
    }));
  };

  // Status
  const getDummyStatus = (index) => {
    if (index % 5 === 0) {
        return (
            <div className="badge badge-success">
                <span className="text-white px-1">Delivered</span>
            </div>
        );
    } else if (index % 5 === 1) {
        return (
            <div className="badge bg-gray-500">
                <span className="text-white px-2">Pending</span>
            </div>
        );
    } else {
        return null; // Atau ganti dengan badge lainnya jika dibutuhkan
    }
  };


  const handleDeleteConfirmation = async (index) => {
      dispatch(deleteSales(index)); 

      // Tampilkan notifikasi
      dispatch(showNotification({
          message: "Data deleted successfully!",
          status: 1 
      }));
  };

  return (
    <>
      <TitleCard title="Return Sales Management">

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
                onClick={() => openSalesFilter()} >
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
            </div>
        </div>

        {/* Tabel pelanggan */}
        <div className="w-full">
            <table className="table w-full table-auto">
            <thead>
                <tr>
                <th className="text-center text-primary text-base">Date</th>
                <th className="text-center text-primary text-base">Added By</th>
                <th className="text-center text-primary text-base">Customer</th>
                <th className="text-center text-primary text-base">Warehouse</th>
                <th className="text-center text-primary text-base">Grand Total</th>
                <th className="text-center text-primary text-base">Paid</th>
                <th className="text-center text-primary text-base">Due</th> 
                <th className="text-center text-primary text-base">Status</th>                
                <th className="text-center text-primary text-base">Action</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map((sales, index) => (
                  <tr key={index}>
                    <td className="text-center">{sales.date}</td>
                    <td className="text-center">{sales.addedBy}</td>
                    <td className="text-center">{sales.customerName}</td>
                    <td className="text-center">{sales.warehouse}</td>
                    <td className="text-center">{sales.grandTotal}</td>
                    <td className="text-center">{sales.paid}</td>
                    <td className="text-center">{sales.due}</td>
                    <td className="text-center">{getDummyStatus(index)}</td>
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
                                <li onClick={handleClick}>
                                  <span>View</span>
                                </li>
                          </div>         

                          {/* Delete */}
                          <div className="flex items-center ml-2">
                              <Trash className="h-5 w-5 inline-block" />
                              <li onClick={() => deleteSales(index)}>  
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

export default ReturnSales;
