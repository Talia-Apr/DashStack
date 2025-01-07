import React, { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard"; // Menggunakan TitleCard yang sama
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const BrandPage = () => {
  const [brands, setBrands] = useState([
    { id: 1, name: "Brand A", description: "Description of Brand A" },
    { id: 2, name: "Brand B", description: "Description of Brand B" },
    { id: 3, name: "Brand C", description: "Description of Brand C" },
    { id: 4, name: "Brand D", description: "Description of Brand D" },
    { id: 5, name: "Brand E", description: "Description of Brand E" },
  ]);
  const [searchText, setSearchText] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State untuk edit modal
  const [newBrand, setNewBrand] = useState({ name: "", description: "" });
  const [editBrand, setEditBrand] = useState(null); // State untuk menyimpan brand yang akan diedit
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false); // Untuk menampilkan/menghilangkan popup delete
  const [brandToDelete, setBrandToDelete] = useState(null);

  const filteredBrands = brands.filter(
    (brand) =>
      brand.name.toLowerCase().includes(searchText.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddBrand = () => {
    if (!newBrand.name || !newBrand.description) {
      alert("Please fill all required fields!");
      return;
    }
    setBrands([...brands, { id: brands.length + 1, ...newBrand }]);
    setIsModalOpen(false);
    setNewBrand({ name: "", description: "" });
  };

  const handleEditClick = (brand) => {
    setEditBrand({ ...brand });
    setIsEditModalOpen(true);
  };

  const handleEditSave = () => {
    if (!editBrand.name || !editBrand.description) {
      alert("Please fill all required fields!");
      return;
    }
    setBrands(
      brands.map((brand) =>
        brand.id === editBrand.id ? { ...editBrand } : brand
      )
    );
    setIsEditModalOpen(false);
    setEditBrand(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this brand?"
    );
    if (confirmDelete) {
      setBrands(brands.filter((brand) => brand.id !== id));
      setSelectedBrands(
        selectedBrands.filter((selectedId) => selectedId !== id)
      );
    }
  };
  // Fungsi untuk menangani checkbox
  const handleCheckboxChange = (id) => {
    if (selectedBrands.includes(id)) {
      setSelectedBrands((prev) => prev.filter((brandId) => brandId !== id));
    } else {
      setSelectedBrands((prev) => [...prev, id]);
    }
  };

  // Fungsi untuk memilih semua checkbox
  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedBrands(filteredBrands.map((brand) => brand.id));
    } else {
      setSelectedBrands([]);
    }
  };

  const handleDeleteBrand = (brand) => {
    setBrandToDelete(brand);
    setIsDeletePopupVisible(true);
  };

  const confirmDeleteBrand = () => {
    setBrands((prevBrand) =>
      prevBrand.filter((brand) => brand.id !== brandToDelete.id)
    );
    setIsDeletePopupVisible(false);
    setBrandToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeletePopupVisible(false);
    setBrandToDelete(null);
  };

  return (
    <TitleCard title="Brand" topMargin="mt-4">
      {/* Search Bar dan Create Button */}
      <div className="flex justify-between mb-4 items-center">
        <div className="w-full sm:w-1/2">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by Name or Description"
            className="input input-bordered w-full"
          />
        </div>
        {/* Create Button */}
        <div className="ml-4">
          <button
            className="btn btn-primary flex items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            Create
          </button>
        </div>
      </div>

      {/* Tabel Brand */}
      <div className="mt-6 overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="px-4 py-2 text-left">
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  checked={
                    filteredBrands.length > 0 &&
                    selectedBrands.length === filteredBrands.length
                  }
                />
              </th>
              <th className="px-4 py-2 text-left">Brand Name</th>
              <th className="px-4 py-2 text-left">Brand Description</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBrands.map((brand) => (
              <tr
                key={brand.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedBrands.includes(brand.id)}
                    onChange={() => handleCheckboxChange(brand.id)}
                  />
                </td>
                <td className="px-4 py-2">{brand.name}</td>
                <td className="px-4 py-2">{brand.description}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEditClick(brand)}
                    className="btn btn-sm btn-warning flex items-center"
                  >
                    <PencilSquareIcon className="w-5 h-5 mr-1" />
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDeleteBrand(brand)}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 dark:text-gray-200 p-6 rounded-lg shadow-lg w-1/3">
            {/* Header Modal */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create Brand</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-sm btn-ghost text-gray-800 dark:text-gray-300"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Form Inputs */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">
                Brand Name*
              </label>
              <input
                type="text"
                value={newBrand.name}
                onChange={(e) =>
                  setNewBrand({ ...newBrand, name: e.target.value })
                }
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">
                Brand Description*
              </label>
              <textarea
                value={newBrand.description}
                onChange={(e) =>
                  setNewBrand({ ...newBrand, description: e.target.value })
                }
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>

            {/* Footer Modal */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-ghost text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBrand}
                className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {isEditModalOpen && editBrand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 dark:text-gray-200 p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Brand</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="btn btn-sm btn-ghost text-gray-800 dark:text-gray-300"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">
                Brand Name*
              </label>
              <input
                type="text"
                value={editBrand.name}
                onChange={(e) =>
                  setEditBrand({ ...editBrand, name: e.target.value })
                }
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">
                Brand Description*
              </label>
              <textarea
                value={editBrand.description}
                onChange={(e) =>
                  setEditBrand({ ...editBrand, description: e.target.value })
                }
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="btn btn-ghost text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeletePopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-bold">Delete Confirmation</h3>
            <p className="text-sm mt-2">
              Are you sure you want to delete this brand?
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              {/* Tombol Cancel */}
              <button
                onClick={cancelDelete}
                className="btn btn-neutral bg-gray-200 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>

              {/* Tombol Confirm */}
              <button
                onClick={confirmDeleteBrand}
                className="btn btn-danger bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </TitleCard>
  );
};

export default BrandPage;
