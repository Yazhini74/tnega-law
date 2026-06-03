import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import GovernmentTable from '../components/GovernmentTable';
import { getSectionData, saveSectionData } from '../utils/localStorage';

const BarExperienceForm = ({ applicantId, onNext, onPrev }) => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    if (applicantId) {
      const data = getSectionData(applicantId, 'barExperience') || [];
      setExperiences(data);
    }
  }, [applicantId]);

  const handleAddRow = () => {
    setExperiences([
      ...experiences,
      { numberOfYears: '', periodFrom: '', periodTo: '', nameOfBarCouncil: '' }
    ]);
  };

  const handleRowChange = (index, fieldName, value) => {
    const newRecords = [...experiences];
    newRecords[index] = {
      ...newRecords[index],
      [fieldName]: value,
    };
    setExperiences(newRecords);
  };

  const handleDeleteRow = (index) => {
    const newRecords = experiences.filter((_, i) => i !== index);
    setExperiences(newRecords);
  };

  const handleSave = () => {
    saveSectionData(applicantId, 'barExperience', experiences);
    onNext();
  };

  const columns = [
    { name: 'numberOfYears', label: 'Number of Years', type: 'number' },
    { name: 'periodFrom', label: 'Period From', type: 'date' },
    { name: 'periodTo', label: 'Period To', type: 'date' },
    { name: 'nameOfBarCouncil', label: 'Name of Bar Council', type: 'text' },
  ];

  return (
    <div className="form-section">
      <h2 className="text-xl font-bold mb-4 bg-gray-200 px-2 py-1 border border-gray-400">Total Bar Experience</h2>

      <GovernmentTable
        columns={columns}
        data={experiences}
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

export default BarExperienceForm;
