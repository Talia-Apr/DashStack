import React, { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard"; // Import TitleCard Component
import Modal from "../../../components/Modal";

import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

function CategoryPage() {
  const [rowsPerPage, setRowsPerPage] = useState(10); // State for rows per page
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [searchText, setSearchText] = useState(""); // State for search filter
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [newCategory, setNewCategory] = useState({ code: "", name: "" }); // State to handle new category input
  const [selectedCategories, setSelectedCategories] = useState([]); // State to track selected checkboxes
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State untuk modal edit
  const [editCategory, setEditCategory] = useState(null); // State untuk kategori yang sedang diedit
  const [categoryToDelete, setCategoryToDelete] = useState(null); // To hold the category being deleted
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false); // To control visibility of the delete confirmation popup

  // Example category data
  const [categoryDataState, setCategoryDataState] = useState([
    { id: 1, code: "01", name: "Shoes" },
    { id: 2, code: "02", name: "Fruits" },
    { id: 3, code: "03", name: "Electronic" },
    { id: 4, code: "04", name: "Clothes" },
    { id: 5, code: "05", name: "Foods" },
  ]);

  // Filter categories by search text
  const filteredData = categoryDataState.filter(
    (item) =>
      item.code.toLowerCase().includes(searchText.toLowerCase()) ||
      item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Delete logic
  const handleDeleteCategory = (item) => {
    setCategoryToDelete(item);
    setIsDeletePopupVisible(true);
  };

  const confirmDeleteCategory = () => {
    setCategoryDataState((prevState) =>
      prevState.filter((category) => category.id !== categoryToDelete.id)
    );
    setIsDeletePopupVisible(false);
    setCategoryToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeletePopupVisible(false);
    setCategoryToDelete(null);
  };

  // Ganti categoryData dengan categoryDataState untuk render data

  const handleEditCategory = (category) => {
    setEditCategory(category); // Set kategori yang sedang diedit
    setIsEditModalOpen(true); // Tampilkan modal edit
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEditCategory = (updatedCategory) => {
    if (updatedCategory.code && updatedCategory.name) {
      setCategoryDataState((prev) =>
        prev.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        )
      );
      setIsEditModalOpen(false);
    } else {
      alert("Please fill in both fields.");
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCreateCategory = () => {
    setIsModalOpen(true); // Open the modal when Create is clicked
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveCategory = () => {
    if (newCategory.code && newCategory.name) {
      const newId = categoryDataState.length
        ? categoryDataState[categoryDataState.length - 1].id + 1
        : 1; // Generate new ID
      const categoryWithId = { ...newCategory, id: newId }; // Add ID to the new category

      setCategoryDataState((prev) => [...prev, categoryWithId]); // Update state with the new category
      setNewCategory({ code: "", name: "" }); // Reset newCategory state
      setIsModalOpen(false); // Close the modal
    } else {
      alert("Please fill in both fields.");
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedCategories.includes(id)) {
      // Remove from selection if already selected
      setSelectedCategories((prev) =>
        prev.filter((categoryId) => categoryId !== id)
      );
    } else {
      // Add to selection if not selected
      setSelectedCategories((prev) => [...prev, id]);
    }
  };

  return (
    <TitleCard title="Category" topMargin="mt-4">
      {/* Search Bar and Create Button */}
      <div className="flex justify-between mb-4 items-center">
        {/* Search Input */}
        <div className="w-full sm:w-1/2">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by Code or Name"
            className="input input-bordered w-full"
          />
        </div>

        {/* Create Button */}
        <div className="ml-4">
          <button
            className="btn btn-primary flex items-center"
            onClick={handleCreateCategory}
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            Create
          </button>
        </div>
      </div>

      {/* Category Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="px-4 py-2 text-left">
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories(
                        currentItems.map((item) => item.id)
                      );
                    } else {
                      setSelectedCategories([]); // Deselect all
                    }
                  }}
                  checked={
                    selectedCategories.length === currentItems.length &&
                    currentItems.length > 0
                  }
                />
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Category Code
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Category Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item.id}
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="checkbox"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  {item.code}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  {item.name}
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEditCategory(item)}
                    className="btn btn-sm btn-warning flex items-center"
                  >
                    <PencilSquareIcon className="w-5 h-5 mr-1" />
                  </button>

                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDeleteCategory(item)}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div className="mt-4 flex justify-between items-center">
        {/* Rows Per Page Selection */}
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
            {(currentPage - 1) * rowsPerPage + 1} -{" "}
            {currentPage * rowsPerPage > filteredData.length
              ? filteredData.length
              : currentPage * rowsPerPage}{" "}
            of {filteredData.length}
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

      {/* Modal for creating new category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
            <input
              type="text"
              name="code"
              value={newCategory.code}
              onChange={handleInputChange}
              placeholder="Category Code"
              className="input input-bordered w-full mb-4 bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              name="name"
              value={newCategory.name}
              onChange={handleInputChange}
              placeholder="Category Name"
              className="input input-bordered w-full mb-4 bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex justify-end space-x-4">
              <button onClick={handleSaveCategory} className="btn btn-primary">
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for editing category */}
      {isEditModalOpen && (
        <Modal
          onClose={() => setIsEditModalOpen(false)}
          onSave={() => handleSaveEditCategory(editCategory)}
          newCategory={editCategory}
          handleInputChange={handleEditInputChange}
          isEditMode={true}
        />
      )}
      {isDeletePopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Delete Confirmation
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Are you sure you want to delete this category?
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={cancelDelete}
                className="btn btn-neutral text-gray-800 dark:text-gray-200 dark:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteCategory}
                className="btn btn-danger text-gray-100 dark:text-white dark:bg-red-600"
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

export default CategoryPage;
