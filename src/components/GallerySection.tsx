'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoExpand } from 'react-icons/io5';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = galleryImages.length;
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (lightboxRef.current && !lightboxRef.current.contains(event.target as Node)) {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedImage]);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const loadingProgress = Math.round((imagesLoaded / totalImages) * 100);

  return (
    <section id="gallery" className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 relative overflow-hidden" dir="rtl">
      {/* Glassmorphism background elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-secondary/20 to-primary/30 blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-right mb-12">
          <motion.h2 
            className="text-4xl font-bold mb-4 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            הגלריה שלנו
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mr-auto ml-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            צפו בתמונות המציגות את החוויה הקולינרית במסעדה גמא. האווירה, המנות המיוחדות והרגעים הקסומים שיוצרים חוויה שלא תישכח.
          </motion.p>
        </div>

        {/* Loading progress */}
        {imagesLoaded < totalImages && (
          <motion.div 
            className="w-full h-2 bg-gray-200 rounded-full mb-8 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        )}

        {/* Gallery grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: imagesLoaded === totalImages ? 1 : 0.5 }}
          transition={{ duration: 0.5 }}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="relative group h-[300px] md:h-[350px] rounded-xl overflow-hidden neumorphic-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-10"></div>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                onLoad={handleImageLoad}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <button
                  onClick={() => openLightbox(image)}
                  className="glassmorphism-button p-3 rounded-full text-white bg-black/30 backdrop-blur-md hover:bg-black/50 transition-all duration-300"
                  aria-label="הגדל תמונה"
                >
                  <IoExpand size={24} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              ref={lightboxRef}
              className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className="relative w-full h-[80vh]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              <button
                onClick={closeLightbox}
                className="absolute top-4 left-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-300"
                aria-label="סגור"
              >
                <IoClose size={24} />
              </button>
              <div className="absolute bottom-0 right-0 left-0 bg-black/70 text-white p-4 text-right">
                <p className="text-lg">{selectedImage.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Gallery images data
const galleryImages: GalleryImage[] = [
  {
    id: 'img1',
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    alt: 'מנה מיוחדת של השף - סלמון צרוב עם ירקות עונתיים',
    width: 1074,
    height: 1000
  },
  {
    id: 'img2',
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    alt: 'אווירה חמה ומזמינה במסעדה בשעות הערב',
    width: 1170,
    height: 780
  },
  {
    id: 'img3',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    alt: 'חלל המסעדה המעוצב בסגנון מודרני ומזמין',
    width: 1170,
    height: 780
  },
  {
    id: 'img4',
    src: 'https://images.unsplash.com/photo-1564759298141-cfd3e83bd4a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    alt: 'קינוח מיוחד של השף - פבלובה עם פירות טריים',
    width: 1170,
    height: 780
  },
  {
    id: 'img5',
    src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    alt: 'מבחר יינות מובחרים מהארץ ומהעולם',
    width: 1074,
    height: 1000
  },
  {
    id: 'img6',
    src: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    alt: 'מנת פתיחה - קרפצ׳יו בקר עם רוטב טרטר ביתי',
    width: 1170,
    height: 780
  },
  {
    id: 'img7',
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    alt: 'הטרסה החיצונית של המסעדה בשעות הערב',
    width: 1074,
    height: 1000
  },
  {
    id: 'img8',
    src: 'https://images.unsplash.com/photo-1560611588-163f49a6cdd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    alt: 'מנת דגל - ריזוטו פטריות עם כמהין',
    width: 1170,
    height: 780
  }
];

export default Gallery;