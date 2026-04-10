import type { NavItem, NavLink, Project } from "@/types";

// ─── Navegación Sidebar ────────────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { name: "Descubrir", path: "/" },
  { name: "Experiencia", path: "/experiencia" },
  { name: "Habilidades", path: "/habilidades" },
  { name: "Proyectos", path: "/proyectos" },
  { name: "Contacto", path: "/contacto" },
];

// ─── Navegación (legacy links) ─────────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: "Yo", href: "/#yo" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Contáctame", href: "/contacto" },
];

// ─── Proyectos ─────────────────────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: "travel-ai-world",
    title: "Travel AI World",
    description:
      "Plataforma de viajes inteligente impulsada por IA. Incluye un scraper de datos turísticos, un backend con FastAPI y un frontend moderno. Genera itinerarios personalizados y sugiere destinos optimizando rutas.",
    images: ["/Prueba5.png", "/Prueba3.png"],
    technologies: [
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "Web Scraping",
      "IA",
    ],
    status: "in-progress",
    links: {
      repo: "https://github.com/Joakamakaka1/travel-ai-world",
    },
  },
  {
    id: "actividad-modulo-2",
    title: "Actividad Módulo 2",
    description:
      "API REST completa con FastAPI y PostgreSQL, dockerizada con Docker Compose. Incluye operaciones CRUD, validaciones, manejo de errores (400/404), logging y tests automatizados.",
    images: ["/Prueba6.png", "/Prueba2.png"],
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Docker Compose",
      "Pytest",
    ],
    status: "completed",
    links: {
      repo: "https://github.com/Joakamakaka1/Actividad-Modulo-2",
    },
  },
  {
    id: "valorant-fantasy",
    title: "Valorant Fantasy",
    description:
      "Plataforma de fantasy gaming centrada en Valorant. Gestión de equipos, ligas personalizadas y estadísticas en tiempo real de jugadores profesionales.",
    images: ["/Prueba.png", "/Prueba2.png"],
    technologies: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "Redis",
      "MySQL",
      "JWT",
      "Docker",
      "Docker Compose",
    ],
    status: "in-progress",
    links: {
      repo: "https://github.com/Joakamakaka1/Valorant-Fantasy",
    },
  },
  {
    id: "aurevia-backend",
    title: "Aurevia",
    description:
      "Backend de plataforma social de viajes inteligentes con IA. Arquitectura modular con FastAPI, autenticación JWT, caché Redis y base de datos MySQL. Descubre destinos y planifica viajes personalizados.",
    images: ["/Prueba3.png", "/Prueba5.png"],
    technologies: [
      "FastAPI",
      "Python",
      "MySQL",
      "Redis",
      "JWT",
      "Docker",
      "Docker Compose",
      "Angular",
      "TypeScript",
    ],
    status: "in-progress",
    links: {
      repo: "https://github.com/Joakamakaka1/Aurevia-Backend",
    },
  },
];

// ─── Skills (serializable — icons resolved client-side in HabilidadesContent) ──
export const SKILLS_DATA = [
  {
    id: 1,
    name: "React",
    type: "Frontend",
    color: "from-cyan-400 to-blue-500",
    iconKey: "FaReact",
  },
  {
    id: 2,
    name: "Next.js",
    type: "Frontend",
    color: "from-neutral-800 to-neutral-950",
    iconKey: "SiNextdotjs",
  },
  {
    id: 3,
    name: "Angular",
    type: "Frontend",
    color: "from-red-500 to-red-700",
    iconKey: "FaAngular",
  },
  {
    id: 4,
    name: "Tailwind CSS",
    type: "Frontend",
    color: "from-teal-400 to-cyan-500",
    iconKey: "SiTailwindcss",
  },
  {
    id: 5,
    name: "TypeScript",
    type: "Lenguaje",
    color: "from-blue-500 to-blue-700",
    iconKey: "SiTypescript",
  },
  {
    id: 6,
    name: "JavaScript",
    type: "Lenguaje",
    color: "from-yellow-400 to-yellow-500",
    iconKey: "SiJavascript",
  },
  {
    id: 7,
    name: "Python",
    type: "Lenguaje",
    color: "from-blue-400 to-yellow-400",
    iconKey: "FaPython",
  },
  {
    id: 8,
    name: "Java",
    type: "Lenguaje",
    color: "from-orange-500 to-red-600",
    iconKey: "FaJava",
  },
  {
    id: 9,
    name: "Go",
    type: "Lenguaje",
    color: "from-cyan-400 to-blue-600",
    iconKey: "SiGo",
  },
  {
    id: 10,
    name: "FastAPI",
    type: "Backend",
    color: "from-emerald-500 to-teal-600",
    iconKey: "SiFastapi",
  },
  {
    id: 11,
    name: "Spring Boot",
    type: "Backend",
    color: "from-green-500 to-green-700",
    iconKey: "SiSpringboot",
  },
  {
    id: 12,
    name: "Node.js",
    type: "Backend",
    color: "from-green-500 to-green-700",
    iconKey: "SiNodedotjs",
  },
  {
    id: 13,
    name: "Nest.js",
    type: "Backend",
    color: "from-red-600 to-red-700",
    iconKey: "SiNestjs",
  },
  {
    id: 14,
    name: "MySQL",
    type: "Base de Datos",
    color: "from-blue-600 to-blue-800",
    iconKey: "SiMysql",
  },
  {
    id: 15,
    name: "Docker",
    type: "DevOps",
    color: "from-sky-400 to-blue-600",
    iconKey: "FaDocker",
  },
  {
    id: 16,
    name: "Kubernetes",
    type: "DevOps",
    color: "from-blue-500 to-indigo-700",
    iconKey: "SiKubernetes",
  },
  {
    id: 17,
    name: "Git",
    type: "Herramienta",
    color: "from-orange-500 to-red-500",
    iconKey: "FaGitAlt",
  },
  {
    id: 18,
    name: "Figma",
    type: "Diseño",
    color: "from-purple-500 to-pink-500",
    iconKey: "FaFigma",
  },
] as const;

// ─── Experience (serializable — icons resolved client-side in ExperienciaContent) ─
export const EXPERIENCE_DATA = [
  {
    id: 1,
    title: "Desarrollador de aplicaciones web",
    entity: "Moyseafood",
    date: "Abr 2025 - Jun 2025",
    type: "Trabajo" as const,
    description:
      "Desarrollo de aplicaciones móviles con React y Ionic. Consumo e implementación de API REST para conectarlo al FrontEnd.",
    color: "from-blue-500 to-blue-700",
    iconKey: "FaLaptopCode",
  },
  {
    id: 2,
    title: "Desarrollador de aplicaciones web",
    entity: "Libnamic Consulting",
    date: "Abr 2024 - Jun 2024",
    type: "Trabajo" as const,
    description:
      "Desarrollo de aplicaciones web usando Vue.js y Angular. Implementación y consumo de API REST. Uso del sistema ERP ODOO.",
    color: "from-cyan-500 to-teal-600",
    iconKey: "FaLaptopCode",
  },
  {
    id: 3,
    title: "Desarrollador junior IA",
    entity: "Air Europa",
    date: "Marzo 2026 - Actual",
    type: "Trabajo" as const,
    description:
      "Desarrollo y soporte de microservicios y librerias internas y automatizacion de procesos con IA",
    color: "from-orange-500 to-orange-700",
    iconKey: "FaLaptopCode",
  },
];

// ─── Studies (serializable) ────────────────────────────────────────────────────
export const STUDIES_DATA = [
  {
    id: 4,
    title: "Máster IA, Cloud Computing y DevOps",
    entity: "PontIA",
    date: "Actual",
    type: "Estudio" as const,
    description: "Máster en Inteligencia Artificial, Cloud Computing y DevOps",
    color: "from-indigo-500 to-indigo-700",
    iconKey: "FaGraduationCap",
  },
  {
    id: 5,
    title: "Desarrollo de aplicaciones web (DAW)",
    entity: "IES Rafael Alberti",
    date: "Sep 2024 - Jun 2025",
    type: "Estudio" as const,
    description:
      "Grado Superior en desarrollo de aplicaciones del lado del cliente y servidor y despliegue de estas mismas.",
    color: "from-red-500 to-red-700",
    iconKey: "FaGraduationCap",
  },
  {
    id: 6,
    title: "Desarrollo de aplicaciones mutiplaforma (DAM)",
    entity: "Staff Formación",
    date: "Sep 2022 - Jun 2024",
    type: "Estudio" as const,
    description:
      "Grado Superior centrado en el desarrollo de aplicaciones móviles y de escritorio, y en el manejo de base de datos.",
    color: "from-orange-500 to-orange-700",
    iconKey: "FaGraduationCap",
  },
];
