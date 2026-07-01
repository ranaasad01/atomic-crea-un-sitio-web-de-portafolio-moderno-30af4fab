"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, ArrowRight, ExternalLink, Star, CheckCircle, Code, Layout, Terminal, Sparkles, ArrowUp, Download, Eye } from 'lucide-react';
import { BRAND } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  staggerContainerFast,
  cardHover,
} from "@/lib/motion";

// ─── Inline data ─────────────────────────────────────────────────────────────

const featuredProjects = [
  {
    id: "p1",
    title: "Fintrack Dashboard",
    description:
      "Plataforma de análisis financiero en tiempo real con visualizaciones interactivas, alertas personalizadas y exportación de reportes en PDF.",
    tags: ["Next.js", "TypeScript", "Recharts", "Supabase"],
    image: "https://framerusercontent.com/images/jjWu4pxMf8DRk63cOQg8uwLk8.png?scale-down-to=2048",
    liveUrl: "https://fintrack.demo",
    repoUrl: "https://github.com/alexmoreno/fintrack",
    featured: true,
  },
  {
    id: "p2",
    title: "Orbit CMS",
    description:
      "Sistema de gestión de contenido headless con editor visual drag-and-drop, soporte multilenguaje y API REST/GraphQL.",
    tags: ["React", "Node.js", "PostgreSQL", "GraphQL"],
    image: "https://serviceportal.io/wp-content/uploads/2021/12/orbit.jpg",
    liveUrl: "https://orbit-cms.demo",
    repoUrl: "https://github.com/alexmoreno/orbit-cms",
    featured: true,
  },
  {
    id: "p3",
    title: "Pulse E-commerce",
    description:
      "Tienda online de alto rendimiento con carrito persistente, pagos con Stripe, panel de administración y SEO optimizado.",
    tags: ["Next.js", "Stripe", "Prisma", "Tailwind"],
    image: "https://www.macrohype.com/wp-content/uploads/2025/07/Pulse-E-Commerce-Summit-2025.jpg",
    liveUrl: "https://pulse-shop.demo",
    repoUrl: "https://github.com/alexmoreno/pulse",
    featured: true,
  },
];

const skills = [
  { name: "React / Next.js", level: 95, category: "frontend" as const },
  { name: "TypeScript", level: 92, category: "frontend" as const },
  { name: "Tailwind CSS", level: 90, category: "frontend" as const },
  { name: "Node.js", level: 85, category: "backend" as const },
  { name: "PostgreSQL", level: 80, category: "backend" as const },
  { name: "GraphQL", level: 78, category: "backend" as const },
  { name: "Docker", level: 75, category: "tools" as const },
  { name: "Figma", level: 72, category: "design" as const },
];

const experiences = [
  {
    id: "e1",
    role: "Senior Full Stack Developer",
    company: "Vercel",
    period: "2022 — Presente",
    description:
      "Lideré el desarrollo de herramientas internas de monitoreo y optimización de despliegues. Reduje el tiempo de build en un 40% mediante caché inteligente y paralelización.",
    tags: ["Next.js", "Go", "Redis", "Kubernetes"],
  },
  {
    id: "e2",
    role: "Full Stack Developer",
    company: "Stripe",
    period: "2020 — 2022",
    description:
      "Desarrollé componentes del dashboard de pagos y mejoré la experiencia de integración para desarrolladores. Implementé el nuevo sistema de webhooks con reintentos automáticos.",
    tags: ["React", "Ruby on Rails", "PostgreSQL", "Kafka"],
  },
  {
    id: "e3",
    role: "Frontend Developer",
    company: "Notion",
    period: "2018 — 2020",
    description:
      "Construí el editor de bloques colaborativo en tiempo real y el sistema de permisos granulares. Mejoré el rendimiento de renderizado en un 60% con virtualización.",
    tags: ["React", "TypeScript", "WebSockets", "Yjs"],
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Sara Gómez",
    role: "CTO en Fintech Startup",
    avatar: "https://media.newyorker.com/photos/679be601db7c916baaf2a297/master/w_2560%2Cc_limit/Brody-Sara-Gomez-1.jpg",
    text: "Alex transformó nuestra idea en un producto real en tiempo récord. Su atención al detalle y capacidad para resolver problemas complejos es excepcional.",
    stars: 5,
  },
  {
    id: "t2",
    name: "Carlos Ruiz",
    role: "Product Manager en SaaS",
    avatar: "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/434563/headshot/67/current",
    text: "Trabajar con Alex fue una experiencia increíble. Entregó código limpio, bien documentado y con una UX que superó todas nuestras expectativas.",
    stars: 5,
  },
  {
    id: "t3",
    name: "Marta Iglesias",
    role: "CEO en Agencia Digital",
    avatar: "https://photos.psychologytoday.com/fb9cb4ae-9455-4e8c-b313-ab4ce5547447/1/320x400.jpeg",
    text: "Contratamos a Alex para rediseñar nuestra plataforma y los resultados fueron espectaculares. Nuestras conversiones aumentaron un 35% en el primer mes.",
    stars: 5,
  },
];

const stats = [
  { value: "6+", label: "Años de experiencia" },
  { value: "40+", label: "Proyectos entregados" },
  { value: "15+", label: "Clientes satisfechos" },
  { value: "99%", label: "Tasa de satisfacción" },
];

const services = [
  {
    icon: Layout,
    title: "Desarrollo Frontend",
    description:
      "Interfaces modernas, accesibles y de alto rendimiento con React, Next.js y Tailwind CSS. Animaciones fluidas y experiencias de usuario memorables.",
  },
  {
    icon: Terminal,
    title: "Desarrollo Backend",
    description:
      "APIs robustas y escalables con Node.js, bases de datos relacionales y no relacionales, autenticación segura y arquitecturas cloud-native.",
  },
  {
    icon: Code,
    title: "Full Stack & Consultoría",
    description:
      "Soluciones completas de extremo a extremo. Auditorías de código, optimización de rendimiento y arquitectura de sistemas para equipos en crecimiento.",
  },
];

// ─── Category color map ───────────────────────────────────────────────────────
const categoryColor: Record<string, string> = {
  frontend: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  backend: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  tools: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  design: "bg-pink-500/20 text-pink-300 border-pink-500/30",
};

// ─── Reusable pill ────────────────────────────────────────────────────────────
function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 text-slate-400 border border-white/10">
      {label}
    </span>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase text-violet-400 bg-violet-500/10 border border-violet-500/20">
      <Sparkles size={10} />
      {children}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>("all");
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const filteredSkills =
    activeSkillCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeSkillCategory);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const motionProps = (variants: Variants) =>
    shouldReduceMotion
      ? {}
      : { variants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } };

  return (
    <main className="bg-[#0a0a0f] text-slate-100 overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-16"
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-violet-800/8 rounded-full blur-[80px]" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel>Disponible para proyectos</SectionLabel>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-balance leading-[1.05]"
            >
              Hola, soy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-600">
                Alex Moreno
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-400 leading-relaxed max-w-lg text-pretty"
            >
              Desarrollador Full Stack con más de 6 años construyendo productos
              digitales de alto impacto. Especializado en React, Next.js y
              arquitecturas escalables que combinan rendimiento con una
              experiencia de usuario excepcional.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_0_24px_rgba(124,58,237,0.35)] hover:shadow-[0_0_36px_rgba(124,58,237,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              >
                Ver proyectos
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a
                href={BRAND.cvUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-200 font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              >
                <Download size={16} />
                Descargar CV
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={staggerContainerFast}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/5"
                >
                  <div className="text-2xl font-bold text-violet-400 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — avatar + floating badges */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="relative flex justify-center md:justify-end"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600/30 to-violet-900/10 blur-2xl scale-110" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-violet-500/30 shadow-[0_0_60px_rgba(124,58,237,0.25)]">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D03AQHCZzVdQfPbgQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1666300198615?e=2147483647&v=beta&t=rilq_2YLZfSt0xG0OuP36iGt507DU3_2cDe2t07I0pI"
                  alt="Alex Moreno — Desarrollador Full Stack"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge 1 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-[#13131a] border border-white/10 rounded-2xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-slate-300">Disponible</span>
              </motion.div>
              {/* Floating badge 2 */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-[#13131a] border border-white/10 rounded-2xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center gap-2"
              >
                <Code size={14} className="text-violet-400" />
                <span className="text-xs font-medium text-slate-300">Full Stack Dev</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-violet-500/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              {...motionProps(fadeInLeft)}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto md:mx-0 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_64px_-16px_rgba(0,0,0,0.5)]">
                <img
                  src="https://i.ytimg.com/vi/VWDDVup9ITQ/maxresdefault.jpg"
                  alt="Alex trabajando en su setup"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 via-transparent to-transparent" />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl border border-violet-500/20 bg-violet-500/5 -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-2xl border border-white/5 bg-white/[0.02] -z-10" />
            </motion.div>

            {/* Text side */}
            <motion.div
              variants={staggerContainer}
              {...motionProps(staggerContainer)}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp}>
                <SectionLabel>Sobre mí</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-display font-bold tracking-tight text-balance"
              >
                Construyo productos que{" "}
                <span className="text-violet-400">importan</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-slate-400 leading-relaxed text-pretty"
              >
                Soy un desarrollador apasionado por la intersección entre
                tecnología y diseño. Creo que el mejor software no solo
                funciona bien, sino que también se siente bien al usarlo.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-slate-400 leading-relaxed text-pretty"
              >
                He trabajado con startups en etapa temprana y empresas
                consolidadas, siempre con el mismo objetivo: entregar código
                limpio, escalable y mantenible que resuelva problemas reales.
                Cuando no estoy programando, contribuyo a proyectos open source
                y escribo sobre desarrollo web.
              </motion.p>

              {/* Service cards */}
              <motion.div variants={staggerContainerFast} className="space-y-3 pt-2">
                {services.map((service) => (
                  <motion.div
                    key={service.title}
                    variants={fadeInUp}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-violet-500/20 hover:bg-violet-500/5 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                      <service.icon size={16} className="text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-200 mb-0.5">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 md:py-32 bg-white/[0.015]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            {...motionProps(staggerContainer)}
            className="text-center space-y-4 mb-16"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel>Habilidades</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight"
            >
              Mi stack tecnológico
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-slate-400 max-w-xl mx-auto leading-relaxed"
            >
              Herramientas y tecnologías con las que trabajo a diario para
              construir productos robustos y escalables.
            </motion.p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            {...motionProps(fadeIn)}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {["all", "frontend", "backend", "tools", "design"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveSkillCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                  activeSkillCategory === cat
                    ? "bg-violet-600 text-white border-violet-600 shadow-[0_0_16px_rgba(124,58,237,0.4)]"
                    : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-slate-200"
                }`}
              >
                {cat === "all" ? "Todos" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Skills grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={fadeInUp}
                className="p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-violet-500/20 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-200">
                    {skill.name}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                      categoryColor[skill.category] ?? "bg-white/5 text-slate-400 border-white/10"
                    }`}
                  >
                    {skill.category}
                  </span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-violet-600 to-violet-400 rounded-full"
                  />
                </div>
                <div className="flex justify-end mt-1.5">
                  <span className="text-xs text-slate-500">{skill.level}%</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            {...motionProps(staggerContainer)}
            className="text-center space-y-4 mb-16"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel>Proyectos</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight"
            >
              Trabajo seleccionado
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-slate-400 max-w-xl mx-auto leading-relaxed"
            >
              Una selección de proyectos que demuestran mi capacidad para
              resolver problemas complejos con soluciones elegantes.
            </motion.p>
          </motion.div>

          {/* Projects — asymmetric bento */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Featured large card */}
            <motion.div
              variants={scaleIn}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="md:row-span-2 group relative rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] hover:border-violet-500/30 transition-all duration-500 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-12px_rgba(124,58,237,0.2)]"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={featuredProjects[0]?.image ?? ""}
                  alt={featuredProjects[0]?.title ?? ""}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {(featuredProjects[0]?.tags ?? []).map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
                <h3 className="text-xl font-display font-bold text-slate-100">
                  {featuredProjects[0]?.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {featuredProjects[0]?.description}
                </p>
                <div className="flex items-center gap-3 pt-2">
                  {featuredProjects[0]?.liveUrl && (
                    <a
                      href={featuredProjects[0].liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      <Eye size={14} />
                      Ver demo
                    </a>
                  )}
                  {featuredProjects[0]?.repoUrl && (
                    <a
                      href={featuredProjects[0].repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      <Github size={14} />
                      Código
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Smaller cards */}
            {featuredProjects.slice(1).map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
                className="group relative rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] hover:border-violet-500/30 transition-all duration-500 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-12px_rgba(124,58,237,0.2)]"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent" />
                </div>
                <div className="p-5 space-y-2.5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Tag key={tag} label={tag} />
                    ))}
                  </div>
                  <h3 className="text-lg font-display font-bold text-slate-100">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        <Eye size={14} />
                        Ver demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        <Github size={14} />
                        Código
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section id="experience" className="py-24 md:py-32 bg-white/[0.015]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
            {/* Sticky heading */}
            <motion.div
              {...motionProps(fadeInLeft)}
              className="md:sticky md:top-24 space-y-4"
            >
              <SectionLabel>Experiencia</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-balance">
                Donde he <span className="text-violet-400">trabajado</span>
              </h2>
              <p className="text-slate-400 leading-relaxed text-pretty">
                He tenido el privilegio de colaborar con algunas de las empresas
                más innovadoras del sector tecnológico.
              </p>
              <a
                href={BRAND.cvUrl}
                download
                className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
              >
                <Download size={14} />
                Descargar CV completo
              </a>
            </motion.div>

            {/* Timeline */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="relative space-y-6"
            >
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/40 via-violet-500/20 to-transparent" />

              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  variants={fadeInUp}
                  className="relative pl-14 group"
                >
                  {/* Dot */}
                  <div className="absolute left-3.5 top-5 w-3 h-3 rounded-full bg-violet-500 border-2 border-[#0a0a0f] shadow-[0_0_8px_rgba(124,58,237,0.6)] group-hover:shadow-[0_0_16px_rgba(124,58,237,0.8)] transition-all duration-300" />

                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-violet-500/20 hover:bg-violet-500/[0.03] transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.2)]">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-base font-bold text-slate-100">
                          {exp.role}
                        </h3>
                        <p className="text-sm text-violet-400 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs text-slate-500 bg-white/5 border border-white/10 px-3 py-1 rounded-full whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <Tag key={tag} label={tag} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            {...motionProps(staggerContainer)}
            className="text-center space-y-4 mb-16"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel>Testimonios</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight"
            >
              Lo que dicen de mí
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
                className={`p-6 rounded-2xl border border-white/5 bg-white/[0.03] hover:border-violet-500/20 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.3)] ${
                  i === 1 ? "md:mt-8" : ""
                }`}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} size={14} className="text-violet-400 fill-violet-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-6 text-pretty">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-32 bg-white/[0.015]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <motion.div
              {...motionProps(fadeInLeft)}
              className="space-y-6"
            >
              <SectionLabel>Contacto</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-balance">
                Trabajemos <span className="text-violet-400">juntos</span>
              </h2>
              <p className="text-slate-400 leading-relaxed text-pretty">
                Estoy abierto a nuevas oportunidades, proyectos freelance y
                colaboraciones interesantes. Si tienes una idea o un proyecto en
                mente, me encantaría escucharte.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-violet-500/20 hover:bg-violet-500/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Email</p>
                    <p className="text-sm font-medium text-slate-200 group-hover:text-violet-400 transition-colors">
                      {BRAND.email}
                    </p>
                  </div>
                  <ExternalLink size={14} className="text-slate-600 ml-auto group-hover:text-violet-400 transition-colors" />
                </a>

                <a
                  href={BRAND.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-violet-500/20 hover:bg-violet-500/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <Linkedin size={16} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">LinkedIn</p>
                    <p className="text-sm font-medium text-slate-200 group-hover:text-violet-400 transition-colors">
                      linkedin.com/in/alexmoreno
                    </p>
                  </div>
                  <ExternalLink size={14} className="text-slate-600 ml-auto group-hover:text-violet-400 transition-colors" />
                </a>

                <a
                  href={BRAND.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-violet-500/20 hover:bg-violet-500/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <Github size={16} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">GitHub</p>
                    <p className="text-sm font-medium text-slate-200 group-hover:text-violet-400 transition-colors">
                      github.com/alexmoreno
                    </p>
                  </div>
                  <ExternalLink size={14} className="text-slate-600 ml-auto group-hover:text-violet-400 transition-colors" />
                </a>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div {...motionProps(fadeInRight)}>
              {formSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center text-center p-12 rounded-2xl bg-white/[0.03] border border-violet-500/20 h-full min-h-[400px] space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
                    <CheckCircle size={28} className="text-violet-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">
                    Mensaje enviado
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                    Gracias por contactarme. Te responderé en menos de 24 horas.
                  </p>
                  <button
                    onClick={() => {
                      setFormSent(false);
                      setFormState({ name: "", email: "", message: "" });
                    }}
                    className="text-sm text-violet-400 hover:text-violet-300 transition-colors underline underline-offset-4"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleFormSubmit}
                  className="space-y-5 p-8 rounded-2xl bg-white/[0.03] border border-white/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.3)]"
                >
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Nombre
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={handleFormChange}
                      placeholder="Tu nombre completo"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={handleFormChange}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleFormChange}
                      placeholder="Cuéntame sobre tu proyecto o idea..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_0_24px_rgba(124,58,237,0.35)] hover:shadow-[0_0_36px_rgba(124,58,237,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 flex items-center justify-center gap-2"
                  >
                    Enviar mensaje
                    <ArrowRight size={16} />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}