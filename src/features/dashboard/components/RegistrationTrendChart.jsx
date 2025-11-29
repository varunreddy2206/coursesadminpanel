import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';
import { chartData } from '../data/statsData';

const RegistrationTrendChart = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('12months');

    const periods = [
        { key: '12months', label: '12 Months' },
        { key: '6months', label: '6 Months' },
        { key: '30days', label: '30 Days' },
        { key: '7days', label: '7 Days' }
    ];

    const handleExportPDF = () => {
        // PDF export functionality would go here
        console.log('Exporting to PDF...');
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.1)]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Monthly Student Registration Trend</h2>
                    <p className="text-sm text-gray-500 mt-1">Track student enrollment over time</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Period Filters */}
                    <div className="flex items-center gap-2 bg-gray-900 p-1 rounded-lg">
                        {periods.map((period) => (
                            <button
                                key={period.key}
                                onClick={() => setSelectedPeriod(period.key)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${selectedPeriod === period.key
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-white hover:text-gray-200'
                                    }`}
                            >
                                {period.label}
                            </button>
                        ))}
                    </div>

                    {/* Export PDF Button */}
                    <button
                        onClick={handleExportPDF}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Chart */}
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData[selectedPeriod]} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey="period"
                            stroke="#9ca3af"
                            style={{ fontSize: '12px' }}
                        />
                        <YAxis
                            stroke="#9ca3af"
                            style={{ fontSize: '12px' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                            labelStyle={{ color: '#374151', fontWeight: 600 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="registrations"
                            stroke="#6366f1"
                            strokeWidth={3}
                            dot={{ fill: '#6366f1', r: 4 }}
                            activeDot={{ r: 6, fill: '#4f46e5' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RegistrationTrendChart;
