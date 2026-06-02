import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import DynamicTableRow from '../components/DynamicTableRow';
import { getSectionData, saveSectionData } from '../utils/localStorage';

const JudgementForm = ({ applicantId, onNext, onPrev }) => {
  const [judgementRecords, setJudgementRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (applicantId) {
      fetchJudgementRecords();
    }
  }, [applicantId]);

  const fetchJudgementRecords = () => {
    try {
      setLoading(true);
      const data = getSectionData(applicantId, 'judgement');
      if (data) {
        setJudgementRecords(data);
      }
    } catch (error) {
      console.error('Error fetching judgement records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRow = () => {
    setJudgementRecords([
      ...judgementRecords,
      { caseNumber: '', caseDetails: '', judgementDetails: '', remarks: '' }
    ]);
  };

  const handleRowChange = (index, fieldName, value) => {
    const newRecords = [...judgementRecords];
    newRecords[index] = {
      ...newRecords[index],
      [fieldName]: value,
    };
    setJudgementRecords(newRecords);
  };

  const handleDeleteRow = (index) => {
    const newRecords = judgementRecords.filter((_, i) => i !== index);
    setJudgementRecords(newRecords);
  };

  const handleSave = () => {
    try {
      setLoading(true);
      saveSectionData(applicantId, 'judgement', judgementRecords);
      onNext();
    } catch (error) {
      alert('Error saving judgement records: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'caseNumber', label: 'Case Number', type: 'text' },
    { name: 'caseDetails', label: 'Case Details', type: 'textarea' },
    { name: 'judgementDetails', label: 'Judgement Details', type: 'textarea' },
    { name: 'remarks', label: 'Remarks', type: 'textarea' },
  ];

  return (
    <div className="form-section">
      <h2 className="text-2xl font-bold mb-6">Judgement Details</h2>

      {judgementRecords.length === 0 ? (
        <p className="text-gray-600 mb-4">No judgement records added yet.</p>
      ) : (
        judgementRecords.map((record, index) => (
          <DynamicTableRow
            key={index}
            fields={fields}
            data={record}
            onChange={handleRowChange}
            onDelete={handleDeleteRow}
            index={index}
          />
        ))
      )}

      <div className="mt-6 mb-6">
        <Button onClick={handleAddRow} variant="secondary" type="button">
          + Add Judgement Record
        </Button>
      </div>

      <div className="flex gap-4 pt-4 border-t">
        <Button onClick={onPrev} variant="secondary" type="button">
          Previous
        </Button>
        <Button onClick={handleSave} disabled={loading} type="button">
          {loading ? 'Saving...' : 'Save & Next'}
        </Button>
      </div>
    </div>
  );
};

export default JudgementForm;
