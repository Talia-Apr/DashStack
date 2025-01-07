import React from 'react';
import { DocumentTextIcon, EnvelopeIcon, } from '@heroicons/react/24/outline';

function ReturnPurchasesDetail() {
  const supplierInfo = [
    "IT Supplier",
    "supplier1@gmail.com",
    "0876-5310-2149",
    "Sukodono, Rt-05 RW-01",
  ];

  const companyInfo = [
    "DashStack",
    "admin@gmail.com",
    "0876-5310-2149",
    "Surabaya, RS-05 RW-01",
  ];

  const returnInfo = [
    "Reference: PR_0012",
    "Status: Ordered",
    "Warehouse: Warehouse 2",
    "Payment Status: Unpaid",
  ];

  const orderData = [
    { product: "86102192 (Macbook Pro)", netUnitCost: 1300.0, quantity: 1, unitCost: 1300.0, discount: 0.0, tax: 0.0, subtotal: 1300.0 },
    { product: "87716743 (Sunglasses)", netUnitCost: 28.0, quantity: 21, unitCost: 28.0, discount: 0.0, tax: 0.0, subtotal: 0.0 },
  ];

  const InfoCard = ({ title, details }) => (
    <div className="space-y-1 text-sm">
      <h3 className="font-bold">{title}</h3>
      {details.map((detail, idx) => (
        <p key={idx} className="text-gray-500">{detail}</p>
      ))}
    </div>
  );

  const IconButton = ({ icon: Icon, label, onClick, className }) => (
    <button
      onClick={onClick}
      className={`btn btn-outline btn-sm flex items-center space-x-1 ${className}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  const OrderSummaryTable = ({ data }) => (
    <table className="table-auto w-full">
      <thead className="bg-gray-300">
        <tr>
          {['Product', 'Net Unit Cost', 'Quantity', 'Unit Cost', 'Discount', 'Tax', 'Subtotal'].map((header, idx) => (
            <th key={idx} className="p-2 text-neutral text-left">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="border-b">
            <td className="p-2">{item.product}</td>
            <td className="p-2">${item.netUnitCost}</td>
            <td className="p-2">{item.quantity}</td>
            <td className="p-2">${item.unitCost}</td>
            <td className="p-2">${item.discount}</td>
            <td className="p-2">${item.tax}</td>
            <td className="p-2">${item.subtotal}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Main Container with White Background */}
      <div className="bg-base-100 p-6 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="space-y-4">
          {/* Title and Buttons Container */}
          <div className="flex justify-between items-center w-full">
            <h2 className="text-lg font-bold">Return Purchases Detail: PR_0012</h2>
            <div className="flex space-x-2">
              {/* Email Button */}
              <IconButton
                icon={EnvelopeIcon}
                label="Email"
                onClick={() => {}}
                className="btn btn-outline flex items-center text-sm h-10 text-blue-300 border-blue-300 hover:bg-blue-50"
              />
              {/* PDF Button */}
              <IconButton
                icon={DocumentTextIcon}
                label="PDF"
                onClick={() => {}}
                className="btn btn-outline btn-error flex items-center text-sm h-10 text-red-500 border-red-500 hover:bg-red-100"
              />
            </div>
          </div>

          {/* Line under the Title and Buttons */}
          <div className="border-b-2 border-gray-200 w-full"></div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <InfoCard title="Supplier Info" details={supplierInfo} />
          <div className="md:ml-10">
            <InfoCard title="Company Info" details={companyInfo} />
          </div>
          <div className="md:ml-10">
            <InfoCard title="Info of Return" details={returnInfo} />
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-8">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <OrderSummaryTable data={orderData} />
        </div>

        {/* Summary Footer */}
        <div className="flex justify-end mt-6 space-y-2">
          <div className="text-sm text-right w-72">
            <div className="bg-gray-300 border-t border-b border-black p-2 flex text-neutral justify-between">
              <span>Order Tax:</span> <span className="font-medium">$0.00 (0.00%)</span>
            </div>
            <div className="p-2 flex justify-between">
              <span>Discount:</span> <span className="font-medium">$0.00</span>
            </div>
            <div className="bg-gray-300 border-t border-b border-black p-2 flex text-neutral justify-between">
              <span>Shipping:</span> <span className="font-medium">$0.00</span>
            </div>
            <div className="p-2 flex justify-between font-medium">
              <span>Grand Total:</span> <span>$1736.00</span>
            </div>
            <div className="bg-gray-300 border-t border-b border-black p-2 flex text-neutral justify-between">
              <span>Paid:</span> <span className="font-medium">$0.00</span>
            </div>
            <div className="p-2 flex justify-between">
              <span className="font-bold">Due:</span> <span className="font-bold">$1736.00</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ReturnPurchasesDetail;
