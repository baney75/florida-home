interface CrossIconProps {
  className?: string;
}

export function CrossIcon({ className = "w-4 h-4" }: CrossIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Christian cross with longer vertical bar */}
      <path
        d="M12 3V21M6 8H18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
