import { useState } from 'react';
import { 
  FaTimes, 
  FaPlus, 
  FaTrash, 
  FaNotesMedical, 
  FaPills, 
  FaAllergies,
  FaSyringe,
  FaHospital,
  FaDna,
  FaFlask,
  FaChartLine,
  FaUserMd,
  FaPrescriptionBottleAlt,
  FaComments,
  FaUserCircle
} from 'react-icons/fa';

// Define consistent styles
const sectionStyles = {
  wrapper: "bg-white rounded-lg border shadow-sm mb-6",
  header: "p-4 border-b bg-gray-50 flex justify-between items-center",
  headerTitle: "flex items-center space-x-2",
  icon: "text-[#38B6FF] text-xl",
  title: "text-lg font-medium text-gray-900",
  addButton: "inline-flex items-center px-3 py-1.5 border border-[#38B6FF] text-[#38B6FF] rounded-md hover:bg-[#38B6FF]/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38B6FF] transition-colors",
  content: "p-4 space-y-4",
  inputWrapper: "flex flex-col",
  label: "text-sm font-medium text-gray-700 mb-1",
  input: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#38B6FF] focus:border-[#38B6FF] transition-colors",
  select: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#38B6FF] focus:border-[#38B6FF] transition-colors",
  textarea: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#38B6FF] focus:border-[#38B6FF] resize-none transition-colors",
  deleteButton: "absolute -top-2 -right-2 bg-red-100 rounded-full p-1.5 text-red-500 hover:bg-red-200 hover:text-red-600 transition-colors",
  itemWrapper: "bg-white border rounded-lg p-4 relative hover:shadow-md transition-shadow",
};

const AddMedicalHistory = ({ member, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    primaryCarePhysician: {
      name: '',
      contactNumber: ''
    },
    treatingDoctors: [{
      name: '',
      hospital: '',
      speciality: ''
    }],
    followUps: [{
      date: '',
      specialistDetails: '',
      remarks: ''
    }],
    previousConditions: [{
      condition: '',
      diagnosisDate: '',
      treatmentReceived: ''
    }],
    surgeries: [{
      procedure: '',
      date: '',
      surgeon: ''
    }],
    allergies: [{
      type: '',
      description: ''
    }],
    currentMedications: [{
      name: '',
      dosage: '',
      frequency: ''
    }],
    familyHistory: [{
      condition: '',
      relationship: ''
    }],
    immunizationHistory: [{
      vaccination: '',
      dateReceived: ''
    }],
    medicalTestResults: [{
      name: '',
      date: '',
      results: ''
    }],
    currentSymptoms: [{
      symptom: '',
      concerns: ''
    }],
    lifestyleHabits: {
      smoking: 'no',
      alcoholConsumption: 'no',
      exercise: 'no'
    },
    healthInsurance: {
      provider: '',
      policyNumber: ''
    }
  });

  const handleInputChange = (section, field, value, index = null) => {
    setFormData(prev => {
      if (index !== null) {
        const newSection = [...prev[section]];
        newSection[index] = { ...newSection[index], [field]: value };
        return { ...prev, [section]: newSection };
      }
      return { ...prev, [section]: { ...prev[section], [field]: value } };
    });
  };

  const handleAddItem = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], getEmptyItem(section)]
    }));
  };

  const handleRemoveItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const getEmptyItem = (section) => {
    switch (section) {
      case 'medications':
        return { name: '', dosage: '', frequency: '' };
      case 'allergies':
        return { type: '', severity: '', reaction: '' };
      case 'vaccinations':
        return { name: '', date: '', nextDue: '' };
      case 'surgeries':
        return { procedure: '', date: '', hospital: '', notes: '' };
      case 'familyHistory':
        return { condition: '', relation: '', notes: '' };
      case 'labResults':
        return { testName: '', date: '', result: '', normalRange: '', notes: '' };
      case 'vitalSigns':
        return { date: '', bloodPressure: '', heartRate: '', temperature: '', respiratoryRate: '' };
      case 'treatments':
        return { type: '', provider: '', startDate: '', endDate: '', notes: '' };
      case 'hospitalizations':
        return { reason: '', hospital: '', admissionDate: '', dischargeDate: '', notes: '' };
      case 'immunizations':
        return { vaccine: '', provider: '', date: '', nextDue: '', notes: '' };
      case 'prescriptions':
        return { medication: '', dosage: '', frequency: '', startDate: '', endDate: '', prescribedBy: '' };
      case 'observations':
        return { date: '', recordedBy: '', note: '' };
      default:
        return {};
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000]">
      <div className="absolute inset-0 overflow-y-auto">
        <div className="min-h-screen py-6">
          <div className="bg-white w-full max-w-7xl mx-auto relative rounded-lg shadow-xl">
            {/* Header - Fixed at top */}
            <div className="sticky top-0 z-20 bg-white px-6 py-4 border-b flex justify-between items-center rounded-t-lg">
              <h2 className="text-2xl font-semibold text-gray-800">Medical History</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#38B6FF]/5 rounded-full transition-colors"
              >
                <FaTimes className="text-gray-500 w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="px-6 py-4 overflow-y-auto max-h-[calc(100vh-8rem)]">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Member Details Card */}
                <div className="bg-white rounded-lg border shadow-sm p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="col-span-full lg:col-span-1 flex justify-center lg:justify-start">
                      <div className="relative w-32 h-32">
                        {member?.profilePhoto ? (
                          <img
                            src={member.profilePhoto}
                            alt={member.fullName}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                            <FaUserCircle className="w-20 h-20 text-[#38B6FF]" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-span-full lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DetailField label="Full Name" value={member?.fullName} />
                      <DetailField label="Member ID" value={member?.id} />
                      <DetailField label="Gender" value={member?.gender} />
                      <DetailField label="Age" value={member?.age} />
                      <DetailField label="Contact" value={member?.mobile} />
                      <DetailField label="Email" value={member?.email} />
                    </div>
                  </div>
                </div>

                {/* Medical History Sections */}
                <div className="space-y-6">
                  {/* Each section uses consistent styling */}
                  {Object.entries(formData).map(([section, data]) => (
                    <Section
                      key={section}
                      title={formatSectionTitle(section)}
                      onAdd={() => handleAddItem(section)}
                      showAddButton={Array.isArray(data)}
                    >
                      <SectionContent
                        section={section}
                        data={data}
                        handleInputChange={handleInputChange}
                        handleRemoveItem={handleRemoveItem}
                      />
                    </Section>
                  ))}
                </div>
              </form>
            </div>

            {/* Footer - Fixed at bottom */}
            <div className="sticky bottom-0 z-20 bg-white px-6 py-4 border-t flex justify-end space-x-4 rounded-b-lg">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#38B6FF] text-white rounded-md hover:bg-[#2090d1] focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:ring-offset-2 transition-colors"
              >
                Save Medical History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components for better organization
const Section = ({ title, children, onAdd, showAddButton }) => (
  <div className="bg-white rounded-lg border shadow-sm">
    <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
      <h3 className="text-lg font-medium text-gray-800">{title}</h3>
      {showAddButton && (
        <button
          type="button"
          onClick={onAdd}
          className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <FaPlus className="w-4 h-4" /> Add
        </button>
      )}
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const DetailField = ({ label, value }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-1 p-2 bg-gray-50 rounded-md text-gray-900">{value || '-'}</div>
  </div>
);

const SectionContent = ({ section, data, handleInputChange, handleRemoveItem }) => {
  // Render different content based on section type
  if (Array.isArray(data)) {
    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <ArrayFieldItem
            key={index}
            section={section}
            item={item}
            index={index}
            handleInputChange={handleInputChange}
            handleRemoveItem={handleRemoveItem}
          />
        ))}
      </div>
    );
  }

  // Handle object type sections (like lifestyleHabits)
  if (typeof data === 'object') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <ObjectField
            key={key}
            section={section}
            field={key}
            value={value}
            handleInputChange={handleInputChange}
          />
        ))}
      </div>
    );
  }

  return null;
};

// Add these helper functions at the end of your component
const formatSectionTitle = (section) => {
  return section
    .split(/(?=[A-Z])/)
    .join(' ')
    .replace(/^\w/, (c) => c.toUpperCase());
};

const ArrayFieldItem = ({ section, item, index, handleInputChange, handleRemoveItem }) => {
  const fields = Object.keys(item);
  
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
      {fields.map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {formatSectionTitle(field)}
          </label>
          <input
            type={getInputType(field)}
            value={item[field]}
            onChange={(e) => handleInputChange(section, field, e.target.value, index)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      ))}
      {index > 0 && (
        <button
          type="button"
          onClick={() => handleRemoveItem(section, index)}
          className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
        >
          <FaTimes className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

const ObjectField = ({ section, field, value, handleInputChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {formatSectionTitle(field)}
    </label>
    {typeof value === 'boolean' ? (
      <select
        value={value.toString()}
        onChange={(e) => handleInputChange(section, field, e.target.value === 'true')}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(section, field, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
    )}
  </div>
);

const getInputType = (field) => {
  if (field.toLowerCase().includes('date')) return 'date';
  return 'text';
};

export default AddMedicalHistory; 