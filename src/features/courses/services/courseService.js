import { API } from "../../../../core/url";

export const courseAPI = {
    // Get filter options (categories, training modes, levels)
    getFilterOptions: async () => {
        try {
            const response = await API.get('/course/filter-options');
            return response.data;
        } catch (error) {
            console.error('Error fetching filter options:', error);
            throw error;
        }
    },

    // Get all courses with filters and pagination
    getCourses: async (params = {}) => {
        try {
            const response = await API.get('/course/all', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching courses:', error);
            throw error;
        }
    },

    // Get course by ID
    getCourseById: async (id) => {
        try {
            const response = await API.get(`/course/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching course:', error);
            throw error;
        }
    },

    // Create course
    createCourse: async (formData) => {
        try {
            const response = await API.post('/course/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating course:', error);
            throw error;
        }
    },
};
