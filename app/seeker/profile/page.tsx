import { getLoggedInUser } from "@/app/actions/auth.actions";
import { getResume } from "@/app/actions/seeker.actions";
import EducationCard from "@/components/seeker/profile/EducationCard";
import ExperienceCard from "@/components/seeker/profile/ExperienceCard";
import ProfileCard from "@/components/seeker/profile/ProfileCard";
import ProjectCard from "@/components/seeker/profile/ProjectCard";
import ResumeCard from "@/components/seeker/profile/ResumeCard";
import SkillsCard from "@/components/seeker/profile/SkillsCard";
import { LoggedInUser } from "@/types/loggedInUser";

export default async function Profile() {
  const userResponse = await getLoggedInUser();
  const user = userResponse.data as LoggedInUser;

  const resume = await getResume();
  return (
    <main className="w-full flex flex-col items-center gap-2 md:gap-6 lg:gap-8 px-2 md:px-6 lg:px-0 py-2 md:py-6 lg:py-8">
      <ProfileCard user={user} />
      <SkillsCard />
      <ExperienceCard />
      <ProjectCard />
      <ResumeCard resume={resume} />
      <EducationCard />
    </main>
  );
}
