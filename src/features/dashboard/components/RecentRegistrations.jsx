import React from 'react';
import { Download } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';
import { recentRegistrationsData } from '../data/statsData';

const RecentRegistrations = () => {
    const columns = [
        { header: 'Student Name', key: 'studentName' },
        { header: 'Contact Number', key: 'contactNumber' },
        { header: 'Registration Date', key: 'registrationDate' },
        { header: 'Course Enrolled', key: 'courseEnrolled' },
        { header: 'Transaction ID', key: 'transactionId' },
        { header: 'Status', key: 'status' },
        { header: 'Action', key: 'action' }
    ];

    const handleDownloadCSV = () => {
        // CSV download functionality would go here
        console.log('Downloading CSV...');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Recent Registration Users</h2>
                    <p className="text-sm text-gray-500 mt-1">Track and manage new student enrollments</p>
                </div>

                <button
                    onClick={handleDownloadCSV}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Download CSV
                </button>
            </div>

            {/* Table */}
            <DataTable
                columns={columns}
                data={recentRegistrationsData}
                searchable={true}
                filterable={true}
            />
        </div>
    );
};

export default RecentRegistrations;
