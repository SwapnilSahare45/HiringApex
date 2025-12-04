import CTA from "@/components/common/home/CTA";
import Features from "@/components/common/home/Features";
import Hero from "@/components/common/home/Hero";
import HowItWorks from "@/components/common/home/HowItWorks";
import Services from "@/components/common/home/Services";
import WhyChooseUS from "@/components/common/home/WhyChooseUS";
import { getLoggedInUser } from "./actions/auth.actions";
import { LoggedInUser } from "@/types/loggedInUser";

export default async function Home() {
  const userResponse = await getLoggedInUser();
  const user = userResponse.data as LoggedInUser;
  return (
    <>
      <Hero user={user} />

      <Features user={user} />

      <Services user={user} />

      <HowItWorks user={user} />

      <WhyChooseUS user={user} />

      <CTA user={user} />
    </>
  );
}
