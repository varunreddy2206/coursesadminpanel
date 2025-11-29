import React, { useState } from 'react';
import { Users, Star, Clock, Eye, Edit, ImageOff } from 'lucide-react';
import { getStatusConfig, getModeConfig, formatPrice, formatNumber } from '../utils/courseUtils';
import { IMAGE_URL } from '../../../../core/url';

const CourseCard = ({ course, layout = 'grid' }) => {

    // Map API fields
    const mappedCourse = {
        ...course,
        price: course.basePrice || 0,
        originalPrice: course.discount ? (course.basePrice + course.discount) : null,
        instructor: course.instructorName || 'Unknown Instructor',
        duration: course.totalHours || 'N/A',
        mode: course.trainingOptions || 'Self Learning',
        status: 'Active',
        students: course.totalReviews || 0,
        rating: course.rating || 0,
        thumbnail: course.thumbnail ? `${IMAGE_URL}/${course.thumbnail}` : null,
    };

    const statusConfig = getStatusConfig(mappedCourse.status);
    const modeConfig = getModeConfig(mappedCourse.mode);
    const hasDiscount = mappedCourse.originalPrice && mappedCourse.originalPrice > mappedCourse.price;

    // Clean fallback image component
    const FallbackImage = ({ className }) => (
        <div className={`flex items-center justify-center bg-gray-200 text-gray-400 ${className}`}>
            <ImageOff size={32} />
        </div>
    );

    // SAFE ThumbImg fix (no DOM manipulation)
    const ThumbImg = ({ src, alt, className }) => {
        const [error, setError] = useState(false);

        if (!src || error) {
            return <FallbackImage className={className} />;
        }

        return (
            <img
                src={src}
                alt={alt}
                className={className}
                onError={() => setError(true)}
            />
        );
    };

    // ---------------- LIST LAYOUT ----------------
    if (layout === 'list') {
        return (
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.1)] transition-all duration-300 flex gap-5">

                <div className="w-56 h-36 rounded-lg overflow-hidden">
                    <ThumbImg
                        src={mappedCourse.thumbnail}
                        alt={mappedCourse.title}
                        className="w-full h-full object-cover bg-gray-200"
                    />
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">{mappedCourse.title}</h3>
                            <p className="text-sm text-gray-500">{mappedCourse.instructor}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${modeConfig.bg} ${modeConfig.text}`}>
                                {modeConfig.icon} {mappedCourse.mode}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                                {statusConfig.label}
                            </span>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {mappedCourse.description || 'No description available'}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1"><Users size={16} />{mappedCourse.students}</div>
                            <div className="flex items-center gap-1"><Star className="fill-yellow-400 text-yellow-400" size={16} />{mappedCourse.rating}</div>
                            <div className="flex items-center gap-1"><Clock size={16} />{mappedCourse.duration}</div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                {hasDiscount && (
                                    <p className="text-sm text-gray-400 line-through">
                                        {formatPrice(mappedCourse.originalPrice)}
                                    </p>
                                )}
                                <span className="text-2xl font-bold text-indigo-600">
                                    {formatPrice(mappedCourse.price)}
                                </span>
                            </div>

                            <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"><Eye size={18} /></button>
                            <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit size={18} /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ---------------- GRID LAYOUT ----------------
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.1)] transition-all duration-300 overflow-hidden group">

            <div className="relative w-full h-52 overflow-hidden">
                <ThumbImg
                    src={mappedCourse.thumbnail}
                    alt={mappedCourse.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300 bg-gray-200"
                />
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800  group-hover:text-indigo-600 transition-colors  mb-2">
                    {mappedCourse.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{mappedCourse.subtitle}</p>

                <p className="text-sm text-gray-500 mb-4">{mappedCourse.instructor}</p>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1"><Users size={16} />{mappedCourse.students}</div>
                    <div className="flex items-center gap-1"><Star className="fill-yellow-400 text-yellow-400" size={16} />{mappedCourse.rating}</div>
                    <div className="flex items-center gap-1"><Clock size={16} />{mappedCourse.duration}</div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div>
                        {hasDiscount && (
                            <p className="text-sm text-gray-400 line-through">
                                {formatPrice(mappedCourse.originalPrice)}
                            </p>
                        )}
                        <span className="text-2xl font-bold text-indigo-600">
                            {formatPrice(mappedCourse.price)}
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"><Eye size={18} /></button>
                        <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit size={18} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
