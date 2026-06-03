import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import GovernmentTable from '../components/GovernmentTable';
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
      { examinationPassed: '', yearOfPassing: '', university: '', institution: '', specialization: '', percentage: '' }
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

  const columns = [
    { name: 'examinationPassed', label: 'Examination Passed', type: 'text' },
    { name: 'yearOfPassing', label: 'Year of Passing', type: 'number' },
    { name: 'university', label: 'University/Board', type: 'text' },
    { name: 'institution', label: 'Name of Institution', type: 'text' },
    { name: 'specialization', label: 'Main Subject/Specialization', type: 'text' },
    { name: 'percentage', label: 'Percentage of Marks', type: 'number' },
  ];

  return (
    <div className="form-section">
      <h2 className="text-xl font-bold mb-4 bg-gray-200 px-2 py-1 border border-gray-400">Additional Qualifications</h2>

      <GovernmentTable
        columns={columns}
        data={qualifications}
        onChange={handleRowChange}
        onAddRow={handleAddRow}
        onRemoveRow={handleDeleteRow}
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

export default AdditionalQualificationForm;
