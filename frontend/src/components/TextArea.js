import React from 'react';

const TextArea = ({ label, name, value, onChange, error, required, rows = 4, placeholder }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="form-textarea"
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default TextArea;
