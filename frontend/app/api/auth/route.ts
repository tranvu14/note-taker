import { NextResponse } from 'next/server';
import { API_ENDPOINTS } from '@/app/config/api';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action = 'signin', ...data } = body;

        let endpoint;
        switch (action) {
            case 'signup':
                endpoint = API_ENDPOINTS.AUTH.SIGNUP;
                break;
            case 'signin':
                endpoint = API_ENDPOINTS.AUTH.SIGNIN;
                break;
            case 'forgot-password':
                endpoint = API_ENDPOINTS.AUTH.FORGOT_PASSWORD;
                break;
            case 'reset-password':
                endpoint = API_ENDPOINTS.AUTH.RESET_PASSWORD;
                break;
            default:
                return NextResponse.json(
                    { success: false, error: 'Invalid action' },
                    { status: 400 },
                );
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: result.message || 'Authentication failed' },
                { status: response.status },
            );
        }

        return NextResponse.json({ success: true, ...result });
    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 },
        );
    }
}
