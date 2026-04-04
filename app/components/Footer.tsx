'use client';

export default function Footer() {
  const socialLinks = [
    { icon: 'fa-github', href: 'https://github.com/codelikeagirl29' },
    { icon: 'fa-linkedin-in', href: 'http://linkedin.com/in/lindsey-howard' },
    { icon: 'fa-facebook-f', href: 'https://www.facebook.com/lindseyhowardrealestate/' }
  ];

  return (
    <footer className="w-full mt-auto py-8 px-4 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-md mx-auto flex flex-col items-center text-center">
        {/* Social Icons */}
        <div className="flex gap-8 mb-8">
          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-rose-400 transition-all transform hover:scale-110 text-xl"
            >
              <i className={`fa-brands ${link.icon}`}></i>
            </a>
          ))}
        </div>

        {/* Branding & Copyright */}
        <p className="text-[0.625rem] font-black uppercase tracking-[0.4em] text-slate-600 mb-2">
          © 2026 FL Real Estate Master Drill
        </p>
        <div className="h-px w-8 bg-blue-500/30 mb-4"></div>
        <p className="text-[0.69rem] text-slate-500 leading-relaxed max-w-[250px] italic">
          Designed for high-retention learning and Florida State Exam excellence.
        </p>
      </div>
    </footer>
  );
}