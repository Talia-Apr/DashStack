import React from "react";

const Modal = ({ onClose, onSave, newCategory, handleInputChange }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-300"
        >
          <i className="bi bi-x-lg text-xl"></i>
        </button>
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Add New Category
        </h3>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
            Category Code
          </label>
          <input
            type="text"
            name="code"
            value={newCategory.code}
            onChange={handleInputChange}
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            value={newCategory.name}
            onChange={handleInputChange}
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="btn btn-secondary mr-2 dark:bg-gray-600 dark:text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="btn btn-primary dark:bg-blue-600 dark:text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
