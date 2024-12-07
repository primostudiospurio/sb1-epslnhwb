export interface Recording {
  id: string;
  name: string;
  date: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
  projectNumber: string;
  businessUnit: string;
  editingStatus: EditingDetails;
}

export interface EditingDetails {
  deliveryDate: string;
  releaseDate: string;
  responsible: string;
  status: 'not-started' | 'in-progress' | 'review' | 'finished';
}

export interface EditingStatus {
  id: string;
  recordingName: string;
  date: string;
  editingStatus: 'not-started' | 'in-progress' | 'review' | 'finished';
  responsibleEditor: string;
  deliveryDate: string;
  releaseDate: string;
  projectNumber: string;
  businessUnit: string;
}