import React from 'react';
import { filterOptions } from '../data/coursesData';

const FilterSidebar = ({ filters, onFilterChange, onApplyFilters, onClearFilters }) => {
    const handleCheckboxChange = (filterType, value) => {
        const currentValues = filters[filterType] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];

        onFilterChange(filterType, newValues);
    };

    const handlePriceChange = (type, value) => {
        onFilterChange('priceRange', {
            ...filters.priceRange,
            [type]: value
        });
    };

    return (
        <div className="w-56 bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.1)] sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-800 mb-5">Filters</h3>

            {/* Mode Filter */}
            <div className="mb-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Mode</h4>
                <div className="space-y-2">
                    {filterOptions.modes.map((mode) => (
                        <label key={mode} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filters.modes?.includes(mode) || false}
                                onChange={() => handleCheckboxChange('modes', mode)}
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                            />
                            <span className="text-sm text-gray-600 group-hover:text-gray-900">{mode}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Category Filter */}
            <div className="mb-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Category</h4>
                <div className="space-y-2">
                    {filterOptions.categories.map((category) => (
                        <label key={category} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filters.categories?.includes(category) || false}
                                onChange={() => handleCheckboxChange('categories', category)}
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                            />
                            <span className="text-sm text-gray-600 group-hover:text-gray-900">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Status Filter */}
            <div className="mb-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Status</h4>
                <div className="space-y-2">
                    {filterOptions.statuses.map((status) => (
                        <label key={status} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filters.statuses?.includes(status) || false}
                                onChange={() => handleCheckboxChange('statuses', status)}
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                            />
                            <span className="text-sm text-gray-600 group-hover:text-gray-900">{status}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Price Range</h4>
                <div className="space-y-3">
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Min Price</label>
                        <input
                            type="number"
                            placeholder="$0"
                            value={filters.priceRange?.min || ''}
                            onChange={(e) => handlePriceChange('min', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Max Price</label>
                        <input
                            type="number"
                            placeholder="$2000"
                            value={filters.priceRange?.max || ''}
                            onChange={(e) => handlePriceChange('max', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
                <button
                    onClick={onApplyFilters}
                    className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Apply Filters
                </button>
                <button
                    onClick={onClearFilters}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default FilterSidebar;
