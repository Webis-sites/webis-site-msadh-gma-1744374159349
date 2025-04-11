'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaBirthdayCake, FaTruck, FaWineGlassAlt, FaLeaf, FaUsers } from 'react-icons/fa';
import Image from 'next/image';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageUrl: string;
}

const ServicesSection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services: ServiceCardProps[] = [
    {
      icon: <FaUtensils size={32} />,
      title: 'חוויית אירוח יוקרתית',
      description: 'אווירה מיוחדת ושירות מסור שיהפכו את הארוחה שלכם לחוויה בלתי נשכחת',
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      icon: <FaBirthdayCake size={32} />,
      title: 'אירועים פרטיים',
      description: 'חגיגות ימי הולדת, אירועים משפחתיים ומפגשים עסקיים באווירה מיוחדת',
      imageUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      icon: <FaTruck size={32} />,
      title: 'שירותי קייטרינג',
      description: 'מביאים את הטעמים המיוחדים שלנו לכל אירוע, בכל מקום ובכל היקף',
      imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      icon: <FaWineGlassAlt size={32} />,
      title: 'בר יינות מובחר',
      description: 'מבחר יינות משובחים מהארץ ומהעולם שישלימו את חוויית הארוחה שלכם',
      imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      icon: <FaLeaf size={32} />,
      title: 'תפריט צמחוני ייחודי',
      description: 'מגוון מנות צמחוניות וטבעוניות עשירות בטעמים ובחומרי גלם איכותיים',
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      icon: <FaUsers size={32} />,
      title: 'ערבי קולינריה מיוחדים',
      description: 'סדנאות בישול וערבי טעימות בהנחיית השף שלנו לחוויה קולינרית מעשירה',
      imageUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="services" className="py-16 px-4 md:px-8 bg-gray-50 dir-rtl" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-800"
          >
            השירותים שלנו
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 w-24 bg-[#FF6B6B] mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            במסעדה גמא אנו מציעים מגוון שירותים ייחודיים שיהפכו כל ביקור לחוויה קולינרית בלתי נשכחת
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 h-full"
              style={{
                boxShadow: hoveredCard === index 
                  ? '0 15px 30px rgba(0, 0, 0, 0.1), 0 8px 15px rgba(0, 0, 0, 0.05)' 
                  : '0 5px 15px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-in-out"
                  style={{
                    transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>

              <div className="relative p-6 text-right">
                <div 
                  className="absolute top-0 right-6 -mt-8 w-16 h-16 rounded-full flex items-center justify-center text-white"
                  style={{
                    background: `linear-gradient(135deg, #96CEB4, #96CEB4cc)`,
                    boxShadow: '0 4px 10px rgba(150, 206, 180, 0.5)'
                  }}
                >
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-3 mt-6 text-gray-800">{service.title}</h3>
                
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: hoveredCard === index ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-[#FF6B6B]"
                ></motion.div>
              </div>

              <div 
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{
                  background: `linear-gradient(to right, #96CEB4, #FF6B6B)`,
                  opacity: hoveredCard === index ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }}
              ></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;