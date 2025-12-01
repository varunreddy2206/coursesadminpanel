import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    CreditCard,
    UserPlus,
    LogOut,
    ChevronRight,
    ChevronDown,
    Plus,
    List
} from 'lucide-react';

const Sidebar = () => {
    const [isCoursesOpen, setIsCoursesOpen] = useState(true);

    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/students', icon: Users, label: 'Students' },
    ];

    const courseItems = [
        { path: '/courses/list', icon: List, label: 'Course List' },
        { path: '/courses/add', icon: Plus, label: 'Add Course' },
    ];

    return (
        <aside className="w-56 bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 overflow-y-auto z-10 flex flex-col">
            <div className="p-3 flex-1">
                <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Main Menu</p>
                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                    ? ' text-indigo-600 '
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </NavLink>
                    ))}

                    {/* Courses Dropdown */}
                    <div className="space-y-1 pt-2">
                        <button
                            onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                        >
                            <div className="flex items-center gap-2.5">
                                <BookOpen className="w-5 h-5" />
                                Courses
                            </div>
                            {isCoursesOpen ? (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            )}
                        </button>

                        {isCoursesOpen && (
                            <div className="pl-3 space-y-1">
                                {courseItems.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                            }`
                                        }
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.label}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>

                    <NavLink
                        to="/payments"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                ? ' text-indigo-600'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <CreditCard className="w-5 h-5" />
                        Payments
                    </NavLink>

                    <NavLink
                        to="/registrations"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                ? ' text-indigo-600'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <UserPlus className="w-5 h-5" />
                        Registrations
                    </NavLink>
                </nav>
            </div>

            <div className="p-3 border-t border-gray-200">
                <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200">
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
