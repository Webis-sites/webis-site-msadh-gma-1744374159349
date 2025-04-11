'use client';

import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navItems: NavItem[] = [
    { id: 'home', label: 'ראשי' },
    { id: 'menu', label: 'תפריט' },
    { id: 'about', label: 'אודות' },
    { id: 'gallery', label: 'גלריה' },
    { id: 'contact', label: 'צור קשר' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav 
      id="navbar"
      dir="rtl"
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md' 
          : 'bg-white/70 backdrop-blur-sm'
      }`}
      aria-label="תפריט ניווט ראשי"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <a 
              href="#home" 
              className="text-2xl font-bold text-right"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
            >
              <span className="text-[#96CEB4]">מסעדה</span>
              <span className="text-[#FF6B6B]"> גמא</span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4 space-x-reverse">
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-gray-700 hover:text-[#FF6B6B] px-3 py-2 rounded-md text-md font-medium transition-all duration-200 relative group"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-current={item.id === 'home' ? 'page' : undefined}
                >
                  {item.label}
                  <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#96CEB4] transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
              <motion.button
                className="neumorphic-button bg-[#96CEB4] text-white px-5 py-2 rounded-lg font-medium shadow-[5px_5px_10px_rgba(150,206,180,0.2),-5px_-5px_10px_rgba(150,206,180,0.1)] hover:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.1),inset_-5px_-5px_10px_rgba(255,255,255,0.1)] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
              >
                הזמנה
              </motion.button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#FF6B6B] focus:outline-none"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">{isOpen ? 'סגור תפריט' : 'פתח תפריט'}</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-md shadow-lg rounded-b-2xl">
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-gray-700 hover:bg-[#96CEB4]/10 hover:text-[#FF6B6B] block px-3 py-2 rounded-md text-base font-medium text-right"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  whileHover={{ x: 5 }}
                  aria-current={item.id === 'home' ? 'page' : undefined}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.button
                className="w-full text-right bg-[#96CEB4] text-white px-3 py-2 rounded-lg font-medium shadow-md hover:bg-[#96CEB4]/90 transition-all duration-200"
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
              >
                הזמנה
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;