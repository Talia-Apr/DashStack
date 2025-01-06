import React, { useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { showNotification } from "../common/headerSlice";
import { useDispatch } from "react-redux";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { QrCodeIcon } from "@heroicons/react/24/outline";

const CreateTransfer = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [form, setForm] = useState({
    date: "",
    fromWarehouse: "",
    toWarehouse: "",
    orderItems: [],  // Tambahkan orderItems di sini
    orderTax: 0,
    discount: 0,
    shipping: 0,
    status: "",
    note: "",
  });

  const calculateTotal = () => {
    const totalSubtotal = form.orderItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );
    return totalSubtotal + form.orderTax - form.discount + form.shipping;
  };

  const handleSubmit = () => {
    // Validasi tanggal
    if (!selectedDate) {
      dispatch(
        showNotification({
          message: "Please select a date",
          status: 0,
        })
      );
      return;
    }

    // Validasi dropdown: Pastikan pilihan tidak kosong
    if (
      !form.fromWarehouse ||
      form.fromWarehouse === "" ||
      !form.toWarehouse ||
      form.toWarehouse === ""
    ) {
      dispatch(
        showNotification({
          message: "Please select both warehouses",
          status: 0,
        })
      );
      return;
    }

    // Validasi status
    if (!form.status || form.status === "") {
      dispatch(
        showNotification({
          message: "Please select a transfer status",
          status: 0,
        })
      );
      return;
    }

    // Validasi input numerik (pastikan ada nilai yang valid)
    if (
      form.orderTax === "" ||
      form.orderTax === 0 ||
      form.discount === "" ||
      form.discount === 0 ||
      form.shipping === "" ||
      form.shipping === 0
    ) {
      dispatch(
        showNotification({
          message:
            "Please enter valid values for Order Tax, Discount, and Shipping",
          status: 0,
        })
      );
      return;
    }

    // Validasi apakah semua form terisi dengan benar
    const isValid = Object.keys(form).every((key) => {
      if (key === "orderTax" || key === "discount" || key === "shipping") {
        // Validasi input numerik: harus ada nilai yang valid
        return form[key] !== "" && form[key] !== 0;
      }
      // Validasi string dan dropdown
      return form[key] !== "" && form[key] !== null;
    });

    if (isValid) {
      dispatch(
        showNotification({
          message: "Transfer Created Successfully",
          status: 1,
        })
      );
    } else {
      dispatch(
        showNotification({
          message: "Please fill all required fields",
          status: 0,
        })
      );
    }
  };

  const [scanning, setScanning] = useState(false);
  const [productCode, setProductCode] = useState("");

  const toggleScanner = () => {
    setScanning(!scanning);
  };

  const handleBarcodeScan = (data) => {
    if (data) {
      setProductCode(data.text);
      setScanning(false);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setForm((prevForm) => ({
      ...prevForm,
      [updateType]: value,
    }));
  };

  const totalSubtotal = form.orderItems.reduce(
    (total, item) => total + item.subtotal,
    0
  );
  const total = calculateTotal(); // Menghitung total berdasarkan orderItems, orderTax, discount, dan shipping

  return (
    <>
      {/* Title Card */}
      <TitleCard title="Create Transfer" topMargin="mt-2">
        <div className="grid grid-cols-1 gap-6">
          {/* Date */}
          <div className="flex left-6 mb-4">
            <div className="w-full sm:w-1/2">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="input input-bordered w-full"
                placeholderText="Select a date"
              />
            </div>
          </div>

          {/* From and To Warehouse */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputText
              labelTitle="From Warehouse"
              updateType="fromWarehouse"
              defaultValue=""
              placeholder="Select source warehouse"
              updateFormValue={updateFormValue}
              isDropdown={true}
              options={[
                { label: "Choose Warehouse", value: "" },
                { label: "Warehouse A", value: "Warehouse A" },
                { label: "Warehouse B", value: "Warehouse B" },
              ]}
            />
            <InputText
              labelTitle="To Warehouse"
              updateType="toWarehouse"
              defaultValue=""
              placeholder="Select destination warehouse"
              updateFormValue={updateFormValue}
              isDropdown={true}
              options={[
                { label: "Choose Warehouse", value: "" },
                { label: "Warehouse C", value: "Warehouse C" },
                { label: "Warehouse D", value: "Warehouse D" },
              ]}
            />
          </div>
          <div>
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
            <div className="mt-4">
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

          <div className="mb-6">
            <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                    Product
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                    Code Product
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    No data available
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    -
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    -
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total Summary */}
          <div className="flex justify-end mb-6">
            <div className="text-sm text-right w-72">
              <div className="bg-[#D9D9D9] border-t border-b border-black p-2 flex justify-between">
                <span className="text-sm text-neutral font-medium">
                  Subtotal:
                </span>
                <span className="text-sm text-neutral font-medium">
                  ${totalSubtotal.toFixed(2)}
                </span>
              </div>
              <div className="bg-base-100 border-t border-b border-black p-2 flex justify-between">
                <span className="text-sm  font-medium">Order Tax:</span>
                <span className="text-sm font-medium">
                  ${form.orderTax.toFixed(2)}
                </span>
              </div>
              <div className="bg-[#D9D9D9] border-t border-b border-black p-2 flex justify-between">
                <span className="text-sm text-neutral font-medium">
                  Discount:
                </span>
                <span className="text-sm text-neutral font-medium">
                  ${form.discount.toFixed(2)}
                </span>
              </div>
              <div className="bg-base-100 border-t border-b border-black p-2 flex justify-between">
                <span className="text-sm font-medium">Shipping:</span>
                <span className="text-sm font-medium">
                  ${form.shipping.toFixed(2)}
                </span>
              </div>
              <div className="bg-[#D9D9D9] border-t border-b border-black p-2 flex justify-between">
                <span className="text-sm text-neutral font-bold">
                  Grand Total:
                </span>
                <span className="text-sm text-neutral font-bold">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Order Tax, Discount, and Shipping */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputText
              labelTitle="Order Tax"
              updateType="orderTax"
              defaultValue=""
              placeholder="Enter order tax"
              updateFormValue={updateFormValue}
              inputType="number"
            />
            <InputText
              labelTitle="Discount"
              updateType="discount"
              defaultValue=""
              placeholder="Enter discount amount"
              updateFormValue={updateFormValue}
              inputType="number"
            />
            <InputText
              labelTitle="Shipping"
              updateType="shipping"
              defaultValue=""
              placeholder="Enter shipping cost"
              updateFormValue={updateFormValue}
              inputType="number"
            />
          </div>

          {/* Status */}
          <InputText
            labelTitle="Status"
            updateType="status"
            defaultValue=""
            placeholder="Select transfer status"
            updateFormValue={updateFormValue}
            isDropdown={true}
            options={[
              { label: "Choose Status", value: "" },
              { label: "Pending", value: "Pending" },
              { label: "Completed", value: "Completed" },
            ]}
          />

          {/* Note */}
          <TextAreaInput
            labelTitle="Note"
            updateType="note"
            defaultValue=""
            placeholder="Add any additional notes"
            updateFormValue={updateFormValue}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            className="btn btn-primary float-right"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </TitleCard>
    </>
  );
};

export default CreateTransfer;
