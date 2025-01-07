import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  DocumentArrowDownIcon,
  DocumentTextIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import TitleCard from "../../../components/Cards/TitleCard";
import FilterAllP from "../../filter";
import TableComponent from "../../../components/Table/TableComponent";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver"; // untuk men-download file
import { BsFilter, BsPower } from "react-icons/bs";

function AllProducts() {
  const [searchText, setSearchText] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const totalItems = 100;

  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([
    {
      id: 1,
      image: "/intro.png",
      name: "Unpaired Gray",
      code: "87654321",
      brand: "Adidas",
      category: "Shoes",
      cost: 22.0,
      price: 25.0,
      quantity: "101 kg",
    },
  ]);

  const navigate = useNavigate();

  const filteredProduct = data.filter(
    (product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.code.toLowerCase().includes(searchText.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(data.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleViewDetails = (id) => {
    navigate(`/app/product-allProduct/detailProduct/${id}`);
  };

  const handleEditProduct = (id) => {
    navigate(`/app/product-allProduct/editProduct/${id}`);
  };

  const handleDeleteProduct = (item) => {
    setProductToDelete(item);
    setIsDeletePopupVisible(true);
  };

  const confirmDeleteProduct = () => {
    setData(data.filter((product) => product.id !== productToDelete.id));
    setIsDeletePopupVisible(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeletePopupVisible(false);
    setProductToDelete(null);
  };

  const columns = [
    {
      label: (
        <input
          type="checkbox"
          className="checkbox"
          onChange={handleSelectAll}
        />
      ),
      render: (item) => (
        <input
          type="checkbox"
          className="checkbox"
          checked={selectedRows.includes(item.id)}
          onChange={() => handleCheckboxChange(item.id)}
        />
      ),
      className: "text-center",
    },
    {
      label: "Image",
      render: (item) => (
        <img src={item.image} alt={item.name} className="w-10 h-10 rounded" />
      ),
      className: "text-center",
    },
    { label: "Name", accessor: "name" },
    { label: "Code", accessor: "code" },
    { label: "Brand", accessor: "brand" },
    { label: "Category", accessor: "category" },
    {
      label: "Cost",
      accessor: "cost",
      className: "text-right",
      render: (item) => `$${item.cost.toFixed(2)}`,
    },
    {
      label: "Price",
      accessor: "price",
      className: "text-right",
      render: (item) => `$${item.price.toFixed(2)}`,
    },
    { label: "Quantity", accessor: "quantity", className: "text-right" },
    {
      label: "Actions",
      render: (item) => (
        <div className="flex space-x-2 justify-center">
          <button
            onClick={() => handleViewDetails(item.id)}
            className="btn btn-sm btn-info"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleEditProduct(item.id)}
            className="btn btn-sm btn-warning"
          >
            <PencilSquareIcon className="w-5 h-5" />
          </button>
          <button
            className="btn btn-sm btn-error"
            onClick={() => handleDeleteProduct(item)}
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      ),
      className: "text-center",
    },
  ];

  const handleCreateProduct = () => {
    navigate("/app/product-createProduct");
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      ["Product Name", "Price", "Category"],
      ...data.map((product) => [
        product.name,
        `$${product.price.toFixed(2)}`,
        product.category,
      ]),
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");
    XLSX.writeFile(wb, "products.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Product List", 10, 10);
    data.forEach((product, index) => {
      doc.text(
        `${product.name} - $${product.price.toFixed(2)} - ${product.category}`,
        10,
        20 + index * 10
      );
    });
    doc.save("products.pdf");
  };

  return (
    <TitleCard title="All Products" topMargin="mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
        <div className="relative">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by Name or Code"
            className="input input-bordered w-full"
          />
        </div>

        <div className="absolute right-6 flex space-x-2">
          <button
            className="btn btn-outline btn-primary flex items-center text-sm h-10"
            onClick={() => setIsFilterVisible(true)}
          >
            <FunnelIcon className="w-5 h-5 mr-1" />
            Filter
          </button>
          <button
            className="btn btn-outline btn-success flex items-center"
            onClick={handleExportExcel}
          >
            <DocumentArrowDownIcon className="w-5 h-5 mr-1" />
            Export Excel
          </button>
          <button
            className="btn btn-outline btn-error flex items-center"
            onClick={handleExportPDF}
          >
            <DocumentTextIcon className="w-5 h-5 mr-1" />
            Export PDF
          </button>

          <button
            className="btn btn-primary flex items-center"
            onClick={handleCreateProduct}
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            Create
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mt-6">
        <TableComponent
          columns={columns}
          data={filteredProduct}
          selectedRows={selectedRows}
          onRowSelect={handleCheckboxChange}
          onSelectAll={handleSelectAll}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
        />
      </div>

      {isFilterVisible && <FilterAllP isVisible={isFilterVisible} />}
      {isDeletePopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Delete Confirmation
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Are you sure you want to delete{" "}
              <strong className="text-black dark:text-white">
                {productToDelete?.name}
              </strong>
              ?
            </p>
            <div className="flex justify-end mt-6 space-x-2">
              <button
                className="btn btn-outline btn-secondary dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="btn btn-outline btn-error dark:text-red-400 dark:border-red-600 dark:hover:bg-red-700"
                onClick={confirmDeleteProduct}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </TitleCard>
  );
}

export default AllProducts;