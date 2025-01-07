import { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import {
  QrCodeIcon,
  PrinterIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import Barcode from "react-barcode"; // Impor Barcode

function PrintLabels() {
  const [warehouse, setWarehouse] = useState("");
  const [productCode, setProductCode] = useState("");
  const [paperSize, setPaperSize] = useState("");
  const [displayPrice, setDisplayPrice] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [showBarcode, setShowBarcode] = useState(false); // State untuk menampilkan barcode

  const handleReset = () => {
    setWarehouse("");
    setProductCode("");
    setPaperSize("");
    setDisplayPrice(false);
    setShowBarcode(false); // Sembunyikan barcode saat reset
  };

  const handleBarcodeScan = (data) => {
    if (data) {
      setProductCode(data.text);
      setScanning(false);
    }
  };

  const toggleScanner = () => {
    setScanning(!scanning);
  };

  const handlePrint = () => {
    console.log("Print");
    setShowBarcode(true); // Tampilkan barcode setelah tombol Print diklik
  };

  return (
    <TitleCard title="Print Labels" topMargin="mt-4">
      {/* Form Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Warehouse
          </label>
          <select
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              Choose Warehouse
            </option>
            <option value="warehouse1">Warehouse 1</option>
            <option value="warehouse2">Warehouse 2</option>
          </select>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Paper Size
          </label>
          <select
            value={paperSize}
            onChange={(e) => setPaperSize(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              Select Paper Size
            </option>
            <option value="A4">A4</option>
            <option value="A5">A5</option>
          </select>
        </div>
        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            id="displayPrice"
            checked={displayPrice}
            onChange={(e) => setDisplayPrice(e.target.checked)}
            className="checkbox checkbox-primary mr-2"
          />
          <label
            htmlFor="displayPrice"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Display Price
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          className="btn btn-primary flex items-center"
          onClick={() => console.log("Update")}
        >
          <ArrowPathIcon className="w-5 h-5 mr-2" />
          Update
        </button>
        <button
          className="btn btn-error flex items-center"
          onClick={handleReset}
        >
          <ArrowPathIcon className="w-5 h-5 mr-2" />
          Reset
        </button>
        <button
          className="btn btn-success flex items-center"
          onClick={handlePrint}
        >
          <PrinterIcon className="w-5 h-5 mr-2" />
          Print
        </button>
      </div>

      {/* Barcode Display */}
      {showBarcode && productCode && (
        <div className="mt-6 flex justify-center">
          <Barcode value={productCode} />
        </div>
      )}
    </TitleCard>
  );
}

export default PrintLabels;
