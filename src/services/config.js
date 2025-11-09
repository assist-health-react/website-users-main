const URL = import.meta.env.VITE_API_URL ;
export const BASE_URL = `https://${URL}/users/api/v1`;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_OTP: '/auth/verify-otp',
    RESEND_OTP: '/auth/resend-otp',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  PROFILE: {
    GET: '/members/profile',
    UPDATE: '/members/profile',
    UPLOAD_PHOTO: '/members/profile/photo',
  },
  APPOINTMENTS: {
    LIST: '/appointments',
    CREATE: '/appointments',
    GET: (id) => `/appointments/${id}`,
    UPDATE: (id) => `/appointments/${id}`,
    DELETE: (id) => `/appointments/${id}`,
  },
  MEDICAL_HISTORY: {
    LIST: '/medical-history',
    CREATE: '/medical-history',
    UPDATE: '/medical-history',
    DELETE: '/medical-history',
  },
  SUBPROFILES: {
    LIST: '/subprofiles',
    CREATE: '/subprofiles',
    UPDATE: '/subprofiles',
    DELETE: '/subprofiles',
  },
  NAVIGATORS: {
    DETAILS: '/members/profile'
  },
  DOCTORS: {
    DETAILS: '/members/profile'
  },
  STATS: '/stats',
  MEMBERSHIP_CARD: '/membership-card',
  ASSESSMENTS: {
    LIST: '/students/assessments',
    CREATE: '/students/assessments',
    GET: (id) => `/students/assessments/${id}`,
    UPDATE: (id) => `/students/assessments/${id}`,
    DELETE: (id) => `/students/assessments/${id}`,
  },
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const getMultipartHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Authorization': `Bearer ${token}`,
  };
}; 