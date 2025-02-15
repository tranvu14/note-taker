'use client';

import { User } from '@/app/types/user';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface HeaderProps {
    user: User | null;
    darkMode: boolean;
    showSidebar: boolean;
    isAuthenticated: boolean;
    onToggleSidebar: () => void;
    onToggleDarkMode: () => void;
    onSignOut: () => void;
}

export function Header({
    user,
    darkMode,
    showSidebar,
    isAuthenticated,
    onToggleSidebar,
    onToggleDarkMode,
    onSignOut,
}: HeaderProps) {
    return (
        <header
            className="fixed top-0 w-full bg-white dark:bg-gray-800 shadow-md z-50"
            data-oid="fz3:rxx"
        >
            <div
                className="container mx-auto px-4 py-3 flex items-center justify-between"
                data-oid="8:eheqn"
            >
                <div className="flex items-center space-x-4" data-oid="m3jla6o">
                    {isAuthenticated && (
                        <button
                            onClick={onToggleSidebar}
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            data-oid="-q9r48p"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                data-oid="8p194wb"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                    data-oid="c8y2ria"
                                />
                            </svg>
                        </button>
                    )}
                    <h1
                        className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                        data-oid="o5l-5r-"
                    >
                        NoteVerse
                    </h1>
                </div>
                <div className="flex items-center space-x-4" data-oid="c8utov6">
                    <button
                        onClick={onToggleDarkMode}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        data-oid="odsjp2a"
                    >
                        {darkMode ? (
                            <svg
                                className="w-6 h-6 text-yellow-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                data-oid="3dbohk:"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    data-oid="uag1y0o"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                data-oid="k8whqp4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    data-oid="5:z2s.j"
                                />
                            </svg>
                        )}
                    </button>
                    {isAuthenticated && user && (
                        <UserMenu user={user} onSignOut={onSignOut} data-oid="_0:h5cc" />
                    )}
                </div>
            </div>
        </header>
    );
}

function UserMenu({ user, onSignOut }: { user: User; onSignOut: () => void }) {
    return (
        <Menu as="div" className="relative" data-oid="..jb.zo">
            <Menu.Button
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                data-oid="4boy4aj"
            >
                <span className="text-gray-700 dark:text-gray-200 font-medium" data-oid="rc:vv4g">
                    {user.name}
                </span>
                <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    data-oid="xui_58f"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                        data-oid="7rnvuga"
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
                data-oid="33dpzvm"
            >
                <Menu.Items
                    className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    data-oid="i7ekxkd"
                >
                    <UserMenuItems onSignOut={onSignOut} data-oid="7_959t:" />
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

function UserMenuItems({ onSignOut }: { onSignOut: () => void }) {
    return (
        <div className="px-1 py-1" data-oid="3cm:gh:">
            <MenuButton icon="profile" text="Profile" data-oid="8dy7a8u" />
            <MenuButton icon="settings" text="Settings" data-oid="9._h5aw" />
            <MenuButton
                icon="signout"
                text="Sign out"
                onClick={onSignOut}
                className="text-red-600 dark:text-red-400"
                data-oid="4wkhmpu"
            />
        </div>
    );
}

function MenuButton({
    icon,
    text,
    onClick,
    className = 'text-gray-700 dark:text-gray-200',
}: {
    icon: string;
    text: string;
    onClick?: () => void;
    className?: string;
}) {
    return (
        <Menu.Item data-oid="i-9cuob">
            {({ active }) => (
                <button
                    onClick={onClick}
                    className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                    } group flex w-full items-center rounded-lg px-2 py-2 text-sm ${className}`}
                    data-oid="q0r:u_c"
                >
                    <span data-oid="0sg4.5s">{text}</span>
                </button>
            )}
        </Menu.Item>
    );
}
