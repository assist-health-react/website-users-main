import React from 'react';
import { FaFileDownload, FaFile, FaImage } from 'react-icons/fa';

const ContentTable = ({ activeTab, filteredData, handleDownload }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto flex-grow">
        <div className="inline-block min-w-full">
          <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#38B6FF]/20 scrollbar-track-transparent relative">
            <table className="min-w-full divide-y divide-[#38B6FF]/10">
              <thead className="bg-white sticky top-0 shadow-sm">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#38B6FF] bg-[#38B6FF]/5 backdrop-blur-xl">Sl.No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#38B6FF] bg-[#38B6FF]/5 backdrop-blur-xl">Name</th>
                  {activeTab === 'prescriptions' && (
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#38B6FF] bg-[#38B6FF]/5 backdrop-blur-xl">Doctor</th>
                  )}
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#38B6FF] bg-[#38B6FF]/5 backdrop-blur-xl">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#38B6FF] bg-[#38B6FF]/5 backdrop-blur-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#38B6FF]/10 bg-white">
                {filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#38B6FF]/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">{item.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.name}</td>
                    {activeTab === 'prescriptions' && (
                      <td className="px-6 py-4 text-sm text-gray-700">{item.doctorName}</td>
                    )}
                    <td className="px-6 py-4 text-sm text-gray-700">{item.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleDownload(item.fileUrl, item.id)}
                        className="text-[#38B6FF] hover:text-[#2090d1] transition-colors group relative"
                      >
                        {activeTab === 'prescriptions' ? (
                          <FaFileDownload className="w-5 h-5" />
                        ) : activeTab === 'files' ? (
                          <FaFile className="w-5 h-5" />
                        ) : (
                          <FaImage className="w-5 h-5" />
                        )}
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Download {activeTab === 'prescriptions' ? 'PDF' : activeTab === 'files' ? 'File' : 'Image'}
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTable; 