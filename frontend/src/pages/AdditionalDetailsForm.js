import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import GovernmentFormSection from '../components/GovernmentFormSection';
import { getSectionData, saveSectionData } from '../utils/localStorage';

const AdditionalDetailsForm = ({ applicantId, onNext, onPrev }) => {
  const [formData, setFormData] = useState({
    draftingExperienceYears: '',
    criminalDetails: '',
    criminalStatus: '',
    disciplinaryDetails: '',
    disciplinaryStatus: '',
    achievements: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (applicantId) {
      const data = getSectionData(applicantId, 'additionalDetails');
      if (data) {
        setFormData(prev => ({
          ...prev,
          ...data
        }));
      }
    }
  }, [applicantId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      saveSectionData(applicantId, 'additionalDetails', formData);
      onNext();
    } catch (error) {
      alert('Error saving additional details: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-section">
      
      <h2 className="text-xl font-bold mb-4 bg-gray-200 px-2 py-1 border border-gray-400 mt-2">Drafting Experience</h2>
      <div className="border border-gray-400 mb-6">
        <GovernmentFormSection label="Number of Years">
          <input type="number" name="draftingExperienceYears" value={formData.draftingExperienceYears} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1" />
        </GovernmentFormSection>
      </div>

      <h2 className="text-xl font-bold mb-4 bg-gray-200 px-2 py-1 border border-gray-400">Criminal/Disciplinary Proceedings</h2>
      <div className="border border-gray-400 mb-6">
        <GovernmentFormSection label="Criminal Case Details">
          <textarea name="criminalDetails" value={formData.criminalDetails} onChange={handleChange} rows={2} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1 resize-y" />
        </GovernmentFormSection>
        <GovernmentFormSection label="Present Status (Criminal)">
          <textarea name="criminalStatus" value={formData.criminalStatus} onChange={handleChange} rows={2} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1 resize-y" />
        </GovernmentFormSection>
        <GovernmentFormSection label="Disciplinary Proceeding Details">
          <textarea name="disciplinaryDetails" value={formData.disciplinaryDetails} onChange={handleChange} rows={2} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1 resize-y" />
        </GovernmentFormSection>
        <GovernmentFormSection label="Proceeding Status (Disciplinary)">
          <textarea name="disciplinaryStatus" value={formData.disciplinaryStatus} onChange={handleChange} rows={2} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1 resize-y" />
        </GovernmentFormSection>
      </div>

      <h2 className="text-xl font-bold mb-4 bg-gray-200 px-2 py-1 border border-gray-400">Professional Achievements</h2>
      <div className="border border-gray-400 mb-6">
        <GovernmentFormSection label="Achievements">
          <textarea name="achievements" value={formData.achievements} onChange={handleChange} rows={6} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1 resize-y" placeholder="Describe major professional achievements" />
        </GovernmentFormSection>
      </div>

      <div className="flex gap-4 pt-4 mt-6 border-t border-gray-400 no-print">
        <Button onClick={onPrev} variant="secondary" type="button">
          Previous
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save & Next'}
        </Button>
      </div>
    </form>
  );
};

export default AdditionalDetailsForm;
