import { useState, createContext, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ProfileForm from "./ProfileForm";
import { FaUser } from 'react-icons/fa'
import { getMemberProfile } from "../../services/profileService"

// Create a context for active profile
export const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
  const [activeProfile, setActiveProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const location = useLocation();

  // Function to refresh profile data
  const refreshProfile = () => {
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getMemberProfile();
        
        if (response.data) {
          // Get the stored profile data to check isMember
          const storedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
          
          // Explicitly check isMember status
          const isMemberStatus = response.data.isMember === true || storedProfile.isMember === true;
          
          const profileData = {
            id: response.data._id,
            name: response.data.name || 'User',
            photo: response.data.profilePic || null,
            email: response.data.email || '',
            isStudent: response.data.isStudent === true,
            bloodGroup: response.data.bloodGroup || '',
            dob: response.data.dob || '',
            gender: response.data.gender || '',
            heightInFt: response.data.heightInFt || '',
            weightInKg: response.data.weightInKg || '',
            termsConditionsAccepted: response.data.termsConditionsAccepted === true,
            onBoarded: response.data.onBoarded === true,
            isMember: isMemberStatus,
            healthcareTeam: response.data.healthcareTeam || null,
            membershipStatus: response.data.membershipStatus || null
          };
          
          setActiveProfile(profileData);

          // Update localStorage with complete profile data
          const updatedProfile = {
            ...response.data,
            isStudent: response.data.isStudent === true,
            isMember: isMemberStatus,
            healthcareTeam: response.data.healthcareTeam || null,
            membershipStatus: response.data.membershipStatus || null
          };
          localStorage.setItem('userProfile', JSON.stringify(updatedProfile));

          // Update user data in localStorage
          const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
          const updatedUser = {
            ...currentUser,
            name: response.data.name,
            email: response.data.email,
            isStudent: response.data.isStudent === true,
            isMember: isMemberStatus
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        } else {
          throw new Error('Invalid profile data received');
        }
      } catch (error) {
        setError(error.message || 'Failed to load profile');
        
        // If authentication error, redirect to login
        if (error.message?.includes('Authentication failed')) {
          localStorage.clear();
          window.location.href = '/login';
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    const accessToken = localStorage.getItem('accessToken');
    const publicPaths = ['/', '/about', '/plans', '/services', '/blog', '/shop', '/contact', '/login'];
    const isPublicPath = publicPaths.includes(location.pathname);

    // Only fetch profile if:
    // 1. We have an access token
    // 2. We're not on a public path
    // 3. We don't already have profile data in localStorage (unless it's a refresh)
    if (accessToken && !isPublicPath) {
      const hasStoredProfile = localStorage.getItem('userProfile');
      if (!hasStoredProfile || refreshKey > 0) {
        fetchProfile();
      } else {
        // Use stored profile data
        const storedProfile = JSON.parse(localStorage.getItem('userProfile'));
        setActiveProfile(storedProfile);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [refreshKey, location.pathname]);

  return (
    <ProfileContext.Provider value={{ 
      activeProfile, 
      setActiveProfile, 
      loading, 
      error,
      refreshProfile 
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showProfileForm, setShowProfileForm] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { activeProfile, loading } = useContext(ProfileContext)

  // List of routes that are restricted for students
  const restrictedRoutes = [
    '/medical-history',
    '/sub-profile'
  ]

  // Routes restricted for non-students
  const studentOnlyRoutes = [
    '/assessment-report'
  ]

  const handleNavigation = (path, state = {}) => {
    navigate(path, { state })
    setIsOpen(false)
  }

  const handleProfileClick = () => {
    setShowProfileForm(true)
    setIsOpen(false)
  }

  const handleLogout = () => {
    // Clear all authentication and user data
    localStorage.clear()
    // Close the menu
    setIsOpen(false)
    // Navigate to login page
    navigate('/login')
  }

  // Check if current route is allowed based on user type
  useEffect(() => {
    if (!loading && activeProfile) {
      if (activeProfile.isStudent && restrictedRoutes.includes(location.pathname)) {
        navigate('/')
      } else if (!activeProfile.isStudent && studentOnlyRoutes.includes(location.pathname)) {
        navigate('/')
      }
    }
  }, [loading, activeProfile, location.pathname, navigate])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!activeProfile) {
    return null
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-[#38B6FF]/5 p-2 rounded-lg"
      >
        <div className="w-8 h-8 rounded-full bg-[#38B6FF] flex items-center justify-center text-white font-semibold">
          {activeProfile.photo ? (
            <img 
              src={activeProfile.photo} 
              alt={activeProfile.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <FaUser className="w-4 h-4" />
          )}
        </div>
        <span className="hidden laptop:block">{activeProfile.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-1 z-50">
          <div className="px-4 py-2">
            <div className="text-sm font-medium text-gray-700">Profile</div>
            <div 
              className="flex items-center gap-3 mt-2 p-2 bg-[#38B6FF]/5 rounded-lg"
            >
              <div className="w-10 h-10 rounded-full bg-[#38B6FF] flex items-center justify-center text-white">
                {activeProfile.photo ? (
                  <img 
                    src={activeProfile.photo} 
                    alt={activeProfile.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FaUser className="w-5 h-5" />
                )}
              </div>
              <div>
                <div className="font-medium text-gray-800">{activeProfile.name}</div>
                <div className="text-sm text-gray-500">{activeProfile.email}</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-2">
            <button
              onClick={handleProfileClick}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#38B6FF]/5"
            >
              Edit Profile
            </button>
            <button
              onClick={() => {
                navigate('/dashboard/settings');
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#38B6FF]/5"
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {showProfileForm && (
        <ProfileForm onClose={() => setShowProfileForm(false)} />
      )}
    </div>
  )
}

export default ProfileMenu 