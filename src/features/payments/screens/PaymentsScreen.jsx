import React from 'react';
import { Download } from 'lucide-react';
import RevenueCard from '../components/RevenueCard';
import PaymentMethodCard from '../components/PaymentMethodCard';
import TransactionTable from '../components/TransactionTable';
import { revenueStats, paymentMethods, transactionsData } from '../data/paymentsData';

const PaymentsScreen = () => {
    const handleExportReport = () => {
        console.log('Exporting payment report...');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Payment Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Track and manage all payment transactions</p>
                </div>

                <button
                    onClick={handleExportReport}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Export Report
                </button>
            </div>

            {/* Revenue Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {revenueStats.map(stat => (
                    <RevenueCard key={stat.id} stat={stat} />
                ))}
            </div>

            {/* Payment Methods Section */}
            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Payment Methods</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {paymentMethods.map(method => (
                        <PaymentMethodCard key={method.id} method={method} />
                    ))}
                </div>
            </div>

            {/* Transaction History */}
            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Transaction History</h2>
                <TransactionTable transactions={transactionsData} />
            </div>
        </div>
    );
};

export default PaymentsScreen;
