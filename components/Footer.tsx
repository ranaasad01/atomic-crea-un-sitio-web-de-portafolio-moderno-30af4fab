"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, Heart } from 'lucide-react';
import { navLinks, BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const socialLinks = [
  { label: "GitHub", href: BRAND.github, icon: Github },
  { label: "LinkedIn", href: BRAND.linkedin, icon: Linkedin },
  { label: "Twitter", href: BRAND.twitter, icon: Twitter },
  { label: "Email", href: `mailto:${BRAND.email}`, icon: Mail },
];

export default function Footer() {
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0f]">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-violet-400 flex items-center justify-center text-white text-xs font-bold shadow-[0_0_16px_rgba(124,58,237,0.3)]">
                {BRAND.initials}
              </span>
              <span className="font-display font-semibold text-slate-200 tracking-tight">
                {BRAND.name}
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              {BRAND.tagline}. Construyendo experiencias digitales con precisión y creatividad.
            </p>
            {/* Social */}
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-violet-400 hover:bg-violet-500/10 border border-white/5 hover:border-violet-500/30 transition-all duration-200"
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Nav links */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Navegación
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-slate-500 hover:text-violet-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Contacto
            </h3>
            <div className="space-y-3">
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-2.5 text-sm text-slate-500 hover:text-violet-400 transition-colors duration-200 group"
              >
                <Mail size={14} className="text-violet-500/60 group-hover:text-violet-400 transition-colors" />
                {BRAND.email}
              </a>
              <p className="text-sm text-slate-600 leading-relaxed">
                Disponible para proyectos freelance y oportunidades de tiempo completo.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-slate-600 flex items-center gap-1.5">
            Hecho con{" "}
            <Heart size={11} className="text-violet-500 fill-violet-500" />{" "}
            por {BRAND.name} &copy; {new Date().getFullYear()}
          </p>
          <p className="text-xs text-slate-700">
            Construido con Next.js, TypeScript y Tailwind CSS
          </p>
        </motion.div>
      </div>
    </footer>
  );
}