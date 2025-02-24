'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Note } from '@/app/types/note';

// Dynamic import of ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface NoteEditorProps {
    note?: Note;
    onClose: () => void;
    onSave: (note: {
        title: string;
        content: string;
        isPinned?: boolean;
        tags?: string[];
        reminderDate?: string;
    }) => Promise<void>;
}

export function NoteEditor({ note, onClose, onSave }: NoteEditorProps) {
    const [title, setTitle] = useState(note?.title || '');
    const [content, setContent] = useState(note?.content || '');
    const [isPinned, _setIsPinned] = useState(note?.isPinned || false);
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState<string[]>(note?.tags.map((t) => t.name) || []);
    const [reminderDate, _setReminderDate] = useState<Date | null>(note?.reminderDate ? new Date(note.reminderDate) : null);

    const handleAddTag = useCallback(() => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags((prev) => [...prev, tagInput.trim()]);
            setTagInput('');
        }
    }, [tagInput, tags]);

    const handleRemoveTag = useCallback((tagToRemove: string) => {
        setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
    }, []);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
            }
        },
        [handleAddTag],
    );

    const handleSave = useCallback(() => {
        if (title.trim() && content.trim()) {
            onSave({
                title: title.trim(),
                content: content.trim(),
                isPinned,
                tags,
                reminderDate: reminderDate ? reminderDate.toISOString() : undefined,
            });
        }
    }, [title, content, isPinned, tags, reminderDate, onSave]);

    const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }, []);

    const handleTagInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(e.target.value);
    }, []);

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block'],
            ['link'],
            ['clean'],
        ],
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            data-oid="5zd5eti"
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mx-4 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                data-oid="8qolnjw"
            >
                <div className="flex justify-between items-center mb-4" data-oid="k1052sl">
                    <h2
                        className="text-2xl font-bold text-gray-900 dark:text-white"
                        data-oid="6w_cqms"
                    >
                        {note ? 'Edit Note' : 'Create New Note'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                        data-oid="ej96-vv"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            data-oid="y0lpr19"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                                data-oid="xes0oqe"
                            />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4" data-oid="l3doyjm">
                    <div data-oid="lwit6m7">
                        <input
                            type="text"
                            placeholder="Note Title"
                            value={title}
                            onChange={handleTitleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
                            data-oid="qt2wd7l"
                        />
                    </div>

                    <div className="h-96" data-oid="7:v8qwx">
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={modules}
                            className="h-80 bg-white dark:bg-gray-700 rounded-lg"
                            data-oid="vx5qyy5"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2 items-center" data-oid="ssv:tyy">
                        <div className="flex-1" data-oid="9wwh:5j">
                            <input
                                type="text"
                                placeholder="Add tags (press Enter)"
                                value={tagInput}
                                onChange={handleTagInputChange}
                                onKeyDown={handleKeyDown}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
                                data-oid="9k1ddnc"
                            />
                        </div>
                        <button
                            onClick={handleAddTag}
                            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium"
                            data-oid="lomtnyg"
                        >
                            Add Tag
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2" data-oid="b4_.c48">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 flex items-center gap-1"
                                data-oid="4zpsppd"
                            >
                                #{tag}
                                <button
                                    onClick={() => handleRemoveTag(tag)}
                                    className="hover:text-purple-800 dark:hover:text-purple-100"
                                    data-oid="8jsexo4"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>

                    <div className="flex justify-end gap-4 mt-6" data-oid="1onq2ig">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            data-oid="jzqr.27"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90"
                            data-oid="w8ku5xm"
                        >
                            Save Note
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
