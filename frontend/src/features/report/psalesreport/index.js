import { useState } from "react";
import {
  FunnelIcon,
  DocumentTextIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import PageControl from "../../../components/PageControl/PageControl";
import TitleCard from "../../../components/Cards/TitleCard";
import FilterProductSales from "./FilterP/FilterPSales";
import Datepicker from "react-tailwindcss-datepicker";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

function PSalesReport() {
  const [data] = useState([
    {
      date: "2024-11-06",
      reference: "SI_1117",
      customer: "Petter Ethan D Kenzo",
      warehouse: "Warehouse 1",
      product: "Apel",
      qtySold: 10,
      grandTotal: 1000000,
    },
    {
      date: "2024-12-06",
      reference: "SI_1118",
      customer: "Rachma Shafira",
      warehouse: "Warehouse 2",
      product: "Jeruk",
      qtySold: 10,
      grandTotal: 1000000,
    },
  ]);

  const [dateValue, setDateValue] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const [filter, setFilter] = useState({
    customer: "",
    warehouse: "",
  });

  const filteredData = data.filter((item) => {
    // Filter berdasarkan pencarian teks
    const matchesSearch = searchText
      ? Object.values(item).some((value) =>
          value?.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      : true;
  
    // Filter berdasarkan key-value dari filter objek
    const matchesFilter = filter
      ? Object.keys(filter).every((key) => {
          return filter[key]
            ? item[key]?.toString().toLowerCase().includes(filter[key].toLowerCase())
            : true;
        })
      : true;
  
    // Filter berdasarkan rentang tanggal
    const matchesDate = dateValue
      ? item.date >= dateValue.startDate && item.date <= dateValue.endDate
      : true;
  
    // Menggabungkan semua kondisi filter
    return matchesSearch && matchesFilter && matchesDate;
  });  

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleDatePickerValueChange = (value) => setDateValue(value);
  const handlePageChange = (page) => setCurrentPage(page);
  const handleRowsPerPageChange = (rows) => setRowsPerPage(rows);
  const openFilter = () => setIsFilterVisible(true);
  const closeFilter = () => setIsFilterVisible(false);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Product Sales Report", 10, 10);
    const tableData = filteredData.map((sale) => [
      sale.date,
      sale.reference,
      sale.customer,
      sale.warehouse,
      sale.product,
      sale.qtySold,
      formatToRupiah(sale.grandTotal),
    ]);
    doc.autoTable({
      head: [
        [
          "Date",
          "Reference",
          "Customer",
          "Warehouse",
          "Product",
          "Qty Sold",
          "Grand Total",
        ],
      ],
      body: tableData,
    });
    doc.save("Product Sales Report.pdf");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((item) => ({
        ...item,
        grandTotal: formatToRupiah(item.grandTotal),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, "Product Sales Report.xlsx");
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

      <TitleCard title="Product Sales Report" topMargin="mt-2">
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
                {[
                  "Date",
                  "Reference",
                  "Customer",
                  "Warehouse",
                  "Product",
                  "Qty Sold",
                  "Grand Total",
                ].map((header, i) => (
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
                  <td className="py-3 px-4 text-sm">{sale.customer}</td>
                  <td className="py-3 px-4 text-sm">{sale.warehouse}</td>
                  <td className="py-3 px-4 text-sm">{sale.product}</td>
                  <td className="py-3 px-4 text-sm">{sale.qtySold}</td>
                  <td className="py-3 px-4 text-sm">{formatToRupiah(sale.grandTotal)}</td>
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
        <FilterProductSales
          isVisible={isFilterVisible}
          onClose={closeFilter}
          filter={filter}
          onFilterChange={setFilter}
        />
      </TitleCard>
    </div>
  );
}

export default PSalesReport;
