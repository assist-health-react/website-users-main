import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import ViewAssessmentReport from "./ViewAssessmentReport.jsx"
import { getAssessments } from '../../services/assessmentService'

const AssessmentReport = () => {
  const [selectedReport, setSelectedReport] = useState(null)
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAssessments()
  }, [])

  const fetchAssessments = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAssessments()
      setReports(data)
    } catch (err) {
      console.error('Error fetching assessments:', err)
      setError(err.message || 'Failed to fetch assessments')
      toast.error(err.message || 'Failed to fetch assessments')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      ) : error ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={fetchAssessments}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Retry
            </button>
          </div>
        </div>
      ) : reports.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-lg">No assessment reports available</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="bg-white rounded-xl shadow-sm">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Assessment Reports</h2>
                <p className="text-gray-600 mt-1">View your assessment reports</p>
              </div>
            </div>

            {/* Reports list */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{report.patientName}</h3>
                        <p className="text-gray-600 text-sm mt-1">ID: {report.id}</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <span>Date: {report.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>Doctor: {report.doctor}</span>
                      </div>
                      <div className="text-sm text-gray-600 line-clamp-2">
                        {report.diagnosis}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedReport && (
        <ViewAssessmentReport
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  )
}

export default AssessmentReport 