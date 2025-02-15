'use client';

import { useState } from 'react';
import { LandingPage } from './components/Landing/LandingPage';
import { AuthModal } from './components/Auth/AuthModal';
import { useAuth } from './hooks/useAuth';
import { useDarkMode } from './hooks/useDarkMode';
import { useRouter } from 'next/navigation';

export default function Page() {
    const { isAuthenticated, handleAuth } = useAuth();
    const { darkMode, toggleDarkMode } = useDarkMode();
    const router = useRouter();
    const [showAuthModal, setShowAuthModal] = useState(false);

    if (isAuthenticated) {
        router.push('/notes');
        return null;
    }

    const handleAuthSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const success = await handleAuth(event);
        if (success) {
            setShowAuthModal(false);
            router.push('/notes');
        }
    };

    return (
        <>
            <LandingPage
                darkMode={darkMode}
                onToggleDarkMode={toggleDarkMode}
                onSignInClick={() => setShowAuthModal(true)}
                data-oid="ovdpx0r"
            />

            {showAuthModal && (
                <AuthModal
                    onClose={() => setShowAuthModal(false)}
                    onSubmit={handleAuthSubmit}
                    data-oid="6-y3wbg"
                />
            )}
        </>
    );
}
