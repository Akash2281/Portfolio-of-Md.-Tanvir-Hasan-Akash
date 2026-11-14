import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
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
  Image as ImageIcon,
  Menu,
  Maximize2
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

const studyYears = [
  { focus: "Programming foundations", topics: "C, digital systems, discrete mathematics, calculus, linear algebra" },
  { focus: "Data and software design", topics: "Data structures, algorithms, object-oriented programming, databases, computer architecture" },
  { focus: "Systems and networks", topics: "Operating systems, networking, software engineering, embedded systems" },
  { focus: "Intelligence and visual computing", topics: "Artificial intelligence, compilers, graphics, security, digital image processing" }
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

// --- CURATED PHOTOGRAPHY SHOWCASE (EXACT ORIGINAL FILENAMES) ---
const showcaseItems = [
  { 
    id: 1, 
    type: "Astrophotography", 
    title: "Full Lunar Phase", 
    size: "large",
    img: "/imgi_11_625051153_18120327700570873_4266802532387549881_n.jpg" 
  },
  { 
    id: 2, 
    type: "Nature & Sky", 
    title: "Golden Sunset Silhouette", 
    size: "tall",
    img: "/imgi_9_621995460_18093394549950412_5762161839308906587_n.jpg" 
  },
  { 
    id: 3, 
    type: "Night & Architecture", 
    title: "Neon Monument Trails", 
    size: "wide",
    img: "/imgi_11_619239099_17984581544944181_5072813075361084055_n.jpg" 
  },
  { 
    id: 4, 
    type: "Nature & Sky", 
    title: "Storm Over the Horizon", 
    size: "wide",
    img: "/imgi_7_626246539_18090689521833634_6143370647279863144_n.jpg" 
  },
  { 
    id: 5, 
    type: "Street & Documentary", 
    title: "Night Fish Market", 
    size: "large",
    img: "/imgi_6_476064903_18374015197136361_7143137429884065300_n.jpg" 
  },
  { 
    id: 6, 
    type: "Nature & Sky", 
    title: "Dusk Horizon & Tower", 
    size: "wide",
    img: "/imgi_16_625509362_18343597234233127_3595041966976680061_n.jpg" 
  },
  { 
    id: 7, 
    type: "Night & Architecture", 
    title: "Minaret in Monochrome", 
    size: "small",
    img: "/imgi_5_888990337_18475127293136361_1945558014263150020_n.webp" 
  },
  { 
    id: 8, 
    type: "Nature & Sky", 
    title: "Emerald Paddy Fields", 
    size: "small",
    img: "/imgi_14_623797860_18115162966527508_3379638286040561973_n.jpg" 
  },
  { 
    id: 9, 
    type: "Nature & Sky", 
    title: "Palm Twilight", 
    size: "wide",
    img: "/imgi_8_622917394_18064195031270947_3814834344704912327_n.jpg" 
  },
  { 
    id: 10, 
    type: "Street & Documentary", 
    title: "Stacks of Knowledge", 
    size: "small",
    img: "/imgi_2_619353938_17995740581902916_4573711031424309312_n.jpg" 
  },
  { 
    id: 11, 
    type: "Minimal & Macro", 
    title: "Window Light & Shadow", 
    size: "small",
    img: "/imgi_5_625012291_18306449926260013_9199105627941839558_n.jpg" 
  },
  { 
    id: 12, 
    type: "Minimal & Macro", 
    title: "Crimson Spice Macro", 
    size: "small",
    img: "/imgi_13_623364824_18084830125921540_3769390656534720896_n.jpg" 
  }
];

const categories = [
  'All', 
  'Astrophotography', 
  'Nature & Sky', 
  'Night & Architecture', 
  'Street & Documentary', 
  'Minimal & Macro'
];

const portfolioPalettes = [
  { id: 'saffron', name: 'Current amber', shortName: 'Amber', color: '#f59e0b', description: 'Your original charcoal, ivory, and amber combination.' },
  { id: 'cobalt', name: 'Deep cobalt', shortName: 'Cobalt', color: '#78b7ff', description: 'Midnight navy, cool white, and precise cobalt blue.' },
  { id: 'teal', name: 'Quiet teal', shortName: 'Teal', color: '#75c8b4', description: 'Deep green charcoal, soft mint, and muted teal.' },
  { id: 'oxide', name: 'Warm oxide', shortName: 'Oxide', color: '#df8d70', description: 'Warm charcoal, parchment white, and mineral red.' },
  { id: 'citron', name: 'Graphite citron', shortName: 'Citron', color: '#b9ca68', description: 'Olive graphite, pale stone, and restrained citron.' },
  { id: 'iris', name: 'Night iris', shortName: 'Iris', color: '#ad9bea', description: 'Deep plum charcoal, cool white, and soft iris violet.' },
  { id: 'glacier', name: 'Glacier blue', shortName: 'Glacier', color: '#70cbd5', description: 'Blue black, crisp ice, and quiet glacier cyan.' }
];

const fontFamilies = [
  { id: 'manrope', name: 'Manrope', description: 'Current · clean and balanced' },
  { id: 'space', name: 'Space Grotesk', shortName: 'Space', description: 'Technical · geometric' },
  { id: 'sora', name: 'Sora', description: 'Modern · precise' },
  { id: 'outfit', name: 'Outfit', description: 'Elegant · open' }
];

// --- REUSABLE ANIMATION COMPONENTS ---
const ScrollReveal = ({ children, delay = 0, className = "", width = "100%" }) => {
  const reduceMotion = useReducedMotion();
  return (
    <div style={{ width }} className={className}>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: reduceMotion ? 0 : 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

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
  const prefersReducedMotion = useReducedMotion();
  const previewParams = new URLSearchParams(window.location.search);
  const palettePreviewEnabled = previewParams.get('palette-preview') === '1';
  const initialPalette = portfolioPalettes.some(({ id }) => id === previewParams.get('palette'))
    ? previewParams.get('palette')
    : 'cobalt';
  const initialTypeface = previewParams.get('weight') === 'bold' || previewParams.get('typeface') === 'bold' ? 'bold' : 'refined';
  const initialFont = fontFamilies.some(({ id }) => id === previewParams.get('font')) ? previewParams.get('font') : 'manrope';
  const [activePalette, setActivePalette] = useState(initialPalette);
  const [activeTypeface, setActiveTypeface] = useState(initialTypeface);
  const [activeFont, setActiveFont] = useState(initialFont);
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxData, setLightboxData] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- 120 FPS HIGH PERFORMANCE SCROLL TRANSFORMATIONS ---
  const { scrollYProgress } = useScroll();
  
  const yOrbTop = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const yOrbMiddle = useTransform(scrollYProgress, [0, 1], [0, 380]);
  const rotateRing = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const footerGlowScale = useTransform(scrollYProgress, [0.7, 1], [0.8, 1.4]);

  const handleHoverStart = () => {};
  const handleHoverEnd = () => {};

  const selectPalette = (paletteId) => {
    setActivePalette(paletteId);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('palette-preview', '1');
    nextUrl.searchParams.set('palette', paletteId);
    window.history.replaceState({}, '', nextUrl);
  };

  const selectTypeface = (typeface) => {
    setActiveTypeface(typeface);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('palette-preview', '1');
    nextUrl.searchParams.set('weight', typeface);
    nextUrl.searchParams.delete('typeface');
    window.history.replaceState({}, '', nextUrl);
  };

  const selectFont = (fontId) => {
    setActiveFont(fontId);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('palette-preview', '1');
    nextUrl.searchParams.set('font', fontId);
    window.history.replaceState({}, '', nextUrl);
  };

  const filteredShowcase = activeFilter === 'All' 
    ? showcaseItems 
    : showcaseItems.filter(item => item.type === activeFilter);

  // Smart image fallback handler for _2 variants
  const handleImageFallback = (e, originalSrc) => {
    if (!e.target.dataset.retried) {
      e.target.dataset.retried = "true";
      e.target.src = originalSrc.replace(/(\.[^.]+)$/, "_2$1");
    }
  };

  return (
    <main data-palette={activePalette} data-typeface={activeTypeface} data-font-family={activeFont} data-palette-preview={palettePreviewEnabled ? 'true' : undefined} className="relative min-h-screen bg-[#070709] text-gray-300 font-sans overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-100 transform-gpu">

      {palettePreviewEnabled && (
        <aside className="palette-preview" aria-label="Portfolio color palette preview">
          <div className="palette-preview-heading">
            <span>FULL COLOR STUDY</span>
            <span>Preview · {portfolioPalettes.find(({ id }) => id === activePalette)?.name}</span>
          </div>
          <div className="palette-preview-options" role="group" aria-label="Choose a color palette">
            {portfolioPalettes.map((palette) => (
              <button
                key={palette.id}
                type="button"
                className={`palette-choice${activePalette === palette.id ? ' is-active' : ''}`}
                onClick={() => selectPalette(palette.id)}
                aria-pressed={activePalette === palette.id}
                aria-label={`${palette.name}: ${palette.description}`}
                title={`${palette.name} — ${palette.description}`}
              >
                <span className="palette-swatch" style={{ '--swatch': palette.color }} aria-hidden="true" />
                <span>{palette.shortName}</span>
              </button>
            ))}
          </div>
          <div className="palette-type-row font-family-row">
            <span>DISPLAY FONT</span>
            <div role="group" aria-label="Choose display font">
              {fontFamilies.map((font) => (
                <button key={font.id} type="button" className={`palette-type-choice font-choice${activeFont === font.id ? ' is-active' : ''}`} onClick={() => selectFont(font.id)} aria-pressed={activeFont === font.id} title={font.description}>
                  {font.shortName || font.name}
                </button>
              ))}
            </div>
          </div>
          <div className="palette-type-row">
            <span>HEADINGS</span>
            <div role="group" aria-label="Choose heading weight">
              <button type="button" className={`palette-type-choice${activeTypeface === 'refined' ? ' is-active' : ''}`} onClick={() => selectTypeface('refined')} aria-pressed={activeTypeface === 'refined'}>Refined</button>
              <button type="button" className={`palette-type-choice${activeTypeface === 'bold' ? ' is-active' : ''}`} onClick={() => selectTypeface('bold')} aria-pressed={activeTypeface === 'bold'}>Bold</button>
            </div>
          </div>
          <p>{portfolioPalettes.find(({ id }) => id === activePalette)?.description} · {fontFamilies.find(({ id }) => id === activeFont)?.name} · {activeTypeface === 'bold' ? 'Bold' : 'Refined'}</p>
        </aside>
      )}
      
      {/* ----------------- 120 FPS BUTTER SMOOTH ANIMATED BACKGROUND ----------------- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu">
        {/* Radial Dot Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)`,
            backgroundSize: '48px 48px' 
          }} 
        />

        {/* Top Glow Orb */}
        <motion.div 
          style={prefersReducedMotion ? undefined : { y: yOrbTop }}
          className="ambient-glow ambient-glow-top absolute -top-32 left-1/2 -translate-x-1/2 md:left-1/4 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-amber-500/[0.09] rounded-full blur-[120px] sm:blur-[160px] transform-gpu"
        />

        {/* Middle Glow Orb */}
        <motion.div 
          style={prefersReducedMotion ? undefined : { y: yOrbMiddle }}
          className="ambient-glow ambient-glow-middle absolute top-[35%] -right-20 md:-right-32 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-purple-900/[0.09] rounded-full blur-[130px] sm:blur-[190px] transform-gpu"
        />

        {/* Geometric Rotating Vector Ring */}
        <motion.div 
          style={prefersReducedMotion ? undefined : { rotate: rotateRing }}
          className="absolute top-[20%] right-[6%] w-60 h-60 sm:w-80 sm:h-80 rounded-full border border-amber-500/10 border-dashed pointer-events-none transform-gpu hidden sm:block"
        />

        {/* Ambient Astro Stars */}
        <motion.div 
          animate={prefersReducedMotion ? { opacity: 0.35 } : { y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] left-[8%] text-amber-400/40 text-sm"
        >
          ✦
        </motion.div>
        <motion.div 
          animate={prefersReducedMotion ? { opacity: 0.4 } : { y: [0, 25, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[70%] right-[10%] text-amber-300/40 text-base"
        >
          ✧
        </motion.div>

        {/* Dynamic Footer Ambient Glow */}
        <motion.div 
          style={prefersReducedMotion ? undefined : { scale: footerGlowScale }}
          className="ambient-glow ambient-glow-footer absolute -bottom-40 left-1/2 -translate-x-1/2 w-[500px] sm:w-[900px] h-[300px] sm:h-[450px] bg-amber-500/[0.14] rounded-full blur-[140px] sm:blur-[200px] transform-gpu"
        />
      </div>

      {/* 120FPS Smooth Scroll & Responsive Bento Grid CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (pointer: coarse) { .hidden-on-touch { display: none !important; } }
        html { 
          scroll-behavior: smooth; 
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        body { overscroll-behavior-y: none; }
        
        .bento-grid { 
          display: grid; 
          grid-auto-flow: dense; 
          grid-auto-rows: minmax(240px, auto);
          gap: 1rem; 
        }
        .size-small { grid-column: span 1; grid-row: span 1; aspect-ratio: 1 / 1; }
        .size-wide { grid-column: span 1; grid-row: span 1; aspect-ratio: 3 / 2; }
        .size-tall { grid-column: span 1; grid-row: span 1; aspect-ratio: 4 / 5; }
        .size-large { grid-column: span 1; grid-row: span 1; aspect-ratio: 1 / 1; }
        
        @media (min-width: 640px) {
          .bento-grid { gap: 1.25rem; grid-auto-rows: 260px; }
          .size-small { grid-column: span 1; grid-row: span 1; aspect-ratio: auto; }
          .size-wide { grid-column: span 2; grid-row: span 1; aspect-ratio: auto; }
          .size-tall { grid-column: span 1; grid-row: span 2; aspect-ratio: auto; }
          .size-large { grid-column: span 2; grid-row: span 2; aspect-ratio: auto; }
        }

        /* Metallic Shimmer Sweep on Photo Hover */
        .photo-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: -120%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.14),
            transparent
          );
          transform: skewX(-25deg);
          transition: left 0.85s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          z-index: 15;
        }
        .photo-shimmer:hover::after {
          left: 160%;
        }
        
      `}} />

      {/* NAVIGATION HEADER (DESKTOP & MOBILE) */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-xl border-b border-white/5 bg-[#070709]/80">
        <a 
          href="#" 
          onMouseEnter={handleHoverStart} 
          onMouseLeave={handleHoverEnd}
          className="font-serif text-2xl font-bold tracking-tighter text-white"
        >
          THA<span className="text-amber-500">.</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-10">
          {['expertise', 'study', 'projects', 'showcase', 'contact'].map(link => (
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

        {/* Mobile Hamburger Toggle Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-amber-400 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* MOBILE DRAWER NAVIGATION MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[65px] z-30 md:hidden bg-[#0a0a0d]/95 backdrop-blur-2xl border-b border-white/10 p-6 shadow-2xl flex flex-col gap-5 text-center"
          >
            {['expertise', 'study', 'projects', 'showcase', 'contact'].map(link => (
              <a 
                key={link}
                href={`#${link}`} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-widest text-neutral-300 hover:text-amber-400 uppercase py-2 border-b border-white/5"
              >
                {link}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section 
        id="hero"
        className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-28 pb-16 max-w-[1920px] mx-auto w-full relative z-10"
      >
        <div className="hero-geometry" aria-hidden="true">
          <motion.div style={prefersReducedMotion ? undefined : { y: yOrbTop, rotate: rotateRing }} className="geo-ring" />
          <motion.div style={prefersReducedMotion ? undefined : { y: yOrbMiddle }} className="geo-orb" />
          <motion.div style={prefersReducedMotion ? undefined : { y: yOrbTop, rotate: rotateRing }} className="geo-cube"><span /></motion.div>
          <motion.div style={prefersReducedMotion ? undefined : { y: yOrbMiddle, rotate: rotateRing }} className="geo-diamond" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left hero-copy">
            <ScrollReveal>
              <div className="hero-intro-label">
                <span>COMPUTER SCIENCE · SOFTWARE · VISUAL DESIGN</span>
                <span className="hero-label-rule" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="hero-greeting">Hi, I’m</div>
              <h1 className="font-serif text-4xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl font-extrabold text-white tracking-tighter leading-[0.95]">
                Tanvir Hasan <br />
                <span className="text-neutral-500">Akash<span className="text-amber-500">.</span></span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-sm sm:text-xl text-neutral-400 font-light leading-relaxed max-w-2xl pt-2 hero-summary">
                I study computer science and build projects with React, Python, and visual design tools. I enjoy taking an idea from an early sketch to a working application.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-3">
                <a 
                  href="#projects"
                  onMouseEnter={handleHoverStart} 
                  onMouseLeave={handleHoverEnd}
                  className="px-6 py-3.5 sm:px-8 sm:py-4 bg-amber-500 text-black font-bold rounded-full hover:bg-amber-400 transition-all transform hover:scale-105 text-xs sm:text-sm tracking-widest uppercase shadow-lg shadow-amber-500/15"
                >
                  Explore Work
                </a>
                <a 
                  href="#contact"
                  onMouseEnter={handleHoverStart} 
                  onMouseLeave={handleHoverEnd}
                  className="px-6 py-3.5 sm:px-8 sm:py-4 border border-white/10 bg-white/5 backdrop-blur-md rounded-full text-white font-medium hover:bg-white/10 transition-all text-xs sm:text-sm tracking-widest uppercase"
                >
                  Get In Touch
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Portrait integrated into the introduction */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end hero-photo-column">
            <ScrollReveal delay={0.2} className="w-full max-w-[320px] sm:max-w-[430px]">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="hero-photo group"
              >
                <div className="hero-photo-frame">
                  <img
                    src="/profile.jpg"
                    alt="Portrait of Md. Tanvir Hasan Akash"
                    className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-700"
                  />
                </div>
                <div className="hero-photo-caption">
                  <span>MD. TANVIR HASAN AKASH</span>
                  <span>COMPUTER SCIENCE · DHAKA</span>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* EXPERTISE SECTION */}
      <section 
        id="expertise"
        className="px-6 md:px-12 lg:px-24 py-24 max-w-[1920px] mx-auto w-full relative z-10"
      >
        <ScrollReveal>
          <div className="mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-500 font-bold block mb-2">Capabilities</span>
            <h3 className="font-serif text-3xl sm:text-6xl md:text-7xl text-white tracking-tight">
              Arsenal & Expertise
            </h3>
          </div>
        </ScrollReveal>

        <motion.div 
          variants={staggerContainer}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "show"}
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
        >
          {expertise.map((item, idx) => (
            <motion.div 
              key={idx} 
              variants={staggerItem}
              onMouseEnter={handleHoverStart} 
              onMouseLeave={handleHoverEnd}
              className="group relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/40 transition-all duration-300 hover:bg-white/[0.04]"
            >
              <div className="mb-6 p-3 inline-block rounded-xl bg-black/60 border border-white/5 group-hover:border-amber-500/20 transition-colors">
                {item.icon}
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-3 tracking-wide">{item.title}</h4>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* STUDY TIMELINE */}
      <section
        id="study"
        className="study-section px-6 md:px-12 lg:px-24 py-24 max-w-[1920px] mx-auto w-full relative z-10 border-t border-white/5"
      >
        <ScrollReveal>
          <div className="study-intro">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-amber-500 font-bold block mb-3">Education · B.Sc. CSE</span>
              <h3 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white tracking-tight">How I learned<br className="hidden sm:block" /> to build.</h3>
            </div>
            <p>I studied computer science at Dhaka City College, moving from programming fundamentals into software design, systems, and visual computing.</p>
          </div>
        </ScrollReveal>

        <div className="study-grid" role="list" aria-label="Computer science study track">
          {studyYears.map((year, index) => (
            <motion.div
              key={year.focus}
              role="listitem"
              className="study-card"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 32, scale: .98 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="study-card-top">
                <span className="study-number">0{index + 1}</span>
                <span>YEAR 0{index + 1}</span>
              </div>
              <div className="study-progress">
                <motion.span
                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
                  whileInView={prefersReducedMotion ? undefined : { scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: .8, delay: .18 + index * .08, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: `${(index + 1) * 25}%`, transformOrigin: "left" }}
                />
              </div>
              <h4>{year.focus}</h4>
              <p>{year.topics}</p>
            </motion.div>
          ))}
        </div>

        <div className="study-footnote">
          <div>
            <span className="study-footnote-label">DEGREE</span>
            <strong>B.Sc. (Honours), Computer Science and Engineering</strong>
          </div>
          <div>
            <span className="study-footnote-label">COLLEGE</span>
            <span>Dhaka City College · National University Professional Programme</span>
          </div>
          <div>
            <span className="study-footnote-label">STATUS</span>
            <span>Final examinations completed October 2026; results pending.</span>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section 
        id="projects"
        className="px-6 md:px-12 lg:px-24 py-24 max-w-[1920px] mx-auto w-full relative z-10 border-t border-white/5"
      >
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 border-b border-white/5 pb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-amber-500 font-bold block mb-2">Selected Works</span>
              <h3 className="font-serif text-3xl sm:text-6xl md:text-7xl text-white tracking-tight">
                Flagship Software
              </h3>
            </div>
            <p className="text-neutral-400 max-w-sm text-xs sm:text-sm uppercase tracking-widest leading-relaxed">
              Engineering complex systems into clean, intuitive digital products.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-12 sm:gap-16">
          {projects.map((project, idx) => (
            <ScrollReveal key={idx}>
              <div 
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#0d0d10] border border-white/10 hover:border-amber-500/30 transition-all duration-500 ${project.featured ? 'xl:flex-row' : 'xl:flex-row-reverse'} min-h-[480px]`}
              >
                <div className="p-6 sm:p-14 xl:p-16 flex flex-col justify-center w-full xl:w-1/2">
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-amber-300/80 border border-amber-500/20 bg-amber-500/5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h5 className="text-amber-500 font-medium tracking-widest text-[11px] sm:text-xs uppercase mb-2">
                    {project.subtitle}
                  </h5>
                  <h4 className="font-serif text-2xl sm:text-5xl text-white mb-4 sm:mb-6 tracking-tight group-hover:text-amber-100 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-neutral-400 text-xs sm:text-base font-light leading-relaxed mb-6 sm:mb-8 max-w-xl">
                    {project.desc}
                  </p>
                  
                  <button 
                    onMouseEnter={handleHoverStart} 
                    onMouseLeave={handleHoverEnd}
                    className="flex items-center gap-3 text-white font-semibold group/btn w-fit text-xs tracking-widest uppercase"
                  >
                    View Case Study
                    <span className="p-2 sm:p-2.5 rounded-full bg-white/5 group-hover/btn:bg-amber-500 group-hover/btn:text-black transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>

                <div className={`relative w-full xl:w-1/2 h-[260px] sm:h-[320px] xl:h-auto overflow-hidden ${project.featured ? 'xl:border-l' : 'xl:border-r'} border-white/5`}>
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

      {/* CREATIVE PHOTOGRAPHY SHOWCASE */}
      <section 
        id="showcase"
        className="px-6 md:px-12 lg:px-24 py-24 max-w-[1920px] mx-auto w-full relative z-10 border-t border-white/5"
      >
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-amber-500 font-bold block mb-2">Captured Through My Lens</span>
              <h3 className="font-serif text-3xl sm:text-6xl md:text-7xl text-white tracking-tight">
                Photography Showcase
              </h3>
            </div>
            <p className="text-neutral-400 max-w-sm text-xs sm:text-sm uppercase tracking-widest leading-relaxed">
              Curated frames across astrophotography, nature, architecture, and street stories.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filter Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                onMouseEnter={handleHoverStart} 
                onMouseLeave={handleHoverEnd}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  activeFilter === cat 
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25 scale-105' 
                  : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-white/25'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Aspect-Ratio Smart Bento Grid with Hover Animations */}
        <motion.div layout className="bento-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredShowcase.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setLightboxData(item)}
                onMouseEnter={handleHoverStart} 
                onMouseLeave={handleHoverEnd}
                className={`size-${item.size} photo-shimmer group relative bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/15 transition-all duration-500`}
              >
                {/* Image with Smooth Zoom & Smart _2 Fallback */}
                <img 
                  src={item.img} 
                  alt={item.title} 
                  loading="lazy"
                  onError={(e) => handleImageFallback(e, item.img)}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 filter brightness-[0.88] contrast-[1.03] group-hover:brightness-105 group-hover:contrast-105"
                />
                
                {/* Subtle Vignette & Bottom Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 opacity-85 group-hover:opacity-95 transition-opacity duration-500" />
                
                {/* Inner Glowing Frame Border on Hover */}
                <div className="absolute inset-2 rounded-xl border border-amber-400/0 group-hover:border-amber-400/30 transition-colors duration-500 pointer-events-none z-20" />

                {/* Card Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 z-10">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-amber-400 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 group-hover:border-amber-500/40 transition-colors">
                      {item.type}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  
                  <div className="transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-white font-bold text-base sm:text-lg leading-tight group-hover:text-amber-200 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-neutral-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
                      <ImageIcon className="w-3 h-3 text-amber-400" /> Click to view full frame
                    </p>
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
        className="px-6 md:px-12 lg:px-24 py-24 mt-16 border-t border-white/5 relative z-10 text-center"
      >
        <ScrollReveal className="max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-500 font-bold block mb-3">Open to opportunities</span>
          <h2 className="font-serif text-4xl sm:text-7xl md:text-8xl text-white mb-6 tracking-tighter leading-none">
            Ready to <br />
            <span className="text-neutral-500 italic">contribute.</span>
          </h2>
          <p className="contact-intro">I bring a computer science foundation and hands-on work with React, Python, and interface design. I’m looking for a junior frontend or software role where I can contribute to a real product and keep growing with the team.</p>
          
          <button 
            onMouseEnter={handleHoverStart} 
            onMouseLeave={handleHoverEnd}
            className="inline-flex items-center gap-3 px-8 py-3.5 sm:px-9 sm:py-4 mt-6 rounded-full bg-amber-500 text-black font-bold tracking-widest uppercase text-xs hover:bg-amber-400 hover:scale-105 transition-all duration-300 shadow-xl shadow-amber-500/20"
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </button>

          <div className="mt-20 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 border-t border-white/10 pt-8 uppercase tracking-widest gap-4">
            <p>© {new Date().getFullYear()} Md. Tanvir Hasan Akash. All rights reserved.</p>
            <div className="flex gap-6 sm:gap-8">
              <a href="#" className="hover:text-amber-400 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-amber-400 transition-colors">GitHub</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Instagram</a>
            </div>
          </div>
        </ScrollReveal>
      </footer>

      {/* FULL-FRAME LIGHTBOX MODAL (RESPECTS TRUE ASPECT RATIO) */}
      <AnimatePresence>
        {lightboxData && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxData(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-10"
          >
            <motion.div 
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[90vh] bg-[#0b0b0e] border border-white/15 rounded-2xl overflow-hidden flex flex-col items-center justify-center shadow-2xl"
            >
              <button 
                onClick={() => setLightboxData(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-amber-400 transition-colors z-20 p-2.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              <img 
                src={lightboxData.img} 
                alt={lightboxData.title} 
                onError={(e) => handleImageFallback(e, lightboxData.img)}
                className="max-h-[78vh] w-auto object-contain bg-black"
              />
              
              <div className="w-full p-5 sm:p-6 bg-[#0d0d11] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-amber-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase block mb-0.5">
                    {lightboxData.type}
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl text-white">
                    {lightboxData.title}
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">
                  Md. Tanvir Hasan Akash Photography
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
