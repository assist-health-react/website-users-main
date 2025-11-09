import axios from './axios';
import { BASE_URL, getAuthHeaders, getMultipartHeaders, API_ENDPOINTS } from './config';

export const getMemberProfile = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.PROFILE.GET}`, { headers });

    // Check for error in response
    if (response.data.error) {
      throw new Error(response.data.error);
    }

    // Check for valid data
    if (!response.data.data) {
      throw new Error('No profile data received');
    }

    return response.data;
  } catch (error) {
    console.error('Get Member Profile Error:', error);

    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      throw new Error('Session expired. Please login again.');
    }

    // Handle other API errors
    if (error.response?.data) {
      throw new Error(error.response.data.error || error.response.data.message || 'Failed to fetch profile');
    }

    // Handle network errors
    throw new Error(error.message || 'Network error occurred');
  }
};

export const updateProfile = async (data) => {
  try {
    const headers = getAuthHeaders();
    
    // Only include fields that are provided in the data object
    const requestData = {};
    
    // Optional fields - only add if they exist in data
    if (data.name !== undefined) requestData.name = data.name;
    if (data.email !== undefined) requestData.email = data.email;
    if (data.dob !== undefined) requestData.dob = data.dob;
    if (data.gender !== undefined) requestData.gender = data.gender;
    if (data.bloodGroup !== undefined) requestData.bloodGroup = data.bloodGroup;
    if (data.heightInFt !== undefined) requestData.heightInFt = parseFloat(data.heightInFt);
    if (data.weightInKg !== undefined) requestData.weightInKg = parseFloat(data.weightInKg);
    if (data.onBoarded !== undefined) requestData.onBoarded = data.onBoarded;
    if (data.profilePic !== undefined) requestData.profilePic = data.profilePic;
    if (data.termsConditionsAccepted !== undefined) requestData.termsConditionsAccepted = data.termsConditionsAccepted;
    if (data.emergencyContact !== undefined) requestData.emergencyContact = data.emergencyContact;
    if (data.address !== undefined) requestData.address = data.address;
    if (data.employmentStatus !== undefined) requestData.employmentStatus = data.employmentStatus;
    if (data.educationLevel !== undefined) requestData.educationLevel = data.educationLevel;
    if (data.maritalStatus !== undefined) requestData.maritalStatus = data.maritalStatus;
    if (data.additionalInfo !== undefined) requestData.additionalInfo = data.additionalInfo;

    const response = await axios.put(`${BASE_URL}${API_ENDPOINTS.PROFILE.UPDATE}`, requestData, { headers });
    
    // Return a standardized response format
    return {
      success: true,
      data: response.data,
      message: response.data.message || 'Profile updated successfully'
    };
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
      throw new Error('Authentication failed');
    }
    throw new Error(error.response?.data?.message || 'Failed to update profile');
  }
};

export const uploadMedia = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const headers = getMultipartHeaders();
    const response = await axios.post(`${BASE_URL}/media/upload`, formData, { headers });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to upload media');
    }
    throw new Error('Network error occurred');
  }
};

export const acceptTerms = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/members/accept-terms`,
      { termsConditionsAccepted: true },
      { headers }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
      throw new Error('Authentication failed');
    }
    throw new Error(error.response?.data?.message || 'Failed to accept terms and conditions');
  }
};

export const addAddress = async (address) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(
      `${BASE_URL}${API_ENDPOINTS.PROFILE.UPDATE}`,
      { address: [address] },
      { headers }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
      throw new Error('Authentication failed');
    }
    throw new Error(error.response?.data?.message || 'Failed to add address');
  }
};

export const getNavigatorDetails = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.NAVIGATORS.DETAILS}`, { headers });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
      throw new Error('Authentication failed');
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch navigator details');
  }
};

export const getDoctorDetails = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.DOCTORS.DETAILS}`, { headers });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
      throw new Error('Authentication failed');
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch doctor details');
  }
};