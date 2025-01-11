import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
}

const Button = ({ 
  children, 
  isLoading, 
  loadingText = 'Loading...', 
  className = '',
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={`font-FutuLight text-white ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
};

export default Button