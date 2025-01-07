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
import { deleteSupplier, editSupplier, getSuppliersContent } from "../supplier/supplierSlice";
import { RIGHT_DRAWER_TYPES, CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../../../src/utils/globalConstantUtil';

export const SUPPLIERDATA = [
    { supplierId: 1, code: "43567", name: "Gina Maulinda", phone: "0893847829", email: "gina@gmail.com", city: "Surabaya", tax: "100", purchaseDue: "20.00", totalReturn: "0.00", address: "Jl. Tunjungan No.10" },
    { supplierId: 2, code: "43568", name: "Budi Santoso", phone: "0812345678", email: "budi@gmail.com", city: "Jakarta", tax: "150", purchaseDue: "35.00", totalReturn: "5.00", address: "Jl. Sudirman No.25" },
    { supplierId: 3, code: "43569", name: "Siti Aisyah", phone: "0823456789", email: "siti@gmail.com", city: "Bandung", tax: "120", purchaseDue: "50.00", totalReturn: "10.00", address: "Jl. Braga No.5" },
    { supplierId: 4, code: "43570", name: "Andi Wijaya", phone: "0856789123", email: "andi@gmail.com", city: "Medan", tax: "80", purchaseDue: "15.00", totalReturn: "2.00", address: "Jl. Ahmad Yani No.8" },
    { supplierId: 5, code: "43571", name: "Dewi Kartika", phone: "0876543210", email: "dewi@gmail.com", city: "Malang", tax: "200", purchaseDue: "100.00", totalReturn: "25.00", address: "Jl. Ijen No.12" },
    { supplierId: 6, code: "43572", name: "Rahmat Hidayat", phone: "0834567890", email: "rahmat@gmail.com", city: "Semarang", tax: "110", purchaseDue: "45.00", totalReturn: "8.00", address: "Jl. Pandanaran No.3" },
    { supplierId: 7, code: "43573", name: "Maria Kristina", phone: "0867891234", email: "maria@gmail.com", city: "Yogyakarta", tax: "140", purchaseDue: "60.00", totalReturn: "12.00", address: "Jl. Malioboro No.15" },
    { supplierId: 8, code: "43574", name: "Hendra Pratama", phone: "0890123456", email: "hendra@gmail.com", city: "Bali", tax: "90", purchaseDue: "25.00", totalReturn: "4.00", address: "Jl. Sunset Road No.9" },
    { supplierId: 9, code: "43575", name: "Fitri Rahmawati", phone: "0845678912", email: "fitri@gmail.com", city: "Bogor", tax: "130", purchaseDue: "75.00", totalReturn: "18.00", address: "Jl. Pajajaran No.11" },
    { supplierId: 10, code: "43576", name: "Eko Setiawan", phone: "0801234567", email: "eko@gmail.com", city: "Makassar", tax: "100", purchaseDue: "30.00", totalReturn: "6.00", address: "Jl. Pettarani No.20" },
    { supplierId: 11, code: "43577", name: "Lina Susanti", phone: "0823456781", email: "lina@gmail.com", city: "Lampung", tax: "160", purchaseDue: "85.00", totalReturn: "20.00", address: "Jl. Raden Intan No.7" },
    { supplierId: 12, code: "43578", name: "Agus Priyanto", phone: "0812345679", email: "agus@gmail.com", city: "Pontianak", tax: "70", purchaseDue: "10.00", totalReturn: "1.00", address: "Jl. Gajah Mada No.13" },
    { supplierId: 13, code: "43579", name: "Rini Hartati", phone: "0887654321", email: "rini@gmail.com", city: "Palembang", tax: "180", purchaseDue: "95.00", totalReturn: "22.00", address: "Jl. Sudirman No.30" },
];

function Supplier() {
  const [supplier] = useState(SUPPLIERDATA);

  // DROPDOWN
  const [openDropdown, setOpenDropdown] = useState(null);
  const dispatch = useDispatch();

  // Mengaktifkan Dropdown
  const handleActionClick = (index) => {
    setOpenDropdown(openDropdown === index ? null : index); 
  };

  // FILTER
  const openSupplierFilter = () => {
    dispatch(openRightDrawer({header : "Filters", bodyType : RIGHT_DRAWER_TYPES.SUPPLIER_FILTER}));
  };

  useEffect(() => {
    dispatch(getSuppliersContent())
  }, [])  
    
  // PAGINATION
  const [searchText, setSearchText] = useState(""); // Untuk teks pencarian
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const itemsPerPage = 10; // Jumlah item per halaman

  // Filter data berdasarkan teks pencarian
  const filteredSupplier = SUPPLIERDATA.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Hitung jumlah halaman
  const totalPages = Math.ceil(filteredSupplier.length / itemsPerPage);

  // Ambil data untuk halaman aktif
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSupplier.slice(indexOfFirstItem, indexOfLastItem);

  // EXCEL
  const downloadExcel = () => {
    const worksheet = utils.json_to_sheet(SUPPLIERDATA); // Ubah data JSON ke format Excel
    const workbook = utils.book_new(); // Buat workbook baru
    utils.book_append_sheet(workbook, worksheet, "Supplier"); // Tambahkan worksheet ke workbook
  
    // Buat file Excel
    const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });
  
    // Simpan file dengan nama 'CustomerData.xlsx'
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "SupplierData.xlsx");
  };

  // PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Judul PDF
    doc.text("Supplier Data", 14, 10);
  
    // Data tabel
    const tableColumn = ["Code", "Name", "Phone", "Email", "City", "Tax Number", "Total Purchase Due", "Total Purchase Return Due"];
    const tableRows = SUPPLIERDATA.map(item => [
      item.code,
      item.name,
      item.phone,
      item.email,
      item.city,
      item.tax,
      item.purchaseDue,
      item.totalReturn,
    ]);
  
    // Menambahkan tabel ke PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20, // Posisi awal tabel
    });
  
    // Simpan file sebagai 'CustomerData.pdf'
    doc.save("SupplierData.pdf");
  };

   
  // CREATE
  const openCreateSupplier = () => {
    dispatch(openModal({title : "Create Supplier", bodyType : MODAL_BODY_TYPES.SUPPLIER_ADD_NEW}))
  }

  // EDIT
  const openEditSupplier = () => {
    dispatch(openModal({title : "Edit Supplier", bodyType : MODAL_BODY_TYPES.SUPPLIER_EDIT}))
  }

  // VIEW
  const openViewSupplier = () => {
    dispatch(openModal({title : "Supplier Details", bodyType : MODAL_BODY_TYPES.SUPPLIER_VIEW}))
  }

  // DELETE
  const deleteSupplier = (index) => {
    dispatch(openModal({
        title: "Delete",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: { 
            message: `Are you sure you want to delete this supplier?`, 
            type: CONFIRMATION_MODAL_CLOSE_TYPES.SUPPLIER_DELETE, 
            index,
            onConfirm: () => handleDeleteConfirmation(index) 
        }
    }));
  };

  const handleDeleteConfirmation = async (index) => {
      dispatch(deleteSupplier(index)); 

      // Tampilkan notifikasi
      dispatch(showNotification({
          message: "Supplier deleted successfully!",
          status: 1 
      }));
  };

  return (
    <>
      <TitleCard title="Supplier Management">

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
                onClick={() => openSupplierFilter()} >
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
                onClick={() => openCreateSupplier()}>
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
                    <th className="text-center text-primary text-base">City</th>
                    <th className="text-center text-primary text-base">
                    Total Purchase <br /> Due
                    </th>
                    <th className="text-center text-primary text-base">
                    Total Purchase <br /> Return Due
                    </th>
                    <th className="text-center text-primary text-base">Action</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map((supplier, index) => (
                  <tr key={index}>
                    <td className="text-center">{supplier.code}</td>
                    <td className="text-center">{supplier.name}</td>
                    <td className="text-center">{supplier.phone}</td>
                    <td className="text-center">{supplier.email}</td>
                    <td className="text-center">{supplier.tax}</td>
                    <td className="text-center">{supplier.city}</td>
                    <td className="text-center">{supplier.purchaseDue}</td>
                    <td className="text-center">{supplier.totalReturn}</td>
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
                              <li onClick={() => openViewSupplier(supplier.supplierId)}>    
                                  <span>View</span>
                              </li>
                          </div>
                          
                          {/* Edit */}
                          <div className="flex items-center ml-2">
                            <PencilSquare className="h-5 w-5 inline-block" />
                            <li onClick={() => openEditSupplier(supplier.supplierId)}> 
                                <span>Edit</span>
                            </li>
                          </div>

                          {/* Delete */}
                          <div className="flex items-center ml-2">
                              <Trash className="h-5 w-5 inline-block" />
                              <li onClick={() => deleteSupplier(index)}>  
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

export default Supplier;
