import React from 'react';
import TagInput from './shared/TagInput';
import FileUpload from './shared/FileUpload';
import RichTextEditor from './shared/RichTextEditor';
import { ChevronRight } from 'lucide-react';

const Step1BasicDetails = ({ formData, setFormData, onNext, errors }) => {
    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddTag = (field, tag) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...(prev[field] || []), tag]
        }));
    };

    const handleRemoveTag = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="animate-fadeIn">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column - 70% */}
                <div className="flex-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Course Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Category <span className="text-red-500">*</span></label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleChange('category', e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm bg-white ${errors.category ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500'}`}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Artificial Intelligence, Data & Automation">Artificial Intelligence, Data & Automation</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Mobile App Development">Mobile App Development</option>
                                    <option value="Cloud, DevOps & Infrastructure">Cloud, DevOps & Infrastructure</option>
                                    <option value="Software Testing & QA">Software Testing & QA</option>
                                    <option value="Design & Creative Technologies">Design & Creative Technologies</option>
                                    <option value="Internship & Corporate Programs">Internship & Corporate Programs</option>
                                </select>
                                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Skill Level <span className="text-red-500">*</span></label>
                                <select
                                    value={formData.level}
                                    onChange={(e) => handleChange('level', e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm bg-white ${errors.level ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500'}`}
                                >
                                    <option value="">Select Level</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                                {errors.level && <p className="text-xs text-red-500 mt-1">{errors.level}</p>}
                            </div>
                        </div>

                        <div className="space-y-2 mb-6">
                            <label className="block text-sm font-medium text-gray-700">Course Title <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                placeholder="e.g. Complete Web Development Bootcamp 2024"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm ${errors.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500'}`}
                            />
                            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                        </div>

                        <div className="space-y-2 mb-6">
                            <label className="block text-sm font-medium text-gray-700">Sub Heading</label>
                            <input
                                type="text"
                                value={formData.subtitle}
                                onChange={(e) => handleChange('subtitle', e.target.value)}
                                placeholder="e.g. Become a full-stack developer with just one course"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                            />
                        </div>

                        <div className="mb-6">
                            <RichTextEditor
                                label="Description"
                                value={formData.description}
                                onChange={(val) => handleChange('description', val)}
                                placeholder="Write a detailed description of your course..."
                                error={errors.description}
                            />
                            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                        </div>

                        <div className="mb-6">
                            <TagInput
                                label="What you'll learn"
                                placeholder="Type and press Enter to add..."
                                tags={formData.learningOutcomes || []}
                                onAddTag={(tag) => handleAddTag('learningOutcomes', tag)}
                                onRemoveTag={(index) => handleRemoveTag('learningOutcomes', index)}
                            />
                        </div>

                        <div className="mb-6">
                            <TagInput
                                label="Requirements"
                                placeholder="Type and press Enter to add..."
                                tags={formData.requirements || []}
                                onAddTag={(tag) => handleAddTag('requirements', tag)}
                                onRemoveTag={(index) => handleRemoveTag('requirements', index)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Instructor Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={formData.instructorName || ''}
                                onChange={(e) => handleChange('instructorName', e.target.value)}
                                placeholder="Enter instructor name"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm ${errors.instructorName ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500'}`}
                            />
                            {errors.instructorName && <p className="text-xs text-red-500 mt-1">{errors.instructorName}</p>}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Media</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FileUpload
                                label="Cover Image"
                                accept="image/*"
                                value={formData.coverImage}
                                onChange={(file) => handleChange('coverImage', file)}
                                helperText="1200x600px recommended"
                            />
                            <FileUpload
                                label="Curriculum PDF"
                                accept=".pdf"
                                value={formData.curriculumPdf}
                                onChange={(file) => handleChange('curriculumPdf', file)}
                                helperText="Upload detailed syllabus PDF"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column - 30% */}
                <div className="w-full lg:w-[30%] space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Course Meta</h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Duration <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={formData.duration}
                                    onChange={(e) => handleChange('duration', e.target.value)}
                                    placeholder="e.g. 12 Weeks"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm ${errors.duration ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500'}`}
                                />
                                {errors.duration && <p className="text-xs text-red-500 mt-1">{errors.duration}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Total Lessons <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    value={formData.lessonCount}
                                    onChange={(e) => handleChange('lessonCount', e.target.value)}
                                    placeholder="e.g. 45"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm ${errors.lessonCount ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500'}`}
                                />
                                {errors.lessonCount && <p className="text-xs text-red-500 mt-1">{errors.lessonCount}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Student Limit</label>
                                <input
                                    type="number"
                                    value={formData.studentLimit}
                                    onChange={(e) => handleChange('studentLimit', e.target.value)}
                                    placeholder="e.g. 50 (Leave empty for unlimited)"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Language <span className="text-red-500">*</span></label>
                                <select
                                    value={formData.language}
                                    onChange={(e) => handleChange('language', e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm bg-white ${errors.language ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500'}`}
                                >
                                    <option value="english">English</option>
                                    <option value="spanish">Spanish</option>
                                    <option value="french">French</option>
                                </select>
                                {errors.language && <p className="text-xs text-red-500 mt-1">{errors.language}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Certification</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="certification"
                                            checked={formData.hasCertificate === true}
                                            onChange={() => handleChange('hasCertificate', true)}
                                            className="text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="text-sm text-gray-600">Yes</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="certification"
                                            checked={formData.hasCertificate === false}
                                            onChange={() => handleChange('hasCertificate', false)}
                                            className="text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="text-sm text-gray-600">No</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                <button className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                    Save Draft
                </button>
                <button
                    onClick={onNext}
                    className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                    Save & Next
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Step1BasicDetails;
