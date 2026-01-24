import React, { useState, useEffect, useContext } from 'react';
import { FaCalendarCheck, FaHourglassHalf, FaSpinner, FaCheckCircle, FaUsers, FaDownload } from 'react-icons/fa';
import { getMemberStats, downloadMembershipCard } from "../services/memberService";
import { toast } from 'react-toastify';
import { ProfileContext } from "../components/Profile/ProfileMenu";

const Dashboard = () => {
  //console.log('Dashboard: Component rendering started');
  
  const { activeProfile, loading: profileLoading, error: profileError } = useContext(ProfileContext);
  console.log('Dashboard: ProfileContext values:', { 
    hasActiveProfile: !!activeProfile, 
    profileLoading, 
    profileError,
    activeProfileData: activeProfile 
  }
);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);
  const [stats, setStats] = useState([
    { 
      name: 'My Appointments', 
      count: 0, 
      icon: FaCalendarCheck,
      gradient: 'from-violet-500 to-violet-600',
      textColor: 'text-violet-100'
    },
    { 
      name: 'Pending Appointments', 
      count: 0, 
      icon: FaHourglassHalf,
      gradient: 'from-amber-500 to-amber-600',
      textColor: 'text-amber-100'
    },
    { 
      name: 'Ongoing Appointments', 
      count: 0, 
      icon: FaSpinner,
      gradient: 'from-emerald-500 to-emerald-600',
      textColor: 'text-emerald-100'
    },
    { 
      name: 'Completed Appointments', 
      count: 0, 
      icon: FaCheckCircle,
      gradient: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-100'
    },
    { 
      name: 'My Sub Profiles', 
      count: 0, 
      icon: FaUsers,
      gradient: 'from-pink-500 to-pink-600',
      textColor: 'text-pink-100'
    }
  ]);

  useEffect(() => {
    console.log('Dashboard: useEffect triggered with dependencies:', {
      profileLoading,
      hasActiveProfile: !!activeProfile,
      retryCount,
      profileError
    });

    const fetchStats = async () => {
      console.log('Dashboard: fetchStats started');
      try {
        setLoading(true);
        setError(null);

        // Check auth token
        const token = localStorage.getItem('accessToken');
        console.log('Dashboard: Auth token exists:', !!token);

        // Get stats data
        console.log('Dashboard: Calling getMemberStats');
        const statsResponse = await getMemberStats();
        console.log('Dashboard: Stats Response:', statsResponse);

        if (statsResponse.data) {
          console.log('Dashboard: Updating stats with:', statsResponse.data);
          setStats(prevStats => {
            const newStats = prevStats.map(stat => {
              switch(stat.name) {
                case 'My Appointments':
                  return { ...stat, count: statsResponse.data.totalAppointments || 0 }
                case 'Pending Appointments':
                  return { ...stat, count: statsResponse.data.pendingAppointments || 0 }
                case 'Ongoing Appointments':
                  return { ...stat, count: statsResponse.data.ongoingAppointments || 0 }
                case 'Completed Appointments':
                  return { ...stat, count: statsResponse.data.completedAppointments || 0 }
                case 'My Sub Profiles':
                  return { ...stat, count: statsResponse.data.subprofiles || 0 }
                default:
                  return stat
              }
            });
            console.log('Dashboard: New stats state:', newStats);
            return newStats;
          });
          setRetryCount(0);
        } else {
          console.error('Dashboard: Invalid stats response structure:', statsResponse);
          throw new Error('Invalid stats data structure');
        }
      } catch (error) {
        console.error('Dashboard: Error fetching stats:', error);
        setError('Failed to load dashboard stats');
        toast.error('Failed to load dashboard stats');
        
        if (retryCount < 3) {
          console.log('Dashboard: Scheduling retry attempt', retryCount + 1);
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 2000);
        } else {
          console.log('Dashboard: Max retries reached');
        }
      } finally {
        console.log('Dashboard: Setting loading to false');
        setLoading(false);
      }
    };

    if (!profileLoading && activeProfile && !profileError) {
      console.log('Dashboard: Conditions met to fetch stats');
      fetchStats();
    } else {
      console.log('Dashboard: Conditions not met to fetch stats:', {
        profileLoading,
        hasActiveProfile: !!activeProfile,
        profileError
      });
    }
  }, [profileLoading, activeProfile, retryCount, profileError]);

  const handleDownload = async (e) => {
    e.preventDefault();
    setIsDownloading(true);
    setDownloadError(null);
    try {
      await downloadMembershipCard();
      toast.success('Membership card downloaded successfully');
    } catch (error) {
      console.error('Error downloading membership card:', error);
      const errorMessage = error.message || 'Failed to download membership card';
      setDownloadError(errorMessage);
      toast.error(errorMessage);
      
      // If session expired, redirect to login
      if (errorMessage.includes('session has expired')) {
        localStorage.clear();
        window.location.href = '/login';
      }
    } finally {
      setIsDownloading(false);
    }
  }

  // Show loading state while profile is loading
  if (profileLoading || loading) {
    console.log('Dashboard: Rendering loading state due to:', { profileLoading, loading });
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show error state if profile failed to load
  if (profileError || !activeProfile) {
    console.log('Dashboard: Rendering profile error state:', { profileError, hasActiveProfile: !!activeProfile });
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{profileError || 'Failed to load profile data'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show error state if stats failed to load
  if (error && retryCount >= 3) {
    console.log('Dashboard: Rendering stats error state:', { error, retryCount });
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => setRetryCount(0)} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  console.log('Dashboard: Rendering main dashboard UI with stats:', stats);
  return (
    <div className="p-4">
      {/* Welcome Card */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-[#38B6FF] to-blue-600 rounded-xl shadow-lg overflow-hidden">
          <div className="relative p-6">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 -mr-32 -mt-32 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 -ml-24 -mb-24 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="relative">
              {/* Welcome Message */}
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-white mb-1">Welcome back!</h1>
                <p className="text-blue-100">Here's your health dashboard</p>
              </div>
              
              {/* Member Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {/* Name */}
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm">{activeProfile.isStudent ? 'Student Name' : 'Member Name'}</p>
                      <p className="text-white font-semibold">
                        {activeProfile.name || 'Not Available'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Member ID */}
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm">{activeProfile.isStudent ? 'Student ID' : 'Member ID'}</p>
                      <p className="text-white font-semibold">
                        {activeProfile.isStudent ? (activeProfile.memberId || 'Not Available') : (activeProfile.isMember ? (activeProfile.memberId || 'Not Available') : 'Not a member')}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Phone Number */}
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm">Phone Number</p>
                      <p className="text-white font-semibold">
                        {activeProfile.phone || activeProfile.phoneNumber || 'Not Available'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Card Download - Only visible for subscribed users */}
      {activeProfile?.membershipStatus?.premiumMembership?.isActive && (
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Membership Card</h3>
                  <p className="text-gray-600">Download your AssistHealth membership card</p>
                </div>
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className={`flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors ${
                    isDownloading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-600'
                  }`}
                >
                  {isDownloading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <FaDownload className="h-5 w-5" />
                      <span>Download Card</span>
                    </>
                  )}
                </button>
              </div>
              {downloadError && (
                <div className="mt-4 flex items-center justify-between text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-2">
                    <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium">{downloadError}</p>
                  </div>
                  <button
                    onClick={() => setDownloadError(null)}
                    className="ml-4 p-1 hover:bg-red-100 rounded-full transition-colors"
                    aria-label="Close error message"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Overview */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((item) => (
            <div
              key={item.name}
              className={`bg-gradient-to-br ${item.gradient} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${item.textColor}`}>{item.name}</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{item.count}</h3>
                  </div>
                  <div className={`p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;