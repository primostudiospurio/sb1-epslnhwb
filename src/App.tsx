import React, { useState } from 'react';
import { TabNavigation } from './components/TabNavigation';
import { RecordingForm } from './components/RecordingForm';
import { RecordingList } from './components/RecordingList';
import { EditingStatusList } from './components/EditingStatusList';
import type { Recording } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'recordings' | 'editing'>('recordings');
  const [recordings, setRecordings] = useState<Recording[]>([]);

  const handleAddRecording = (newRecording: Omit<Recording, 'id'>) => {
    const recording: Recording = {
      ...newRecording,
      id: crypto.randomUUID(),
    };
    setRecordings([...recordings, recording]);
    // Automatically switch to editing tab after adding a recording
    setActiveTab('editing');
  };

  const handleUpdateRecordingStatus = (id: string, status: Recording['status']) => {
    setRecordings(recordings.map(recording =>
      recording.id === id ? { ...recording, status } : recording
    ));
  };

  const handleUpdateEditingStatus = (id: string, status: Recording['editingStatus']['status']) => {
    setRecordings(recordings.map(recording =>
      recording.id === id ? {
        ...recording,
        editingStatus: {
          ...recording.editingStatus,
          status
        }
      } : recording
    ));
  };

  // Transform recordings into editing status format
  const editingStatuses = recordings.map(recording => ({
    id: recording.id,
    recordingName: recording.name,
    date: recording.editingStatus.deliveryDate,
    editingStatus: recording.editingStatus.status,
    responsibleEditor: recording.editingStatus.responsible,
    deliveryDate: recording.editingStatus.deliveryDate,
    releaseDate: recording.editingStatus.releaseDate,
    projectNumber: recording.projectNumber,
    businessUnit: recording.businessUnit
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Recording Management System
        </h1>
        
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === 'recordings' && (
          <>
            <RecordingForm onSubmit={handleAddRecording} />
            <RecordingList 
              recordings={recordings} 
              onUpdateStatus={handleUpdateRecordingStatus}
            />
          </>
        )}

        {activeTab === 'editing' && (
          <EditingStatusList 
            editingStatuses={editingStatuses}
            onUpdateStatus={handleUpdateEditingStatus}
          />
        )}
      </div>
    </div>
  );
}