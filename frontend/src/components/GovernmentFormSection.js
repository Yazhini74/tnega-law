import React from 'react';

const GovernmentFormSection = ({ label, children, required = false, className = '' }) => {
  return (
    <div className={`flex flex-col sm:flex-row border-b border-gray-400 first:border-t ${className}`}>
      <div className="sm:w-1/3 min-w-[200px] py-1.5 px-2 bg-gray-50 border-r border-gray-400 flex items-center">
        <label className="text-sm font-semibold text-gray-800">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      </div>
      <div className="sm:w-2/3 py-1.5 px-2 flex items-center">
        {children}
      </div>
    </div>
  );
};

export default GovernmentFormSection;
