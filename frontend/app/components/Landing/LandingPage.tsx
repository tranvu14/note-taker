'use client';

import Image from 'next/image';

interface LandingPageProps {
    darkMode: boolean;
    onToggleDarkMode: () => void;
    onSignInClick: () => void;
}

export function LandingPage({ darkMode, onToggleDarkMode, onSignInClick }: LandingPageProps) {
    return (
        <div
            className={`min-h-screen ${darkMode ? 'dark:bg-gray-900' : 'bg-gray-50'}`}
            data-oid="q8ph1i8"
        >
            <div className="fixed inset-0 overflow-hidden pointer-events-none" data-oid="dmv696l">
                <div
                    className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"
                    data-oid="k0avx3k"
                />

                <div
                    className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] bg-gradient-to-t from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"
                    data-oid="epzbmpf"
                />
            </div>
            <header
                className="fixed top-0 w-full bg-white dark:bg-gray-800 shadow-md z-50"
                data-oid="gv9xl:z"
            >
                <div
                    className="mx-auto px-4 py-3 flex items-center justify-between"
                    data-oid="cd08.nu"
                >
                    <h1
                        className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                        data-oid="d.2:6pv"
                    >
                        NoteVerse
                    </h1>
                    <div className="flex items-center space-x-4" data-oid="c8zuyhl">
                        <button
                            onClick={onToggleDarkMode}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            data-oid="j:yuo2x"
                        >
                            {darkMode ? (
                                <svg
                                    className="w-6 h-6 text-yellow-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="dm3ssy2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                        data-oid="nsqe97z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="3d1ve.5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                        data-oid="7jawcbh"
                                    />
                                </svg>
                            )}
                        </button>
                        <button
                            onClick={onSignInClick}
                            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium"
                            data-oid="f9sinvo"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </header>

            <main className="relative pt-16" data-oid="zve2bmh">
                {/* Hero Section */}
                <section className="py-20 px-4" data-oid="yc3c2-n">
                    <div className="container mx-auto max-w-6xl" data-oid="p56ju6p">
                        <div
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                            data-oid="q3ded:b"
                        >
                            <div className="space-y-8 relative" data-oid="bcujwh_">
                                <div
                                    className="relative z-10 animate-fade-in-up"
                                    data-oid="wrgckf3"
                                >
                                    <h2
                                        className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
                                        data-oid="_x2uqv5"
                                    >
                                        Capture Your Ideas,{' '}
                                        <span
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                                            data-oid="2:abtm3"
                                        >
                                            Anytime, Anywhere
                                        </span>
                                    </h2>
                                    <p
                                        className="mt-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
                                        data-oid="kyrqi1_"
                                    >
                                        NoteVerse is your personal space for capturing thoughts,
                                        organizing ideas, and collaborating with others. Experience
                                        the future of note-taking.
                                    </p>
                                </div>
                                <div
                                    className="flex flex-col sm:flex-row gap-4 animate-fade-in"
                                    data-oid="05xafab"
                                >
                                    <button
                                        onClick={onSignInClick}
                                        className="group relative px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
                                        data-oid="y9zcity"
                                    >
                                        <span className="relative z-10" data-oid="sqj_v0i">
                                            Get Started - It&apos;s Free
                                        </span>
                                        <div
                                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                                            data-oid="nyrjv5u"
                                        />
                                    </button>
                                    <button
                                        className="px-8 py-3 rounded-lg border-2 border-purple-600 text-purple-600 dark:text-purple-400 font-medium transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:scale-105"
                                        data-oid="6g6-x7:"
                                    >
                                        Learn More
                                    </button>
                                </div>
                            </div>
                            <div className="relative lg:block animate-fade-in" data-oid="t.tzueb">
                                <div className="relative" data-oid="k4a82zy">
                                    {/* Decorative elements */}
                                    <div
                                        className="absolute -top-4 -right-4 w-72 h-72 bg-purple-600/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"
                                        data-oid="sfnzo0s"
                                    />

                                    <div
                                        className="absolute -bottom-8 -left-4 w-72 h-72 bg-pink-600/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"
                                        data-oid="9jolehz"
                                    />

                                    <div
                                        className="absolute -bottom-8 right-4 w-72 h-72 bg-yellow-600/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"
                                        data-oid="p527x6u"
                                    />

                                    {/* App preview */}
                                    <div
                                        className="relative flex justify-center"
                                        data-oid="3kha_3f"
                                    >
                                        <div
                                            className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-2 transform hover:scale-105 transition-transform duration-300  w-72 h-72"
                                            data-oid="a5mgvn1"
                                        >
                                            <div
                                                className="rounded-xl overflow-hidden"
                                                data-oid="vob:bkr"
                                            >
                                                <Image
                                                    src="/images/mockup.webp"
                                                    alt="NoteVerse App Interface"
                                                    className="w-full h-auto"
                                                    data-oid="396oqz7"
                                                    width={640}
                                                    height={640}
                                                />
                                            </div>
                                            <div
                                                className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/5 to-pink-600/5 rounded-2xl"
                                                data-oid="kx2hpm5"
                                                key="olk-TIwL"
                                            />
                                        </div>
                                        {/* Floating elements */}
                                        <div
                                            className="absolute -right-8 top-1/4 animate-float-slow z-10"
                                            data-oid="_tecr91"
                                        >
                                            <div
                                                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transform rotate-6"
                                                data-oid="3_vrvv8"
                                            >
                                                <span
                                                    className="text-sm text-purple-600 dark:text-purple-400"
                                                    data-oid="kk313s5"
                                                >
                                                    ✨ Smart Organization
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="absolute -left-8 bottom-1/4 animate-float z-10"
                                            data-oid="537f3ey"
                                        >
                                            <div
                                                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transform -rotate-6"
                                                data-oid="bplzgb:"
                                            >
                                                <span
                                                    className="text-sm text-pink-600 dark:text-pink-400"
                                                    data-oid="_zpgi.3"
                                                >
                                                    🚀 Real-time Collaboration
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 relative overflow-hidden" data-oid="ui9uzyd">
                    <div className="container mx-auto max-w-6xl px-4" data-oid="4l9w8ki">
                        <h3
                            className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white relative z-10"
                            data-oid="ozem1jb"
                        >
                            <span
                                className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                                data-oid="sro:r_u"
                            >
                                Features that empower your creativity
                            </span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-oid="l0pylx1">
                            {[
                                {
                                    icon: '✍️',
                                    title: 'Rich Text Editor',
                                    description:
                                        'Write and format your notes with our powerful editor supporting markdown and WYSIWYG.',
                                    delay: 'animate-delay-0',
                                },
                                {
                                    icon: '🗂️',
                                    title: 'Smart Organization',
                                    description:
                                        'Keep your notes organized with tags, folders, and smart filters.',
                                    delay: 'animate-delay-150',
                                },
                                {
                                    icon: '👥',
                                    title: 'Collaboration',
                                    description:
                                        'Share notes with team members and collaborate in real-time.',
                                    delay: 'animate-delay-300',
                                },
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className={`group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${feature.delay} animate-fade-in-up`}
                                    data-oid="zwks2if"
                                >
                                    <div
                                        className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300"
                                        data-oid="gbeyms2"
                                    >
                                        {feature.icon}
                                    </div>
                                    <h4
                                        className="text-xl font-semibold mb-3 text-gray-900 dark:text-white"
                                        data-oid="wfkh78_"
                                    >
                                        {feature.title}
                                    </h4>
                                    <p
                                        className="text-gray-600 dark:text-gray-300"
                                        data-oid="h81j6kz"
                                    >
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
