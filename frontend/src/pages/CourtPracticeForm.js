import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import GovernmentTable from '../components/GovernmentTable';
import { getSectionData, saveSectionData } from '../utils/localStorage';

const CourtPracticeForm = ({ applicantId, onNext, onPrev }) => {
  const [practiceRecords, setPracticeRecords] = useState([]);

  useEffect(() => {
    if (applicantId) {
      const data = getSectionData(applicantId, 'courtPractice') || [];
      setPracticeRecords(data);
    }
  }, [applicantId]);

  const handleAddRow = () => {
    setPracticeRecords([
      ...practiceRecords,
      { courtName: '', numberOfYears: '', periodFrom: '', periodTo: '' }
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
    saveSectionData(applicantId, 'courtPractice', practiceRecords);
    onNext();
  };

  const columns = [
    { name: 'courtName', label: 'Name of Court', type: 'text' },
    { name: 'numberOfYears', label: 'Number of Years', type: 'number' },
    { name: 'periodFrom', label: 'From', type: 'date' },
    { name: 'periodTo', label: 'To', type: 'date' },
  ];

  return (
    <div className="form-section">
      <h2 className="text-xl font-bold mb-4 bg-gray-200 px-2 py-1 border border-gray-400">Period of Practice</h2>

      <GovernmentTable
        columns={columns}
        data={practiceRecords}
        onChange={handleRowChange}
        onAddRow={handleAddRow}
        onRemoveRow={handleDeleteRow}
        showSerialNumber={true}
      />

      <div className="flex gap-4 pt-4 border-t border-gray-400 no-print mt-6">
        <Button onClick={onPrev} variant="secondary" type="button">
          Previous
        </Button>
        <Button onClick={handleSave} type="button">
          Save & Next
        </Button>
      </div>
    </div>
  );
};

export default CourtPracticeForm;
