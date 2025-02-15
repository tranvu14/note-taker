import { makeAutoObservable } from 'mobx';
import { User } from '../types/user';

class AuthStore {
    isAuthenticated = false;
    user: User | null = null;
    isLoading = true;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    validateToken = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                this.setAuthenticated(false);
                this.setUser(null);
                return;
            }

            const response = await fetch('/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                this.setUser(data);
                this.setAuthenticated(true);
            } else {
                this.setAuthenticated(false);
                this.setUser(null);
            }
        } catch (error) {
            console.error('Token validation error:', error);
            this.setAuthenticated(false);
            this.setUser(null);
        } finally {
            this.setLoading(false);
        }
    };

    setUser = (user: User | null) => {
        this.user = user;
    };

    setAuthenticated = (value: boolean) => {
        this.isAuthenticated = value;
    };

    setLoading = (value: boolean) => {
        this.isLoading = value;
    };

    setError(error: string | null) {
        this.error = error;
    }

    clearAuth() {
        this.setAuthenticated(false);
        this.setUser(null);
    }

    async handleAuth(formData: FormData) {
        this.setLoading(true);
        this.setError(null);

        try {
            const data = Object.fromEntries(formData.entries());
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                this.setUser(result.user);
                this.setAuthenticated(true);
                localStorage.setItem('authToken', result.token);
                this.setLoading(false);
                return true;
            } else {
                this.setError(result.error);
                this.setLoading(false);
                return false;
            }
        } catch (error) {
            this.setError('An error occurred during authentication');
            this.setLoading(false);
            return false;
        }
    }

    handleSignOut() {
        try {
            localStorage.removeItem('authToken');
            this.clearAuth();
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    }
}

export const authStore = new AuthStore(); 