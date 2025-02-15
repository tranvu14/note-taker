import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ErrorBoundary } from './components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'NoteVerse',
    description:
        'NoteVerse is a modern note-taking application that allows users to capture, organize, and collaborate on notes in real-time.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-oid="9tx1obn">
            <body className={inter.className} data-oid="t_-vkeb">
                <ErrorBoundary data-oid="1a2dg_w">{children}</ErrorBoundary>
            </body>
        </html>
    );
}
