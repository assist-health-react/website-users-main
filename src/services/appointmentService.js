import axios from "./axios";
import { BASE_URL, getAuthHeaders, API_ENDPOINTS } from "./config";

// Create a new appointment
export const createAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${API_ENDPOINTS.APPOINTMENTS.CREATE}`,
      appointmentData,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error('Create appointment error:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to create appointment');
  }
};

// Get all appointments for a user
// export const getAppointments = async (status = 'all', search = '') => {
//   try {
//     const url = new URL(`${BASE_URL}${API_ENDPOINTS.APPOINTMENTS.LIST}`);
//     if (status && status !== 'all') {
//       url.searchParams.append('status', status);
//     }
//     if (search && search.trim()) {
//       url.searchParams.append('search', search.trim());
//     }

//     const response = await axios.get(url.toString(), {
//       headers: getAuthHeaders(),
//     });

//     // Ensure we return an array even if the response is empty
//     if (response.data?.data) {
//       return response.data.data;
//     }
//     return [];
//   } catch (error) {
//     if (error.response) {
//       throw new Error(error.response.data.message || 'Failed to fetch appointments');
//     }
//     throw new Error('Network error occurred');
//   }
// };
export const getAppointments = async (status = 'all', search = '') => {
  try {
    let url = `${BASE_URL}${API_ENDPOINTS.APPOINTMENTS.LIST}`;

    const params = new URLSearchParams();

    if (status && status !== 'all') {
      params.append('status', status);
    }
    if (search && search.trim()) {
      params.append('search', search.trim());
    }

    if ([...params].length) {
      url += `?${params.toString()}`;
    }

    const response = await axios.get(url, {
      headers: getAuthHeaders(),
    });

    return response.data?.data || [];
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch appointments');
    }
    throw new Error('Network error occurred');
  }
};

// Get appointment by ID
export const getAppointmentById = async (appointmentId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${API_ENDPOINTS.APPOINTMENTS.GET(appointmentId)}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch appointment details');
    }
    throw new Error('Network error occurred');
  }
};

// Update appointment
export const updateAppointment = async (appointmentId, updateData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}${API_ENDPOINTS.APPOINTMENTS.UPDATE(appointmentId)}`,
      updateData,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to update appointment');
    }
    throw new Error('Network error occurred');
  }
};

// Cancel appointment
export const cancelAppointment = async (appointmentId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}${API_ENDPOINTS.APPOINTMENTS.DELETE(appointmentId)}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to cancel appointment');
    }
    throw new Error('Network error occurred');
  }
}; 