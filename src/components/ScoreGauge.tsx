import React from 'react';

interface ScoreGaugeProps {
  score: number;
  label: string;
  size?: 'sm' | 'lg';
}

export function ScoreGauge({ score, label, size = 'lg' }: ScoreGaugeProps) {
  const percentage = Math.round(score * 100);
  const color = percentage >= 90 
    ? '#00c853' // Green
    : percentage >= 50 
    ? '#ffa400' // Orange 
    : '#ff4e42'; // Red
  
  const sizeClasses = size === 'lg' 
    ? 'w-32 h-32 text-3xl' 
    : 'w-20 h-20 text-xl';

  const strokeWidth = size === 'lg' ? 8 : 6;
  const radius = size === 'lg' ? 58 : 35;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - percentage) / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`relative ${sizeClasses} flex items-center justify-center`}>
        <svg className="transform -rotate-90 w-full h-full">
          {/* Background circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#e6e6e6"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
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
          className="absolute font-bold"
          style={{ color }}
        >
          {percentage}
        </span>
      </div>
      {label && (
        <span className="text-gray-700 font-medium text-sm text-center">
          {label}
        </span>
      )}
    </div>
  );
}