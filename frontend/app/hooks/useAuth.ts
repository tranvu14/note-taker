'use client';

import { useState, useCallback, useEffect } from 'react';
import { User } from '../types/user';
import { API_ENDPOINTS } from '@/app/config/api';

interface AuthState {
    isLoading: boolean;
    error: string | null;
}

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [authState, setAuthState] = useState<AuthState>({
        isLoading: true,
        error: null,
    });

    const validateToken = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setIsAuthenticated(false);
            setUser(null);
            setAuthState({ isLoading: false, error: null });
            return;
        }

        try {
            const response = await fetch('/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem('authToken');
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error('Token validation failed:', error);
            localStorage.removeItem('authToken');
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setAuthState({ isLoading: false, error: null });
        }
    }, []);

    useEffect(() => {
        validateToken();
    }, [validateToken]);

    const handleAuth = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthState({ isLoading: true, error: null });

        try {
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                setUser(result.user);
                setIsAuthenticated(true);
                localStorage.setItem('authToken', result.token);
                setAuthState({ isLoading: false, error: null });
                return true;
            } else {
                setAuthState({ isLoading: false, error: result.error });
                return false;
            }
        } catch (error) {
            setAuthState({
                isLoading: false,
                error: 'An error occurred during authentication',
            });
            return false;
        }
    }, []);

    const handleSignOut = useCallback(() => {
        try {
            localStorage.removeItem('authToken');
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    }, []);

    return {
        isAuthenticated,
        isLoading: authState.isLoading,
        user,
        authState,
        validateToken,
        handleAuth,
        handleSignOut,
    };
} 