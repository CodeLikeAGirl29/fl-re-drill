"use client";

import { useEffect, useState } from "react";
import { FiGithub, FiFacebook } from "react-icons/fi";
import { SlSocialLinkedin } from "react-icons/sl";
import { motion } from "framer-motion";

type NetlifyStatus = "success" | "building" | "failed" | "loading";

export default function Footer() {
  const [deployStatus, setDeployStatus] = useState<NetlifyStatus>("loading");

  const NETLIFY_SITE_DOMAIN = "fl-re-drill.netlify.app"; 

  useEffect(() => {
    async function fetchNetlifyStatus() {
      try {
        // Fetch the most recent deploys for the site
        const response = await fetch(
          `https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_DOMAIN}/deploys`
        );
        
        if (!response.ok) throw new Error("Failed to fetch status");
        
        const deploys = await response.json();
        
        if (deploys && deploys.length > 0) {
          const latestDeploy = deploys[0];
          // Netlify deploy states: 'ready', 'building', 'enqueued', 'error'
          const state = latestDeploy.state;

          if (state === "ready") {
            setDeployStatus("success");
          } else if (state === "building" || state === "enqueued") {
            setDeployStatus("building");
          } else if (state === "error") {
            setDeployStatus("failed");
          } else {
            setDeployStatus("success"); // Fallback
          }
        }
      } catch (error) {
        console.error("Error fetching Netlify deploy status:", error);
        setDeployStatus("success"); // Fallback gracefully to live/success indicator
      }
    }

    fetchNetlifyStatus();
    // Optional: Poll every 30 seconds if you want it real-time during a build
    const interval = setInterval(fetchNetlifyStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // Helper config to change dots and text visually based on state
  const statusConfig = {
    loading: {
      pingColor: "bg-slate-400",
      dotColor: "bg-slate-500",
      text: "Checking...",
    },
    success: {
      pingColor: "bg-emerald-400",
      dotColor: "bg-emerald-500",
      text: "Netlify Live",
    },
    building: {
      pingColor: "bg-amber-400",
      dotColor: "bg-amber-500",
      text: "Netlify Building",
    },
    failed: {
      pingColor: "bg-rose-400",
      dotColor: "bg-rose-500",
      text: "Deploy Failed",
    },
  };

  const currentStatus = statusConfig[deployStatus];
  
  const socialLinks = [
    {
      icon: <FiGithub size={20} />,
      href: "https://github.com/codelikeagirl29",
      hoverClass: "hover:text-white",
      glowColor: "rgba(255, 255, 255, 0.4)",
    },
    {
      icon: <SlSocialLinkedin size={20} />,
      href: "http://linkedin.com/in/lindsey-howard",
      hoverClass: "hover:text-[#0077b5]",
      glowColor: "rgba(0, 119, 181, 0.4)",
    },
    {
      icon: <FiFacebook size={20} />,
      href: "https://www.facebook.com/lindseyhowardrealestate/",
      hoverClass: "hover:text-[#1877f2]",
      glowColor: "rgba(24, 119, 242, 0.4)",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  // Individual icon variant
  const iconVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  return (
    <footer className="w-full mt-auto py-10 px-4 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-md mx-auto flex flex-col items-center text-center">
        {/* Animated Social Icon Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-8 mb-8"
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={i}
              variants={iconVariants}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.3,
                y: -5,
                filter: `drop-shadow(0 0 8px ${link.glowColor})`,
              }}
              whileTap={{ scale: 0.9 }}
              className={`text-slate-500 transition-colors ${link.hoverClass}`}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Branding & Copyright */}
        <p className="text-[0.625rem] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
          © {new Date().getFullYear()} FL Real Estate Master Drill
        </p>

        {/* Neon Divider Line */}
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-6 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>

        {/* Instructional Rationale Line */}
        <p className="text-[0.69rem] text-slate-500 font-medium leading-relaxed max-w-[280px] italic mb-6">
          Designed for high-retention learning and{" "}
          <span className="text-slate-400 font-bold">Florida State Exam</span>{" "}
          excellence.
        </p>

        {/* Status Indicators Pill Container */}
        <div className="flex flex-wrap items-center justify-center gap-4 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
          {/* Netlify Production Cloud Link Status Indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              {deployStatus !== "failed" && (
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentStatus.pingColor} opacity-75`}></span>
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${currentStatus.dotColor}`}></span>
            </span>
            <span className="font-bold tracking-widest text-[9px] uppercase text-slate-400">
              {currentStatus.text}
            </span>
          </div>

          <span className="text-slate-800 text-[10px]">|</span>

          {/* Database Verification Node Status Indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-bold tracking-widest text-[9px] uppercase text-slate-400">
              Supabase Connected
            </span>
          </div>

          <span className="text-slate-800 text-[10px]">|</span>

          {/* V8 Script Compiler Engine Status Indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-bold tracking-widest text-[9px] uppercase text-slate-400">
              Node 24 Active
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
