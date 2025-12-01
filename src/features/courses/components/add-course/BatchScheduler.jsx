import React, { useState } from 'react';
import { Plus, Trash2, Calendar, Clock, Users, Edit2 } from 'lucide-react';

const BatchScheduler = ({ batches, onChange }) => {
    const [newBatch, setNewBatch] = useState({
        batchTitle: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        seats: ''
    });

    const handleAddBatch = () => {
        if (newBatch.batchTitle && newBatch.startDate) {
            const serverBatchFormat = {
                batchTitle: newBatch.batchTitle,
                startDate: newBatch.startDate,
                endDate: newBatch.endDate,
                timings: `${newBatch.startTime} - ${newBatch.endTime}`,
                seats: Number(newBatch.seats),
                id: Date.now()
            };

            onChange([...batches, serverBatchFormat]);

            setNewBatch({
                batchTitle: '',
                startDate: '',
                endDate: '',
                startTime: '',
                endTime: '',
                seats: ''
            });
        }
    };

    const removeBatch = (index) => {
        const newBatches = batches.filter((_, i) => i !== index);
        onChange(newBatches);
    };

    return (
        <div className="space-y-6">

            {/* Add Batch Form */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="text-sm font-bold text-gray-700 mb-4">Create New Batch</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        value={newBatch.batchTitle}
                        onChange={(e) => setNewBatch({ ...newBatch, batchTitle: e.target.value })}
                        placeholder="Batch Title (e.g. Weekend Batch A)"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="date"
                            value={newBatch.startDate}
                            onChange={(e) => setNewBatch({ ...newBatch, startDate: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                        />
                        <input
                            type="date"
                            value={newBatch.endDate}
                            onChange={(e) => setNewBatch({ ...newBatch, endDate: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="time"
                            value={newBatch.startTime}
                            onChange={(e) => setNewBatch({ ...newBatch, startTime: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                        />
                    </div>

                    <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="time"
                            value={newBatch.endTime}
                            onChange={(e) => setNewBatch({ ...newBatch, endTime: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                        />
                    </div>

                    <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="number"
                            value={newBatch.seats}
                            onChange={(e) => setNewBatch({ ...newBatch, seats: e.target.value })}
                            placeholder="Total Seats"
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                        />
                    </div>
                </div>

                <button
                    onClick={handleAddBatch}
                    className="w-full py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Save Schedule
                </button>
            </div>

            {/* Show Existing Batches */}
            <div className="space-y-4">
                {batches.map((batch, index) => (
                    <div key={batch.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h4 className="font-bold text-gray-800">{batch.batchTitle}</h4>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{batch.startDate} - {batch.endDate}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => removeBatch(index)}
                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{batch.timings}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                                <Users className="w-3.5 h-3.5" />
                                <span>{batch.seats} Seats</span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default BatchScheduler;
