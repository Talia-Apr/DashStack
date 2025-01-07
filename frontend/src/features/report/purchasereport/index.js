import { useState } from "react";
import {
  FunnelIcon,
  DocumentTextIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import PageControl from "../../../components/PageControl/PageControl";
import TitleCard from "../../../components/Cards/TitleCard";
import FilterPurchase from "./PUFilter/PurchaseFilter";
import Datepicker from "react-tailwindcss-datepicker";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";

function PurchaseReport() {
  const [data] = useState([
    {
      date: "2024-12-10",
      reference: "SL_0005",
      supplier: "Louis Nathan D Kenzo",
      warehouse: "Warehouse 1",
      status: "Pending",
      grandTotal: 20000000,
      paid: 0,
      due: 20000000,
      paymentStatus: "Unpaid",
    },
    {
      date: "2024-12-12",
      reference: "SL_0006",
      supplier: "Rara",
      warehouse: "Warehouse 2",
      status: "Received",
      grandTotal: 20000000,
      paid: 20000000,
      due: 0,
      paymentStatus: "Paid",
    },
  ]);

  const [dateValue, setDateValue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [filter, setFilter] = useState({
    reference: "",
    supplier: "",
    warehouse: "",
    status: "",
    paymentStatus: "",
  });

  const filteredData = data
    .filter((item) => {
      if (filter.reference && !item.reference.toLowerCase().includes(filter.reference.toLowerCase())) return false;
      if (filter.supplier && !item.supplier.toLowerCase().includes(filter.supplier.toLowerCase())) return false;
      if (filter.warehouse && filter.warehouse !== "Choose Warehouse" && item.warehouse !== filter.warehouse) return false;
      if (filter.status && filter.status !== "Choose Status" && item.status !== filter.status) return false;
      if (filter.paymentStatus && filter.paymentStatus !== "Choose Payment Status" && item.paymentStatus !== filter.paymentStatus) return false;
      return true;
    })
    .filter((item) => {
      if (!dateValue || (!dateValue.startDate && !dateValue.endDate)) return true;
      const startDate = dateValue.startDate ? new Date(dateValue.startDate) : null;
      const endDate = dateValue.endDate ? new Date(dateValue.endDate) : null;
      const itemDate = new Date(item.date);
      return (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
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
    const totalRow = {
      date: "TOTAL",
      reference: "",
      supplier: "",
      warehouse: "",
      status: "",
      grandTotal: formatToRupiah(calculateTotal("grandTotal")),
      paid: formatToRupiah(calculateTotal("paid")),
      due: formatToRupiah(calculateTotal("due")),
      paymentStatus: "",
    };
  
    const exportData = [
      ...filteredData.map(item => ({
        ...item,
        grandTotal: formatToRupiah(item.grandTotal),
        paid: formatToRupiah(item.paid),
        due: formatToRupiah(item.due),
      })),
      totalRow
    ];
  
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Data");
    XLSX.writeFile(workbook, "Purchase Report.xlsx");
  };
  

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Purchase Report", 10, 10);

    const tableData = filteredData.map((purchase) => [
      purchase.date,
      purchase.reference,
      purchase.supplier,
      purchase.warehouse,
      purchase.status,
      formatToRupiah(purchase.grandTotal),
      formatToRupiah(purchase.paid),
      formatToRupiah(purchase.due),
      purchase.paymentStatus,
    ]);

    // Menambahkan baris total ke data tabel
    tableData.push([
      "TOTAL",
      "",
      "",
      "",
      "",
      formatToRupiah(calculateTotal("grandTotal")),
      formatToRupiah(calculateTotal("paid")),
      formatToRupiah(calculateTotal("due")),
      "",
    ]);

    doc.autoTable({
      head: [["Date", "Reference", "Supplier", "Warehouse", "Status", "Grand Total", "Paid", "Due", "Payment Status"]],
      body: tableData,
      startY: 20,
    });

    doc.save("Purchase Report.pdf");
  };

  const calculateTotal = (key) => {
    return filteredData.reduce((acc, item) => acc + item[key], 0);
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

      <TitleCard title="Purchase Report" topMargin="mt-2">
        <div className="flex justify-end space-x-2 mt-2 sm:mt-0 ml-auto">
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <button
              onClick={openFilter}
              className="btn btn-outline btn-primary flex items-center text-sm h-10"
            >
              <FunnelIcon className="w-5 h-5 mr-1" />
              Filter
            </button>
            <button className="btn btn-outline btn-success flex items-center" onClick={handleExportExcel}>
              <DocumentArrowDownIcon className="w-5 h-5 mr-1" />
              Excel
            </button>
            <button className="btn btn-outline btn-error flex items-center" onClick={handleExportPDF}>
              <DocumentTextIcon className="w-5 h-5 mr-1" />
              PDF
            </button>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                {["Date", "Reference", "Supplier", "Warehouse", "Status", "Grand Total", "Paid", "Due", "Payment Status"].map((header, i) => (
                  <th key={i} className="border-b py-3 px-4 text-left text-sm font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((purchase, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{purchase.date}</td>
                  <td className="py-3 px-4 text-sm">{purchase.reference}</td>
                  <td className="py-3 px-4 text-sm">{purchase.supplier}</td>
                  <td className="py-3 px-4 text-sm">{purchase.warehouse}</td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`px-2 py-1 text-xs rounded-md ${
                        purchase.status === "Received"
                          ? "text-[#38CA58] border border-[#38CA58]"
                          : purchase.status === "Pending"
                          ? "text-[#4338CA] border border-[#4338CA]"
                          : purchase.status === "Ordered"
                          ? "text-[#E98718] border border-[#E98718]"
                          : ""
                      }`}
                    >
                      {purchase.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">{formatToRupiah(purchase.grandTotal)}</td>
                  <td className="py-3 px-4 text-sm">{formatToRupiah(purchase.paid)}</td>
                  <td className="py-3 px-4 text-sm">{formatToRupiah(purchase.due)}</td>
                  <td className="py-3 px-4 text-sm">
                    <span 
                      className={`px-2 py-1 text-xs rounded-md ${purchase.paymentStatus === "Paid"
                          ? "text-green-500 border border-green-500"
                          : "text-red-500 border border-red-500"
                        }`}
                    >
                      {purchase.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-[#D9D9D9] font-semibold">
                <td className="py-3 px-4 text-neutral text-sm" colSpan={5}>
                  Total
                </td>
                <td className="py-3 px-4 text-neutral text-sm">{formatToRupiah(calculateTotal("grandTotal"))}</td>
                <td className="py-3 px-4 text-neutral text-sm">{formatToRupiah(calculateTotal("paid"))}</td>
                <td className="py-3 px-4 text-neutral text-sm">{formatToRupiah(calculateTotal("due"))}</td>
                <td className="py-3 px-4 text-neutral text-sm"></td>
              </tr>
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

        <FilterPurchase isVisible={isFilterVisible} onClose={closeFilter} filter={filter} onFilterChange={setFilter} />
      </TitleCard>
    </div>
  );
}

export default PurchaseReport;
