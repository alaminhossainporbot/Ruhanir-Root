interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function Logo({
  className = 'h-10 w-auto',
  width = 40,
  height = 52,
  priority = false,
}: LogoProps) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet="/logo-400.webp 400w, /logo-800.webp 800w, /logo-1200.webp 1200w"
        sizes="(max-width: 640px) 40px, (max-width: 1024px) 80px, 400px"
      />
      <img
        src="/logo-400.png"
        srcSet="/logo-400.png 400w, /logo-800.png 800w"
        alt="Ruhanir Engine Logo"
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className={className}
      />
    </picture>
  );
}
