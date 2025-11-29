import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Video, PlayCircle } from 'lucide-react';

const CurriculumBuilder = ({ modules, onChange, errors = {} }) => {
    const [expandedModules, setExpandedModules] = useState({});

    const toggleModule = (index) => {
        setExpandedModules(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const addModule = () => {
        onChange([...modules, { title: '', lessons: [] }]);
    };

    const removeModule = (index) => {
        const newModules = modules.filter((_, i) => i !== index);
        onChange(newModules);
    };

    const updateModuleTitle = (index, title) => {
        const newModules = [...modules];
        newModules[index].title = title;
        onChange(newModules);
    };

    const addLesson = (moduleIndex) => {
        const newModules = [...modules];
        newModules[moduleIndex].lessons.push({
            title: '',
            duration: '',
            type: 'video', // Default type
            videoFile: null,
            materialFile: null,
            quiz: []
        });
        onChange(newModules);
        setExpandedModules(prev => ({ ...prev, [moduleIndex]: true }));
    };

    const removeLesson = (moduleIndex, lessonIndex) => {
        const newModules = [...modules];
        newModules[moduleIndex].lessons = newModules[moduleIndex].lessons.filter((_, i) => i !== lessonIndex);
        onChange(newModules);
    };

    const updateLesson = (moduleIndex, lessonIndex, field, value) => {
        const newModules = [...modules];
        newModules[moduleIndex].lessons[lessonIndex][field] = value;
        onChange(newModules);
    };

    // Quiz Helper Functions
    const addQuizQuestion = (moduleIndex, lessonIndex) => {
        const newModules = [...modules];
        newModules[moduleIndex].lessons[lessonIndex].quiz.push({
            question: '',
            options: ['', '', '', ''],
            answer: ''
        });
        onChange(newModules);
    };

    const updateQuizQuestion = (moduleIndex, lessonIndex, qIndex, field, value) => {
        const newModules = [...modules];
        newModules[moduleIndex].lessons[lessonIndex].quiz[qIndex][field] = value;
        onChange(newModules);
    };

    const updateQuizOption = (moduleIndex, lessonIndex, qIndex, oIndex, value) => {
        const newModules = [...modules];
        newModules[moduleIndex].lessons[lessonIndex].quiz[qIndex].options[oIndex] = value;
        onChange(newModules);
    };

    const removeQuizQuestion = (moduleIndex, lessonIndex, qIndex) => {
        const newModules = [...modules];
        newModules[moduleIndex].lessons[lessonIndex].quiz = newModules[moduleIndex].lessons[lessonIndex].quiz.filter((_, i) => i !== qIndex);
        onChange(newModules);
    };

    return (
        <div className="space-y-6">
            {errors.curriculum && typeof errors.curriculum === 'string' && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                    {errors.curriculum}
                </div>
            )}

            {modules.map((module, mIndex) => (
                <div key={mIndex} className={`bg-gray-50 rounded-xl border overflow-hidden animate-slideUp ${errors[`curriculum.${mIndex}.title`] || errors[`curriculum.${mIndex}.lessons`] ? 'border-red-300' : 'border-gray-200'}`}>
                    {/* Module Header */}
                    <div className="p-4 flex items-center gap-4 bg-white border-b border-gray-200">
                        <button
                            onClick={() => toggleModule(mIndex)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                            {expandedModules[mIndex] ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                        </button>
                        <div className="flex-1">
                            <input
                                type="text"
                                value={module.title}
                                onChange={(e) => updateModuleTitle(mIndex, e.target.value)}
                                placeholder={`Module ${mIndex + 1} Title`}
                                className={`w-full px-3 py-1.5 border-none bg-transparent font-medium text-gray-800 focus:ring-0 placeholder-gray-400 ${errors[`curriculum.${mIndex}.title`] ? 'text-red-500 placeholder-red-300' : ''}`}
                            />
                            {errors[`curriculum.${mIndex}.title`] && <p className="text-xs text-red-500 px-3">{errors[`curriculum.${mIndex}.title`]}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => addLesson(mIndex)}
                                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                            >
                                <Plus className="w-3 h-3" />
                                Add Lesson
                            </button>
                            <button
                                onClick={() => removeModule(mIndex)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Lessons List */}
                    {expandedModules[mIndex] && (
                        <div className="p-4 space-y-3">
                            {errors[`curriculum.${mIndex}.lessons`] && (
                                <div className="text-xs text-red-500 mb-2">{errors[`curriculum.${mIndex}.lessons`]}</div>
                            )}

                            {module.lessons.map((lesson, lIndex) => (
                                <div key={lIndex} className="p-3 bg-white rounded-lg border border-gray-200 animate-fadeIn space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                                            <PlayCircle className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
                                            <div className="col-span-1 md:col-span-1">
                                                <input
                                                    type="text"
                                                    value={lesson.title}
                                                    onChange={(e) => updateLesson(mIndex, lIndex, 'title', e.target.value)}
                                                    placeholder="Lesson Title"
                                                    className={`w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:border-indigo-500 ${errors[`curriculum.${mIndex}.lessons.${lIndex}.title`] ? 'border-red-500' : 'border-gray-200'}`}
                                                />
                                                {errors[`curriculum.${mIndex}.lessons.${lIndex}.title`] && <p className="text-xs text-red-500 mt-1">{errors[`curriculum.${mIndex}.lessons.${lIndex}.title`]}</p>}
                                            </div>

                                            <div className="col-span-1 md:col-span-1">
                                                <input
                                                    type="text"
                                                    value={lesson.duration}
                                                    onChange={(e) => updateLesson(mIndex, lIndex, 'duration', e.target.value)}
                                                    placeholder="Duration"
                                                    className={`w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:border-indigo-500 ${errors[`curriculum.${mIndex}.lessons.${lIndex}.duration`] ? 'border-red-500' : 'border-gray-200'}`}
                                                />
                                                {errors[`curriculum.${mIndex}.lessons.${lIndex}.duration`] && <p className="text-xs text-red-500 mt-1">{errors[`curriculum.${mIndex}.lessons.${lIndex}.duration`]}</p>}
                                            </div>

                                            <select
                                                value={lesson.type}
                                                onChange={(e) => updateLesson(mIndex, lIndex, 'type', e.target.value)}
                                                className="col-span-1 md:col-span-1 w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 bg-white"
                                            >
                                                <option value="video">Video</option>
                                                <option value="material">Material (PDF)</option>
                                                <option value="quiz">Quiz</option>
                                            </select>

                                            <div className="col-span-1 md:col-span-1 flex items-center gap-2">
                                                {lesson.type === 'video' && (
                                                    <div className="w-full">
                                                        <input
                                                            type="file"
                                                            accept="video/*"
                                                            onChange={(e) => updateLesson(mIndex, lIndex, 'videoFile', e.target.files[0])}
                                                            className={`w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${errors[`curriculum.${mIndex}.lessons.${lIndex}.videoFile`] ? 'text-red-500' : ''}`}
                                                        />
                                                        {errors[`curriculum.${mIndex}.lessons.${lIndex}.videoFile`] && <p className="text-xs text-red-500 mt-1">{errors[`curriculum.${mIndex}.lessons.${lIndex}.videoFile`]}</p>}
                                                    </div>
                                                )}
                                                {lesson.type === 'material' && (
                                                    <div className="w-full">
                                                        <input
                                                            type="file"
                                                            accept=".pdf"
                                                            onChange={(e) => updateLesson(mIndex, lIndex, 'materialFile', e.target.files[0])}
                                                            className={`w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${errors[`curriculum.${mIndex}.lessons.${lIndex}.materialFile`] ? 'text-red-500' : ''}`}
                                                        />
                                                        {errors[`curriculum.${mIndex}.lessons.${lIndex}.materialFile`] && <p className="text-xs text-red-500 mt-1">{errors[`curriculum.${mIndex}.lessons.${lIndex}.materialFile`]}</p>}
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => removeLesson(mIndex, lIndex)}
                                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors ml-auto"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quiz Builder */}
                                    {lesson.type === 'quiz' && (
                                        <div className="pl-12 pr-2 pb-2 space-y-3 border-t border-gray-100 pt-3">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-medium text-gray-700">Quiz Questions</h4>
                                                <button
                                                    onClick={() => addQuizQuestion(mIndex, lIndex)}
                                                    className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                                                >
                                                    <Plus className="w-3 h-3" /> Add Question
                                                </button>
                                            </div>

                                            {errors[`curriculum.${mIndex}.lessons.${lIndex}.quiz`] && (
                                                <p className="text-xs text-red-500">{errors[`curriculum.${mIndex}.lessons.${lIndex}.quiz`]}</p>
                                            )}

                                            {lesson.quiz && lesson.quiz.map((q, qIndex) => (
                                                <div key={qIndex} className="bg-gray-50 p-3 rounded-lg space-y-2">
                                                    <div className="flex gap-2">
                                                        <div className="flex-1">
                                                            <input
                                                                type="text"
                                                                value={q.question}
                                                                onChange={(e) => updateQuizQuestion(mIndex, lIndex, qIndex, 'question', e.target.value)}
                                                                placeholder="Question"
                                                                className={`w-full px-3 py-1.5 text-sm border rounded-md ${errors[`curriculum.${mIndex}.lessons.${lIndex}.quiz.${qIndex}.question`] ? 'border-red-500' : 'border-gray-200'}`}
                                                            />
                                                            {errors[`curriculum.${mIndex}.lessons.${lIndex}.quiz.${qIndex}.question`] && <p className="text-xs text-red-500 mt-1">{errors[`curriculum.${mIndex}.lessons.${lIndex}.quiz.${qIndex}.question`]}</p>}
                                                        </div>
                                                        <button onClick={() => removeQuizQuestion(mIndex, lIndex, qIndex)} className="text-red-500 hover:bg-red-100 p-1 rounded">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {q.options.map((opt, oIndex) => (
                                                            <div key={oIndex}>
                                                                <input
                                                                    type="text"
                                                                    value={opt}
                                                                    onChange={(e) => updateQuizOption(mIndex, lIndex, qIndex, oIndex, e.target.value)}
                                                                    placeholder={`Option ${oIndex + 1}`}
                                                                    className={`w-full px-3 py-1.5 text-sm border rounded-md ${errors[`curriculum.${mIndex}.lessons.${lIndex}.quiz.${qIndex}.options.${oIndex}`] ? 'border-red-500' : 'border-gray-200'}`}
                                                                />
                                                                {errors[`curriculum.${mIndex}.lessons.${lIndex}.quiz.${qIndex}.options.${oIndex}`] && <p className="text-xs text-red-500 mt-1">{errors[`curriculum.${mIndex}.lessons.${lIndex}.quiz.${qIndex}.options.${oIndex}`]}</p>}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            value={q.answer}
                                                            onChange={(e) => updateQuizQuestion(mIndex, lIndex, qIndex, 'answer', e.target.value)}
                                                            placeholder="Correct Answer (must match one option exactly)"
                                                            className={`w-full px-3 py-1.5 text-sm border rounded-md ${errors[`curriculum.${mIndex}.lessons.${lIndex}.quiz.${qIndex}.answer`] ? 'border-red-500' : 'border-gray-200'}`}
                                                        />
                                                        {errors[`curriculum.${mIndex}.lessons.${lIndex}.quiz.${qIndex}.answer`] && <p className="text-xs text-red-500 mt-1">{errors[`curriculum.${mIndex}.lessons.${lIndex}.quiz.${qIndex}.answer`]}</p>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {module.lessons.length === 0 && (
                                <div className="text-center py-4 text-sm text-gray-500">
                                    No lessons added yet. Click "Add Lesson" to start.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}

            <button
                onClick={addModule}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
            >
                <Plus className="w-5 h-5" />
                Add Module
            </button>
        </div>
    );
};

export default CurriculumBuilder;
