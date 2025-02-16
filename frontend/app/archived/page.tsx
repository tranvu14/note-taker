'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../components/Header/Header';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { NoteGrid } from '../components/Notes/NoteGrid';
import { useAuth } from '../hooks/useAuth';
import { useNotes } from '../hooks/useNotes';
import { useDarkMode } from '../hooks/useDarkMode';

export default function ArchivedNotesPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading, user, handleSignOut } = useAuth();
    const { notes, notesLoading, pagination, searchNotes } = useNotes();
    const [currentPage, setCurrentPage] = useState(1);
    const notesPerPage = 9;
    const { darkMode, toggleDarkMode } = useDarkMode();

    const [showSidebar, setShowSidebar] = useState(true);

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            router.replace('/');
        } else if (isAuthenticated) {
            searchNotes('', [], currentPage, notesPerPage, true);
        }
    }, [isAuthenticated, isLoading, router, searchNotes, currentPage, notesPerPage]);


    return (
        <div
            className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark:bg-gray-900' : 'bg-gray-50'}`}
        >
            <Header
                user={user}
                darkMode={darkMode}
                isAuthenticated={isAuthenticated}
                onToggleSidebar={() => setShowSidebar(!showSidebar)}
                onToggleDarkMode={toggleDarkMode}
                onSignOut={handleSignOut}
            />

            <div className="pt-16 md:flex">
                <Sidebar
                    showSidebar={showSidebar}
                    activeTab="archived"
                    onTabChange={(tab) => {
                        if (tab !== 'archived') {
                            router.push(`/${tab.replace(' ', '')}`);
                        }
                    }}
                />

                <main
                    className={`flex-1 transition-all duration-300  pt-[3.5rem] pb-24 md:py-0 ${showSidebar ? 'md:ml-64' : 'md:ml-0'}`}
                >
                    <div className="container mx-auto px-6 py-8">
                        <NoteGrid
                            notes={notes.filter((note) => note.isArchived)}
                            isLoading={notesLoading}
                            total={pagination?.total}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}
