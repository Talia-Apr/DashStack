import React, { useState } from "react";
import { BsFilter, BsPower } from "react-icons/bs";

function FilterAllP() {
  // State untuk mengontrol visibilitas filter
  const [isVisible, setIsVisible] = useState(true);

  // Fungsi untuk menutup filter
  const handleCloseFilter = () => {
    console.log("Tombol ❌ diklik, menutup filter...");
    setIsVisible(false); // Menyembunyikan filter
  };

  // Fungsi untuk membuka kembali filter
  const handleOpenFilter = () => {
    setIsVisible(true); // Menampilkan filter
  };

  if (!isVisible) return null; // Jika tidak visible, tidak merender komponen

  return (
    <div>
      {/* Tombol untuk menampilkan filter */}
      <button
        className="flex items-center bg-blue-600 text-white px-8 py-2 rounded-md shadow-md text-sm hover:bg-blue-700 transition-all duration-300"
        onClick={handleOpenFilter} // Fungsi ini membuka kembali filter
      >
        <BsFilter className="w-5 h-5 mr-2" />
        Filter
      </button>

      {/* Filter Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
        <div className="w-[450px] bg-white dark:bg-gray-800 h-full shadow-lg p-6 overflow-y-auto rounded-l-lg">
          <div className="flex justify-between items-center mb-4">
            <button
              className="text-xl text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-400"
              onClick={handleCloseFilter} // Panggil handleCloseFilter untuk menutup filter
            >
              ❌
            </button>
            <h2 className="text-xl font-semibold text-center flex-1 text-gray-800 dark:text-gray-100">
              Filter
            </h2>
          </div>
          <form>
            <div className="space-y-4">
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Code Product
                </label>
                <input
                  type="text"
                  placeholder="Search by Code"
                  className="input input-bordered w-full text-sm py-2 px-3 rounded-md border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Product
                </label>
                <input
                  type="text"
                  placeholder="Search by Name"
                  className="input input-bordered w-full text-sm py-2 px-3 rounded-md border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select className="select select-bordered w-full text-sm py-2 px-3 rounded-md border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200">
                  <option>Choose Category</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Brand
                </label>
                <select className="select select-bordered w-full text-sm py-2 px-3 rounded-md border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200">
                  <option>Choose Brand</option>
                </select>
              </div>

              {/* Filter and Reset Buttons */}
              <div className="flex justify-between mt-4 space-x-2">
                <button className="flex items-center bg-blue-600 text-white px-8 py-2 rounded-md shadow-md text-sm hover:bg-blue-700 transition-all duration-300">
                  <BsFilter className="w-5 h-5 mr-2" />
                  Filter
                </button>
                <button
                  className="flex items-center bg-red-600 text-white px-8 py-2 rounded-md shadow-md text-sm hover:bg-red-700 transition-all duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Reset Filters");
                  }}
                >
                  <BsPower className="w-5 h-5 mr-2" />
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FilterAllP;
