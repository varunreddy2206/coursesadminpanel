import React from 'react';
import { X } from 'lucide-react';

const Modal = ({
    isOpen,
    onClose,
    children,
    maxWidth = 'max-w-4xl',
    showHeader = true,
    headerGradient = 'from-indigo-500 to-purple-600'
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className={`bg-white rounded-2xl shadow-2xl ${maxWidth} w-full max-h-[90vh] overflow-hidden animate-slideUp`}>
                {showHeader && (
                    <div className={`relative h-32 bg-gradient-to-br ${headerGradient}`}>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 hover:scale-110"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>
                )}
                {!showHeader && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:scale-110"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                )}
                {children}
            </div>
        </div>
    );
};

export default Modal;
