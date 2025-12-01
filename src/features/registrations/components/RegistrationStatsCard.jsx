import React from 'react';
import { Users, Clock, CheckCircle, XCircle, TrendingUp, TrendingDown } from 'lucide-react';

const RegistrationStatsCard = ({ stat }) => {
    const icons = {
        Users: Users,
        Clock: Clock,
        CheckCircle: CheckCircle,
        XCircle: XCircle
    };

    const Icon = icons[stat.icon];

    const colorClasses = {
        orange: {
            bg: 'from-orange-50 to-orange-100',
            icon: 'bg-orange-500',
            text: 'text-orange-600',
            trend: 'text-orange-600'
        },
        yellow: {
            bg: 'from-yellow-50 to-yellow-100',
            icon: 'bg-yellow-500',
            text: 'text-yellow-600',
            trend: 'text-yellow-600'
        },
        green: {
            bg: 'from-green-50 to-green-100',
            icon: 'bg-green-500',
            text: 'text-green-600',
            trend: 'text-green-600'
        },
        red: {
            bg: 'from-red-50 to-red-100',
            icon: 'bg-red-500',
            text: 'text-red-600',
            trend: 'text-red-600'
        }
    };

    const colors = colorClasses[stat.color];

    return (
        <div className={`bg-gradient-to-br ${colors.bg} p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105`}>
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${colors.icon} rounded-xl shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${colors.trend}`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>{stat.change}</span>
                </div>
            </div>
            <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold ${colors.text}`}>{stat.value}</p>
            </div>
        </div>
    );
};

export default RegistrationStatsCard;
