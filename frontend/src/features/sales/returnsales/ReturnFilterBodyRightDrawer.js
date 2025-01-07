import React, { useState } from "react";
import InputFilterText from "../../../components/Input/InputFilter";
import Funnel from "@heroicons/react/24/outline/FunnelIcon";
import Power from "@heroicons/react/24/outline/PowerIcon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ReturnFilterBodyRightDrawer() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState({
    date: "", 
    addedBy: "", 
    customerName: "", 
    warehouse: "", 
    grandTotal: "", 
    paid: "", 
    due: "",     
    status: ""
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  const handleReset = () => {
    setFormData({
        date: "", 
        addedBy: "", 
        customerName: "", 
        warehouse: "", 
        grandTotal: "", 
        paid: "", 
        due: "",
        status: ""
    });
  };

  return (
    <div className="min-h-screen flex">
        
        {/* Input Date */}
        <div className="w-full max-w-md mt-2">
            <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
            <label className="label font-bold">
                Date
            </label>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="input input-bordered w-full bg-gray-200"
            />
        </div>
          
          
          {/* Input Added By */}
          <InputFilterText
            type="text"
            value={formData.customerName}
            onChange={(value) => handleInputChange("customerName", value)}
            containerStyle="mt-2"
            labelTitle="Customer"
            placeholder="Search by Customer"
          />

          {/* Input Warehouse */}
          <InputFilterText
            type="text"
            value={formData.warehouse}
            onChange={(value) => handleInputChange("warehouse", value)}
            containerStyle="mt-2"
            labelTitle="Warehouse"
            placeholder="Search by Warehouse"
          />

          {/* Input Status */}
          <div className="form-control">
            <label htmlFor="status" className="label font-bold">
              Status
            </label>
            <select
              id="role"
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="select select-bordered"
            >
              <option value="" disabled>
                Select a Status
              </option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800"
            >
              <Funnel className="h-5 w-5 inline-block mr-1 mb-1" />
              Filter
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="bg-error text-white py-2 px-4 rounded-md hover:bg-red-500"
            >
              <Power className="h-5 w-5 inline-block mr-1 mb-1" />
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReturnFilterBodyRightDrawer;
