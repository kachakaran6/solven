import React from 'react';

export const HangerSvg = ({ tone = 'dark-walnut', className = '' }) => {
  const isOak = tone === 'natural-oak';

  return (
    <svg
      viewBox="0 0 280 80"
      className={`w-full max-w-[240px] sm:max-w-[280px] h-auto drop-shadow-sm select-none pointer-events-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Metal hook gradient */}
        <linearGradient id="metalHookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2E2E2" />
          <stop offset="50%" stopColor="#A8A8A8" />
          <stop offset="100%" stopColor="#4A4A4A" />
        </linearGradient>

        {/* Wood gradients */}
        <linearGradient id="darkWalnutGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#2A1B14" />
          <stop offset="35%" stopColor="#442D21" />
          <stop offset="70%" stopColor="#5C3D2E" />
          <stop offset="100%" stopColor="#2A1B14" />
        </linearGradient>

        <linearGradient id="naturalOakGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#C4A482" />
          <stop offset="40%" stopColor="#E0C9A6" />
          <stop offset="80%" stopColor="#D5BA93" />
          <stop offset="100%" stopColor="#B89670" />
        </linearGradient>

        <filter id="hangerShadow" x="-10%" y="-10%" width="120%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Vertical connection rod to overhead rail */}
      <line
        x1="140"
        y1="0"
        x2="140"
        y2="18"
        stroke="url(#metalHookGrad)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Swivel Ring */}
      <circle
        cx="140"
        cy="20"
        r="3.5"
        fill="url(#metalHookGrad)"
      />

      {/* Swivel Neck Hook */}
      <path
        d="M140 22 C140 32, 140 38, 140 44"
        stroke="url(#metalHookGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Sculpted Wood Coat Hanger Shoulder Bar */}
      <path
        d="M20 74 C 70 54, 115 48, 140 48 C 165 48, 210 54, 260 74 C 263 75.5, 264 77, 261 78 C 257 79, 240 76, 210 70 C 170 62, 110 62, 70 70 C 40 76, 23 79, 19 78 C 16 77, 17 75.5, 20 74 Z"
        fill={isOak ? "url(#naturalOakGrad)" : "url(#darkWalnutGrad)"}
        filter="url(#hangerShadow)"
      />

      {/* Subtle wood highlight crest */}
      <path
        d="M50 67 C 95 56, 130 52, 140 52 C 150 52, 185 56, 230 67"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
};
