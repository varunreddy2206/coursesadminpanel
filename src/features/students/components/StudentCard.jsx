import React from 'react';
import { Mail, Phone, MapPin, BookOpen, Award, Eye, MessageCircle, Edit } from 'lucide-react';

const StudentCard = ({ student, layout = 'grid', onViewDetails }) => {
    const getStatusBadge = (status) => {
        const statusConfig = {
            Active: { bg: 'bg-green-50', text: 'text-green-700' },
            Inactive: { bg: 'bg-gray-50', text: 'text-gray-700' },
            Graduated: { bg: 'bg-blue-50', text: 'text-blue-700' }
        };
        const config = statusConfig[status] || statusConfig.Active;
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                {status}
            </span>
        );
    };

    const getPerformanceColor = (performance) => {
        if (performance >= 9) return 'text-green-600';
        if (performance >= 7) return 'text-blue-600';
        if (performance >= 5) return 'text-yellow-600';
        return 'text-red-600';
    };

    if (layout === 'list') {
        return (
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.1)] transition-all duration-300 flex gap-5">
                <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-20 h-20 rounded-full object-cover shrink-0 ring-4 ring-indigo-50"
                />
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{student.name}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                                <div className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    <span>{student.email}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{student.location}</span>
                                </div>
                            </div>
                        </div>
                        {getStatusBadge(student.status)}
                    </div>

                    <div className="flex items-center gap-6 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                            <BookOpen className="w-4 h-4 text-indigo-600" />
                            <span className="text-gray-700">{student.enrolledCourses} Courses</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Award className={`w-4 h-4 ${getPerformanceColor(student.performance)}`} />
                            <span className="text-gray-700">Performance: <span className={`font-semibold ${getPerformanceColor(student.performance)}`}>{student.performance}/10</span></span>
                        </div>
                        <div className="text-sm text-gray-500">
                            Last active: {student.lastActive}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex-1 max-w-md">
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                <span>Progress</span>
                                <span className="font-semibold">{student.progress}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
                                    style={{ width: `${student.progress}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 ml-4">
                            <button
                                onClick={() => onViewDetails(student)}
                                className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors"
                            >
                                <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors">
                                <MessageCircle className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Grid layout
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.1)] transition-all duration-300 overflow-hidden group">
            <div className="relative h-24 bg-gradient-to-br from-indigo-500 to-purple-600">
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                    <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-20 h-20 rounded-full object-cover ring-4 ring-white"
                    />
                </div>
            </div>

            <div className="pt-12 px-5 pb-5">
                <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{student.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{student.email}</p>
                    <div className="flex justify-center">
                        {getStatusBadge(student.status)}
                    </div>
                </div>

                <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <BookOpen className="w-4 h-4 text-indigo-600" />
                            <span>Enrolled Courses</span>
                        </div>
                        <span className="font-semibold text-gray-900">{student.enrolledCourses}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Award className={`w-4 h-4 ${getPerformanceColor(student.performance)}`} />
                            <span>Performance</span>
                        </div>
                        <span className={`font-semibold ${getPerformanceColor(student.performance)}`}>{student.performance}/10</span>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                        <span>Overall Progress</span>
                        <span className="font-semibold">{student.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
                            style={{ width: `${student.progress}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex items-center gap-1 pt-4 border-t border-gray-100">
                    <button
                        onClick={() => onViewDetails(student)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                        View
                    </button>
                    <button className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors">
                        <MessageCircle className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentCard;
