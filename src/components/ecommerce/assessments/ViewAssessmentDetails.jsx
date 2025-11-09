import { IoMdClose } from 'react-icons/io';

const ViewAssessmentDetails = ({ isOpen, onClose, assessment }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Assessment Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>
        
        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Student Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Student ID</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.studentId}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Name</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.studentName}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Mobile</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.mobile}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Gender</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.gender}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Grade</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.grade}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Parent Name</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.parentName}</div>
              </div>
            </div>
          </div>

          {/* Physical Measurements */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Physical Measurements</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Height</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.height} cm</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Weight</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.weight} kg</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">BMI</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.bmi}</div>
              </div>
            </div>
          </div>

          {/* Vital Signs */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Vital Signs</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Temperature</label>
                <div className="mt-1 text-sm text-gray-900">{((assessment.temperature - 32) * 5/9).toFixed(1)}°C</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Pulse Rate</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.pulseRate} bpm</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">SpO2</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.spO2}%</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Blood Pressure</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.bp} mmHg</div>
              </div>
            </div>
          </div>

          {/* Oral Health */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Oral Health</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Status</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.oralHealth}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Dental Issues</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.dentalIssues}</div>
              </div>
            </div>
          </div>

          {/* Vision Assessment */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Vision Assessment</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Short Range (Right)</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.shortRangeRight}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Short Range (Left)</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.shortRangeLeft}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Long Range (Right)</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.longRangeRight}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Long Range (Left)</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.longRangeLeft}</div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Hearing Comments</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.hearingComments}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Additional Comments</label>
                <div className="mt-1 text-sm text-gray-900">{assessment.additionalComments}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAssessmentDetails; 