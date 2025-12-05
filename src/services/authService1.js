import axios from './axios';

const AUTH_ENDPOINTS = {
    LOGIN: '/auth/login',
    VERIFY_OTP: '/auth/verify-otp'
};

export const loginWithPhone = async (identifier) => {
    try {
        let payload;

        // Check if the identifier is a phone number or member ID
        if (typeof identifier === 'string' && identifier.startsWith('+91')) {
            // Validate phone number format
            if (identifier.length !== 13) {
                throw new Error('Invalid phone number format. Must start with +91 and be 10 digits.');
            }
            payload = { phoneNumber: identifier };
        } else {
            // Treat as member ID
            payload = { memberId: identifier };
        }

        const response = await axios.post(AUTH_ENDPOINTS.LOGIN, payload);
        
        if (!response.data) {
            throw new Error('No response from server');
        }

        return response.data;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
};

export const verifyOTP = async (identifier, otp, memberId = null, phoneNumber = null) => {
    try {
        let payload = { otp };
        
        // Check if identifier is phone number or member ID
        if (typeof identifier === 'string' && identifier.startsWith('+91')) {
            // Phone number login case
            payload = {
                phoneNumber: identifier,
                otp: otp
            };
            if (memberId) {
                payload.memberId = memberId;
            }
        } else {
            // Member ID login case
            payload = {
                memberId: identifier,
                otp: otp,
                phoneNumber: phoneNumber
            };
        }

        const response = await axios.post(
            AUTH_ENDPOINTS.VERIFY_OTP,
            payload
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Something went wrong' };
    }
}; 