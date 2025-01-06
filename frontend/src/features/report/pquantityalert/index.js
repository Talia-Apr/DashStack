import { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import PageControl from "../../../components/PageControl/PageControl";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import {
  DocumentTextIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

function QtyAlert() {
  const [data] = useState([
    {
      code: "87654321",
      name: "pisang",
      warehouse: "Warehouse 2",
      Quantity: "10",
      AlertQuantity: "10",
    },
    {
      code: "12345678",
      name: "jeruk",
      warehouse: "Warehouse 1",
      Quantity: "20",
      AlertQuantity: "15",
    },
    {
      code: "98765432",
      name: "nanas",
      warehouse: "Warehouse 3",
      Quantity: "5",
      AlertQuantity: "8",
    },
  ]);

  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleWarehouseChange = (e) => setSelectedWarehouse(e.target.value);

  const warehouses = ["Warehouse 1", "Warehouse 2", "Warehouse 3"];

  // Filtered Data
  const [searchText, setSearchText] = useState("");
  const filteredData = data.filter((item) => {
    const matchesSearchText = Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase()));
    const matchesWarehouse = !selectedWarehouse || item.warehouse === selectedWarehouse;
    return matchesSearchText && matchesWarehouse;
  });

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
    XLSX.writeFile(workbook, "Quantity Alert.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Product Quantity Alert", 10, 10);
    const tableData = filteredData.map((item) => [
      item.code,
      item.name,
      item.warehouse,
      item.Quantity,
      item.AlertQuantity,
    ]);
    doc.autoTable({
      head: [["Code", "Product", "Warehouse", "Quantity", "Alert Quantity"]],
      body: tableData,
    });
    doc.save("Quantity Alert.pdf");
  };

  return (
<div className="flex flex-col items-center h-screen pt-10 px-4">
  <TitleCard title="Product Quantity Alert" topMargin="mt-2">
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

  {/* Dropdown Warehouses */}
  <div className="w-full sm:w-1/4 mt-4 sm:mt-0">
    <select
      value={selectedWarehouse}
      onChange={handleWarehouseChange}
      className="select select-bordered w-full h-10 text-center"
    >
      <option value="">Select Warehouse</option>
      {warehouses.map((warehouse, index) => (
        <option key={index} value={warehouse}>
          {warehouse}
        </option>
      ))}
    </select>
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
    <div className="overflow-x-auto mt-4 w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Code</th>
            <th>Product</th>
            <th>Warehouse</th>
            <th>Quantity</th>
            <th>Alert Quantity</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.warehouse}</td>
              <td>{item.Quantity}</td>
              <td>
                <span
                  className={`px-2 py-1 text-xs rounded-md font-bold text-[#F62626] border-[1px] border-[#F62626]`}
                >
                  {item.AlertQuantity}
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
  </TitleCard>
</div>

  );
}

export default QtyAlert;
