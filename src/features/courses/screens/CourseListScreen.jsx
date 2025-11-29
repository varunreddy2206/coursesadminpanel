import React, { useState } from 'react';
import { Plus, Search, Grid3x3, List } from 'lucide-react';
import FilterSidebar from '../components/FilterSidebar';
import CourseCard from '../components/CourseCard';
import { coursesData } from '../data/coursesData';
import { useCourseFilters } from '../hooks/useCourseFilters';

const CourseListScreen = () => {
    const [layout, setLayout] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [filters, setFilters] = useState({
        modes: [],
        categories: [],
        statuses: [],
        priceRange: { min: '', max: '' }
    });
    const [appliedFilters, setAppliedFilters] = useState(filters);

    // Use custom hook for filtering logic
    const filteredCourses = useCourseFilters(coursesData, appliedFilters, searchTerm, sortBy);

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const handleApplyFilters = () => {
        setAppliedFilters(filters);
    };

    const handleClearFilters = () => {
        const clearedFilters = {
            modes: [],
            categories: [],
            statuses: [],
            priceRange: { min: '', max: '' }
        };
        setFilters(clearedFilters);
        setAppliedFilters(clearedFilters);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">All Courses</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and organize your course catalog</p>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
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
                    {/* Search, Sort, Count and Layout Toggle - All in one row */}
                    <div className="flex items-center gap-3">
                        {/* Left side: Search and Sort */}
                        <div className="flex-1 flex gap-3">
                            {/* Search Bar */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                                />
                            </div>

                            {/* Sort Dropdown */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm appearance-none bg-white cursor-pointer"
                            >
                                <option value="title">Sort by Title</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="students">Most Students</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>

                        {/* Right side: Course Count and Layout Toggle */}
                        <div className="flex items-center gap-4">
                            <p className="text-sm text-gray-600 whitespace-nowrap">
                                <span className="font-semibold">{filteredCourses.length}</span> courses
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

                    {/* Courses Grid/List - 2 cards per row */}
                    <div className={
                        layout === 'grid'
                            ? 'grid grid-cols-1 lg:grid-cols-2 gap-6'
                            : 'space-y-4'
                    }>
                        {filteredCourses.map(course => (
                            <CourseCard key={course.id} course={course} layout={layout} />
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredCourses.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No courses found matching your criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseListScreen;
