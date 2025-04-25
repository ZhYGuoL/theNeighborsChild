'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, X } from 'lucide-react';

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
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Filter by School</h3>
        <div className="flex gap-2">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter school name"
          />
          <Button
            type="button"
            onClick={handleAddSchool}
            disabled={!inputValue.trim()}
            size="icon"
            variant="secondary"
          >
            <PlusCircle className="h-4 w-4" />
            <span className="sr-only">Add school</span>
          </Button>
        </div>
      </div>
      
      {selectedSchools.length > 0 && (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {selectedSchools.map((school) => (
              <Badge 
                key={school} 
                variant="secondary"
                className="px-2 py-1 text-xs gap-1"
              >
                <span>{school}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-3 w-3 p-0 ml-1"
                  onClick={() => handleRemoveSchool(school)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {school}</span>
                </Button>
              </Badge>
            ))}
          </div>
          <Button
            type="button"
            variant="link"
            size="sm"
            className="text-xs h-auto p-0 text-muted-foreground"
            onClick={() => onFilterChange([])}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
} 