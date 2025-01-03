// import React from 'react';

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   isLoading?: boolean;
//   loadingText?: string;
//   className?: string;
// }

// const Button = ({ 
//   children, 
//   isLoading, 
//   loadingText = 'Loading...', 
//   className = '',
//   ...props 
// }: ButtonProps) => {
//   const baseClasses = 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50';
//   const defaultClasses = 'text-white bg-indigo-600 hover:bg-indigo-700';

//   return (
//     <button
//       className={`${baseClasses} ${defaultClasses} ${className}`}
//       disabled={isLoading || props.disabled}
//       {...props}
//     >
//       {isLoading ? loadingText : children}
//     </button>
//   );
// };

// export default Button;

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