'use client';

import { Note } from '@/app/types/note';
import { useRouter } from 'next/navigation';

interface NoteGridProps {
    notes: Note[];
    isLoading: boolean;
    total?: number;
}

export function NoteGrid({ notes, isLoading, total }: NoteGridProps) {
    if (isLoading) {
        return (
            <div
                className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400"
                data-oid="p-61o_8"
            >
                Loading notes...
            </div>
        );
    }

    if (notes.length === 0) {
        return (
            <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                No notes found matching your criteria.
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                    <NoteCard key={note.id} note={note} data-oid=":4lhuho" />
                ))}
            </div>
            {total && total > notes.length && (
                <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Showing {notes.length} of {total} notes
                </div>
            )}
        </>
    );
}

function NoteCard({ note }: { note: Note }) {
    const router = useRouter();

    const goToDetail = () => {
        router.push(`/note/${note.id}`);
    }
    
    return (
        <>
            <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group cursor-pointer hover:-translate-y-1"
                data-oid="1nh84f2"
                onClick={goToDetail}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {note.title}
                        </h3>
                    </div>
                </div>
                <NoteContent note={note} data-oid="uzbh1ms" />
            </div>
        </>
    );
}

function NoteContent({ note }: { note: Note }) {
    const router = useRouter();

    const getPlainTextContent = (htmlContent: string) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        return tempDiv.textContent || tempDiv.innerText || '';
    };


    const truncateText = (text: string, maxLength: number = 150) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };


    const handlePinNote = async (e: React.MouseEvent) => {
        e.stopPropagation(); 
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`/api/notes/${note.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isPinned: !note.isPinned
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update note');
            }

        } catch (error) {
            console.error('Error pinning note:', error);
        } finally {
            router.refresh();
        }
    };

    return (
        <>
            <p className="text-gray-600 dark:text-gray-300 mb-4" data-oid="vni.l0p">
                {truncateText(getPlainTextContent(note.content))}
            </p>
            <div className="flex flex-wrap gap-2 mb-4" data-oid="mil7ul3">
                {note.tags &&
                    note.tags.length > 0 &&
                    note.tags?.map((tag) => (
                        <span
                            key={tag.id}
                            className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                            data-oid=".amkr5t"
                        >
                            #{tag.name}
                        </span>
                    ))}
            </div>
            {note.reminderDate && (
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2" data-oid="w_pg0.-">
                    🔔 Reminder: {new Date(note.reminderDate).toLocaleDateString()}
                </div>
            )}
            <div
                className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400"
                data-oid="jc0jat4"
            >
                <span data-oid="57ron--">
                    Updated {new Date(note.updatedAt).toLocaleDateString()}
                </span>
                <div className="flex items-center space-x-2" data-oid="d-vuj.e">
                    <button
                        className="hover:text-purple-600 dark:hover:text-purple-400"
                        data-oid=":uwbkc:"
                        onClick={handlePinNote}
                    >
                        {note.isPinned ? (
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                data-oid="31_xfp1"
                            >
                                <path
                                    d="M16 12V4h1a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2h1v8l-2 2v2h5.2v6h2.6v-6H19v-2l-2-2z"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                data-oid="31_xfp1"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 12V4h1a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2h1v8l-2 2v2h5.2v6h2.6v-6H19v-2l-2-2z"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}