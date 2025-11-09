import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex border-b border-[#38B6FF]/10">
        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'prescriptions'
              ? 'text-[#38B6FF] border-b-2 border-[#38B6FF] bg-[#38B6FF]/5'
              : 'text-gray-500 hover:text-[#38B6FF] hover:bg-[#38B6FF]/5'
          }`}
        >
          Prescriptions
        </button>
        <button
          onClick={() => setActiveTab('files')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'files'
              ? 'text-[#38B6FF] border-b-2 border-[#38B6FF] bg-[#38B6FF]/5'
              : 'text-gray-500 hover:text-[#38B6FF] hover:bg-[#38B6FF]/5'
          }`}
        >
          Files
        </button>
        <button
          onClick={() => setActiveTab('images')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'images'
              ? 'text-[#38B6FF] border-b-2 border-[#38B6FF] bg-[#38B6FF]/5'
              : 'text-gray-500 hover:text-[#38B6FF] hover:bg-[#38B6FF]/5'
          }`}
        >
          Images
        </button>
      </div>
    </div>
  );
};

export default Tabs; 