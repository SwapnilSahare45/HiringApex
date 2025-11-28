import EducationCard from "@/components/profile/EducationCard";
import ExperienceCard from "@/components/profile/ExperienceCard";
import ProfileCard from "@/components/profile/ProfileCard";
import ProjectCard from "@/components/profile/ProjectCard";
import ResumeCard from "@/components/profile/ResumeCard";
import SkillsCard from "@/components/profile/SkillsCard";
import { getLoggedInUser } from "@/lib/auth";
import { LoggedInUser } from "@/types/loggedInUser";

export default async function ProfilePage() {
  const userResponse = await getLoggedInUser();

  if (!userResponse.success) {
    return <p>User profile not load.</p>;
  }

  const user = JSON.parse(userResponse.data as string) as LoggedInUser;

  return (
    <main className="w-full flex flex-col items-center gap-6 py-8">
      <ProfileCard user={user} />

      <ResumeCard user={user} />

      <SkillsCard />

      <ExperienceCard />

      <EducationCard />

      <ProjectCard />
    </main>
  );
}
