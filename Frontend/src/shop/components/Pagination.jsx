import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center mt-8 gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="border rounded px-3 py-1 text-sm disabled:opacity-50"
      >
        &lt;
      </button>
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx}
          onClick={() => onPageChange(idx + 1)}
          className={`border rounded px-3 py-1 text-sm ${currentPage === idx + 1 ? "bg-red-500 text-white" : ""}`}
        >
          {idx + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="border rounded px-3 py-1 text-sm disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination;
