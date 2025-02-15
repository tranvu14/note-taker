'use client';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface SidebarProps {
    showSidebar: boolean;
    activeTab: string;
    onNewNote: () => void;
    onTabChange: (tab: string) => void;
}

export function Sidebar({ showSidebar, activeTab, onNewNote, onTabChange }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

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

    return (
        <aside
            className={`fixed left-0 top-16 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ${
                showSidebar ? 'translate-x-0' : '-translate-x-full'
            }`}
            data-oid="6lfu0-3"
        >
            <div className="p-4" data-oid="84lky0c">
                <button
                    onClick={onNewNote}
                    className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90"
                    data-oid="xhg50qm"
                >
                    + New Note
                </button>
                <nav className="mt-6 space-y-2" data-oid="zf2you1">
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
                            data-oid="s-5f2o8"
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
    );
}
