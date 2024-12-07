import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { Recording } from '../types';

interface Props {
  onSubmit: (recording: Omit<Recording, 'id'>) => void;
}

export function RecordingForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    assignedTo: '',
    projectNumber: '',
    businessUnit: '',
    editingStatus: {
      deliveryDate: '',
      releaseDate: '',
      responsible: '',
      status: 'not-started' as const
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('editing.')) {
      const editingField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        editingStatus: {
          ...prev.editingStatus,
          [editingField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: new Date().toISOString(),
      status: 'pending',
    });
    setFormData({
      name: '',
      assignedTo: '',
      projectNumber: '',
      businessUnit: '',
      editingStatus: {
        deliveryDate: '',
        releaseDate: '',
        responsible: '',
        status: 'not-started'
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border mb-6">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recording Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assigned To
          </label>
          <input
            type="text"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Number
          </label>
          <input
            type="text"
            name="projectNumber"
            value={formData.projectNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Unit
          </label>
          <input
            type="text"
            name="businessUnit"
            value={formData.businessUnit}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Editing Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Date
            </label>
            <input
              type="date"
              name="editing.deliveryDate"
              value={formData.editingStatus.deliveryDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Release Date
            </label>
            <input
              type="date"
              name="editing.releaseDate"
              value={formData.editingStatus.releaseDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Responsible Editor
            </label>
            <input
              type="text"
              name="editing.responsible"
              value={formData.editingStatus.responsible}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <PlusCircle size={20} />
          Add Recording
        </button>
      </div>
    </form>
  );
}