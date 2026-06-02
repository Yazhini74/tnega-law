import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import FileUpload from '../components/FileUpload';
import { getSectionData, saveSectionData } from '../utils/localStorage';

const DocumentsForm = ({ applicantId, onNext, onPrev }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (applicantId) {
      fetchDocuments();
    }
  }, [applicantId]);

  const fetchDocuments = () => {
    try {
      setLoading(true);
      const data = getSectionData(applicantId, 'documents');
      if (data) {
        setDocuments(data);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (fileData) => {
    try {
      const newDoc = {
        id: Date.now().toString(),
        file_name: fileData.name,
        document_type: fileData.type,
        uploaded_at: new Date().toISOString(),
      };
      const updatedDocuments = [...documents, newDoc];
      setDocuments(updatedDocuments);
      saveSectionData(applicantId, 'documents', updatedDocuments);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteDocument = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        const updatedDocuments = documents.filter(doc => doc.id !== id);
        setDocuments(updatedDocuments);
        saveSectionData(applicantId, 'documents', updatedDocuments);
      } catch (error) {
        alert('Error deleting document: ' + error.message);
      }
    }
  };

  const handleComplete = () => {
    onNext();
  };

  return (
    <div className="form-section">
      <h2 className="text-2xl font-bold mb-6">Upload Documents</h2>

      <div className="p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-600 mb-4">File upload is not available in localStorage mode. Document metadata will be stored locally.</p>
        <FileUpload
          applicantId={applicantId}
          onUpload={handleUpload}
          loading={loading}
        />
      </div>

      {documents.length > 0 && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Uploaded Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-white p-4 rounded-lg border flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">{doc.file_name}</p>
                  <p className="text-sm text-gray-600">
                    Uploaded: {new Date(doc.uploaded_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 pt-4 mt-8 border-t">
        <Button onClick={onPrev} variant="secondary" type="button">
          Previous
        </Button>
        <Button onClick={handleComplete} type="button" variant="success">
          Complete Application
        </Button>
      </div>
    </div>
  );
};

export default DocumentsForm;
