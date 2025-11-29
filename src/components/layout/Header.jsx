import React from 'react';
import { Search, Bell, Mail, ChevronDown } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-10">
            {/* Left: Logo and Title */}
            <div className="flex items-center gap-3 w-56">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    C
                </div>
                <div>
                    <h1 className="text-lg font-bold text-gray-800 leading-tight">CourseAdmin</h1>
                    <p className="text-xs text-gray-500">Manage your courses</p>
                </div>
            </div>

            {/* Center: Search Bar */}
            <div className="flex-1 max-w-2xl mx-auto">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for anything..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                    />
                </div>
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-4 w-64 justify-end">
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
                    <Mail className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-200 mx-1"></div>

                <button className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-xl transition-colors">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Profile"
                        className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div className="text-left hidden md:block">
                        <p className="text-sm font-semibold text-gray-700">Tom Cook</p>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
            </div>
        </header>
    );
};

export default Header;
