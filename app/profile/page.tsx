import EducationCard from "@/components/profile/EducationCard";
import ExperienceCard from "@/components/profile/ExperienceCard";
import ProfileCard from "@/components/profile/ProfileCard";
import ProjectCard from "@/components/profile/ProjectCard";
import ResumeCard from "@/components/profile/ResumeCard";
import SkillsCard from "@/components/profile/SkillsCard";

export default function ProfilePage() {
    return (
        <main className="w-full flex flex-col items-center gap-6 py-8">
            <ProfileCard />

            <ResumeCard />

            <SkillsCard/>

            <ExperienceCard />

            <EducationCard/>

            <ProjectCard/>
        </main>
    )
}