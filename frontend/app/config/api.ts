export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
    AUTH: {
        SIGNUP: `${API_BASE_URL}/auth/signup`,
        SIGNIN: `${API_BASE_URL}/auth/signin`,
        FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
        RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
        ME: `${API_BASE_URL}/auth/me`,
    },
    NOTES: `${API_BASE_URL}/notes`,
};
