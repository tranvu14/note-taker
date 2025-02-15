'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div
                    className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
                    data-oid="ivzwcun"
                >
                    <div className="text-center" data-oid="hqtb0ky">
                        <h2
                            className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                            data-oid="f:ura._"
                        >
                            Something went wrong
                        </h2>
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white"
                            data-oid="nj2zrk5"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
