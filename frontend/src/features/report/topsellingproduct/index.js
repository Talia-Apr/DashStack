import { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import PageControl from "../../../components/PageControl/PageControl";
import { DocumentTextIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";

function TopSell() {
  const [data] = useState([
    { code: "123", name: "Semangka", totalSales: 5, totalAmount: 2000000 },
    { code: "231", name: "Jeruk", totalSales: 6, totalAmount: 4800000 },
    { code: "345", name: "Pisang", totalSales: 3, totalAmount: 3000000 },
    { code: "456", name: "Mangga", totalSales: 8, totalAmount: 9000000 },
    { code: "567", name: "Apel", totalSales: 4, totalAmount: 4000000 },
  ]);

  // Format angka ke rupiah
  const formatToRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);

  // State
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState(null);

  // Berikan ranking awal berdasarkan totalSales terbesar
  const rankedData = data
    .slice()
    .sort((a, b) => b.totalSales - a.totalSales)
    .map((item, index) => ({ ...item, rank: index + 1 }));

  // Filter dan urutkan data
  const filteredAndSortedData = rankedData
    .filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    )
    .slice()
    .sort((a, b) => {
      if (!sortField) return a.rank - b.rank; // Jika tidak ada sorting, gunakan ranking awal
      if (sortOrder === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

  // Data yang akan ditampilkan pada tabel (berdasarkan pagination)
  const currentData = filteredAndSortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (pageNumber) => {
    const totalPages = Math.ceil(filteredAndSortedData.length / rowsPerPage);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
  };

  // Export ke PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Top-Selling Product", 10, 10);

    const tableData = rankedData.map((product) => [
      product.rank,
      product.code,
      product.name,
      product.totalSales,
      formatToRupiah(product.totalAmount),
    ]);

    doc.autoTable({
      head: [["#", "Code", "Product", "Total Sales", "Total Amount"]],
      body: tableData,
      startY: 20,
    });

    doc.save("Top-Selling Product.pdf");
  };

  // Export ke Excel
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      rankedData.map((item) => ({
        Rank: item.rank,
        Code: item.code,
        Product: item.name,
        TotalSales: item.totalSales,
        TotalAmount: formatToRupiah(item.totalAmount),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Top-Selling Product");
    XLSX.writeFile(workbook, "Top-Selling Product.xlsx");
  };

  return (
    <div className="flex flex-col items-center h-screen pt-10 px-4">
      <TitleCard title="Top-Selling Product" topMargin="mt-2">
        <div className="flex w-full items-center justify-between flex-wrap mb-4">
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
                <th>#</th>
                <th>Code</th>
                <th>Product</th>
                <th
                  onClick={() => handleSort("totalSales")}
                  className="cursor-pointer"
                >
                  Total Sales
                  <span className="ml-1">{sortField === "totalSales" && (sortOrder === "asc" ? "▲" : "▼")}</span>
                </th>
                <th
                  onClick={() => handleSort("totalAmount")}
                  className="cursor-pointer"
                >
                  Total Amount
                  <span className="ml-1">{sortField === "totalAmount" && (sortOrder === "asc" ? "▲" : "▼")}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((product) => (
                <tr key={product.rank}>
                  <td>{product.rank}</td>
                  <td>{product.code}</td>
                  <td>{product.name}</td>
                  <td>{product.totalSales}</td>
                  <td>{formatToRupiah(product.totalAmount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PageControl
          totalItems={filteredAndSortedData.length}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TitleCard>
    </div>
  );
}

export default TopSell;
