/**
 * Ask Siam AI — deterministic, portfolio-grounded assistant.
 * Inspired by the original PORTFOLIO's intent + knowledge + context architecture.
 * No external API, user-data transmission, fabricated AI responses or API key.
 */
import { site } from "@/data/site";
import { education } from "@/data/education";
import { expertise } from "@/data/skills";
import { learningTracks } from "@/data/learning";
import { achievements } from "@/data/achievements";
import { projects } from "@/data/projects";
import { upcomingProjects } from "@/data/upcoming-projects";

export type AssistantLink = { label: string; href: string };
export type AssistantReply = { text: string; links?: AssistantLink[] };
export type AssistantContext = { activeProject: string | null; awaitingGithubScope: boolean };
export const INITIAL_CONTEXT: AssistantContext = { activeProject: null, awaitingGithubScope: false };

const githubProfile: AssistantLink = { label: "GitHub Profile", href: site.links.github };
const allProjects: AssistantLink = { label: "All 9 Projects", href: "/projects" };
const contactLinks: AssistantLink[] = [
  { label: "Email Siam", href: `mailto:${site.email}` },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "Contact Section", href: "/#contact" },
];

type ProjectEntry = {
  key: string;
  title: string;
  status: "Completed" | "In Development";
  description: string;
  technologies: string[];
  repository: string;
  demo?: string;
  detail?: string;
  features?: string[];
  contribution?: string;
  aliases: string[];
};

const projectAliases: Record<string, string[]> = {
  "crisismesh-web": ["crisis mesh web", "crisismesh web", "crisis mesh 2", "crisismesh 2", "crisismesh"],
  "araf-azreen-wedding": ["araf azreen", "araf and azreen", "araf azreen wedding", "wedding website", "wedding invitation"],
  "28-bit-cpu": ["28 bit cpu", "28bit cpu", "custom cpu", "cpu project", "booth multiplier"],
  "crisismesh-console": ["crisis mesh console", "crisismesh console", "console edition", "emergency console"],
  hydrosmart: ["hydro smart", "hydrosmart", "water grid"],
  "fpga-number-game": ["fpga game", "number guessing game", "number guesser", "fpga number"],
  "agent-prime": ["agent prime", "personal ai agent", "ai agent prime"],
  genosearch: ["geno search", "genosearch", "genome platform", "dna platform"],
  academicos: ["academic os", "academicos", "academic productivity app"],
};

export const portfolioKnowledge: ProjectEntry[] = [
  ...projects.map((project) => ({
    key: project.slug,
    title: project.title,
    status: "Completed" as const,
    description: project.shortDescription,
    technologies: project.technologies,
    repository: project.repository ?? "",
    demo: project.demo,
    detail: `/projects/${project.slug}`,
    contribution: project.contribution,
    features: project.highlights,
    aliases: projectAliases[project.slug] ?? [],
  })),
  ...upcomingProjects.map((project) => {
    const key = project.name.toLowerCase().replace(/\s+/g, "-");
    return {
      key,
      title: project.name,
      status: "In Development" as const,
      description: project.description,
      technologies: project.technologies,
      repository: project.repository,
      detail: "/#upcoming-projects",
      aliases: projectAliases[key] ?? [],
    };
  }),
];

function normalized(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9+#]+/g, " ").replace(/\s+/g, " ").trim();
}
function containsTerm(message: string, term: string): boolean {
  const clean = normalized(term);
  return !!clean && (` ${message} `).includes(` ${clean} `);
}
function matches(message: string, terms: string[]): boolean {
  return terms.some((term) => containsTerm(message, term));
}
function matchingProject(message: string): ProjectEntry | null {
  // More specific multi-word aliases win over broad aliases like "crisismesh".
  const hits = portfolioKnowledge.flatMap((project) => project.aliases
    .filter((alias) => containsTerm(message, alias))
    .map((alias) => ({ project, specificity: normalized(alias).length })));
  hits.sort((a, b) => b.specificity - a.specificity);
  return hits[0]?.project ?? null;
}
function linksFor(project: ProjectEntry): AssistantLink[] {
  const links: AssistantLink[] = [];
  if (project.detail) links.push({ label: project.status === "Completed" ? "Case Study" : "Upcoming Projects", href: project.detail });
  if (project.repository) links.push({ label: "Source Code", href: project.repository });
  if (project.demo) links.push({ label: "Live Website", href: project.demo });
  return links;
}
function projectReply(project: ProjectEntry, question: string): AssistantReply {
  const tech = matches(question, ["tech", "technologies", "technology", "stack", "built with", "languages", "framework"]);
  const features = matches(question, ["features", "feature", "highlights", "capabilities", "functionality", "does it do"]);
  const code = matches(question, ["github", "repository", "repo", "source code", "code link"]);
  const demo = matches(question, ["demo", "live site", "website link", "preview"]);
  const role = matches(question, ["role", "contribution", "responsibilities"]);
  const status = matches(question, ["status", "progress", "finished", "complete", "ongoing"]);
  if (tech) return { text: `${project.title} uses or explores: ${project.technologies.join(", ")}.`, links: linksFor(project) };
  if (features) return { text: project.features?.length ? `Highlights of ${project.title}: ${project.features.join("; ")}.` : `${project.title} is in development. The portfolio currently lists: ${project.description}`, links: linksFor(project) };
  if (code) return { text: `Here is the ${project.title} source repository.`, links: linksFor(project).filter((link) => link.label === "Source Code") };
  if (demo) return project.demo
    ? { text: `You can explore the live ${project.title} website below.`, links: [{ label: "Live Website", href: project.demo }] }
    : { text: `No public live demo is listed for ${project.title} yet. You can explore the project details or source code instead.`, links: linksFor(project) };
  if (role) return { text: project.contribution ?? `${project.title} is a work in progress. Specific contribution details haven't been published yet.`, links: linksFor(project) };
  if (status) return { text: `${project.title} is listed as ${project.status.toLowerCase()} in this portfolio.`, links: linksFor(project) };
  return {
    text: `${project.title} — ${project.status}.\n\n${project.description}\n\nTechnologies: ${project.technologies.join(", ")}.\n\nYou can ask about its features, tech stack, status, or source code.`,
    links: linksFor(project),
  };
}

export function answerPortfolioQuestion(raw: string, context: AssistantContext): { reply: AssistantReply; context: AssistantContext } {
  const q = normalized(raw.slice(0, 500));
  const next: AssistantContext = { ...context };
  const respond = (text: string, links?: AssistantLink[]) => ({ reply: { text, links }, context: next });
  if (!q) return respond("Type a question about Siam's projects, skills, education, or contact information.");

  const named = matchingProject(q);
  if (named) {
    next.activeProject = named.key;
    next.awaitingGithubScope = false;
    return { reply: projectReply(named, q), context: next };
  }

  if (context.awaitingGithubScope) {
    next.awaitingGithubScope = false;
    if (matches(q, ["personal", "profile", "my github", "your github", "personal github"])) {
      return respond("Here's Siam's personal GitHub profile.", [githubProfile]);
    }
    if (matches(q, ["project", "repository", "repo"])) {
      return respond("Which project do you mean? Try “CrisisMesh Web”, “Wedding Website”, “AcademicOS”, or another project name.", [allProjects]);
    }
  }

  const active = portfolioKnowledge.find((p) => p.key === context.activeProject);
  const hasProjectFollowup = matches(q, ["its", "that project", "this project", "technologies", "tech stack", "github", "source code", "demo", "features", "feature", "status", "role", "built with"]);
  const explicitGithubProfile = matches(q, ["github profile", "your github", "his github", "personal github"]);
  if (explicitGithubProfile) return respond("Siam's GitHub profile is linked here.", [githubProfile]);

  if (active && hasProjectFollowup && !matches(q, ["all projects", "your projects", "ongoing projects", "completed projects"])) {
    next.activeProject = active.key;
    return { reply: projectReply(active, q), context: next };
  }

  if (matches(q, ["github", "repo", "repository", "source code"])) {
    next.awaitingGithubScope = true;
    return respond("Do you want Siam's GitHub profile or the repository for a specific project?", [githubProfile, allProjects]);
  }

  if (matches(q, ["hi", "hello", "hey", "assalamu alaikum", "salam", "good morning", "good evening"])) {
    return respond("Hello! I'm Ask Siam AI, a portfolio knowledge assistant. I can help you explore Siam's work, technologies, education, and contact details. What would you like to know?");
  }
  if (matches(q, ["thank you", "thanks", "thx"])) return respond("You're welcome. Feel free to ask about another project or how to contact Siam.");
  if (matches(q, ["what can you do", "help", "are you ai", "are you chatgpt", "who built you", "how do you work"])) {
    return respond("I answer questions using information published on Siam's portfolio. This is an on-site knowledge assistant, not a general-purpose AI service. Ask about projects, technologies, education, achievements, learning, or contact details.", [allProjects]);
  }

  if (matches(q, ["ongoing", "in development", "upcoming", "currently building", "next projects", "running projects"])) {
    const ongoing = portfolioKnowledge.filter((p) => p.status === "In Development");
    return respond(`Siam has ${ongoing.length} projects listed as in development: ${ongoing.map((p) => p.title).join(", ")}. Ask about any one of them to explore its current scope.`, [{ label: "Explore Upcoming Work", href: "/#upcoming-projects" }, allProjects]);
  }
  if (matches(q, ["completed projects", "finished projects", "built", "shipped", "selected work"])) {
    const complete = portfolioKnowledge.filter((p) => p.status === "Completed");
    return respond(`The portfolio lists ${complete.length} completed projects: ${complete.map((p) => p.title).join("; ")}.`, [allProjects]);
  }
  if (matches(q, ["project", "projects", "portfolio", "work", "best project", "recent work", "show me"])) {
    const complete = portfolioKnowledge.filter((p) => p.status === "Completed").length;
    const inProgress = portfolioKnowledge.length - complete;
    return respond(`There are ${portfolioKnowledge.length} listed projects: ${complete} completed and ${inProgress} in development. Highlights include CrisisMesh 2.0, the Araf & Azreen wedding experience, the custom 28-bit CPU, and AcademicOS in development. You can browse every project with filters and search.`, [allProjects, { label: "Selected Work", href: "/#work" }]);
  }

  if (matches(q, ["education", "university", "kuet", "studying", "study", "college", "school", "ssc", "hsc", "degree"])) {
    const [current, ...previous] = education;
    return respond(`Siam is pursuing ${current.qualification} in ${current.field} at ${current.institution} (${current.period}). Earlier education: ${previous.map((e) => `${e.institution} — ${e.qualification}${e.result ? ` (${e.result})` : ""}`).join("; ")}.`, [{ label: "Education Timeline", href: "/#education" }]);
  }

  if (matches(q, ["skills", "skill", "technologies", "technology", "tech stack", "language", "programming", "framework", "can he code", "know"])) {
    return respond(`Siam's areas include: ${expertise.map((group) => `${group.title} (${group.items.join(", ")})`).join("; ")}. The portfolio shows technologies used in the context of specific projects rather than unsupported proficiency ratings.`, [{ label: "Expertise Map", href: "/#expertise" }]);
  }

  if (matches(q, ["learning", "currently learning", "exploring", "research", "what is next to learn"])) {
    const topics = learningTracks.flatMap((track) => track.topics.map((topic) => topic.title));
    return respond(`Current learning areas include: ${topics.join(", ")}.`, [{ label: "Currently Learning", href: "/#currently-learning" }]);
  }

  if (matches(q, ["achievement", "achievements", "olympiad", "awards", "award", "milestones", "gpa"])) {
    return respond(`Listed milestones: ${achievements.map((item) => `${item.title}${item.year ? ` (${item.year})` : ""}`).join("; ")}.`, [{ label: "Achievements", href: "/#milestones" }]);
  }

  if (matches(q, ["resume", "cv", "curriculum vitae"])) return respond("Here's Siam's current resume link.", [{ label: "View Resume", href: site.links.resume }]);

  if (matches(q, ["linkedin", "facebook", "instagram", "codeforces"])) {
    const platform = (["linkedin", "facebook", "instagram", "codeforces"] as const).find((key) => containsTerm(q, key));
    if (platform) return respond(`Here's Siam's ${platform === "linkedin" ? "LinkedIn" : platform} profile.`, [{ label: platform.toUpperCase(), href: site.links[platform] }]);
  }
  if (matches(q, ["whatsapp", "phone", "number", "call"])) {
    return respond("Siam's publicly listed WhatsApp contact is available here.", [{ label: "WhatsApp", href: site.links.whatsapp }]);
  }
  if (matches(q, ["contact", "email", "hire", "collaborate", "reach", "freelance", "internship", "get in touch"])) {
    return respond(`You can reach Siam by email at ${site.email}, or connect through LinkedIn. Availability for work or collaborations is best confirmed directly.`, contactLinks);
  }

  if (matches(q, ["location", "where is he", "where are you from", "where does he live", "based"])) {
    return respond(`Siam currently studies at KUET in Khulna, Bangladesh, and is originally from ${site.profile.permanentLocation}.`, [{ label: "About Siam", href: "/#about" }]);
  }
  if (matches(q, ["career", "goal", "future", "experience", "internship experience"])) {
    return respond(`Siam's stated career goal is to become a ${site.profile.careerGoal}. His portfolio highlights academic and personal projects; it does not list verified full-time employment history.`, [{ label: "About & Background", href: "/#about" }, allProjects]);
  }
  if (matches(q, ["who is siam", "who are you", "tell me about siam", "about siam", "introduce", "your name", "who is he", "about"])) {
    return respond(`${site.profile.fullName} is a Computer Science & Engineering undergraduate at ${site.institution}. He explores software engineering, data structures and algorithms, modern web applications, and digital hardware. His goal is to build useful, reliable software with a strong understanding of how systems work.`, [{ label: "About Siam", href: "/#about" }, allProjects]);
  }

  return respond("I can only answer from information available on this portfolio, and I couldn't find a reliable answer to that question. Try asking about a named project, tech stack, education, achievements, current learning, or contact details.", [allProjects, { label: "Contact Siam", href: "/#contact" }]);
}
