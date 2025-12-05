import api from "./axios";
import { BASE_URL, getAuthHeaders, API_ENDPOINTS } from "./config";

export const medicalHistoryService = {
  getAllMedicalHistory: async (searchQuery = '') => {
    try {
      console.log('Fetching medical histories with search:', searchQuery);
      
      const response = await api.get(
        `${API_ENDPOINTS.MEDICAL_HISTORY.LIST}${searchQuery ? `?search=${searchQuery}` : ''}`,
        { headers: getAuthHeaders() }
      );
      
      if (response?.data?.status === 'success' && response?.data?.data) {
        return response.data;
      }
      
      throw new Error('Invalid response structure from API');
    } catch (error) {
      console.error('Error fetching medical histories:', error);
      throw error;
    }
  },

  getMedicalHistoryById: async (memberId) => {
    try {
      if (!memberId) {
        throw new Error('Member ID is required');
      }

      console.log('Fetching medical history for member:', memberId);
      
      const response = await api.get(
        `${API_ENDPOINTS.MEDICAL_HISTORY.LIST}/${memberId}`,
        { headers: getAuthHeaders() }
      );
      
      if (response?.data?.status === 'success' && response?.data?.data) {
        return response.data;
      }
      
      throw new Error('Invalid response structure from API');
    } catch (error) {
      console.error('Error fetching medical history:', error);
      throw error;
    }
  },

  updateMedicalHistory: async (memberId, data) => {
    try {
      if (!memberId) {
        throw new Error('Member ID is required');
      }

      console.log('Updating medical history for member:', memberId, data);
      
      const response = await api.patch(
        `${API_ENDPOINTS.MEDICAL_HISTORY.UPDATE}/${memberId}`,
        data,
        { headers: getAuthHeaders() }
      );
      
      if (response?.data?.status === 'success' && response?.data?.data) {
        return response.data;
      }
      
      throw new Error('Invalid response structure from API');
    } catch (error) {
      console.error('Error updating medical history:', error);
      throw error;
    }
  }
};

export default medicalHistoryService;
