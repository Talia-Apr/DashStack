import { useState } from "react";
import {
  FunnelIcon,
  EyeIcon,
  DocumentTextIcon,
  DocumentArrowDownIcon,
  TrashIcon,
  PencilSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import TitleCard from "../../../components/Cards/TitleCard";
import FilterAllPurchases from "./Filter"; // Import komponen filter
import PurchaseDetail from "./PurchaseDetail/index";
import EditPurchase from "./PurchaseDetail/PurchaseEdit";
import CreatePurchase from "../CreatePurchase";

const ALL_PURCHASES_DATA = [
  {
    date: "2024-10-26",
    reference: "TR_1119",
    Supplier: "IT Supplier",
    Warehouse: "Warehouse 1",
    status: "Completed",
    grandTotal: 22.0,
    paid: "1527.00",
    due: "0.00",
    paymentStatus: "Unpaid",
  },
  {
    date: "2024-10-27",
    reference: "TR_1120",
    Supplier: "IT Supplier",
    Warehouse: "Warehouse 4",
    status: "Completed",
    grandTotal: 22.0,
    paid: "1527.00",
    due: "0.00",
    paymentStatus: "Unpaid",
  },
  // Tambahkan data lainnya sesuai kebutuhan
];

function AllPurchases() {
  const [allPurchases, setAllPurchases] = useState(ALL_PURCHASES_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false); // State untuk visibilitas filter
  const [isPopupVisible, setPopupVisible] = useState(false); // State untuk popup konfirmasi
  const [deleteIndex, setDeleteIndex] = useState(null); // Index data yang akan dihapus
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10; // Jumlah data yang ingin ditampilkan per halaman
  const totalData = allPurchases.length; // Total data yang ada
  const [isPurchaseDetail, setIsPurchaseDetail] = useState(false);
  const [isPurchaseEdit, setIsPurchaseEdit] = useState(false);
  const [isCreatePurchase, setIsCreatePurchases] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = allPurchases.filter(
    (purchase) =>
      purchase.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.Supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.Warehouse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (index) => {
    setDeleteIndex(index); // Simpan index data yang ingin dihapus
    setPopupVisible(true); // Tampilkan popup konfirmasi
  };

  const handleDeleteConfirm = () => {
    const updatedPurchasesData = allPurchases.filter(
      (_, i) => i !== deleteIndex
    );
    setAllPurchases(updatedPurchasesData);
    setPopupVisible(false);
    setDeleteIndex(null);
  };

  const handleDeleteCancel = () => {
    setPopupVisible(false);
    setDeleteIndex(null);
  };

  const navigateToPurchaseDetail = () => setIsPurchaseDetail(true);
  const navigateToPurchaseEdit = () => setIsPurchaseEdit(true);
  const navigateToCreatePurchase = () => setIsCreatePurchases(true);

  if (isPurchaseDetail) {
    return <PurchaseDetail />;
  }

  if (isPurchaseEdit) {
    return <EditPurchase />;
  }

  if (isCreatePurchase) {
    return <CreatePurchase />;
  }

  // Pagination Logic
  const startIndex = (currentPage - 1) * dataPerPage + 1;
  const endIndex = Math.min(currentPage * dataPerPage, totalData);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col items-center h-screen pt-10 px-4">
      {/* Filter component */}
      <FilterAllPurchases
        isVisible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
      />

      <TitleCard title="All Purchases" topMargin="mt-2">
        <div className="flex w-full items-center justify-between flex-wrap mb-4">
          {/* Search Box */}
          <div className="relative w-50 max-w-xs">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search"
              className="input input-bordered w-full h-8 pl-8 text-sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <button
              onClick={() => setIsFilterVisible(true)} // Open filter
              className="btn btn-outline btn-primary flex items-center text-sm h-10"
            >
              <FunnelIcon className="w-5 h-5 mr-1" />
              Filter
            </button>
            <button
              onClick={() => console.log("Exporting Excel")}
              className="btn btn-outline btn-success flex items-center text-sm h-10"
            >
              <DocumentArrowDownIcon className="w-5 h-5 mr-1" />
              Excel
            </button>
            <button
              onClick={() => console.log("Exporting PDF")}
              className="btn btn-outline btn-error flex items-center text-sm h-10"
            >
              <DocumentTextIcon className="w-5 h-5 mr-1" />
              PDF
            </button>
            <button
              onClick={() => navigateToCreatePurchase()}
            className="btn btn-primary flex items-center"
            >
              <PlusCircleIcon className="w-5 h-5 mr-1" />
              Create
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                {[
                  "Date",
                  "Reference",
                  "Supplier",
                  "To Warehouse",
                  "Status",
                  "Grand Total",
                  "Paid",
                  "Due",
                  "Payment Status",
                  "Action",
                ].map((header, i) => (
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
              {filteredData
                .slice(
                  (currentPage - 1) * dataPerPage,
                  currentPage * dataPerPage
                )
                .map((purchase, index) => (
                  <tr key={index}>
                    <td className="py-3 px-4 text-sm">{purchase.date}</td>
                    <td className="py-3 px-4 text-sm">{purchase.reference}</td>
                    <td className="py-3 px-4 text-sm">{purchase.Supplier}</td>
                    <td className="py-3 px-4 text-sm">{purchase.Warehouse}</td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`px-2 py-1 text-xs rounded-md ${
                          purchase.status === "Completed"
                            ? "text-green-500 border border-green-500"
                            : "text-red-500 border border-red-500"
                        }`}
                      >
                        {purchase.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{purchase.grandTotal}</td>
                    <td className="py-3 px-4 text-sm">{purchase.paid}</td>
                    <td className="py-3 px-4 text-sm">{purchase.due}</td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`px-2 py-1 text-xs rounded-md ${
                          purchase.paymentStatus === "Unpaid"
                            ? "text-orange-500 border border-orange-500"
                            : "text-green-500 border border-green-500"
                        }`}
                      >
                        {purchase.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm flex space-x-2">
                      <button
                        className="btn btn-sm btn-info"
                        onClick={navigateToPurchaseDetail}
                      >
                      <EyeIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={navigateToPurchaseEdit}
                        className="btn btn-sm btn-warning"
                      >
                      <PencilSquareIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(index)}
                        className="btn btn-sm btn-error"
                      >
                      <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="w-full flex justify-between items-center mt-4 px-4 py-2 border-t border-gray-300">
          {/* Rows per page */}
          <div className="flex items-center text-sm text-gray-800 cursor-default space-x-2">
            <span>Rows per page:</span>
            <span className="text-gray-700">{dataPerPage}</span>
          </div>

          {/* Data info and navigation buttons */}
          <div className="flex items-center space-x-4">
            {/* Data range display */}
            <span className="text-sm text-gray-700">{`${startIndex}-${endIndex} of ${totalData}`}</span>

            {/* Navigation buttons */}
            <ChevronLeftIcon
              className="w-5 h-5 cursor-pointer hover:text-purple-600"
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            />
            <ChevronRightIcon
              className="w-5 h-5 cursor-pointer hover:text-purple-600"
              onClick={() =>
                handlePageChange(
                  Math.min(currentPage + 1, Math.ceil(totalData / dataPerPage))
                )
              }
            />
          </div>
        </div>
      </TitleCard>

      {/* Delete Confirmation Popup */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Confirmation</h2>
              <button
                className="text-gray-500 hover:text-black"
                onClick={handleDeleteCancel}
              >
                &times;
              </button>
            </div>

            {/* Message */}
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this item?
            </p>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                onClick={handleDeleteCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleDeleteConfirm}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllPurchases;
