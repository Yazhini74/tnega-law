import React from 'react';

const Input = ({ label, name, type = 'text', value, onChange, error, required, placeholder }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-input"
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;
