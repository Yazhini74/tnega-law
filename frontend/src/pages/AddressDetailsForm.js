import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import GovernmentFormSection from '../components/GovernmentFormSection';
import { getSectionData, saveSectionData } from '../utils/localStorage';

const AddressDetailsForm = ({ applicantId, onNext, onPrev }) => {
  const [formData, setFormData] = useState({
    officeAddress: '',
    permanentAddress: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (applicantId) {
      const data = getSectionData(applicantId, 'addressDetails');
      if (data) {
        setFormData(data);
      }
    }
  }, [applicantId]);

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
    if (!formData.officeAddress.trim()) {
      newErrors.officeAddress = 'Office address is required';
    }
    if (!formData.permanentAddress.trim()) {
      newErrors.permanentAddress = 'Permanent address is required';
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
      saveSectionData(applicantId, 'addressDetails', formData);
      onNext();
    } catch (error) {
      alert('Error saving address details: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-section">
      <h2 className="text-xl font-bold mb-4 bg-gray-200 px-2 py-1 border border-gray-400">Address Details</h2>

      <div className="border border-gray-400 mb-6">
        <GovernmentFormSection label="Office Address" required>
          <div className="w-full">
            <textarea
              name="officeAddress"
              value={formData.officeAddress}
              onChange={handleChange}
              rows={4}
              className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1 resize-y"
            />
            {errors.officeAddress && <p className="error-message">{errors.officeAddress}</p>}
          </div>
        </GovernmentFormSection>

        <GovernmentFormSection label="Permanent Address" required>
          <div className="w-full">
            <textarea
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              rows={4}
              className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1 resize-y"
            />
            {errors.permanentAddress && <p className="error-message">{errors.permanentAddress}</p>}
          </div>
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

export default AddressDetailsForm;
