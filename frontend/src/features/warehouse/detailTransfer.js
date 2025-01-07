import { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard"; // Import TitleCard

function DetailTransfer({ transferId }) {
  // Data dummy untuk transfer
  const transferData = {
    date: "2024-11-05",
    reference: "TR_1115",
    fromWarehouse: "Warehouse 1",
    toWarehouse: "Warehouse 2",
    grandTotal: "$1300.00",
    status: "Completed",
    products: [
      {
        name: "Macbook Pro",
        code: "86102192",
        quantity: "10 pc",
        subtotal: "$13000.00",
      },
    ],
  };

  const [transfer, setTransfer] = useState(null);

  // Set data transfer dummy saat komponen dimuat
  useEffect(() => {
    if (transferId) {
      setTransfer(transferData);
    }
  }, [transferId]);

  // Fungsi untuk handle print

  return (
    <>
      <TitleCard
        title="Transfer Details"
        description="View and manage transfer details"
        topMargin="mt-2"
        padding="8"
      >
        {/* Transfer Information */}
        <div className="flex flex-wrap items-start space-x-6">
          {/* Transfer Detail */}
          <div className="w-full">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Date</td>
                  <td className="px-4 py-2">{transfer?.date || "N/A"}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Reference</td>
                  <td className="px-4 py-2">{transfer?.reference || "N/A"}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">From Warehouse</td>
                  <td className="px-4 py-2">
                    {transfer?.fromWarehouse || "N/A"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">To Warehouse</td>
                  <td className="px-4 py-2">
                    {transfer?.toWarehouse || "N/A"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Grand Total</td>
                  <td className="px-4 py-2">{transfer?.grandTotal || "N/A"}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Status</td>
                  <td className="px-4 py-2">{transfer?.status || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Product List */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Products</h3>
          <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2 font-semibold">Product</th>
                <th className="px-4 py-2 font-semibold">Code</th>
                <th className="px-4 py-2 font-semibold">Quantity</th>
                <th className="px-4 py-2 font-semibold">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {transfer?.products.map((product, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{product.name || "N/A"}</td>
                  <td className="px-4 py-2">{product.code || "N/A"}</td>
                  <td className="px-4 py-2">{product.quantity || "N/A"}</td>
                  <td className="px-4 py-2">{product.subtotal || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default DetailTransfer;
