import { useState, useEffect } from 'react'
import { FaBell, FaLock, FaUser, FaSignOutAlt, FaGlobe, FaEye, FaChevronRight, FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProfileForm from './Profile/ProfileForm'

const SettingsCard = ({ title, icon: Icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
  >
    <div className="p-6 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-[#38B6FF]/10">
          <Icon className="text-[#38B6FF] text-xl" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
    </div>
    <div className="p-6">
      {children}
    </div>
  </motion.div>
)

const ToggleSwitch = ({ label, checked, onChange }) => (
  <label className="flex items-center justify-between py-3 cursor-pointer group">
    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{label}</span>
    <div 
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
        checked ? 'bg-[#38B6FF]' : 'bg-gray-200'
      }`}
      onClick={onChange}
    >
      <div
        className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
          checked ? 'transform translate-x-5' : ''
        }`}
      />
    </div>
  </label>
)

const PolicyButton = ({ label, onClick }) => (
        <button
    onClick={onClick}
    className="w-full px-4 py-3 rounded-xl hover:bg-gray-50 flex items-center justify-between group transition-colors duration-200"
  >
    <span className="text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
    <div className="flex items-center gap-2 text-gray-400 group-hover:text-[#38B6FF]">
      <FaEye />
      <FaChevronRight className="text-sm" />
    </div>
  </button>
)

const Settings = () => {
  const navigate = useNavigate();
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    profilePic: ''
  });

  const [notifications, setNotifications] = useState({
    appointments: true,
    reminders: true,
    updates: true,
    marketing: false,
    email: true,
    sms: true,
    whatsapp: true
  });

  useEffect(() => {
    // Load profile data from localStorage
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    if (userProfile) {
      setProfileData({
        name: userProfile.name || '',
        email: userProfile.email || '',
        phone: userProfile.phone || userProfile.phoneNumber || '', // Handle both phone and phoneNumber
        profilePic: userProfile.profilePic || ''
      });
    }
  }, []);

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </motion.div>

      <div className="grid gap-6">
        {/* Personal Information Preview */}
        <SettingsCard title="Personal Information" icon={FaUser}>
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              {profileData.profilePic ? (
                <img 
                  src={profileData.profilePic} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#38B6FF]/10 flex items-center justify-center">
                  <FaUser className="w-8 h-8 text-[#38B6FF]" />
                </div>
              )}
              <button
                onClick={() => setShowProfileForm(true)}
                className="flex items-center gap-2 px-4 py-2 text-[#38B6FF] hover:bg-[#38B6FF]/10 rounded-xl transition-colors"
              >
                <FaEdit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
      </div>

            <div className="grid gap-4">
              <div>
                <label className="block text-sm text-gray-500">Name</label>
                <p className="text-gray-900">{profileData.name || '-'}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500">Email</label>
                <p className="text-gray-900">{profileData.email || '-'}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500">Phone</label>
                <p className="text-gray-900">{profileData.phone || '-'}</p>
              </div>
            </div>
          </div>
        </SettingsCard>

        {/* Notification Settings */}
        <SettingsCard title="Notification Preferences" icon={FaBell}>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">What to notify</h4>
              <div className="space-y-1">
                <ToggleSwitch
                  label="Appointment Reminders"
                  checked={notifications.appointments}
                  onChange={() => handleNotificationToggle('appointments')}
                />
                <ToggleSwitch
                  label="Medicine Reminders"
                  checked={notifications.reminders}
                  onChange={() => handleNotificationToggle('reminders')}
                />
                <ToggleSwitch
                  label="Service Updates"
                  checked={notifications.updates}
                  onChange={() => handleNotificationToggle('updates')}
                />
                <ToggleSwitch
                  label="Marketing Communications"
                  checked={notifications.marketing}
                  onChange={() => handleNotificationToggle('marketing')}
                />
              </div>
      </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-3">How to notify</h4>
              <div className="space-y-1">
                <ToggleSwitch
                  label="Email Notifications"
                  checked={notifications.email}
                  onChange={() => handleNotificationToggle('email')}
                />
                <ToggleSwitch
                  label="SMS Notifications"
                  checked={notifications.sms}
                  onChange={() => handleNotificationToggle('sms')}
                />
                <ToggleSwitch
                  label="WhatsApp Notifications"
                  checked={notifications.whatsapp}
                  onChange={() => handleNotificationToggle('whatsapp')}
                />
              </div>
            </div>
          </div>
        </SettingsCard>

        {/* Privacy & Security */}
        <SettingsCard title="Privacy & Security" icon={FaLock}>
          <div className="space-y-1">
            <PolicyButton
              label="Privacy Policy"
              onClick={() => navigate('/privacy-policy')}
            />
            <PolicyButton
              label="Terms & Conditions"
              onClick={() => navigate('/terms-and-conditions')}
            />
            <PolicyButton
              label="Refund Policy"
              onClick={() => navigate('/refund-policy')}
            />
            <PolicyButton
              label="Return & Delivery Policy"
              onClick={() => navigate('/return-policy')}
            />
          </div>
        </SettingsCard>
      </div>

      {/* Profile Form Modal */}
      {showProfileForm && (
        <ProfileForm onClose={() => setShowProfileForm(false)} />
      )}
    </div>
  )
}

export default Settings 