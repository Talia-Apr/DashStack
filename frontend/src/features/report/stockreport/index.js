import { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import PageControl from "../../../components/PageControl/PageControl";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import {
  DocumentTextIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import ReportPageStock from "./reportstock/index"; 

function StockReport() {
  const [data] = useState([
    {
      code: "87654321",
      name: "Strawberry",
      Category: "buah",
      CurrentStock: "102 kg",
    },
    {
      code: "87654321",
      name: "adidas",
      Category: "sepatu",
      CurrentStock: "102 pc",
    },
  ],);


  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  // Fungsi untuk memfilter data berdasarkan pencarian
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "Stock Report.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Stock Report", 10, 10);
    const tableData = filteredData.map((item) => [
      item.code,
      item.name,
      item.Category,
      item.CurrentStock,
    ]);
    doc.autoTable({
      head: [["Code", "Product", "Category", "Current Stock"]],
      body: tableData,
    });
    doc.save("Stock Report.pdf");
  };

  const [isReportPageStock, setIsReportPageStock] = useState(false); // Menentukan apakah menampilkan halaman ReportPage
  const navigateToReportPageStock = () => setIsReportPageStock(true); // Navigasi ke ReportPage
  if (isReportPageStock) {
    return <ReportPageStock />; // Tampilkan ReportPage jika state isReportPage true
  }

  return (
    <div className="flex flex-col items-center h-screen pt-10 px-4">
      <TitleCard title="Stock Report" topMargin="mt-2">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 w-full">
  {/* Search Bar */}
  <div className="relative w-full sm:w-1/4">
    <input
      type="text"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder="Search"
      className="input input-bordered w-full h-10"
    />
  </div>
  {/* Buttons */}
  <div className="w-full sm:w-1/4 mt-4 sm:mt-0 flex sm:justify-end space-x-4">
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

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Code</th>
                <th>Product</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((stok, index) => (
                <tr key={index}>
                  <td>{stok.code}</td>
                  <td>{stok.name}</td>
                  <td>{stok.Category}</td>
                  <td>{stok.CurrentStock}</td>
                  <td>
                    <button
                      onClick={navigateToReportPageStock}
                      className="btn btn-outline border-[#7e7e7e] text-white bg-[#4338CA] text-xs px-5 py-4"
                    >
                      Reports
                    </button>
                  </td>
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
      </TitleCard>
    </div>
  );
}

export default StockReport;
