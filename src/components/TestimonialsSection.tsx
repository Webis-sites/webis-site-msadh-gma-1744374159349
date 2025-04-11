'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  image: string;
}

const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'דניאל כהן',
      rating: 5,
      comment: 'האוכל במסעדה גמא פשוט מדהים! השירות מהיר ואדיב, והאווירה נעימה ומזמינה. אני ממליץ בחום על המנות המיוחדות של השף.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 2,
      name: 'מיכל לוי',
      rating: 5,
      comment: 'ביקרתי במסעדה גמא עם משפחתי והיה נפלא! המנות טעימות, המחירים הוגנים והצוות מקצועי ואדיב. בהחלט נחזור בקרוב!',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 3,
      name: 'יוסי אברהם',
      rating: 4,
      comment: 'חוויה קולינרית מעולה! האוכל טרי וטעים, והאווירה מושלמת לארוחה רומנטית. ממליץ במיוחד על מנות הדגל של המסעדה.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 4,
      name: 'רונית שרון',
      rating: 5,
      comment: 'מסעדה גמא היא פנינה אמיתית! השילוב של טעמים, שירות מצוין ואווירה נעימה הופך כל ביקור לחוויה מיוחדת. מומלץ בחום!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };

  const [visibleItems, setVisibleItems] = useState(itemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(itemsPerPage());
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextTestimonial();
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, currentIndex, visibleItems]);

  const maxIndex = testimonials.length - visibleItems;

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      nextTestimonial();
    } else if (e.key === 'ArrowRight') {
      prevTestimonial();
    }
  };

  const pauseAutoplay = () => {
    setAutoplay(false);
  };

  const resumeAutoplay = () => {
    setAutoplay(true);
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + visibleItems);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FaStar
        key={index}
        className={`inline-block ${
          index < rating ? 'text-[#FF6B6B]' : 'text-gray-300'
        }`}
        aria-hidden="true"
      />
    ));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <section
      id="testimonials-section"
      dir="rtl"
      className="py-16 px-4 md:px-8 bg-gradient-to-br from-[#f8fdfb] to-[#e6f5ef] relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Glassmorphism Background Elements */}
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-[#96CEB4]/20 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 rounded-full bg-[#FF6B6B]/10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
          >
            מה הלקוחות שלנו אומרים
          </h2>
          <div className="w-24 h-1 bg-[#FF6B6B] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            הלקוחות שלנו נהנים מחוויה קולינרית מיוחדת במסעדה גמא. הנה כמה מהחוויות שהם שיתפו איתנו.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
          onFocus={pauseAutoplay}
          onBlur={resumeAutoplay}
          ref={containerRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-roledescription="carousel"
          aria-label="חוות דעת של לקוחות"
        >
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {visibleTestimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/20 transition-all duration-300 hover:shadow-[0_10px_40px_rgb(0,0,0,0.1)] hover:translate-y-[-5px]"
                    style={{
                      boxShadow: "8px 8px 16px rgba(150, 206, 180, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.7)"
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#96CEB4] mr-0 ml-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-right">
                        <h3 className="font-bold text-lg text-gray-800">{testimonial.name}</h3>
                        <div className="mt-1" aria-label={`דירוג ${testimonial.rating} מתוך 5 כוכבים`}>
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-right leading-relaxed">"{testimonial.comment}"</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white text-[#96CEB4] hover:bg-[#96CEB4] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#96CEB4] focus:ring-offset-2"
              aria-label="הקודם"
              style={{
                boxShadow: "4px 4px 10px rgba(150, 206, 180, 0.15), -4px -4px 10px rgba(255, 255, 255, 0.8)"
              }}
            >
              <FaChevronRight className="text-lg" />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#96CEB4] focus:ring-offset-2 ${
                    currentIndex === index
                      ? 'bg-[#FF6B6B] w-8'
                      : 'bg-[#96CEB4]/30 hover:bg-[#96CEB4]/50'
                  }`}
                  aria-label={`עבור לחוות דעת ${index + 1}`}
                  aria-current={currentIndex === index ? 'true' : 'false'}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white text-[#96CEB4] hover:bg-[#96CEB4] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#96CEB4] focus:ring-offset-2"
              aria-label="הבא"
              style={{
                boxShadow: "4px 4px 10px rgba(150, 206, 180, 0.15), -4px -4px 10px rgba(255, 255, 255, 0.8)"
              }}
            >
              <FaChevronLeft className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;