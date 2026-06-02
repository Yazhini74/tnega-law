const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateMobile = (mobile) => {
  const mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
};

const validatePAN = (pan) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

const validateAadhaar = (aadhaar) => {
  const aadhaarRegex = /^\d{12}$/;
  return aadhaarRegex.test(aadhaar);
};

const validateApplicationForm = (data) => {
  const errors = [];

  if (!data.fullName || data.fullName.trim() === '') {
    errors.push('Full name is required');
  }

  if (!data.fatherName || data.fatherName.trim() === '') {
    errors.push('Father name is required');
  }

  if (!data.gender) {
    errors.push('Gender is required');
  }

  if (!data.dob) {
    errors.push('Date of birth is required');
  }

  if (!data.nationality || data.nationality.trim() === '') {
    errors.push('Nationality is required');
  }

  if (!data.religion || data.religion.trim() === '') {
    errors.push('Religion is required');
  }

  if (!data.community || data.community.trim() === '') {
    errors.push('Community is required');
  }

  if (!data.mobile || !validateMobile(data.mobile)) {
    errors.push('Valid mobile number is required (10 digits)');
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.pan || !validatePAN(data.pan)) {
    errors.push('Valid PAN is required (format: AAAAA9999A)');
  }

  if (!data.aadhaar || !validateAadhaar(data.aadhaar)) {
    errors.push('Valid Aadhaar is required (12 digits)');
  }

  return errors;
};

module.exports = {
  validateEmail,
  validateMobile,
  validatePAN,
  validateAadhaar,
  validateApplicationForm
};
