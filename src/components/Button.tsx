'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

// Define button variants, sizes and props types
type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactElement<IconType>;
  rightIcon?: React.ReactElement<IconType>;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  // Determine if we're in an RTL context
  const isRTL = document.dir === 'rtl' || document.documentElement.lang === 'he';

  // Base styles for all buttons
  const baseStyles = `
    font-medium
    rounded-xl
    transition-all
    duration-300
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    disabled:opacity-60
    disabled:cursor-not-allowed
    flex
    items-center
    justify-center
    ${fullWidth ? 'w-full' : ''}
  `;

  // Neumorphic and glassmorphism styles
  const neumorphicStyles = `
    shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.7)]
    active:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.1),inset_-5px_-5px_10px_rgba(255,255,255,0.7)]
  `;

  const glassStyles = `
    backdrop-filter
    backdrop-blur-md
    border
    border-opacity-20
  `;

  // Variant styles
  const variantStyles = {
    primary: `
      bg-[#96CEB4]
      hover:bg-[#85b9a0]
      text-white
      focus:ring-[#96CEB4]
      ${neumorphicStyles}
      ${glassStyles}
      border-[#a7dfc7]
    `,
    secondary: `
      bg-[#FF6B6B]
      hover:bg-[#ff5252]
      text-white
      focus:ring-[#FF6B6B]
      ${neumorphicStyles}
      ${glassStyles}
      border-[#ff8a8a]
    `,
    outline: `
      bg-transparent
      hover:bg-opacity-10
      hover:bg-[#96CEB4]
      text-[#96CEB4]
      border
      border-[#96CEB4]
      focus:ring-[#96CEB4]
      ${glassStyles}
    `,
  };

  // Size styles
  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  // Icon styles based on RTL
  const getIconStyles = (position: 'left' | 'right') => {
    // In RTL, left becomes right and vice versa
    const isStart = (position === 'left' && !isRTL) || (position === 'right' && isRTL);
    const isEnd = (position === 'right' && !isRTL) || (position === 'left' && isRTL);

    return isStart
      ? 'mr-2 rtl:ml-2 rtl:mr-0'
      : isEnd
      ? 'ml-2 rtl:mr-2 rtl:ml-0'
      : '';
  };

  // Spinner animation
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: 'linear',
      },
    },
  };

  // Adjust icons based on RTL
  const startIcon = isRTL ? rightIcon : leftIcon;
  const endIcon = isRTL ? leftIcon : rightIcon;

  return (
    <button
      id="custom-button"
      dir="rtl"
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <motion.div
          className="w-5 h-5 border-2 border-t-transparent border-white rounded-full"
          variants={spinnerVariants}
          animate="animate"
          aria-hidden="true"
        />
      ) : (
        <>
          {startIcon && (
            <span className={getIconStyles('left')} aria-hidden="true">
              {startIcon}
            </span>
          )}
          <span>{children}</span>
          {endIcon && (
            <span className={getIconStyles('right')} aria-hidden="true">
              {endIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
};

// Usage example component
const ButtonExample: React.FC = () => {
  return (
    <div dir="rtl" className="p-8 bg-gray-100 flex flex-col gap-4 items-start">
      <h2 className="text-right text-2xl font-bold mb-4">דוגמאות כפתורים</h2>
      
      <div className="flex flex-wrap gap-4 justify-start">
        <Button variant="primary">כפתור ראשי</Button>
        <Button variant="secondary">כפתור משני</Button>
        <Button variant="outline">כפתור מתאר</Button>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-start mt-4">
        <Button size="sm">קטן</Button>
        <Button size="md">בינוני</Button>
        <Button size="lg">גדול</Button>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-start mt-4">
        <Button isLoading>טוען...</Button>
        <Button disabled>מושבת</Button>
        <Button fullWidth className="mt-2">כפתור ברוחב מלא</Button>
      </div>
    </div>
  );
};

export default Button;