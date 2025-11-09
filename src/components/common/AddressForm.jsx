import { useState, useEffect } from 'react';
import Select from 'react-select';
import { FaTimes } from 'react-icons/fa';
import { FaHome, FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';

const AddressForm = ({ onClose, onSave, existingAddress = null }) => {
  const [formData, setFormData] = useState({
    type: 'home',
    otherType: '',
    address: {
      street: '',
      pincode: '',
      region: '',
      state: '',
      country: 'India',
      landmark: ''
    }
  });

  useEffect(() => {
    if (existingAddress) {
      setFormData({
        type: existingAddress.type || 'home',
        otherType: existingAddress.type !== 'home' && existingAddress.type !== 'work' ? existingAddress.type : '',
        address: {
          street: existingAddress.details.street || '',
          pincode: existingAddress.details.pincode || '',
          region: existingAddress.details.city || '',
          state: existingAddress.details.state || '',
          country: existingAddress.details.country || 'India',
          landmark: existingAddress.details.landmark || ''
        }
      });

      // If pincode exists, fetch regions
      if (existingAddress.details.pincode) {
        handlePincodeChange({ target: { value: existingAddress.details.pincode } });
      }
    }
  }, [existingAddress]);

  const [regionOptions, setRegionOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const addressTypes = [
    { value: 'home', label: 'Home' },
    { value: 'work', label: 'Work' },
    { value: 'other', label: 'Other' }
  ];

  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handlePincodeChange = async (e) => {
    const pincode = e.target.value;
    handleAddressChange('pincode', pincode);
    
    if (pincode.length === 6) {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();
        
        if (data[0].Status === 'Success') {
          const postOffices = data[0].PostOffice;
          // Set region options from post offices
          const regions = postOffices.map(po => ({
            value: po.Name,
            label: po.Name
          }));
          setRegionOptions(regions);
          
          // Set state from first post office
          handleAddressChange('state', postOffices[0].State);
          handleAddressChange('country', 'India');

          // If editing and region exists, don't override it
          if (!formData.address.region && regions.length > 0) {
            handleAddressChange('region', regions[0].value);
          }
        } else {
          setError('Invalid PIN Code');
          setRegionOptions([]);
          handleAddressChange('state', '');
        }
      } catch (error) {
        setError('Failed to fetch address details');
        setRegionOptions([]);
      }
      setIsLoading(false);
    } else {
      setRegionOptions([]);
      handleAddressChange('state', '');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: existingAddress?.id || Date.now(),
      type: formData.type === 'other' ? formData.otherType : formData.type,
      title: formData.type === 'other' ? formData.otherType : 
             formData.type.charAt(0).toUpperCase() + formData.type.slice(1),
      icon: formData.type === 'home' ? <FaHome className="w-5 h-5" /> : 
            formData.type === 'work' ? <FaBriefcase className="w-5 h-5" /> : 
            <FaMapMarkerAlt className="w-5 h-5" />,
      address: `${formData.address.street}${formData.address.landmark ? `, ${formData.address.landmark}` : ''}, ${formData.address.region}, ${formData.address.state}, ${formData.address.pincode}`,
      details: {
        street: formData.address.street,
        pincode: formData.address.pincode,
        city: formData.address.region,
        state: formData.address.state,
        landmark: formData.address.landmark,
        country: formData.address.country
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            {existingAddress ? 'Edit Address' : 'Add New Address'}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Address Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Type *
            </label>
            <div className="space-y-3">
              <Select
                value={addressTypes.find(type => type.value === formData.type)}
                onChange={(selected) => setFormData(prev => ({ ...prev, type: selected.value }))}
                options={addressTypes}
                className="react-select-container"
                classNamePrefix="react-select"
              />
              {formData.type === 'other' && (
                <input
                  type="text"
                  value={formData.otherType}
                  onChange={(e) => setFormData(prev => ({ ...prev, otherType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter address type"
                  required
                />
              )}
            </div>
          </div>

          {/* Address Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address *
                </label>
                <textarea
                  value={formData.address.street}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  required
                  placeholder="Enter your street address"
                />
              </div>

              {/* Pincode and Region Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    value={formData.address.pincode}
                    onChange={(e) => handlePincodeChange(e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    maxLength="6"
                    pattern="[0-9]{6}"
                    placeholder="Enter 6-digit PIN code"
                  />
                  {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Region *
                  </label>
                  <Select
                    value={formData.address.region ? { value: formData.address.region, label: formData.address.region } : null}
                    onChange={(selected) => handleAddressChange('region', selected.value)}
                    options={regionOptions}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    isLoading={isLoading}
                    isDisabled={!formData.address.pincode || regionOptions.length === 0}
                    placeholder={isLoading ? "Loading..." : "Select region"}
                  />
                </div>
              </div>

              {/* State and Country Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.address.state}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.address.country}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700"
                    readOnly
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Landmark
                </label>
                <input
                  type="text"
                  value={formData.address.landmark}
                  onChange={(e) => handleAddressChange('landmark', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Near hospital, school, etc."
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {existingAddress ? 'Update Address' : 'Save Address'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm; 