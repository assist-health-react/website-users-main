import axios from "./axios";
import { BASE_URL, getAuthHeaders, API_ENDPOINTS } from "./config";

export const getSubprofiles = async (searchQuery = '') => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found in localStorage');
      throw new Error('Please login again to continue');
    }

    const response = await axios.get(
      `${BASE_URL}${API_ENDPOINTS.SUBPROFILES.LIST}${searchQuery ? `?search=${searchQuery}` : ''}`,
      {
        headers: getAuthHeaders()
      }
    );

    if (response.data.message === 'success' || response.data.message === 'Subprofiles retrieved successfully') {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch subprofiles');
    }
  } catch (error) {
    console.error('Subprofiles API Error:', error);
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      throw new Error('Session expired. Please login again.');
    }
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch subprofiles');
  }
};

export const createSubprofile = async (subprofileData) => {
  try {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      console.error('No access token found in localStorage');
      throw new Error('Please login again to continue');
    }

    const response = await axios.post(
      `${BASE_URL}${API_ENDPOINTS.SUBPROFILES.CREATE}`,
      subprofileData,
      {
        headers: getAuthHeaders()
      }
    );

    // Check if the response contains an error
    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    console.error('Create Subprofile Error:', error);
    console.error('Error response data:', error.response?.data);
    console.error('Error status:', error.response?.status);

    // Handle authentication error first
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      throw new Error('Session expired. Please login again.');
    }

    // Handle validation errors (even if they come as 500)
    if (error.response?.data?.error && error.response.data.error.includes('validation failed')) {
      console.log('Validation error detected in service:', error.response.data.error);
      throw new Error(error.response.data.error);
    }

    // Handle other API errors
    if (error.response?.data) {
      const errorData = error.response.data;
      throw new Error(errorData.error || errorData.message || 'Failed to create subprofile');
    }

    // Handle other errors
    throw new Error(error.message || 'Failed to create subprofile');
  }
}; 