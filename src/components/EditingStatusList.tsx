import React from 'react';
import { Clock, Edit2, FileSearch, CheckCircle, Calendar, Building2, Hash } from 'lucide-react';
import type { EditingStatus } from '../types';
import { StatusSelect } from './StatusSelect';

interface Props {
  editingStatuses: EditingStatus[];
  onUpdateStatus: (id: string, status: EditingStatus['editingStatus']) => void;
}

const statusIcons = {
  'not-started': <Clock className="text-gray-500" />,
  'in-progress': <Edit2 className="text-blue-500" />,
  'review': <FileSearch className="text-purple-500" />,
  'finished': <CheckCircle className="text-green-500" />,
};

const statusOptions = [
  { value: 'not-started', label: 'Not Started' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'review', label: 'In Review' },
  { value: 'finished', label: 'Finished' },
];

export function EditingStatusList({ editingStatuses, onUpdateStatus }: Props) {
  return (
    <div className="space-y-4">
      {editingStatuses.map((status) => (
        <div
          key={status.id}
          className="bg-white rounded-lg shadow-sm border overflow-hidden"
        >
          <div className="p-4 border-b">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-lg">{status.recordingName}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Hash size={16} />
                    {status.projectNumber}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 size={16} />
                    {status.businessUnit}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {statusIcons[status.editingStatus]}
                <StatusSelect
                  value={status.editingStatus}
                  options={statusOptions}
                  onChange={(value) => onUpdateStatus(status.id, value as EditingStatus['editingStatus'])}
                />
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Calendar size={16} />
                  Delivery Date
                </p>
                <p className="font-medium mt-1">
                  {new Date(status.deliveryDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Calendar size={16} />
                  Release Date
                </p>
                <p className="font-medium mt-1">
                  {new Date(status.releaseDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Edit2 size={16} />
                  Responsible Editor
                </p>
                <p className="font-medium mt-1">{status.responsibleEditor}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}