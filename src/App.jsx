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
  Compass
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
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
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function Portfolio() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxData, setLightboxData] = useState(null);

  // --- SCROLL-RESPONSIVE BACKGROUND ANIMATIONS ---
  const { scrollYProgress } = useScroll();
  
  const yOrbTop = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const yOrbMiddle = useTransform(scrollYProgress, [0, 1], [0, 350]);
  const rotateRing = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const footerGlowScale = useTransform(scrollYProgress, [0.7, 1], [0.8, 1.4]);

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
    <main className="relative min-h-screen bg-[#070709] text-gray-300 font-sans overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-100">
      
      {/* ----------------- SCROLL RESPONSIVE ANIMATED BACKGROUND ----------------- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Radial Dot Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)`, 
            backgroundSize: '48px 48px' 
          }} 
        />

        {/* Scroll-Responsive Top Amber Orb */}
        <motion.div 
          style={{ y: yOrbTop }}
          className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-amber-500/[0.08] rounded-full blur-[160px]"
        />

        {/* Scroll-Responsive Middle Purple Orb */}
        <motion.div 
          style={{ y: yOrbMiddle }}
          className="absolute top-[35%] -right-32 w-[650px] h-[650px] bg-purple-900/[0.08] rounded-full blur-[190px]"
        />

        {/* Dynamic Rotating Geometric Ring */}
        <motion.div 
          style={{ rotate: rotateRing }}
          className="absolute top-[20%] right-[6%] w-80 h-80 rounded-full border border-amber-500/10 border-dashed pointer-events-none hidden lg:block"
        />

        {/* Animated Astro Accent Stars */}
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[10%] text-amber-400/30 text-sm hidden sm:block"
        >
          ✦
        </motion.div>
        <motion.div 
          animate={{ y: [0, 25, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[70%] right-[12%] text-amber-300/30 text-base hidden sm:block"
        >
          ✧
        </motion.div>

        {/* Dynamic Bottom Page Glow */}
        <motion.div 
          style={{ scale: footerGlowScale }}
          className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-amber-500/[0.12] rounded-full blur-[200px]"
        />
      </div>

      {/* Dynamic Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-3.5 h-3.5 bg-amber-500 rounded-full pointer-events-none z-[100] mix-blend-difference hidden sm:block"
        animate={{ 
          x: cursorPos.x - 7, 
          y: cursorPos.y - 7,
          scale: isHovering ? 3.5 : 1,
          opacity: isHovering ? 0.6 : 0.9
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.5 }}
      />

      <style dangerouslySetInnerHTML={{__html: `
        @media (pointer: coarse) { .hidden-on-touch { display: none !important; } }
        html { scroll-behavior: smooth; }
        body { cursor: none; }
        @media (pointer: coarse) { body { cursor: auto; } }
        .bento-grid { display: grid; grid-auto-flow: dense; gap: 1.25rem; }
        .size-small { grid-column: span 1; grid-row: span 1; }
        .size-wide { grid-column: span 2; grid-row: span 1; }
        .size-tall { grid-column: span 1; grid-row: span 2; }
        .size-large { grid-column: span 2; grid-row: span 2; }
      `}} />

      {/* NAVIGATION HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 md:px-12 backdrop-blur-xl border-b border-white/5 bg-[#070709]/80">
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
              className="text-xs font-medium tracking-widest text-gray-400 hover:text-amber-400 uppercase transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </nav>
      </header>

      {/* HERO SECTION */}
      <section 
        id="hero"
        className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 pb-20 max-w-[1920px] mx-auto w-full relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Creative Technologist & Visual Designer
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl font-extrabold text-white tracking-tighter leading-[0.95] uppercase">
                Tanvir Hasan <br />
                <span className="text-neutral-500">Akash<span className="text-amber-500">.</span></span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base sm:text-xl text-neutral-400 font-light leading-relaxed max-w-2xl pt-2">
                Merging logic with imagination. I engineer scalable software, design pixel-perfect interfaces, and produce cinematic visual media—delivering complete digital experiences.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-5 pt-4">
                <a 
                  href="#projects"
                  onMouseEnter={handleHoverStart} 
                  onMouseLeave={handleHoverEnd}
                  className="px-8 py-4 bg-amber-500 text-black font-bold rounded-full hover:bg-amber-400 transition-all transform hover:scale-105 text-xs sm:text-sm tracking-widest uppercase shadow-lg shadow-amber-500/15"
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

          {/* Right Hero: High-Tech Glassmorphic Profile Photo Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ScrollReveal delay={0.2} className="w-full max-w-[360px] sm:max-w-[430px]">
              <motion.div 
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-amber-500/25 via-white/[0.04] to-black/90 border border-amber-500/35 backdrop-blur-2xl shadow-2xl shadow-amber-500/10 group"
              >
                {/* Glowing Subtle Corner Accent */}
                <div className="absolute -top-6 -left-6 w-28 h-28 bg-amber-500/15 blur-2xl rounded-full pointer-events-none" />

                <div className="relative w-full h-[450px] sm:h-[520px] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10">
                  <img 
                    src="/profile.jpg" 
                    alt="Md. Tanvir Hasan Akash" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.98] contrast-[1.02]"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/30 text-[10px] uppercase tracking-wider text-amber-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available For Projects
                  </div>

                  {/* Profile Info Overlay */}
                  <div className="absolute bottom-6 left-5 right-5 space-y-3">
                    <div className="bg-black/85 backdrop-blur-md p-4 rounded-xl border border-white/10 flex justify-between items-center">
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
          <div className="mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-500 font-bold block mb-2">Capabilities</span>
            <h3 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white tracking-tight">
              Arsenal & Expertise
            </h3>
          </div>
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
              className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/40 transition-all duration-300 hover:bg-white/[0.04]"
            >
              <div className="mb-6 p-3.5 inline-block rounded-xl bg-black/60 border border-white/5 group-hover:border-amber-500/20 transition-colors">
                {item.icon}
              </div>
              <h4 className="text-lg font-bold text-white mb-3 tracking-wide">{item.title}</h4>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PROJECTS SECTION */}
      <section 
        id="projects"
        className="px-6 md:px-12 lg:px-24 py-28 max-w-[1920px] mx-auto w-full relative z-10 border-t border-white/5"
      >
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-white/5 pb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-amber-500 font-bold block mb-2">Selected Works</span>
              <h3 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white tracking-tight">
                Flagship Software
              </h3>
            </div>
            <p className="text-neutral-400 max-w-sm text-xs sm:text-sm uppercase tracking-widest leading-relaxed">
              Engineering complex systems into clean, intuitive digital products.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-16">
          {projects.map((project, idx) => (
            <ScrollReveal key={idx}>
              <div 
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#0d0d10] border border-white/10 hover:border-amber-500/30 transition-all duration-500 ${project.featured ? 'xl:flex-row' : 'xl:flex-row-reverse'} min-h-[520px]`}
              >
                <div className="p-8 sm:p-14 xl:p-16 flex flex-col justify-center w-full xl:w-1/2">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3.5 py-1 text-[11px] font-mono tracking-wider uppercase text-amber-300/80 border border-amber-500/20 bg-amber-500/5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h5 className="text-amber-500 font-medium tracking-widest text-xs uppercase mb-2">
                    {project.subtitle}
                  </h5>
                  <h4 className="font-serif text-3xl sm:text-5xl text-white mb-6 tracking-tight group-hover:text-amber-100 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-xl">
                    {project.desc}
                  </p>
                  
                  <button 
                    onMouseEnter={handleHoverStart} 
                    onMouseLeave={handleHoverEnd}
                    className="flex items-center gap-3 text-white font-semibold group/btn w-fit text-xs tracking-widest uppercase"
                  >
                    View Case Study
                    <span className="p-2.5 rounded-full bg-white/5 group-hover/btn:bg-amber-500 group-hover/btn:text-black transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>

                <div className={`relative w-full xl:w-1/2 min-h-[320px] xl:min-h-full overflow-hidden ${project.featured ? 'xl:border-l' : 'xl:border-r'} border-white/5`}>
                  <img 
                    src={project.img} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CREATIVE SHOWCASE */}
      <section 
        id="showcase"
        className="px-6 md:px-12 lg:px-24 py-28 max-w-[1920px] mx-auto w-full relative z-10 border-t border-white/5"
      >
        <ScrollReveal>
          <div className="mb-10">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-500 font-bold block mb-2">Portfolio Gallery</span>
            <h3 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white tracking-tight">
              Creative Visuals
            </h3>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-2.5 mb-12">
            {['All', 'Photography', 'Video', 'Graphic Design', 'AI Art'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                onMouseEnter={handleHoverStart} 
                onMouseLeave={handleHoverEnd}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  activeFilter === cat 
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' 
                  : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxData(item)}
                onMouseEnter={handleHoverStart} 
                onMouseLeave={handleHoverEnd}
                className={`size-${item.size} group relative bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-amber-500/50 transition-all`}
                style={{ minHeight: '250px' }}
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400 bg-black/70 backdrop-blur-md w-fit px-3 py-1 rounded-full border border-white/10">
                    {item.type}
                  </span>
                  
                  <div className="flex justify-between items-end">
                    <h4 className="text-white font-bold text-base leading-tight max-w-[80%]">
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

      {/* FOOTER / CONTACT */}
      <footer 
        id="contact"
        className="px-6 md:px-12 lg:px-24 py-28 mt-20 border-t border-white/5 relative z-10 text-center"
      >
        <ScrollReveal className="max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-500 font-bold block mb-4">Get In Touch</span>
          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl text-white mb-6 tracking-tighter leading-none">
            Let's build <br />
            <span className="text-neutral-500 italic">the future.</span>
          </h2>
          
          <button 
            onMouseEnter={handleHoverStart} 
            onMouseLeave={handleHoverEnd}
            className="inline-flex items-center gap-3 px-9 py-4 mt-8 rounded-full bg-amber-500 text-black font-bold tracking-widest uppercase text-xs hover:bg-amber-400 hover:scale-105 transition-all duration-300 shadow-xl shadow-amber-500/20"
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </button>

          <div className="mt-24 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 border-t border-white/10 pt-8 uppercase tracking-widest gap-4">
            <p>© {new Date().getFullYear()} Md. Tanvir Hasan Akash. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-amber-400 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-amber-400 transition-colors">GitHub</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Instagram</a>
            </div>
          </div>
        </ScrollReveal>
      </footer>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxData && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxData(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-12"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-video bg-[#111] border border-white/10 rounded-2xl overflow-hidden flex flex-col items-center justify-center"
            >
              <button 
                onClick={() => setLightboxData(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-20 p-2 rounded-full bg-black/50"
              >
                <X className="w-6 h-6" />
              </button>

              <img 
                src={lightboxData.img} 
                alt={lightboxData.title} 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 bg-gradient-to-t from-black via-black/80 to-transparent">
                <span className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-1 block">
                  {lightboxData.type}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-white">
                  {lightboxData.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}