import React from 'react';

const GovernmentTable = ({ columns, data, onAddRow, onRemoveRow, onChange, showSerialNumber = true }) => {
  const tableData = Array.isArray(data) ? data : [];

  return (
    <div className="w-full overflow-x-auto mb-4 border border-gray-400">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 divide-x divide-gray-400 border-b border-gray-400">
            {showSerialNumber && <th className="px-2 py-1.5 text-left text-xs font-semibold text-gray-800 w-12">S.No</th>}
            {columns.map((col, index) => (
              <th key={index} className="px-2 py-1.5 text-left text-xs font-semibold text-gray-800">
                {col.label}
              </th>
            ))}
            {onRemoveRow && <th className="px-2 py-1.5 text-center text-xs font-semibold text-gray-800 w-16 no-print">Action</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-400">
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 divide-x divide-gray-400">
              {showSerialNumber && (
                <td className="px-2 py-1 text-sm text-center">{rowIndex + 1}</td>
              )}
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="p-0 align-top">
                  {col.type === 'textarea' ? (
                    <textarea
                      className="w-full h-full min-h-[40px] px-2 py-1 text-sm bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary resize-y"
                      rows={col.rows || 1}
                      value={row[col.name] || ''}
                      onChange={(e) => onChange(rowIndex, col.name, e.target.value)}
                      placeholder={col.placeholder || ''}
                    />
                  ) : col.type === 'date' ? (
                    <input
                      type="date"
                      className="w-full h-full min-h-[30px] px-2 py-1 text-sm bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary"
                      value={row[col.name] || ''}
                      onChange={(e) => onChange(rowIndex, col.name, e.target.value)}
                    />
                  ) : col.type === 'number' ? (
                    <input
                      type="number"
                      className="w-full h-full min-h-[30px] px-2 py-1 text-sm bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary"
                      value={row[col.name] || ''}
                      onChange={(e) => onChange(rowIndex, col.name, e.target.value)}
                      placeholder={col.placeholder || ''}
                    />
                  ) : col.type === 'select' ? (
                    <select
                      className="w-full h-full min-h-[30px] px-2 py-1 text-sm bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary"
                      value={row[col.name] || ''}
                      onChange={(e) => onChange(rowIndex, col.name, e.target.value)}
                    >
                      <option value="">Select</option>
                      {col.options && col.options.map((opt, i) => (
                        <option key={i} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      className="w-full h-full min-h-[30px] px-2 py-1 text-sm bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary"
                      value={row[col.name] || ''}
                      onChange={(e) => onChange(rowIndex, col.name, e.target.value)}
                      placeholder={col.placeholder || ''}
                    />
                  )}
                </td>
              ))}
              {onRemoveRow && (
                <td className="px-2 py-1 text-center no-print">
                  <button
                    type="button"
                    onClick={() => onRemoveRow(rowIndex)}
                    className="text-red-600 hover:text-red-800 text-xs font-semibold"
                  >
                    Remove
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {onAddRow && (
        <div className="p-2 border-t border-gray-400 bg-gray-50 no-print">
          <button
            type="button"
            onClick={onAddRow}
            className="px-3 py-1 bg-white border border-gray-400 text-sm font-semibold hover:bg-gray-100"
          >
            + Add Row
          </button>
        </div>
      )}
    </div>
  );
};

export default GovernmentTable;
