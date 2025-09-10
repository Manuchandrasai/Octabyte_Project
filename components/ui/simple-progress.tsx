'use client';

interface SimpleProgressProps {
  value: number;
  className?: string;
}

export function SimpleProgress({ value, className }: SimpleProgressProps) {
  const safeValue = Math.min(Math.max(value, 0), 100); // clamp 0-100

  return (
    <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="bg-blue-500 h-full transition-all duration-300"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
