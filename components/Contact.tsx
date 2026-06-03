import React, { useState } from 'react';
import { Instagram, Twitter, Mail, Check } from 'lucide-react';

interface ContactProps {
  isActive: boolean;
  onShowNotification: () => void;
}

interface ContactMethod {
  id: string;
  label: string;
  value: string;
  href?: string;
  type: 'link' | 'copy';
  icon: React.ReactNode;
}

const DiscordIcon = () => (
  <svg viewBox="0 0 127 96" className="h-10 w-10 fill-current">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.89,105.89,0,0,0,126.6,80.22c1.24-23.69-3.23-47.53-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
  </svg>
);

const CONTACTS: ContactMethod[] = [
  { id: 'discord', label: 'Discord', value: 'aladin8919', type: 'copy', icon: <DiscordIcon /> },
  { id: 'twitter', label: 'X / Twitter', value: '@AladinGfx', href: 'https://twitter.com/AladinGfx', type: 'link', icon: <Twitter className="h-10 w-10" /> },
  { id: 'instagram', label: 'Instagram', value: '@aladin.gfx', href: 'https://instagram.com/aladin.gfx', type: 'link', icon: <Instagram className="h-10 w-10" /> },
  { id: 'email', label: 'Email', value: 'aladin.gfx@seznam.cz', type: 'copy', icon: <Mail className="h-10 w-10" /> },
];

export const Contact: React.FC<ContactProps> = ({ isActive, onShowNotification }) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    onShowNotification();
  };

  return (
    <div className="flex w-full flex-col items-center p-8 pb-20">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {CONTACTS.map((contact, index) => {
          const isLink = contact.type === 'link';
          const Wrapper = isLink ? 'a' : 'button';
          const props = isLink 
            ? { href: contact.href, target: '_blank', rel: 'noopener noreferrer' }
            : { onClick: () => handleCopy(contact.value) };

          return (
            <Wrapper
              key={contact.id}
              {...props}
              data-glow="true"
              className={`
                group relative flex h-32 w-full items-center justify-start gap-6 overflow-hidden rounded-2xl px-8
                bg-surface text-foreground transition-all duration-500 ease-premium
                shadow-md hover:-translate-y-1 hover:shadow-xl focus:outline-none
                
                ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                {contact.icon}
              </div>
              
              {/* Text Content */}
              <div className="flex flex-col items-start justify-center">
                <span className="text-xs font-semibold uppercase tracking-widest opacity-60">
                  {contact.label}
                </span>
                <span className="mt-1 text-lg font-bold">
                  {contact.value}
                </span>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
};