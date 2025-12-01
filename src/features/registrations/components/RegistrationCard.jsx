import React from 'react';
import { Calendar, BookOpen, Eye, MapPin } from 'lucide-react';

const RegistrationCard = ({ registration, onViewDetails }) => {
    const getStatusConfig = (status) => {
        const configs = {
            pending: {
                bg: 'bg-yellow-50',
                text: 'text-yellow-700',
                border: 'border-yellow-200',
                label: 'Pending'
            },
            approved: {
                bg: 'bg-green-50',
                text: 'text-green-700',
                border: 'border-green-200',
                label: 'Approved'
            },
            rejected: {
                bg: 'bg-red-50',
                text: 'text-red-700',
                border: 'border-red-200',
                label: 'Rejected'
            }
        };
        return configs[status] || configs.pending;
    };

    const statusConfig = getStatusConfig(registration.status);

    return (
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
            onClick={() => onViewDetails(registration)}>

            {/* Student Info */}
            <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <img
                            src={registration.student.avatar}
                            alt={registration.student.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-100"
                        />
                        <div>
                            <h3 className="text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                                {registration.student.name}
                            </h3>
                            <p className="text-xs text-gray-500">{registration.student.email}</p>
                        </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                        {statusConfig.label}
                    </span>
                </div>

                {/* Course Info */}
                <div className="flex items-start gap-2 mb-3 p-3 bg-orange-50/50 rounded-lg">
                    <BookOpen className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 line-clamp-1">{registration.course.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{registration.course.category}</p>
                    </div>
                </div>

                {/* Details */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(registration.registrationDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{registration.student.location}</span>
                    </div>
                </div>
            </div>

            {/* View Details Button */}
            <div className="px-5 pb-4">
                <button
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg"
                >
                    <Eye className="w-4 h-4" />
                    View Details
                </button>
            </div>
        </div>
    );
};

export default RegistrationCard;
