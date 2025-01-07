import { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import PageControl from "../../../components/PageControl/PageControl";
import { DocumentTextIcon, EyeIcon } from "@heroicons/react/24/outline";
import ReportPageSupplier from "./reportsupplier/index";
import { jsPDF } from "jspdf";

function SupplierReport() {
  const [data] = useState([
    {
      SupplierName: "Shafira Supply",
      Phone: "08123456789",
      Purchases: "3",
      TotalAmount: "118000000",
      Paid: "118000000",
      TotalPurchaseDue: 0,
      TotalPurchaseReturnDue: 0,
    },
    {
      SupplierName: "Rachma Supply",
      Phone: "08123456789",
      Purchases: "2",
      TotalAmount: "20000000",
      Paid: "18000000",
      TotalPurchaseDue: 2000000,
      TotalPurchaseReturnDue: 0,
    },
  ]);

  const [searchText, setSearchText] = useState(""); // filter by search
  const [currentPage, setCurrentPage] = useState(1); // page control
  const [rowsPerPage, setRowsPerPage] = useState(5); // page control

  // Filtered data based on search text
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

  // Format to Rupiah
  const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const [isReportPageStock, setIsReportPageStock] = useState(false); // Menentukan apakah menampilkan halaman ReportPage
  const navigateToReportPageStock = () => setIsReportPageStock(true); // Navigasi ke ReportPage

  // Handle export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Supplier Report", 10, 10);
    const tableData = filteredData.map((supplier) => [
      supplier.SupplierName,
      supplier.Phone,
      supplier.Purchases,
      formatToRupiah(supplier.TotalAmount),
      formatToRupiah(supplier.Paid),
      formatToRupiah(supplier.TotalPurchaseDue),
      formatToRupiah(supplier.TotalPurchaseReturnDue),
    ]);
    doc.autoTable({
      head: [
        ["Supplier Name", "Phone", "Purchases", "Total Amount", "Paid", "Total Purchases Due", "Total Purchases Return Due",],
      ],
      body: tableData,
    });
    doc.save("Supplier Report.pdf");
  };

  if (isReportPageStock) {
    return <ReportPageSupplier />; // Tampilkan ReportPage jika state isReportPage true
  }

  return (
    <div className="flex flex-col items-center h-screen pt-10 px-4">
      <TitleCard title="Supplier Report" topMargin="mt-2">
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
                {["Supplier Name", "Phone", "Purchases", "Total Amount", "Paid", "Total Purchases Due", "Total Purchases Return Due", "Action"].map((header, i) => (
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
              {currentData.map((supplier, index) => (
                <tr key={index}>
                  <td>{supplier.SupplierName}</td>
                  <td>{supplier.Phone}</td>
                  <td>{supplier.Purchases}</td>
                  <td>{formatToRupiah(supplier.TotalAmount)}</td>
                  <td>{formatToRupiah(supplier.Paid)}</td>
                  <td>{formatToRupiah(supplier.TotalPurchaseDue)}</td>
                  <td>{formatToRupiah(supplier.TotalPurchaseReturnDue)}</td>
                  <td>
                    {/* Buttons Container */}
                    <div className="flex space-x-2">
                      {/* View Button */}
                      <button
                        className="p-2 bg-base-100 rounded"
                        onClick={navigateToReportPageStock}
                      >
                        <EyeIcon className="w-5 h-5 text-[#4880FF]" />
                      </button>
                    </div>
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

export default SupplierReport;