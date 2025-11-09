import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaEnvelope, FaCalendar, FaCamera, FaWeight, FaRuler, FaPhone } from 'react-icons/fa';
import { updateProfile, uploadMedia, getMemberProfile } from "../../services/profileService";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profilePic: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    heightInFt: '',
    weightInKg: '',
    phoneNumber: user.phoneNumber || ''
  });
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    // Check if we have the necessary data
    const memberId = user.memberId || localStorage.getItem('selectedMemberId');
    if (!memberId) {
      setError('Member information not found. Please login again.');
      navigate('/login');
      return;
    }

    // Check if we came from terms acceptance
    const fromTerms = location.state?.fromTerms;
    const isStudent = location.state?.isStudent;
    console.log('Navigation state:', location.state);
    console.log('Came from terms:', fromTerms);
    console.log('Is student:', isStudent);

    // If user data exists in localStorage, populate the form
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    if (userProfile) {
      setFormData(prev => ({
        ...prev,
        name: userProfile.name || '',
        email: userProfile.email || '',
        profilePic: userProfile.profilePic || '',
        dob: userProfile.dob || '',
        gender: userProfile.gender || '',
        bloodGroup: userProfile.bloodGroup || '',
        heightInFt: userProfile.heightInFt || '',
        weightInKg: userProfile.weightInKg || '',
        phoneNumber: user.phoneNumber || userProfile.phoneNumber || ''
      }));
      if (userProfile.profilePic) {
        setPreviewImage(userProfile.profilePic);
      }
    }
  }, [navigate, user.memberId, user.phoneNumber, location.state]);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleNumberInput = (e, field) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) { // Allow decimals
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleAuthError = () => {
    localStorage.clear();
    setError('Authentication failed. Please login again.');
    navigate('/login');
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
      } else {
        throw new Error('Failed to upload image: No URL returned');
      }
    } catch (err) {
      console.error('Image upload error:', err);
      setError(err.message || 'Failed to upload image. Please try again.');
      // Reset preview on error
      setPreviewImage('');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Basic validation
      if (!formData.name?.trim()) {
        setError('Please enter your name');
        return;
      }
      if (!formData.email?.trim()) {
        setError('Please enter your email');
        return;
      }
      if (!formData.dob) {
        setError('Please enter your date of birth');
        return;
      }
      if (!formData.gender) {
        setError('Please select your gender');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        setError('Please enter a valid email address');
        return;
      }

      // Optional fields validation only if they are filled
      let height = null;
      let weight = null;

      if (formData.heightInFt) {
        height = parseFloat(formData.heightInFt);
        if (isNaN(height) || height <= 0 || height > 8) {
          setError('Please enter a valid height between 0 and 8 feet');
          return;
        }
      }

      if (formData.weightInKg) {
        weight = parseFloat(formData.weightInKg);
        if (isNaN(weight) || weight <= 0 || weight > 200) {
          setError('Please enter a valid weight between 0 and 200 kg');
          return;
        }
      }

      setLoading(true);
      
      // Format the date to YYYY-MM-DD
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };

      // Get isStudent and isFirstLogin from location state or localStorage
      const isStudent = location.state?.isStudent ?? JSON.parse(localStorage.getItem('userProfile') || '{}').isStudent ?? false;
      const isFirstLogin = location.state?.isFirstLogin ?? JSON.parse(localStorage.getItem('user') || '{}').isFirstLogin ?? false;

      // Prepare the data for update
      const dataToUpdate = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        dob: formatDate(formData.dob),
        gender: formData.gender,
        onBoarded: true,
        isStudent: isStudent
      };

      // Only include optional fields if they have values
      if (height !== null) {
        dataToUpdate.heightInFt = height;
      }
      if (weight !== null) {
        dataToUpdate.weightInKg = weight;
      }
      if (formData.bloodGroup) {
        dataToUpdate.bloodGroup = formData.bloodGroup;
      }
      if (formData.profilePic) {
        dataToUpdate.profilePic = formData.profilePic;
      }

      // Update profile
      const response = await updateProfile(dataToUpdate);
      
      if (response.success) {
        // Get fresh profile data
        const profileResponse = await getMemberProfile();
        
        if (profileResponse.data) {
          // Update userProfile in localStorage
          const updatedProfile = {
            ...profileResponse.data,
            isStudent: isStudent,
            onBoarded: true
          };
          localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
          
          // Update user data in localStorage
          const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
          const updatedUser = {
            ...currentUser,
            name: profileResponse.data.name,
            email: profileResponse.data.email,
            isStudent: isStudent,
            isFirstLogin: false
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          // Always navigate to subscription for new users
          if (isFirstLogin) {
            navigate('/subscription', { 
              state: { 
                fromAuthFlow: true,
                fromUpdateProfile: true 
              },
              replace: true 
            });
          } else {
            // For existing users, check membership status
            const isMember = updatedProfile.isMember;
            if (isMember) {
              navigate('/subscription', { 
                state: { 
                  fromAuthFlow: true,
                  fromUpdateProfile: true 
                },
                replace: true 
              });
            } else {
              navigate('/dashboard', { replace: true });
            }
          }
        } else {
          throw new Error('Failed to fetch updated profile data');
        }
      } else {
        throw new Error(response.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
            <p className="text-gray-600">Please provide your details to continue</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-8">
              <div 
                onClick={handleImageClick}
                className="relative cursor-pointer group"
              >
                <div className={`w-32 h-32 rounded-full overflow-hidden border-4 border-purple-200 
                  ${!previewImage && 'bg-gray-100'} flex items-center justify-center`}
                >
                  {previewImage ? (
                    <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <FaCamera className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaCamera className="w-8 h-8 text-white" />
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <p className="mt-2 text-sm text-gray-500">Click to upload profile picture</p>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone Number - Read Only */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.phoneNumber}
                    readOnly
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select blood group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (ft)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaRuler className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="heightInFt"
                    value={formData.heightInFt}
                    onChange={(e) => handleNumberInput(e, 'heightInFt')}
                    step="0.1"
                    min="0"
                    max="8"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="5.8"
                  />
                </div>
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaWeight className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="weightInKg"
                    value={formData.weightInKg}
                    onChange={(e) => handleNumberInput(e, 'weightInKg')}
                    step="0.1"
                    min="0"
                    max="200"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="70"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors
                  ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Updating...' : 'Complete Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile; 