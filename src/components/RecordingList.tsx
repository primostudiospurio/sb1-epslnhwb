import React from 'react';
import { Clock, CheckCircle, AlertCircle, Building2, Hash } from 'lucide-react';
import type { Recording } from '../types';
import { StatusSelect } from './StatusSelect';

interface Props {
  recordings: Recording[];
  onUpdateStatus: (id: string, status: Recording['status']) => void;
}

const statusIcons = {
  pending: <Clock className="text-yellow-500" />,
  'in-progress': <AlertCircle className="text-blue-500" />,
  completed: <CheckCircle className="text-green-500" />,
};

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

export function RecordingList({ recordings, onUpdateStatus }: Props) {
  return (
    <div className="space-y-4">
      {recordings.map((recording) => (
        <div
          key={recording.id}
          className="bg-white rounded-lg shadow-sm border overflow-hidden"
        >
          <div className="p-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-lg">{recording.name}</h3>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Hash size={16} />
                  {recording.projectNumber}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 size={16} />
                  {recording.businessUnit}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {statusIcons[recording.status]}
                <StatusSelect
                  value={recording.status}
                  options={statusOptions}
                  onChange={(value) => onUpdateStatus(recording.id, value as Recording['status'])}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}