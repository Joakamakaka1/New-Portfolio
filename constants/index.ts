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
      repo: "https://github.com/Joakamakaka1/Valorant-Fantasy.git",
    },
  },
  {
    id: "aurevia",
    title: "Aurevia",
    description:
      "Plataforma social de viajes inteligentes con IA para descubrir nuevos destinos y planificar viajes personalizados.",
    images: ["/Prueba3.png", "/Prueba5.png"],
    technologies: [
      "Angular",
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
      repo: "https://github.com/Joakamakaka1/Aurevia-Backend.git",
    },
  },
  {
    id: "team-up",
    title: "Team Up",
    description:
      "Plataforma para encontrar compañeros de estudio y trabajo mediante solicitudes personalizadas y creación de los grupos mediante un bot con IA integrada controlando el estado de los grupos y la gestión de los mismos.",
    images: ["/Prueba.png"],
    technologies: [],
    status: "pending",
    links: {},
  },
  {
    id: "better-life",
    title: "Better Life",
    description:
      "Aplicación de hábitos y bienestar personal para llevar un seguimiento de objetivos diarios y progreso personal. Próximamente.",
    images: ["/Prueba2.png"],
    technologies: [],
    status: "pending",
    links: {},
  },
  {
    id: "pendia",
    title: "PendIA",
    description:
      "Gestor de pagos inteligentes con IA para priorizar y organizar pagos pendientes. Próximamente.",
    images: ["/Prueba3.png"],
    technologies: [],
    status: "pending",
    links: {},
  },
  {
    id: "travel-ia-world",
    title: "Travel IA World",
    description:
      "Planificador de viajes impulsado por IA que genera itinerarios personalizados, sugiere destinos y optimiza rutas. Próximamente.",
    images: ["/Prueba5.png"],
    technologies: [],
    status: "pending",
    links: {},
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
    name: "FastAPI",
    type: "Backend",
    color: "from-emerald-500 to-teal-600",
    iconKey: "SiFastapi",
  },
  {
    id: 10,
    name: "Spring Boot",
    type: "Backend",
    color: "from-green-500 to-green-700",
    iconKey: "SiSpringboot",
  },
  {
    id: 11,
    name: "MySQL",
    type: "Base de Datos",
    color: "from-blue-600 to-blue-800",
    iconKey: "SiMysql",
  },
  {
    id: 12,
    name: "Docker",
    type: "DevOps",
    color: "from-sky-400 to-blue-600",
    iconKey: "FaDocker",
  },
  {
    id: 13,
    name: "Kubernetes",
    type: "DevOps",
    color: "from-blue-500 to-indigo-700",
    iconKey: "SiKubernetes",
  },
  {
    id: 14,
    name: "Git",
    type: "Herramienta",
    color: "from-orange-500 to-red-500",
    iconKey: "FaGitAlt",
  },
  {
    id: 15,
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
    iconKey: "FaBriefcase",
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
