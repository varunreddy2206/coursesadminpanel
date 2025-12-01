import React, { useState } from 'react';
import { Plus, Search, Filter, Grid3x3, List, Download } from 'lucide-react';
import { API } from '../../../../core/url';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import RegistrationCard from '../components/RegistrationCard';
const RegistrationsScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [layout, setLayout] = useState('grid');
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalPages: 1,
        totalUsers: 0
    });

    const fetchRegistrations = async (page = 1) => {
        try {
            setLoading(true);
            const response = await API.get(`/auth/registrations?page=${page}&limit=${pagination.limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            if (response.data.status) {
                setRegistrations(response.data.data.users);
                setPagination(prev => ({
                    ...prev,
                    page: response.data.data.pagination.currentPage,
                    totalPages: response.data.data.pagination.totalPages,
                    totalUsers: response.data.data.pagination.totalUsers
                }));
            }
        } catch (error) {
            console.error("Error fetching registrations:", error);
            toast.error("Failed to fetch registrations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRegistrations(pagination.page);
    }, [pagination.page]);

    // Filter registrations (Client-side search for now, as per plan)
    const filteredRegistrations = registrations.filter(reg => {
        const matchesSearch = (reg.firstName + ' ' + reg.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.email.toLowerCase().includes(searchTerm.toLowerCase());

        // Status filter logic (assuming status field exists or default to something)
        // Since API returns users, we might not have 'status' field like 'pending'/'approved' yet unless it's in the model.
        // For now, we'll skip status filtering or assume all are 'active' if not present.
        const matchesStatus = statusFilter === 'all' || (reg.status || 'active') === statusFilter;

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

            {/* Stats Grid - Placeholder or Fetch Real Stats Later */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {registrationStats.map(stat => (
                    <RegistrationStatsCard key={stat.id} stat={stat} />
                ))}
            </div> */}

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
                        <span className="font-semibold text-orange-600">{pagination.totalUsers}</span> registrations
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
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
            ) : (
                <div className={
                    layout === 'grid'
                        ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'
                        : 'space-y-4'
                }>
                    {filteredRegistrations.map(user => (
                        // Adapting user object to RegistrationCard props if needed, or update RegistrationCard
                        // Assuming RegistrationCard expects a 'registration' object. 
                        // We need to map user data to what RegistrationCard expects or update RegistrationCard.
                        // For now, let's pass the user object and handle it.
                        <RegistrationCard
                            key={user._id}
                            registration={{
                                id: user._id,
                                student: {
                                    name: `${user.firstName} ${user.lastName}`,
                                    email: user.email,
                                    image: user.profileImage
                                },
                                course: { title: 'N/A', image: null }, // Placeholder as we fetch users, not enrollments directly here
                                status: 'active', // Placeholder
                                date: user.createdAt,
                                amount: 0 // Placeholder
                            }}
                            onViewDetails={handleViewDetails}
                        />
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-6 border-t border-gray-200 pt-4">
                <button
                    onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="text-sm text-gray-700">
                    Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                    onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.totalPages, prev.page + 1) }))}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
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
