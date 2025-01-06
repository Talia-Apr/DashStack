import React, { useState } from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { jsPDF } from "jspdf"; 

const ReturnTable = ({ data, currentPage, rowsPerPage, onPageChange }) => {
  const [searchText, setSearchText] = useState(""); // State untuk teks pencarian

  // Fungsi untuk memfilter data berdasarkan pencarian
  const filtered = data.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

    //nominal rupiah
    const formatToRupiah = (number) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(number);
    };

  // Fungsi untuk mengekspor data ke PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Data Returns Customer Report", 20, 10);

    const tableColumn = ["Reference", "Customer", "Sale Ref", "Warehouse", "Grand Total", "Paid", "Due","Status","Payment Status"];
    const tableRows = filtered.map((row) => [
      row.reference,
      row.customer,
      row.saleref,
      row.warehouse,
      formatToRupiah(row.grandTotal),
      formatToRupiah(row.paid),
      formatToRupiah(row.due),
      row.status,
      row.paymentStatus,
    ]);

    // Menambahkan tabel ke PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: "grid",
    });

    // Menyimpan file PDF dengan nama 'return_data.pdf'
    doc.save("Returns Customer Report.pdf");
  };

  return (
    <div>
      <div className="flex w-full items-center justify-between flex-wrap">
        {/* Search Bar */}
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

      <div className="overflow-x-auto mt-6">
        {/* Tabel data */}
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-base-100">
            <tr>
              {["Reference", "Customer", "Sale Ref", "Warehouse", "Grand Total", "Paid", "Due","Status","Payment Status"].map((header, i) => (
                <th
                  key={i}
                  className="border-b py-3 px-4 text-left text-sm font-semibold bg-base-100"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Menampilkan data yang difilter */}
            {filtered.length > 0 ? (
              filtered.map((row, index) => (
                <tr key={index}>
                  <td>{row.reference}</td>
                  <td>{row.customer}</td>
                  <td>{row.saleref}</td>
                  <td>{row.warehouse}</td>
                  <td>{formatToRupiah(row.grandTotal)}</td>
                  <td>{formatToRupiah(row.paid)}</td>
                  <td>{formatToRupiah(row.due)}</td>
                  <td className="py-3 px-4 text-sm bg-base-100">
                    <span
                      className={`px-2 py-1 text-xs rounded-md ${
                        row.status === "Completed"
                          ? "text-[#38CA58] border border-[#38CA58]"
                          : row.status === "Pending"
                          ? "text-[#4338CA] border border-[#4338CA]"
                          : row.status === "Ordered"
                          ? "text-[#E98718] border border-[#E98718]"
                          : ""
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm bg-base-100">
                    <span
                      className={`px-2 py-1 text-xs rounded-md ${
                        row.paymentStatus === "Paid"
                          ? "text-[#38CA58] border border-[#38CA58]"
                          : row.paymentStatus === "Unpaid"
                          ? "text-[#E98718] border border-[#E98718]"
                          : row.paymentStatus === "Partial"
                          ? "text-[#4338CA] border border-[#4338CA]"
                          : ""
                      }`}
                    >
                      {row.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReturnTable;
