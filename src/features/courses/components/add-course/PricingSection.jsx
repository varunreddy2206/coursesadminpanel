import React, { useEffect } from 'react';
import { DollarSign, Tag, Calculator } from 'lucide-react';

const PricingSection = ({ pricing, onChange, errors = {} }) => {
    const calculateTotal = () => {
        const base = parseFloat(pricing.basePrice) || 0;
        const discount = parseFloat(pricing.discountPrice) || 0;
        const priceAfterDiscount = Math.max(0, base - discount);

        if (pricing.includeGst) {
            const gstAmount = priceAfterDiscount * 0.18;
            return (priceAfterDiscount + gstAmount).toFixed(2);
        }
        return priceAfterDiscount.toFixed(2);
    };

    useEffect(() => {
        const total = calculateTotal();
        if (total !== pricing.totalPrice) {
            onChange({ ...pricing, totalPrice: total });
        }
    }, [pricing.basePrice, pricing.discountPrice, pricing.includeGst]);

    const handleChange = (field, value) => {
        onChange({ ...pricing, [field]: value });
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Pricing & Plans</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Base Price <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="number"
                            value={pricing.basePrice}
                            onChange={(e) => handleChange('basePrice', e.target.value)}
                            placeholder="0.00"
                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm ${errors['pricing.basePrice'] ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500'}`}
                        />
                    </div>
                    {errors['pricing.basePrice'] && <p className="text-xs text-red-500 mt-1">{errors['pricing.basePrice']}</p>}
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Discounted Price</label>
                    <div className="relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="number"
                            value={pricing.discountPrice}
                            onChange={(e) => handleChange('discountPrice', e.target.value)}
                            placeholder="0.00"
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex flex-col items-center justify-between mb-2 gap-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <Calculator className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">Final Calculation</h3>
                            <p className="text-xs text-gray-500">Total price charged to student</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">Include 18% GST</span>
                        <button
                            onClick={() => handleChange('includeGst', !pricing.includeGst)}
                            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${pricing.includeGst ? 'bg-indigo-600' : 'bg-gray-200'
                                }`}
                        >
                            <span
                                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${pricing.includeGst ? 'translate-x-6' : 'translate-x-0'
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-gray-600">Total Price</span>
                    <span className="text-3xl font-bold text-indigo-600">${pricing.totalPrice}</span>
                </div>
            </div>
        </div>
    );
};

export default PricingSection;
