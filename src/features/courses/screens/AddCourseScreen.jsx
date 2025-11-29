import React, { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Step1BasicDetails from '../components/add-course/Step1BasicDetails';
import Step2Curriculum from '../components/add-course/Step2Curriculum';
import { API } from '../../../../core/url';

const AddCourseScreen = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        category: '',
        level: '',
        title: '',
        subtitle: '',
        description: '',
        learningOutcomes: [],
        requirements: [],
        instructorName: '',
        coverImage: null,
        curriculumPdf: null,
        duration: '',
        lessonCount: '',
        studentLimit: '',
        language: 'english',
        hasCertificate: true,

        curriculum: [],
        batches: [],
        pricing: {
            basePrice: '',
            discountPrice: '',
            includeGst: false,
            totalPrice: '0.00'
        }
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.level) newErrors.level = 'Skill level is required';
        if (!formData.title.trim()) newErrors.title = 'Course title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.instructorName.trim()) newErrors.instructorName = 'Instructor name is required';
        if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
        if (!formData.lessonCount) newErrors.lessonCount = 'Total lessons count is required';
        if (!formData.language) newErrors.language = 'Language is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};

        // Pricing Validation
        if (!formData.pricing.basePrice) {
            newErrors['pricing.basePrice'] = 'Base price is required';
        }

        // Curriculum Validation
        if (!formData.curriculum || formData.curriculum.length === 0) {
            newErrors.curriculum = 'At least one module is required';
        } else {
            formData.curriculum.forEach((module, mIndex) => {
                if (!module.title.trim()) {
                    newErrors[`curriculum.${mIndex}.title`] = 'Module title is required';
                }

                if (!module.lessons || module.lessons.length === 0) {
                    newErrors[`curriculum.${mIndex}.lessons`] = 'At least one lesson is required in this module';
                } else {
                    module.lessons.forEach((lesson, lIndex) => {
                        if (!lesson.title.trim()) {
                            newErrors[`curriculum.${mIndex}.lessons.${lIndex}.title`] = 'Lesson title is required';
                        }
                        if (!lesson.duration.trim()) {
                            newErrors[`curriculum.${mIndex}.lessons.${lIndex}.duration`] = 'Duration is required';
                        }

                        if (lesson.type === 'video' && !lesson.videoFile) {
                            newErrors[`curriculum.${mIndex}.lessons.${lIndex}.videoFile`] = 'Video file is required';
                        }
                        if (lesson.type === 'material' && !lesson.materialFile) {
                            newErrors[`curriculum.${mIndex}.lessons.${lIndex}.materialFile`] = 'Material file is required';
                        }
                        if (lesson.type === 'quiz') {
                            if (!lesson.quiz || lesson.quiz.length === 0) {
                                newErrors[`curriculum.${mIndex}.lessons.${lIndex}.quiz`] = 'At least one question is required';
                            } else {
                                lesson.quiz.forEach((q, qIndex) => {
                                    if (!q.question.trim()) {
                                        newErrors[`curriculum.${mIndex}.lessons.${lIndex}.quiz.${qIndex}.question`] = 'Question is required';
                                    }
                                    if (!q.answer.trim()) {
                                        newErrors[`curriculum.${mIndex}.lessons.${lIndex}.quiz.${qIndex}.answer`] = 'Answer is required';
                                    }
                                    q.options.forEach((opt, oIndex) => {
                                        if (!opt.trim()) {
                                            newErrors[`curriculum.${mIndex}.lessons.${lIndex}.quiz.${qIndex}.options.${oIndex}`] = 'Option is required';
                                        }
                                    });
                                });
                            }
                        }
                    });
                }
            });
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep1()) {
            setErrors({});
            setCurrentStep(2);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePublish = async () => {
        if (!validateStep2()) {
            toast.error('Please fix the validation errors before publishing.');
            return;
        }

        setIsLoading(true);
        const loadingToast = toast.loading('Publishing course...');

        try {
            const data = new FormData();

            data.append('category', formData.category);
            data.append('level', formData.level);
            data.append('title', formData.title);
            data.append('subtitle', formData.subtitle);
            data.append('description', formData.description);

            formData.learningOutcomes.forEach(item => data.append('skills', item));
            formData.requirements.forEach(item => data.append('careerOpportunities', item));

            // Instructor
            data.append('instructorName', formData.instructorName);

            data.append('totalHours', formData.duration);
            data.append('lessonsCount', formData.lessonCount);
            data.append('studentLimit', formData.studentLimit || 0);
            data.append('language', formData.language);
            data.append('certificate', formData.hasCertificate);

            // Files
            if (formData.coverImage) {
                data.append('thumbnail', formData.coverImage);
            }
            if (formData.curriculumPdf) {
                data.append('curriculumPdf', formData.curriculumPdf);
            }

            // Training Options
            data.append('trainingOptions', 'Self Learning');

            // Curriculum & Videos/Materials
            const curriculumForJson = formData.curriculum.map(module => ({
                moduleTitle: module.title,
                lessons: module.lessons.map(lesson => ({
                    title: lesson.title,
                    duration: lesson.duration,
                    type: lesson.type,
                    quiz: lesson.type === 'quiz' ? lesson.quiz : undefined
                }))
            }));

            data.append('curriculum', JSON.stringify(curriculumForJson));

            // Append files in order
            formData.curriculum.forEach(module => {
                module.lessons.forEach(lesson => {
                    if (lesson.type === 'video' && lesson.videoFile) {
                        data.append('lessonVideos', lesson.videoFile);
                    } else if (lesson.type === 'material' && lesson.materialFile) {
                        data.append('lessonMaterials', lesson.materialFile);
                    }
                });
            });

            // Pricing
            data.append('basePrice', formData.pricing.basePrice);
            data.append('discount', formData.pricing.discountPrice);

            // Send Request
<<<<<<< HEAD
            const response = await axios.post('https://itraining-backend.nuhvin.com/course/create', data, {
=======
            const response = await API.post('/course/create', data, {
>>>>>>> a9316c540e47bfb0469a0d6dcf40eb9340c87f31
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.status) {
                toast.success('Course created successfully!', { id: loadingToast });
                // Optional: Redirect or reset form
            } else {
                toast.error('Failed to create course: ' + response.data.message, { id: loadingToast });
            }

        } catch (error) {
            console.error('Error publishing course:', error);
            toast.error('Error publishing course: ' + (error.response?.data?.message || error.message), { id: loadingToast });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8 pb-12">
            <Toaster position="top-right" />
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Create New Course</h1>
                <p className="text-sm text-gray-500 mt-1">Fill in the details to publish a new course</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-4">
                    {/* Step 1 Indicator */}
                    <div className="flex items-center gap-3">
                        <div className={`
              w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
              ${currentStep >= 1 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-gray-100 text-gray-400'}
            `}>
                            {currentStep > 1 ? <Check className="w-5 h-5" /> : '1'}
                        </div>
                        <span className={`text-sm font-medium ${currentStep >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                            Basic Details
                        </span>
                    </div>

                    {/* Connector */}
                    <div className={`w-20 h-1 rounded-full transition-all duration-300 ${currentStep > 1 ? 'bg-indigo-600' : 'bg-gray-200'}`} />

                    {/* Step 2 Indicator */}
                    <div className="flex items-center gap-3">
                        <div className={`
              w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
              ${currentStep >= 2 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-gray-100 text-gray-400'}
            `}>
                            2
                        </div>
                        <span className={`text-sm font-medium ${currentStep >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>
                            Curriculum & Pricing
                        </span>
                    </div>
                </div>
            </div>

            {/* Step Content */}
            <div className="max-w-7xl mx-auto">
                {currentStep === 1 && (
                    <Step1BasicDetails
                        formData={formData}
                        setFormData={setFormData}
                        onNext={handleNext}
                        errors={errors}
                    />
                )}
                {currentStep === 2 && (
                    <Step2Curriculum
                        formData={formData}
                        setFormData={setFormData}
                        onBack={() => setCurrentStep(1)}
                        onPublish={handlePublish}
                        errors={errors}
                        isLoading={isLoading}
                    />
                )}
            </div>
        </div>
    );
};

export default AddCourseScreen;
