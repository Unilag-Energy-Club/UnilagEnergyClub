import type { ReactNode } from 'react';

interface ActionButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'white';
  className?: string;
}

const ActionButton = ({ 
  href, 
  children, 
  variant = 'primary',
  className = '' 
}: ActionButtonProps) => {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-primary',
    white: 'bg-white text-primary',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 py-3 px-10 rounded-[30px] font-bold transition-all duration-200 hover:shadow-custom ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      <span className="v-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="96"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path
            fill="none"
            stroke="currentColor"
            d="M16 5c0 .742.733 1.85 1.475 2.78c.954 1.2 2.094 2.247 3.401 3.046C21.856 11.425 23.044 12 24 12m0 0c-.956 0-2.145.575-3.124 1.174c-1.307.8-2.447 1.847-3.401 3.045C16.733 17.15 16 18.26 16 19m8-7H0"
            strokeWidth="1.4"
          />
        </svg>
      </span>
    </a>
  );
};

export default ActionButton;
