import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import DynamicTableRow from '../components/DynamicTableRow';
import Input from '../components/Input';
import { getSectionData, saveSectionData } from '../utils/localStorage';

const EducationForm = ({ applicantId, onNext, onPrev }) => {
  const [educationRecords, setEducationRecords] = useState([]);

  useEffect(() => {
    if (applicantId) {
      const data = getSectionData(applicantId, 'education') || [];
      setEducationRecords(data);
    }
  }, [applicantId]);

  const handleAddRow = () => {
    setEducationRecords([
      ...educationRecords,
      { qualification: '', university: '', yearOfPassing: '', percentage: '' }
    ]);
  };

  const handleRowChange = (index, fieldName, value) => {
    const newRecords = [...educationRecords];
    newRecords[index] = {
      ...newRecords[index],
      [fieldName]: value,
    };
    setEducationRecords(newRecords);
  };

  const handleDeleteRow = (index) => {
    const newRecords = educationRecords.filter((_, i) => i !== index);
    setEducationRecords(newRecords);
  };

  const handleSave = () => {
    saveSectionData(applicantId, 'education', educationRecords);
    onNext();
  };

  const fields = [
    { name: 'qualification', label: 'Qualification', type: 'text' },
    { name: 'university', label: 'University/Board', type: 'text' },
    { name: 'yearOfPassing', label: 'Year of Passing', type: 'number' },
    { name: 'percentage', label: 'Percentage (%)', type: 'number' },
  ];

  return (
    <div className="form-section">
      <h2 className="text-2xl font-bold mb-6">Educational Qualification</h2>

      {educationRecords.length === 0 ? (
        <p className="text-gray-600 mb-4">No education records added yet.</p>
      ) : (
        educationRecords.map((record, index) => (
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
          + Add Education Record
        </Button>
      </div>

      <div className="flex gap-4 pt-4 border-t">
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

export default EducationForm;
