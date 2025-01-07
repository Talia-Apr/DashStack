import { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import PageControl from "../../../components/PageControl/PageControl";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { jsPDF } from "jspdf";

function BestCustomer() {
  const [data] = useState(
    [
      { name: "Aku", phone: "08123456789", email: "aku@gmail.com", totalPurchase: 2, totalAmount: 3430 },
      { name: "Saya", phone: "08129876543", email: "saya@gmail.com", totalPurchase: 5, totalAmount: 5700 },
      { name: "Kamu", phone: "08129998877", email: "kamu@gmail.com", totalPurchase: 3, totalAmount: 2500 },
      { name: "Kita", phone: "08121122334", email: "kita@gmail.com", totalPurchase: 4, totalAmount: 4000 },
      { name: "Mereka", phone: "08123344556", email: "mereka@gmail.com", totalPurchase: 7, totalAmount: 6300 },
    ]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState(null);

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;

  // Berikan ranking awal berdasarkan totalPurchase terbesar
  const rankedData = data
    .slice()
    .sort((a, b) => b.totalPurchase - a.totalPurchase)
    .map((item, index) => ({ ...item, rank: index + 1 }));

  // Filter dan urutkan data
  const filteredAndSortedData = rankedData
    .filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    )
    .slice()
    .sort((a, b) => {
      if (!sortField) return a.rank - b.rank; // Jika tidak ada sorting, gunakan ranking awal
      if (sortOrder === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

  // Data yang akan ditampilkan pada tabel (berdasarkan pagination)
  const currentData = filteredAndSortedData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    const totalPages = Math.ceil(filteredAndSortedData.length / rowsPerPage);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    doc.text("Best Customer List", 10, 10);
    doc.text(`Generated on: ${formattedDate}`, 10, 20);

    const tableData = rankedData.map((customer) => [
      customer.rank,
      customer.name,
      customer.phone,
      customer.email,
      customer.totalPurchase,
      new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(customer.totalAmount),
    ]);

    doc.autoTable({
      head: [["#", "Name", "Phone", "Email", "Total Purchase", "Total Amount"]],
      body: tableData,
      startY: 30,
    });

    doc.save("Best Customers.pdf");
  };

  return (
    <>
      <TitleCard title="Best Customer" topMargin="mt-2">
        <div className="flex w-full items-center justify-between flex-wrap">
          <div className="relative">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-2 sm:mt-0 ml-auto">
            <button
              onClick={handleExportPDF}
              className="btn btn-outline btn-error flex items-center text-sm h-10"
            >
              <DocumentTextIcon className="w-5 h-5 mr-1" />
              PDF
            </button>
          </div>
        </div>
        <div className="overflow-x-auto w-full mt-4">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th
                  onClick={() => handleSort("totalPurchase")}
                  className="cursor-pointer"
                >
                  Total Purchase
                  <span className="ml-1">{sortField === "totalPurchase" && (sortOrder === "asc" ? "▲" : "▼")}</span>
                </th>
                <th
                  onClick={() => handleSort("totalAmount")}
                  className="cursor-pointer"
                >
                  Total Amount
                  <span className="ml-1">{sortField === "totalAmount" && (sortOrder === "asc" ? "▲" : "▼")}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((customer) => (
                <tr key={customer.rank}>
                  <td>{customer.rank}</td>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>{customer.totalPurchase}</td>
                  <td>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(customer.totalAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PageControl
          totalItems={filteredAndSortedData.length}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TitleCard>
    </>
  );
}

export default BestCustomer;
