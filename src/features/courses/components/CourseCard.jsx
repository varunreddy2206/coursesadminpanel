import React from 'react';
import { Users, Star, Clock, Eye, Edit } from 'lucide-react';
import { getStatusConfig, getModeConfig, formatPrice, formatNumber } from '../utils/courseUtils';

const CourseCard = ({ course, layout = 'grid' }) => {
    const statusConfig = getStatusConfig(course.status);
    const modeConfig = getModeConfig(course.mode);
    const hasDiscount = course.originalPrice && course.originalPrice > course.price;

    if (layout === 'list') {
        return (
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.1)] transition-all duration-300 flex gap-5">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-56 h-36 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">{course.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">{course.instructor}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${modeConfig.bg} ${modeConfig.text}`}>
                                {modeConfig.icon} {course.mode}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                                {statusConfig.label}
                            </span>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>

                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{formatNumber(course.students)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{course.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{course.duration}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                {hasDiscount && (
                                    <p className="text-sm text-gray-400 line-through">{formatPrice(course.originalPrice)}</p>
                                )}
                                <span className="text-2xl font-bold text-indigo-600">{formatPrice(course.price)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors">
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors">
                                    <Edit className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Grid layout - larger cards
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.1)] transition-all duration-300 overflow-hidden group">
            <div className="relative">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                        {statusConfig.label}
                    </span>
                </div>
                <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        {course.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${modeConfig.bg} ${modeConfig.text} backdrop-blur-sm`}>
                        {modeConfig.icon} {course.mode}
                    </span>
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors min-h-14">
                    {course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{course.instructor}</p>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{formatNumber(course.students)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                        {hasDiscount && (
                            <p className="text-sm text-gray-400 line-through">{formatPrice(course.originalPrice)}</p>
                        )}
                        <span className="text-2xl font-bold text-indigo-600">{formatPrice(course.price)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
