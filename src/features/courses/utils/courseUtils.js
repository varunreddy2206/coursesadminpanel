// Status badge configuration
export const getStatusConfig = (status) => {
    const statusConfig = {
        Active: { bg: 'bg-green-50', text: 'text-green-700', label: 'Active' },
        Upcoming: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Upcoming' },
        Completed: { bg: 'bg-gray-50', text: 'text-gray-700', label: 'Completed' },
        Draft: { bg: 'bg-yellow-50', text: 'text-yellow-700', label: 'Draft' }
    };
    return statusConfig[status] || statusConfig.Active;
};

// Mode badge configuration
export const getModeConfig = (mode) => {
    const modeConfig = {
        'Online': { bg: 'bg-indigo-50', text: 'text-indigo-700', icon: '🌐' },
        'Offline': { bg: 'bg-purple-50', text: 'text-purple-700', icon: '🏢' },
        'Classroom': { bg: 'bg-blue-50', text: 'text-blue-700', icon: '🎓' },
        'Self Learning': { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: '📚' },
        'Enterprise': { bg: 'bg-orange-50', text: 'text-orange-700', icon: '🏆' },
        'Live Classes': { bg: 'bg-pink-50', text: 'text-pink-700', icon: '🎥' }
    };
    return modeConfig[mode] || modeConfig['Self Learning'];
};

// Format price - handles null/undefined values
export const formatPrice = (price) => {
    if (price === null || price === undefined || isNaN(price)) {
        return '$0';
    }
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `$${numPrice.toLocaleString()}`;
};

// Format number with K suffix - handles null/undefined values
export const formatNumber = (num) => {
    if (num === null || num === undefined || isNaN(num)) {
        return '0';
    }
    const numValue = typeof num === 'string' ? parseFloat(num) : num;
    if (numValue >= 1000) {
        return `${(numValue / 1000).toFixed(1)}K`;
    }
    return numValue.toString();
};
