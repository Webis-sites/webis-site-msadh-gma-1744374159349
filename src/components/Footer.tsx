import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTripadvisor } from 'react-icons/fa';

interface SocialLink {
  id: string;
  icon: React.ReactNode;
  href: string;
  ariaLabel: string;
}

interface NavLink {
  id: string;
  text: string;
  href: string;
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const navLinks: NavLink[] = [
    { id: 'home', text: 'דף הבית', href: '/' },
    { id: 'about', text: 'אודות', href: '/about' },
    { id: 'services', text: 'שירותים', href: '/services' },
    { id: 'contact', text: 'צור קשר', href: '/contact' },
  ];
  
  const socialLinks: SocialLink[] = [
    { 
      id: 'facebook', 
      icon: <FaFacebook className="w-6 h-6" />, 
      href: 'https://facebook.com', 
      ariaLabel: 'עמוד הפייסבוק שלנו'
    },
    { 
      id: 'instagram', 
      icon: <FaInstagram className="w-6 h-6" />, 
      href: 'https://instagram.com', 
      ariaLabel: 'עמוד האינסטגרם שלנו'
    },
    { 
      id: 'tripadvisor', 
      icon: <FaTripadvisor className="w-6 h-6" />, 
      href: 'https://tripadvisor.com', 
      ariaLabel: 'עמוד הטריפאדוויזור שלנו'
    },
  ];

  return (
    <footer 
      id="footer" 
      dir="rtl" 
      className="w-full bg-[#96CEB4] text-white"
      aria-label="אזור כותרת תחתונה"
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo and About Section */}
          <div className="text-right">
            <div className="flex justify-end items-center mb-4">
              <div className="relative w-16 h-16 overflow-hidden rounded-full 
                shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.2)]
                bg-white/10 backdrop-blur-sm border border-white/20">
                <Image
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                  alt="לוגו מסעדה גמא"
                  fill
                  sizes="(max-width: 768px) 100vw, 64px"
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mr-3">מסעדה גמא</h2>
            </div>
            <p className="mb-4 text-white/90">
              אנחנו מסעדה מוביל בתחום המזון עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
            </p>
          </div>
          
          {/* Navigation Links */}
          <div className="text-right">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-[#FF6B6B] pb-2 inline-block">
              ניווט מהיר
            </h3>
            <nav aria-label="ניווט כותרת תחתונה">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <Link 
                      href={link.href}
                      className="inline-block transition-transform duration-300 hover:translate-x-[-5px] 
                        hover:text-[#FF6B6B] relative after:content-[''] after:absolute after:w-0 
                        after:h-0.5 after:bg-[#FF6B6B] after:right-0 after:bottom-0 
                        after:transition-all hover:after:w-full"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Contact and Social */}
          <div className="text-right">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-[#FF6B6B] pb-2 inline-block">
              צור קשר
            </h3>
            <address className="not-italic mb-4">
              <p className="mb-2">רחוב הראשי 123, תל אביב</p>
              <p className="mb-2">טלפון: 03-1234567</p>
              <p className="mb-2">דוא"ל: info@gamma-restaurant.co.il</p>
            </address>
            
            <div className="mt-6">
              <h4 className="font-bold mb-2">עקבו אחרינו</h4>
              <div className="flex justify-end space-x-4 space-x-reverse">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20
                      shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.1)]
                      hover:bg-[#FF6B6B] hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1),inset_-3px_-3px_6px_rgba(255,255,255,0.1)]
                      transition-all duration-300 transform hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="py-4 bg-[#85b9a3] text-center text-white/90">
        <div className="container mx-auto px-4">
          <p>
            © {currentYear} מסעדה גמא. כל הזכויות שמורות.
          </p>
        </div>
      </div>
      
      {/* Decorative Wave */}
      <div className="h-6 bg-[#85b9a3] relative overflow-hidden">
        <div className="absolute inset-0 bg-[#96CEB4]" style={{
          clipPath: 'polygon(100% 0, 0 0, 0 100%)',
          height: '100%',
          width: '100%'
        }}></div>
      </div>
    </footer>
  );
};

export default Footer;