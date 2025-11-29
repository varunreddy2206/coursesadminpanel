import React, { useState, useMemo } from 'react';
import { Search, Filter, Eye, Download } from 'lucide-react';

const TransactionTable = ({ transactions }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredTransactions = useMemo(() => {
        let result = [...transactions];

        // Apply status filter
        if (filterStatus !== 'all') {
            result = result.filter(txn => txn.status.toLowerCase() === filterStatus);
        }

        // Apply search
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            result = result.filter(txn =>
                txn.studentName.toLowerCase().includes(searchLower) ||
                txn.email.toLowerCase().includes(searchLower) ||
                txn.course.toLowerCase().includes(searchLower) ||
                txn.transactionId.toLowerCase().includes(searchLower)
            );
        }

        return result;
    }, [transactions, searchTerm, filterStatus]);

    const getStatusBadge = (status) => {
        const statusConfig = {
            Completed: { bg: 'bg-green-50', text: 'text-green-700' },
            Pending: { bg: 'bg-yellow-50', text: 'text-yellow-700' },
            Failed: { bg: 'bg-red-50', text: 'text-red-700' },
            Refunded: { bg: 'bg-blue-50', text: 'text-blue-700' }
        };
        const config = statusConfig[status] || statusConfig.Pending;
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                {status}
            </span>
        );
    };

    const getPaymentMethodBadge = (method) => {
        const methodColors = {
            'Credit Card': 'bg-indigo-50 text-indigo-700',
            'PayPal': 'bg-blue-50 text-blue-700',
            'Bank Transfer': 'bg-green-50 text-green-700',
            'UPI': 'bg-purple-50 text-purple-700'
        };
        return (
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${methodColors[method] || 'bg-gray-50 text-gray-700'}`}>
                {method}
            </span>
        );
    };

    return (
        <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                    />
                </div>

                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm appearance-none bg-white cursor-pointer"
                    >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.1)] transition-shadow duration-300 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment Method</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((txn) => (
                                    <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{txn.studentName}</p>
                                                <p className="text-xs text-gray-500">{txn.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="text-sm text-gray-700 line-clamp-2 max-w-xs">{txn.course}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="text-sm font-semibold text-gray-900">${txn.amount}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            {getPaymentMethodBadge(txn.paymentMethod)}
                                        </td>
                                        <td className="px-4 py-4">
                                            {getStatusBadge(txn.status)}
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="text-sm text-gray-700">{txn.date}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-1">
                                                <button className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                        No transactions found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Results Count */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-sm text-gray-500">
                    Showing {filteredTransactions.length} of {transactions.length} transactions
                </div>
            </div>
        </div>
    );
};

export default TransactionTable;
