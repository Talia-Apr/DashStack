import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  DocumentArrowDownIcon,
  DocumentTextIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import TitleCard from "../../components/Cards/TitleCard";
import FilterAllP from "../filter";
import TableComponent from "../../components/Table/TableComponent";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver"; // untuk men-download file
import { BsFilter, BsPower } from "react-icons/bs";

function AllTransfer() {
  const [searchText, setSearchText] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [transferToDelete, setTransferToDelete] = useState(null);
  const totalItems = 100;

  const [selectedRows, setSelectedRows] = useState([]);
  const [transfers, setTransfers] = useState([
    {
      id: 1,
      date: "2024-10-26",
      reference: "TR_1119",
      fromWarehouse: "Warehouse 2",
      toWarehouse: "Warehouse 1",
      items: 22.0,
      grandTotal: 22.0,
      status: "Completed",
    },
    // Add more transfer objects here if needed
  ]);

  const navigate = useNavigate();

  const filteredTransfers = transfers.filter(
    (transfer) =>
      transfer.reference.toLowerCase().includes(searchText.toLowerCase()) ||
      transfer.fromWarehouse.toLowerCase().includes(searchText.toLowerCase()) ||
      transfer.toWarehouse.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(transfers.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleViewDetails = (id) => {
    navigate(`/app/warehouse-detailTransfer/${id}`);
  };

  const handleDeleteTransfer = (item) => {
    setTransferToDelete(item);
    setIsDeletePopupVisible(true);
  };

  const confirmDeleteTransfer = () => {
    setTransfers(
      transfers.filter((transfer) => transfer.id !== transferToDelete.id)
    );
    setIsDeletePopupVisible(false);
    setTransferToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeletePopupVisible(false);
    setTransferToDelete(null);
  };
  const handleEditTransfer = (id) => {
    // Navigate to the edit page or handle the edit logic
    navigate(`/app/warehouse-editTransfer/${id}`);
  };

  const columns = [
    {
      label: (
        <input
          type="checkbox"
          className="checkbox"
          onChange={handleSelectAll}
        />
      ),
      render: (item) => (
        <input
          type="checkbox"
          className="checkbox"
          checked={selectedRows.includes(item.id)}
          onChange={() => handleCheckboxChange(item.id)}
        />
      ),
      className: "text-center",
    },
    { label: "Date", accessor: "date" },
    { label: "Reference", accessor: "reference" },
    { label: "From Warehouse", accessor: "fromWarehouse" },
    { label: "To Warehouse", accessor: "toWarehouse" },
    {
      label: "Items",
      accessor: "items",
      className: "text-right",
    },
    {
      label: "Grand Total",
      accessor: "grandTotal",
      className: "text-right",
    },
    {
      label: "Status",
      render: (item) => (
        <span
          className={`badge ${
            item.status === "Completed" ? "badge-success" : "badge-warning"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      label: "Actions",
      render: (item) => (
        <div className="flex space-x-2 justify-center">
          <button
            onClick={() => handleViewDetails(item.id)}
            className="btn btn-sm btn-info"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleEditTransfer(item.id)}
            className="btn btn-sm btn-warning"
          >
            <PencilSquareIcon className="w-5 h-5" />
          </button>
          <button
            className="btn btn-sm btn-error"
            onClick={() => handleDeleteTransfer(item)}
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      ),
      className: "text-center",
    },
  ];

  const handleExportExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      [
        "Transfer Reference",
        "From Warehouse",
        "To Warehouse",
        "Items",
        "Grand Total",
      ],
      ...transfers.map((transfer) => [
        transfer.reference,
        transfer.fromWarehouse,
        transfer.toWarehouse,
        transfer.items,
        transfer.grandTotal,
      ]),
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transfers");
    XLSX.writeFile(wb, "transfers.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Transfer List", 10, 10);
    transfers.forEach((transfer, index) => {
      doc.text(
        `${transfer.reference} - ${transfer.fromWarehouse} to ${transfer.toWarehouse} - Items: ${transfer.items} - Total: $${transfer.grandTotal}`,
        10,
        20 + index * 10
      );
    });
    doc.save("transfers.pdf");
  };

  return (
    <TitleCard title="All Transfer" topMargin="mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
        <div className="relative">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by Reference or Warehouse"
            className="input input-bordered w-full"
          />
        </div>

        <div className="absolute right-6 flex space-x-2">
          <button
            className="btn btn-outline btn-primary flex items-center text-sm h-10"
            onClick={() => setIsFilterVisible(true)}
          >
            <FunnelIcon className="w-5 h-5 mr-1" />
            Filter
          </button>
          <button
            className="btn btn-outline btn-success flex items-center"
            onClick={handleExportExcel}
          >
            <DocumentArrowDownIcon className="w-5 h-5 mr-1" />
            Export Excel
          </button>
          <button
            className="btn btn-outline btn-error flex items-center"
            onClick={handleExportPDF}
          >
            <DocumentTextIcon className="w-5 h-5 mr-1" />
            Export PDF
          </button>

          <button
            className="btn btn-primary flex items-center"
            onClick={() => navigate("/app/warehouse-createTransfer")}
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            Create
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mt-6">
        <TableComponent
          columns={columns}
          data={filteredTransfers}
          selectedRows={selectedRows}
          onRowSelect={handleCheckboxChange}
          onSelectAll={handleSelectAll}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
        />
      </div>

      {isFilterVisible && <FilterAllP isVisible={isFilterVisible} />}
      {isDeletePopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Delete Confirmation
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Are you sure you want to delete{" "}
              <strong className="text-black dark:text-white">
                {transferToDelete?.reference}
              </strong>
              ?
            </p>
            <div className="flex justify-end mt-6 space-x-2">
              <button
                className="btn btn-outline btn-secondary dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="btn btn-outline btn-error dark:text-red-400"
                onClick={confirmDeleteTransfer}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </TitleCard>
  );
}

export default AllTransfer;
