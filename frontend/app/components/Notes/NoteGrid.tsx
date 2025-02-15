'use client';

import { Note } from '@/app/types/note';
import { useState } from 'react';
import { NoteDetail } from './NoteDetail';

interface NoteGridProps {
    notes: Note[];
    isLoading: boolean;
}

export function NoteGrid({ notes, isLoading }: NoteGridProps) {
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
            <div
                className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400"
                data-oid="a.z45.0"
            >
                No notes yet. Create your first note!
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-oid="4iing:g">
            {notes.map((note) => (
                <NoteCard key={note.id} note={note} data-oid=":4lhuho" />
            ))}
        </div>
    );
}

function NoteCard({ note }: { note: Note }) {
    const [showDetail, setShowDetail] = useState(false);

    return (
        <>
            <div
                onClick={() => setShowDetail(true)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group cursor-pointer hover:-translate-y-1"
                data-oid="1nh84f2"
            >
                <div className="flex justify-between items-start mb-4" data-oid="e1ht:uu">
                    <div className="flex items-center gap-2" data-oid="qxzeli.">
                        {note.isPinned && <PinIcon data-oid="phgbs:k" />}
                        <h3
                            className="text-lg font-semibold text-gray-800 dark:text-white"
                            data-oid="f70cge4"
                        >
                            {note.title}
                        </h3>
                    </div>
                    <NoteActions data-oid="p:pwyv:" />
                </div>
                <NoteContent note={note} data-oid="uzbh1ms" />
            </div>
            {showDetail && (
                <NoteDetail
                    note={note}
                    onClose={() => setShowDetail(false)}
                    onUpdate={(updatedNote) => {
                        console.log('Updating note:', updatedNote);
                        // Here you would typically update the note in your backend
                        setShowDetail(false);
                    }}
                    data-oid="d4fs862"
                />
            )}
        </>
    );
}

function PinIcon() {
    return (
        <svg
            className="w-4 h-4 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            data-oid="mcuc0cd"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5h14l-5 5v6l-4-3v-3l-5-5z"
                data-oid="jsperu7"
            />
        </svg>
    );
}

function NoteActions() {
    return (
        <div
            className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2"
            data-oid="4hw1oy5"
        >
            <button
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                data-oid="t-n1367"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    data-oid="a-xcxuo"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        data-oid="9n1r8a7"
                    />
                </svg>
            </button>
        </div>
    );
}

function NoteContent({ note }: { note: Note }) {
    return (
        <>
            <p className="text-gray-600 dark:text-gray-300 mb-4" data-oid="vni.l0p">
                {note.content}
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
                    >
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
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                data-oid="5cqwfwf"
                            />
                        </svg>
                    </button>
                    <button
                        className="hover:text-purple-600 dark:hover:text-purple-400"
                        data-oid="k-t14ge"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            data-oid="7n3ry83"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                data-oid="17pgr9k"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}

// Add other helper components like PinIcon, NoteActions, NoteContent...
