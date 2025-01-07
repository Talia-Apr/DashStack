import React, { useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const WarehousePage = () => {
  // Data awal warehouse
  const [warehouses, setWarehouses] = useState([
    {
      id: 1,
      name: "Warehouse 1",
      phone: "0819281021",
      country: "indonesia",
      city: "jakarta",
      email: "admin@gmail.com",
      zipcode: "1234",
    },
    {
      id: 2,
      name: "Warehouse 2",
      phone: "0819281021",
      country: "indonesia",
      city: "jakarta",
      email: "admin@gmail.com",
      zipcode: "1234",
    },
    {
      id: 3,
      name: "Warehouse 1",
      phone: "0819281021",
      country: "indonesia",
      city: "Surabaya",
      email: "admin@gmail.com",
      zipcode: "1234",
    },
  ]);
  const [searchText, setSearchText] = useState(""); // Untuk pencarian
  const [selectedWarehouses, setSelectedWarehouses] = useState([]); // Untuk checkbox
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isEditMode, setIsEditMode] = useState(false); // Untuk membedakan Create/Edit
  const [editWarehouse, setEditWarehouse] = useState(null); // Data warehouse yang sedang diedit
  const [newWarehouse, setNewWarehouse] = useState({
    name: "",
    phone: "",
    country: "",
    city: "",
    email: "",
    zipcode: "",
  });

  const [warehouseToDelete, setWarehouseToDelete] = useState(null); // Untuk konfirmasi hapus
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false); // Kontrol popup hapus

  // Filter warehouse berdasarkan pencarian
  const filteredWarehouses = warehouses.filter(
    (warehouse) =>
      warehouse.name.toLowerCase().includes(searchText.toLowerCase()) ||
      warehouse.country.toLowerCase().includes(searchText.toLowerCase()) ||
      warehouse.city.toLowerCase().includes(searchText.toLowerCase()) ||
      warehouse.zipcode.toLowerCase().includes(searchText.toLowerCase())
  );

  // Fungsi hapus warehouse
  const handleDeleteWarehouse = (warehouse) => {
    setWarehouseToDelete(warehouse);
    setIsDeletePopupVisible(true);
  };

  const confirmDeleteWarehouse = () => {
    setWarehouses((prevState) =>
      prevState.filter((warehouse) => warehouse.id !== warehouseToDelete.id)
    );
    setIsDeletePopupVisible(false);
    setWarehouseToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeletePopupVisible(false);
    setWarehouseToDelete(null);
  };

  // Fungsi tambah dan edit warehouse
  const handleSaveWarehouse = () => {
    if (
      !editWarehouse.name ||
      !editWarehouse.phone ||
      !editWarehouse.country ||
      !editWarehouse.city ||
      !editWarehouse.email ||
      !editWarehouse.zipcode
    ) {
      alert("Please fill all required fields!");
      return;
    }
    setWarehouses((prevState) =>
      prevState.map((warehouse) =>
        warehouse.id === editWarehouse.id ? editWarehouse : warehouse
      )
    );
    setIsModalOpen(false);
    setEditWarehouse(null);
  };

  const handleAddWarehouse = () => {
    if (
      !newWarehouse.name ||
      !newWarehouse.phone ||
      !newWarehouse.country ||
      !newWarehouse.city ||
      !newWarehouse.email ||
      !newWarehouse.zipcode
    ) {
      alert("Please fill all required fields!");
      return;
    }
    setWarehouses([
      ...warehouses,
      { id: warehouses.length + 1, ...newWarehouse },
    ]);
    setIsModalOpen(false);
    setNewWarehouse({
      name: "",
      phone: "",
      country: "",
      city: "",
      email: "",
      zipcode: "",
    });
  };

  // Fungsi modal
  const handleEditWarehouse = (warehouse) => {
    setEditWarehouse(warehouse);
    setIsModalOpen(true);
    setIsEditMode(true);
  };

  const handleCheckboxChange = (id) => {
    setSelectedWarehouses((prev) =>
      prev.includes(id) ? prev.filter((wid) => wid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedWarehouses(filteredWarehouses.map((w) => w.id));
    } else {
      setSelectedWarehouses([]);
    }
  };

  return (
    <TitleCard title="Warehouse" topMargin="mt-4">
      {/* Search Bar dan Create Button */}
      <div className="flex justify-between mb-4 items-center">
        <div className="w-full sm:w-1/2">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by Name or Location"
            className="input input-bordered w-full"
          />
        </div>
        <div className="ml-4">
          <button
            className="btn btn-primary flex items-center"
            onClick={() => {
              setIsEditMode(false);
              setIsModalOpen(true);
              setNewWarehouse({
                name: "",
                phone: "",
                country: "",
                city: "",
                email: "",
                zipcode: "",
              });
            }}
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            Create
          </button>
        </div>
      </div>

      {/* Table Warehouse */}
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
                    filteredWarehouses.length > 0 &&
                    selectedWarehouses.length === filteredWarehouses.length
                  }
                />
              </th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Country</th>
              <th className="px-4 py-2 text-left">City</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Zip Code</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredWarehouses.map((warehouse) => (
              <tr
                key={warehouse.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedWarehouses.includes(warehouse.id)}
                    onChange={() => handleCheckboxChange(warehouse.id)}
                  />
                </td>
                <td className="px-4 py-2">{warehouse.name}</td>
                <td className="px-4 py-2">{warehouse.phone}</td>
                <td className="px-4 py-2">{warehouse.country}</td>
                <td className="px-4 py-2">{warehouse.city}</td>
                <td className="px-4 py-2">{warehouse.email}</td>
                <td className="px-4 py-2">{warehouse.zipcode}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEditWarehouse(warehouse)}
                    className="btn btn-sm btn-warning flex items-center"
                  >
                    <PencilSquareIcon className="w-5 h-5 mr-1" />
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDeleteWarehouse(warehouse)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {isEditMode ? "Edit Warehouse" : "Create Warehouse"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-sm btn-ghost"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name*</label>
              <input
                type="text"
                value={isEditMode ? editWarehouse.name : newWarehouse.name}
                onChange={(e) =>
                  isEditMode
                    ? setEditWarehouse({
                        ...editWarehouse,
                        name: e.target.value,
                      })
                    : setNewWarehouse({ ...newWarehouse, name: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone*</label>
              <input
                type="text"
                value={isEditMode ? editWarehouse.phone : newWarehouse.phone}
                onChange={(e) =>
                  isEditMode
                    ? setEditWarehouse({
                        ...editWarehouse,
                        phone: e.target.value,
                      })
                    : setNewWarehouse({
                        ...newWarehouse,
                        phone: e.target.value,
                      })
                }
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Country*</label>
              <input
                type="text"
                value={
                  isEditMode ? editWarehouse.country : newWarehouse.country
                }
                onChange={(e) =>
                  isEditMode
                    ? setEditWarehouse({
                        ...editWarehouse,
                        country: e.target.value,
                      })
                    : setNewWarehouse({
                        ...newWarehouse,
                        country: e.target.value,
                      })
                }
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">City*</label>
              <input
                type="text"
                value={isEditMode ? editWarehouse.city : newWarehouse.city}
                onChange={(e) =>
                  isEditMode
                    ? setEditWarehouse({
                        ...editWarehouse,
                        city: e.target.value,
                      })
                    : setNewWarehouse({
                        ...newWarehouse,
                        city: e.target.value,
                      })
                }
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email*</label>
              <input
                type="text"
                value={isEditMode ? editWarehouse.email : newWarehouse.email}
                onChange={(e) =>
                  isEditMode
                    ? setEditWarehouse({
                        ...editWarehouse,
                        email: e.target.value,
                      })
                    : setNewWarehouse({
                        ...newWarehouse,
                        email: e.target.value,
                      })
                }
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Zip Code*
              </label>
              <input
                type="text"
                value={
                  isEditMode ? editWarehouse.zipcode : newWarehouse.zipcode
                }
                onChange={(e) =>
                  isEditMode
                    ? setEditWarehouse({
                        ...editWarehouse,
                        zipcode: e.target.value,
                      })
                    : setNewWarehouse({
                        ...newWarehouse,
                        zipcode: e.target.value,
                      })
                }
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="btn btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={isEditMode ? handleSaveWarehouse : handleAddWarehouse}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {isDeletePopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>
              Are you sure you want to delete warehouse{" "}
              <span className="font-semibold">{warehouseToDelete.name}</span>?
            </p>
            <div className="flex justify-end space-x-2 mt-4">
              <button className="btn btn-secondary" onClick={cancelDelete}>
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={confirmDeleteWarehouse}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </TitleCard>
  );
};

export default WarehousePage;
