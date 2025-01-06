import React from "react";

function PageControl({ totalItems, rowsPerPage, currentPage, onPageChange, onRowsPerPageChange }) {
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  return (
    <div className="flex flex-wrap justify-between items-center mt-4 gap-4">
      <div>
      <div className="w-full sm:w-auto"> 
        <label className="flex items-center gap-2 text-[10px] sm:text-[14px]">
          Rows per page:
          <select value={rowsPerPage} onChange={onRowsPerPageChange} className="select select-bordered select-sm w-20 text-[10px] sm:text-[14px]">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>
      </div>
      <div>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="btn btn-outline btn-sm text-[10px] sm:text-[14px]">
            {"<"}
        </button>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="btn btn-outline btn-sm text-[10px] sm:text-[14px]">
          {">"}
        </button>
      </div>
    </div>
  );
}

export default PageControl;
