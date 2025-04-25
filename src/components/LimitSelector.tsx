'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LimitSelectorProps {
  limit: number;
  onChange: (limit: number) => void;
}

export default function LimitSelector({ limit, onChange }: LimitSelectorProps) {
  const options = [5, 10, 20, 30];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Results per page</h3>
      <Select
        value={limit.toString()}
        onValueChange={(value) => onChange(Number(value))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select limit" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option.toString()}>
              {option} results
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 