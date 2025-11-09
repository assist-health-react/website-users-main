import React, { useState } from 'react';
import {
  FaUser, FaUserMd, FaMedkit, FaUsers, FaPills, FaCalendar,
  FaHeartbeat, FaSyringe, FaVial, FaExclamationTriangle,
  FaNotesMedical, FaShieldAlt, FaBuilding, FaIdCard, FaUtensils,
  FaDownload, FaTimes, FaEdit, FaTrash, FaPhone,
  FaEnvelope, FaRulerVertical, FaWeight, FaUserCircle,
  FaVenusMars, FaTint, FaPrescription, FaClock,
  FaClipboard, FaInfoCircle, FaComment, FaStethoscope,
  FaHospital, FaFile, FaFilePdf, FaFileImage, FaFileAlt
} from 'react-icons/fa';
import html2pdf from "html2pdf.js";
import { medicalHistoryService } from "@/services/medicalHistoryService";
import AddMedicalHistory from "./AddMedicalHistory";
import { toast } from 'react-hot-toast';
import { format } from "date-fns";

const ViewMedicalHistory = ({ history, onClose }) => {
  const [selectedSections, setSelectedSections] = useState({
    treatingDoctors: true,
    followUps: true,
    previousConditions: true,
    surgeries: true,
    allergies: true,
    currentMedications: true,
    familyHistory: true,
    immunizationHistory: true,
    medicalTestResults: true,
    currentSymptoms: true,
    lifestyleHabits: true,
    healthInsurance: true
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = async (updatedData) => {
    try {
      await medicalHistoryService.updateMedicalHistory(history._id, updatedData);
      toast.success('Medical history updated successfully');
      onClose();
    } catch (err) {
      toast.error('Failed to update medical history');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const handleSectionToggle = (section) => {
    setSelectedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const SectionHeader = ({ title, icon: Icon, section, bgColor = 'bg-blue-50', textColor = 'text-blue-700', borderColor = 'border-blue-200' }) => (
    <div
      className={`flex items-center justify-between ${bgColor} ${textColor} p-3 md:p-4 rounded-lg border ${borderColor} cursor-pointer`}
      onClick={() => handleSectionToggle(section)}
    >
      <div className="flex items-center space-x-2">
        <Icon className="text-lg md:text-xl" />
        <h3 className="font-semibold text-sm md:text-base">{title}</h3>
      </div>
      <div className={`transform transition-transform ${selectedSections[section] ? 'rotate-180' : ''}`}>
        ▼
      </div>
    </div>
  );

  const DetailRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-start space-x-2 text-gray-700 py-1.5 md:py-2">
      <Icon className="text-blue-500 mt-1 text-sm md:text-base" />
      <div>
        <span className="font-medium text-sm md:text-base">{label}:</span>
        <span className="ml-2 text-sm md:text-base break-words">{value || 'Not specified'}</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl m-4 p-4 md:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 break-words">
            Medical History - {formatDate(history.createdAt)}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 ml-2"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="space-y-3 md:space-y-4">
          {/* Lifestyle Habits */}
          {selectedSections.lifestyleHabits && (
            <div className="space-y-4">
              <SectionHeader
                title="Lifestyle Habits"
                icon={FaUser}
                section="lifestyleHabits"
              />
              <div className="p-4 space-y-2">
                <DetailRow
                  icon={FaUser}
                  label="Smoking"
                  value={history.lifestyleHabits.smoking}
                />
                <DetailRow
                  icon={FaUser}
                  label="Alcohol Consumption"
                  value={history.lifestyleHabits.alcoholConsumption}
                />
                <DetailRow
                  icon={FaUser}
                  label="Exercise"
                  value={history.lifestyleHabits.exercise}
                />
              </div>
            </div>
          )}

          {/* Treating Doctors */}
          {selectedSections.treatingDoctors && history.treatingDoctors.length > 0 && (
            <div className="space-y-4">
              <SectionHeader
                title="Treating Doctors"
                icon={FaUserMd}
                section="treatingDoctors"
              />
              <div className="p-4 space-y-4">
                {history.treatingDoctors.map((doctor, index) => (
                  <div key={doctor._id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <DetailRow
                      icon={FaUserMd}
                      label="Doctor Name"
                      value={doctor.name}
                    />
                    <DetailRow
                      icon={FaHospital}
                      label="Hospital"
                      value={doctor.hospitalName}
                    />
                    <DetailRow
                      icon={FaStethoscope}
                      label="Speciality"
                      value={doctor.speciality}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Follow Ups */}
          {selectedSections.followUps && history.followUps.length > 0 && (
            <div className="space-y-4">
              <SectionHeader
                title="Follow Ups"
                icon={FaCalendar}
                section="followUps"
              />
              <div className="p-4 space-y-4">
                {history.followUps.map((followUp, index) => (
                  <div key={followUp._id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <DetailRow
                      icon={FaCalendar}
                      label="Date"
                      value={formatDate(followUp.date)}
                    />
                    <DetailRow
                      icon={FaUserMd}
                      label="Specialist Details"
                      value={followUp.specialistDetails}
                    />
                    <DetailRow
                      icon={FaComment}
                      label="Remarks"
                      value={followUp.remarks}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Medications */}
          {selectedSections.currentMedications && history.currentMedications.length > 0 && (
            <div className="space-y-4">
              <SectionHeader
                title="Current Medications"
                icon={FaPills}
                section="currentMedications"
              />
              <div className="p-4 space-y-4">
                {history.currentMedications.map((medication, index) => (
                  <div key={medication._id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <DetailRow
                      icon={FaPills}
                      label="Medication"
                      value={medication.name}
                    />
                    <DetailRow
                      icon={FaPrescription}
                      label="Dosage"
                      value={medication.dosage}
                    />
                    <DetailRow
                      icon={FaClock}
                      label="Frequency"
                      value={medication.frequency}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Allergies */}
          {selectedSections.allergies && history.allergies.length > 0 && (
            <div className="space-y-4">
              <SectionHeader
                title="Allergies"
                icon={FaExclamationTriangle}
                section="allergies"
              />
              <div className="p-4 space-y-4">
                {history.allergies.map((allergy, index) => (
                  <div key={allergy._id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <DetailRow
                      icon={FaPills}
                      label="Medications"
                      value={allergy.medications}
                    />
                    <DetailRow
                      icon={FaUtensils}
                      label="Food"
                      value={allergy.food}
                    />
                    <DetailRow
                      icon={FaExclamationTriangle}
                      label="Other"
                      value={allergy.other}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Previous Medical Conditions */}
          {selectedSections.previousConditions && history.previousMedicalConditions.length > 0 && (
            <div className="space-y-4">
              <SectionHeader
                title="Previous Medical Conditions"
                icon={FaHeartbeat}
                section="previousConditions"
              />
              <div className="p-4 space-y-4">
                {history.previousMedicalConditions.map((condition, index) => (
                  <div key={condition._id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <DetailRow
                      icon={FaHeartbeat}
                      label="Condition"
                      value={condition.condition}
                    />
                    <DetailRow
                      icon={FaCalendar}
                      label="Diagnosed At"
                      value={formatDate(condition.diagnosedAt)}
                    />
                    <DetailRow
                      icon={FaMedkit}
                      label="Treatment"
                      value={condition.treatmentReceived}
                    />
                    <DetailRow
                      icon={FaClipboard}
                      label="Notes"
                      value={condition.notes}
                    />
                    <DetailRow
                      icon={FaInfoCircle}
                      label="Status"
                      value={condition.status}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Surgeries */}
          {selectedSections.surgeries && history.surgeries.length > 0 && (
            <div className="space-y-4">
              <SectionHeader
                title="Surgeries"
                icon={FaMedkit}
                section="surgeries"
              />
              <div className="p-4 space-y-4">
                {history.surgeries.map((surgery, index) => (
                  <div key={surgery._id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <DetailRow
                      icon={FaMedkit}
                      label="Procedure"
                      value={surgery.procedure}
                    />
                    <DetailRow
                      icon={FaCalendar}
                      label="Date"
                      value={formatDate(surgery.date)}
                    />
                    <DetailRow
                      icon={FaUserMd}
                      label="Surgeon"
                      value={surgery.surgeonName}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Family History */}
          {selectedSections.familyHistory && history.familyHistory.length > 0 && (
            <div className="space-y-4">
              <SectionHeader
                title="Family History"
                icon={FaUsers}
                section="familyHistory"
              />
              <div className="p-4 space-y-4">
                {history.familyHistory.map((item, index) => (
                  <div key={item._id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <DetailRow
                      icon={FaUsers}
                      label="Relationship"
                      value={item.relationship}
                    />
                    <DetailRow
                      icon={FaHeartbeat}
                      label="Condition"
                      value={item.condition}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Immunizations */}
          {selectedSections.immunizationHistory && history.immunizations.length > 0 && (
            <div className="space-y-4">
              <SectionHeader
                title="Immunizations"
                icon={FaSyringe}
                section="immunizationHistory"
              />
              <div className="p-4 space-y-4">
                {history.immunizations.map((immunization, index) => (
                  <div key={immunization._id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <DetailRow
                      icon={FaSyringe}
                      label="Vaccine"
                      value={immunization.vaccine}
                    />
                    <DetailRow
                      icon={FaCalendar}
                      label="Date"
                      value={formatDate(immunization.date)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medical Test Results */}
          {selectedSections.medicalTestResults && history.medicalTestResults.length > 0 && (
            <div className="space-y-4">
              <SectionHeader
                title="Medical Test Results"
                icon={FaVial}
                section="medicalTestResults"
              />
              <div className="p-4 space-y-4">
                {history.medicalTestResults.map((test, index) => (
                  <div key={test._id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <DetailRow
                      icon={FaVial}
                      label="Test Name"
                      value={test.name}
                    />
                    <DetailRow
                      icon={FaCalendar}
                      label="Date"
                      value={formatDate(test.date)}
                    />
                    <DetailRow
                      icon={FaClipboard}
                      label="Results"
                      value={test.results}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Symptoms */}
          {selectedSections.currentSymptoms && history.currentSymptoms.length > 0 && (
            <div className="space-y-4">
              <SectionHeader
                title="Current Symptoms"
                icon={FaNotesMedical}
                section="currentSymptoms"
              />
              <div className="p-4 space-y-4">
                {history.currentSymptoms.map((symptom, index) => (
                  <div key={symptom._id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <DetailRow
                      icon={FaNotesMedical}
                      label="Symptom"
                      value={symptom.symptom}
                    />
                    <DetailRow
                      icon={FaComment}
                      label="Concerns"
                      value={symptom.concerns}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Health Insurance */}
          {selectedSections.healthInsurance && history.healthInsurance.length > 0 && (
            <div className="space-y-4">
              <SectionHeader
                title="Health Insurance"
                icon={FaShieldAlt}
                section="healthInsurance"
              />
              <div className="p-4 space-y-4">
                {history.healthInsurance.map((insurance, index) => (
                  <div key={insurance._id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <DetailRow
                      icon={FaBuilding}
                      label="Provider"
                      value={insurance.provider}
                    />
                    <DetailRow
                      icon={FaIdCard}
                      label="Policy Number"
                      value={insurance.policyNumber}
                    />
                    <DetailRow
                      icon={FaCalendar}
                      label="Expiry Date"
                      value={formatDate(insurance.expiryDate)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-3 md:px-4 py-1.5 md:py-2 text-gray-600 hover:text-gray-800 text-sm md:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewMedicalHistory;