import React from 'react';
import { DollarSign, Clock, CheckCircle, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';

const iconMap = {
    DollarSign,
    Clock,
    CheckCircle,
    RefreshCw
};

const RevenueCard = ({ stat }) => {
    const Icon = iconMap[stat.icon];
    const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
    const trendColor = stat.trend === 'up' ? 'text-green-600' : 'text-red-600';

    return (
        <div className="relative overflow-hidden rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.2)] transition-all duration-300 group">
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-10 group-hover:opacity-15 transition-opacity duration-300`}></div>

            {/* Content */}
            <div className="relative">
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.bgGradient} shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-50' : 'bg-red-50'}`}>
                        <TrendIcon className={`w-3 h-3 ${trendColor}`} />
                        <span className={`text-xs font-semibold ${trendColor}`}>{stat.change}</span>
                    </div>
                </div>

                <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
        </div>
    );
};

export default RevenueCard;
