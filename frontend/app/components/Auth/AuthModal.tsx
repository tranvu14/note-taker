'use client';

import { useState } from 'react';

interface AuthModalProps {
    onClose: () => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function AuthModal({ onClose, onSubmit }: AuthModalProps) {
    const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot-password'>('signin');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        try {
            await onSubmit(event);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Authentication failed');
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            data-oid="yvuo_d_"
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-md w-full"
                data-oid="7f-6rz5"
            >
                <div className="flex justify-between items-center mb-6" data-oid="t.k3_uw">
                    <h2
                        className="text-2xl font-bold text-gray-900 dark:text-white"
                        data-oid="1ok1xp0"
                    >
                        {authMode === 'signin'
                            ? 'Sign In'
                            : authMode === 'signup'
                              ? 'Sign Up'
                              : 'Forgot Password'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                        data-oid="1l49389"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            data-oid="hoygoy_"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                                data-oid="uek-1bw"
                            />
                        </svg>
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg" data-oid="sis3amg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" data-oid="y9me12_">
                    {/* Form fields based on authMode */}
                    {authMode === 'signup' && (
                        <input
                            name="name"
                            type="text"
                            required
                            placeholder="Name"
                            className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700"
                            data-oid="aiu2-u2"
                        />
                    )}
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="Email"
                        className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700"
                        data-oid="ikpjvps"
                    />

                    {authMode !== 'forgot-password' && (
                        <input
                            name="password"
                            type="password"
                            required
                            placeholder="Password"
                            className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700"
                            data-oid="_eo3vlb"
                        />
                    )}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        data-oid="5rj3jeu"
                    >
                        {authMode === 'signin'
                            ? 'Sign In'
                            : authMode === 'signup'
                              ? 'Sign Up'
                              : 'Reset Password'}
                    </button>
                </form>
                <div className="mt-4 text-center" data-oid="vg4p1mn">
                    {authMode === 'signin' ? (
                        <>
                            <button
                                onClick={() => setAuthMode('signup')}
                                className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
                                data-oid="9r1g711"
                            >
                                Create an account
                            </button>
                            <span className="mx-2 text-gray-500" data-oid="3gcbltk">
                                |
                            </span>
                            <button
                                onClick={() => setAuthMode('forgot-password')}
                                className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
                                data-oid="cgkf8v3"
                            >
                                Forgot password?
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setAuthMode('signin')}
                            className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
                            data-oid="1j:30gp"
                        >
                            Back to sign in
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
