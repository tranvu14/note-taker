'use client';

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { Note, RequestNote } from '@/app/types/note';
import { debounce } from 'lodash';

interface PaginationData {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

interface NotesContextType {
    notes: Note[];
    notesLoading: boolean;
    saveLoading: boolean;
    error: string | null;
    pagination: PaginationData;
    fetchNotes: (page?: number, limit?: number) => Promise<void>;
    searchNotes: (query: string, tags: string[], page?: number, limit?: number, archived?: boolean) => Promise<void>;
    handleSaveNote: (noteData: RequestNote) => Promise<boolean>;
    handleArchiveNote: (noteId: string, archive: boolean) => Promise<boolean>;
    handlePinNote: (noteId: string, isPinned: boolean) => Promise<void>;
    fetchNoteById: (noteId: string) => Promise<Note>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [notesLoading, setNotesLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<PaginationData>({
        page: 1,
        limit: 9,
        total: 0,
        totalPages: 1,
    });

    const fetchNotes = useCallback(async (page: number = 1, limit: number = 9) => {
        setNotesLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No auth token found');
            }

            const response = await fetch(`/api/notes?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }

            const data = await response.json();
            setNotes(data.notes);
            setPagination(data.pagination);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
            console.error('Failed to fetch notes:', error);
        } finally {
            setNotesLoading(false);
        }
    }, []);

    const searchNotes = useCallback(
        async (query: string, tags: string[], page: number = 1, limit: number = 9, archived?: boolean) => {
            setNotesLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error('No auth token found');
                }

                const searchParams = new URLSearchParams({
                    page: page.toString(),
                    limit: limit.toString(),
                });

                if (query) {
                    searchParams.append('search', query);
                }

                if (tags.length > 0) {
                    tags.forEach((tag) => searchParams.append('tags', tag));
                }

                if (archived !== undefined) {
                    searchParams.append('onlyArchived', archived.toString());
                }

                const response = await fetch(`/api/notes?${searchParams.toString()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch notes');
                }

                const data = await response.json();
                setNotes(data.notes);
                setPagination(data.pagination);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred');
                console.error('Failed to search notes:', error);
            } finally {
                setNotesLoading(false);
            }
        },
        [],
    );

    const debouncedSearch = useMemo(
        () => 
            (...args: Parameters<typeof searchNotes>) => 
                Promise.resolve(debounce(searchNotes, 300)(...args)),
        [searchNotes]
    );

    const handleSaveNote = useCallback(async (noteData: RequestNote) => {
        setSaveLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/notes', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteData),
            });

            const data = await response.json();

            if (data.success) {
                setNotes((prev) => [data.note, ...prev]);
                return true;
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Failed to save note:', error);
            setError(error instanceof Error ? error.message : 'Failed to save note');
            return false;
        } finally {
            setSaveLoading(false);
        }
    }, []);

    const handleArchiveNote = useCallback(async (noteId: string, archive: boolean) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`/api/notes/${noteId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isArchived: archive }),
            });

            if (!response.ok) {
                throw new Error('Failed to archive note');
            }

            // Update the notes list locally and refresh
            await fetchNotes(pagination.page, pagination.limit);
            return true;
        } catch (error) {
            console.error('Error archiving note:', error);
            return false;
        }
    }, [fetchNotes, pagination]);

    const handlePinNote = useCallback(async (noteId: string, isPinned: boolean) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`/api/notes/${noteId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isPinned,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update note');
            }

            // Refresh the notes list
            await fetchNotes(pagination.page, pagination.limit);
        } catch (error) {
            console.error('Error pinning note:', error);
        }
    }, [fetchNotes, pagination]);

    const fetchNoteById = useCallback(async (noteId: string) => {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`/api/notes/${noteId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch note');
        }

        const data = await response.json();
        return data.note;
    }, []);

    const value = {
        notes,
        notesLoading,
        saveLoading,
        error,
        pagination,
        fetchNotes,
        searchNotes: debouncedSearch,
        handleSaveNote,
        handleArchiveNote,
        handlePinNote,
        fetchNoteById,
    };

    return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotes() {
    const context = useContext(NotesContext);
    if (context === undefined) {
        throw new Error('useNotes must be used within a NotesProvider');
    }
    return context;
} 