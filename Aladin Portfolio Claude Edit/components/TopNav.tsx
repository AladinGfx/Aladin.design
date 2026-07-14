import React from 'react';

interface TopNavProps {
  onOpenModal: (modal: 'about' | 'faq' | 'legal') => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onOpenModal }) => {
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center">
      <div className="flex gap-8 transition-all">
        <button 
          onClick={() => onOpenModal('about')}
          className="text-xs font-medium uppercase tracking-widest text-foreground/30 transition-all hover:text-foreground hover:opacity-100"
        >
          About
        </button>
        <button 
          onClick={() => onOpenModal('faq')}
          className="text-xs font-medium uppercase tracking-widest text-foreground/30 transition-all hover:text-foreground hover:opacity-100"
        >
          FAQ
        </button>
        <button 
          onClick={() => onOpenModal('legal')}
          className="text-xs font-medium uppercase tracking-widest text-foreground/30 transition-all hover:text-foreground hover:opacity-100"
        >
          Legal
        </button>
      </div>
    </nav>
  );
};
