import React from 'react';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const getScoreColor = (score: number): string => {
  if (score >= 80) return 'var(--chart-1)';
  if (score >= 50) return 'var(--chart-3)';
  return 'var(--destructive)';
};

export function ScoreRing({
  score,
  size = 120,
  strokeWidth = 12,
  showLabel = true,
  label,
  className = '',
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--border)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {showLabel && (
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{score}</span>
          {label && <span className="text-xs text-muted-foreground mt-0.5">{label}</span>}
        </div>
      )}
    </div>
  );
}

interface BreakdownRingProps {
  critical: number;
  warning: number;
  notice: number;
  pass: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

/**
 * Donut ring showing issue breakdown by severity
 */
export function BreakdownRing({
  critical,
  warning,
  notice,
  pass,
  size = 140,
  strokeWidth = 14,
  className = '',
}: BreakdownRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const total = critical + warning + notice + pass;

  // Calculate cumulative offsets for each segment
  let cumulativeOffset = 0;

  const segments = [
    { value: pass, color: 'var(--chart-1)', name: 'Pass' },
    { value: notice, color: 'var(--chart-2)', name: 'Notice' },
    { value: warning, color: 'var(--chart-3)', name: 'Warning' },
    { value: critical, color: 'var(--destructive)', name: 'Critical' },
  ].filter(s => s.value > 0);

  if (total === 0) {
    return (
      <div className={`inline-flex flex-col items-center justify-center ${className}`}>
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="var(--border)"
            strokeWidth={strokeWidth}
            fill="none"
          />
        </svg>
        <span className="text-xs text-muted-foreground mt-2">No data</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {segments.map((segment, index) => {
          const percentage = segment.value / total;
          const segmentLength = circumference * percentage;
          const currentOffset = cumulativeOffset;
          cumulativeOffset += segmentLength;

          return (
            <circle
              key={segment.name}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={segment.color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
              strokeDashoffset={-currentOffset}
              className="transition-all duration-300"
            />
          );
        })}
      </svg>
      <div className="flex gap-3 mt-3">
        {segments.map(segment => (
          <div key={segment.name} className="flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-xs text-muted-foreground">{segment.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
