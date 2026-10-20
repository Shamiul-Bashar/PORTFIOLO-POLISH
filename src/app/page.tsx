import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Education } from "@/sections/education";
import { Expertise } from "@/sections/expertise";
import { Work } from "@/sections/work";
import { UpcomingProjects } from "@/sections/upcoming-projects";
import { Capabilities } from "@/sections/capabilities";
import { Achievements } from "@/sections/achievements";
import { CurrentlyLearning } from "@/sections/currently-learning";
import { Credentials } from "@/sections/credentials";
import { Contact } from "@/sections/contact";
import { ClosingCta } from "@/sections/closing-cta";

export default function Home() {
  return <main><Hero /><About /><Education /><Expertise /><Work /><UpcomingProjects /><Capabilities /><Achievements /><CurrentlyLearning /><Credentials /><Contact /><ClosingCta /></main>;
}
