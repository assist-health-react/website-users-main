import { useState, useRef, useEffect } from 'react';
import { FaTimes, FaUpload, FaHome, FaBriefcase, FaMapMarkerAlt, FaPlus, FaCamera } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AddressForm from '../common/AddressForm';
import { createSubprofile } from "@/services/subprofileService";
import { uploadMedia, getMemberProfile } from "@/services/profileService";

const AddSubProfile = ({ onClose, onAdd }) => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getMemberProfile();
        
        // Check for error in response
        if (response.error) {
          throw new Error(response.error);
        }

        if (!response.data) {
          throw new Error('No profile data received');
        }

        // Update email and phone (remove +91 prefix if exists)
        let phoneNumber = response.data.phone || '';
        if (phoneNumber.startsWith('+91')) {
          phoneNumber = phoneNumber.slice(3); // Remove +91
        } else if (phoneNumber.startsWith('91')) {
          phoneNumber = phoneNumber.slice(2); // Remove 91
        }
        
        setFormData(prev => ({
          ...prev,
          email: response.data.email || '',
          phone: phoneNumber
        }));

        // Update emergency contact
        let emergencyPhone = response.data.emergencyContact?.phone || '';
        if (emergencyPhone.startsWith('+91')) {
          emergencyPhone = emergencyPhone.slice(3); // Remove +91
        } else if (emergencyPhone.startsWith('91')) {
          emergencyPhone = emergencyPhone.slice(2); // Remove 91
        }

        setFormData(prev => ({
          ...prev,
          emergencyContact: {
            name: response.data.emergencyContact?.name || userProfile.name || '',
            relation: response.data.emergencyContact?.relation || '',
            phone: emergencyPhone || phoneNumber // Use user's phone if no emergency contact
          }
        }));

        // Update addresses
        if (response.data.address && Array.isArray(response.data.address)) {
          const formattedAddresses = response.data.address.map((addr, index) => ({
            id: addr._id || index + 1,
            type: addr.type || 'other',
            title: addr.title || 'Address ' + (index + 1),
            icon: addr.type === 'work' ? <FaBriefcase className="w-5 h-5" /> :
                  addr.type === 'home' ? <FaHome className="w-5 h-5" /> :
                  <FaMapMarkerAlt className="w-5 h-5" />,
            address: addr.address,
            isDefault: addr.isDefault || false
          }));
          setAddresses(formattedAddresses);

          // If there's at least one address, select the first one
          if (formattedAddresses.length > 0) {
            handleAddressSelect(formattedAddresses[0].id);
          }
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        
        // Handle authentication errors
        if (err.message?.includes('login') || err.message?.includes('session expired')) {
          toast.error('Your session has expired. Please login again.');
          window.location.href = '/login';
          return;
        }

        // Handle other errors
        const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message;
        setError(errorMessage || 'Failed to fetch user profile data');
      }
    };

    fetchUserProfile();
  }, []);

  const [formData, setFormData] = useState({
    isSubprofile: true,
    primaryMemberId: user.memberId,
    profilePic: '',
    name: '',
    email: '',
    gender: '',
    phone: '',
    dob: '',
    bloodGroup: '',
    heightInFt: '',
    weightInKg: '',
    emergencyContact: {
      name: '',
      relation: '',
      phone: ''
    },
    employmentStatus: '',
    educationLevel: '',
    maritalStatus: '',
    additionalInfo: '',
    address: '',
    selectedAddressId: ''
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Create preview immediately
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);

      // Upload the file
      const response = await uploadMedia(file);
      console.log('Image upload response:', response);

      if (response.success && response.data?.url) {
        setFormData(prev => ({
          ...prev,
          profilePic: response.data.url
        }));
        toast.success('Profile picture uploaded successfully');
      } else {
        throw new Error('Failed to upload image: No URL returned');
      }
    } catch (err) {
      console.error('Image upload error:', err);
      toast.error(err.message || 'Failed to upload image. Please try again.');
      // Reset preview on error
      setPreviewImage('');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setError('');
  };

  const handlePhoneChange = (e, field = 'phone') => {
    let value = e.target.value.replace(/\D/g, '');
    if (!value.startsWith('91')) {
      value = '91' + value;
    }
    if (value.length > 12) {
      value = value.slice(0, 12);
    }
    const formattedValue = value.length > 2 
      ? `+${value.slice(0, 2)} ${value.slice(2).replace(/(\d{5})(\d{5})/, '$1-$2')}`
      : `+${value}`;

    if (field === 'emergencyPhone') {
      setFormData(prev => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          phone: formattedValue
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, phone: formattedValue }));
    }
  };

  const handleAddressSelect = (addressId) => {
    const selectedAddress = addresses.find(addr => addr.id === addressId);
    setFormData(prev => ({
      ...prev,
      selectedAddressId: addressId,
      address: selectedAddress?.address || ''
    }));
  };

  const handleAddressSubmit = (newAddress) => {
    const addressId = addresses.length + 1;
    const addressToAdd = {
      ...newAddress,
      id: addressId
    };
    setAddresses(prev => [...prev, addressToAdd]);
    handleAddressSelect(addressId);
    setShowAddressForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

        // Required fields validation
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all required fields: Name, Email, and Phone');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Date format validation if DOB is provided
    if (formData.dob) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(formData.dob)) {
        setError('Date of birth must be in YYYY-MM-DD format');
        return;
      }
    }

    // Height validation if provided
    let height;
    if (formData.heightInFt) {
      height = parseFloat(formData.heightInFt);
      if (isNaN(height) || height <= 0 || height > 8) {
        setError('Please enter a valid height between 0 and 8 feet');
        return;
      }
    }

    // Weight validation if provided
    let weight;
    if (formData.weightInKg) {
      weight = parseFloat(formData.weightInKg);
      if (isNaN(weight) || weight <= 0 || weight > 200) {
        setError('Please enter a valid weight between 0 and 200 kg');
        return;
      }
    }

    try {
      setLoading(true);
      
      // Start with required fields and always include isSubprofile
      const dataToSubmit = {
        isSubprofile: true,
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      };

      // Add optional fields only if they have values
      if (formData.dob) dataToSubmit.dob = formData.dob;
      if (formData.gender) dataToSubmit.gender = formData.gender.toLowerCase();
      if (formData.bloodGroup) dataToSubmit.bloodGroup = formData.bloodGroup;
      if (height) dataToSubmit.heightInFt = height;
      if (weight) dataToSubmit.weightInKg = weight;
      if (formData.employmentStatus) dataToSubmit.employmentStatus = formData.employmentStatus;
      if (formData.educationLevel) dataToSubmit.educationLevel = formData.educationLevel;
      if (formData.maritalStatus) dataToSubmit.maritalStatus = formData.maritalStatus;
      if (formData.additionalInfo) dataToSubmit.additionalInfo = formData.additionalInfo;

      // Add emergency contact only if at least one field is filled
      if (formData.emergencyContact.name || formData.emergencyContact.relation || formData.emergencyContact.phone) {
        dataToSubmit.emergencyContact = {
          name: formData.emergencyContact.name || '',
          relation: formData.emergencyContact.relation || '',
          phone: formData.emergencyContact.phone || ''
        };
      }

      // Add address only if selected
      if (formData.address) {
        dataToSubmit.address = formData.address;
      }

      console.log('Submitting subprofile data:', dataToSubmit);

      const response = await createSubprofile(dataToSubmit);
      console.log('Subprofile creation response:', response);

      // Handle successful creation
      if (response.message === 'Subprofile created successfully' && response.data) {
        toast.success('Sub profile created successfully');
        onAdd(response.data);
        onClose();
        return;
      }

      // If we get here without success message, something went wrong
      throw new Error(response.error || response.message || 'Failed to create sub profile');
    } catch (err) {
      console.error('Subprofile creation error:', err);
      console.error('Error response structure:', err.response);
      console.error('Error message:', err.message);
      
      const errorMessage = err.message || '';
      console.log('Processing error message:', errorMessage);
      
      // Handle validation errors
      if (errorMessage.includes('validation failed')) {
        console.log('Validation error detected:', errorMessage); // Debug log
        
        // Extract field name from error message
        const fieldMatch = errorMessage.match(/path `([^`]+)`/);
        
        if (fieldMatch) {
          const fullPath = fieldMatch[1];
          console.log('Field path extracted:', fullPath); // Debug log
          
          // Handle nested fields (like emergencyContact.relation)
          if (fullPath.includes('.')) {
            const [parent, field] = fullPath.split('.');
            
            // Special handling for emergency contact relation
            if (parent === 'emergencyContact' && field === 'relation') {
              setError('Please select a valid relationship for emergency contact');
              document.querySelector('.emergency-contact-section')?.scrollIntoView({ behavior: 'smooth' });
              return;
            }

            // Format nested field names
            const parentName = parent.replace(/([A-Z])/g, ' $1').toLowerCase();
            const fieldName = field.replace(/([A-Z])/g, ' $1').toLowerCase();
            setError(`Please provide a valid ${fieldName} for ${parentName}`);
          } else {
            // Handle top-level fields
            const fieldName = fullPath.replace(/([A-Z])/g, ' $1').toLowerCase();
            setError(`Please provide a valid value for ${fieldName}`);
          }
          
          // Try to scroll to the relevant section
          const sectionElement = document.querySelector(`.${fullPath.split('.')[0]}-section`);
          if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }

        // Generic validation error if we can't parse the field name
        setError('Please check all required fields and try again');
        return;
      }

      // If we get here, log the error message for debugging
      console.log('Error message that didn\'t match validation pattern:', errorMessage);

      // Handle authentication errors
      if (errorMessage.includes('login') || errorMessage.includes('session expired')) {
        toast.error('Your session has expired. Please login again.');
        window.location.href = '/login';
        return;
      }
      
      // Handle other errors
      setError(errorMessage || 'Failed to create sub profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add Sub Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex justify-center">
            <div className="relative">
              <div
                onClick={handleImageClick}
                className="w-32 h-32 rounded-full overflow-hidden cursor-pointer border-4 border-[#38B6FF]/10 hover:border-[#38B6FF]/30 transition-colors"
              >
                {previewImage || formData.profilePic ? (
                  <img
                    src={previewImage || formData.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#38B6FF]/5 flex items-center justify-center">
                    <FaCamera className="w-8 h-8 text-[#38B6FF]" />
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-75 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#38B6FF]" />
                </div>
              )}
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
                required
              />
              
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
                required
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
                required
              >
                <option value="">Select Gender *</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <input
                type="text"
                name="phone"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
                required
              />

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
                required
              />
            </div>

            {/* Health Information */}
            <div className="space-y-4">
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
              >
                <option value="">Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>

              <input
                type="number"
                name="heightInFt"
                placeholder="Height (in feet)"
                value={formData.heightInFt}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                max="8"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
              />

              <input
                type="number"
                name="weightInKg"
                placeholder="Weight (in kg)"
                value={formData.weightInKg}
                onChange={handleInputChange}
                step="0.1"
                min="0"
                max="200"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
              />

              <select
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
              >
                <option value="">Employment Status</option>
                <option value="employed">Employed</option>
                <option value="self_employed">Self Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="student">Student</option>
                <option value="retired">Retired</option>
                <option value="homemaker">Homemaker</option>
              </select>

              <select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
              >
                <option value="">Education Level</option>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="higher_secondary">Higher Secondary</option>
                <option value="graduate">Graduate</option>
                <option value="post_graduate">Post Graduate</option>
                <option value="doctorate">Doctorate</option>
              </select>

              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
              >
                <option value="">Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-[#38B6FF]/5 rounded-lg p-6 space-y-4 emergency-contact-section">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="emergencyContact.name"
                placeholder="Contact Name"
                value={formData.emergencyContact.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
              />
              <select
                name="emergencyContact.relation"
                value={formData.emergencyContact.relation}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
              >
                <option value="">Select Relationship</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="guardian">Guardian</option>
                <option value="spouse">Spouse</option>
                <option value="son">Son</option>
                <option value="daughter">Daughter</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                name="emergencyContact.phone"
                placeholder="Contact Number"
                value={formData.emergencyContact.phone}
                onChange={(e) => handlePhoneChange(e, 'emergencyPhone')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Address</h3>
              <button
                type="button"
                onClick={() => setShowAddressForm(true)}
                className="flex items-center gap-2 text-[#38B6FF] hover:text-[#2090d1]"
              >
                <FaPlus className="w-4 h-4" />
                <span>Add New Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => handleAddressSelect(addr.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    formData.selectedAddressId === addr.id
                      ? 'border-[#38B6FF] bg-[#38B6FF]/5'
                      : 'border-gray-200 hover:border-[#38B6FF]/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-full ${
                      formData.selectedAddressId === addr.id
                        ? 'bg-[#38B6FF]/10 text-[#38B6FF]'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {addr.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{addr.title}</h4>
                      {addr.isDefault && (
                        <span className="text-xs text-[#38B6FF]">Default Address</span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{addr.address}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#38B6FF] text-white rounded-lg hover:bg-[#2090d1] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating...' : 'Create Sub Profile'}
            </button>
          </div>
        </form>

        {showAddressForm && (
          <AddressForm
            onClose={() => setShowAddressForm(false)}
            onSubmit={handleAddressSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default AddSubProfile;
