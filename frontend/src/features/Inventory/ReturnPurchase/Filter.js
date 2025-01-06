import React from "react";
import { FunnelIcon,PowerIcon,} from "@heroicons/react/24/outline";

function FilterReturnPurchases({ isVisible, onClose }) {
  if (!isVisible) return null;

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
              <label className="block text-sm font-medium mb-1">
                Reference
              </label>
              <input
                type="text"
                placeholder="Reference"
                className="input input-bordered w-full text-sm py-1"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Customer</label>
              <select className="select select-bordered w-full text-sm py-1">
                <option>Choose Customer</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Seller</label>
              <select className="select select-bordered w-full text-sm py-1">
                <option>Choose Seller</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Warehouse
              </label>
              <select className="select select-bordered w-full text-sm py-1">
                <option>Choose Warehouse</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Status</label>
              <input
                type="text"
                placeholder="All"
                className="input input-bordered w-full text-sm py-1"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Payment Status
              </label>
              <input
                type="text"
                placeholder="All"
                className="input input-bordered w-full text-sm py-1"
              />
            </div>
            {/* Filter and Reset Buttons */}
            <div className="flex justify-between mt-4">
              <button className="flex items-center bg-blue-600 text-white px-10 py-2 rounded shadow-md text-sm">
                <FunnelIcon className="w-5 h-5 mr-2" />
                Filter
              </button>
              <button
                className="flex items-center bg-red-600 text-white px-10 py-2 rounded shadow-md text-sm"
                onClick={() => console.log("Reset")}
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

export default FilterReturnPurchases;