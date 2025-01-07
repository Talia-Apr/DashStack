import React, { useState, useMemo } from "react";
import SalesTable from "./component/Sales";
import QuotationsTable from "./component/Quotations";
import PurchasesTable from "./component/Purchases";
import SalesReturnTable from "./component/SalesReturn";
import PurchasesReturn from "./component/PurchasesReturn";
import Transfer from "./component/Transfer";
import Adjustment from "./component/Adjustment";
import PageControl from "./component/PageControl";

const ReportPageStock = () => {
  const [activeTab, setActiveTab] = useState("Sales");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm] = useState("");

  const tableData = useMemo(() => ({
    sales: [
      { date: "2024-12-10", reference: "S001", customer: "Rachma", warehouse: "Warehouse 1", product: "Strawberry", qty: "2 kg", subtotal: 100000 },
    ],
    quotations: [
      { date: "2024-12-10", reference: "S001", customer: "Rachma", warehouse: "Warehouse 1", product: "Strawberry", qty: "2 kg", subtotal: 100000 },
    ],
    purchases: [
      { date: "2024-12-10", reference: "S001", supplier: "Rachma", warehouse: "Warehouse 1", product: "Strawberry", qty: "2 kg", subtotal: 100000 },
    ],
    salesReturn: [
      { date: "2024-12-10", reference: "S001", customer: "Rachma", warehouse: "Warehouse 1", product: "Strawberry", qty: "2 kg", subtotal: 100000 },
    ],
    purchasesReturn: [
      { date: "2024-12-10", reference: "S001", supplier: "Rachma", warehouse: "Warehouse 1", product: "Strawberry", qty: "2 kg", subtotal: 100000 },
    ],
    transfer: [
      { date: "2024-12-10", reference: "S001", product: "Strawberry", fromwarehouse: "Warehouse 3", towarehouse: "Warehouse 2" },
    ],
    adjustment: [
      { date: "2024-12-10", reference: "S001", product: "Strawberry", warehouse: "Warehouse 3" },
    ],
  }), []);

  const tabKeyMap = {
    "Sales": "sales",
    "Quotations": "quotations",
    "Purchases": "purchases",
    "Sales Return": "salesReturn",
    "Purchases Return": "purchasesReturn",
    "Transfer": "transfer",
    "Adjustment": "adjustment",
  };

  const filteredData = tableData[tabKeyMap[activeTab]]?.filter((row) => {
    return Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  }) || []; // Jika undefined, default ke array kosong

  const getCurrentData = (data) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset ke halaman pertama
  };

  const warehouseData = [
    { name: "Warehouse 1", quantity: "51.00 pc" },
    { name: "Warehouse 2", quantity: "51.00 pc" },
    { name: "Warehouse 2", quantity: "51.00 pc" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Sales":
        return <SalesTable data={getCurrentData(filteredData)} />;
      case "Quotations":
        return <QuotationsTable data={getCurrentData(filteredData)} />;
      case "Purchases":
        return <PurchasesTable data={getCurrentData(filteredData)} />;
      case "Sales Return":
        return <SalesReturnTable data={getCurrentData(filteredData)} />;
      case "Purchases Return":
        return <PurchasesReturn data={getCurrentData(filteredData)} />;
      case "Transfer":
        return <Transfer data={getCurrentData(filteredData)} />;
      case "Adjustment":
        return <Adjustment data={getCurrentData(filteredData)} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center h-screen pt-10 px-4">
      {/* Header Section: Tabel Warehouse + Judul */}
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-start w-full max-w-6xl mb-6">
        {/* Tabel Warehouse */}
        <div className="w-full sm:w-auto overflow-x-auto">
          <table className="table-auto border border-primary rounded-lg text-sm sm:text-base w-full sm:w-auto">
            <thead className="bg-[#D9D9D9]">
              <tr>
                <th className="py-2 sm:py-4 px-3 sm:px-6 text-left font-semibold text-neutral">
                  Warehouse
                </th>
                <th className="py-2 sm:py-4 px-3 sm:px-6 text-left font-semibold text-neutral">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {warehouseData.map((item, index) => (
                <tr key={index} className="bg-base-100">
                  <td className="py-2 sm:py-4 px-3 sm:px-6 text-[#FFFFF]">
                    {item.name}
                  </td>
                  <td className="py-2 sm:py-4 px-3 sm:px-6 text-[#FFFFF]">
                    {item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Judul */}
        <div className="w-full sm:w-auto sm:ml-2 flex sm:justify-center justify-center mt-2 sm:mt-0">
          <h1 className="text-xl sm:text-3xl font-bold text-[#FFFFF] text-center sm:text-right">
            Strawberry
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-6xl p-6 sm:p-10 bg-base-100 rounded-lg shadow-md">
        <div className="flex justify-between mb-4 border-b-2 border-gray-300">
          <div className="flex flex-wrap gap-2 sm:gap-1">
            {["Sales", "Quotations", "Purchases", "Sales Return", "Purchases Return", "Transfer", "Adjustment"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`p-2 px-4 rounded-t-lg ${activeTab === tab
                  ? "bg-white text-purple-500 font-semibold"
                  : "bg-gray-100 text-gray-500"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div>{renderContent()}</div>
        <PageControl
          totalItems={filteredData.length}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
    </div>
  );
};

export default ReportPageStock;
