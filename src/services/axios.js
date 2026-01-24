// import axios from 'axios';
// const BASE_URL = import.meta.env.VITE_API_URL ;

// const instance = axios.create({
//   baseURL: `${BASE_URL}/users/api/v1`,
//   timeout: 30000,
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   },
//   withCredentials: false // Disable sending cookies
// });

// // Add a request interceptor
// instance.interceptors.request.use(
//   (config) => {
//     // Don't add auth header for login/register endpoints
//     if (!config.url.includes('/auth/login') && !config.url.includes('/auth/register')) {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Handle specific error cases
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           // Clear auth data and redirect to login
//       localStorage.removeItem('accessToken');
//       localStorage.removeItem('refreshToken');
//       localStorage.removeItem('user');
//       localStorage.removeItem('userProfile');
//       window.location.href = '/login';
//           break;
//         case 500:
//           // For 500 errors, let the service handle them to check for validation errors
//           // Don't throw here, let the original error pass through
//           break;
//         default:
//           // For other errors, let the service handle them
//           // Don't throw here, let the original error pass through
//           break;
//       }
//     }
    
//     // Network errors
//     if (!error.response) {
//       throw new Error('Network error. Please check your internet connection.');
//     }

//     // For all other cases, reject the original error so services can handle it
//     return Promise.reject(error);
//   }
// );

// export default instance; 
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
if (!BASE_URL) {
  console.error('❌ VITE_API_URL is undefined');
}
console.log("$$$$$$$$$$$$$$$$$$")
console.log(BASE_URL)
// axios instance
const api = axios.create({
  baseURL: BASE_URL,//`${BASE_URL}/users/api/v1`,  //24.1.26
  headers: { "Content-Type": "application/json" }
});
console.log("API")
console.log(api)
// attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
