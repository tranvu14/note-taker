'use client';

import { RequestNote } from '@/app/types/note';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useNotes } from '@/app/hooks/useNotes';
import { NoteEditor } from '../NoteEditor';
interface SidebarProps {
    showSidebar: boolean;
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export function Sidebar({ showSidebar, activeTab, onTabChange }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const [showNoteEditor, setShowNoteEditor] = useState(false);
    const { handleSaveNote } = useNotes();

    // Determine active tab based on current route
    const getActiveTab = () => {
        if (pathname === '/notes') return 'all notes';
        if (pathname.startsWith('/favorites')) return 'favorites';
        if (pathname.startsWith('/shared')) return 'shared';
        if (pathname.startsWith('/archived')) return 'archived';
        if (pathname.startsWith('/trash')) return 'trash';
        return activeTab;
    };

    const currentTab = getActiveTab();

    const sidebarItems = [
        {
            name: 'All Notes',
            path: '/notes',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                </svg>
            ),
        },
        {
            name: 'Archived',
            path: '/archived',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                </svg>
            ),
        },
    ];

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



    return (
        <>
            {/* Mobile Top Navigation */}
            <div className="md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-40">
                <div className="p-2">
                    <div className="flex-1 overflow-x-auto scrollbar-hide">
                        <div className="flex space-x-2 p-1 min-w-max">
                            {sidebarItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        onTabChange(item.name.toLowerCase());
                                        router.push(item.path);
                                    }}
                                    className={`px-3 py-1.5 rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors ${
                                        currentTab === item.name.toLowerCase()
                                            ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <span className="w-4 h-4">{item.icon}</span>
                                    <span className="text-sm font-medium">{item.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed New Note Button for Mobile */}
            <div className="md:hidden fixed bottom-6 right-6 z-50">
                <button
                    onClick={handleNewNote}
                    className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:opacity-90 flex items-center justify-center"
                    aria-label="New Note"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

            {/* Desktop Sidebar */}
            <aside
                className={`hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 z-50 
                    ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="p-4 h-full flex flex-col">
                    <button
                        onClick={handleNewNote}
                        className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Note
                    </button>
                    
                    <nav className="mt-6 space-y-2 flex-1 overflow-y-auto">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => {
                                    onTabChange(item.name.toLowerCase());
                                    router.push(item.path);
                                }}
                                className={`w-full px-4 py-2 rounded-lg text-left transition-colors flex items-center gap-3 ${
                                    currentTab === item.name.toLowerCase()
                                        ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                <span
                                    className={
                                        currentTab === item.name.toLowerCase()
                                            ? 'text-purple-600 dark:text-purple-300'
                                            : ''
                                    }
                                >
                                    {item.icon}
                                </span>
                                {item.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {showNoteEditor && (
                <NoteEditor onClose={handleCloseEditor} onSave={handleSaveAndClose} />
            )}
        </>
    );
}
