import { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import PageControl from "../../../components/PageControl/PageControl";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import { DocumentTextIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import ReportPage from "./reportproduct/index";

function ProductReport() {
  const [data] = useState([
    {
      code: "123",
      name: "Pisang",
      totalSales: "40kg",
      totalAmount: 1200000,
    },
    {
      code: "456",
      name: "Jeruk",
      totalSales: "100kg",
      totalAmount: 20000000,
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchText, setSearchText] = useState("");
  
  // Fungsi untuk memfilter data berdasarkan pencarian
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
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
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((item) => ({
        ...item,
        totalAmount: `Rp${item.totalAmount.toLocaleString("id-ID")}`,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "Product Report.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Product Report", 10, 10);
    const tableData = filteredData.map((item) => [
      item.code,
      item.name,
      item.totalSales,
      `Rp${item.totalAmount.toLocaleString("id-ID")}`,
    ]);
    doc.autoTable({
      head: [["Code", "Product", "Total Sales", "Total Amount"]],
      body: tableData,
    });
    doc.save("Product Report.pdf");
  };

  const [isReportPage, setIsReportPage] = useState(false);
  const navigateToReportPage = () => setIsReportPage(true);

  if (isReportPage) {
    return <ReportPage />;
  }

  return (
    <div className="flex flex-col items-center h-screen pt-10 px-4">
      <TitleCard title="Product Report" topMargin="mt-2">
        <div className="flex w-full items-center justify-between flex-wrap">
          {/* Search Bar */}
          <div className="flex-grow sm:flex-grow-0 mr-4">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search"
              className="input input-bordered w-full"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-2 mt-2 sm:mt-0">
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
                <th>Total Sales</th>
                <th>Total Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((product, index) => (
                <tr key={index}>
                  <td>{product.code}</td>
                  <td>{product.name}</td>
                  <td>{product.totalSales}</td>
                  <td>Rp{product.totalAmount.toLocaleString("id-ID")}</td>
                  <td>
                    <button
                      onClick={navigateToReportPage}
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

export default ProductReport;
