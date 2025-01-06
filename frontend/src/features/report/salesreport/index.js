import { useState } from "react";
import {
  FunnelIcon,
  DocumentTextIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import PageControl from "../../../components/PageControl/PageControl";
import TitleCard from "../../../components/Cards/TitleCard";
import FilterSales from "./Filter/FilterSales";
import Datepicker from "react-tailwindcss-datepicker";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";

function SalesReport() {
  const [data] = useState([
    {
      date: "2024-10-26",
      reference: "SL_0005",
      seller: "Reihan Rachma",
      customer: "Shafira",
      warehouse: "Warehouse 1",
      status: "Completed",
      grandTotal: 12000000,
      paid: 12000000,
      due: 0,
      paymentStatus: "Paid",
    },
    {
      date: "2024-11-12",
      reference: "SL_0006",
      seller: "Shafira",
      customer: "Rachma",
      warehouse: "Warehouse 2",
      status: "Ordered",
      grandTotal: 12000000,
      paid: 0,
      due: 12000000,
      paymentStatus: "Unpaid",
    },
  ]);

  //nominal rupiah
  const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const [dateValue, setDateValue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filter, setFilter] = useState({
    reference: "",
    customer: "",
    seller: "",
    warehouse: "",
    status: "",
    paymentStatus: "",
  });

  const filteredData = data
    .filter((item) => {
      if (filter.reference && !item.reference.toLowerCase().includes(filter.reference.toLowerCase())) {
        return false;
      }
      if (filter.customer && !item.customer.toLowerCase().includes(filter.customer.toLowerCase())) {
        return false;
      }
      if (filter.seller && !item.seller.toLowerCase().includes(filter.seller.toLowerCase())) {
        return false;
      }
      if (filter.warehouse && filter.warehouse !== "Choose Warehouse" && item.warehouse !== filter.warehouse) {
        return false;
      }
      if (filter.status && filter.status !== "Choose Status" && item.status !== filter.status) {
        return false;
      }
      if (filter.paymentStatus && filter.paymentStatus !== "Choose Payment Status" && item.paymentStatus !== filter.paymentStatus) {
        return false;
      }
      return true;
    })
    .filter((item) => {
      if (!dateValue || (!dateValue.startDate && !dateValue.endDate)) {
        return true;
      }
      const startDate = dateValue.startDate ? new Date(dateValue.startDate) : null;
      const endDate = dateValue.endDate ? new Date(dateValue.endDate) : null;
      const itemDate = new Date(item.date);

      if (startDate && isNaN(startDate.getTime())) return false;
      if (endDate && isNaN(endDate.getTime())) return false;

      return (
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate)
      );
    });

  const handleDatePickerValueChange = (newValue) => {
    setDateValue(newValue);
  };

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

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData.map((item) => ({
      ...item,
      grandTotal: formatToRupiah(item.grandTotal),
      paid: formatToRupiah(item.paid),
      due: formatToRupiah(item.due),
    }))
  );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, "Sales Report.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Sales Report", 10, 10);

    const tableData = filteredData.map((sale) => [
      sale.date,
      sale.reference,
      sale.seller,
      sale.customer,
      sale.warehouse,
      sale.status,
      formatToRupiah(sale.grandTotal),
      formatToRupiah(sale.paid),
      formatToRupiah(sale.due),
      sale.paymentStatus,
    ]);

    doc.autoTable({
      head: [
        [
          "Date",
          "Reference",
          "Seller",
          "Customer",
          "Warehouse",
          "Status",
          "Grand Total",
          "Paid",
          "Due",
          "Payment Status",
        ],
      ],
      body: tableData,
      startY: 20,
    });

    doc.save("Sales Report.pdf");
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

      <TitleCard title="Sales Report" topMargin="mt-2">
        <div className="flex justify-end space-x-2 mt-2 sm:mt-0 ml-auto">
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
                {["Date", "Reference", "Seller", "Customer", "Warehouse", "Status", "Grand Total", "Paid", "Due", "Payment Status"].map((header, i) => (
                  <th key={i} className="border-b py-3 px-4 text-left text-sm font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((sale, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 text-sm">{sale.date}</td>
                  <td className="py-3 px-4 text-sm">{sale.reference}</td>
                  <td className="py-3 px-4 text-sm">{sale.seller}</td>
                  <td className="py-3 px-4 text-sm">{sale.customer}</td>
                  <td className="py-3 px-4 text-sm">{sale.warehouse}</td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`px-2 py-1 text-xs rounded-md ${
                        sale.status === "Completed"
                          ? "text-[#38CA58] border border-[#38CA58]"
                          : sale.status === "Pending"
                          ? "text-[#4338CA] border border-[#4338CA]"
                          : sale.status === "Ordered"
                          ? "text-[#E98718] border border-[#E98718]"
                          : ""
                      }`}
                    >
                      {sale.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">{formatToRupiah(sale.grandTotal)}</td>
                  <td className="py-3 px-4 text-sm">{formatToRupiah(sale.paid)}</td>
                  <td className="py-3 px-4 text-sm">{formatToRupiah(sale.due)}</td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`px-2 py-1 text-xs rounded-md ${
                        sale.paymentStatus === "Paid"
                          ? "text-[#38CA58] border border-[#38CA58]"
                          : sale.paymentStatus === "Unpaid"
                          ? "text-[#E98718] border border-[#E98718]"
                          : sale.paymentStatus === "Partial"
                          ? "text-[#E98718] border border-[#E98718]"
                          : ""
                      }`}
                    >
                      {sale.paymentStatus}
                    </span>
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
        <FilterSales
          isVisible={isFilterVisible}
          onClose={closeFilter}
          filter={filter}
          onFilterChange={setFilter}
        />
      </TitleCard>
    </div>
  );
}

export default SalesReport;
