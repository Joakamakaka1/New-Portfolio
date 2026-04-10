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

// ─── GitHub ───────────────────────────────────────────────────────────────────
export interface GitHubProfile {
  login: string;
  name: string;
  avatarUrl: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  createdAt: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  updatedAt: string;
  createdAt: string;
  isPrivate: boolean;
  defaultBranch: string;
}
