'use client';

import { Note } from '@/app/types/note';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface NoteDetailProps {
    note: Note;
    onClose: () => void;
    onUpdate: (note: Note) => void;
}

export function NoteDetail({ note, onClose, onUpdate }: NoteDetailProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedNote, setEditedNote] = useState(note);
    const [showTagInput, setShowTagInput] = useState(false);
    const [newTag, setNewTag] = useState('');

    const handleSave = () => {
        onUpdate(editedNote);
        setIsEditing(false);
    };

    const handleAddTag = () => {
        if (newTag.trim()) {
            setEditedNote({
                ...editedNote,
                tags: [
                    ...(editedNote.tags || []),
                    { id: Date.now().toString(), name: newTag.trim() },
                ],
            });
            setNewTag('');
            setShowTagInput(false);
        }
    };

    const handleRemoveTag = (tagId: string) => {
        setEditedNote({
            ...editedNote,
            tags: editedNote.tags?.filter((tag) => tag.id !== tagId) || [],
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start overflow-y-auto py-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl mx-4 relative animate-fade-in-up">
                {/* Header */}
                <div className="flex justify-between items-start p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedNote.title}
                                onChange={(e) =>
                                    setEditedNote({ ...editedNote, title: e.target.value })
                                }
                                className="w-full text-2xl font-bold bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none text-gray-900 dark:text-white"
                                placeholder="Note Title"
                            />
                        ) : (
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                {note.isPinned && <span className="text-yellow-500">📌</span>}
                                {note.title}
                            </h2>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setEditedNote(note);
                                        setIsEditing(false);
                                    }}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="mb-6">
                        {isEditing ? (
                            <ReactQuill
                                theme="bubble"
                                value={editedNote.content}
                                onChange={(content) => setEditedNote({ ...editedNote, content })}
                                className="min-h-[200px] text-gray-800 dark:text-gray-200"
                            />
                        ) : (
                            <div className="prose dark:prose-invert max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: note.content }} />
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {editedNote.tags?.map((tag) => (
                            <span
                                key={tag.id}
                                className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 flex items-center gap-1"
                            >
                                #{tag.name}
                                {isEditing && (
                                    <button
                                        onClick={() => handleRemoveTag(tag.id)}
                                        className="hover:text-purple-800 dark:hover:text-purple-100"
                                    >
                                        ×
                                    </button>
                                )}
                            </span>
                        ))}
                        {isEditing &&
                            (showTagInput ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                                        placeholder="Add tag..."
                                        className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                                    />
                                    <button
                                        onClick={handleAddTag}
                                        className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                                    >
                                        Add
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowTagInput(true)}
                                    className="px-3 py-1 rounded-full border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-purple-500 hover:text-purple-500 dark:hover:border-purple-400 dark:hover:text-purple-400"
                                >
                                    + Add Tag
                                </button>
                            ))}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex items-center gap-4">
                            <span>Created {new Date(note.createdAt).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>Updated {new Date(note.updatedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                                Favorite
                            </button>
                            <button className="flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                    />
                                </svg>
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
