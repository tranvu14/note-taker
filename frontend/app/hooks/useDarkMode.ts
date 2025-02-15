'use client';

import { useState, useEffect, useCallback } from 'react';

export function useDarkMode() {
    const [darkMode, setDarkMode] = useState(() => {
        // Initialize from localStorage if available, otherwise use system preference
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('darkMode');
            if (stored !== null) {
                return stored === 'true';
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    useEffect(() => {
        // Apply dark mode class immediately when component mounts
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const toggleDarkMode = useCallback(() => {
        try {
            setDarkMode((prev) => {
                const newValue = !prev;
                localStorage.setItem('darkMode', newValue.toString());
                document.documentElement.classList.toggle('dark', newValue);
                return newValue;
            });
        } catch (error) {
            console.error('Failed to save dark mode preference:', error);
        }
    }, []);

    return { darkMode, toggleDarkMode };
}
