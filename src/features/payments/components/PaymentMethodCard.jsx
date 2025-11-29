import React from 'react';
import { CreditCard, Wallet, Building2, Smartphone } from 'lucide-react';

const iconMap = {
    CreditCard,
    Wallet,
    Building2,
    Smartphone
};

const colorMap = {
    indigo: 'from-indigo-500 to-indigo-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600'
};

const PaymentMethodCard = ({ method }) => {
    const Icon = iconMap[method.icon];
    const gradient = colorMap[method.color];

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.1)] transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Percentage</p>
                    <p className="text-lg font-bold text-gray-900">{method.percentage}%</p>
                </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-1">{method.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{method.transactions} transactions</p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">Total Amount</span>
                <span className="text-xl font-bold text-gray-900">${method.amount.toLocaleString()}</span>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`h-full bg-gradient-to-r ${gradient} transition-all duration-500`}
                    style={{ width: `${method.percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default PaymentMethodCard;
