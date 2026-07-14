import React, { useState, useEffect } from 'react';
import { X, Check, ArrowLeft } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { Contact } from './components/Contact';
import { TopNav } from './components/TopNav';
import { InfoModal } from './components/InfoModal';

export type ViewState = 'home' | 'work' | 'contact';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<'about' | 'faq' | 'legal' | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  // Handle auto-scroll effect when switching views
  useEffect(() => {
    if (view !== 'home') {
      // Small delay to allow layout transition to start
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsScrolled(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsScrolled(false);
    }
  }, [view]);

  const handleClose = () => {
    if (lightboxImage) {
      setLightboxImage(null);
    } else {
      setView('home');
    }
  };

  const handleShowNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div className={`relative min-h-screen w-full selection:bg-neutral-500 selection:text-white ${view === 'home' ? 'h-screen overflow-hidden' : ''}`}>
      <CustomCursor />
      <ThemeToggle />
      <TopNav onOpenModal={setActiveModal} />
      <InfoModal isOpen={!!activeModal} type={activeModal} onClose={() => setActiveModal(null)} />

      {/* Notification Toast */}
      <div 
        className={`
          fixed top-8 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-full 
          bg-white/90 px-6 py-3 shadow-xl backdrop-blur-md transition-all duration-500 dark:bg-neutral-800/90
          ${showNotification ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}
        `}
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10">
          <Check className="h-4 w-4 text-blue-500" />
        </div>
        <span className="font-medium text-neutral-900 dark:text-white">Copied</span>
      </div>

      {/* Background Text "ALADIN" */}
      <div 
        className={`
          fixed inset-0 z-0 pointer-events-none select-none overflow-hidden
          transition-all duration-700 ease-premium
          ${view !== 'home' ? '-translate-y-[35vh] scale-75' : 'translate-y-0 scale-100'}
        `}
      >
        <svg 
          className="h-full w-full text-blue-500 opacity-[0.015] blur" 
          viewBox="0 0 100 16" 
          preserveAspectRatio="none"
        >
          <text 
            x="50%" 
            y="50%" 
            textAnchor="middle" 
            dominantBaseline="central" 
            fontWeight="900" 
            fontSize="20"
            fill="currentColor"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            ALADIN
          </text>
        </svg>
      </div>

      {/* Dark Vignette */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none select-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.8) 120%)'
        }}
      />

      {/* Close Button (Visible when not home or lightbox is open) */}
      <div 
        className={`fixed left-6 top-6 z-50 transition-all duration-500 ${view !== 'home' || lightboxImage ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}
      >
        <button
          onClick={handleClose}
          className="rounded-full bg-surface p-3 text-foreground shadow-md transition-all hover:scale-110 hover:shadow-xl dark:bg-neutral-800"
          aria-label="Back"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Bottom Blur Gradient */}
      <div 
        className="pointer-events-none fixed bottom-0 left-0 z-40 h-[7vh] w-full backdrop-blur-md"
        style={{ 
          maskImage: 'linear-gradient(to top, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent)'
        }}
      />

      <main className={`relative z-10 flex min-h-screen flex-col items-center transition-all duration-500 ${lightboxImage ? 'blur-sm grayscale pointer-events-none' : ''}`}>
        {/* 
          Hero Section 
          - Controls the main two boxes
          - Animates position based on 'view' state
        */}
        <div 
          className={`
            flex w-full flex-col items-center transition-all duration-700 ease-premium
            ${view === 'home' 
              ? 'min-h-screen pt-[8vh] md:pt-[35vh]' 
              : 'min-h-[25vh] pt-24 md:min-h-[35vh] md:pt-32'
            }
          `}
        >
          <Hero view={view} setView={setView} />
        </div>

        {/* 
          Content Section
          - Rolls down when view is active
        */}
        <div className="w-full max-w-7xl px-4 pb-20">
          {/* Work Section Container */}
          <div 
            className={`
              overflow-hidden transition-all duration-700 ease-premium
              ${view === 'work' ? 'max-h-[30000px] opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <Work isActive={view === 'work'} onImageSelect={setLightboxImage} onContactClick={() => setView('contact')} />
          </div>

          {/* Contact Section Container */}
          <div 
            className={`
              overflow-hidden transition-all duration-700 ease-premium
              ${view === 'contact' ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <Contact isActive={view === 'contact'} onShowNotification={handleShowNotification} />
          </div>
        </div>
      </main>

      {/* Lightbox Overlay */}
      <div 
        className={`
          fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-300
          ${lightboxImage ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}
        `}
        onClick={() => setLightboxImage(null)}
      >
        {/* Back Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLightboxImage(null);
          }}
          className="absolute left-6 top-6 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110"
          aria-label="Back to portfolio"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>

        {lightboxImage && (
          <div 
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
          >
            <img 
              src={lightboxImage} 
              alt="Selected Work" 
              className="max-h-[85vh] w-auto object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;