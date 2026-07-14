import React from 'react';

interface WorkProps {
  isActive: boolean;
  onImageSelect: (imgSrc: string) => void;
  onContactClick: () => void;
}

// Every image dropped into the /thumbs folder is shown automatically.
// Order is alphabetical by filename — use number prefixes (01-, 02-, ...)
// to control which thumbnails appear first.
const thumbModules = import.meta.glob('../thumbs/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const THUMBNAILS = Object.keys(thumbModules)
  .sort()
  .map((path, i) => ({
    id: i,
    title: `Project ${i + 1}`,
    image: thumbModules[path],
  }));

export const Work: React.FC<WorkProps> = ({ isActive, onImageSelect, onContactClick }) => {
  return (
    <div className="flex flex-col items-center p-8 transition-all duration-500">
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {THUMBNAILS.map((thumb, index) => (
          <button
            key={thumb.id}
            onClick={() => onImageSelect(thumb.image)}
            data-glow="true"
            className={`
              group relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-900 shadow-sm
              transition-all duration-500 ease-premium
              hover:z-10 hover:scale-110 hover:shadow-2xl hover:shadow-black/50
              focus:outline-none focus:ring-2 focus:ring-foreground
              ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
            `}
            style={{ transitionDelay: `${index * 50}ms` }}
            aria-label={`View ${thumb.title}`}
          >
            <img
              src={thumb.image}
              alt={thumb.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out"
              loading="lazy"
            />

            {/* Subtle sheen on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/0 transition-all duration-500 group-hover:via-white/10" />
          </button>
        ))}
      </div>

      {/* "Let's work together" Button */}
      <div className={`mt-16 transition-all delay-1000 duration-700 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <button
          onClick={onContactClick}
          className="group relative overflow-hidden rounded-full bg-foreground px-8 py-3 text-sm font-medium uppercase tracking-widest text-background transition-all hover:scale-105 hover:shadow-lg"
        >
          <span className="relative z-10">Let's work together</span>
          <div className="absolute inset-0 -translate-x-full bg-blue-500 transition-transform duration-500 group-hover:translate-x-0" />
        </button>
      </div>
    </div>
  );
};
