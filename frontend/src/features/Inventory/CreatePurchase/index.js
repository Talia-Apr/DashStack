import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import TitleCard from "../../../components/Cards/TitleCard";

const CreatePurchase = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [supplier, setSupplier] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [orderTax, setOrderTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [scanning, setScanning] = useState(false);
  const [productCode, setProductCode] = useState("");
  const [orderItems, setOrderItems] = useState([]);

  const toggleScanner = () => {
    setScanning(!scanning);
  };

  const handleBarcodeScan = (data) => {
    if (data) {
      const scannedProduct = {
        id: Date.now(),
        product: "Scanned Product",
        unitPrice: 15.0,
        currentStock: "1 kg",
        qty: 1,
        discount: 0.0,
        tax: 0.75,
        subtotal: 15.75,
      };
      setProductCode(data.text);
      setOrderItems((prev) => [...prev, scannedProduct]);
      setScanning(false);
    }
  };

  const calculateTotal = () => {
    const totalSubtotal = orderItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );
    return totalSubtotal + orderTax - discount + shipping;
  };

  const handleSubmit = () => {
    const data = {
      date: selectedDate,
      supplier,
      warehouse,
      orderItems,
      orderTax,
      discount,
      shipping,
      total: calculateTotal(),
      status,
      note,
    };
    console.log("Order Data:", data);
    alert("Order submitted successfully!");
  };

  // Total Calculation for display
  const totalSubtotal = orderItems.reduce(
    (total, item) => total + item.subtotal,
    0
  );
  const total = calculateTotal();

  return (
    <TitleCard title="Create Purchase" topMargin="mt-2">
      {/* Date, Supplier, Warehouse */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Date */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium mb-1">
            Date*
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full border bg-base-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Supplier */}
        <div className="flex flex-col">
          <label className="block text-sm font-mediummb-1">
            Supplier*
          </label>
          <select
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="w-full border bg-base-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Choose Supplier</option>
            <option value="Supplier A">Supplier A</option>
            <option value="Supplier B">Supplier B</option>
          </select>
        </div>

        {/* Warehouse */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium mb-1">
            Warehouse*
          </label>
          <select
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
            className="w-full border bg-base-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Choose Warehouse</option>
            <option value="Warehouse A">Warehouse A</option>
            <option value="Warehouse B">Warehouse B</option>
          </select>
        </div>
      </div>

      {/* Product Scanner */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Code Product
        </label>
        <div className="relative flex items-center">
          <input
            type="text"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            placeholder="Scan or Search Product By Code"
            className="input input-bordered w-full"
          />
          <button
            onClick={toggleScanner}
            className="btn btn-primary ml-2 flex items-center"
          >
            <QrCodeIcon className="w-5 h-5 mr-1" />
            Scan
          </button>
        </div>
      </div>

      {/* Barcode Scanner */}
      {scanning && (
        <div className="mb-6">
          <BarcodeScannerComponent
            onUpdate={(err, result) => {
              if (result) handleBarcodeScan(result);
            }}
            width={300}
            height={300}
          />
          <button
            type="button"
            onClick={toggleScanner}
            className="btn btn-secondary mt-2"
          >
            Close Scanner
          </button>
        </div>
      )}

      {/* Order Items Table */}
      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-[#D9D9D9] px-4 py-2 text-neutral text-left">#</th>
            <th className="border border-[#D9D9D9] px-4 py-2 text-neutral text-left">
              Product
            </th>
            <th className="border border-[#D9D9D9] px-4 py-2 text-neutral text-left">
              Net Unit Price
            </th>
            <th className="border border-[#D9D9D9] px-4 py-2 text-neutral text-left">
              Current Stock
            </th>
            <th className="border border-[#D9D9D9] px-4 py-2 text-neutral text-left">
              Qty Return
            </th>
            <th className="border border-[#D9D9D9] px-4 py-2 text-neutral text-left">
              Discount
            </th>
            <th className="border border-[#D9D9D9] px-4 py-2 text-neutral text-left">Tax</th>
            <th className="border border-[#D9D9D9] px-4 py-2 text-neutral text-left">
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody>
          {orderItems.length > 0 ? (
            orderItems.map((item, index) => (
              <tr key={item.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.product}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${item.unitPrice.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.currentStock}
                </td>
                <td className="border border-gray-300 px-4 py-2">{item.qty}</td>
                <td className="border border-gray-300 px-4 py-2">
                  ${item.discount.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${item.tax.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${item.subtotal.toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4">
                No items available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Total Summary */}
      <div className="flex justify-end mb-6">
        <div className="text-sm text-right w-72">
          <div className="bg-[#D9D9D9] border-t border-b border-black p-2 flex justify-between">
            <span className="text-sm text-neutral font-medium">Subtotal:</span>
            <span className="text-sm text-neutral font-medium">
              ${totalSubtotal.toFixed(2)}
            </span>
          </div>
          <div className="bg-base-100 border-t border-b border-black p-2 flex justify-between">
            <span className="text-sm  font-medium">Order Tax:</span>
            <span className="text-sm font-medium">${orderTax.toFixed(2)}</span>
          </div>
          <div className="bg-[#D9D9D9] border-t border-b border-black p-2 flex justify-between">
            <span className="text-sm text-neutral font-medium">Discount:</span>
            <span className="text-sm text-neutral font-medium">${discount.toFixed(2)}</span>
          </div>
          <div className="bg-base-100 border-t border-b border-black p-2 flex justify-between">
            <span className="text-sm font-medium">Shipping:</span>
            <span className="text-sm font-medium">${shipping.toFixed(2)}</span>
          </div>
          <div className="bg-[#D9D9D9] border-t border-b border-black p-2 flex justify-between">
            <span className="text-sm text-neutral font-bold">Grand Total:</span>
            <span className="text-sm text-neutral font-bold">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Order Tax, Discount, Shipping */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Order Tax
          </label>
          <input
            type="number"
            value={orderTax}
            onChange={(e) => setOrderTax(parseFloat(e.target.value) || 0)}
            className="w-full border bg-base-100 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium  mb-1">
            Discount
          </label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
            className="w-full border bg-base-100 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Shipping
          </label>
          <input
            type="number"
            value={shipping}
            onChange={(e) => setShipping(parseFloat(e.target.value) || 0)}
            className="w-full border bg-base-100 rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Status, Note */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Status*
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border bg-base-100 rounded px-3 py-2"
        >
          <option value="">Choose Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Note
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border bg-base-100 rounded px-3 py-2"
          rows="3"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button className="btn btn-primary float-right" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </TitleCard>
  );
};

export default CreatePurchase;
