'use client';

import { Note } from '@/app/types/note';
import { useRouter } from 'next/navigation';
import { useNotes } from '@/app/contexts/NotesContext';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useCallback } from 'react';

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
    const { handleArchiveNote, handlePinNote } = useNotes();

    const goToDetail = () => {
        router.push(`/note/${note.id}`);
    };

    const handleArchive = async (e: React.MouseEvent) => {
        e.stopPropagation();
        await handleArchiveNote(note.id, !note.isArchived);
    };

    const onPinNote = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();
        await handlePinNote(note.id, !note.isPinned);
    }, [note.id, note.isPinned, handlePinNote]);

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group cursor-pointer hover:-translate-y-1"
            onClick={goToDetail}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {note.title}
                    </h3>
                </div>
                <Menu as="div" className="relative">
                    <Menu.Button
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                        </svg>
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={onPinNote}
                                            className={`${
                                                active
                                                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                                                    : 'text-gray-700 dark:text-gray-300'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            {note.isPinned ? (
                                                <>
                                                    <svg
                                                        className="w-5 h-5 mr-2"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M16 12V4h1a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2h1v8l-2 2v2h5.2v6h2.6v-6H19v-2l-2-2z" />
                                                    </svg>
                                                    Unpin
                                                </>
                                            ) : (
                                                <>
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
                                                            d="M16 12V4h1a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2h1v8l-2 2v2h5.2v6h2.6v-6H19v-2l-2-2z"
                                                        />
                                                    </svg>
                                                    Pin
                                                </>
                                            )}
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={handleArchive}
                                            className={`${
                                                active
                                                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                                                    : 'text-gray-700 dark:text-gray-300'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            {note.isArchived ? (
                                                <>
                                                    <svg
                                                        className="w-5 h-5 mr-2"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                                    </svg>
                                                    Unarchive
                                                </>
                                            ) : (
                                                <>
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
                                                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                                        />
                                                    </svg>
                                                    Archive
                                                </>
                                            )}
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <NoteContent note={note} />
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                <span>Updated {new Date(note.updatedAt).toLocaleDateString()}</span>
                <div className="flex items-center space-x-2">
                    {note.isPinned && (
                        <span className="flex items-center text-purple-600 dark:text-purple-400">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M16 12V4h1a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2h1v8l-2 2v2h5.2v6h2.6v-6H19v-2l-2-2z" />
                            </svg>
                            Pinned
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

function NoteContent({ note }: { note: Note }) {
    const getPlainTextContent = (htmlContent: string) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const truncateText = (text: string, maxLength: number = 150) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
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
        </>
    );
}
