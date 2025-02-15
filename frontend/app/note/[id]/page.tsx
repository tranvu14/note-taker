'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/Header/Header';
import { NoteEditor } from '@/app/components/NoteEditor';
import { useAuth } from '@/app/hooks/useAuth';
import { useDarkMode } from '@/app/hooks/useDarkMode';
import { Note } from '@/app/types/note';

export default function NotePage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { isAuthenticated, user, handleSignOut } = useAuth();
    const { darkMode, toggleDarkMode } = useDarkMode();
    const [note, setNote] = useState<Note | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            fetchNote();
        }
    }, [params.id, isAuthenticated]);

    const fetchNote = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`/api/notes/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch note');
            }

            const data = await response.json();
            setNote(data.note);
        } catch (error) {
            setError('Failed to load note');
            console.error('Error fetching note:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateNote = async (updatedNote: {
        title: string;
        content: string;
        isPinned?: boolean;
        tags?: string[];
        reminderDate?: string;
    }) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`/api/notes/${params.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedNote),
            });

            if (!response.ok) {
                throw new Error('Failed to update note');
            }

            const data = await response.json();
            setNote(data.note);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const handleDeleteNote = async () => {
        if (!window.confirm('Are you sure you want to delete this note?')) {
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`/api/notes/${params.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete note');
            }

            router.push('/');
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    if (isLoading) {
        return (
            <div
                className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center"
                data-oid="wrg4002"
            >
                <div
                    className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"
                    data-oid="o.vma7w"
                ></div>
            </div>
        );
    }

    if (error || !note) {
        return (
            <div
                className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center"
                data-oid="3g047su"
            >
                <div className="text-center" data-oid="5kwgfyg">
                    <h2
                        className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                        data-oid="5slv-kn"
                    >
                        {error || 'Note not found'}
                    </h2>
                    <button
                        onClick={() => router.push('/')}
                        className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white"
                        data-oid="6z1d._r"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`min-h-screen transition-colors duration-300 ${
                darkMode ? 'dark:bg-gray-900' : 'bg-gray-50'
            }`}
        >
            <Header
                user={user}
                darkMode={darkMode}
                showSidebar={false}
                isAuthenticated={isAuthenticated}
                onToggleSidebar={() => {}}
                onToggleDarkMode={toggleDarkMode}
                onSignOut={handleSignOut}
            />

            <main className="pt-16 container mx-auto px-6 py-8">
                <div className="mb-6 mt-16">
                    <button
                        onClick={() => router.push('/notes')}
                        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Back to Notes
                    </button>
                </div>

                {isEditing ? (
                    <NoteEditor
                        note={note}
                        onClose={() => setIsEditing(false)}
                        onSave={handleUpdateNote}
                    />
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    {note.title}
                                </h1>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {note.tags.map((tag) => (
                                        <span
                                            key={tag.id}
                                            className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 transition-colors"
                                        >
                                            #{tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300 flex items-center"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                        />
                                    </svg>
                                    Edit
                                </button>
                                <button
                                    onClick={handleDeleteNote}
                                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors duration-300 flex items-center"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className="prose dark:prose-invert max-w-none mb-6">
                            <div dangerouslySetInnerHTML={{ __html: note.content }} />
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 border-t dark:border-gray-700 pt-4 mt-6">
                            <span>Last updated: {new Date(note.updatedAt).toLocaleString()}</span>
                            {note.reminderDate && (
                                <span className="flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    Reminder: {new Date(note.reminderDate).toLocaleDateString()}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
