import { FaTimes, FaUser, FaSearch, FaPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AddSubProfile from "./AddSubProfile";
import { getSubprofiles } from "@/services/subprofileService";
import { format } from "date-fns";

const SubProfilesModal = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubprofiles();
  }, []);

  const fetchSubprofiles = async () => {
    try {
      setLoading(true);
      const data = await getSubprofiles();
      setProfiles(data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProfile = async (newProfile) => {
    setProfiles(prev => [...prev, newProfile]);
    setShowAddForm(false);
    // Refresh the list after adding
    fetchSubprofiles();
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

  const filteredProfiles = profiles.filter(profile => {
    const searchLower = searchTerm.toLowerCase();
    return (
      profile.name.toLowerCase().includes(searchLower) ||
      profile.email.toLowerCase().includes(searchLower) ||
      (profile.emergencyContact?.relation || '').toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {showAddForm ? (
        <AddSubProfile onClose={() => setShowAddForm(false)} onAdd={handleAddProfile} />
      ) : (
        <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Sub Profiles</h2>
                <p className="text-gray-600 mt-1">Manage your family members and dependents</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#38B6FF]/5 rounded-full transition-colors"
              >
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Search and Add Section */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search sub profiles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#38B6FF] text-white rounded-lg hover:bg-[#2090d1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:ring-offset-2"
              >
                <FaPlus className="w-4 h-4" />
                Add Sub Profile
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#38B6FF] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading sub profiles...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            ) : filteredProfiles.length === 0 ? (
              <div className="text-center py-12">
                <FaUser className="w-12 h-12 text-[#38B6FF]/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No sub profiles found</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Try adjusting your search' : 'Add a sub profile to get started'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProfiles.map((profile) => (
                  <div
                    key={profile._id}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#38B6FF]/10 flex items-center justify-center flex-shrink-0">
                        {profile.profilePic ? (
                          <img
                            src={profile.profilePic}
                            alt={profile.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <FaUser className="w-6 h-6 text-[#38B6FF]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {profile.name}
                            </h3>
                            <p className="text-[#38B6FF] font-medium">
                              {profile.emergencyContact?.relation || 'Family Member'}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-[#38B6FF]/5 text-[#38B6FF] rounded-full text-sm">
                            {profile.gender}
                          </span>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="font-medium w-24">Age:</span>
                            <span>{calculateAge(profile.dob)} years</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="font-medium w-24">Phone:</span>
                            <span>{profile.phone}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="font-medium w-24">Email:</span>
                            <span className="truncate">{profile.email}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="font-medium w-24">Blood Group:</span>
                            <span>{profile.bloodGroup}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="font-medium w-24">Member ID:</span>
                            <span>{profile.memberId}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Total sub profiles: {filteredProfiles.length}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 hover:text-[#38B6FF]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubProfilesModal; 
