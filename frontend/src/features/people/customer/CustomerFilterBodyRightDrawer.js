import React, { useState } from "react";
import InputFilterText from "../../../components/Input/InputFilter"; 
import Funnel from "@heroicons/react/24/outline/FunnelIcon";
import Power from "@heroicons/react/24/outline/PowerIcon";

function CustomerFilterBodyRightDrawer() {
  const [formData, setFormData] = useState({
    customerCode: "",
    customerName: "",
    phone: "",
    email: "",
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
    // Lakukan logika pengiriman data di sini
  };

  const handleReset = () => {
    // Mengosongkan semua input
    setFormData({
      customerCode: "",
      customerName: "",
      phone: "",
      email: "",
    });
  };

  return (
    <>
      <div className="min-h-screen flex">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit}>
            {/* Input Customer Code */}
            <InputFilterText
              type="text"
              value={formData.customerCode}
              onChange={(value) => handleInputChange("customerCode", value)}
              containerStyle="mt-2"
              labelTitle="Customer Code"
              placeholder="Search by Code"
            />

            {/* Input Customer Name */}
            <InputFilterText
              type="text"
              value={formData.customerName}
              onChange={(value) => handleInputChange("customerName", value)}
              containerStyle="mt-2"
              labelTitle="Customer Name"
              placeholder="Search by Name"
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

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800"
              >
                <Funnel className="h-5 w-5 inline-block mr-1 mb-1" />
                Filter
              </button>

              <button
                type="button"
                onClick={handleReset} // Panggil fungsi reset
                className="bg-error text-white py-2 px-4 rounded-md hover:bg-red-500"
              >
                <Power className="h-5 w-5 inline-block mr-1 mb-1" />
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CustomerFilterBodyRightDrawer;
