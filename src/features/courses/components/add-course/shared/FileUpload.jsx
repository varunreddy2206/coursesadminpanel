import React, { useRef, useState } from 'react';
import { UploadCloud, File, X, CheckCircle } from 'lucide-react';

const FileUpload = ({ label, accept, onChange, value, helperText }) => {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onChange(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onChange(e.target.files[0]);
        }
    };

    const handleRemoveFile = (e) => {
        e.stopPropagation();
        onChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>

            <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
          relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200
          ${isDragging
                        ? 'border-indigo-500 bg-indigo-50'
                        : value
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                    }
        `}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    className="hidden"
                />

                {value ? (
                    <div className="flex items-center justify-center gap-3 animate-scaleIn">
                        <div className="p-2 bg-white rounded-full shadow-sm">
                            <File className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-medium text-gray-900 line-clamp-1">{value.name}</p>
                            <p className="text-xs text-gray-500">{(value.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <button
                            onClick={handleRemoveFile}
                            className="p-1.5 bg-white rounded-full shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors ml-2"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <div className="mx-auto w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
                            <UploadCloud className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">
                                <span className="text-indigo-600">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{helperText || 'SVG, PNG, JPG or GIF (max. 800x400px)'}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
