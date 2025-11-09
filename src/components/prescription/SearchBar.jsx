import React from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';

const SearchBar = ({ activeTab, searchQuery, setSearchQuery, handleAdd }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-initial">
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF]"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      {activeTab !== 'prescriptions' && (
        <button
          onClick={() => handleAdd(activeTab)}
          className="flex items-center gap-2 px-4 py-2 bg-[#38B6FF] text-white rounded-lg hover:bg-[#2090d1] transition-colors"
        >
          <FaPlus className="w-4 h-4" />
          Add {activeTab === 'files' ? 'File' : 'Image'}
        </button>
      )}
    </div>
  );
};

export default SearchBar; 