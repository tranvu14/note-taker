'use client';

interface SidebarProps {
    showSidebar: boolean;
    activeTab: string;
    onNewNote: () => void;
    onTabChange: (tab: string) => void;
}

export function Sidebar({ showSidebar, activeTab, onNewNote, onTabChange }: SidebarProps) {
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
                    {['All Notes', 'Favorites', 'Shared', 'Archived', 'Trash'].map((item) => (
                        <button
                            key={item}
                            onClick={() => onTabChange(item.toLowerCase())}
                            className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                                activeTab === item.toLowerCase()
                                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            data-oid="s-5f2o8"
                        >
                            {item}
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
