import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import DynamicTableRow from '../components/DynamicTableRow';
import { getSectionData, saveSectionData } from '../utils/localStorage';

const CourtPracticeForm = ({ applicantId, onNext, onPrev }) => {
  const [practiceRecords, setPracticeRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (applicantId) {
      fetchCourtPractice();
    }
  }, [applicantId]);

  const fetchCourtPractice = () => {
    try {
      setLoading(true);
      const data = getSectionData(applicantId, 'courtPractice');
      if (data) {
        setPracticeRecords(data);
      }
    } catch (error) {
      console.error('Error fetching court practice:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRow = () => {
    setPracticeRecords([
      ...practiceRecords,
      { courtName: '', practiceStartYear: '', practiceEndYear: '', description: '' }
    ]);
  };

  const handleRowChange = (index, fieldName, value) => {
    const newRecords = [...practiceRecords];
    newRecords[index] = {
      ...newRecords[index],
      [fieldName]: value,
    };
    setPracticeRecords(newRecords);
  };

  const handleDeleteRow = (index) => {
    const newRecords = practiceRecords.filter((_, i) => i !== index);
    setPracticeRecords(newRecords);
  };

  const handleSave = () => {
    try {
      setLoading(true);
      saveSectionData(applicantId, 'courtPractice', practiceRecords);
      onNext();
    } catch (error) {
      alert('Error saving court practice records: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'courtName', label: 'Court Name', type: 'text' },
    { name: 'practiceStartYear', label: 'Practice Start Year', type: 'number' },
    { name: 'practiceEndYear', label: 'Practice End Year', type: 'number' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ];

  return (
    <div className="form-section">
      <h2 className="text-2xl font-bold mb-6">Court Practice Details</h2>

      {practiceRecords.length === 0 ? (
        <p className="text-gray-600 mb-4">No court practice records added yet.</p>
      ) : (
        practiceRecords.map((record, index) => (
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
          + Add Court Practice Record
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

export default CourtPracticeForm;
