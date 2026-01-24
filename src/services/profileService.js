import api from './axios';
import { BASE_URL, getAuthHeaders, getMultipartHeaders, API_ENDPOINTS } from './config';
//import api from './api';
export const profileService = {
  getProfile: async () => {
    try {
      const response = await api.get('/members/profile');
      console.log("getProfile")
      console.log(response)
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      // Get userId from auth credentials
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.userId;
      
      if (!userId) {
        throw new Error('User ID not found');
      }

      // Format the data according to API requirements
      const formattedData = {
        name: profileData.name,
        phone: profileData.phoneNumber, // Map phoneNumber to phone
        dob: profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toISOString() : undefined, // Convert to ISO string
        gender: profileData.gender,
        profilePic: profileData.profilePic // Use the imageUrl directly from upload response
      };

      // Remove undefined fields
      Object.keys(formattedData).forEach(key => 
        formattedData[key] === undefined && delete formattedData[key]
      );

      const response = await api.put(`/api/v1/users`, formattedData);//admins
      return response;
    } catch (error) {
      throw error;
    }
  }
};

// export const getMemberProfile = async () => {
//   try {
//     const headers = getAuthHeaders();
//     console.log("START");
//     console.log(api.get());
//          console.log(API_ENDPOINTS);
//      console.log(API_ENDPOINTS.PROFILE.GET);
//     console.log("END");
//     //${BASE_URL}
    
//     const response = await api.get(`${API_ENDPOINTS.PROFILE.GET}`, { headers });
//      console.log("START 1");
//      console.log(API_ENDPOINTS);
//      console.log(PROFILE);
//     console.log(response.data);
    
//     console.log("END 1");

//     // Check for error in response
//     if (response.data.error) {
//       throw new Error(response.data.error);
//     }

//     // Check for valid data
//     if (!response.data.data) {
//       throw new Error('No profile data received');
//     }

//     return response.data;
//   } catch (error) {
//     console.error('Get Member Profile Error:', error);

//     // Handle authentication errors
//     if (error.response?.status === 401) {
//       localStorage.removeItem('accessToken');
//       throw new Error('Session expired. Please login again.');
//     }

//     // Handle other API errors
//     if (error.response?.data) {
//       throw new Error(error.response.data.error || error.response.data.message || 'Failed to fetch profile');
//     }

//     // Handle network errors
//     throw new Error(error.message || 'Network error occurred');
//   }
// };
export const getMemberProfile = async () => {
  try {
    const headers = getAuthHeaders();

    console.log("API BASE:", import.meta.env.VITE_API_URL);
    console.log("PROFILE ENDPOINT:", API_ENDPOINTS.PROFILE.GET);

    const response = await api.get(
      API_ENDPOINTS.PROFILE.GET,
      { headers }
    );

    // ✅ return actual data safely
    return response.data;

  } catch (error) {
    console.error("Get Member Profile Error:", error);

    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      throw new Error("Session expired. Please login again.");
    }

    throw new Error(
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch profile"
    );
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

    const response = await api.put(`${BASE_URL}${API_ENDPOINTS.PROFILE.UPDATE}`, requestData, { headers });
    
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
    const response = await api.post(`${BASE_URL}/media/upload`, formData, { headers });
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
    const response = await api.post(
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
    const response = await api.put(
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
    const response = await api.get(`${BASE_URL}${API_ENDPOINTS.NAVIGATORS.DETAILS}`, { headers });
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
    const response = await api.get(`${BASE_URL}${API_ENDPOINTS.DOCTORS.DETAILS}`, { headers });
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