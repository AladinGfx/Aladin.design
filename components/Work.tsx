import React, { useState } from 'react';
import { X } from 'lucide-react';

interface WorkProps {
  isActive: boolean;
  onImageSelect: (imgSrc: string) => void;
  onContactClick: () => void;
}

const PORTFOLIO_IMAGES = [
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/d0c2ff243277193.69a0c2471c98c.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/87bb8f245251123.69a96d67ef44b.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/06e24f243277193.6998879d9604a.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/b080f6245251123.69af03096f241.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/25ac96243277193.6998879d97180.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/d96e7d245251123.69b13c56b7ca4.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/db28aa243277193.697e29452130c.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/07076c245251123.69a96d67ed963.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/1e07e8243277193.69a0bdcede1e6.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/27f530243277193.6998879d8d712.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/2f39af243277193.697e3ddc76e81.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/37b2a3245251123.69af03096e8f0.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/d1220d243277193.6998879d92a84.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/081590243277193.697e3ddc79026.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/44226a245251123.69a96d67eebf1.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/528281243277193.6998879d8cb70.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/ec6953243277193.697e3ddc75fe7.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/df5370243277193.697e294521efc.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/c6ceaf243277193.6998879d8eebd.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/6af3a7245251123.69a96d67ee2d8.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/19e04a243277193.6998879d8dfd2.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/4b4cb6243277193.697e3ddc786e2.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/10b453243277193.697e3ddc72046.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/a6eecd243277193.697e3ddc718f4.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/22c652243277193.6998879d93d76.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/e6bc61243277193.699df29c2cc4f.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/cc1f75243277193.69a0bdcedda33.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/1544a1243277193.6998879d979f4.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/a2d20f243277193.6998879d90798.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/3c44da243277193.6998879d968ff.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/e13df7243277193.6998879d946ef.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/54ece5243277193.6998879d91f05.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/351dc0243277193.6998879d91827.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/982acf243277193.6998879d959fe.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/fc0217243277193.697e2945224d7.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/376a27243277193.69a0bdcede75b.png",
];

const generateThumbnails = () => {
  // Create a copy of the array to avoid mutating the original
  const images = [...PORTFOLIO_IMAGES];
  
  // Randomization disabled as per user request to "freeze" the layout.
  // The user requested a specific swap:
  // "replace the one at the top in the middle" (Index 1)
  // "with the one from the four row counting from below at the right side" (Index 35)
  
  // Swap Index 1 and Index 35
  if (images.length > 35) {
    [images[1], images[35]] = [images[35], images[1]];
  }
  
  // Swap Index 4 (Image 5) and Index 17 (Image 18)
  if (images.length > 17) {
    [images[4], images[17]] = [images[17], images[4]];
  }

  // Remove specific images by their 1-based position in the grid
  // Images to remove: 16, 22, 23, 24, 30 (Indices: 15, 21, 22, 23, 29)
  const indicesToRemove = new Set([15, 21, 22, 23, 29]);
  let finalImages = images.filter((_, index) => !indicesToRemove.has(index));

  // Remove the 24th image in the current grid (Index 23)
  finalImages = finalImages.filter((_, index) => index !== 23);

  return finalImages.map((img, i) => ({
    id: i,
    title: `Project ${i + 1}`,
    image: img,
  }));
};

const THUMBNAILS = generateThumbnails();

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