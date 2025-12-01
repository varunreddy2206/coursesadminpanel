import React from 'react';
import { Mail, Phone, MapPin, Calendar, BookOpen, DollarSign, Award, Clock } from 'lucide-react';
import Modal from '../../../components/common/Modal';

const StudentDetailModal = ({ student, isOpen, onClose }) => {
    if (!student) return null;

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

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className='relative'>

                <div className="absolute -top-16 left-8">
                    <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-32 h-32 rounded-full object-cover ring-4 ring-orange-300 bg-white"
                    />
                </div>

                {/* Content */}
                <div className="pt-20 px-8 pb-8 overflow-y-auto max-h-[calc(90vh-8rem)]">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">{student.name}</h2>
                            <p className="text-gray-500">{student.email}</p>
                        </div>
                        {getStatusBadge(student.status)}
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow duration-200">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <Phone className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Phone</p>
                                <p className="text-sm font-medium text-gray-900">{student.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow duration-200">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <MapPin className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Location</p>
                                <p className="text-sm font-medium text-gray-900">{student.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow duration-200">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Calendar className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Enrolled</p>
                                <p className="text-sm font-medium text-gray-900">{student.enrollmentDate}</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:scale-105 transition-transform duration-200">
                            <div className="flex items-center gap-2 mb-2">
                                <BookOpen className="w-5 h-5 text-blue-600" />
                                <p className="text-xs text-gray-600">Enrolled</p>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{student.enrolledCourses}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:scale-105 transition-transform duration-200">
                            <div className="flex items-center gap-2 mb-2">
                                <Award className="w-5 h-5 text-green-600" />
                                <p className="text-xs text-gray-600">Completed</p>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{student.completedCourses}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:scale-105 transition-transform duration-200">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="w-5 h-5 text-purple-600" />
                                <p className="text-xs text-gray-600">Total Spent</p>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">${student.totalSpent}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl hover:scale-105 transition-transform duration-200">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-5 h-5 text-orange-600" />
                                <p className="text-xs text-gray-600">Last Active</p>
                            </div>
                            <p className="text-sm font-bold text-gray-900">{student.lastActive}</p>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Overall Progress</h3>
                        <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-600">Completion Rate</span>
                                <span className="text-2xl font-bold text-indigo-600">{student.progress}%</span>
                            </div>
                            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
                                    style={{ width: `${student.progress}%` }}
                                ></div>
                            </div>
                            <div className="mt-4 flex items-center justify-between text-sm">
                                <span className="text-gray-600">Performance Score</span>
                                <span className="text-lg font-bold text-gray-900">{student.performance}/10</span>
                            </div>
                        </div>
                    </div>

                    {/* Enrolled Courses */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Enrolled Courses</h3>
                        <div className="space-y-3">
                            {student.courses.map((course, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 hover:shadow-md transition-all duration-200"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-100 rounded-lg">
                                            <BookOpen className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <span className="font-medium text-gray-900">{course}</span>
                                    </div>
                                    <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:scale-105 transition-transform duration-200">
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default StudentDetailModal;
