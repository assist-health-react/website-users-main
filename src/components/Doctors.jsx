import React, { useState, useEffect, useContext } from 'react'
import { FaLanguage, FaUserMd, FaEnvelope, FaMapMarkerAlt, FaStar, FaCheckCircle, FaSpinner, FaGraduationCap, FaBriefcase } from 'react-icons/fa'
import { getMemberProfile } from "@/services/profileService";
import { ProfileContext } from "./Profile/ProfileMenu";

const defaultDoctorImage = "https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg";



const Doctors = () => {
  const { activeProfile } = useContext(ProfileContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctorData, setDoctorData] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getMemberProfile();
        
        if (!response?.data?.healthcareTeam?.doctor?._id) {
          throw new Error('No doctor assigned yet');
        }
        
        // Store the API response data directly
        setDoctorData(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch doctor details');
      } finally {
        setLoading(false);
      }
    };

    if (activeProfile?.isMember) {
    fetchDoctorDetails();
    } else {
      setLoading(false);
    }
  }, [activeProfile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="w-8 h-8 text-[#38B6FF] animate-spin" />
      </div>
    );
  }

  // Show not a member message if user is not a member
  if (!activeProfile?.isMember) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-4">
          <div className="text-6xl mb-4">👨‍⚕️</div>
          <h2 className="text-2xl font-bold text-gray-800">Not a Member</h2>
          <p className="text-gray-600">
            Access to your dedicated healthcare provider is available exclusively to our members. Subscribe to connect with experienced doctors who can provide personalized care and guidance.
          </p>
        </div>
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
            className="bg-[#38B6FF] text-white px-4 py-2 rounded-lg hover:bg-[#2090d1]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show not assigned message if no doctor is assigned
  if (!doctorData?.healthcareTeam?.doctor?._id) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-md">
            <div className="text-6xl mb-4">⏳</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Doctor Not Assigned</h2>
            <p className="text-gray-600">
              Your healthcare provider has not been assigned yet. Our team is working on it and will assign one to you shortly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const doctor = doctorData.healthcareTeam.doctor;
  const doctorDetails = doctor._id;
  


    return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#38B6FF]/10 overflow-hidden">
        {/* Header Section */}
        <div className="bg-[#38B6FF] p-10 relative">
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {/* Profile Info */}
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="relative w-44 h-44">
                <div className="absolute inset-0 bg-[#38B6FF]/50 rounded-full blur-2xl opacity-50"></div>
                <img
                  src={doctorDetails?.profilePic || defaultDoctorImage}
                  alt={doctorDetails?.name || 'Doctor'}
                  className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-2xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultDoctorImage;
                  }}
                />
                <div className="absolute -bottom-2 -right-2 bg-[#38B6FF] text-white p-3 rounded-full shadow-xl">
                  <FaUserMd className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">{doctorDetails.name}</h1>
              <p className="text-xl text-blue-100 mb-4">Healthcare Provider</p>
              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-green-500/30">
                  <FaCheckCircle className="text-green-400" />
                  <span className="text-green-400 font-medium">Available</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/30">
                  <span className="text-blue-100 font-medium">Assigned: {new Date(doctor.assignedDate).toLocaleDateString()}</span>
                </div>
                {doctorDetails.doctorId && (
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                    <span className="text-white font-medium">ID: {doctorDetails.doctorId}</span>
                  </div>
                )}
                {doctorDetails.medicalCouncilRegistrationNumber && (
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                    <FaGraduationCap className="text-white" />
                    <span className="text-white font-medium">Reg: {doctorDetails.medicalCouncilRegistrationNumber}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="space-y-8">
            {/* About and Languages */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-[#38B6FF]">About Me</h3>
                <div className="text-gray-600 space-y-4 leading-relaxed text-lg">
                  {doctorDetails.introduction || "Your dedicated healthcare provider is here to assist you with all your medical needs."}
                </div>
              </div>

              {doctorDetails.languagesSpoken && doctorDetails.languagesSpoken.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#38B6FF]">
                  <FaLanguage className="w-7 h-7" />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-3">
                    {doctorDetails.languagesSpoken.map((language, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#38B6FF]/5 text-[#38B6FF] rounded-full text-sm font-medium"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Doctors; 