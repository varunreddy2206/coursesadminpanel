import React, { useState, useMemo } from 'react';
import { Plus, Search, Grid3x3, List, Filter } from 'lucide-react';
import StudentStatsCard from '../components/StudentStatsCard';
import StudentCard from '../components/StudentCard';
import StudentDetailModal from '../components/StudentDetailModal';
import { studentStats, studentsData, filterOptions } from '../data/studentsData';

const StudentsScreen = () => {
    const [layout, setLayout] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredStudents = useMemo(() => {
        let result = [...studentsData];

        // Apply status filter
        if (statusFilter !== 'all') {
            result = result.filter(student => student.status.toLowerCase() === statusFilter);
        }

        // Apply search
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            result = result.filter(student =>
                student.name.toLowerCase().includes(searchLower) ||
                student.email.toLowerCase().includes(searchLower) ||
                student.location.toLowerCase().includes(searchLower) ||
                student.courses.some(course => course.toLowerCase().includes(searchLower))
            );
        }

        return result;
    }, [searchTerm, statusFilter]);

    const handleViewDetails = (student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedStudent(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
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

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {studentStats.map(stat => (
                    <StudentStatsCard key={stat.id} stat={stat} />
                ))}
            </div>

            {/* Search, Filter, and Controls */}
            <div className="flex items-center gap-3">
                {/* Left side: Search and Filter */}
                <div className="flex-1 flex gap-3">
                    {/* Search Bar */}
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

                    {/* Status Filter */}
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
                        <span className="font-semibold">{filteredStudents.length}</span> students
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
            <div className={
                layout === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
            }>
                {filteredStudents.map(student => (
                    <StudentCard
                        key={student.id}
                        student={student}
                        layout={layout}
                        onViewDetails={handleViewDetails}
                    />
                ))}
            </div>

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
