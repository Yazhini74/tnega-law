import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import { getSectionData, saveSectionData } from '../utils/localStorage';

const AdditionalDetailsForm = ({ applicantId, onNext, onPrev }) => {
  const [formData, setFormData] = useState({
    criminalDetails: '',
    achievements: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (applicantId) {
      fetchAdditionalDetails();
    }
  }, [applicantId]);

  const fetchAdditionalDetails = () => {
    try {
      setLoading(true);
      const data = getSectionData(applicantId, 'additionalDetails');
      if (data) {
        setFormData({
          criminalDetails: data.criminalDetails || '',
          achievements: data.achievements || '',
        });
      }
    } catch (error) {
      console.error('Error fetching additional details:', error);
    } finally {
      setLoading(false);
    }
  };

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
      <h2 className="text-2xl font-bold mb-6">Criminal/Disciplinary & Achievements</h2>

      <div className="grid grid-cols-1 gap-4">
        <TextArea
          label="Criminal/Disciplinary Details"
          name="criminalDetails"
          value={formData.criminalDetails}
          onChange={handleChange}
          rows={4}
          placeholder="Enter any criminal or disciplinary details (if any)"
        />

        <TextArea
          label="Achievements"
          name="achievements"
          value={formData.achievements}
          onChange={handleChange}
          rows={4}
          placeholder="Enter your major achievements"
        />
      </div>

      <div className="flex gap-4 pt-4 mt-8 border-t">
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
