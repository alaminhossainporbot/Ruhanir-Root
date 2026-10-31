import React from 'react';

interface ProseProps {
  children?: React.ReactNode;
  html?: string;
  className?: string;
}

export function Prose({ children, html, className = '' }: ProseProps) {
  if (html) {
    return (
      <div
        className={`prose prose-slate max-w-[70ch] text-[17px] leading-relaxed text-[#1F2937] [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#0B1B3A] [&_h2]:pt-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#0B1B3A] [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:text-[#374151] [&_a]:text-[#0E52C3] [&_a]:underline ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div
      className={`max-w-[70ch] text-[17px] leading-relaxed text-[#1F2937] space-y-4 ${className}`}
    >
      {children}
    </div>
  );
}
