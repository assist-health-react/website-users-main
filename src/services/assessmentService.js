import axios from "./axios";
import { BASE_URL, getAuthHeaders, API_ENDPOINTS } from "./config";

// Get all assessments
export const getAssessments = async (filters = {}) => {
  try {
    const url = new URL(`${BASE_URL}${API_ENDPOINTS.ASSESSMENTS.LIST}`);
    
    // Add any filters to the URL as query parameters
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        url.searchParams.append(key, filters[key]);
      }
    });

    const response = await axios.get(url.toString(), {
      headers: getAuthHeaders(),
    });

    if (response.data?.status === "success" && response.data?.data) {
      return response.data.data;
    }
    
    return [];
  } catch (error) {
    console.error('Get assessments error:', error.response || error);
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to fetch assessments');
    }
    throw new Error('Network error occurred while fetching assessments');
  }
};

// Get assessment by ID
export const getAssessmentById = async (assessmentId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${API_ENDPOINTS.ASSESSMENTS.GET(assessmentId)}`,
      {
        headers: getAuthHeaders(),
      }
    );

    if (response.data?.status === "success" && response.data?.data) {
      return response.data.data;
    }
    
    throw new Error('Assessment not found');
  } catch (error) {
    console.error('Get assessment error:', error.response || error);
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to fetch assessment');
    }
    throw new Error('Network error occurred while fetching assessment');
  }
};

// Create new assessment
export const createAssessment = async (assessmentData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${API_ENDPOINTS.ASSESSMENTS.CREATE}`,
      assessmentData,
      {
        headers: getAuthHeaders(),
      }
    );

    if (response.data?.status === "success" && response.data?.data) {
      return response.data.data;
    }
    
    throw new Error('Failed to create assessment');
  } catch (error) {
    console.error('Create assessment error:', error.response || error);
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to create assessment');
    }
    throw new Error('Network error occurred while creating assessment');
  }
};

// Update assessment
export const updateAssessment = async (assessmentId, assessmentData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}${API_ENDPOINTS.ASSESSMENTS.UPDATE(assessmentId)}`,
      assessmentData,
      {
        headers: getAuthHeaders(),
      }
    );

    if (response.data?.status === "success" && response.data?.data) {
      return response.data.data;
    }
    
    throw new Error('Failed to update assessment');
  } catch (error) {
    console.error('Update assessment error:', error.response || error);
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to update assessment');
    }
    throw new Error('Network error occurred while updating assessment');
  }
};

// Delete assessment
export const deleteAssessment = async (assessmentId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}${API_ENDPOINTS.ASSESSMENTS.DELETE(assessmentId)}`,
      {
        headers: getAuthHeaders(),
      }
    );

    if (response.data?.status === "success") {
      return true;
    }
    
    throw new Error('Failed to delete assessment');
  } catch (error) {
    console.error('Delete assessment error:', error.response || error);
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to delete assessment');
    }
    throw new Error('Network error occurred while deleting assessment');
  }
};
