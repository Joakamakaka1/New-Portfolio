import HomeContent from "@/components/features/home/HomeContent";
import {
  getGitHubProfile,
  getLatestRepositories,
} from "@/lib/github";

export default async function Descubrir() {
  const [profile, latestRepos] = await Promise.all([
    getGitHubProfile(),
    getLatestRepositories(3),
  ]);

  return <HomeContent profile={profile} latestRepos={latestRepos} />;
}
