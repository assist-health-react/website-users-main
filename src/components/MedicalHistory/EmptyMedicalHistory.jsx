import React from 'react'

const EmptyMedicalHistory = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Medical History</h2>
          <p className="text-gray-600">
            No medical history records found. Your medical history will appear here once available.
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmptyMedicalHistory 