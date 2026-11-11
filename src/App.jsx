import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Code2, 
  MonitorPlay, 
  Palette, 
  Video, 
  Bot, 
  Search, 
  Camera,
  ArrowUpRight,
  Mail,
  X,
  Play,
  Image as ImageIcon,
  Sparkles,
  Compass,
  Zap,
  Globe,
  Radio
} from 'lucide-react';

// --- DATA ---
const expertise = [
  {
    title: "Frontend Development",
    desc: "Crafting highly interactive, responsive web applications using HTML, CSS, JavaScript, React, and Tailwind.",
    icon: <Code2 strokeWidth={1.5} className="w-8 h-8 text-amber-400" />
  },
  {
    title: "Software Development",
    desc: "Building robust backend logic and desktop applications using Python and PyQt6.",
    icon: <MonitorPlay strokeWidth={1.5} className="w-8 h-8 text-amber-400" />
  },
  {
    title: "Graphic & UI/UX Design",
    desc: "Designing pixel-perfect interfaces and striking visuals using Figma, Illustrator, Photoshop, and Lightroom.",
    icon: <Palette strokeWidth={1.5} className="w-8 h-8 text-amber-400" />
  },
  {
    title: "Video Production",
    desc: "Editing high-end commercials, documentaries, and social content in Adobe Premiere Pro.",
    icon: <Video strokeWidth={1.5} className="w-8 h-8 text-amber-400" />
  },
  {
    title: "AI Automation & Generation",
    desc: "Mastering Prompt Engineering and AI tools to generate stunning artwork and automate complex workflows.",
    icon: <Bot strokeWidth={1.5} className="w-8 h-8 text-amber-400" />
  },
  {
    title: "Search Engine Optimization",
    desc: "Ranking digital products organically through technical SEO and content strategies.",
    icon: <Search strokeWidth={1.5} className="w-8 h-8 text-amber-400" />
  },
  {
    title: "Professional Photography",
    desc: "Capturing moments, astrophotography, and high-quality portraits with precision lighting.",
    icon: <Camera strokeWidth={1.5} className="w-8 h-8 text-amber-400" />
  }
];

const projects = [
  {
    title: "Mento",
    subtitle: "AI Mental Health Companion",
    desc: "A groundbreaking platform that analyzes stress levels and emotional states through text or voice. Mento interacts intelligently with users, dynamically adapting its responses to elevate their emotional well-being after every session.",
    tags: ["Python", "React", "Tailwind", "AI / ML"],
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    featured: true
  },
  {
    title: "Symphony Player Pro",
    subtitle: "Advanced Desktop Media Hub",
    desc: "A custom-engineered desktop media player (TanHafPlayer) featuring real-time 4K upscaling, fluid audio wave visualizers, and a stunning glassmorphic interface.",
    tags: ["Python", "PyQt6", "Desktop App"],
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    featured: false
  }
];

const showcaseItems = [
  { id: 1, type: "Photography", title: "Milky Way Astrophotography", size: "tall", img: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&auto=format&fit=crop&q=80" },
  { id: 2, type: "Video", title: "Automotive Commercial Edit", size: "wide", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80" },
  { id: 3, type: "Graphic Design", title: "Brand Identity - Vector", size: "small", img: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=80" },
  { id: 4, type: "AI Art", title: "Cyberpunk Cityscape Generation", size: "large", img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80" },
  { id: 5, type: "Photography", title: "Urban Portrait Series", size: "wide", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80" },
  { id: 6, type: "Graphic Design", title: "UI/UX Mobile App Concept", size: "tall", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80" },
  { id: 7, type: "Video", title: "Travel Documentary Color Grade", size: "small", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80" },
  { id: 8, type: "AI Art", title: "Surrealist Concept Render", size: "small", img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80" }
];

// --- REUSABLE ANIMATION COMPONENTS ---
const ScrollReveal = ({ children, delay = 0, className = "", width = "100%" }) => (
  <div style={{ width }} className={className}>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

// --- MAIN APP ---
export default function Portfolio() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxData, setLightboxData] = useState(null);

  // Advanced Parallax Scroll Controls
  const { scrollYProgress } = useScroll();
  
  // Floating Background Movements
  const yOrb1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const yOrb3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotateRing1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateRing2 = useTransform(scrollYProgress, [0, 1], [360, 0]);
  const footerScale = useTransform(scrollYProgress, [0.75, 1], [0.5, 1.5]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleHoverStart = () => setIsHovering(true);
  const handleHoverEnd = () => setIsHovering(false);

  const filteredShowcase = activeFilter === 'All' 
    ? showcaseItems 
    : showcaseItems.filter(item => item.type === activeFilter);

  return (
    <main className="relative min-h-screen bg-[#050507] text-gray-300 font-sans overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-100">
      
      {/* Dynamic Floating Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-amber-500 rounded-full pointer-events-none z-[100] mix-blend-difference hidden sm:block"
        animate={{ 
          x: cursorPos.x - 8, 
          y: cursorPos.y - 8,
          scale: isHovering ? 4 : 1,
          opacity: isHovering ? 0.5 : 1
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.5 }}
      />
      
      {/* ----------------- PARALLAX VISUAL BACKGROUND ELEMENTS ----------------- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* Subtle Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)`, 
            backgroundSize: '40px 40px' 
          }} 
        />

        {/* Ambient Glowing Orbs */}
        <motion.div 
          style={{ y: yOrb1 }}
          className="absolute -top-40 left-[10%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[170px]"
        />

        <motion.div 
          style={{ y: yOrb2 }}
          className="absolute top-[35%] -right-40 w-[700px] h-[700px] bg-purple-900/15 rounded-full blur-[190px]"
        />

        <motion.div 
          style={{ y: yOrb3 }}
          className="absolute top-[65%] -left-40 w-[650px] h-[650px] bg-amber-600/10 rounded-full blur-[180px]"
        />

        {/* Floating Interactive Geometric Wireframes (Scroll Responsive) */}
        <motion.div 
          style={{ rotate: rotateRing1 }}
          className="absolute top-[15%] right-[5%] w-96 h-96 rounded-full border border-amber-500/15 border-dashed pointer-events-none hidden lg:block"
        />

        <motion.div 
          style={{ rotate: rotateRing2 }}
          className="absolute top-[50%] left-[3%] w-[450px] h-[450px] rounded-full border border-white/5 border-dashed pointer-events-none hidden lg:block"
        />

        {/* Floating Astro Star Constellations */}
        <motion.div 
          animate={{ y: [0, -25, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] left-[15%] text-amber-400/40 text-sm hidden sm:block"
        >
          ✦
        </motion.div>

        <motion.div 
          animate={{ y: [0, 30, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[55%] right-[12%] text-amber-300/40 text-base hidden sm:block"
        >
          ✧
        </motion.div>

        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[80%] left-[20%] text-amber-500/30 text-xs hidden sm:block"
        >
          ✦
        </motion.div>

        {/* Footer Deep Space Parallax Glow (Bottom Page) */}
        <motion.div 
          style={{ scale: footerScale }}
          className="absolute -bottom-60 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-t from-amber-500/20 via-amber-500/5 to-transparent rounded-full blur-[220px]"
        />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (pointer: coarse) { .hidden-on-touch { display: none !important; } }
        html { scroll-behavior: smooth; }
        body { cursor: none; }
        @media (pointer: coarse) { body { cursor: auto; } }
        .bento-grid { display: grid; grid-auto-flow: dense; gap: 1rem; }
        .size-small { grid-column: span 1; grid-row: span 1; }
        .size-wide { grid-column: span 1; grid-row: span 1; }
        .size-tall { grid-column: span 1; grid-row: span 1; }
        .size-large { grid-column: span 1; grid-row: span 1; }
        
        @media (min-width: 640px) {
          .size-wide { grid-column: span 2; }
          .size-tall { grid-row: span 2; }
          .size-large { grid-column: span 2; grid-row: span 2; }
        }
      `}} />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 md:px-12 backdrop-blur-xl border-b border-white/5 bg-black/50">
        <a 
          href="#" 
          onMouseEnter={handleHoverStart} 
          onMouseLeave={handleHoverEnd}
          className="font-serif text-2xl font-bold tracking-tighter text-white"
        >
          THA<span className="text-amber-500">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-10">
          {['expertise', 'projects', 'showcase', 'contact'].map(link => (
            <a 
              key={link}
              href={`#${link}`} 
              onMouseEnter={handleHoverStart} 
              onMouseLeave={handleHoverEnd}
              className="text-xs font-medium tracking-widest text-gray-400 hover:text-white uppercase transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </nav>
      </header>

      {/* HERO SECTION WITH LARGE GLASS PHOTO FRAME */}
      <section 
        id="hero"
        className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 pb-20 max-w-[1920px] mx-auto w-full relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Creative Technologist & Visual Designer
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl font-extrabold text-white tracking-tighter leading-[0.9] uppercase">
                Tanvir Hasan <br />
                <span className="text-gray-500">Akash<span className="text-amber-500">.</span></span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base sm:text-xl text-gray-400 font-light leading-relaxed max-w-2xl pt-2">
                Merging logic with imagination. I engineer scalable software, design pixel-perfect interfaces, and produce cinematic visual media—delivering complete, end-to-end digital experiences.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-5 pt-4">
                <a 
                  href="#projects"
                  onMouseEnter={handleHoverStart} 
                  onMouseLeave={handleHoverEnd}
                  className="px-8 py-4 bg-amber-500 text-black font-bold rounded-full hover:bg-amber-400 transition-all transform hover:scale-105 text-xs sm:text-sm tracking-widest uppercase shadow-lg shadow-amber-500/20"
                >
                  Explore Work
                </a>
                <a 
                  href="#contact"
                  onMouseEnter={handleHoverStart} 
                  onMouseLeave={handleHoverEnd}
                  className="px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-md rounded-full text-white font-medium hover:bg-white/10 transition-all text-xs sm:text-sm tracking-widest uppercase"
                >
                  Get In Touch
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Showcase: Unique High-Tech Glassmorphic Profile Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ScrollReveal delay={0.2} className="w-full max-w-[360px] sm:max-w-[440px]">
              <motion.div 
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-amber-500/30 via-white/[0.04] to-black/90 border border-amber-500/40 backdrop-blur-2xl shadow-2xl shadow-amber-500/10 group"
              >
                {/* Glowing Background Accent */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-500/20 blur-2xl rounded-full pointer-events-none" />

                {/* Profile Photo Wrapper */}
                <div className="relative w-full h-[450px] sm:h-[520px] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10">
                  <img 
                    src="/profile.jpg" 
                    alt="Tanvir Hasan Akash" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.95] contrast-[1.05]"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Top Live Status Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/30 text-[10px] uppercase tracking-wider text-amber-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available For Hire
                  </div>

                  {/* Floating Tech Badges */}
                  <div className="absolute bottom-6 left-5 right-5 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-amber-500/20 backdrop-blur-md border border-amber-500/30 rounded-full text-[10px] font-mono text-amber-200">
                        Frontend & Python
                      </span>
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-mono text-neutral-300">
                        Astrophotography
                      </span>
                    </div>

                    <div className="bg-black/80 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex justify-between items-center">
                      <div>
                        <h4 className="text-white text-sm font-bold tracking-tight">Md. Tanvir Hasan Akash</h4>
                        <p className="text-neutral-400 text-[11px]">B.Sc CSE • Dhaka, Bangladesh</p>
                      </div>
                      <Compass className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '14s' }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* EXPERTISE SECTION */}
      <section 
        id="expertise"
        className="px-6 md:px-12 lg:px-24 py-28 max-w-[1920px] mx-auto w-full relative z-10"
      >
        <ScrollReveal>
          <h3 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white mb-16 tracking-tight">
            Arsenal & Expertise
          </h3>
        </ScrollReveal>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {expertise.map((item, idx) => (
            <motion.div 
              key={idx} 
              variants={staggerItem}
              onMouseEnter={handleHoverStart} 
              onMouseLeave={handleHoverEnd}
              className="group relative p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04]"
            >
              <div className="mb-8 p-4 inline-block rounded-xl bg-black/50 group-hover:bg-amber-500/10 transition-colors duration-500">
                {item.icon}
              </div>
              <h4 className="text-xl font-medium text-white mb-4 tracking-wide">{item.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PROJECTS SECTION WITH VISUAL MOCKUP CARDS */}
      <section 
        id="projects"
        className="px-6 md:px-12 lg:px-24 py-28 max-w-[1920px] mx-auto w-full relative z-10"
      >
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-white/5 pb-10">
            <h3 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white tracking-tight">
              Flagship Software
            </h3>
            <p className="text-gray-400 max-w-sm text-sm uppercase tracking-widest">
              Engineering complex systems into beautiful, intuitive interfaces.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-12 sm:gap-24">
          {projects.map((project, idx) => (
            <ScrollReveal key={idx}>
              <div 
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all duration-500 ${project.featured ? 'xl:flex-row' : 'xl:flex-row-reverse'} min-h-[550px]`}
              >
                <div className="p-8 sm:p-14 xl:p-20 flex flex-col justify-center w-full xl:w-1/2">
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 text-[10px] sm:text-xs tracking-widest uppercase text-amber-200/70 border border-amber-200/20 bg-amber-500/5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h5 className="text-amber-500 font-medium tracking-widest text-sm uppercase mb-3">
                    {project.subtitle}
                  </h5>
                  <h4 className="font-serif text-3xl sm:text-5xl text-white mb-6 tracking-tight group-hover:text-amber-50 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed mb-10 max-w-xl">
                    {project.desc}
                  </p>
                  
                  <button 
                    onMouseEnter={handleHoverStart} 
                    onMouseLeave={handleHoverEnd}
                    className="flex items-center gap-4 text-white font-medium group/btn w-fit text-xs sm:text-sm tracking-widest uppercase"
                  >
                    View Case Study
                    <span className="p-3 rounded-full bg-white/5 group-hover/btn:bg-amber-500 group-hover/btn:text-black transition-all duration-300 group-hover/btn:scale-110">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                  </button>
                </div>

                {/* Rich Visual Mockup Image */}
                <div className={`relative w-full xl:w-1/2 min-h-[350px] xl:min-h-full overflow-hidden ${project.featured ? 'xl:border-l' : 'xl:border-r'} border-white/5`}>
                  <img 
                    src={project.img} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-xs font-mono text-amber-400 border-t border-white/10 pt-4">
                    <span>{project.title} Visual Concept</span>
                    <span>Live Showcase</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CREATIVE SHOWCASE (BENTO GRID WITH PHOTOS) */}
      <section 
        id="showcase"
        className="px-6 md:px-12 lg:px-24 py-28 max-w-[1920px] mx-auto w-full relative z-10"
      >
        <ScrollReveal>
          <h3 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white mb-10 tracking-tight">
            Creative Visuals
          </h3>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-12">
            {['All', 'Photography', 'Video', 'Graphic Design', 'AI Art'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                onMouseEnter={handleHoverStart} 
                onMouseLeave={handleHoverEnd}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-medium tracking-widest uppercase transition-all duration-300 ${
                  activeFilter === cat 
                  ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.2)]' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div layout className="bento-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          <AnimatePresence>
            {filteredShowcase.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setLightboxData(item)}
                onMouseEnter={handleHoverStart} 
                onMouseLeave={handleHoverEnd}
                className={`size-${item.size} group relative bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-amber-500/40 transition-colors`}
                style={{ minHeight: '240px' }}
              >
                {/* Background Showcase Image */}
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-75 group-hover:brightness-95"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400 bg-black/60 backdrop-blur-md w-fit px-3 py-1 rounded-full border border-white/10">
                    {item.type}
                  </span>
                  
                  <div className="flex justify-between items-end">
                    <h4 className="text-white font-medium text-base sm:text-lg leading-tight max-w-[80%]">
                      {item.title}
                    </h4>
                    <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-amber-500 group-hover:text-black transition-all">
                      {item.type === 'Video' ? <Play className="w-4 h-4 ml-0.5" /> : <ImageIcon className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* FOOTER / CONTACT WITH MOTION PARALLAX ORBIT */}
      <footer 
        id="contact"
        className="px-6 md:px-12 lg:px-24 py-28 mt-20 border-t border-white/5 relative z-10 overflow-hidden"
      >
        {/* Pulsing Motion Wireframe Ring */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-t-full border-t border-amber-500/20 pointer-events-none animate-pulse" />

        <ScrollReveal className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-6 tracking-tighter leading-none">
            Let's build <br />
            <span className="text-gray-600 italic">the future.</span>
          </h2>
          
          <button 
            onMouseEnter={handleHoverStart} 
            onMouseLeave={handleHoverEnd}
            className="inline-flex items-center gap-4 px-8 sm:px-10 py-4 sm:py-5 mt-8 rounded-full bg-white text-black font-bold tracking-widest uppercase text-xs sm:text-sm hover:bg-amber-500 hover:scale-105 transition-all duration-300 shadow-xl shadow-amber-500/20"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            Contact Me
          </button>

          <div className="mt-24 w-full flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm text-gray-600 border-t border-white/10 pt-8 uppercase tracking-widest gap-4">
            <p>© {new Date().getFullYear()} Tanvir Hasan Akash. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-amber-500 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-amber-500 transition-colors">GitHub</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Instagram</a>
            </div>
          </div>
        </ScrollReveal>
      </footer>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxData && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-12"
          >
            <button 
              onClick={() => setLightboxData(null)}
              onMouseEnter={handleHoverStart} 
              onMouseLeave={handleHoverEnd}
              className="absolute top-6 right-6 sm:top-12 sm:right-12 text-white/50 hover:text-white hover:rotate-90 transition-all duration-300"
            >
              <X className="w-8 h-8 sm:w-10 sm:h-10" />
            </button>
            
            <div className="relative w-full max-w-5xl aspect-video bg-[#111] border border-white/10 rounded-2xl sm:rounded-[2rem] overflow-hidden flex flex-col items-center justify-center">
              <img 
                src={lightboxData.img} 
                alt={lightboxData.title} 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 bg-gradient-to-t from-black via-black/80 to-transparent">
                <span className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-2 block">
                  {lightboxData.type}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-white">
                  {lightboxData.title}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}