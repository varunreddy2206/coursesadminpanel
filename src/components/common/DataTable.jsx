import React, { useState, useMemo } from 'react';
import { Search, Filter, Eye } from 'lucide-react';

const DataTable = ({ columns, data, searchable = true, filterable = true }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Filter and search data
    const filteredData = useMemo(() => {
        let result = [...data];

        // Apply status filter
        if (filterStatus !== 'all') {
            result = result.filter(item => item.status === filterStatus);
        }

        // Apply search
        if (searchTerm) {
            result = result.filter(item =>
                Object.values(item).some(value =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        return result;
    }, [data, searchTerm, filterStatus]);

    const getStatusBadge = (status) => {
        const statusConfig = {
            paid: {
                bg: 'bg-green-50',
                text: 'text-green-700',
                label: 'Paid'
            },
            pending: {
                bg: 'bg-red-50',
                text: 'text-red-700',
                label: 'Pending'
            }
        };

        const config = statusConfig[status] || statusConfig.pending;

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    return (
        <div className="space-y-4">
            {/* Search and Filter Bar */}
            {(searchable || filterable) && (
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    {searchable && (
                        <div className="flex-1 relative ">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                            />
                        </div>
                    )}

                    {/* Filter */}
                    {filterable && (
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm appearance-none bg-white cursor-pointer"
                            >
                                <option value="all">All Status</option>
                                <option value="paid">Paid</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    )}
                </div>
            )}

            {/* Table with Shadow */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.1)] transition-shadow duration-300 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200 h-14">
                            <tr>
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    >
                                        {column.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredData.length > 0 ? (
                                filteredData.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                                        {columns.map((column, colIndex) => (
                                            <td key={colIndex} className="px-4 py-4 text-sm">
                                                {column.key === 'status' ? (
                                                    getStatusBadge(row[column.key])
                                                ) : column.key === 'action' ? (
                                                    <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-700">{row[column.key]}</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Results Count */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-sm text-gray-500">
                    Showing {filteredData.length} of {data.length} results
                </div>
            </div>
        </div>
    );
};

export default DataTable;
