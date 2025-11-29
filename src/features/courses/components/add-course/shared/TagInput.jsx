import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const TagInput = ({ label, placeholder, tags, onAddTag, onRemoveTag }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            onAddTag(inputValue.trim());
            setInputValue('');
        }
    };

    const handleAddClick = () => {
        if (inputValue.trim()) {
            onAddTag(inputValue.trim());
            setInputValue('');
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                />
                <button
                    type="button"
                    onClick={handleAddClick}
                    className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            {/* Horizontal Tag List */}
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map((tag, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-sm text-gray-700 animate-scaleIn"
                        >
                            <span>{tag}</span>
                            <button
                                type="button"
                                onClick={() => onRemoveTag(index)}
                                className="p-0.5 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <X className="w-3 h-3 text-gray-400 hover:text-red-500" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TagInput;
