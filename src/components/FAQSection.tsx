'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'מה שעות הפעילות של המסעדה?',
      answer: 'אנו פתוחים בימים א׳-ה׳ בין השעות 12:00-23:00, בימי שישי בין 12:00-16:00, ובמוצאי שבת משעה 19:00 עד 23:00. בשבתות המסעדה סגורה.'
    },
    {
      id: 'faq-2',
      question: 'האם ניתן להזמין מקום מראש?',
      answer: 'בהחלט! אנו ממליצים להזמין מקום מראש, במיוחד בסופי שבוע ובערבים. ניתן להזמין דרך האתר שלנו או בטלפון 03-1234567.'
    },
    {
      id: 'faq-3',
      question: 'האם יש אפשרויות לתזונה מיוחדת (טבעוני, צמחוני, ללא גלוטן)?',
      answer: 'כן, התפריט שלנו כולל מגוון אפשרויות לתזונה מיוחדת. יש לנו מנות טבעוניות, צמחוניות ומנות ללא גלוטן. נא לציין את הדרישות התזונתיות שלכם בעת ההזמנה ונשמח להתאים את המנות בהתאם.'
    },
    {
      id: 'faq-4',
      question: 'האם יש חניה זמינה ליד המסעדה?',
      answer: 'יש חניון ציבורי במרחק של 100 מטר מהמסעדה. בנוסף, בשעות הערב ניתן לחנות ברחובות הסמוכים ללא תשלום (אחרי השעה 19:00).'
    },
    {
      id: 'faq-5',
      question: 'האם המסעדה נגישה לבעלי מוגבלויות?',
      answer: 'כן, המסעדה שלנו נגישה לבעלי מוגבלויות. יש לנו רמפה בכניסה, שירותים מותאמים, ותפריטים בכתב ברייל. צוות המסעדה ישמח לסייע בכל צורך נוסף.'
    },
    {
      id: 'faq-6',
      question: 'האם ניתן להזמין את המסעדה לאירועים פרטיים?',
      answer: 'בהחלט! ניתן להזמין את המסעדה לאירועים פרטיים כמו ימי הולדת, אירועי חברה, או חגיגות משפחתיות. אנא צרו קשר עם מנהל האירועים שלנו בטלפון 03-1234568 לפרטים נוספים ותיאום.'
    },
    {
      id: 'faq-7',
      question: 'האם יש תפריט ילדים?',
      answer: 'כן, יש לנו תפריט מיוחד לילדים הכולל מנות אהובות כמו פסטה, שניצל, פיצה אישית ועוד. כל מנת ילדים מגיעה עם שתייה ומנת קינוח קטנה.'
    }
  ];

  const toggleAccordion = (id: string) => {
    setActiveIndex(activeIndex === id ? null : id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleAccordion(id);
    }
  };

  return (
    <section 
      id="faq-section" 
      dir="rtl" 
      className="w-full max-w-4xl mx-auto px-4 py-12 font-sans"
    >
      <div className="relative overflow-hidden rounded-2xl p-8 mb-10 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md border border-white/20 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-[#96CEB4]/30 to-[#FF6B6B]/20 -z-10"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#96CEB4]/30 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-[#FF6B6B]/30 blur-3xl"></div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-right mb-4 text-gray-800">
          שאלות נפוצות
        </h2>
        
        <p className="text-right text-gray-700 mb-6">
          כאן תוכלו למצוא תשובות לשאלות הנפוצות ביותר על מסעדה גמא. אם לא מצאתם את התשובה לשאלתכם, אל תהססו ליצור איתנו קשר ישירות.
        </p>
        
        <div className="relative z-10">
          <img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
            alt="מסעדה גמא - אווירה" 
            className="w-full h-48 object-cover rounded-xl shadow-md mb-6"
          />
        </div>
      </div>

      <div className="space-y-4">
        {faqItems.map((item) => (
          <div 
            key={item.id}
            className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.07)] border border-white/50 hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-shadow duration-300"
          >
            <button
              id={item.id}
              aria-expanded={activeIndex === item.id}
              aria-controls={`${item.id}-content`}
              className="w-full text-right p-5 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B6B] focus-visible:ring-opacity-75"
              onClick={() => toggleAccordion(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
            >
              <span className="font-medium text-lg text-gray-800">{item.question}</span>
              <motion.div
                animate={{ rotate: activeIndex === item.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#96CEB4]/20 text-[#FF6B6B]"
              >
                <IoIosArrowDown />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {activeIndex === item.id && (
                <motion.div
                  id={`${item.id}-content`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 border-t border-gray-100">
                    <p className="text-gray-700 text-right">{item.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.07)] border border-white/50 text-right">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">עדיין יש לכם שאלות?</h3>
        <p className="text-gray-700 mb-4">
          אנחנו כאן כדי לעזור! צרו איתנו קשר באחת מהדרכים הבאות:
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-end">
          <a 
            href="tel:03-1234567" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#96CEB4] text-white rounded-lg shadow-[0_4px_10px_rgba(150,206,180,0.3)] hover:shadow-[0_6px_15px_rgba(150,206,180,0.4)] transition-all duration-300 text-center"
          >
            התקשרו אלינו
          </a>
          <a 
            href="mailto:info@gamma-restaurant.co.il" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#FF6B6B] border border-[#FF6B6B]/30 rounded-lg shadow-[0_4px_10px_rgba(255,107,107,0.1)] hover:shadow-[0_6px_15px_rgba(255,107,107,0.2)] transition-all duration-300 text-center"
          >
            שלחו לנו מייל
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;