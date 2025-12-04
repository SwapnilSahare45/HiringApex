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

  const resume = await getResume(user._id);
  return (
    <main className="w-full flex flex-col items-center gap-6 py-8">
      <ProfileCard user={user} />
      <SkillsCard user={user} />
      <ExperienceCard user={user} />
      <ProjectCard user={user} />
      <ResumeCard user={user} resume={resume} />
      <EducationCard user={user} />
    </main>
  );
}
