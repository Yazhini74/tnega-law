import React, { useState } from 'react';
import Button from './Button';

const FileUpload = ({ applicantId, onUpload, loading }) => {
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !documentType) {
      alert('Please select a file and document type');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);

    try {
      await onUpload(`/applicants/${applicantId}/documents/upload`, formData);
      setFile(null);
      setDocumentType('');
      alert('File uploaded successfully');
    } catch (error) {
      alert('Error uploading file: ' + error.message);
    }
  };

  return (
    <div className="form-section">
      <h3 className="text-lg font-semibold mb-4">Upload Documents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="documentType" className="form-label">
            Document Type <span className="text-red-500">*</span>
          </label>
          <select
            id="documentType"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="form-select"
          >
            <option value="">Select Document Type</option>
            <option value="passport_photo">Passport Photo</option>
            <option value="certificate">Certificate</option>
            <option value="court_order">Court Order</option>
            <option value="supporting_document">Supporting Document</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="file" className="form-label">
            Choose File <span className="text-red-500">*</span>
          </label>
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            className="form-input"
          />
        </div>
      </div>
      <div className="mt-4">
        <Button
          onClick={handleUpload}
          disabled={!file || !documentType || loading}
          type="button"
        >
          {loading ? 'Uploading...' : 'Upload File'}
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
