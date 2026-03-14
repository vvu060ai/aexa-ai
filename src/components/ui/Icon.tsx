"use client";

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export function Icon({ name, className, priority = false }: { name: string; className?: string; priority?: boolean }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getIconPath = (iconName: string) => {
    const isLight = mounted && resolvedTheme === 'light';
    const premiumIcons = [
      'chat-bubble', 'clock', 'flash', 'folder', 'location', 'locker', 'mail', 
      'pencil', 'rocket', 'target', 'thumb-down', 'wallet', 'zoom', 'ghost', 
      'puzzle', 'file-text', 'computer', 'setting'
    ];
    const hasPremium = premiumIcons.includes(iconName);

    if (isLight && hasPremium) {
      return `/icons/light/3dicons-${iconName}-dynamic-premium.png`;
    }
    return `/icons/3dicons-${iconName}-dynamic-color.png`;
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src={getIconPath(name)} 
      alt={name} 
      className={className} 
      loading={priority ? "eager" : "lazy"} 
    />
  );
}
