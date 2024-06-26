// src/components/Button.jsx
import { cva } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
  'py-2 px-4 rounded-md font-semibold hover:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-blue-500 to-green-500 text-black',
        secondary: 'bg-gray-700 text-white',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

const Button: React.FC<ButtonProps> = ({ variant, ...props }) => {
  return <button {...props} className={buttonVariants({ variant })} />;
};

export default Button;
