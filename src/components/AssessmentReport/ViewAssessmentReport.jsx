import React from 'react'
import { FaTimes, FaDownload } from 'react-icons/fa'

const ViewAssessmentReport = ({ report, onClose }) => {
  if (!report) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000]">
      <div className="absolute inset-0 overflow-y-auto">
        <div className="min-h-screen py-6">
          <div className="bg-white w-full max-w-4xl mx-auto relative rounded-lg shadow-xl">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-white px-6 py-4 border-b flex justify-between items-center rounded-t-lg">
              <h2 className="text-2xl font-semibold text-gray-800">Assessment Report Details</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="text-gray-500 w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white rounded-lg border shadow-sm p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailField label="Report ID" value={report.id} />
                    <DetailField label="Date" value={report.date} />
                    <DetailField label="Patient Name" value={report.patientName} />
                    <DetailField label="Doctor" value={report.doctor} />
                  </div>
                </div>

                {/* Assessment Details */}
                <div className="bg-white rounded-lg border shadow-sm p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Assessment Details</h3>
                  <div className="space-y-4">
                    <DetailField label="Chief Complaint" value={report.chiefComplaint} />
                    <DetailField label="Diagnosis" value={report.diagnosis} />
                    <DetailField label="Treatment Plan" value={report.treatmentPlan} />
                    <DetailField label="Recommendations" value={report.recommendations} />
                  </div>
                </div>

                {/* Vital Signs */}
                <div className="bg-white rounded-lg border shadow-sm p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Vital Signs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DetailField label="Blood Pressure" value={report.vitalSigns?.bloodPressure} />
                    <DetailField label="Heart Rate" value={report.vitalSigns?.heartRate} />
                    <DetailField label="Temperature" value={report.vitalSigns?.temperature} />
                    <DetailField label="Respiratory Rate" value={report.vitalSigns?.respiratoryRate} />
                    <DetailField label="Oxygen Saturation" value={report.vitalSigns?.oxygenSaturation} />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 z-20 bg-white px-6 py-4 border-t flex justify-end space-x-4 rounded-b-lg">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
              >
                <FaDownload className="w-4 h-4" />
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const DetailField = ({ label, value }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-1 p-2 bg-gray-50 rounded-md text-gray-900">{value || '-'}</div>
  </div>
)

export default ViewAssessmentReport 