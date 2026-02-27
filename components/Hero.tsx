import React from 'react';
import { ViewState } from '../App';

interface HeroProps {
  view: ViewState;
  setView: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ view, setView }) => {
  return (
    <div className={`
      flex flex-col items-center gap-4 md:gap-8
      transition-transform duration-700 ease-premium
      ${view !== 'home' 
        ? 'scale-50 -my-16 md:scale-75 md:-my-10 lg:scale-100 lg:my-0' // Compensate for scale layout gap
        : 'scale-100'
      }
    `}>
      {/* Commissions Open Badge */}
      <div className="flex items-center gap-2 rounded-full border border-black/5 bg-surface px-3 py-1 shadow-sm dark:border-white/10 md:px-4 md:py-2">
        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] md:h-2 md:w-2" />
        <span className="text-xs font-medium text-foreground/80 md:text-sm">Commissions Open</span>
      </div>

      <div className={`
        flex 
        ${view !== 'home' ? 'flex-row gap-4' : 'flex-col gap-6'} 
        md:flex-row md:gap-8 lg:gap-12
      `}>
        <NavBox 
          label="PORTFOLIO"
          icon={<ThumbnailIcon />}
          isActive={view === 'work'}
          onClick={() => setView(view === 'work' ? 'home' : 'work')}
        />
        <NavBox 
          label="CONTACT"
          icon={<PlaneIcon />}
          isActive={view === 'contact'}
          onClick={() => setView(view === 'contact' ? 'home' : 'contact')}
        />
      </div>
    </div>
  );
};

interface NavBoxProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const NavBox: React.FC<NavBoxProps> = ({ label, icon, isActive, onClick }) => {
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on cursor position
    // Range: -5deg to 5deg
    const rotateY = ((x / rect.width) - 0.5) * 10; 
    const rotateX = ((y / rect.height) - 0.5) * -10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-glow="true"
      style={{
        transform: isActive 
          ? 'scale(1.05) perspective(1000px) rotateX(0) rotateY(0)' 
          : `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
      className={`
        group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl 
        bg-surface text-foreground transition-all duration-500 ease-premium
        
        /* Mobile: Smaller size (h-64 w-64) */
        h-64 w-64
        
        /* Vertical Tablet: Medium size (h-80 w-80) */
        md:h-80 md:w-80
        
        /* Desktop: Larger size (h-96 w-96) */
        lg:h-96 lg:w-96
        
        /* Rely on shadow and transform for 3D pop-up feel */
        shadow-lg
        
        hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]
        dark:hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]

        ${isActive ? 'shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]' : ''}
      `}
    >
      {/* Gradient Outline: Transparent top -> Light Gray bottom */}
      <div 
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          padding: '1.5px',
          background: 'linear-gradient(to bottom, transparent 20%, rgba(161, 161, 170, 0.6))',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Subtle Inner Glow: Bottom only, inwards - appears on hover */}
      <div 
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
        style={{
          boxShadow: 'inset 0 -20px 25px -12px rgba(161, 161, 170, 0.15)',
        }}
      />

      <div className={`
        mb-4 transition-all duration-500 ease-premium
        group-hover:-translate-y-6 group-hover:scale-110 
        ${isActive ? '-translate-y-6 scale-110' : 'opacity-90 group-hover:opacity-100'}
      `}>
        {/* Scale icons down on mobile */}
        <div className="scale-75 md:scale-90 lg:scale-100">
          {icon}
        </div>
      </div>
      
      <span className={`
        absolute bottom-16 text-xl font-bold tracking-widest opacity-0 transition-all duration-500 ease-premium
        md:bottom-20 md:text-2xl lg:bottom-24 lg:text-3xl
        group-hover:translate-y-10 group-hover:opacity-100
        ${isActive ? 'translate-y-10 opacity-100' : 'translate-y-20'}
      `}>
        {label}
      </span>
    </button>
  );
};

// 3D Monitor Icon (Floating Screen, Centered)
const ThumbnailIcon = () => (
  <svg viewBox="0 0 100 100" className="h-60 w-60 overflow-visible drop-shadow-2xl">
    <defs>
      {/* Monitor Frame Gradient (Silver) */}
      <linearGradient id="monitorFrame" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e2e8f0" /> {/* slate-200 */}
        <stop offset="50%" stopColor="#94a3b8" /> {/* slate-400 */}
        <stop offset="100%" stopColor="#475569" /> {/* slate-600 */}
      </linearGradient>
      
      {/* Screen Gradient (Blue Glossy) */}
      <linearGradient id="screenBlue" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" /> {/* blue-400 */}
        <stop offset="50%" stopColor="#2563eb" /> {/* blue-600 */}
        <stop offset="100%" stopColor="#1e3a8a" /> {/* blue-900 */}
      </linearGradient>

      {/* Screen Reflection */}
      <linearGradient id="screenReflect" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.4" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>

      {/* Blue Glow Behind */}
      <filter id="blueGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="15" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      {/* Screen Clip Path */}
      <clipPath id="screenClip">
        <rect x="4" y="4" width="72" height="47" rx="2" />
      </clipPath>
    </defs>
    
    {/* Background Glow */}
    <circle cx="50" cy="50" r="35" fill="#3b82f6" opacity="0.4" filter="url(#blueGlow)" />

    {/* Centered Monitor Body (No Stand) */}
    <g transform="translate(10, 22.5)">
      {/* Monitor Body */}
      <rect x="0" y="0" width="80" height="55" rx="4" fill="url(#monitorFrame)" stroke="#cbd5e1" strokeWidth="1" />
      
      {/* Screen (Inset) */}
      <rect x="4" y="4" width="72" height="47" rx="2" fill="url(#screenBlue)" />
      
      {/* Screen Reflection/Gloss */}
      <path d="M4 4 L76 4 L76 30 Q 40 40 4 30 Z" fill="url(#screenReflect)" opacity="0.5" />

      {/* Figures on Screen (Clipped) */}
      <g clipPath="url(#screenClip)">
        {/* Right Figure (Cheering - Farther away) */}
        <g transform="translate(60, 22) scale(0.55)">
          <circle cx="0" cy="-8" r="4" fill="white" opacity="0.8" />
          <path d="M -4 -4 L 4 -4 L 3 10 L -3 10 Z" fill="white" opacity="0.8" />
          <path d="M -4 -2 L -8 -10 M 4 -2 L 8 -10" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <path d="M -2 10 L -4 18 M 2 10 L 4 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        </g>

        {/* Left Figure (Pointing - Close up, Bigger, Longer) */}
        <g transform="translate(25, 42) scale(1.4)">
          {/* Head */}
          <circle cx="0" cy="-14" r="5.5" fill="white" opacity="0.95" />
          {/* Body (Longer/Bigger) */}
          <path d="M -6 -7 L 6 -7 L 7 15 L -7 15 Z" fill="white" opacity="0.95" />
          {/* Pointing Arm (Shortened) */}
          <path d="M 4 -5 L 16 -8" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.95" />
        </g>
      </g>
      
      {/* Monitor Buttons */}
      <circle cx="68" cy="51" r="1" fill="#475569" />
      <circle cx="72" cy="51" r="1" fill="#475569" />
    </g>
  </svg>
);

// 90s Brick Phone Icon (Light Gray)
const PlaneIcon = () => (
  <svg viewBox="0 0 100 100" className="h-60 w-60 overflow-visible drop-shadow-2xl">
    <defs>
      {/* Phone Body Gradient (Light Gray) */}
      <linearGradient id="phoneBody" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#d1d5db" /> {/* gray-300 */}
        <stop offset="50%" stopColor="#f3f4f6" /> {/* gray-100 */}
        <stop offset="100%" stopColor="#9ca3af" /> {/* gray-400 */}
      </linearGradient>
      
      {/* Screen Gradient (Monochrome LCD) */}
      <linearGradient id="lcdScreen" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#d1d5db" /> {/* gray-300 */}
        <stop offset="100%" stopColor="#9ca3af" /> {/* gray-400 */}
      </linearGradient>

      {/* Button Gradient */}
      <linearGradient id="btnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4b5563" /> {/* gray-600 */}
        <stop offset="100%" stopColor="#1f2937" /> {/* gray-800 */}
      </linearGradient>

      {/* White Glow Behind */}
      <filter id="whiteGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="15" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    {/* Background Glow */}
    <circle cx="50" cy="50" r="30" fill="white" opacity="0.3" filter="url(#whiteGlow)" />

    <g transform="translate(22.5, 14)">
      {/* Antenna */}
      <rect x="25" y="-10" width="4" height="20" rx="2" fill="#6b7280" />
      <circle cx="27" cy="-10" r="3" fill="#374151" />

      {/* Main Body */}
      <rect x="10" y="10" width="35" height="75" rx="4" fill="url(#phoneBody)" stroke="#9ca3af" strokeWidth="1" />
      
      {/* Earpiece Area */}
      <rect x="15" y="15" width="25" height="8" rx="1" fill="#e5e7eb" opacity="0.5" />
      <rect x="20" y="17" width="15" height="2" rx="1" fill="#374151" />

      {/* LCD Screen */}
      <rect x="15" y="28" width="25" height="15" rx="1" fill="url(#lcdScreen)" stroke="#6b7280" strokeWidth="1" />
      
      {/* Keypad Area */}
      <g transform="translate(15, 48)">
        {/* Row 1 */}
        <rect x="0" y="0" width="6" height="4" rx="1" fill="url(#btnGrad)" />
        <rect x="9" y="0" width="6" height="4" rx="1" fill="url(#btnGrad)" />
        <rect x="18" y="0" width="6" height="4" rx="1" fill="url(#btnGrad)" />
        
        {/* Row 2 */}
        <rect x="0" y="6" width="6" height="4" rx="1" fill="url(#btnGrad)" />
        <rect x="9" y="6" width="6" height="4" rx="1" fill="url(#btnGrad)" />
        <rect x="18" y="6" width="6" height="4" rx="1" fill="url(#btnGrad)" />
        
        {/* Row 3 */}
        <rect x="0" y="12" width="6" height="4" rx="1" fill="url(#btnGrad)" />
        <rect x="9" y="12" width="6" height="4" rx="1" fill="url(#btnGrad)" />
        <rect x="18" y="12" width="6" height="4" rx="1" fill="url(#btnGrad)" />
        
        {/* Row 4 */}
        <rect x="0" y="18" width="6" height="4" rx="1" fill="url(#btnGrad)" />
        <rect x="9" y="18" width="6" height="4" rx="1" fill="url(#btnGrad)" />
        <rect x="18" y="18" width="6" height="4" rx="1" fill="url(#btnGrad)" />
      </g>
    </g>
  </svg>
);