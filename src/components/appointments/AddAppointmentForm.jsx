import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhone, FaVenusMars, FaMapMarkerAlt, FaInfoCircle, FaTimes, FaHome, FaBriefcase, FaPlus, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AddressForm from '../common/AddressForm';
import { createAppointment } from "@/services/appointmentService";
import { format } from "date-fns";
import { addAddress, getMemberProfile } from "@/services/profileService";

const AddAppointmentForm = ({ onClose, selectedProfile, onSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    number: '',
    services: '',
    date: '',
    time: '',
    additionalInfo: '',
    selectedAddressId: ''
  });

  const [loading, setLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [profileData, setProfileData] = useState(null);
  
  // Initial data load from selectedProfile
  useEffect(() => {
    console.log('Selected Profile in useEffect:', selectedProfile);
    if (selectedProfile) {
      const profile = selectedProfile.data || selectedProfile;
      console.log('Profile data for form:', profile);
      
      // Set form data
      setFormData(prev => ({
        ...prev,
        name: profile.name || '',
        email: profile.email || '',
        gender: profile.gender || '',
        number: profile.phone || '',
      }));

      // Set addresses directly from the profile
      if (profile.address && Array.isArray(profile.address)) {
        console.log('Setting initial addresses:', profile.address);
        setAddresses(profile.address);
        
        // Set first address as default if available
        if (profile.address.length > 0) {
          setFormData(prev => ({
            ...prev,
            selectedAddressId: profile.address[0]._id
      }));
        }
      }
    }
  }, [selectedProfile]);

  // Fetch profile data for updates
  const fetchProfileData = async () => {
    try {
      console.log('Fetching profile data...');
      const response = await getMemberProfile();
      console.log('Profile API Response:', response);
      
      if (response.status === 'success' && response.data) {
        setProfileData(response.data);
        
        if (response.data.address && Array.isArray(response.data.address)) {
          console.log('Updating addresses from API:', response.data.address);
          setAddresses(response.data.address);
          
          // Update selected address ID if none is selected
          if (!formData.selectedAddressId && response.data.address.length > 0) {
            setFormData(prev => ({
              ...prev,
              selectedAddressId: response.data.address[0]._id
            }));
          }
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to fetch addresses');
    }
  };

  // Debug log for addresses state changes
  useEffect(() => {
    console.log('Current addresses state:', addresses);
  }, [addresses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressSelect = (addressId) => {
    setFormData(prev => ({
      ...prev,
      selectedAddressId: addressId
    }));
  };

  const validateForm = () => {
    if (!formData.services) {
      toast.error('Please select a service');
      return false;
    }
    if (!formData.date) {
      toast.error('Please select a date');
      return false;
    }
    if (!formData.time) {
      toast.error('Please select a time');
      return false;
    }
    if (!formData.selectedAddressId) {
      toast.error('Please select an address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const selectedAddress = addresses.find(addr => addr._id === formData.selectedAddressId);
      if (!selectedAddress) {
        throw new Error('Please select a valid address');
      }

      // Format date to DD/MM/YYYY
      const formattedDate = format(new Date(formData.date), 'dd/MM/yyyy');
      
      // Get the member ID from the selected profile or profile data
      let memberId;
      if (selectedProfile && selectedProfile._id) {
        memberId = selectedProfile._id;
      } else if (selectedProfile && selectedProfile.data && selectedProfile.data._id) {
        memberId = selectedProfile.data._id;
      } else if (profileData && profileData._id) {
        memberId = profileData._id;
      }

      if (!memberId) {
        throw new Error('Member ID not found. Please try again.');
      }

      console.log('Creating appointment with data:', {
        memberId,
        date: formattedDate,
        time: formData.time,
        service: formData.services,
        memberAddress: selectedAddress
      });

      const appointmentData = {
        memberId,
        date: formattedDate,
        time: formData.time,
        service: formData.services,
        memberAddress: {
          name: selectedAddress.name || 'home',
          description: selectedAddress.description,
          landmark: selectedAddress.landmark,
          pinCode: selectedAddress.pinCode,
          region: selectedAddress.region,
          state: selectedAddress.state,
          country: selectedAddress.country,
          location: selectedAddress.location || { latitude: null, longitude: null }
        },
        additionalInfo: formData.additionalInfo || ''
      };

      const response = await createAppointment(appointmentData);
      console.log('Appointment creation response:', response);
      
      if (response && (response.status === 'success' || response.message === 'Appointment created successfully' || response.data)) {
        toast.success('Appointment scheduled successfully!');
        if (onSuccess && typeof onSuccess === 'function') {
          await onSuccess(response.data);
        }
        onClose();
      } else {
        throw new Error(response?.message || 'Failed to schedule appointment');
      }
    } catch (error) {
      console.error('Appointment creation error:', error);
      toast.error(error.message || 'Failed to schedule appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = async (addressData) => {
    try {
      const formattedAddress = {
        description: addressData.address.street,
        landmark: addressData.address.landmark || '',
        pinCode: addressData.address.pincode,
        region: addressData.address.region,
        state: addressData.address.state,
        country: addressData.address.country,
        location: {
          latitude: 0,
          longitude: 0
        }
      };

      const response = await addAddress(formattedAddress);
      
      if (response.status === 'success' || response.message === 'Profile updated successfully') {
        // Refresh profile data to get updated address list
        await fetchProfileData();
        toast.success('Address added successfully!');
        setShowAddressForm(false);
      } else {
        throw new Error(response.message || 'Failed to add address');
      }
    } catch (error) {
      console.error('Error adding address:', error);
      toast.error(error.message || 'Failed to add address');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Book New Appointment</h3>
            {selectedProfile?.firstName && (
              <p className="text-sm text-gray-500 mt-1">
                Booking for: {selectedProfile.firstName} {selectedProfile.lastName} ({selectedProfile.relation})
              </p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 cursor-not-allowed"
                readOnly
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 cursor-not-allowed"
                readOnly
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 cursor-not-allowed"
                readOnly
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="number"
                value={formData.number}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 cursor-not-allowed"
                readOnly
              />
            </div>

            {/* Services */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Services *
              </label>
              <select
                name="services"
                value={formData.services}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] text-gray-700"
                required
              >
                <option value="">Select a service</option>
                <option value="General Checkup">General Checkup</option>
                <option value="Specialist Consultation">Specialist Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Lab Test">Lab Test</option>
                <option value="Vaccination">Vaccination</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] text-gray-700"
                required
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time *
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] text-gray-700"
                required
              >
                <option value="">Select a time slot</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="17:00">05:00 PM</option>
              </select>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Information
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              placeholder="Any specific requirements or concerns..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] text-gray-700 resize-none"
              rows={1}
            ></textarea>
          </div>

          {/* Address Selection */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Address
              </label>
              <button
                type="button"
                onClick={() => setShowAddressForm(true)}
                className="text-[#38B6FF] hover:text-[#2090d1] text-sm font-medium flex items-center"
              >
                <FaPlus className="w-3 h-3 mr-1" />
                Add New Address
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <div
                  key={address._id}
                  onClick={() => handleAddressSelect(address._id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.selectedAddressId === address._id
                      ? 'border-[#38B6FF] bg-[#38B6FF]/5'
                      : 'border-gray-200 hover:border-[#38B6FF]/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {address.name === 'home' ? (
                      <FaHome className={`w-5 h-5 ${
                        formData.selectedAddressId === address._id
                          ? 'text-[#38B6FF]'
                          : 'text-gray-400'
                      }`} />
                    ) : (
                      <FaBriefcase className={`w-5 h-5 ${
                        formData.selectedAddressId === address._id
                          ? 'text-[#38B6FF]'
                          : 'text-gray-400'
                      }`} />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 capitalize">
                        {address.name || 'Address'}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {address.description}, {address.landmark}, {address.region}, {address.state}, {address.pinCode}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-[#38B6FF] rounded-lg hover:bg-[#2090d1] focus:outline-none focus:ring-2 focus:ring-[#38B6FF] disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
                  Scheduling...
                </>
              ) : (
                'Schedule Appointment'
              )}
            </button>
          </div>
        </form>

      {/* Add Address Form Modal */}
      {showAddressForm && (
        <AddressForm
          onClose={() => setShowAddressForm(false)}
          onSave={handleAddressSubmit}
        />
      )}
      </div>
    </div>
  );
};

export default AddAppointmentForm; 