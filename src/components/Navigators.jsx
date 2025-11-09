import React, { useState, useEffect, useContext } from 'react'
import { FaPhone, FaWhatsapp, FaLanguage, FaUserMd, FaTimes, FaEnvelope, FaMapMarkerAlt, FaStar, FaCheckCircle, FaSpinner } from 'react-icons/fa'
import { getMemberProfile } from "@/services/profileService";
import { ProfileContext } from "./Profile/ProfileMenu";

const defaultNavigatorImage = "https://img.freepik.com/free-vector/health-professional-concept-illustration_114360-1686.jpg";

const PhonePopup = ({ phone, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 max-w-sm w-full mx-4 relative animate-slideUp border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes className="w-5 h-5" />
        </button>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform rotate-12">
            <div className="transform -rotate-12">
              <FaPhone className="w-10 h-10 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Contact Number</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-6">{phone}</p>
          <a
            href={`tel:${phone}`}
            className="block w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl font-semibold text-lg"
          >
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
};

const Navigators = () => {
  const { activeProfile } = useContext(ProfileContext);
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [navigatorData, setNavigatorData] = useState(null);

  useEffect(() => {
    const fetchNavigatorDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getMemberProfile();
        

        
        if (!response?.data?.healthcareTeam?.navigator?._id) {
          throw new Error('No navigator assigned yet');
        }
        
        // Store the API response data directly
        setNavigatorData(response.data);

      } catch (err) {

        setError(err.message || 'Failed to fetch navigator details');
      } finally {
        setLoading(false);
      }
    };

    // Always fetch navigator details when component mounts or when activeProfile changes
    fetchNavigatorDetails();
  }, [activeProfile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
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
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-md">
            <div className="text-6xl mb-4">👨‍⚕️</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Not a Member</h2>
            <p className="text-gray-600">
              You need to be a member to access your dedicated healthcare navigator. Please subscribe to our membership to unlock this feature and get personalized healthcare support.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show not assigned message if no navigator is assigned
  if (!navigatorData?.healthcareTeam?.navigator?._id) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-md">
            <div className="text-6xl mb-4">⏳</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Navigator Not Assigned</h2>
            <p className="text-gray-600">
              Your healthcare navigator has not been assigned yet. Our team is working on it and will assign one to you shortly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const navigator = navigatorData.healthcareTeam.navigator;
  // Based on the API response structure: healthcareTeam.navigator._id contains the navigator details
  const navigatorDetails = navigator._id;
  

  


  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-50 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 p-10 relative">
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {/* Profile Info */}
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="relative w-44 h-44">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-2xl opacity-50"></div>
                <img
                  src={navigatorDetails?.profilePic || defaultNavigatorImage}
                  alt={navigatorDetails?.name || 'Navigator'}
                  className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-2xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultNavigatorImage;
                  }}
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-green-400 to-green-600 text-white p-3 rounded-full shadow-xl">
                  <FaUserMd className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="text-center md:text-left flex-1">
                               <h1 className="text-4xl font-bold text-white mb-2">{navigatorDetails?.name || 'Navigator'}</h1>
              <p className="text-xl text-blue-100 mb-4">Healthcare Navigator</p>
              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-green-500/30">
                  <FaCheckCircle className="text-green-400" />
                  <span className="text-green-400 font-medium">Available</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/30">
                  <span className="text-blue-100 font-medium">Assigned: {new Date(navigator.assignedDate).toLocaleDateString()}</span>
                </div>
                {navigatorDetails?.navigatorId && (
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                    <span className="text-white font-medium">ID: {navigatorDetails.navigatorId}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="md:col-span-1 space-y-6">
              <div className="space-y-4">
                                 <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-white border border-blue-100/20">
                   <div className="bg-blue-500/10 p-3 rounded-lg">
                     <FaPhone className="w-5 h-5 text-blue-600" />
                   </div>
                   <div>
                     <p className="text-sm text-gray-500">Phone</p>
                     <p className="text-gray-700 font-medium">{navigatorDetails?.phone || 'Not Available'}</p>
                   </div>
                 </div>
              </div>

              <div className="space-y-4">
                {navigatorDetails?.phone && (
                  <>
                    <button
                      onClick={() => setShowPhonePopup(true)}
                      className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl font-semibold text-lg flex items-center justify-center gap-3"
                    >
                      <FaPhone className="w-5 h-5" />
                      <span>Call Now</span>
                      </button>
                    <a
                      href={`https://wa.me/${navigatorDetails.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white px-6 py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl font-semibold text-lg flex items-center justify-center gap-3"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      <span>WhatsApp</span>
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* About and Languages */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">About Me</h3>
                                 <div className="text-gray-600 space-y-4 leading-relaxed text-lg">
                   {navigatorDetails?.introduction || "Your dedicated healthcare navigator is here to assist you with all your healthcare needs."}
                 </div>
              </div>

              {navigatorDetails?.languagesSpoken && navigatorDetails.languagesSpoken.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <FaLanguage className="text-blue-500" />
                    <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Languages Spoken</span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {navigatorDetails.languagesSpoken.map((lang, index) => (
                      <span
                        key={index}
                        className="px-6 py-3 bg-gradient-to-r from-blue-50 to-white text-blue-600 rounded-xl text-base font-medium hover:scale-105 transition-transform duration-300 cursor-default border border-blue-100/20 shadow-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

             {/* Phone Popup */}
       {showPhonePopup && navigatorDetails?.phone && (
         <PhonePopup
           phone={navigatorDetails.phone}
           onClose={() => setShowPhonePopup(false)}
         />
       )}
    </div>
  );
};

export default Navigators;