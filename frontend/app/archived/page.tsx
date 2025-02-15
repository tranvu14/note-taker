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
    const { darkMode, toggleDarkMode } = useDarkMode();

    const [showSidebar, setShowSidebar] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            router.replace('/');
        }
    }, [isAuthenticated, isLoading, router]);

    useEffect(() => {
        if (isAuthenticated) {
            searchNotes(searchQuery, selectedTags, currentPage, 9, true);
        }
    }, [isAuthenticated, searchNotes, searchQuery, selectedTags, currentPage]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark:bg-gray-900' : 'bg-gray-50'}`}>
            <Header
                user={user}
                darkMode={darkMode}
                showSidebar={showSidebar}
                isAuthenticated={isAuthenticated}
                onToggleSidebar={() => setShowSidebar(!showSidebar)}
                onToggleDarkMode={toggleDarkMode}
                onSignOut={handleSignOut}
            />

            <div className="pt-16 flex">
                <Sidebar
                    showSidebar={showSidebar}
                    activeTab="archived"
                    onNewNote={() => {}}
                    onTabChange={(tab) => {
                        if (tab !== 'archived') {
                            router.push(`/${tab.replace(' ', '')}`);
                        }
                    }}
                />

                <main className={`flex-1 transition-all duration-300 ${showSidebar ? 'ml-64' : 'ml-0'}`}>
                    <div className="container mx-auto px-6 py-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Archived Notes
                        </h1>
                        <NoteGrid 
                            notes={notes.filter(note => note.isArchived)} 
                            isLoading={notesLoading} 
                            total={pagination?.total} 
                        />
                    </div>
                </main>
            </div>
        </div>
    );
} 