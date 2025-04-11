'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

// Define TypeScript interfaces for props
interface ActionButton {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface CardProps {
  id?: string;
  image?: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  actions?: ActionButton[];
  variant?: 'service' | 'menu' | 'team' | 'default';
  imagePosition?: 'top' | 'left' | 'right';
  className?: string;
}

const Card: React.FC<CardProps> = ({
  id = `card-${Math.random().toString(36).substr(2, 9)}`,
  image,
  title,
  description,
  actions = [],
  variant = 'default',
  imagePosition = 'top',
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Define variant-specific styles
  const variantStyles = {
    service: {
      container: 'bg-gradient-to-br from-white/80 to-white/60',
      title: 'text-gray-800 text-xl',
      description: 'text-gray-600',
    },
    menu: {
      container: 'bg-gradient-to-br from-white/90 to-white/70',
      title: 'text-gray-800 font-bold text-xl',
      description: 'text-gray-700',
    },
    team: {
      container: 'bg-gradient-to-br from-white/80 to-white/60',
      title: 'text-gray-800 font-medium text-lg',
      description: 'text-gray-600 text-sm',
    },
    default: {
      container: 'bg-gradient-to-br from-white/80 to-white/60',
      title: 'text-gray-800 text-lg',
      description: 'text-gray-600',
    },
  };

  // Define image position styles
  const imagePositionStyles = {
    top: 'flex-col',
    left: 'flex-row-reverse', // Reversed for RTL
    right: 'flex-row', // Reversed for RTL
  };

  // Determine if the image should be full width
  const isImageFullWidth = imagePosition === 'top';
  
  // Determine image dimensions based on position
  const imageDimensions = isImageFullWidth 
    ? { width: '100%', height: '200px' }
    : { width: '120px', height: '120px' };

  return (
    <motion.div
      id={id}
      dir="rtl"
      className={`
        ${variantStyles[variant].container}
        ${imagePositionStyles[imagePosition]}
        flex overflow-hidden rounded-xl backdrop-blur-md
        border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        hover:shadow-[0_8px_30px_rgba(150,206,180,0.3)]
        transition-all duration-300 ease-in-out
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 10px 40px rgba(150, 206, 180, 0.4)'
      }}
    >
      {/* Image Section */}
      {image && (
        <div 
          className={`
            relative overflow-hidden
            ${isImageFullWidth ? 'w-full' : imagePosition === 'left' ? 'ml-4' : 'mr-4'}
            ${!isImageFullWidth && 'my-4'}
          `}
          style={{ 
            width: imageDimensions.width,
            height: imageDimensions.height,
            flexShrink: 0
          }}
        >
          <motion.div
            className="w-full h-full"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </div>
      )}

      {/* Content Section */}
      <div className={`
        flex flex-col text-right p-4 flex-1
        ${isImageFullWidth ? 'pt-2' : ''}
      `}>
        <motion.h3 
          className={`${variantStyles[variant].title} mb-2`}
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>
        
        <p className={`${variantStyles[variant].description} mb-4`}>
          {description}
        </p>

        {/* Action Buttons */}
        {actions.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 justify-start">
            {actions.map((action, index) => (
              <motion.button
                key={index}
                onClick={action.onClick}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium
                  ${index === 0 
                    ? 'bg-[#FF6B6B] text-white hover:bg-[#ff5252]' 
                    : 'bg-[#96CEB4] text-white hover:bg-[#7ebda3]'}
                  flex items-center justify-center gap-2
                  transition-all duration-200
                  shadow-[0_4px_10px_rgba(0,0,0,0.1)]
                  hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)]
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {action.label}
                <FaArrowLeft className="text-xs" />
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Card;

// Example usage:
/*
<Card
  image={{
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    alt: "מנה מיוחדת"
  }}
  title="מנה מיוחדת של השף"
  description="מנה מיוחדת המשלבת טעמים ים תיכוניים עם נגיעות אסיאתיות. מוגש עם ירקות טריים ורוטב הבית."
  actions={[
    { label: "הזמן עכשיו", onClick: () => console.log("הזמנה") },
    { label: "פרטים נוספים", onClick: () => console.log("פרטים") }
  ]}
  variant="menu"
/>
*/