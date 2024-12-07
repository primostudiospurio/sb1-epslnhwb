import React from 'react';
import { Mic, Film } from 'lucide-react';

interface Props {
  activeTab: 'recordings' | 'editing';
  onTabChange: (tab: 'recordings' | 'editing') => void;
}

export function TabNavigation({ activeTab, onTabChange }: Props) {
  return (
    <div className="flex space-x-1 mb-6">
      <button
        onClick={() => onTabChange('recordings')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          activeTab === 'recordings'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Mic size={20} />
        Recordings
      </button>
      <button
        onClick={() => onTabChange('editing')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          activeTab === 'editing'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Film size={20} />
        Editing Status
      </button>
    </div>
  );
}