const PROJECTS = [
  {
    id: "oxford-bikes",
    title: "Oxford Bikes",
    subtitle: "Brand & B2B Wholesale Shop",
    year: "2026",
    type: "Shopify",
    accent: "#7CFF6B",
    gradient: "linear-gradient(135deg,#141a14 0%,#1f2a1f 100%)",
    tags: ["Shopify", "Liquid", "B2B", "CSS"],
    summary: "Two interconnected Shopify experiences: brand site and B2B wholesale platform.",
    description: [
      "Oxford Bikes required both a public-facing brand presence and a fully functional B2B wholesale environment. The challenge was to design two interconnected Shopify experiences that shared a consistent visual identity while serving completely different user flows and business logic.",
      "The B2B platform introduces tiered pricing structures, stock visibility indicators, and a customized checkout experience with multilingual support for Dutch, French and English customers. This required extending Shopify’s default behaviour using Liquid logic and theme customization.",
      "The brand website focuses more on storytelling and product discovery, with a redesigned collection layout, hover interactions, discount badges and colour swatches. The goal was to elevate the standard Shopify experience into a more premium, conversion-focused storefront."
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
    accent: "#FF5C7A",
    gradient: "linear-gradient(135deg,#1a0c10 0%,#2a1418 100%)",
    tags: ["Webflow", "UI Design"],
    summary: "Custom Webflow business website built from scratch.",
    description: [
      "Zannata was developed as a fully custom Webflow build, created from scratch without relying on templates. The goal was to translate brand identity into a digital experience with a strong focus on typography, spacing and visual hierarchy.",
      "The project required careful structuring of content sections to ensure clarity and readability across all devices. Each section was designed with responsiveness in mind, ensuring smooth layout transitions between desktop, tablet and mobile.",
      "Subtle scroll-based animations and interactions were implemented directly within Webflow, creating a polished and modern feel while maintaining performance efficiency and avoiding unnecessary complexity."
    ],
    links: [
      { label: "zannata.be", url: "https://zannata.be" }
    ],
    featured: false
  },

  {
    id: "legolads",
    title: "LegoLads",
    subtitle: "Full-stack Web Application (Academic Project)",
    year: "2025",
    type: "Express.js",
    accent: "#FFD36E",
    gradient: "linear-gradient(135deg,#1a1408 0%,#2a1f10 100%)",
    tags: ["Express.js", "TypeScript", "Supabase", "MongoDB"],
    summary: "Full-stack application with hybrid database architecture.",
    description: [
      "LegoLads is a full-stack web application built with Express.js and TypeScript, developed as part of an academic project. The system uses a hybrid database architecture combining Supabase (PostgreSQL) for structured relational data and MongoDB for more flexible document-based storage.",
      "The backend exposes a RESTful API with strongly typed route handlers, middleware-based authentication, and a clear separation of concerns between services and data access layers. TypeScript is used throughout to ensure type safety from database operations to API responses.",
      "The application is deployed on Render with environment-based configuration. The frontend is rendered using EJS templates with progressive enhancement, avoiding heavy client-side frameworks while still maintaining a dynamic user experience."
    ],
    links: [
      { label: "View live", url: "https://lego-lads.onrender.com/" }
    ],
    featured: false
  },

  {
    id: "recuedle",
    title: "ReCuedle",
    subtitle: "Daily Song Guessing Game",
    year: "2024",
    type: "Vanilla JS",
    accent: "#FF4FA3",
    gradient: "linear-gradient(135deg,#120812 0%,#1f0f1a 100%)",
    tags: ["HTML", "CSS", "JavaScript", "SoundCloud API"],
    summary: "Daily music guessing game using SoundCloud embeds.",
    description: [
      "ReCuedle is a browser-based daily song guessing game built entirely with vanilla HTML, CSS and JavaScript. Each day, players are presented with a new track embedded via SoundCloud and must identify the correct song based on short audio previews.",
      "The game is fully client-side, with no backend dependency. The daily track selection is determined deterministically based on the current date, ensuring that all users receive the same challenge each day.",
      "Additional features include persistent game state using localStorage, keyboard support, and accessibility enhancements such as focus management and screen-reader announcements for game results."
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
    accent: "#A88CFF",
    gradient: "linear-gradient(135deg,#0f0b1a 0%,#1a1425 100%)",
    tags: ["Leaflet.js", "Webflow", "JavaScript"],
    summary: "Interactive Minecraft world map using custom tiles.",
    description: [
      "ArdaCraft is a large-scale Minecraft project recreating Middle-earth at a 1:58 scale. This interactive map was built to allow players and visitors to explore the world visually and navigate between key locations.",
      "The system is built using Leaflet.js embedded within a Webflow environment, with custom tile layers generated from in-game map renders. The map includes hundreds of categorized points of interest such as cities, fortresses, rivers and roads.",
      "JavaScript is used for dynamic marker filtering, custom popups, and deep-linking functionality that allows users to share exact coordinates. The tile system supports seamless zooming from continent-level views down to detailed local areas."
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
    accent: "#FFFFFF",
    gradient: "linear-gradient(135deg,#0a0a0a 0%,#141414 100%)",
    tags: ["HTML", "CSS", "JavaScript"],
    summary: "Minimal hand-coded portfolio with zero dependencies.",
    description: [
      "This portfolio is a deliberately hand-coded project built without frameworks, build tools or external dependencies. The objective was to demonstrate that modern, high-quality web experiences can be achieved with minimal technology.",
      "The design follows a dark editorial aesthetic, combining typography choices such as DM Serif Display, DM Mono and DM Sans to create a clear visual hierarchy. The entire layout system is built using CSS Grid and custom properties for easy theming and scalability.",
      "Performance was a key focus throughout development. The site uses a single HTML file, a lightweight CSS stylesheet, inline SVG assets and minimal JavaScript. Scroll-based animations are handled using IntersectionObserver to avoid relying on heavy animation libraries."
    ],
    links: [
      { label: "View source", url: "https://github.com/Enritix/enritix.github.io" }
    ],
    featured: false
  },

  {
    id: "attivo",
    title: "Attivo",
    subtitle: "Fitness Equipment Webshop (Academic Project)",
    year: "2024",
    type: "E-commerce",
    accent: "#4DFF88",
    gradient: "linear-gradient(135deg,#0f1a12 0%,#16261a 100%)",
    tags: ["HTML", "CSS", "JavaScript"],
    summary: "Fitness webshop focused on usability and conversion.",
    description: [
      "Attivo is a fitness equipment webshop developed as an academic project, focusing on product presentation, usability and conversion-oriented design.",
      "The platform was designed with a mobile-first approach, ensuring a consistent and accessible experience across all device sizes. The interface prioritizes clarity in product browsing and selection.",
      "The project emphasizes clean UI structure, fast navigation and straightforward user interaction patterns, aiming to simulate a real-world e-commerce experience."
    ],
    links: [],
    featured: false
  },

  {
    id: "vdbparts",
    title: "VDBParts",
    subtitle: "Webshop / Parts Platform",
    year: "2025",
    type: "E-commerce",
    accent: "#8FB7FF",
    gradient: "linear-gradient(135deg,#0b1620 0%,#162436 100%)",
    tags: ["Webshop", "HTML", "CSS", "JavaScript"],
    summary: "Parts webshop platform with structured catalog browsing.",
    description: [
      "VDBParts is a structured webshop platform focused on automotive and parts-related product listings.",
      "The system is designed around clear categorization and intuitive navigation, allowing users to quickly browse through large sets of products.",
      "The main goal of the project was to optimize clarity, speed and usability in a catalog-heavy environment."
    ],
    links: [],
    featured: false
  },

  {
    id: "vapormoon-games",
    title: "Vapormoon Games",
    subtitle: "Gaming Website Platform (Academic Project)",
    year: "2024",
    type: "Web Platform",
    accent: "#6F7CFF",
    gradient: "linear-gradient(135deg,#0b1020 0%,#151c2f 100%)",
    tags: ["HTML", "CSS", "JavaScript"],
    summary: "Gaming website platform built for structured game content.",
    description: [
      "Vapormoon Games is a structured gaming website developed as part of an academic project.",
      "The platform was designed to support modular content, making it scalable for future game additions and feature expansions.",
      "A responsive navigation system and structured layout ensure usability across different screen sizes while maintaining a consistent visual hierarchy."
    ],
    links: [],
    featured: false
  },

  {
    id: "medikits",
    title: "Medikits",
    subtitle: "Medical Kits Dashboard Platform",
    year: "2025",
    type: "React (Vite)",
    accent: "#FF4D6D",
    gradient: "linear-gradient(135deg,#1a0f10 0%,#2a1418 100%)",
    tags: ["React", "Vite", "shadcn/ui", "Dashboard", "REST API"],
    summary: "Dashboard for managing medical kits, users and analytics.",
    description: [
      "Medikits is a full-featured dashboard platform built with React (Vite) and shadcn/ui, designed to manage medical kits, their contents, and operational data across multiple user roles.",
      "The system supports different user types such as admins, resellers, customers and site managers, each with role-based access to relevant data and actions.",
      "It integrates with a RESTful API client to communicate with a backend service, handling all data operations such as kits, inventory and user management.",
      "A built-in analytics section visualizes historical trends over the past months using curve-based charts for stock levels, usage and performance metrics.",
      "The platform is also connected to an SMTP service that automatically sends email notifications when kit items are low in stock or marked as defective."
    ],
    links: [],
    featured: false
  }
];

if (typeof module !== "undefined") module.exports = PROJECTS;