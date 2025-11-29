import React from 'react';
import { Bold, Italic, List, ListOrdered, Link, Image, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

const RichTextEditor = ({ label, value, onChange, placeholder }) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                {/* Toolbar */}
                <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200 overflow-x-auto">
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors">
                        <Bold className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors">
                        <Italic className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors">
                        <AlignLeft className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors">
                        <AlignCenter className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors">
                        <AlignRight className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors">
                        <List className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors">
                        <ListOrdered className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors">
                        <Link className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors">
                        <Image className="w-4 h-4" />
                    </button>
                </div>

                {/* Text Area */}
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full p-4 min-h-[150px] focus:outline-none text-sm text-gray-700 resize-y"
                />
            </div>
        </div>
    );
};

export default RichTextEditor;
