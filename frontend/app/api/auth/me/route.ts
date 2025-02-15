import { API_ENDPOINTS } from "@/app/config/api";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Invalid token format' }, { status: 401 });
        }

        const token = authHeader.split('Bearer ')[1];
        if (!token) {
            return NextResponse.json({ error: 'No token provided' }, { status: 401 });
        }

        const response = await fetch(API_ENDPOINTS.AUTH.ME, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.message || 'Authentication failed' },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Auth validation error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 