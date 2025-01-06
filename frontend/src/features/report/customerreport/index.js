import { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import PageControl from "./reportcustomer/component/PageControl";
import ReportPageCustomer from "./reportcustomer/index";
import { EyeIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Fungsi untuk format Rupiah
const formatToRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

function CustomerReport() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getCurrentData = (data) => {
    if (!data || data.length === 0) return [];
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const [data] = useState([
    {
      Name: "Shafira",
      Phone: "08123456789",
      Totalsales: 3,
      Amount: 18000,
      Paid: 18000,
      TotalSaleDue: 10000,
      TotalSellReturnDue: 0,
    },
    {
      Name: "Rachma",
      Phone: "08123456780",
      Totalsales: 5,
      Amount: 30000,
      Paid: 30000,
      TotalSaleDue: 10000,
      TotalSellReturnDue: 0,
    },
  ]);

  // Fungsi untuk memfilter data berdasarkan pencarian
  const filtered = data.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    doc.text("Customer Report", 10, 10);
    doc.text(`Generated on: ${formattedDate}`, 10, 20);

    const tableData = data.map((customer) => [
      customer.Name,
      customer.Phone,
      customer.Totalsales,
      formatToRupiah(customer.Amount),
      formatToRupiah(customer.Paid),
      formatToRupiah(customer.TotalSaleDue),
      formatToRupiah(customer.TotalSellReturnDue),
    ]);

    doc.autoTable({
      head: [["Name", "Phone", "Total Sales", "Amount", "Paid", "Total Sale Due", "Total Sell Return Due"]],
      body: tableData,
      startY: 30,
    });

    doc.save("Customer Report.pdf");
  };

  const [isReportPageCustomer, setIsReportPageCustomer] = useState(false);
  const navigateToReportPageCustomer = () => setIsReportPageCustomer(true);

  if (isReportPageCustomer) {
    return <ReportPageCustomer />;
  }

  return (
    <div className="flex flex-col items-center h-screen pt-10 px-4">
      <TitleCard title="Customer Report" topMargin="mt-2">
        <div className="flex w-full items-center justify-between flex-wrap">
          <div className="relative">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-2 sm:mt-0 ml-auto">
            <button
              onClick={handleExportPDF}
              className="btn btn-outline btn-error flex items-center text-sm h-10"
            >
              <DocumentTextIcon className="w-5 h-5 mr-1" />
              PDF
            </button>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Total Sales</th>
                <th>Amount</th>
                <th>Paid</th>
                <th>Total Sale Due</th>
                <th>Total Sell Return Due</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentData(filtered).length > 0 ? (
                getCurrentData(filtered).map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.Name}</td>
                    <td>{customer.Phone}</td>
                    <td>{customer.Totalsales}</td>
                    <td>{formatToRupiah(customer.Amount)}</td>
                    <td>{formatToRupiah(customer.Paid)}</td>
                    <td>{formatToRupiah(customer.TotalSaleDue)}</td>
                    <td>{formatToRupiah(customer.TotalSellReturnDue)}</td>
                    <td>
                      <div className="flex space-x-2">
                        <button
                          className="p-2 bg-base-100 rounded"
                          onClick={navigateToReportPageCustomer}
                        >
                          <EyeIcon className="w-5 h-5 text-[#4880FF]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <PageControl
          totalItems={filtered.length}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TitleCard>
    </div>
  );
}

export default CustomerReport;
