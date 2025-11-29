import { useMemo } from 'react';

export const useCourseFilters = (courses, filters, searchTerm, sortBy) => {
    return useMemo(() => {
        let result = [...courses];

        // Apply mode filters
        if (filters.modes?.length > 0) {
            result = result.filter(course => filters.modes.includes(course.mode));
        }

        // Apply category filters
        if (filters.categories?.length > 0) {
            result = result.filter(course => filters.categories.includes(course.category));
        }

        // Apply status filters
        if (filters.statuses?.length > 0) {
            result = result.filter(course => filters.statuses.includes(course.status));
        }

        // Apply price range filters
        if (filters.priceRange?.min) {
            result = result.filter(course => course.price >= Number(filters.priceRange.min));
        }
        if (filters.priceRange?.max) {
            result = result.filter(course => course.price <= Number(filters.priceRange.max));
        }

        // Apply search
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            result = result.filter(course =>
                course.title.toLowerCase().includes(searchLower) ||
                course.instructor.toLowerCase().includes(searchLower) ||
                course.category.toLowerCase().includes(searchLower)
            );
        }

        // Apply sorting
        result.sort((a, b) => {
            switch (sortBy) {
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'students':
                    return b.students - a.students;
                case 'rating':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });

        return result;
    }, [courses, filters, searchTerm, sortBy]);
};
