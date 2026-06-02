import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
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
      fetchAddressDetails();
    }
  }, [applicantId]);

  const fetchAddressDetails = () => {
    try {
      setLoading(true);
      const data = getSectionData(applicantId, 'addressDetails');
      if (data) {
        setFormData({
          officeAddress: data.officeAddress || '',
          permanentAddress: data.permanentAddress || '',
        });
      }
    } catch (error) {
      console.error('Error fetching address details:', error);
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
      <h2 className="text-2xl font-bold mb-6">Address Details</h2>

      <div className="grid grid-cols-1 gap-4">
        <TextArea
          label="Office Address"
          name="officeAddress"
          value={formData.officeAddress}
          onChange={handleChange}
          error={errors.officeAddress}
          required
          rows={4}
          placeholder="Enter your office address"
        />

        <TextArea
          label="Permanent Address"
          name="permanentAddress"
          value={formData.permanentAddress}
          onChange={handleChange}
          error={errors.permanentAddress}
          required
          rows={4}
          placeholder="Enter your permanent address"
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

export default AddressDetailsForm;
