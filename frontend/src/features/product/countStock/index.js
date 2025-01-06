import React, { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import styling DatePicker
import { PencilSquareIcon } from "@heroicons/react/24/outline";

function CountStock() {
  const [selectedDate, setSelectedDate] = useState(null); // State for date selection
  const [searchText, setSearchText] = useState(""); // State for search text
  const [rowsPerPage, setRowsPerPage] = useState(10); // State for rows per page
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [editingProduct, setEditingProduct] = useState(null); // State for the product being edited
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false); // State to control popup visibility

  const [stockData, setStockData] = useState([
    { id: 1, name: "Samsung A55", stock: 97, date: "2024-01-02" },
    { id: 2, name: "Banana", stock: 35, date: "2024-01-03" },
    { id: 3, name: "Asus VivoBook 78s", stock: 24, date: "2024-01-04" },
    { id: 4, name: "Strawberry", stock: 36, date: "2024-01-05" },
    { id: 5, name: "MacBook Pro", stock: 13, date: "2024-01-06" },
    { id: 6, name: "Adidas Shoes", stock: 27, date: "2024-01-07" },
    { id: 7, name: "Dubai Chocolate", stock: 39, date: "2024-01-08" },
    { id: 8, name: "Chitatos", stock: 87, date: "2024-01-09" },
    { id: 9, name: "Nike Shoes", stock: 56, date: "2024-01-10" },
    { id: 10, name: "Laptop HP", stock: 45, date: "2024-01-11" },
    { id: 11, name: "Phone X", stock: 12, date: "2024-01-12" },
    { id: 12, name: "Sony Headphones", stock: 60, date: "2024-01-13" },
    { id: 13, name: "Apple Watch", stock: 75, date: "2024-01-14" },
  ]);

  // Filter based on selected date
  const filteredByDate = selectedDate
    ? stockData.filter(
        (item) =>
          new Date(item.date).toDateString() ===
          new Date(selectedDate).toDateString()
      )
    : stockData;

  // Filter based on search text
  const filteredData = filteredByDate.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (item) => {
    setEditingProduct(item);
    setIsEditPopupVisible(true);
  };

  const handleSaveChanges = () => {
    if (editingProduct) {
      // Update the product stock in stockData
      const updatedStockData = stockData.map((item) =>
        item.id === editingProduct.id ? editingProduct : item
      );

      // Set the updated stock data back to state
      setStockData(updatedStockData);

      // Close the popup
      setIsEditPopupVisible(false);
      setEditingProduct(null); // Clear editing state
    }
  };

  return (
    <TitleCard title="Count Stock" topMargin="mt-4">
      {/* Search and Date Picker Section */}
      <div className="flex left-6 mb-4">
        <div className="w-full sm:w-1/2">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="input input-bordered w-full"
            placeholderText="Select a date"
          />
        </div>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} // Update searchText on input change
          placeholder="Search by Name or Description"
          className="input input-bordered w-full"
        />
      </div>

      {/* Table Section */}
      <div className="mt-6 overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Product Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Remaining Stock
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.stock}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="btn btn-sm btn-warning"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Rows Per Page:
          </label>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="select select-bordered"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="btn btn-neutral btn-sm"
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {`${(currentPage - 1) * rowsPerPage + 1} - ${
              currentPage * rowsPerPage > filteredData.length
                ? filteredData.length
                : currentPage * rowsPerPage
            } of ${filteredData.length}`}
          </p>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="btn btn-neutral btn-sm"
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      </div>

      {/* Edit Stock Popup */}
      {isEditPopupVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Edit Product Stock
            </h2>
            {editingProduct && (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                      })
                    }
                    className="input input-bordered w-full"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Remaining Stock
                  </label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stock: parseInt(e.target.value),
                      })
                    }
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsEditPopupVisible(false)}
                    className="btn btn-sm btn-neutral"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="btn btn-sm btn-primary"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </TitleCard>
  );
}

export default CountStock;
