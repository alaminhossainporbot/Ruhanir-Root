import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'white';
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-[6px] px-6 py-2.5 text-[16px] font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2 disabled:opacity-50';

  const variants = {
    primary: 'bg-[#05308A] text-white hover:bg-[#0E52C3]',
    secondary:
      'border border-slate-300 bg-white text-[#1F2937] hover:bg-slate-50 hover:border-slate-400',
    white:
      'bg-white text-[#05308A] hover:bg-slate-100 focus:ring-white focus:ring-offset-[#05308A]',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
