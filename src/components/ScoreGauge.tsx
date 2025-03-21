import React from 'react';

interface ScoreGaugeProps {
  score: number;
  label: string;
  size?: 'sm' | 'lg';
}

export function ScoreGauge({ score, label, size = 'lg' }: ScoreGaugeProps) {
  const percentage = Math.round(score * 100);
  const color = percentage >= 90 
    ? '#10b981' // Emerald
    : percentage >= 50 
    ? '#f59e0b' // Amber
    : '#ef4444'; // Red
  
  const sizeClasses = size === 'lg' 
    ? 'w-28 h-28 text-2xl' 
    : 'w-20 h-20 text-xl';

  const strokeWidth = size === 'lg' ? 6 : 5;
  const radius = size === 'lg' ? 52 : 35;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - percentage) / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative ${sizeClasses} flex items-center justify-center`}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.5s ease-in-out',
            }}
          />
        </svg>
        <span 
          className="absolute font-semibold"
          style={{ color }}
        >
          {percentage}
        </span>
      </div>
      {label && (
        <span className="text-gray-700 font-medium text-sm">
          {label}
        </span>
      )}
    </div>
  );
}