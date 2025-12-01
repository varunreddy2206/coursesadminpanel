import React, { useState } from 'react';
import { BookOpen, Video, Users, Building2, ChevronLeft, Save, Send, Loader2 } from 'lucide-react';
import CurriculumBuilder from './CurriculumBuilder';
import BatchScheduler from './BatchScheduler';
import PricingSection from './PricingSection';

const Step2Curriculum = ({ formData, setFormData, onBack, onPublish, errors, isLoading }) => {
    // Use trainingOption from formData instead of local state
    const activeTab = formData.trainingOption;

    const tabs = [
        { id: 'Self Learning', label: 'Self Learning', icon: BookOpen },
        { id: 'Live Classes', label: 'Live Classes', icon: Video },
        { id: 'Classroom Classes', label: 'Classroom Classes', icon: Building2 },
        { id: 'Corporate', label: 'Corporate', icon: Users },
    ];

    const handleTabChange = (tabId) => {
        setFormData(prev => ({ ...prev, trainingOption: tabId }));
    };

    const handleCurriculumChange = (modules) => {
        setFormData(prev => ({ ...prev, curriculum: modules }));
    };

    const handleBatchesChange = (batches) => {
        setFormData(prev => ({ ...prev, batches }));
    };

    const handlePricingChange = (pricing) => {
        setFormData(prev => ({ ...prev, pricing }));
    };

    return (
        <div className="animate-fadeIn space-y-8">
            {/* Training Options Tabs */}
            <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm inline-flex gap-1">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }
              `}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Curriculum/Schedule - 66% */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[500px]">
                        <h2 className="text-lg font-bold text-gray-800 mb-6">
                            {activeTab === 'Self Learning' ? 'Curriculum Builder' : 'Batch Schedule'}
                        </h2>

                        {activeTab === 'Self Learning' && (
                            <CurriculumBuilder
                                modules={formData.curriculum || []}
                                onChange={handleCurriculumChange}
                                errors={errors}
                            />
                        )}

                        {(activeTab === 'Live Classes' || activeTab === 'Classroom Classes') && (
                            <BatchScheduler
                                batches={formData.batches || []}
                                onChange={handleBatchesChange}
                            />
                        )}

                        {activeTab === 'Corporate' && (
                            <div className="text-center py-12 text-gray-500">
                                Corporate training configuration coming soon...
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Pricing - 33% */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6">
                        <PricingSection
                            pricing={formData.pricing || {}}
                            onChange={handlePricingChange}
                            errors={errors}
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                </button>
                <div className="flex items-center gap-4">
                    <button className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                        Save Draft
                    </button>
                    <button
                        onClick={onPublish}
                        disabled={isLoading}
                        className={`flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        {isLoading ? 'Publishing...' : 'Publish Course'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step2Curriculum;
