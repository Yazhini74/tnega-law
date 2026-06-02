import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import DynamicTableRow from '../components/DynamicTableRow';
import { getSectionData, saveSectionData } from '../utils/localStorage';

const AdditionalQualificationForm = ({ applicantId, onNext, onPrev }) => {
  const [qualifications, setQualifications] = useState([]);

  useEffect(() => {
    if (applicantId) {
      const data = getSectionData(applicantId, 'additionalQualification') || [];
      setQualifications(data);
    }
  }, [applicantId]);

  const handleAddRow = () => {
    setQualifications([
      ...qualifications,
      { qualification: '', details: '' }
    ]);
  };

  const handleRowChange = (index, fieldName, value) => {
    const newRecords = [...qualifications];
    newRecords[index] = {
      ...newRecords[index],
      [fieldName]: value,
    };
    setQualifications(newRecords);
  };

  const handleDeleteRow = (index) => {
    const newRecords = qualifications.filter((_, i) => i !== index);
    setQualifications(newRecords);
  };

  const handleSave = () => {
    saveSectionData(applicantId, 'additionalQualification', qualifications);
    onNext();
  };

  const fields = [
    { name: 'qualification', label: 'Qualification', type: 'text' },
    { name: 'details', label: 'Details', type: 'textarea' },
  ];

  return (
    <div className="form-section">
      <h2 className="text-2xl font-bold mb-6">Additional Qualifications</h2>

      {qualifications.length === 0 ? (
        <p className="text-gray-600 mb-4">No additional qualifications added yet.</p>
      ) : (
        qualifications.map((record, index) => (
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
          + Add Additional Qualification
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

export default AdditionalQualificationForm;
