import { useState, useContext, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { ProfileContext } from '../Profile'
import { getSubprofiles } from "@/services/subprofileService"
import { getMemberProfile } from "@/services/profileService"

const AppointmentTypeSelector = ({ onClose, onSelect }) => {
  const { activeProfile } = useContext(ProfileContext)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [subProfiles, setSubProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSubprofiles()
  }, [])

  const fetchSubprofiles = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getSubprofiles()
      if (Array.isArray(data)) {
        setSubProfiles(data)
      } else {
        throw new Error('Invalid data format received')
      }
    } catch (err) {
      console.error('Error fetching subprofiles:', err)
      setError(err.message)
      setSubProfiles([])
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = async (profile = null) => {
    try {
      setLoading(true)
      if (!profile) {
        // Fetch member profile when booking for self
        const response = await getMemberProfile()
        if (response.status === 'success' || response.message === 'Profile retrieved successfully') {
          onSelect(response)
        } else {
          throw new Error(response.message || 'Failed to fetch member profile')
        }
      } else {
        onSelect(profile)
      }
      onClose()
    } catch (err) {
      console.error('Error fetching member profile:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDependentSelect = (e) => {
    const profileId = e.target.value
    if (profileId) {
      const profile = subProfiles.find(p => p._id === profileId)
      handleSelect(profile)
    }
  }

  const calculateAge = (dob) => {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Book Appointment</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Book for self */}
          <div className="p-4 bg-white border border-gray-200 hover:border-[#38B6FF]/30 rounded-lg transition-colors">
            <button
              onClick={() => handleSelect()}
              className="w-full text-left"
            >
              <div className="font-medium text-gray-800">Book for myself</div>
              <div className="text-sm text-gray-500 mt-1">Book an appointment under your name</div>
            </button>
          </div>

          {/* Book for dependent dropdown */}
          <div className="p-4 bg-white border border-gray-200 hover:border-[#38B6FF]/30 rounded-lg transition-colors">
            <div className="font-medium text-gray-800 mb-2">Book for dependent</div>
            <div className="text-sm text-gray-500 mb-3">Select a profile to book appointment</div>
            
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#38B6FF]"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-sm">{error}</div>
            ) : (
              <select
                onChange={handleDependentSelect}
                value=""
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] text-gray-700"
                disabled={loading}
              >
                <option value="">Select a dependent</option>
                {subProfiles.map(profile => (
                  <option key={profile._id} value={profile._id}>
                    {profile.name} ({profile.emergencyContact?.relation || 'Family Member'}, {calculateAge(profile.dob)} years)
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentTypeSelector 