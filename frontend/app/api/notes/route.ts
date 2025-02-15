import { NextResponse } from 'next/server';
import { API_ENDPOINTS } from '@/app/config/api';

export async function GET(request: Request) {
    try {
        const token = request.headers.get('Authorization');
        if (!token) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        // Get search parameters from URL
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '9');
        const search = searchParams.get('search') || '';
        const tags = searchParams.getAll('tags');
        const onlyArchived = searchParams.get('onlyArchived') === 'true';

        // Construct API URL with search parameters
        const apiUrl = new URL(API_ENDPOINTS.NOTES);
        apiUrl.searchParams.set('page', page.toString());
        apiUrl.searchParams.set('limit', limit.toString());
        if (search) {
            apiUrl.searchParams.set('search', search);
        }
        tags.forEach((tag) => apiUrl.searchParams.append('tags', tag));
        if (onlyArchived) {
            apiUrl.searchParams.set('onlyArchived', onlyArchived.toString());
        }
        const response = await fetch(apiUrl.toString(), {
            headers: {
                Authorization: token,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API error: ${response.status} ${errorText}`);
        }

        const data = await response.json();

        return NextResponse.json({
            success: true,
            notes: data.notes,
            pagination: {
                page: page,
                limit: limit,
                total: data.pagination?.total,
                totalPages: data.pagination?.totalPages,
            },
        });
    } catch (error) {
        console.error('Error in GET /api/notes:', error);
        const status = error instanceof Error && error.message.includes('401') ? 401 : 500;
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch notes',
            },
            { status },
        );
    }
}

export async function POST(request: Request) {
    console.log('POST /api/notes called');
    try {
        const token = request.headers.get('Authorization');
        console.log('Token status:', token ? 'Present' : 'Missing');

        if (!token) {
            console.log('No token found, returning 401');
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const noteData = await request.json();
        console.log('Note data:', noteData);

        console.log('Making request to:', API_ENDPOINTS.NOTES);
        const response = await fetch(API_ENDPOINTS.NOTES, {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData),
        });

        console.log('API Response status:', response.status);
        const responseText = await response.text();
        console.log('API Response body:', responseText);

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${responseText}`);
        }

        const note = JSON.parse(responseText);
        return NextResponse.json({ success: true, note });
    } catch (error) {
        console.error('Error in POST /api/notes:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to create note',
            },
            { status: 500 },
        );
    }
}
