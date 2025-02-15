'use client';

import { useState, useCallback } from 'react';
import { Note } from '@/app/types/note';

export function useNotes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [notesLoading, setNotesLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchNotes = useCallback(async () => {
        setNotesLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No auth token found');
            }

            const response = await fetch('/api/notes', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }

            const data = await response.json();
            setNotes(data.notes);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
            console.error('Failed to fetch notes:', error);
        } finally {
            setNotesLoading(false);
        }
    }, []);

    const handleSaveNote = useCallback(async (noteData: {
        title: string;
        content: string;
        isPinned?: boolean;
        isArchived?: boolean;
        tagIds?: string[];
        reminderDate?: string;
    }) => {
        setSaveLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteData),
            });

            const data = await response.json();

            if (data.success) {
                setNotes(prev => [data.note, ...prev]);
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

    return {
        notes,
        notesLoading,
        saveLoading,
        error,
        fetchNotes,
        handleSaveNote,
    };
} 