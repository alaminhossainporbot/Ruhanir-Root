import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-[1200px] px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  band?: boolean;
  className?: string;
  id?: string;
}

export function Section({
  children,
  band = false,
  className = '',
  id,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-24 ${band ? 'bg-[#F5F7FA]' : 'bg-white'} ${className}`}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}
