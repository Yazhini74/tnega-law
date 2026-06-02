import React, { useState } from 'react';
import Button from './Button';

const DynamicTableRow = ({ fields, data, onChange, onDelete, index }) => {
  return (
    <div className="border rounded-lg p-4 mb-4 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className="form-group">
            <label className="form-label">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={data[field.name] || ''}
                onChange={(e) => onChange(index, field.name, e.target.value)}
                rows={3}
                className="form-textarea"
              />
            ) : field.type === 'select' ? (
              <select
                name={field.name}
                value={data[field.name] || ''}
                onChange={(e) => onChange(index, field.name, e.target.value)}
                className="form-select"
              >
                <option value="">Select {field.label}</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || 'text'}
                name={field.name}
                value={data[field.name] || ''}
                onChange={(e) => onChange(index, field.name, e.target.value)}
                className="form-input"
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Button
          onClick={() => onDelete(index)}
          variant="danger"
          type="button"
        >
          Remove Row
        </Button>
      </div>
    </div>
  );
};

export default DynamicTableRow;
