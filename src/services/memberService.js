import axios from "./axios";
import { BASE_URL, getAuthHeaders, getMultipartHeaders } from "./config";

export const updateMemberProfile = async (profileData) => {
  try {
    let headers = getAuthHeaders();
    
    // If there's a profile picture, use multipart headers and FormData
    if (profileData.profilePic instanceof File) {
      const formData = new FormData();
      formData.append('profilePic', profileData.profilePic);
      
      // Append other data
      Object.keys(profileData).forEach(key => {
        if (key !== 'profilePic') {
          if (typeof profileData[key] === 'object') {
            formData.append(key, JSON.stringify(profileData[key]));
          } else {
            formData.append(key, profileData[key]);
          }
        }
      });

      headers = getMultipartHeaders();
      
      const response = await axios.put(
        `${BASE_URL}/members/profile`,
        formData,
        { headers }
      );
      return response.data;
    }

    // If no profile picture, send regular JSON
    const response = await axios.put(
      `${BASE_URL}/members/profile`,
      profileData,
      { headers }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to update profile');
    }
    throw new Error('Network error occurred');
  }
};

export const downloadMembershipCard = async () => {
  try {
    const headers = getAuthHeaders();
    
    const response = await axios.get(`${BASE_URL}/members/membership-card`, { headers });

    if (response.data?.status === 'success' && response.data?.data?.success && response.data?.data?.s3Url) {
      // Open the S3 URL in a new tab
      window.open(response.data.data.s3Url, '_blank');
      return true;
    } else {
      throw new Error(response.data?.data?.message || 'Failed to generate membership card');
    }
  } catch (error) {
    console.error('Membership Card Error:', error);
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to get membership card');
    }
    throw new Error('Network error occurred while getting membership card');
  }
};

export const getMemberStats = async () => {
  try {
    const headers = getAuthHeaders();
    console.log('Fetching stats from:', `${BASE_URL}/stats`);
    const response = await axios.get(
      `${BASE_URL}/stats`, // Updated to correct endpoint
      { headers }
    );
    
    if (!response.data || !response.data.data) {
      console.error('Invalid stats response:', response);
      throw new Error('Invalid stats data received');
    }
    
    console.log('Stats response:', response.data);
    return {
      data: {
        totalAppointments: response.data.data.totalAppointments || 0,
        pendingAppointments: response.data.data.pendingAppointments || 0,
        ongoingAppointments: response.data.data.ongoingAppointments || 0,
        completedAppointments: response.data.data.completedAppointments || 0,
        subprofiles: response.data.data.subprofiles || 0
      }
    };
  } catch (error) {
    console.error('Stats API Error:', error);
    if (error.response) {
      // If it's an authentication error, clear storage and redirect
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.href = '/login';
        throw new Error('Authentication failed');
      }
      throw new Error(error.response.data?.message || 'Failed to fetch stats');
    }
    throw new Error('Network error occurred while fetching stats');
  }
}; 