import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Search, Grid3x3, List, Filter } from 'lucide-react';
import StudentStatsCard from '../components/StudentStatsCard';
import StudentCard from '../components/StudentCard';
import StudentDetailModal from '../components/StudentDetailModal';
import { studentStats, studentsData, filterOptions } from '../data/studentsData';

import { API } from '../../../../core/url';
import toast, { Toaster } from 'react-hot-toast';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const StudentsScreen = () => {
    const [layout, setLayout] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // API state
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalStudents: 0,
        totalPages: 0
    });

    // Debounced search state
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Fetch students from API
    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await API.get(`/auth/students?page=${pagination.page}&limit=${pagination.limit}&search=${debouncedSearch}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.status) {
                setStudents(response.data.data.students);
                setPagination(prev => ({
                    ...prev,
                    page: response.data.data.pagination.currentPage,
                    totalPages: response.data.data.pagination.totalPages,
                    totalStudents: response.data.data.pagination.totalStudents
                }));
            }
        } catch (error) {
            console.error("Error fetching students:", error);
            toast.error("Failed to fetch students");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [pagination.page, pagination.limit, debouncedSearch]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, page: newPage }));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Filtered students logic is now handled by server-side search
    // But we might still need some client-side transformation if needed
    // For now, 'students' state holds the current page data
    const filteredStudents = students;

    const handleViewDetails = (student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedStudent(null);
    };

    console.log("filteredStudents", filteredStudents);


    return (
        <div className="space-y-6">
            <Toaster position="top-right" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Students Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and track all student profiles</p>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Student
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {studentStats.map(stat => (
                    <StudentStatsCard key={stat.id} stat={stat} />
                ))}
            </div>

            <div className="flex items-center gap-3">

                <div className="flex-1 flex gap-3">

                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                        />
                    </div>

                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm appearance-none bg-white cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="graduated">Graduated</option>
                        </select>
                    </div>
                </div>

                {/* Right side: Student Count and Layout Toggle */}
                <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-600 whitespace-nowrap">
                        <span className="font-semibold">{pagination.totalStudents}</span> students
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setLayout('grid')}
                            className={`p-2 rounded-lg transition-colors ${layout === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:bg-gray-100'
                                }`}
                        >
                            <Grid3x3 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setLayout('list')}
                            className={`p-2 rounded-lg transition-colors ${layout === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:bg-gray-100'
                                }`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Students Grid/List */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                </div>
            ) : (
                <div className={
                    layout === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                        : 'space-y-4'
                }>
                    {filteredStudents.map(student => (
                        <StudentCard
                            key={student._id}
                            student={{
                                ...student,
                                id: student._id,
                                name: `${student.firstName} ${student.lastName}`,
                                location: 'N/A', // Placeholder
                                status: 'active', // Placeholder
                                courses: student.enrolledCourses?.map(c => typeof c === 'string' ? c : (c?.title || 'Unknown Course')) || [],
                                progress: 0, // Placeholder
                                joinDate: student.createdAt
                            }}
                            layout={layout}
                            onViewDetails={handleViewDetails}
                        />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {!loading && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                        Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                        {Math.min(pagination.page * pagination.limit, pagination.totalStudents)} of{' '}
                        {pagination.totalStudents} students
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(pagination.page - 1)}
                            disabled={pagination.page === 1}
                            className={`p-2 rounded-lg border transition-colors ${pagination.page === 1
                                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center gap-1">
                            {[...Array(pagination.totalPages)].map((_, index) => {
                                const pageNum = index + 1;
                                if (
                                    pageNum === 1 ||
                                    pageNum === pagination.totalPages ||
                                    (pageNum >= pagination.page - 1 && pageNum <= pagination.page + 1)
                                ) {
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${pageNum === pagination.page
                                                ? 'bg-indigo-600 text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                } else if (
                                    pageNum === pagination.page - 2 ||
                                    pageNum === pagination.page + 2
                                ) {
                                    return <span key={pageNum} className="px-2 text-gray-400">...</span>;
                                }
                                return null;
                            })}
                        </div>

                        <button
                            onClick={() => handlePageChange(pagination.page + 1)}
                            disabled={pagination.page === pagination.totalPages}
                            className={`p-2 rounded-lg border transition-colors ${pagination.page === pagination.totalPages
                                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {filteredStudents.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No students found matching your criteria</p>
                </div>
            )}

            {/* Detail Modal */}
            <StudentDetailModal
                student={selectedStudent}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default StudentsScreen;
