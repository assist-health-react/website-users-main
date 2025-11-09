import React from 'react';
import { format } from "date-fns";
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa'

const AppointmentDetailsModal = ({ appointment, onClose }) => {
  const formatDateTime = (dateTime) => {
    try {
      return format(new Date(dateTime), 'PPpp');
    } catch (err) {
      return 'Invalid Date';
    }
  };

  // Sample notes data (you would typically get this from your appointment data)
  const doctorNotes = [
    { id: 1, date: '2024-03-15', note: 'Initial consultation completed. Patient reported mild symptoms.' },
    { id: 2, date: '2024-03-20', note: 'Follow-up check. Symptoms improving with prescribed medication.' }
  ]

  const navigatorNotes = [
    { id: 1, date: '2024-03-14', note: 'Scheduled initial appointment. Patient requires translation assistance.' },
    { id: 2, date: '2024-03-16', note: 'Coordinated with family members for follow-up appointment.' }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Basic Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p><span className="font-medium">Date & Time:</span> {formatDateTime(appointment.appointmentDateTime)}</p>
                  <p><span className="font-medium">Type:</span> {appointment.appointmentType}</p>
                  <p><span className="font-medium">Status:</span> <span className={`px-2 py-1 rounded-full text-sm font-semibold
                    ${appointment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                      appointment.status === 'ongoing' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {appointment.status}
                  </span></p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Healthcare Providers</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p><span className="font-medium">Doctor:</span> {appointment.doctorId?.name || 'Not assigned'}</p>
                  <p><span className="font-medium">Navigator:</span> {appointment.navigatorId?.name || 'Not assigned'}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Additional Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p><span className="font-medium">Notes:</span> {appointment.notes || 'No notes available'}</p>
                  <p><span className="font-medium">Additional Info:</span> {appointment.additionalInfo || 'No additional information'}</p>
                </div>
              </div>
            </div>

            {appointment.prescription && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Prescription Details</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div>
                    <p className="font-medium text-gray-700">Chief Complaints</p>
                    <p className="text-gray-600">{appointment.prescription.chiefComplaints || 'None specified'}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Allergies</p>
                    <p className="text-gray-600">{appointment.prescription.allergies || 'None specified'}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">History</p>
                    <p className="text-gray-600">{appointment.prescription.history || 'None specified'}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Diagnosis</p>
                    <p className="text-gray-600">{appointment.prescription.diagnosis || 'None specified'}</p>
                  </div>

                  {appointment.prescription.medicines && appointment.prescription.medicines.length > 0 && (
                    <div>
                      <p className="font-medium text-gray-700 mb-2">Medicines</p>
                      <div className="space-y-2">
                        {appointment.prescription.medicines.map((medicine, index) => (
                          <div key={index} className="bg-white rounded p-3 border border-gray-200">
                            <p className="font-medium">{medicine.name}</p>
                            <p className="text-sm text-gray-600">Dosage: {medicine.dosage}</p>
                            <p className="text-sm text-gray-600">Frequency: {medicine.frequency}</p>
                            <p className="text-sm text-gray-600">Duration: {medicine.duration}</p>
                            {medicine.investigations && (
                              <p className="text-sm text-gray-600">Investigations: {medicine.investigations}</p>
                            )}
                            {medicine.treatmentPlan && (
                              <p className="text-sm text-gray-600">Treatment Plan: {medicine.treatmentPlan}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {appointment.prescription.additionalInstructions && (
                    <div>
                      <p className="font-medium text-gray-700">Additional Instructions</p>
                      <p className="text-gray-600">{appointment.prescription.additionalInstructions}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentDetailsModal 