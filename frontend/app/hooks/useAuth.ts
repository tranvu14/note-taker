'use client';

import { useCallback, useEffect } from 'react';
import { authStore } from '../stores/authStore';
import { useObserver } from 'mobx-react-lite';

export function useAuth() {
    const validateToken = useCallback(() => {
        authStore.validateToken();
    }, []);

    useEffect(() => {
        validateToken();
    }, [validateToken]);

    const handleAuth = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        return authStore.handleAuth(formData);
    }, []);

    const handleSignOut = useCallback(() => {
        authStore.handleSignOut();
    }, []);

    return useObserver(() => ({
        isAuthenticated: authStore.isAuthenticated,
        isLoading: authStore.isLoading,
        user: authStore.user,
        error: authStore.error,
        validateToken,
        handleAuth,
        handleSignOut,
    }));
} 