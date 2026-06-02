import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import { validateEmail, validateMobile, validatePAN, validateAadhaar } from '../utils/validation';
import { saveApplication, updateApplication, getApplicationById } from '../utils/localStorage';

const PersonalDetailsForm = ({ applicantId, onNext }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    gender: '',
    dob: '',
    nationality: 'Indian',
    religion: '',
    community: '',
    mobile: '',
    email: '',
    pan: '',
    aadhaar: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (applicantId) {
      const app = getApplicationById(applicantId);
      if (app) {
        setFormData(app);
      }
    }
  }, [applicantId]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.fatherName.trim()) {
      newErrors.fatherName = 'Father name is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!formData.nationality.trim()) {
      newErrors.nationality = 'Nationality is required';
    }

    if (!formData.religion.trim()) {
      newErrors.religion = 'Religion is required';
    }

    if (!formData.community.trim()) {
      newErrors.community = 'Community is required';
    }

    if (!validateMobile(formData.mobile)) {
      newErrors.mobile = 'Valid mobile number is required (10 digits)';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (!validatePAN(formData.pan)) {
      newErrors.pan = 'Valid PAN is required (format: AAAAA9999A)';
    }

    if (!validateAadhaar(formData.aadhaar)) {
      newErrors.aadhaar = 'Valid Aadhaar is required (12 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      if (applicantId) {
        updateApplication(applicantId, formData);
      } else {
        const id = saveApplication(formData);
        localStorage.setItem('applicantId', id);
        onNext(id);
        return;
      }
      onNext(applicantId);
    } catch (error) {
      alert('Error saving personal details: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-section">
      <h2 className="text-2xl font-bold mb-6">Personal Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          required
          placeholder="Enter your full name"
        />

        <Input
          label="Father Name"
          name="fatherName"
          value={formData.fatherName}
          onChange={handleChange}
          error={errors.fatherName}
          required
          placeholder="Enter father's name"
        />

        <Select
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          options={[
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Other', label: 'Other' },
          ]}
          error={errors.gender}
          required
        />

        <Input
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          error={errors.dob}
          required
        />

        <Input
          label="Nationality"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          error={errors.nationality}
          required
          placeholder="Enter your nationality"
        />

        <Input
          label="Religion"
          name="religion"
          value={formData.religion}
          onChange={handleChange}
          error={errors.religion}
          required
          placeholder="Enter your religion"
        />

        <Input
          label="Community"
          name="community"
          value={formData.community}
          onChange={handleChange}
          error={errors.community}
          required
          placeholder="Enter your community"
        />

        <Input
          label="Mobile Number"
          name="mobile"
          type="tel"
          value={formData.mobile}
          onChange={handleChange}
          error={errors.mobile}
          required
          placeholder="10-digit mobile number"
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
          placeholder="Enter your email"
        />

        <Input
          label="PAN"
          name="pan"
          value={formData.pan.toUpperCase()}
          onChange={handleChange}
          error={errors.pan}
          required
          placeholder="e.g., AAAAA9999A"
        />

        <Input
          label="Aadhaar"
          name="aadhaar"
          value={formData.aadhaar}
          onChange={handleChange}
          error={errors.aadhaar}
          required
          placeholder="12-digit Aadhaar number"
        />
      </div>

      <div className="mt-8 flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save & Next'}
        </Button>
      </div>
    </form>
  );
};

export default PersonalDetailsForm;
