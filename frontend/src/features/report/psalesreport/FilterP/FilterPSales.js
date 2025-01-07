import React from "react";
import { FunnelIcon, PowerIcon } from "@heroicons/react/24/outline";

function FilterProductSales({ isVisible, onClose, filter, onFilterChange }) {
  if (!isVisible) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    onFilterChange({
      customer: "",
      warehouse: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-base-100 bg-opacity-50 flex justify-end z-50">
      <div className="w-[450px] bg-base-100 h-full shadow-lg p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <button className="text-black text-lg" onClick={onClose}>
            ❌
          </button>
          <h2 className="text-xl font-bold text-center flex-1">Filter</h2>
        </div>
        <form>
          {/* Filter Form */}
          <div className="p-4">
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Customer</label>
              <input
                type="text"
                name="customer"
                value={filter.customer}
                onChange={handleInputChange}
                placeholder="Customer"
                className="input input-bordered w-full text-sm py-1"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Warehouse
              </label>
              <select
                name="warehouse"
                value={filter.warehouse}
                onChange={handleInputChange}
                className="select select-bordered w-full text-sm py-1"
              >
                <option value="">Choose Warehouse</option>
                <option value="Warehouse 1">Warehouse 1</option>
                <option value="Warehouse 2">Warehouse 2</option>
                <option value="Warehouse 3">Warehouse 3</option>
              </select>
            </div>
            {/* Filter and Reset Buttons */}
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="flex items-center bg-blue-600 text-white px-10 py-2 rounded shadow-md text-sm"
                onClick={onClose}
              >
                <FunnelIcon className="w-5 h-5 mr-2" />
               Filter
              </button>
              <button
                type="button"
                className="flex items-center bg-red-600 text-white px-10 py-2 rounded shadow-md text-sm"
                onClick={resetFilters}
              >
                <PowerIcon className="w-5 h-5 mr-2" />
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FilterProductSales;
