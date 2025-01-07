import { useState, useEffect } from "react";
import TitleCard from "../../../components/Cards/TitleCard"; // Import TitleCard
import { PrinterIcon } from "@heroicons/react/24/outline"; // Import Printer Icon

function ProductDetail({ productId }) {
  // Data dummy untuk produk
  const productData = {
    name: "Product Example",
    image: "https://via.placeholder.com/150", // URL gambar produk
    barcodeSymbology: "EAN-13",
    barcode: "1234567890123",
    category: "Fruits",
    brand: "Brand Example",
    description: "This is a detailed description of the product.",
    price: "20.00",
    cost: "15.00",
    stockAlert: "5",
    unit: "Kilogram",
  };

  const [product, setProduct] = useState(null);

  // Set data produk dummy saat komponen dimuat
  useEffect(() => {
    if (productId) {
      setProduct(productData);
    }
  }, [productId]);

  // Fungsi untuk handle print
  const handlePrint = () => {
    window.print(); // Ini akan memicu print dialog pada browser
  };

  return (
    <>
      <TitleCard
        title="Product Details"
        description="View and manage product details"
        topMargin="mt-2"
        padding="8"
      >
        {/* Tombol Print */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handlePrint}
            className="btn btn-primary flex items-center space-x-2"
          >
            <PrinterIcon className="h-5 w-5 text-white" />
            <span>Print</span>
          </button>
        </div>

        {/* Kontainer Gambar dan Tabel */}
        <div className="flex flex-wrap items-start space-x-6">
          {/* Gambar Produk */}
          <div className="w-1/3">
            <img
              src={product?.image || "default-image-url.jpg"}
              alt={product?.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Tabel Detail Produk */}
          <div className="w-2/3">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Name</td>
                  <td className="px-4 py-2">{product?.name || "N/A"}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Category</td>
                  <td className="px-4 py-2">{product?.category || "N/A"}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Brand</td>
                  <td className="px-4 py-2">{product?.brand || "N/A"}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Cost</td>
                  <td className="px-4 py-2">{product?.cost || "N/A"}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Price</td>
                  <td className="px-4 py-2">{product?.price || "N/A"}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Unit</td>
                  <td className="px-4 py-2">{product?.unit || "N/A"}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Stock Alert</td>
                  <td className="px-4 py-2">{product?.stockAlert || "N/A"}</td>
                </tr>

                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Warehouse</td>
                  <td className="px-4 py-2">{product?.warehouse || "N/A"}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Quantity</td>
                  <td className="px-4 py-2">{product?.quantity || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Barcode */}
        <div className="mt-6 text-center">
          <img
            src={`https://api.barcodes4.me/barcode/c128b/${product?.barcode}.png`}
            alt="Barcode"
            className="mx-auto"
          />
        </div>
      </TitleCard>
    </>
  );
}

export default ProductDetail;