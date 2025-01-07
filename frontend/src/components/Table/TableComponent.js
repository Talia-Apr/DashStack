import React from "react";

function TableComponent({
  columns,
  data,
  selectedRows,
  onRowSelect,
  onSelectAll,
  onActionClick,
  rowsPerPage,
  currentPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
}) {
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse bg-white dark:bg-gray-800 text-black dark:text-white">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className={`p-3 ${col.className || ""}`}>
                {col.renderHeader ? col.renderHeader() : col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {columns.map((col, index) => (
                <td key={index} className={`p-3 ${col.className || ""}`}>
                  {col.render ? col.render(item) : item[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Rows per page:{" "}
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(parseInt(e.target.value))}
            className="select select-bordered w-16 text-black dark:text-white bg-white dark:bg-gray-700"
          >
            {[10, 20, 30].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {startItem}-{endItem} of {totalItems}
          </span>
          <button
            className="btn btn-sm btn-outline mx-2 text-black dark:text-white"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          <button
            className="btn btn-sm btn-outline text-black dark:text-white"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= Math.ceil(totalItems / rowsPerPage)}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableComponent;
