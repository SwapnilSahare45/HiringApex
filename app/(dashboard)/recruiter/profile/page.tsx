import JobPostingCard from "@/components/profile/JobPostingCard";
import { RecruiterProfileCard } from "@/components/profile/RecruiterProfileCard";

export default async function RecruiterProfile() {
  return (
    <main className="w-full flex flex-col items-center gap-6 py-8">
      <RecruiterProfileCard />

      <JobPostingCard />
    </main>
  );
}
