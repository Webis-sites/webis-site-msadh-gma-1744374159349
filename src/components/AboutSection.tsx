'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaUtensils, FaAward, FaUsers } from 'react-icons/fa';
import Image from 'next/image';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 rounded-xl shadow-neumorphic border border-white border-opacity-20 text-right"
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-row-reverse items-start gap-4">
        <div className="bg-secondary p-3 rounded-full text-white">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const AboutSection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section 
      id="about-section" 
      dir="rtl" 
      className="py-16 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%)`,
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-secondary bg-opacity-10 blur-3xl"></div>
        <div className="absolute bottom-12 -left-12 w-48 h-48 rounded-full bg-secondary bg-opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              אודות <span className="text-secondary">מסעדה גמא</span>
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              אנחנו מסעדה מוביל בתחום המזון עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="order-2 md:order-1">
              <div className="space-y-6">
                <FeatureCard
                  icon={<FaUtensils size={24} />}
                  title="מומחיות קולינרית"
                  description="השפים שלנו מביאים ניסיון של שנים רבות ביצירת מנות ייחודיות המשלבות טעמים מסורתיים וחדשניים."
                />
                <FeatureCard
                  icon={<FaAward size={24} />}
                  title="איכות ללא פשרות"
                  description="אנו בוחרים רק את חומרי הגלם הטריים והאיכותיים ביותר כדי להבטיח חוויה קולינרית מושלמת."
                />
                <FeatureCard
                  icon={<FaUsers size={24} />}
                  title="שירות מקצועי"
                  description="הצוות שלנו מחויב להעניק לכם את השירות הטוב ביותר ולהפוך כל ביקור לחוויה בלתי נשכחת."
                />
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              className="order-1 md:order-2 relative"
            >
              <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-neumorphic">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                  alt="מסעדה גמא - חוויה קולינרית"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-0 right-0 p-6 z-20">
                  <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md p-4 rounded-xl border border-white border-opacity-20">
                    <p className="text-white text-lg font-semibold">שנים של מצוינות קולינרית</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            variants={itemVariants}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 rounded-xl shadow-neumorphic border border-white border-opacity-20 text-center">
              <h3 className="text-4xl font-bold text-secondary mb-2">15+</h3>
              <p className="text-gray-700">שנות ניסיון</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 rounded-xl shadow-neumorphic border border-white border-opacity-20 text-center">
              <h3 className="text-4xl font-bold text-secondary mb-2">50+</h3>
              <p className="text-gray-700">מנות ייחודיות</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 rounded-xl shadow-neumorphic border border-white border-opacity-20 text-center">
              <h3 className="text-4xl font-bold text-secondary mb-2">10K+</h3>
              <p className="text-gray-700">לקוחות מרוצים</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-20 text-center">
            <motion.button
              className="bg-secondary text-white px-8 py-3 rounded-full font-semibold shadow-neumorphic hover:shadow-neumorphic-hover transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              הזמינו שולחן עכשיו
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;