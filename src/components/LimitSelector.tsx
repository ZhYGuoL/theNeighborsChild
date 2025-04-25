'use client';

interface LimitSelectorProps {
  limit: number;
  onChange: (limit: number) => void;
}

export default function LimitSelector({ limit, onChange }: LimitSelectorProps) {
  const options = [5, 10, 20, 30];

  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Results per page</h3>
      <select
        value={limit}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded px-4 py-2 w-full focus:outline-none"
        style={{
          border: '1px solid var(--input-border)',
          backgroundColor: 'var(--input-bg)',
          color: 'var(--text-primary)'
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
} 