'use client';

import { useState, useEffect } from 'react';
import { LandingPage } from './components/Landing/LandingPage';
import { AuthModal } from './components/Auth/AuthModal';
import { useAuth } from './hooks/useAuth';
import { useDarkMode } from './hooks/useDarkMode';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';

export default observer(function Page() {
    const { isAuthenticated, handleAuth } = useAuth();
    const { darkMode, toggleDarkMode } = useDarkMode();
    const router = useRouter();
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/notes');
        }
    }, [isAuthenticated, router]);

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
});
