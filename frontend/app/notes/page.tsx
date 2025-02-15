'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../components/Header/Header';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { NoteGrid } from '../components/Notes/NoteGrid';
import { NoteEditor } from '../components/NoteEditor';
import { useAuth } from '../hooks/useAuth';
import { useNotes } from '../hooks/useNotes';
import { useDarkMode } from '../hooks/useDarkMode';
import { RequestNote } from '../types/note';

export default function NotesPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading, user, handleSignOut } = useAuth();
    const { notes, notesLoading, pagination, searchNotes, handleSaveNote } = useNotes();
    const { darkMode, toggleDarkMode } = useDarkMode();

    const [showSidebar, setShowSidebar] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [showNoteEditor, setShowNoteEditor] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const notesPerPage = 9;

    const handleToggleSidebar = useCallback(() => {
        setShowSidebar((prev) => !prev);
    }, []);

    const handleNewNote = useCallback(() => {
        setShowNoteEditor(true);
    }, []);

    const handleCloseEditor = useCallback(() => {
        setShowNoteEditor(false);
    }, []);

    const handleSaveAndClose = useCallback(
        async (note: RequestNote) => {
            const success = await handleSaveNote(note);
            if (success) {
                setShowNoteEditor(false);
            }
        },
        [handleSaveNote],
    );

    const handleTagSelection = useCallback(
        (tag: string) => {
            setSelectedTags((prev) => {
                const newTags = prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag];

                searchNotes(searchQuery, newTags, currentPage, notesPerPage);
                return newTags;
            });
        },
        [searchNotes, searchQuery, currentPage, notesPerPage],
    );

    const handleClearTags = useCallback(() => {
        setSelectedTags([]);
        searchNotes(searchQuery, [], currentPage, notesPerPage);
    }, [searchNotes, searchQuery, currentPage, notesPerPage]);

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
            searchNotes(e.target.value, selectedTags, currentPage, notesPerPage);
        },
        [searchNotes, selectedTags, currentPage, notesPerPage],
    );

    const handlePageChange = useCallback(
        (pageNumber: number) => {
            setCurrentPage(pageNumber);
            searchNotes(searchQuery, selectedTags, pageNumber, notesPerPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        [searchNotes, searchQuery, selectedTags, notesPerPage],
    );

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            router.replace('/');
        }
    }, [isAuthenticated, isLoading, router]);

    useEffect(() => {
        if (isAuthenticated) {
            searchNotes(searchQuery, selectedTags, currentPage, notesPerPage);
        }
    }, [isAuthenticated, searchNotes, searchQuery, selectedTags, currentPage, notesPerPage]);

    const uniqueTags = useMemo(() => {
        const tagSet = new Set<string>();
        notes.forEach((note) => {
            note.tags.forEach((tag) => tagSet.add(tag.name));
        });
        return Array.from(tagSet);
    }, [notes]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div
            className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark:bg-gray-900' : 'bg-gray-50'}`}
        >
            <Header
                user={user}
                darkMode={darkMode}
                isAuthenticated={isAuthenticated}
                onToggleSidebar={handleToggleSidebar}
                onToggleDarkMode={toggleDarkMode}
                onSignOut={handleSignOut}
            />

            <div className="pt-16 flex">
                <Sidebar
                    showSidebar={showSidebar}
                    activeTab={activeTab}
                    onNewNote={handleNewNote}
                    onTabChange={setActiveTab}
                />

                <main
                    className={`flex-1 transition-all duration-300 ${showSidebar ? 'ml-64' : 'ml-0'}`}
                >
                    <div className="container mx-auto px-6 py-8">
                        <div className="mb-6 space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search notes..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
                                />
                                <svg
                                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {uniqueTags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => handleTagSelection(tag)}
                                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                            selectedTags.includes(tag)
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300'
                                        }`}
                                    >
                                        #{tag}
                                    </button>
                                ))}
                                {selectedTags.length > 0 && (
                                    <button
                                        onClick={handleClearTags}
                                        className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        </div>

                        <NoteGrid notes={notes} isLoading={notesLoading} total={pagination.total} />

                        {pagination.totalPages > 1 && (
                            <div className="mt-8 flex justify-center">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handlePageChange(pagination.page - 1)}
                                        disabled={pagination.page === 1}
                                        className={`px-3 py-1 rounded-lg ${
                                            pagination.page === 1
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                                                : 'bg-purple-100 text-purple-600 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300'
                                        }`}
                                    >
                                        Previous
                                    </button>

                                    {Array.from(
                                        { length: pagination.totalPages },
                                        (_, i) => i + 1,
                                    ).map((pageNumber) => (
                                        <button
                                            key={pageNumber}
                                            onClick={() => handlePageChange(pageNumber)}
                                            className={`px-3 py-1 rounded-lg ${
                                                pagination.page === pageNumber
                                                    ? 'bg-purple-600 text-white'
                                                    : 'bg-purple-100 text-purple-600 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300'
                                            }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => handlePageChange(pagination.page + 1)}
                                        disabled={pagination.page === pagination.totalPages}
                                        className={`px-3 py-1 rounded-lg ${
                                            pagination.page === pagination.totalPages
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                                                : 'bg-purple-100 text-purple-600 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300'
                                        }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {showNoteEditor && (
                <NoteEditor onClose={handleCloseEditor} onSave={handleSaveAndClose} />
            )}
        </div>
    );
}
