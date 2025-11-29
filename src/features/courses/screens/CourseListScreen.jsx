import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Grid3x3, List, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import FilterSidebar from '../components/FilterSidebar';
import CourseCard from '../components/CourseCard';
import { courseAPI } from '../services/courseService';

const CourseListScreen = () => {
    const navigate = useNavigate();
    const [layout, setLayout] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [filters, setFilters] = useState({
        modes: [],
        categories: [],
        levels: [],
        priceRange: { min: '', max: '' }
    });

    // API state
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalCourses: 0,
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

    // Fetch courses from API
    const fetchCourses = useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                page: pagination.page,
                limit: pagination.limit,
                search: debouncedSearch,
                sortBy: sortBy,
            };

            // Add filters
            if (filters.modes.length > 0) {
                params.modes = filters.modes.join(',');
            }
            if (filters.categories.length > 0) {
                params.categories = filters.categories.join(',');
            }
            if (filters.levels.length > 0) {
                params.level = filters.levels[0]; // API supports single level for now
            }
            if (filters.priceRange.min) {
                params.minPrice = filters.priceRange.min;
            }
            if (filters.priceRange.max) {
                params.maxPrice = filters.priceRange.max;
            }

            const response = await courseAPI.getCourses(params);

            if (response.status) {
                setCourses(response.data);
                setPagination(prev => ({
                    ...prev,
                    page: response.page,
                    totalCourses: response.totalCourses,
                    totalPages: response.totalPages
                }));
            }
        } catch (error) {
            toast.error('Failed to fetch courses');
            console.error('Fetch courses error:', error);
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.limit, debouncedSearch, sortBy, filters]);

    // Fetch courses on mount and when dependencies change
    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const handleApplyFilters = () => {
        setPagination(prev => ({ ...prev, page: 1 })); // Reset to page 1 when applying filters
    };

    const handleClearFilters = () => {
        const clearedFilters = {
            modes: [],
            categories: [],
            levels: [],
            priceRange: { min: '', max: '' }
        };
        setFilters(clearedFilters);
        setSearchTerm('');
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, page: newPage }));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    console.log("courses----", courses[0]);

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">All Courses</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and organize your course catalog</p>
                </div>

                <button
                    onClick={() => navigate('/courses/add')}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Course
                </button>
            </div>

            {/* Main Content */}
            <div className="flex gap-6">
                {/* Filter Sidebar */}
                <FilterSidebar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={handleClearFilters}
                />

                {/* Courses Content */}
                <div className="flex-1 space-y-4">
                    {/* Search, Sort, Count and Layout Toggle */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1 flex gap-3">
                            {/* Search Bar */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search by title or subtitle..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                                />
                                {searchTerm && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        {debouncedSearch !== searchTerm ? (
                                            <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                                        ) : null}
                                    </div>
                                )}
                            </div>

                            {/* Sort Dropdown */}
                            {/* <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm appearance-none bg-white cursor-pointer"
                            >
                                <option value="title">Sort by Title</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="students">Most Students</option>
                                <option value="rating">Highest Rated</option>
                            </select> */}
                        </div>

                        {/* Right side: Course Count and Layout Toggle */}
                        <div className="flex items-center gap-4">
                            <p className="text-sm text-gray-600 whitespace-nowrap">
                                <span className="font-semibold">{pagination.totalCourses}</span> courses
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

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                        </div>
                    ) : (
                        <>
                            {/* Courses Grid/List */}
                            <div className={
                                layout === 'grid'
                                    ? 'grid grid-cols-1 lg:grid-cols-2 gap-6'
                                    : 'space-y-4'
                            }>
                                {courses.map(course => (
                                    <CourseCard key={course._id} course={course} layout={layout} />
                                ))}
                            </div>

                            {/* Empty State */}
                            {courses.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">No courses found matching your criteria</p>
                                </div>
                            )}

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                    <p className="text-sm text-gray-600">
                                        Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                                        {Math.min(pagination.page * pagination.limit, pagination.totalCourses)} of{' '}
                                        {pagination.totalCourses} courses
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
                                                // Show first, last, current, and adjacent pages
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseListScreen;
