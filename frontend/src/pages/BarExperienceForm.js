import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import { getSectionData, saveSectionData } from '../utils/localStorage';

const BarExperienceForm = ({ applicantId, onNext, onPrev }) => {
  const [formData, setFormData] = useState({
    enrolmentNumber: '',
    enrollmentDate: '',
    yearsOfExperience: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (applicantId) {
      fetchBarExperience();
    }
  }, [applicantId]);

  const fetchBarExperience = () => {
    try {
      setLoading(true);
      const data = getSectionData(applicantId, 'barExperience');
      if (data) {
        setFormData({
          enrolmentNumber: data.enrolmentNumber || '',
          enrollmentDate: data.enrollmentDate || '',
          yearsOfExperience: data.yearsOfExperience || '',
        });
      }
    } catch (error) {
      console.error('Error fetching bar experience:', error);
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
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.enrolmentNumber.trim()) {
      newErrors.enrolmentNumber = 'Enrolment number is required';
    }
    if (!formData.enrollmentDate) {
      newErrors.enrollmentDate = 'Enrollment date is required';
    }
    if (!formData.yearsOfExperience) {
      newErrors.yearsOfExperience = 'Years of experience is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      saveSectionData(applicantId, 'barExperience', formData);
      onNext();
    } catch (error) {
      alert('Error saving bar experience: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-section">
      <h2 className="text-2xl font-bold mb-6">Bar Experience</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Enrolment Number"
          name="enrolmentNumber"
          value={formData.enrolmentNumber}
          onChange={handleChange}
          error={errors.enrolmentNumber}
          required
          placeholder="Enter enrolment number"
        />

        <Input
          label="Enrollment Date"
          name="enrollmentDate"
          type="date"
          value={formData.enrollmentDate}
          onChange={handleChange}
          error={errors.enrollmentDate}
          required
        />

        <Input
          label="Years of Experience"
          name="yearsOfExperience"
          type="number"
          value={formData.yearsOfExperience}
          onChange={handleChange}
          error={errors.yearsOfExperience}
          required
          placeholder="Enter years of experience"
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

export default BarExperienceForm;
