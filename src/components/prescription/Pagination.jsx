import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ page, totalPages, loading, handlePageChange }) => {
  return (
    <div className="border-t border-[#38B6FF]/10 p-4 bg-white/80 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1 || loading}
          className="px-4 py-2 text-sm font-medium text-[#38B6FF] bg-[#38B6FF]/5 rounded-lg hover:bg-[#38B6FF]/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <FaChevronLeft className="w-3 h-3" />
          Previous
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>
        </div>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages || loading}
          className="px-4 py-2 text-sm font-medium text-[#38B6FF] bg-[#38B6FF]/5 rounded-lg hover:bg-[#38B6FF]/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Next
          <FaChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default Pagination; 