'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CTASection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      id="cta-section" 
      dir="rtl" 
      className="relative w-full py-16 md:py-24 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          alt="תמונת רקע של מנה מיוחדת במסעדה גמא"
          layout="fill"
          objectFit="cover"
          priority
          className="z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl"
          style={{
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="text-right">
            <motion.h2 
              id="cta-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              טעמים שלא תשכחו לעולם
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mr-auto ml-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              מקומות מוגבלים לסוף השבוע! הזמינו מקום עכשיו וחוו את החוויה הקולינרית המדוברת ביותר בעיר. תפריט מיוחד מחכה רק לכם.
            </motion.p>
            
            <motion.div
              className="flex justify-end"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                className="relative overflow-hidden rounded-xl px-8 py-4 text-lg font-medium text-white"
                style={{
                  background: `linear-gradient(135deg, #96CEB4, #88BEA6)`,
                  boxShadow: isHovered 
                    ? '0 10px 20px rgba(150, 206, 180, 0.4), inset 0 -2px 0 rgba(0, 0, 0, 0.1)' 
                    : '0 6px 12px rgba(150, 206, 180, 0.3), inset 0 -2px 0 rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="הזמנת מקום במסעדה"
              >
                <motion.span 
                  className="relative z-10"
                  animate={{ 
                    color: isHovered ? '#FFFFFF' : '#FFFFFF'
                  }}
                >
                  קבע תור עכשיו
                </motion.span>
                
                {/* Animated background effect */}
                <motion.div 
                  className="absolute inset-0 z-0"
                  initial={{ x: '-100%' }}
                  animate={{ 
                    x: isHovered ? '0%' : '-100%',
                    background: `linear-gradient(135deg, #FF6B6B, #FF5A5A)`
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="mt-6 text-white/70 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-right">* ההזמנה מותנית באישור זמינות. שעות פעילות: א׳-ה׳ 12:00-23:00, ו׳-ש׳ 12:00-00:00</p>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#96CEB4]/30 to-transparent blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#FF6B6B]/30 to-transparent blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            delay: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
    </section>
  );
};

export default CTASection;