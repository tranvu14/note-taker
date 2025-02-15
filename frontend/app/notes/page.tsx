'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../components/Header/Header';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { NoteGrid } from '../components/Notes/NoteGrid';
import { NoteEditor } from '../components/NoteEditor';
import { useAuth } from '../hooks/useAuth';
import { useNotes } from '../hooks/useNotes';
import { useDarkMode } from '../hooks/useDarkMode';

export default function NotesPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading, user, handleSignOut } = useAuth();
    const { notes, notesLoading, fetchNotes, handleSaveNote } = useNotes();
    const { darkMode, toggleDarkMode } = useDarkMode();

    const [showSidebar, setShowSidebar] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [showNoteEditor, setShowNoteEditor] = useState(false);

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            router.replace('/');
        }
    }, [isAuthenticated, isLoading, router]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchNotes();
        }
    }, [isAuthenticated, fetchNotes]);

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
                    activeTab={activeTab}
                    onNewNote={() => setShowNoteEditor(true)}
                    onTabChange={setActiveTab}
                />

                <main className={`flex-1 transition-all duration-300 ${showSidebar ? 'ml-64' : 'ml-0'}`}>
                    <div className="container mx-auto px-6 py-8">
                        <NoteGrid notes={notes} isLoading={notesLoading} />
                    </div>
                </main>
            </div>

            {showNoteEditor && (
                <NoteEditor
                    onClose={() => setShowNoteEditor(false)}
                    onSave={handleSaveNote}
                />
            )}
        </div>
    );
} 