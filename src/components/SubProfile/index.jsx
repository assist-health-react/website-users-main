import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaPlus, FaSearch, FaMale, FaFemale, FaPhone, FaChevronRight, FaEnvelope, FaRuler, FaWeight, FaGraduationCap, FaBriefcase, FaHeart, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AddSubProfile from "./AddSubProfile";
import { getSubprofiles } from "@/services/subprofileService";
import { ProfileContext } from '../Profile/ProfileMenu';

const SubProfile = () => {
  const navigate = useNavigate();
  const { activeProfile } = useContext(ProfileContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [subProfiles, setSubProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Check for token first
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }
    
    if (activeProfile?.isMember) {
      fetchSubprofiles();
    } else {
      setLoading(false);
    }
  }, [navigate, activeProfile]);

  const fetchSubprofiles = async (query = '') => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSubprofiles(query);
      if (Array.isArray(data)) {
        setSubProfiles(data);
      } else {
        throw new Error('Invalid data format received');
      }
    } catch (err) {
      console.error('Error fetching subprofiles:', err);
      setError(err.message);
      setSubProfiles([]);
      
      // Handle authentication errors
      if (err.message.includes('login') || err.message.includes('session expired')) {
        localStorage.removeItem('accessToken');
        navigate('/login');
      }
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    fetchSubprofiles(searchTerm.trim());
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    fetchSubprofiles('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
      
  const filteredProfiles = subProfiles.filter(profile => {
    const searchLower = searchTerm.toLowerCase();
    return profile.name.toLowerCase().includes(searchLower) || 
           (profile.emergencyContact?.relation || '').toLowerCase().includes(searchLower);
  });

  const getGenderIcon = (gender) => {
    if (gender.toLowerCase() === 'male') {
      return <FaMale className="text-blue-500" />;
    }
    return <FaFemale className="text-pink-500" />;
  };

  const getRelationshipColor = (relationship) => {
    switch(relationship?.toLowerCase()) {
      case 'son':
        return 'bg-blue-100 text-blue-800';
      case 'daughter':
        return 'bg-pink-100 text-pink-800';
      case 'spouse':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
//   const calculateAge = (dob) => {
//     console.log(dob);
    
//   if (!dob) return null;

//   // Normalize DOB to date-only (YYYY-MM-DD)
//   const birth = new Date(dob);
//   const birthDate = new Date(
//     birth.getUTCFullYear(),
//     birth.getUTCMonth(),
//     birth.getUTCDate()
//   );

//   const today = new Date();
//   const todayDate = new Date(
//     today.getFullYear(),
//     today.getMonth(),
//     today.getDate()
//   );

//   let age = todayDate.getFullYear() - birthDate.getFullYear();

//   const hasHadBirthdayThisYear =
//     todayDate.getMonth() > birthDate.getMonth() ||
//     (todayDate.getMonth() === birthDate.getMonth() &&
//       todayDate.getDate() >= birthDate.getDate());

//   if (!hasHadBirthdayThisYear) {
//     age--;
//   }
//   console.log(age);

//   return age < 0 ? 0 : age;
// };

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#38B6FF]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => fetchSubprofiles()}
            className="px-4 py-2 bg-[#38B6FF] text-white rounded-lg hover:bg-[#2090d1]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show not a member message if user is not a member
  if (!activeProfile?.isMember) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-md">
            <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Not a Member</h2>
            <p className="text-gray-600">
              You need to be a member to manage sub profiles. Please subscribe to our membership to unlock this feature.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedProfile ? (
        <div className="mb-8">
          <button
            onClick={() => setSelectedProfile(null)}
            className="flex items-center gap-2 text-[#38B6FF] hover:text-[#2090d1] font-medium mb-6"
          >
            <FaChevronRight className="rotate-180" />
            <span>Back to Sub Profiles</span>
          </button>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Profile Header */}
            <div className="flex items-start gap-8 mb-8">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-[#38B6FF]/10 shadow-sm">
                  {selectedProfile.profilePic ? (
                    <img 
                      src={selectedProfile.profilePic}
                      alt={selectedProfile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#38B6FF]/10 flex items-center justify-center">
                      <FaUser className="w-12 h-12 text-[#38B6FF]" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-sm">
                  {getGenderIcon(selectedProfile.gender)}
                </div>
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedProfile.name}
                </h2>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getRelationshipColor(selectedProfile.emergencyContact?.relation)}`}>
                    {selectedProfile.emergencyContact?.relation || 'Family Member'}
                  </span>
                  <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {calculateAge(selectedProfile.dob)} years
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-[#38B6FF]" />
                    <span>{selectedProfile.email || 'No email provided'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-[#38B6FF]" />
                    <span>{selectedProfile.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Health Information */}
              <div className="bg-[#38B6FF]/5 rounded-lg p-6 border border-[#38B6FF]/10">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#38B6FF]/10 rounded-full">
                      <FaUser className="w-4 h-4 text-[#38B6FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Blood Group</p>
                      <p className="font-medium text-gray-900">{selectedProfile.bloodGroup}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#38B6FF]/10 rounded-full">
                      <FaRuler className="w-4 h-4 text-[#38B6FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Height</p>
                      <p className="font-medium text-gray-900">{selectedProfile.heightInFt} cm</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#38B6FF]/10 rounded-full">
                      <FaWeight className="w-4 h-4 text-[#38B6FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Weight</p>
                      <p className="font-medium text-gray-900">{selectedProfile.weightInKg} kg</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal History */}
              <div className="bg-[#38B6FF]/5 rounded-lg p-6 border border-[#38B6FF]/10">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal History</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#38B6FF]/10 rounded-full">
                      <FaBriefcase className="w-4 h-4 text-[#38B6FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Employment Status</p>
                      <p className="font-medium text-gray-900">{selectedProfile.employmentStatus}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#38B6FF]/10 rounded-full">
                      <FaGraduationCap className="w-4 h-4 text-[#38B6FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Education Level</p>
                      <p className="font-medium text-gray-900">{selectedProfile.educationLevel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#38B6FF]/10 rounded-full">
                      <FaHeart className="w-4 h-4 text-[#38B6FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Marital Status</p>
                      <p className="font-medium text-gray-900">{selectedProfile.maritalStatus}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
                <h3 className="text-lg font-semibold text-orange-900 mb-4">Emergency Contact</h3>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <FaPhone className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-orange-800">{selectedProfile.emergencyContact?.name}</p>
                    <p className="text-sm text-orange-700">{selectedProfile.emergencyContact?.relation}</p>
                    <p className="font-semibold text-orange-900 mt-1">{selectedProfile.emergencyContact?.phone}</p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Additional Information</h3>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <FaMapMarkerAlt className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-green-700">Address</p>
                    <p className="font-medium text-green-900">{selectedProfile.address?.description || 'No address provided'}</p>
                    {selectedProfile.additionalInfo && (
                      <>
                        <p className="text-sm text-green-700 mt-3">Additional Notes</p>
                        <p className="font-medium text-green-900">{selectedProfile.additionalInfo}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sub Profiles</h1>
              <p className="text-gray-600 mt-1">Manage your family members' profiles</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#38B6FF] text-white rounded-lg hover:bg-[#2090d1] transition-colors"
            >
              <FaPlus className="w-4 h-4" />
              Add Sub Profile
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {searchTerm && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching || !searchTerm.trim()}
                className="px-4 py-2 bg-[#38B6FF] text-white rounded-lg hover:bg-[#2090d1] disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:ring-offset-2 transition-colors"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>

          {/* Sub Profiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subProfiles.map(profile => (
              <div
                key={profile._id}
                onClick={() => handleProfileClick(profile)}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-[#38B6FF]/10">
                        {profile.profilePic ? (
                          <img
                            src={profile.profilePic}
                            alt={profile.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FaUser className="w-8 h-8 text-[#38B6FF]" />
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                        {getGenderIcon(profile.gender)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                      <div className="mt-1 space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <FaEnvelope className="w-3 h-3" />
                          <span>{profile.email || 'No email'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <FaPhone className="w-3 h-3" />
                          <span>{profile.phone || 'No phone'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRelationshipColor(profile.emergencyContact?.relation)}`}>
                      {profile.emergencyContact?.relation || 'Family Member'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {calculateAge(profile.dob)} years
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAddForm && (
        <AddSubProfile
          onClose={() => setShowAddForm(false)}
          onAdd={(newProfile) => {
            fetchSubprofiles(searchTerm);
            setShowAddForm(false);
          }}
        />
      )}
    </div>
  );
};

export default SubProfile; 