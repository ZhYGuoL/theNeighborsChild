'use client';

import { useState } from 'react';

interface SchoolFilterProps {
  onFilterChange: (schools: string[]) => void;
  selectedSchools: string[];
}

export default function SchoolFilter({ onFilterChange, selectedSchools }: SchoolFilterProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAddSchool = () => {
    if (inputValue.trim() && !selectedSchools.includes(inputValue.trim())) {
      const newSchools = [...selectedSchools, inputValue.trim()];
      onFilterChange(newSchools);
      setInputValue('');
    }
  };

  const handleRemoveSchool = (school: string) => {
    const newSchools = selectedSchools.filter(s => s !== school);
    onFilterChange(newSchools);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSchool();
    }
  };

  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Filter by School</h3>
      <div className="flex mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter school name"
          className="rounded-l px-4 py-2 w-full focus:outline-none"
          style={{
            border: '1px solid var(--input-border)',
            backgroundColor: 'var(--input-bg)',
            color: 'var(--text-primary)'
          }}
        />
        <button
          onClick={handleAddSchool}
          disabled={!inputValue.trim()}
          className="font-bold py-2 px-4 rounded-r disabled:opacity-50"
          style={{ 
            backgroundColor: 'var(--button-primary)', 
            color: 'white',
            border: 'none'
          }}
        >
          Add
        </button>
      </div>
      
      {selectedSchools.length > 0 && (
        <div className="mt-2">
          <div className="flex flex-wrap gap-2">
            {selectedSchools.map((school) => (
              <div 
                key={school} 
                className="text-sm px-3 py-1 rounded-full flex items-center"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--button-primary)'
                }}
              >
                <span>{school}</span>
                <button
                  onClick={() => handleRemoveSchool(school)}
                  className="ml-2 hover:text-opacity-70"
                  style={{ color: 'var(--button-primary)' }}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          {selectedSchools.length > 0 && (
            <button
              onClick={() => onFilterChange([])}
              className="text-xs hover:underline mt-2"
              style={{ color: 'var(--error-text)' }}
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
} 