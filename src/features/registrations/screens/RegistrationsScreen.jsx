import React, { useState } from 'react';
import { Plus, Search, Filter, Grid3x3, List, Download } from 'lucide-react';
import { registrationsData, registrationStats } from '../data/registrationsData';
import RegistrationStatsCard from '../components/RegistrationStatsCard';
import RegistrationCard from '../components/RegistrationCard';
import toast, { Toaster } from 'react-hot-toast';

const RegistrationsScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [layout, setLayout] = useState('grid');
    const [registrations, setRegistrations] = useState(registrationsData);

    // Filter registrations
    const filteredRegistrations = registrations.filter(reg => {
        const matchesSearch = reg.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.course.title.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const handleViewDetails = (registration) => {
        toast('Detail modal coming soon!', { icon: '👀' });
    };

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Course Registrations</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and approve course enrollments</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200">
                        <Plus className="w-4 h-4" />
                        New Registration
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {registrationStats.map(stat => (
                    <RegistrationStatsCard key={stat.id} stat={stat} />
                ))}
            </div>

            {/* Filters and Search */}
            <div className="flex items-center gap-3">
                <div className="flex-1 flex gap-3">
                    {/* Search Bar */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by student name, email, or course..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm appearance-none bg-white cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                {/* Right side: Count and Layout Toggle */}
                <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-600 whitespace-nowrap">
                        <span className="font-semibold text-orange-600">{filteredRegistrations.length}</span> registrations
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setLayout('grid')}
                            className={`p-2 rounded-lg transition-colors ${layout === 'grid' ? 'bg-orange-50 text-orange-600' : 'text-gray-400 hover:bg-gray-100'
                                }`}
                        >
                            <Grid3x3 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setLayout('list')}
                            className={`p-2 rounded-lg transition-colors ${layout === 'list' ? 'bg-orange-50 text-orange-600' : 'text-gray-400 hover:bg-gray-100'
                                }`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Registrations Grid/List */}
            <div className={
                layout === 'grid'
                    ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
            }>
                {filteredRegistrations.map(registration => (
                    <RegistrationCard
                        key={registration.id}
                        registration={registration}
                        onViewDetails={handleViewDetails}
                    />
                ))}
            </div>

            {/* Empty State */}
            {filteredRegistrations.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-orange-600" />
                    </div>
                    <p className="text-gray-500 text-lg font-medium">No registrations found</p>
                    <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
};

export default RegistrationsScreen;
