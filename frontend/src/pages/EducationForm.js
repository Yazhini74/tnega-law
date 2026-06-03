import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import GovernmentTable from '../components/GovernmentTable';
import GovernmentFormSection from '../components/GovernmentFormSection';
import { getSectionData, saveSectionData } from '../utils/localStorage';

const EducationForm = ({ applicantId, onNext, onPrev }) => {
  const [educationRecords, setEducationRecords] = useState([]);
  const [lawDegreeRecognized, setLawDegreeRecognized] = useState('');

  useEffect(() => {
    if (applicantId) {
      const data = getSectionData(applicantId, 'education') || [];
      setEducationRecords(data);
      const metadata = getSectionData(applicantId, 'education_meta') || {};
      if (metadata.lawDegreeRecognized) setLawDegreeRecognized(metadata.lawDegreeRecognized);
    }
  }, [applicantId]);

  const handleAddRow = () => {
    setEducationRecords([
      ...educationRecords,
      { examinationPassed: '', yearOfPassing: '', university: '', institution: '', specialization: '', percentage: '' }
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
    if (!lawDegreeRecognized) {
      alert('Please confirm if Law Degree is recognized by Bar Council of India');
      return;
    }
    saveSectionData(applicantId, 'education', educationRecords);
    saveSectionData(applicantId, 'education_meta', { lawDegreeRecognized });
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
      <h2 className="text-xl font-bold mb-4 bg-gray-200 px-2 py-1 border border-gray-400">Educational Qualification</h2>

      <GovernmentTable
        columns={columns}
        data={educationRecords}
        onChange={handleRowChange}
        onAddRow={handleAddRow}
        onRemoveRow={handleDeleteRow}
      />

      <div className="border border-gray-400 mt-6 mb-6">
        <GovernmentFormSection label="Whether the Law Degree is recognized by Bar Council of India" required>
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-1 text-sm">
              <input type="radio" name="lawDegreeRecognized" value="Yes" checked={lawDegreeRecognized === 'Yes'} onChange={(e) => setLawDegreeRecognized(e.target.value)} className="focus:ring-primary" /> Yes
            </label>
            <label className="flex items-center gap-1 text-sm">
              <input type="radio" name="lawDegreeRecognized" value="No" checked={lawDegreeRecognized === 'No'} onChange={(e) => setLawDegreeRecognized(e.target.value)} className="focus:ring-primary" /> No
            </label>
          </div>
        </GovernmentFormSection>
      </div>

      <div className="flex gap-4 pt-4 border-t border-gray-400 no-print">
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
