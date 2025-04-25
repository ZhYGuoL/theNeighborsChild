'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, X, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        <div className="flex items-center gap-1 mb-2">
          <h3 className="text-sm font-medium">Filter by School</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                  <HelpCircle className="h-3 w-3 text-muted-foreground" />
                  <span className="sr-only">School filter info</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[220px] text-xs">
                <p>Use the exact school name as it appears on LinkedIn profiles (e.g., &quot;Stanford University&quot; not &quot;Stanford&quot;)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
        <p className="text-xs text-muted-foreground mt-1">
          Enter the exact school name as displayed on LinkedIn profiles
        </p>
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