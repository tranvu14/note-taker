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
        if (!isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

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

    const handleUpdateNote = async (updatedNote: Partial<Note>) => {
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
            className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark:bg-gray-900' : 'bg-gray-50'}`}
            data-oid="l17mf8g"
        >
            <Header
                user={user}
                darkMode={darkMode}
                showSidebar={false}
                isAuthenticated={isAuthenticated}
                onToggleSidebar={() => {}}
                onToggleDarkMode={toggleDarkMode}
                onSignOut={handleSignOut}
                data-oid="bz6asvu"
            />

            <main className="pt-16 container mx-auto px-6 py-8" data-oid="ab_c3lu">
                {isEditing ? (
                    <NoteEditor
                        note={note}
                        onClose={() => setIsEditing(false)}
                        onSave={handleUpdateNote}
                        data-oid="lcoz.8b"
                    />
                ) : (
                    <div
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                        data-oid="p1p:f9w"
                    >
                        <div className="flex justify-between items-start mb-6" data-oid="0uc9xoy">
                            <div data-oid="r6rh5.:">
                                <h1
                                    className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                                    data-oid="qz266i8"
                                >
                                    {note.title}
                                </h1>
                                <div className="flex flex-wrap gap-2 mb-4" data-oid="t52s.52">
                                    {note.tags.map((tag) => (
                                        <span
                                            key={tag.id}
                                            className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                                            data-oid="345i4y5"
                                        >
                                            #{tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-2" data-oid="5b3bn6:">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white"
                                    data-oid="5nktuld"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDeleteNote}
                                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                                    data-oid="8dlw31w"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div
                            className="prose dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: note.content }}
                            data-oid="bqi_enh"
                        />

                        <div
                            className="mt-6 text-sm text-gray-500 dark:text-gray-400"
                            data-oid="io:rtr0"
                        >
                            Last updated: {new Date(note.updatedAt).toLocaleString()}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
