'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        delay: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
      transition: {
        duration: 0.3,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <section 
      id="hero-section" 
      dir="rtl" 
      className="relative h-screen w-full overflow-hidden"
      aria-label="אזור כותרת ראשית"
    >
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div 
          className="relative h-full w-full"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="מסעדה גמא - תמונת רקע"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-right max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Glass Card */}
          <div className="backdrop-blur-md bg-white/10 p-8 md:p-12 rounded-2xl border border-white/20 shadow-xl">
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              מסעדה מוביל בישראל
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/90 mb-8"
            >
              חווית לקוח מושלמת בכל ביקור
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="mb-8 text-white/80"
            >
              <p>אנחנו מסעדה מוביל בתחום המזון עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.</p>
            </motion.div>
            
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-4 rounded-xl text-lg font-medium bg-gradient-to-l from-[#96CEB4] to-[#96CEB4]/80 text-white shadow-[0_8px_16px_rgba(150,206,180,0.3)] hover:shadow-[0_12px_24px_rgba(150,206,180,0.4)] transition-all duration-300 neumorphic-button relative overflow-hidden"
              aria-label="קבע תור עכשיו"
            >
              <span className="relative z-10">קבע תור עכשיו</span>
              <span className="absolute inset-0 bg-gradient-to-l from-[#FF6B6B] to-[#FF6B6B]/80 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Custom CSS for neumorphic effect */}
      <style jsx>{`
        .neumorphic-button {
          box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.2),
                     -6px -6px 12px rgba(255, 255, 255, 0.1);
        }
        
        .neumorphic-button:active {
          box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.2),
                     inset -4px -4px 8px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
};

export default HeroSection;