import React from 'react';
import { recentPayments } from '../data/statsData';

const RecentPayments = () => {
    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.1)] h-full">
            {/* Header */}
            <div className="mb-3">
                <h2 className="text-lg font-bold text-gray-800">Recent Payments</h2>
                <p className="text-sm text-gray-500 mt-1">Latest transactions from students</p>
            </div>

            {/* Payments List */}
            <div className="space-y-4">
                {recentPayments.map((payment) => (
                    <div
                        key={payment.id}
                        className="flex items-center gap-4 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                        {/* Avatar */}
                        <img
                            src={payment.avatar}
                            alt={payment.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 group-hover:border-indigo-100 transition-colors"
                        />

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-800 truncate">
                                {payment.name}
                            </h3>
                            <p className="text-xs text-gray-500 font-mono truncate">
                                {payment.transactionId}
                            </p>
                        </div>

                        {/* Amount */}
                        <div className="text-right">
                            <p className="text-sm font-bold text-gray-800">
                                ${payment.amount}
                            </p>
                            <p className="text-xs text-green-600 font-medium">
                                Paid
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Link */}
            <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                    View All Payments →
                </button>
            </div>
        </div>
    );
};

export default RecentPayments;
