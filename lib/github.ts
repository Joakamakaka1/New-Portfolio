import type { GitHubProfile, GitHubRepository } from "@/types";

// ─── Config ────────────────────────────────────────────────────────────────────
const GITHUB_USERNAME = "Joakamakaka1";
const GITHUB_API_BASE = "https://api.github.com";

/** Revalidate GitHub data every hour to stay fresh without hitting rate limits */
const REVALIDATE_SECONDS = 3600;

// ─── Raw API response types (snake_case → camelCase mapping) ───────────────────
interface GitHubUserResponse {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GitHubRepoResponse {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  private: boolean;
  default_branch: string;
}

// ─── Mappers ───────────────────────────────────────────────────────────────────
function mapProfile(raw: GitHubUserResponse): GitHubProfile {
  return {
    login: raw.login,
    name: raw.name ?? raw.login,
    avatarUrl: raw.avatar_url,
    profileUrl: raw.html_url,
    publicRepos: raw.public_repos,
    followers: raw.followers,
    following: raw.following,
    createdAt: raw.created_at,
  };
}

function mapRepository(raw: GitHubRepoResponse): GitHubRepository {
  return {
    id: raw.id,
    name: raw.name,
    fullName: raw.full_name,
    description: raw.description,
    htmlUrl: raw.html_url,
    language: raw.language,
    stargazersCount: raw.stargazers_count,
    forksCount: raw.forks_count,
    updatedAt: raw.updated_at,
    createdAt: raw.created_at,
    isPrivate: raw.private,
    defaultBranch: raw.default_branch,
  };
}

// ─── Public API ────────────────────────────────────────────────────────────────

/**
 * Fetches the GitHub profile for the configured user.
 * Uses Next.js ISR with 1-hour revalidation.
 */
export async function getGitHubProfile(): Promise<GitHubProfile> {
  const res = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  const data: GitHubUserResponse = await res.json();
  return mapProfile(data);
}

/**
 * Fetches the most recently updated public repositories.
 * @param count — number of repositories to return (default 3)
 */
export async function getLatestRepositories(
  count = 3,
): Promise<GitHubRepository[]> {
  const res = await fetch(
    `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=${count}&type=public`,
    { next: { revalidate: REVALIDATE_SECONDS } },
  );

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  const data: GitHubRepoResponse[] = await res.json();
  return data.map(mapRepository);
}

/**
 * Fetches specific repositories by their slug names.
 * Useful for the hand-picked projects section.
 * @param slugs — array of repository names (e.g. ["travel-ai-world", "Aurevia-Backend"])
 */
export async function getProjectRepositories(
  slugs: string[],
): Promise<GitHubRepository[]> {
  const results = await Promise.allSettled(
    slugs.map(async (slug) => {
      const res = await fetch(
        `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${slug}`,
        { next: { revalidate: REVALIDATE_SECONDS } },
      );

      if (!res.ok) return null;

      const data: GitHubRepoResponse = await res.json();
      return mapRepository(data);
    }),
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<GitHubRepository | null> =>
        r.status === "fulfilled" && r.value !== null,
    )
    .map((r) => r.value!);
}
