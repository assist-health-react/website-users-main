import { useState, useEffect } from 'react'
import { FaTimes, FaCamera, FaEdit, FaUser, FaHome, FaBriefcase, FaMapMarkerAlt, FaPlus } from 'react-icons/fa'
import AddressForm from '../common/AddressForm'
import { updateMemberProfile } from "../../services/memberService";
import { uploadMedia, getMemberProfile } from "../../services/profileService";
import { toast } from 'react-toastify'

const ProfileForm = ({ onClose }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    memberId: '',
    email: '',
    gender: '',
    mobileNumber: '',
    profilePic: '',
    emergencyContact: {
      name: '',
      relationship: '',
      number: ''
    },
    dob: '',
    bloodGroup: '',
    height: '',
    weight: '',
    employmentStatus: '',
    educationStatus: '',
    maritalStatus: '',
    additionalInfo: '',
    selectedAddressId: ''
  })

  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [imageUrl, setImageUrl] = useState('') // New state for image URL

  useEffect(() => {
    // Get access token from localStorage
    const token = localStorage.getItem('accessToken')
    if (token) {
      setAccessToken(token)
    }
  }, [])

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true)
        const response = await getMemberProfile(accessToken)
        console.log('Raw API Response:', response)
        
        if (response.status === 'success' || response.message === "Profile retrieved successfully") {
          const profileData = response.data
          console.log('Profile Data:', profileData)
          
          if (profileData.profilePic) {
            setImageUrl(profileData.profilePic) // Set image URL if exists
          }

          // Update form data with profile information
          const updatedFormData = {
            fullName: profileData.name || '',
            memberId: profileData.memberId || '',
            email: profileData.email || '',
            gender: profileData.gender || '',
            mobileNumber: profileData.phone || '',
            profilePic: profileData.profilePic || '',
            emergencyContact: {
              name: profileData.emergencyContact?.name || '',
              relationship: profileData.emergencyContact?.relation || '',
              number: profileData.emergencyContact?.phone || ''
            },
            dob: profileData.dob ? new Date(profileData.dob).toISOString().split('T')[0] : '',
            bloodGroup: profileData.bloodGroup || '',
            height: profileData.heightInFt?.toString() || '',
            weight: profileData.weightInKg?.toString() || '',
            employmentStatus: profileData.employmentStatus || '',
            educationStatus: profileData.educationLevel || '',
            maritalStatus: profileData.maritalStatus || '',
            additionalInfo: profileData.additionalInfo || '',
            selectedAddressId: profileData.address?.[0]?._id || ''
          }
          
          setFormData(updatedFormData)

          // Update addresses if available
          if (profileData.address && Array.isArray(profileData.address)) {
            const formattedAddresses = profileData.address.map(addr => ({
              id: addr._id,
              type: 'home',
              title: 'Home Address',
              icon: <FaHome className="w-5 h-5" />,
              address: `${addr.description}${addr.landmark ? `, ${addr.landmark}` : ''}, ${addr.region}, ${addr.state}, ${addr.pinCode}`,
              details: {
                street: addr.description || '',
                pincode: addr.pinCode || '',
                city: addr.region || '',
                state: addr.state || '',
                landmark: addr.landmark || '',
                country: addr.country || 'India'
              }
            }))
            setAddresses(formattedAddresses)
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
        toast.error('Failed to load profile data')
      } finally {
        setLoading(false)
      }
    }

    if (accessToken) {
      fetchProfileData()
    }
  }, [accessToken])

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB')
      return
    }

    try {
      setLoading(true)
      setError('')

      // Create temporary preview
      const tempPreview = URL.createObjectURL(file)
      setImageUrl(tempPreview)

      // Upload the file
      const response = await uploadMedia(file, accessToken)
      console.log('Image upload response:', response)

      // Handle both response formats
      const uploadedImageUrl = response.imageUrl || response.data?.url
      if (response.success && uploadedImageUrl) {
        console.log('Setting image URL to:', uploadedImageUrl)
        setImageUrl(uploadedImageUrl)
        setFormData(prev => ({
          ...prev,
          profilePic: uploadedImageUrl
        }))
        toast.success('Profile picture uploaded successfully')
      } else {
        throw new Error('Failed to upload image: No URL returned')
      }
    } catch (err) {
      console.error('Image upload error:', err)
      toast.error(err.message || 'Failed to upload image. Please try again.')
      setImageUrl('') // Clear image on error
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleAddressSelect = (addressId) => {
    setFormData(prev => ({
      ...prev,
      selectedAddressId: addressId
    }))
  }

  const handleAddressSubmit = (newAddress) => {
    setAddresses(prev => [...prev, newAddress])
    setFormData(prev => ({
      ...prev,
      selectedAddressId: newAddress.id
    }))
    setShowAddressForm(false)
  }

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setShowAddressForm(true);
  };

  const getDisplayLabel = (value, options) => {
    if (!value) return '-';
    const option = options.find(opt => opt.value === value);
    return option ? option.label : value;
  }

  const renderField = (label, value, name, type = 'text', options = null, isDisabled = false) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        {isEditMode ? (
          type === 'select' ? (
            <select
              name={name}
              value={value}
              onChange={handleInputChange}
              disabled={isDisabled}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-[#38B6FF] ${isDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            >
              <option value="">Select {label}</option>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              name={name}
              value={value}
              onChange={handleInputChange}
              disabled={isDisabled}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-[#38B6FF] ${isDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
          )
        ) : (
          <div className="px-3 py-2 bg-gray-50 rounded-lg">
            {type === 'select' ? getDisplayLabel(value, options) : value || '-'}
          </div>
        )}
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Transform form data to match API requirements
      const profileData = {
        profilePic: formData.profilePic || '',
        name: formData.fullName || '',
        gender: formData.gender || '',
        email: formData.email || '',
        dob: formData.dob || '',
        bloodGroup: formData.bloodGroup || '',
        heightInFt: parseFloat(formData.height) || 0,
        weightInKg: parseFloat(formData.weight) || 0,
        emergencyContact: {
          name: formData.emergencyContact.name || '',
          relation: formData.emergencyContact.relationship || '',
          phone: formData.emergencyContact.number || ''
        },
        employmentStatus: formData.employmentStatus || '',
        educationLevel: formData.educationStatus || '',
        maritalStatus: formData.maritalStatus || '',
        additionalInfo: formData.additionalInfo || '',
        address: addresses.map(addr => {
          const addressData = {
            description: addr.details.street,
            pinCode: addr.details.pincode,
            region: addr.details.city,
            landmark: addr.details.landmark,
            state: addr.details.state,
            country: addr.details.country || 'India',
            location: {
              latitude: null,
              longitude: null
            }
          };
          
          // Only include _id if it's an existing address (MongoDB ID format)
          if (addr.id && addr.id.match(/^[0-9a-fA-F]{24}$/)) {
            addressData._id = addr.id;
          }
          
          return addressData;
        })
      }

      console.log('Updating profile with data:', profileData)
      const response = await updateMemberProfile(profileData, accessToken)
      
      if (response.status === 'success' || response.message === 'Profile updated successfully') {
        toast.success('Profile updated successfully')
        setIsEditMode(false)
        
        // Refresh profile data but preserve the current image
        const currentProfilePic = formData.profilePic
        const currentPreviewImage = imageUrl
        
        const updatedProfile = await getMemberProfile(accessToken)
        if (updatedProfile.status === 'success' && updatedProfile.data) {
          // Update form with new data but keep the current image
          setFormData(prev => ({
            ...prev,
            ...updatedProfile.data,
            profilePic: currentProfilePic // Preserve the current profile pic
          }))
          setImageUrl(currentPreviewImage) // Preserve the current preview
        }
      } else {
        throw new Error(response.message || 'Failed to update profile')
      }
    } catch (error) {
      console.error('Profile update error:', error)
      toast.error(error.message || 'Failed to update profile')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Profile Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Profile Picture Section */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaUser className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                {isEditMode && (
                  <label className="absolute bottom-0 right-0 bg-[#38B6FF] text-white p-2 rounded-full cursor-pointer hover:bg-[#2090d1] transition-colors">
                    <FaCamera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Basic Info Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderField('Full Name', formData.fullName, 'fullName')}
                {renderField('Member ID', formData.memberId, 'memberId', 'text', null, true)}
                {renderField('Email', formData.email, 'email', 'email')}
                {renderField('Mobile Number', formData.mobileNumber, 'mobileNumber', 'text', null, true)}
                {renderField('Gender', formData.gender, 'gender', 'select', [
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' }
                ])}
                {renderField('Date of Birth', formData.dob, 'dob', 'date')}
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderField('Contact Name', formData.emergencyContact.name, 'emergencyContact.name')}
                {renderField('Relationship', formData.emergencyContact.relationship, 'emergencyContact.relationship', 'select', [
                  { value: 'father', label: 'Father' },
                  { value: 'mother', label: 'Mother' },
                  { value: 'guardian', label: 'Guardian' },
                  { value: 'spouse', label: 'Spouse' },
                  { value: 'other', label: 'Other' },
                  { value: 'son', label: 'Son' },
                  { value: 'daughter', label: 'Daughter' }
                ])}
                {renderField('Contact Number', formData.emergencyContact.number, 'emergencyContact.number')}
              </div>
            </div>

            {/* Health Info Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderField('Blood Group', formData.bloodGroup, 'bloodGroup', 'select', [
                  { value: 'A+', label: 'A+' },
                  { value: 'A-', label: 'A-' },
                  { value: 'B+', label: 'B+' },
                  { value: 'B-', label: 'B-' },
                  { value: 'AB+', label: 'AB+' },
                  { value: 'AB-', label: 'AB-' },
                  { value: 'O+', label: 'O+' },
                  { value: 'O-', label: 'O-' }
                ])}
                {renderField('Height (ft)', formData.height, 'height')}
                {renderField('Weight (kg)', formData.weight, 'weight')}
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderField('Employment Status', formData.employmentStatus, 'employmentStatus', 'select', [
                  { value: 'employed', label: 'Employed' },
                  { value: 'self-employed', label: 'Self Employed' },
                  { value: 'unemployed', label: 'Unemployed' },
                  { value: 'student', label: 'Student' },
                  { value: 'retired', label: 'Retired' }
                ])}
                {renderField('Education Level', formData.educationStatus, 'educationStatus', 'select', [
                  { value: 'primary', label: 'Primary' },
                  { value: 'secondary', label: 'Secondary' },
                  { value: 'higher-secondary', label: 'Higher Secondary' },
                  { value: 'graduate', label: 'Graduate' },
                  { value: 'post-graduate', label: 'Post Graduate' },
                  { value: 'other', label: 'Other' }
                ])}
                {renderField('Marital Status', formData.maritalStatus, 'maritalStatus', 'select', [
                  { value: 'single', label: 'Single' },
                  { value: 'married', label: 'Married' },
                  { value: 'divorced', label: 'Divorced' },
                  { value: 'widowed', label: 'Widowed' }
                ])}
              </div>
            </div>

            {/* Address Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Addresses</h3>
                {isEditMode && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAddress(null);
                      setShowAddressForm(true);
                    }}
                    className="flex items-center gap-2 text-[#38B6FF] hover:text-[#2090d1]"
                  >
                    <FaPlus className="w-4 h-4" />
                    Add Address
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {addresses.map(address => (
                  <div
                    key={address.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      formData.selectedAddressId === address.id
                        ? 'border-[#38B6FF] bg-[#38B6FF]/5'
                        : 'border-gray-200 hover:border-[#38B6FF] hover:bg-[#38B6FF]/5'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3" onClick={() => isEditMode && handleAddressSelect(address.id)}>
                      <div className={`p-2 rounded-lg ${
                        formData.selectedAddressId === address.id
                          ? 'bg-[#38B6FF]/10 text-[#38B6FF]'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {address.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{address.title}</h4>
                        <p className="text-sm text-gray-600">{address.address}</p>
                      </div>
                      </div>
                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() => handleEditAddress(address)}
                          className="p-2 text-gray-500 hover:text-[#38B6FF] hover:bg-[#38B6FF]/10 rounded-full"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              {isEditMode ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditMode(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#38B6FF] text-white rounded-lg hover:bg-[#2090d1] disabled:bg-gray-300 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditMode(true)}
                  className="px-6 py-2 bg-[#38B6FF] text-white rounded-lg hover:bg-[#2090d1] flex items-center gap-2"
                >
                  <FaEdit className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>

        {showAddressForm && (
          <AddressForm
            onClose={() => {
              setShowAddressForm(false);
              setSelectedAddress(null);
            }}
            onSave={(newAddress) => {
              if (selectedAddress) {
                // Update existing address
                setAddresses(prev => prev.map(addr => 
                  addr.id === selectedAddress.id ? newAddress : addr
                ));
              } else {
                // Add new address
                setAddresses(prev => [...prev, newAddress]);
              }
              setShowAddressForm(false);
              setSelectedAddress(null);
            }}
            existingAddress={selectedAddress}
          />
        )}
      </div>
    </div>
  )
}

export default ProfileForm 