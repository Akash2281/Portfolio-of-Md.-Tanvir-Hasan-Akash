import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Image as ImageIcon
} from 'lucide-react';

// --- DATA ---
const expertise = [
  {
    title: "Frontend Development",
    desc: "Crafting highly interactive, responsive web applications using HTML, CSS, JavaScript, React, and Tailwind.",
    icon: <Code2 strokeWidth={1.5} className="w-8 h-8 text-amber-100" />
  },
  {
    title: "Software Development",
    desc: "Building robust backend logic and desktop applications using Python and PyQt6.",
    icon: <MonitorPlay strokeWidth={1.5} className="w-8 h-8 text-amber-100" />
  },
  {
    title: "Graphic & UI/UX Design",
    desc: "Designing pixel-perfect interfaces and striking visuals using Figma, Illustrator, Photoshop, and Lightroom.",
    icon: <Palette strokeWidth={1.5} className="w-8 h-8 text-amber-100" />
  },
  {
    title: "Video Production",
    desc: "Editing high-end commercials, documentaries, and social content in Adobe Premiere Pro.",
    icon: <Video strokeWidth={1.5} className="w-8 h-8 text-amber-100" />
  },
  {
    title: "AI Automation & Generation",
    desc: "Mastering Prompt Engineering and AI tools to generate stunning artwork and automate complex workflows.",
    icon: <Bot strokeWidth={1.5} className="w-8 h-8 text-amber-100" />
  },
  {
    title: "Search Engine Optimization",
    desc: "Ranking digital products organically through technical SEO and content strategies.",
    icon: <Search strokeWidth={1.5} className="w-8 h-8 text-amber-100" />
  },
  {
    title: "Professional Photography",
    desc: "Capturing moments, astrophotography, and high-quality portraits with precision lighting.",
    icon: <Camera strokeWidth={1.5} className="w-8 h-8 text-amber-100" />
  }
];

const projects = [
  {
    title: "Mento",
    subtitle: "AI Mental Health Companion",
    desc: "A groundbreaking platform that analyzes stress levels and emotional states through text or voice. Mento interacts intelligently with users, dynamically adapting its responses to elevate their emotional well-being after every session.",
    tags: ["Python", "React", "Tailwind", "AI / ML"],
    featured: true
  },
  {
    title: "Symphony Player Pro",
    subtitle: "Advanced Desktop Media Hub",
    desc: "A custom-engineered desktop media player (TanHafPlayer) featuring real-time 4K upscaling, fluid audio wave visualizers, and a stunning glassmorphic interface.",
    tags: ["Python", "PyQt6", "Desktop App"],
    featured: false
  }
];

const showcaseItems = [
  { id: 1, type: "Photography", title: "Milky Way Astrophotography", size: "tall" },
  { id: 2, type: "Video", title: "Automotive Commercial Edit", size: "wide" },
  { id: 3, type: "Graphic Design", title: "Brand Identity - Vector", size: "small" },
  { id: 4, type: "AI Art", title: "Cyberpunk Cityscape Generation", size: "large" },
  { id: 5, type: "Photography", title: "Urban Portrait Series", size: "wide" },
  { id: 6, type: "Graphic Design", title: "UI/UX Mobile App Concept", size: "tall" },
  { id: 7, type: "Video", title: "Travel Documentary Color Grade", size: "small" },
  { id: 8, type: "AI Art", title: "Surrealist Concept Render", size: "small" }
];

// --- REUSABLE ANIMATION COMPONENTS ---
const ScrollReveal = ({ children, delay = 0, className = "", width = "100%" }) => (
  <div style={{ width, overflow: "hidden" }} className={className}>
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
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
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

// --- MAIN APP ---
export default function Portfolio() {
  const [bgColor, setBgColor] = useState('#050505');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxData, setLightboxData] = useState(null);

  // Custom Cursor tracking
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
    <motion.main 
      animate={{ backgroundColor: bgColor }} 
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="relative min-h-screen text-gray-300 font-sans overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-100"
    >
      {/* Custom Cursor (Hidden via CSS on touch devices) */}
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
      
      {/* Global CSS for touch-device cursor hiding & smooth scrolling */}
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
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 md:px-12 backdrop-blur-xl border-b border-white/5 bg-transparent">
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

      {/* HERO SECTION */}
      <motion.section 
        id="hero"
        onViewportEnter={() => setBgColor('#050505')}
        viewport={{ amount: 0.5 }}
        className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 pb-20 max-w-[1920px] mx-auto w-full relative z-10"
      >
        <ScrollReveal>
          <h2 className="text-amber-500/80 font-medium tracking-widest text-xs md:text-sm uppercase mb-6">
            Creative Technologist & Visual Designer
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <h1 className="font-serif text-[15vw] leading-[0.85] text-white tracking-tighter w-full uppercase break-words">
            Tanvir Hasan
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <h1 className="font-serif text-[15vw] leading-[0.85] text-gray-600 tracking-tighter w-full uppercase -mt-2 sm:-mt-6">
            Akash<span className="text-amber-500">.</span>
          </h1>
        </ScrollReveal>
        
        <ScrollReveal delay={0.3} className="mt-12 sm:mt-16 max-w-2xl xl:max-w-4xl">
          <p className="text-lg sm:text-2xl lg:text-3xl text-gray-400 font-light leading-relaxed">
            Merging logic with imagination. I engineer scalable software, design pixel-perfect interfaces, and produce cinematic visual media—delivering complete, end-to-end digital experiences.
          </p>
        </ScrollReveal>
      </motion.section>

      {/* EXPERTISE SECTION */}
      <motion.section 
        id="expertise"
        onViewportEnter={() => setBgColor('#0f0f11')}
        viewport={{ amount: 0.3 }}
        className="px-6 md:px-12 lg:px-24 py-32 max-w-[1920px] mx-auto w-full relative z-10"
      >
        <ScrollReveal>
          <h3 className="font-serif text-5xl md:text-7xl text-white mb-16 tracking-tight">
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
      </motion.section>

      {/* PROJECTS SECTION */}
      <motion.section 
        id="projects"
        onViewportEnter={() => setBgColor('#0d0a0f')}
        viewport={{ amount: 0.2 }}
        className="px-6 md:px-12 lg:px-24 py-32 max-w-[1920px] mx-auto w-full relative z-10"
      >
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-white/5 pb-10">
            <h3 className="font-serif text-5xl md:text-7xl text-white tracking-tight">
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
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors duration-500 ${project.featured ? 'xl:flex-row' : 'xl:flex-row-reverse'} min-h-[600px]`}
              >
                {/* Content Half */}
                <div className="p-8 sm:p-16 xl:p-24 flex flex-col justify-center w-full xl:w-1/2">
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 text-[10px] sm:text-xs tracking-widest uppercase text-amber-200/60 border border-amber-200/10 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h5 className="text-amber-500 font-medium tracking-widest text-sm uppercase mb-4">
                    {project.subtitle}
                  </h5>
                  <h4 className="font-serif text-4xl sm:text-6xl text-white mb-8 tracking-tight group-hover:text-amber-50 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-gray-400 text-lg sm:text-xl font-light leading-relaxed mb-12 max-w-xl">
                    {project.desc}
                  </p>
                  
                  <button 
                    onMouseEnter={handleHoverStart} 
                    onMouseLeave={handleHoverEnd}
                    className="flex items-center gap-4 text-white font-medium group/btn w-fit text-sm tracking-widest uppercase"
                  >
                    View Case Study
                    <span className="p-3 rounded-full bg-white/5 group-hover/btn:bg-amber-500 group-hover/btn:text-black transition-all duration-300 group-hover/btn:scale-110">
                      <ArrowUpRight className="w-5 h-5" />
                    </span>
                  </button>
                </div>

                {/* Mockup Half */}
                <div className={`relative w-full xl:w-1/2 bg-black min-h-[400px] xl:min-h-full overflow-hidden ${project.featured ? 'xl:border-l' : 'xl:border-r'} border-white/5`}>
                  <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }}></div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 bg-gradient-to-tr from-transparent to-amber-500/10"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 font-serif text-3xl sm:text-5xl tracking-widest uppercase text-center w-full">
                    {project.title} <br/> Visuals
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </motion.section>

      {/* CREATIVE SHOWCASE (BENTO GRID) */}
      <motion.section 
        id="showcase"
        onViewportEnter={() => setBgColor('#080808')}
        viewport={{ amount: 0.1 }}
        className="px-6 md:px-12 lg:px-24 py-32 max-w-[1920px] mx-auto w-full relative z-10"
      >
        <ScrollReveal>
          <h3 className="font-serif text-5xl md:text-7xl text-white mb-12 tracking-tight">
            Creative Visuals
          </h3>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {/* Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-12">
            {['All', 'Photography', 'Video', 'Graphic Design', 'AI Art'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                onMouseEnter={handleHoverStart} 
                onMouseLeave={handleHoverEnd}
                className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-widest uppercase transition-all duration-300 ${
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

        {/* Bento Grid layout */}
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
                className={`size-${item.size} group relative bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-amber-500/40 transition-colors`}
                style={{ minHeight: '250px' }}
              >
                {/* Mock Image Gradient Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/90 group-hover:scale-105 transition-transform duration-700"></div>
                
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-amber-500/80 bg-black/50 w-fit px-3 py-1 rounded-full backdrop-blur-md">
                    {item.type}
                  </span>
                  
                  <div className="flex justify-between items-end">
                    <h4 className="text-white font-medium text-lg sm:text-xl leading-tight max-w-[80%]">
                      {item.title}
                    </h4>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-amber-500 group-hover:text-black transition-all">
                      {item.type === 'Video' ? <Play className="w-4 h-4 ml-1" /> : <ImageIcon className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>

      {/* FOOTER / CONTACT */}
      <motion.footer 
        id="contact"
        onViewportEnter={() => setBgColor('#050505')}
        viewport={{ amount: 0.5 }}
        className="px-6 md:px-12 lg:px-24 py-32 mt-20 border-t border-white/5 relative z-10"
      >
        <ScrollReveal className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <h2 className="font-serif text-[10vw] sm:text-[8vw] md:text-7xl lg:text-9xl text-white mb-8 tracking-tighter leading-none">
            Let's build <br />
            <span className="text-gray-600 italic">the future.</span>
          </h2>
          
          <button 
            onMouseEnter={handleHoverStart} 
            onMouseLeave={handleHoverEnd}
            className="inline-flex items-center gap-4 px-10 py-5 mt-12 rounded-full bg-white text-black font-bold tracking-widest uppercase text-sm hover:bg-amber-500 hover:scale-105 transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            Contact Me
          </button>

          <div className="mt-32 w-full flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm text-gray-600 border-t border-white/10 pt-10 uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Tanvir Hasan Akash.</p>
            <div className="flex gap-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-amber-500 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-amber-500 transition-colors">GitHub</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Instagram</a>
            </div>
          </div>
        </ScrollReveal>
      </motion.footer>

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
              <X className="w-10 h-10" />
            </button>
            
            <div className="relative w-full max-w-6xl aspect-video bg-[#111] border border-white/10 rounded-2xl sm:rounded-[3rem] overflow-hidden flex flex-col items-center justify-center">
              {/* Mock content rendering */}
              {lightboxData.type === 'Video' ? (
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center pl-2">
                  <Play className="w-10 h-10 text-white" />
                </div>
              ) : (
                <ImageIcon className="w-24 h-24 text-white/10" />
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 bg-gradient-to-t from-black/90 to-transparent">
                <span className="text-amber-500 text-xs font-bold tracking-widest uppercase mb-2 block">
                  {lightboxData.type}
                </span>
                <h3 className="font-serif text-3xl sm:text-5xl text-white">
                  {lightboxData.title}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.main>
  );
}