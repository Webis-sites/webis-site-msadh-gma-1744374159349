'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaUtensils } from 'react-icons/fa';

interface SectionHeaderProps {
  /**
   * The main title of the section
   */
  title: string;
  /**
   * Optional subtitle for additional context
   */
  subtitle?: string;
  /**
   * Alignment of the header content
   * @default 'center'
   */
  alignment?: 'right' | 'center';
  /**
   * Size variant of the header
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Whether to show decorative elements
   * @default true
   */
  hasDecoration?: boolean;
  /**
   * Optional ID for the section header
   */
  id?: string;
  /**
   * Optional custom class names
   */
  className?: string;
}

/**
 * RTL-optimized SectionHeader component for Hebrew restaurant website
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  alignment = 'center',
  size = 'medium',
  hasDecoration = true,
  id = 'section-header',
  className = '',
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const decorationVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  // Size classes mapping
  const sizeClasses = {
    small: {
      title: 'text-2xl md:text-3xl',
      subtitle: 'text-sm md:text-base',
      decoration: 'w-16 md:w-20',
    },
    medium: {
      title: 'text-3xl md:text-4xl',
      subtitle: 'text-base md:text-lg',
      decoration: 'w-20 md:w-24',
    },
    large: {
      title: 'text-4xl md:text-5xl',
      subtitle: 'text-lg md:text-xl',
      decoration: 'w-24 md:w-32',
    },
  };

  // Alignment classes
  const alignmentClasses = {
    right: 'text-right items-end',
    center: 'text-center items-center',
  };

  return (
    <motion.div
      id={id}
      dir="rtl"
      className={`w-full my-8 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className={`flex flex-col ${alignmentClasses[alignment]}`}>
        {hasDecoration && (
          <motion.div 
            className="flex items-center justify-center mb-4"
            variants={itemVariants}
          >
            <motion.div 
              className={`h-0.5 bg-[#FF6B6B] ${sizeClasses[size].decoration} mx-2`}
              variants={decorationVariants}
            />
            <motion.div 
              className="rounded-full p-2 bg-[#96CEB4] bg-opacity-20 backdrop-blur-sm border border-[#96CEB4] border-opacity-30 shadow-lg"
              whileHover={{ rotate: 180, transition: { duration: 0.5 } }}
            >
              <FaUtensils className="text-[#96CEB4] text-lg" />
            </motion.div>
            <motion.div 
              className={`h-0.5 bg-[#FF6B6B] ${sizeClasses[size].decoration} mx-2`}
              variants={decorationVariants}
            />
          </motion.div>
        )}

        <motion.h2
          className={`font-bold ${sizeClasses[size].title} text-gray-800 mb-2 px-4 py-2 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm shadow-sm border border-[#96CEB4] border-opacity-20`}
          variants={itemVariants}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            className={`${sizeClasses[size].subtitle} text-gray-600 max-w-2xl px-4 py-2 rounded-lg bg-white bg-opacity-30 backdrop-blur-sm`}
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>
        )}

        {hasDecoration && (
          <motion.div 
            className={`h-1 bg-gradient-to-r from-transparent via-[#96CEB4] to-transparent rounded-full mt-4 ${sizeClasses[size].decoration}`}
            variants={decorationVariants}
          />
        )}
      </div>
    </motion.div>
  );
};

export default SectionHeader;

// Example usage:
// <SectionHeader 
//   title="תפריט המסעדה"
//   subtitle="מבחר מנות מהמטבח שלנו, מבושלות בקפידה עם חומרי גלם טריים"
//   alignment="right"
//   size="large"
//   hasDecoration={true}
// />