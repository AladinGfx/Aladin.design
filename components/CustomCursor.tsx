import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      
      if (!isVisible) setIsVisible(true);
      
      const target = e.target as HTMLElement;
      
      // Check for pointer cursor (clickable elements)
      const computedStyle = window.getComputedStyle(target);
      setIsPointer(
        computedStyle.cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        !!target.closest('button') ||
        !!target.closest('a')
      );

      // Check for specific highlightable areas (add data-glow to elements)
      setIsGlowing(!!target.closest('[data-glow="true"]'));
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden mix-blend-difference hidden md:block"
      aria-hidden="true"
    >
      <div
        ref={cursorRef}
        className={`
          absolute left-0 top-0 rounded-full 
          bg-white will-change-transform
        `}
        style={{
          width: isGlowing ? '32px' : (isPointer ? '12px' : '8px'),
          height: isGlowing ? '32px' : (isPointer ? '12px' : '8px'),
          opacity: isVisible ? (isGlowing ? 0.8 : 1) : 0,
          boxShadow: isGlowing ? '0 0 20px 5px rgba(255, 255, 255, 0.5)' : 'none',
          filter: isGlowing ? 'blur(2px)' : 'none',
          // Initial position off-screen or handled by JS
          transform: 'translate3d(-100px, -100px, 0)'
        }}
      />
    </div>
  );
};