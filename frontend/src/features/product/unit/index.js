import React, { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard"; // Menggunakan TitleCard yang sama
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const UnitPage = () => {
  // Data contoh untuk tabel unit
  const [units, setUnits] = useState([
    { id: 1, name: "Grams", shortName: "g", operator: "/", value: 1000 },
    { id: 2, name: "Piece", shortName: "pc", operator: "*", value: 1 },
    { id: 3, name: "Kilogram", shortName: "kg", operator: "*", value: 1 },
    { id: 4, name: "Meter", shortName: "m", operator: "*", value: 1 },
    { id: 5, name: "Centimeter", shortName: "cm", operator: "/", value: 100 },
  ]);
  const [searchText, setSearchText] = useState(""); // Untuk pencarian
  const [selectedUnits, setSelectedUnits] = useState([]); // Untuk checkbox
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isEditMode, setIsEditMode] = useState(false); // Untuk membedakan Create/Edit
  const [editUnit, setEditUnit] = useState(null); // Data unit yang sedang diedit
  const [newUnit, setNewUnit] = useState({
    name: "",
    shortName: "",
    operator: "/",
    value: "",
  });
  const [unitToDelete, setUnitToDelete] = useState(null); // To hold the category being deleted
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false); // To control visibility of the delete confirmation popup

  const [unitDataState, setUnitDataState] = useState(units);

  // Fungsi filter berdasarkan pencarian
  const filteredUnits = unitDataState.filter(
    (unit) =>
      unit.name.toLowerCase().includes(searchText.toLowerCase()) ||
      unit.shortName.toLowerCase().includes(searchText.toLowerCase())
  );

  // Delete logic
  const handleDeleteUnit = (unit) => {
    setUnitToDelete(unit);
    setIsDeletePopupVisible(true);
  };

  const confirmDeleteUnit = () => {
    setUnitDataState((prevState) =>
      prevState.filter((unit) => unit.id !== unitToDelete.id)
    );
    setIsDeletePopupVisible(false);
    setUnitToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeletePopupVisible(false);
    setUnitToDelete(null);
  };

  const handleEditUnit = (unit) => {
    setEditUnit(unit); // Set data unit yang akan diedit
    setIsModalOpen(true); // Buka modal
  };

  // Fungsi untuk menyimpan perubahan
  const handleSaveUnit = () => {
    if (!editUnit.name || !editUnit.shortName || !editUnit.value) {
      alert("Please fill all required fields!");
      return;
    }

    setUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === editUnit.id
          ? { ...editUnit, value: parseFloat(editUnit.value) }
          : unit
      )
    );

    setIsModalOpen(false);
    setEditUnit(null); // Reset setelah menyimpan
  };

  // Fungsi untuk menambah unit baru
  const handleAddUnit = () => {
    if (!newUnit.name || !newUnit.shortName || !newUnit.value) {
      alert("Please fill all required fields!");
      return;
    }
    setUnits([
      ...units,
      {
        id: units.length + 1,
        ...newUnit,
        value: parseFloat(newUnit.value),
      },
    ]);
    setIsModalOpen(false);
    setNewUnit({
      name: "",
      shortName: "",
      operator: "/",
      value: "",
    });
  };

  const handleUpdateUnit = () => {
    if (!editUnit.name || !editUnit.shortName || !editUnit.value) {
      alert("Please fill all required fields!");
      return;
    }
    setUnits(
      units.map((unit) =>
        unit.id === editUnit.id ? { ...unit, ...editUnit } : unit
      )
    );
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditUnit(null);
  };

  const handleEditClick = (unit) => {
    setEditUnit(unit);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Fungsi untuk menangani checkbox
  const handleCheckboxChange = (id) => {
    if (selectedUnits.includes(id)) {
      setSelectedUnits((prev) => prev.filter((unitId) => unitId !== id));
    } else {
      setSelectedUnits((prev) => [...prev, id]);
    }
  };

  // Fungsi untuk memilih semua checkbox
  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedUnits(filteredUnits.map((unit) => unit.id));
    } else {
      setSelectedUnits([]);
    }
  };

  return (
    <TitleCard title="Unit" topMargin="mt-4">
      {/* Search Bar dan Create Button */}
      <div className="flex justify-between mb-4 items-center">
        {/* Search Input */}
        <div className="w-full sm:w-1/2">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by Name or Short Name"
            className="input input-bordered w-full"
          />
        </div>

        {/* Create Button */}
        <div className="ml-4">
          <button
            className="btn btn-primary flex items-center"
            onClick={() => {
              setIsEditMode(false);
              setIsModalOpen(true);
              setNewUnit({
                name: "",
                shortName: "",
                operator: "/",
                value: "",
              });
            }}
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            Create
          </button>
        </div>
      </div>

      {/* Tabel Unit */}
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
                    filteredUnits.length > 0 &&
                    selectedUnits.length === filteredUnits.length
                  }
                />
              </th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Short Name</th>
              <th className="px-4 py-2 text-left">Operator</th>
              <th className="px-4 py-2 text-left">Operation Value</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUnits.map((unit) => (
              <tr
                key={unit.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedUnits.includes(unit.id)}
                    onChange={() => handleCheckboxChange(unit.id)}
                  />
                </td>
                <td className="px-4 py-2">{unit.name}</td>
                <td className="px-4 py-2">{unit.shortName}</td>
                <td className="px-4 py-2">{unit.operator}</td>
                <td className="px-4 py-2">{unit.value}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEditUnit(unit)}
                    className="btn btn-sm btn-warning flex items-center"
                  >
                    <PencilSquareIcon className="w-5 h-5 mr-1" />
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDeleteUnit(unit)}
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
              <h2 className="text-xl font-bold">
                {editUnit ? "Edit Unit" : "Create Unit"}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditUnit(null); // Reset jika modal ditutup
                }}
                className="btn btn-sm btn-ghost text-gray-800 dark:text-gray-300"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Form Inputs */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Name*</label>
              <input
                type="text"
                value={editUnit ? editUnit.name : newUnit.name}
                onChange={(e) =>
                  editUnit
                    ? setEditUnit({ ...editUnit, name: e.target.value })
                    : setNewUnit({ ...newUnit, name: e.target.value })
                }
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">
                Short Name*
              </label>
              <input
                type="text"
                value={editUnit ? editUnit.shortName : newUnit.shortName}
                onChange={(e) =>
                  editUnit
                    ? setEditUnit({ ...editUnit, shortName: e.target.value })
                    : setNewUnit({ ...newUnit, shortName: e.target.value })
                }
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Operator</label>
              <select
                value={editUnit ? editUnit.operator : newUnit.operator}
                onChange={(e) =>
                  editUnit
                    ? setEditUnit({ ...editUnit, operator: e.target.value })
                    : setNewUnit({ ...newUnit, operator: e.target.value })
                }
                className="select select-bordered w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="/">Divide</option>
                <option value="*">Multiply</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">
                Operation Value*
              </label>
              <input
                type="number"
                value={editUnit ? editUnit.value : newUnit.value}
                onChange={(e) =>
                  editUnit
                    ? setEditUnit({ ...editUnit, value: e.target.value })
                    : setNewUnit({ ...newUnit, value: e.target.value })
                }
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>

            {/* Footer Modal */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditUnit(null);
                }}
                className="btn btn-ghost text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={editUnit ? handleSaveUnit : handleAddUnit}
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
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Delete Confirmation
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Are you sure you want to delete this unit?
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={cancelDelete}
                className="btn btn-neutral text-gray-800 dark:text-gray-200 dark:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUnit}
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
};

export default UnitPage;
