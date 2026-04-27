'use client';

import { Github, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    {
      icon: <Github size={20} />,
      href: 'https://github.com/codelikeagirl29',
      hoverClass: 'hover:text-white'
    },
    {
      icon: <Linkedin size={20} />,
      href: 'http://linkedin.com/in/lindsey-howard',
      hoverClass: 'hover:text-[#0077b5]'
    },
    {
      icon: <Facebook size={20} />,
      href: 'https://www.facebook.com/lindseyhowardrealestate/',
      hoverClass: 'hover:text-[#1877f2]'
    }
  ];

  return (
    <footer className="w-full mt-auto py-10 px-4 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-md mx-auto flex flex-col items-center text-center">

        {/* Social Icons - Swapped to Lucide */}
        <div className="flex gap-8 mb-8">
          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-slate-500 transition-all transform hover:scale-125 ${link.hoverClass}`}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Branding & Copyright */}
        <p className="text-[0.625rem] font-black uppercase tracking-[0.4em] text-slate-600 mb-4">
          © 2026 FL Real Estate Master Drill
        </p>

        {/* FIXED & UPGRADED DIVIDER */}
        {/* We use a gradient and a shadow without spaces to create that "Neon" look */}
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-6 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>

        <p className="text-[0.69rem] text-slate-500 font-medium leading-relaxed max-w-[280px] italic">
          Designed for high-retention learning and <span className="text-slate-400 not-italic font-bold">Florida State Exam</span> excellence.
        </p>
      </div>
    </footer>
  );
}