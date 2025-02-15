import { NextResponse } from 'next/server';
import { API_ENDPOINTS } from '@/app/config/api';

async function getAuthToken(request: Request) {
    const authHeader = request.headers.get('Authorization');
    return authHeader?.replace('Bearer ', '');
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const token = await getAuthToken(request);
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const response = await fetch(`${API_ENDPOINTS.NOTES}/${params.id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const note = await response.json();
        return NextResponse.json({ note });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const token = await getAuthToken(request);
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const response = await fetch(`${API_ENDPOINTS.NOTES}/${params.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const updatedNote = await response.json();
        return NextResponse.json({ note: updatedNote });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const token = await getAuthToken(request);
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const response = await fetch(`${API_ENDPOINTS.NOTES}/${params.id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        );
    }
} 