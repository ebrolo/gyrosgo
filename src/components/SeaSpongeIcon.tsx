import React from 'react';

interface SeaSpongeIconProps {
  className?: string;
}

export default function SeaSpongeIcon({ className = 'w-4 h-4' }: SeaSpongeIconProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Wavy Porous Yellow Sea Sponge Body */}
      <path
        d="M5.5 6.5C7 5.6 9.2 6.8 11 6C12.8 5.2 14.8 6.6 16.6 5.9C18.4 5.2 20.8 6.4 21.5 8.2C22.2 10 21.1 12.2 21.8 14.2C22.5 16.2 21.3 18.4 21.6 20.4C21.9 22 20.2 23.4 18.4 23C16.6 22.6 14.6 23.6 12.8 23C11 22.4 9 23.5 7.2 22.8C5.4 22.1 4.6 20.2 5.2 18.4C5.8 16.6 4.6 14.4 5.3 12.4C6 10.4 4.2 7.3 5.5 6.5Z"
        fill="#FFD814"
        stroke="#B46900"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Characteristic Sea-Sponge Pores */}
      <circle cx="9.4" cy="10.4" r="1.5" fill="#C97A00" />
      <circle cx="16.2" cy="10.8" r="1.9" fill="#C97A00" />
      <circle cx="12.6" cy="15.2" r="1.2" fill="#C97A00" />
      <circle cx="8.8" cy="18.2" r="1.7" fill="#C97A00" />
      <circle cx="16.8" cy="18.4" r="1.4" fill="#C97A00" />
      {/* Playful Underwater Bubbles */}
      <circle cx="24.2" cy="5.2" r="2.1" fill="#67E8F9" fillOpacity="0.88" stroke="#0891B2" strokeWidth="1" />
      <circle cx="25.6" cy="10.2" r="1.2" fill="#A5F3FC" fillOpacity="0.9" />
    </svg>
  );
}

