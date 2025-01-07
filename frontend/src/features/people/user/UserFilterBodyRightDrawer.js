import React, { useState } from "react";
import InputFilterText from "../../../components/Input/InputFilter";
import Funnel from "@heroicons/react/24/outline/FunnelIcon";
import Power from "@heroicons/react/24/outline/PowerIcon";

function UserFilterBodyRightDrawer() {
  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
    email: "",
    role: "",
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
      firstName: "",
      phone: "",
      email: "",
      role: "",
    });
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          {/* Input User Name */}
          <InputFilterText
            type="text"
            value={formData.firstName}
            onChange={(value) => handleInputChange("firstName", value)}
            containerStyle="mt-2"
            labelTitle="Name"
            placeholder="Search by Username"
          />

          {/* Input Phone */}
          <InputFilterText
            type="text"
            value={formData.phone}
            onChange={(value) => handleInputChange("phone", value)}
            containerStyle="mt-2"
            labelTitle="Phone"
            placeholder="Search by Phone"
          />

          {/* Input Email */}
          <InputFilterText
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange("email", value)}
            containerStyle="mt-2"
            labelTitle="Email"
            placeholder="Search by Email"
          />

          {/* Input Role */}
          <div className="form-control">
            <label htmlFor="role" className="label font-bold">
              Role
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => handleInputChange("role", e.target.value)}
              className="select select-bordered"
            >
              <option value="" disabled>
                Select a Role
              </option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Cashier">Cashier</option>
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

export default UserFilterBodyRightDrawer;
