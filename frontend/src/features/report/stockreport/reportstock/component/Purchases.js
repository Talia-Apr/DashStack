import React, { useState } from "react";
import { DocumentArrowDownIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

const PurchasesTable = ({ data }) => {
  const [searchText, setSearchText] = useState("");

  // Fungsi untuk memfilter data berdasarkan pencarian
  const filtered = data.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filtered.map((row) => ({
        ...row,
        subtotal: `Rp${row.subtotal.toLocaleString("id-ID")}`,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "Purchases Stock Report.xlsx");
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

  // Fungsi untuk mengekspor tabel sebagai PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    let yOffset = 10;

    doc.text("Data Purchases Stock Report", 14, yOffset);
    yOffset += 10;
    const tableColumn = [
      "Date",
      "Reference",
      "supplier",
      "Warehouse",
      "Product",
      "Quantity",
      "Subtotal",
    ];
    const tableRows = filtered.map((row) => [
      row.date,
      row.reference,
      row.supplier,
      row.warehouse,
      row.product,
      row.qty,
      formatToRupiah(row.subtotal),
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("Purchases Stock Report.pdf");
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
            className="btn btn-outline btn-success flex items-center"
            onClick={handleExportExcel}
          >
            <DocumentArrowDownIcon className="w-5 h-5 mr-1" />
            Excel
          </button>
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
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-base-100">
            <tr>
              {[
                      "Date",
                      "Reference",
                      "Supplier",
                      "Warehouse",
                      "Product",
                      "Quantity",
                      "Subtotal",
              ].map((header, i) => (
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
            {filtered.length > 0 ? (
              filtered.map((row, index) => (
                <tr key={index}>
                  <td>{row.date}</td>
                  <td>{row.reference}</td>
                  <td>{row.supplier}</td>
                  <td>{row.warehouse}</td>
                  <td>{row.product}</td>
                  <td>{row.qty}</td>
                  <td>{formatToRupiah(row.subtotal)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchasesTable;