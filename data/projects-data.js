const PROJECTS = [
  {
    id: "oxford-bikes",
    title: "Oxford Bikes",
    subtitle: "Brand & B2B Wholesale Shop",
    year: "2026",
    type: "Shopify",
    accent: "#c8f060",
    gradient: "linear-gradient(135deg,#1a1a18 0%,#222218 100%)",
    tags: ["Shopify", "Liquid", "B2B", "CSS"],
    summary: "Two interconnected Shopify experiences: the brand site and a full B2B wholesale platform. Custom theme development, advanced price display logic, responsive grids, and multilingual cart flow.",
    description: [
      "Oxford Bikes needed both a public-facing brand presence and a private B2B ordering portal for wholesale customers. The challenge was building two cohesive Shopify experiences that shared a visual language while serving fundamentally different audiences.",
      "The B2B shop features a custom price display system with tiered pricing, a 'Uw prijs' consumer reference label, stock badges, and a sticky sidebar. The cart includes multilingual shipping notices in Dutch, French, and English using Shopify's i18n system.",
      "The brand site focuses on storytelling and product discovery, with a modernised collection grid, hover effects, discount badges, and colour swatches — all built within Shopify's Liquid templating and Dawn theme architecture."
    ],
    links: [
      { label: "oxfordbikes.be", url: "https://oxfordbikes.be" },
      { label: "shop.oxfordbikes.be", url: "https://shop.oxfordbikes.be" }
    ],
    featured: true
  },
  {
    id: "zannata",
    title: "Zannata",
    subtitle: "Business Website",
    year: "2025",
    type: "Webflow",
    accent: "#ff858b",
    gradient: "linear-gradient(135deg,#180e0e 0%,#241414 100%)",
    tags: ["Webflow", "UI Design"],
    summary: "Fully custom Webflow build for Zannata. Responsive design, animations, and a clean content architecture — built from scratch without templates.",
    description: [
      "Zannata required a professional business website that felt custom-built rather than template-driven. Working entirely in Webflow, the site was designed and developed from scratch with a focus on clean typography, structured content sections, and smooth scroll animations.",
      "The project involved close collaboration on brand identity — translating visual guidelines into a cohesive web presence. Responsive across all breakpoints with careful attention to layout shifts and readability on mobile.",
      "Interactions and animations were handled natively in Webflow to avoid performance overhead, while maintaining a polished, intentional feel on first load and during navigation."
    ],
    links: [
      { label: "zannata.be", url: "https://zannata.be" }
    ],
    featured: false
  },
  {
    id: "legolads",
    title: "LegoLads",
    subtitle: "Full-stack Web Application",
    year: "2025",
    type: "Express.js",
    accent: "#e8d5a3",
    gradient: "linear-gradient(135deg,#1a1008 0%,#241800 100%)",
    tags: ["Express.js", "TypeScript", "Supabase", "MongoDB"],
    summary: "A full-stack Express/TypeScript application combining Supabase and MongoDB. Deployed on Render with a complete backend API and dynamic front-end.",
    description: [
      "LegoLads is a full-stack web application built with Express.js and TypeScript on the backend. The project uses a hybrid database approach: Supabase (PostgreSQL) for structured relational data and MongoDB for flexible document storage, each serving different data needs.",
      "The backend exposes a REST API with typed route handlers, middleware for auth, and clear separation between data layers. TypeScript throughout ensures type safety from database queries to HTTP responses.",
      "Deployed on Render with environment-based configuration. The frontend is served via EJS templates with progressive enhancement and no heavy client-side framework dependencies."
    ],
    links: [
      { label: "View live", url: "https://lego-lads.onrender.com/" }
    ],
    featured: false
  },
  {
    id: "recuedle",
    title: "ReCuedle",
    subtitle: "Daily Word Game",
    year: "2024",
    type: "Vanilla JS",
    accent: "#c8f060",
    gradient: "linear-gradient(135deg,#0a1a14 0%,#0f2018 100%)",
    tags: ["HTML", "CSS", "JavaScript"],
    summary: "A browser-based daily word game built with vanilla HTML, CSS, and JavaScript. Zero dependencies, fast load, and a polished play experience.",
    description: [
      "ReCuedle is a Wordle-style daily word game built entirely with vanilla HTML, CSS, and JavaScript — no frameworks, no build step, no dependencies. The goal was maximum performance and simplicity.",
      "Game state is persisted in localStorage so progress survives page refreshes. The daily word is derived deterministically from the current date, ensuring all players tackle the same puzzle each day without a backend.",
      "The UI uses CSS Grid and custom properties for the letter tile animations, with keyboard support for both on-screen and physical keyboards. Accessibility was a priority — focus management and ARIA live regions announce results to screen readers."
    ],
    links: [
      { label: "Play now", url: "https://recuedle.com/" }
    ],
    featured: false
  },
  {
    id: "ardacraft",
    title: "ArdaCraft Map",
    subtitle: "Middle-earth Interactive Map",
    year: "2024",
    type: "Leaflet.js",
    accent: "#b89cf0",
    gradient: "linear-gradient(135deg,#100c1a 0%,#1a1525 100%)",
    tags: ["Webflow", "Leaflet.js", "JavaScript"],
    summary: "An interactive map of Middle-earth built with Leaflet.js and Webflow. Custom tile layers, point-of-interest markers, and smooth zoom navigation.",
    description: [
      "ArdaCraft is a Minecraft server recreating Middle-earth at 1:58 scale. This interactive map gives players and visitors a way to explore the world, find locations, and understand the scale of the build project.",
      "Built using Leaflet.js embedded inside a Webflow page, with custom tile layers generated from the in-game map renders. Hundreds of points of interest are marked with custom icons grouped by category — cities, fortresses, rivers, roads.",
      "JavaScript handles dynamic filtering of markers, custom popup content, and URL-based deep linking to specific coordinates so players can share exact locations. The tile system handles seamless zoom from continent-wide view down to street level."
    ],
    links: [
      { label: "Explore map", url: "https://www.ardacraft.me/map/middle-earth-interactive-map" }
    ],
    featured: false
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    subtitle: "enritix.be",
    year: "2026",
    type: "HTML / CSS / JS",
    accent: "#c8f060",
    gradient: "linear-gradient(135deg,#0c1a0a 0%,#121f10 100%)",
    tags: ["HTML", "CSS", "JavaScript"],
    summary: "Hand-coded portfolio with zero dependencies. Dark editorial aesthetic, CSS Grid, scroll-triggered animations, and full responsiveness.",
    description: [
      "A deliberately hand-coded portfolio without frameworks, build tools, or dependencies. The goal was to demonstrate that polished, modern web experiences don't require heavy tooling.",
      "The design uses a dark editorial aesthetic with DM Serif Display for display headings, DM Mono for UI labels and code-like details, and DM Sans for body text. The colour system is built on CSS custom properties for easy theming.",
      "Performance was a priority: a single HTML file, one CSS stylesheet, inline SVG icons, and a minimal JavaScript file. IntersectionObserver drives scroll-triggered reveals without any animation library."
    ],
    links: [
      { label: "View source", url: "https://github.com/Enritix/enritix.github.io" }
    ],
    featured: false
  }
];

if (typeof module !== "undefined") module.exports = PROJECTS;
