import React, { useState, useMemo } from "react";
import SalesTable from "./component/SalesTable";
import QuotationsTable from "./component/QuotationsTable";
import ReturnTable from "./component/ReturnTable";
import SalesPaymentsTable from "./component/SalesPaymentsTable";
import CustomerStats from "./component/customerStats";
import PageControl from "./component/PageControl";
import {
  CreditCardIcon,
  InboxArrowDownIcon,
  UserGroupIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";

function ReportPageCustomer() {
  const [activeTab, setActiveTab] = useState("Sales");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm] = useState("");

  // Fungsi untuk menyederhanakan angka (K, M, B)
  const formatToShort = (number) => {
    if (number >= 1000000000) {
      return (number / 1000000000).toFixed(1) + "B"; // Miliar
    } else if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M"; // Juta
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K"; // Ribu
    } else {
      return number.toString(); // Angka kurang dari 1000
    }
  };

  // Membungkus tableData dengan useMemo untuk menghindari re-render yang tidak perlu
  const tableData = useMemo(() => ({
    sales: [
      { reference: "S001", customer: "Rachma", warehouse: "Warehouse 1", grandTotal: 5000, paid: 3000, due: 2000, status: "Completed", paymentStatus: "Partial", shippingStatus: "Delivered" },
      { reference: "S002", customer: "Shafira", warehouse: "Warehouse 2", grandTotal: 8000, paid: 8000, due: 0, status: "Ordered", paymentStatus: "Paid", shippingStatus: "Shipped" },
    ],
    quotations: [
      { date: "2024-12-15", reference: "Q001", customer: "Shafira", warehouse: "Warehouse 1", grandTotal: 12000000, status: "Pending" },
      { date: "2024-12-18", reference: "Q002", customer: "Rachma", warehouse: "Warehouse 2", grandTotal: 2000000000, status: "Sent" },
    ],
    returns: [
      { reference: "RT001", customer: "Shafira", saleref: "SL_0001", warehouse: "Warehouse 1", grandTotal: 12000000, paid: 12000000, due: 0, status: "Completed", paymentStatus: "Paid" },
      { reference: "RT002", customer: "Rachma", saleref: "SL_0001", warehouse: "Warehouse 2", grandTotal: 12000000, paid: 0, due: 12000000, status: "Pending", paymentStatus: "Unpaid" },
    ],
    salesPayments: [
      { date: "2024-12-15", reference: "SP001", sale: "SL_0001", paid: "Cash", amount: 2000000 },
      { date: "2024-12-18", reference: "SP002", sale: "SL_0002", paid: "Card", amount: 12000000 },
    ],
  }), []);

  // Menghitung total untuk statsData berdasarkan tableData
  const statsData = useMemo(() => {
    const totalPaid = [
      ...tableData.sales.map(item => item.paid),
      ...tableData.returns.map(item => item.paid),
      ...tableData.salesPayments.map(item => item.amount),
    ].reduce((acc, value) => acc + value, 0);

    const totalSales = [
      ...tableData.sales.map(item => item.grandTotal),
    ].reduce((acc, value) => acc + value, 0);

    const totalDue = [
      ...tableData.sales.map(item => item.due),
      ...tableData.returns.map(item => item.due),
    ].reduce((acc, value) => acc + value, 0);

    const totalAmount = [
      ...tableData.sales.map(item => item.grandTotal),
      ...tableData.returns.map(item => item.grandTotal),
    ].reduce((acc, value) => acc + value, 0);

    return [
      {
        title: "Total Paid",
        value: formatToShort(totalPaid),
        icon: (
          <button className="btn btn-circle bg-primary text-white">
            <CreditCardIcon className="w-6 h-6" />
          </button>
        ),
        description: "↗︎ 2300 (22%)",
      },
      {
        title: "Sales",
        value: formatToShort(totalSales),
        icon: (
          <button className="btn btn-circle bg-primary text-white">
            <InboxArrowDownIcon className="w-6 h-6" />
          </button>
        ),
        description: "Current month",
      },
      {
        title: "Due",
        value: formatToShort(totalDue),
        icon: (
          <button className="btn btn-circle bg-primary text-white">
            <UserGroupIcon className="w-6 h-6" />
          </button>
        ),
        description: "50 in hot leads",
      },
      {
        title: "Total Amount",
        value: formatToShort(totalAmount),
        icon: (
          <button className="btn btn-circle bg-primary text-white">
            <PresentationChartBarIcon className="w-6 h-6" />
          </button>
        ),
        description: "↙ 300 (18%)",
      },
    ];
  }, [tableData]);

  // Tab dan penyaringan data berdasarkan tab aktif
  const tabKeyMap = {
    Sales: "sales",
    Quotations: "quotations",
    Return: "returns",
    "Sales Payments": "salesPayments",
  };

  const filteredData = tableData[tabKeyMap[activeTab]].filter((row) => {
    return Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

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

  const renderContent = () => {
    switch (activeTab) {
      case "Sales":
        return (
          <SalesTable
            data={getCurrentData(filteredData)}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
          />
        );
      case "Quotations":
        return (
          <QuotationsTable
            data={getCurrentData(filteredData)}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
          />
        );
      case "Return":
        return (
          <ReturnTable
            data={getCurrentData(filteredData)}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
          />
        );
      case "Sales Payments":
        return (
          <SalesPaymentsTable
            data={getCurrentData(filteredData)}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center h-screen pt-10 px-4">
      <div className="w-full max-w-6xl space-y-6">
        <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
          {statsData.map((d, k) => (
            <CustomerStats key={k} {...d} colorIndex={k} />
          ))}
        </div>
        <div className="w-full max-w-6xl p-6 sm:p-10 bg-base-100 rounded-lg shadow-md">
          <div className="flex justify-between mb-4 border-b-2 border-gray-300">
            <div className="flex flex-wrap gap-2 sm:gap-1">
              {["Sales", "Quotations", "Return", "Sales Payments"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`p-2 px-4 rounded-t-lg ${
                    activeTab === tab
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
    </div>
  );
}

export default ReportPageCustomer;
