import { useState } from "react";
import {FunnelIcon, DocumentTextIcon, DocumentArrowDownIcon,} from "@heroicons/react/24/outline";
import PageControl from "../../../../components/PageControl/PageControl";
import TitleCard from "../../../../components/Cards/TitleCard";
import FilterProduct from "./Filter/filter";
import Datepicker from "react-tailwindcss-datepicker";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";

function ReportPage() {
  //dummy data
  const [data] = useState([
    { date: "2024-08-11", reference: "SL_117", addedBy: "Shafira", productName: "Nanas", customer: "Petter", warehouse: "Warehouse 1", quantity: 7, subtotal: 12000000, },
    { date: "2024-08-12", reference: "SL_118",  addedBy: "Rachma", productName: "Apel", customer: "Louis", warehouse: "Warehouse 2", quantity: 12, subtotal: 18000000, },
  ]);

  const [dateValue, setDateValue] = useState(null); // Nilai awal adalah null
  const [searchText, setSearchText] = useState(""); // filter by search
  const [currentPage, setCurrentPage] = useState(1); //pagecontrol
  const [rowsPerPage, setRowsPerPage] = useState(5); //pagecontrol
  const [isFilterVisible, setIsFilterVisible] = useState(false); //filter by button

  //filter by button
  const [filter, setFilter] = useState({
    reference: "",
    customer: "",
    warehouse: "",
    vendeur: "",
  });
  
  const filteredData = data
  .filter((item) => {
    // Filter button berdasarkan Reference
    if (filter.reference && !item.reference.toLowerCase().includes(filter.reference.toLowerCase())) {
      return false;
    }
    // Filter button berdasarkan Customer
    if (filter.customer && !item.customer.toLowerCase().includes(filter.customer.toLowerCase())) {
      return false;
    }
    // Filter button berdasarkan Warehouse
    if (filter.warehouse && filter.warehouse !== "Choose Warehouse" && item.warehouse !== filter.warehouse) {
      return false;
    }
    return true;
  })
    // Fungsi untuk memfilter data berdasarkan pencarian
    .filter((item) => {
      return Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchText.toLowerCase())
      );
    })    
  .filter((item) => {
    // Filter berdasarkan tanggal
    if (!dateValue || (!dateValue.startDate && !dateValue.endDate)) {
      return true; // Jika dateValue null, tampilkan semua data
    }
    const startDate = dateValue.startDate ? new Date(dateValue.startDate) : null;
    const endDate = dateValue.endDate ? new Date(dateValue.endDate) : null;
    const itemDate = new Date(item.date);

    // Pastikan startDate dan endDate valid
    if (startDate && isNaN(startDate.getTime())) return false; // Invalid startDate
    if (endDate && isNaN(endDate.getTime())) return false; // Invalid endDate

    return (
      (!startDate || itemDate >= startDate) && 
      (!endDate || itemDate <= endDate)
    );
  });
  
  //datepicker
  const handleDatePickerValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setDateValue(newValue);
  };

  //open filter by button
  const openFilter = () => setIsFilterVisible(true);
  const closeFilter = () => setIsFilterVisible(false);
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handlePageChange = (page) => setCurrentPage(page);
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  //nominal rupiah
  const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  //handle isi excel
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((item) => ({
        ...item,
        subtotal: formatToRupiah(item.subtotal), // Panggilan fungsi diperbaiki
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Product Data");
    XLSX.writeFile(workbook, "Sales Product Report.xlsx");
  };

  //handle isi pdf
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Sales Product Report", 10, 10);
    const tableData = filteredData.map((sale) => [
      sale.date,
      sale.reference,
      sale.addedBy,
      sale.productName,
      sale.customer,
      sale.warehouse,
      sale.quantity,
      formatToRupiah(sale.subtotal),
    ]);
    doc.autoTable({
      head: [
        [
          "Date",
          "Reference",
          "Added By",
          "Product Name",
          "Customer",
          "Warehouse",
          "Quantity",
          "Subtotal",
        ],
      ],
      body: tableData,
    });
    doc.save("Sales Product Report.pdf");
  };

  return (
    <div className="flex flex-col items-center h-screen pt-10 px-4">
      <div className="flex justify-center w-full mb-1">
        <Datepicker
          containerClassName="w-full sm:w-72"
          value={dateValue}
          theme="light"
          inputClassName="input input-bordered w-full sm:w-72 text-center"
          popoverDirection="down-start"
          toggleClassName="invisible"
          onChange={handleDatePickerValueChange}
          showShortcuts={true}
          primaryColor="white"
        />
      </div>

      <TitleCard title="Sales" topMargin="mt-2">
        <div className="flex w-full items-center justify-between flex-wrap">
        <div className="flex-grow sm:flex-grow-0 mr-4">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search"
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex space-x-2 mt-2 sm:mt-0">
            <button
              onClick={openFilter}
              className="btn btn-outline btn-primary flex items-center text-sm h-10"
            >
              <FunnelIcon className="w-5 h-5 mr-1" />
              Filter
            </button>
            <button
              className="btn btn-outline btn-success flex items-center"
              onClick={handleExportExcel}
            >
              <DocumentArrowDownIcon className="w-5 h-5 mr-1" />
               Excel
            </button>
            <button
              className="btn btn-outline btn-error flex items-center"
              onClick={handleExportPDF}
            >
              <DocumentTextIcon className="w-5 h-5 mr-1" />
               PDF
            </button>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                {["Date", "Reference", "Added By", "Product Name", "Customer", "Warehouse", "Quantity", "Subtotal"].map((header, i) => (
                  <th
                    key={i}
                    className="border-b py-3 px-4 text-left text-sm font-semibold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((sale, index) => (
                <tr key={index} className="hover:bg-gray-50">
                 <td className="py-3 px-4 text-sm">{sale.date}</td>
                 <td className="py-3 px-4 text-sm">{sale.reference}</td>
                 <td className="py-3 px-4 text-sm">{sale.addedBy}</td>
                 <td className="py-3 px-4 text-sm">{sale.productName}</td>
                 <td className="py-3 px-4 text-sm">{sale.customer}</td>
                 <td className="py-3 px-4 text-sm">{sale.warehouse}</td>
                 <td className="py-3 px-4 text-sm">{sale.quantity}</td>
                 <td className="py-3 px-4 text-sm">{formatToRupiah(sale.subtotal)}</td>
               </tr>
             ))}
            </tbody>
          </table>
        </div>
        <PageControl
          totalItems={filteredData.length}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
        <FilterProduct
        isVisible={isFilterVisible}
        onClose={closeFilter}
        filter={filter}
        onFilterChange={setFilter}
      />
      </TitleCard>
    </div>
  );
}

export default ReportPage;
