import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import GovernmentFormSection from '../components/GovernmentFormSection';
import { validateEmail, validateMobile, validatePAN, validateAadhaar } from '../utils/validation';
import { getSectionData, saveSectionData, getApplicationById, saveApplication } from '../utils/localStorage';

const PersonalDetailsForm = ({ applicantId, onNext }) => {
  const [formData, setFormData] = useState({
    postApplied: '',
    advocateName: '',
    barCouncilEnrollmentNumber: '',
    enrollmentDate: '',
    presentCourtOfPractice: '',
    courtsAppliedFor: '',
    previouslyWorkedAsLawOfficer: 'No',
    lawOfficerDetails: '',
    fatherName: '',
    gender: '',
    maritalStatus: '',
    dob: '',
    age: '',
    nationality: 'Indian',
    religion: '',
    community: '',
    mobile: '',
    phoneWithStd: '',
    email: '',
    pan: '',
    aadhaar: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (applicantId) {
      try {
        const data = getSectionData(applicantId, 'personalDetails');
        if (data) {
          setFormData(prev => ({
            ...prev,
            ...data
          }));
        }
      } catch (error) {
        console.error('Error fetching personal details:', error);
      }
    }
  }, [applicantId]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.advocateName?.trim()) newErrors.advocateName = 'Name is required';
    if (!formData.fatherName?.trim()) newErrors.fatherName = 'Father name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.nationality?.trim()) newErrors.nationality = 'Nationality is required';
    if (!validateMobile(formData.mobile)) newErrors.mobile = 'Valid 10-digit mobile required';
    if (!validateEmail(formData.email)) newErrors.email = 'Valid email is required';
    if (!validatePAN(formData.pan)) newErrors.pan = 'Valid PAN is required';
    if (!validateAadhaar(formData.aadhaar)) newErrors.aadhaar = 'Valid Aadhaar is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please correct the highlighted errors');
      return;
    }

    setLoading(true);
    try {
      let currentApplicantId = applicantId;
      if (!currentApplicantId || !getApplicationById(currentApplicantId)) {
        currentApplicantId = saveApplication({ personalDetails: formData });
        localStorage.setItem('applicantId', currentApplicantId);
      } else {
        saveSectionData(currentApplicantId, 'personalDetails', formData);
      }
      onNext(currentApplicantId);
    } catch (error) {
      alert('Error saving personal details: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-section">
      <h2 className="text-xl font-bold mb-4 bg-gray-200 px-2 py-1 border border-gray-400">Basic Applicant Details</h2>
      
      <div className="border border-gray-400 mb-6">
        <GovernmentFormSection label="Name of the post(s) applied for" required>
          <input type="text" name="postApplied" value={formData.postApplied || ''} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1" />
        </GovernmentFormSection>
        
        <GovernmentFormSection label="Name of the Advocate" required>
          <div className="w-full">
            <input type="text" name="advocateName" value={formData.advocateName || ''} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1" />
            {errors.advocateName && <p className="error-message">{errors.advocateName}</p>}
          </div>
        </GovernmentFormSection>
        
        <GovernmentFormSection label="Bar Council Enrollment Number" required>
          <input type="text" name="barCouncilEnrollmentNumber" value={formData.barCouncilEnrollmentNumber || ''} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1" />
        </GovernmentFormSection>
        
        <GovernmentFormSection label="Date of Enrollment" required>
          <input type="date" name="enrollmentDate" value={formData.enrollmentDate || ''} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1" />
        </GovernmentFormSection>
        
        <GovernmentFormSection label="Present Court of Practice" required>
          <input type="text" name="presentCourtOfPractice" value={formData.presentCourtOfPractice || ''} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1" />
        </GovernmentFormSection>
        
        <GovernmentFormSection label="Court(s) Applied For" required>
          <input type="text" name="courtsAppliedFor" value={formData.courtsAppliedFor || ''} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1" />
        </GovernmentFormSection>
        
        <GovernmentFormSection label="Whether previously worked or presently working as Law Officer" required>
          <select name="previouslyWorkedAsLawOfficer" value={formData.previouslyWorkedAsLawOfficer || 'No'} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </GovernmentFormSection>
        
        {formData.previouslyWorkedAsLawOfficer === 'Yes' && (
          <GovernmentFormSection label="If yes, provide details">
            <textarea name="lawOfficerDetails" value={formData.lawOfficerDetails || ''} onChange={handleChange} rows={2} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1 resize-y" />
          </GovernmentFormSection>
        )}
        
        <GovernmentFormSection label="Father's Name" required>
          <div className="w-full">
            <input type="text" name="fatherName" value={formData.fatherName || ''} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1" />
            {errors.fatherName && <p className="error-message">{errors.fatherName}</p>}
          </div>
        </GovernmentFormSection>
        
        <GovernmentFormSection label="Gender" required>
          <div className="w-full">
            <select name="gender" value={formData.gender || ''} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="error-message">{errors.gender}</p>}
          </div>
        </GovernmentFormSection>
        
        <GovernmentFormSection label="Marital Status" required>
          <select name="maritalStatus" value={formData.maritalStatus || ''} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1">
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </GovernmentFormSection>
        
        <GovernmentFormSection label="Date of Birth" required>
          <div className="w-full">
            <input type="date" name="dob" value={formData.dob || ''} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1" />
            {errors.dob && <p className="error-message">{errors.dob}</p>}
          </div>
        </GovernmentFormSection>
        
        <GovernmentFormSection label="Age">
          <input type="number" name="age" value={formData.age || ''} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1" />
        </GovernmentFormSection>
        
        <GovernmentFormSection label="Nationality" required>
          <div className="w-full">
            <input type="text" name="nationality" value={formData.nationality || 'Indian'} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1" />
            {errors.nationality && <p className="error-message">{errors.nationality}</p>}
          </div>
        </GovernmentFormSection>
        
        <GovernmentFormSection label="Religion">
          <input type="text" name="religion" value={formData.religion || ''} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1" />
        </GovernmentFormSection>
        
        <GovernmentFormSection label="Community">
          <input type="text" name="community" value={formData.community || ''} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1" />
        </GovernmentFormSection>
        
        <GovernmentFormSection label="Mobile Number" required>
          <div className="w-full">
            <input type="tel" name="mobile" value={formData.mobile || ''} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1" />
            {errors.mobile && <p className="error-message">{errors.mobile}</p>}
          </div>
        </GovernmentFormSection>
        
        <GovernmentFormSection label="Phone Number with STD Code">
          <input type="tel" name="phoneWithStd" value={formData.phoneWithStd || ''} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1" />
        </GovernmentFormSection>
        
        <GovernmentFormSection label="Email ID" required>
          <div className="w-full">
            <input type="email" name="email" value={formData.email || ''} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1" />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
        </GovernmentFormSection>
        
        <GovernmentFormSection label="PAN Number" required>
          <div className="w-full">
            <input type="text" name="pan" value={formData.pan ? formData.pan.toUpperCase() : ''} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1 uppercase" placeholder="AAAAA9999A" />
            {errors.pan && <p className="error-message">{errors.pan}</p>}
          </div>
        </GovernmentFormSection>
        
        <GovernmentFormSection label="Aadhaar Number" required>
          <div className="w-full">
            <input type="text" name="aadhaar" value={formData.aadhaar || ''} onChange={handleChange} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary px-1" placeholder="12-digit number" />
            {errors.aadhaar && <p className="error-message">{errors.aadhaar}</p>}
          </div>
        </GovernmentFormSection>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4 no-print">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save & Next'}
        </Button>
      </div>
    </form>
  );
};

export default PersonalDetailsForm;
