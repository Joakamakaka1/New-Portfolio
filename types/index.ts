// ─── Navigation ────────────────────────────────────────────────────────────────
export interface NavItem {
  name: string;
  path: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon?: string;
}

// ─── Home ──────────────────────────────────────────────────────────────────────
export interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
}

// ─── Projects ─────────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  status: "pending" | "in-progress" | "completed";
  links: {
    live?: string;
    repo?: string;
  };
}

// ─── Skills (serializable — icons resolved client-side) ────────────────────────
export interface SkillData {
  id: number;
  name: string;
  type: string;
  color: string;
  iconKey: string;
}

// ─── Experience (serializable — icons resolved client-side) ───────────────────
export interface ExperienceData {
  id: number;
  title: string;
  entity: string;
  date: string;
  type: "Trabajo" | "Estudio";
  description: string;
  color: string;
  iconKey: string;
}
