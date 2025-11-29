import React from 'react';
import StatsCard from '../components/StatsCard';
import RegistrationTrendChart from '../components/RegistrationTrendChart';
import RecentPayments from '../components/RecentPayments';
import RecentRegistrations from '../components/RecentRegistrations';
import { statsData } from '../data/statsData';

const DashboardScreen = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </div>

            {/* Charts Section - 70/30 Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                <div className="lg:col-span-7">
                    <RegistrationTrendChart />
                </div>
                <div className="lg:col-span-3">
                    <RecentPayments />
                </div>
            </div>

            {/* Recent Registrations Table */}
            <RecentRegistrations />
        </div>
    );
};

export default DashboardScreen;
