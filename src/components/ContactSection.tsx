'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  
  const onSubmit = (data: FormData) => {
    console.log(data);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 3000);
  };

  return (
    <section id="contact" className="py-16 bg-gray-50 dir-rtl" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">צור קשר</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            אנחנו תמיד שמחים לשמוע מכם. השאירו פרטים ונחזור אליכם בהקדם
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-[5px_5px_15px_#d1d9e6,-5px_-5px_15px_#ffffff] text-right">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">השאירו פרטים</h3>
            
            <AnimatePresence>
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#96CEB4]/20 backdrop-blur-sm border border-[#96CEB4] rounded-lg p-6 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-16 h-16 bg-[#96CEB4] rounded-full flex items-center justify-center"
                    >
                      <FaCheck className="text-white text-2xl" />
                    </motion.div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">תודה על פנייתך!</h4>
                  <p className="text-gray-600">נחזור אליך בהקדם האפשרי.</p>
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">שם מלא</label>
                    <input
                      id="name"
                      type="text"
                      className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#96CEB4] text-right`}
                      {...register("name", { required: "שדה חובה" })}
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">טלפון</label>
                    <input
                      id="phone"
                      type="tel"
                      className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#96CEB4] text-right`}
                      {...register("phone", { 
                        required: "שדה חובה", 
                        pattern: {
                          value: /^[0-9]{9,10}$/,
                          message: "מספר טלפון לא תקין"
                        }
                      })}
                      aria-invalid={errors.phone ? "true" : "false"}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-red-500 text-sm">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">דוא"ל</label>
                    <input
                      id="email"
                      type="email"
                      className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#96CEB4] text-right`}
                      {...register("email", { 
                        required: "שדה חובה", 
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "כתובת דוא\"ל לא תקינה"
                        }
                      })}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">הודעה</label>
                    <textarea
                      id="message"
                      rows={4}
                      className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#96CEB4] text-right`}
                      {...register("message", { required: "שדה חובה" })}
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    ></textarea>
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-red-500 text-sm">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="w-full py-3 px-6 bg-[#FF6B6B] text-white font-bold rounded-lg shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] hover:bg-[#ff5252] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    שלח הודעה
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
          
          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-[5px_5px_15px_#d1d9e6,-5px_-5px_15px_#ffffff] border border-white/40 text-right">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">פרטי התקשרות</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-end gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">טלפון</h4>
                    <a href="tel:+972-3-1234567" className="text-gray-600 hover:text-[#FF6B6B] transition-colors">03-1234567</a>
                  </div>
                  <div className="w-12 h-12 bg-[#96CEB4]/10 rounded-full flex items-center justify-center text-[#96CEB4]">
                    <FaPhone />
                  </div>
                </div>
                
                <div className="flex items-center justify-end gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">דוא"ל</h4>
                    <a href="mailto:info@gamma-restaurant.co.il" className="text-gray-600 hover:text-[#FF6B6B] transition-colors">info@gamma-restaurant.co.il</a>
                  </div>
                  <div className="w-12 h-12 bg-[#96CEB4]/10 rounded-full flex items-center justify-center text-[#96CEB4]">
                    <FaEnvelope />
                  </div>
                </div>
                
                <div className="flex items-center justify-end gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">כתובת</h4>
                    <p className="text-gray-600">רחוב דיזנגוף 123, תל אביב</p>
                  </div>
                  <div className="w-12 h-12 bg-[#96CEB4]/10 rounded-full flex items-center justify-center text-[#96CEB4]">
                    <FaMapMarkerAlt />
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">שעות פעילות</h4>
                <div className="space-y-2 text-gray-600">
                  <p>ראשון - חמישי: 12:00 - 23:00</p>
                  <p>שישי: 12:00 - 16:00</p>
                  <p>שבת: סגור</p>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="bg-white rounded-xl p-2 shadow-[5px_5px_15px_#d1d9e6,-5px_-5px_15px_#ffffff] h-[300px] overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.5775562582507!2d34.77541491520177!3d32.08004742746456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b82a6148a07%3A0x9f5e6e5e6f8b38a0!2z15PXmdeb16DXkteV15kg124sINeq15wg15DXkdeZ15E!5e0!3m2!1siw!2sil!4v1652345678901!5m2!1siw!2sil" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '0.75rem' }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="מיקום המסעדה"
                aria-label="מפת גוגל המציגה את מיקום המסעדה"
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Restaurant Image */}
        <div className="mt-16">
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-[5px_5px_15px_#d1d9e6,-5px_-5px_15px_#ffffff]">
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" 
              alt="מסעדה גמא - חלל המסעדה" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 md:p-8 text-white text-right">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">מסעדה גמא</h3>
                <p className="text-lg opacity-90">חוויה קולינרית בלתי נשכחת</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;