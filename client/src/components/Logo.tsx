export default function Logo({ className = "w-10 h-10", textClassName = "text-xl font-bold" }: { className?: string; textClassName?: string }) {
  return (
    <div className="flex items-center space-x-3">
      <div className={`${className} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background circle with gradient */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#1D4ED8', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#1E40AF', stopOpacity: 1 }} />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
            </filter>
          </defs>
          
          {/* Main circle background */}
          <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" filter="url(#shadow)" />
          
          {/* Spider web pattern - representing Anansi and network/connectivity */}
          <g stroke="white" strokeWidth="2" fill="none" opacity="0.9">
            {/* Outer web lines */}
            <circle cx="50" cy="50" r="35" />
            <circle cx="50" cy="50" r="25" />
            <circle cx="50" cy="50" r="15" />
            
            {/* Radial web lines */}
            <line x1="50" y1="15" x2="50" y2="85" />
            <line x1="15" y1="50" x2="85" y2="50" />
            <line x1="25" y1="25" x2="75" y2="75" />
            <line x1="75" y1="25" x2="25" y2="75" />
          </g>
          
          {/* Central spider body - representing CPU/processing core */}
          <ellipse cx="50" cy="50" rx="8" ry="12" fill="white" />
          <circle cx="50" cy="45" r="3" fill="url(#logoGradient)" />
          <circle cx="50" cy="55" r="2" fill="url(#logoGradient)" />
          
          {/* Spider legs - representing connections/integrations */}
          <g stroke="white" strokeWidth="2.5" strokeLinecap="round">
            {/* Left legs */}
            <path d="M 42 45 Q 30 35 20 30" />
            <path d="M 42 50 Q 25 50 15 50" />
            <path d="M 42 55 Q 30 65 20 70" />
            
            {/* Right legs */}
            <path d="M 58 45 Q 70 35 80 30" />
            <path d="M 58 50 Q 75 50 85 50" />
            <path d="M 58 55 Q 70 65 80 70" />
          </g>
          
          {/* Data flow dots - representing digital communication */}
          <g fill="rgba(255,255,255,0.7)">
            <circle cx="35" cy="35" r="1.5">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="65" cy="35" r="1.5">
              <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="35" cy="65" r="1.5">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="65" cy="65" r="1.5">
              <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>
      <span className={`text-gray-900 ${textClassName}`}>Kitji Studios</span>
    </div>
  );
}