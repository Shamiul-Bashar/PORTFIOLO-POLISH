/**
 * Conversational controller for Ask Siam AI.
 * Facts and links come from the published portfolio records, never from guesses.
 * The assistant can navigate, explain projects, and sustain a short conversation,
 * but it cannot autonomously edit the site or contact people.
 */
import { site } from "@/data/site";
import { capabilities } from "@/data/capabilities";
import { certificates } from "@/data/certificates";
import { developerTools } from "@/data/skills";
import {
  answerPortfolioQuestion, portfolioKnowledge, INITIAL_CONTEXT,
  type AssistantContext, type AssistantLink, type AssistantReply,
} from "@/lib/siam-assistant";

export type ConversationContext = AssistantContext & {
  language: "en" | "bn";
  lastTopic: string | null;
  turnCount: number;
};

export const INITIAL_CONVERSATION: ConversationContext = {
  ...INITIAL_CONTEXT, language: "en", lastTopic: null, turnCount: 0,
};

type ConversationResult = { reply: AssistantReply; context: ConversationContext };
const all: AssistantLink = { label: "Explore all projects", href: "/projects" };
const contact: AssistantLink = { label: "Contact Siam", href: "/#contact" };

function clean(s: string): string {
  return s.toLowerCase().replace(/[^\p{L}\p{N}+#]+/gu, " ").replace(/\s+/g, " ").trim();
}
function mentions(q: string, term: string): boolean {
  const t = clean(term);
  return !!t && (" " + q + " ").includes(" " + t + " ");
}
function any(q: string, terms: string[]): boolean {
  return terms.some((term) => mentions(q, term));
}
function detectLanguage(q: string, previous: "en" | "bn"): "en" | "bn" {
  if (/[\u0980-\u09FF]/u.test(q) || any(clean(q), [
    "ami", "amr", "tmr", "tumi", "kemon", "kmn", "kivabe", "keno",
    "bol", "bolo", "bolba", "daw", "dekhao", "kothay", "kothai",
    "ki ki", "ki", "ase", "ache", "parbe", "bujhao", "salam", "walaikum",
  ])) return "bn";
  return previous;
}
const sectionLinks: { terms: string[]; label: string; href: string }[] = [
  { terms: ["home", "top", "hero", "homepage", "start"], label: "Home / Hero", href: "/#top" },
  { terms: ["about", "biography", "background", "introduction"], label: "About Siam", href: "/#about" },
  { terms: ["education", "university", "kuet", "academic"], label: "Education", href: "/#education" },
  { terms: ["expertise", "skills", "tech stack", "technologies"], label: "Expertise", href: "/#expertise" },
  { terms: ["all projects", "project archive", "browse projects"], label: "All Projects", href: "/projects" },
  { terms: ["selected work", "recent work", "completed projects", "projects"], label: "Selected Work", href: "/#work" },
  { terms: ["upcoming", "in development", "ongoing"], label: "Upcoming Projects", href: "/#upcoming-projects" },
  { terms: ["areas of work", "capabilities", "what can he build", "services"], label: "Areas of Work", href: "/#capabilities" },
  { terms: ["achievements", "awards", "milestones"], label: "Achievements", href: "/#milestones" },
  { terms: ["currently learning", "learning roadmap", "learning"], label: "Currently Learning", href: "/#currently-learning" },
  { terms: ["contact", "get in touch", "message", "reach out"], label: "Contact", href: "/#contact" },
];
function recognizedProjects(q: string) {
  return portfolioKnowledge.filter((project) => {
    const aliases = [project.title, project.key, ...project.aliases];
    return aliases.some((alias) => clean(alias).length > 3 && mentions(q, alias));
  });
}
function projectLinks(project: (typeof portfolioKnowledge)[number]): AssistantLink[] {
  const links: AssistantLink[] = [];
  if (project.detail) links.push({ label: project.status === "Completed" ? "Project details" : "Upcoming work", href: project.detail });
  if (project.repository) links.push({ label: "GitHub repository", href: project.repository });
  if (project.demo) links.push({ label: "Live demo", href: project.demo });
  return links;
}
function localize(en: string, bn: string, lang: "en" | "bn"): string {
  return lang === "bn" ? bn : en;
}
export function converseWithSiam(raw: string, previous: ConversationContext): ConversationResult {
  const q = clean(raw.slice(0, 400));
  const language = detectLanguage(raw, previous.language);
  const next: ConversationContext = { ...previous, language, turnCount: previous.turnCount + 1 };
  const reply = (text: string, links?: AssistantLink[], topic?: string): ConversationResult => {
    if (topic) next.lastTopic = topic;
    return { reply: { text, links }, context: next };
  };
  if (!q) return reply("Ask me anything about this portfolio.");

  // Conversational turns are checked before portfolio matching so that
  // "bye" or "how are you" cannot accidentally trigger a project intent.
  if (any(q, ["assalamu alaikum", "assalamualaikum", "assalam alaikum", "salam", "আসসালামু আলাইকুম", "সালাম"])) {
    return reply(localize(
      "Wa alaikum assalam! Welcome to Siam's portfolio. I'm his on-site assistant. Would you like to explore his projects or learn about his background?",
      "ওয়ালাইকুম আসসালাম! Siam-এর portfolio-তে স্বাগতম। Projects, skills, education বা contact সম্পর্কে কী জানতে চাও?",
      language,
    ), [all, { label: "About Siam", href: "/#about" }], "greeting");
  }
  if (any(q, ["goodbye", "bye", "bye bye", "see you", "take care", "good night", "আল্লাহ হাফেজ", "বিদায়", "allah hafez"])) {
    return reply(localize(
      "It was a pleasure chatting with you! Thanks for exploring Siam's work. You're welcome back anytime.",
      "কথা বলে ভালো লাগলো! Siam-এর portfolio দেখার জন্য ধন্যবাদ। আবার এসো। আল্লাহ হাফেজ!",
      language,
    ), [all], "farewell");
  }
  if (any(q, ["how are you", "how is it going", "how are things", "how r u", "ki obostha", "kmn aso", "kemon acho", "কেমন আছো"])) {
    return reply(localize(
      "Doing great, thanks for asking! I'm ready to help you explore Siam's work. What would you like to see first?",
      "ভালো আছি, ধন্যবাদ! Siam-এর কাজ সম্পর্কে জানতে সাহায্য করতে প্রস্তুত। কোনটা আগে দেখতে চাও?",
      language,
    ), [all], "smalltalk");
  }
  if (any(q, ["i am fine", "im fine", "i m good", "doing well", "valo asi", "bhalo asi"])) {
    return reply(localize("Glad to hear that! Want to check out a project or ask about Siam's skills?", "জেনে ভালো লাগলো! কোনো project বা skill নিয়ে জানতে চাও?", language), [all], "smalltalk");
  }
  if (any(q, ["hi", "hello", "hey", "hey there", "yo", "hola", "হাই", "হ্যালো", "good morning", "good afternoon", "good evening"])) {
    return reply(localize(
      "Hello and welcome! I'm Ask Siam AI, a friendly guide to Siam's portfolio. I can explain projects, recommend relevant work, find links, or take you to any section. What brings you here?",
      "হ্যালো, স্বাগতম! আমি Ask Siam AI। Projects, skills, education, GitHub, CV বা contact—যেটা চাইবে সেটায় সাহায্য করব। কী জানতে চাও?",
      language,
    ), [{ label: "Meet Siam", href: "/#about" }, all], "greeting");
  }
  if (any(q, ["thanks", "thank you", "thank u", "thx", "dhonnobad", "ধন্যবাদ", "tysm"])) {
    return reply(localize("You're very welcome! Anything else you'd like to explore?", "স্বাগতম! আর কিছু জানতে চাও?", language), [all], "smalltalk");
  }
  if (any(q, ["nice to meet you", "nice talking", "great bot", "you are awesome", "good job", "well done", "love your portfolio"])) {
    return reply("Thank you, that's kind of you! I'm here to make exploring Siam's work simple. Curious about a particular project?", [all], "smalltalk");
  }
  if (any(q, ["sorry", "my bad", "no problem"])) return reply("No problem at all. How can I help?", [all], "smalltalk");

  if (any(q, ["who are you", "are you a robot", "are you real", "are you chatgpt", "are you human", "who made you", "who created you", "how do you work", "what is ask siam ai", "what can you do", "what do you do", "help me", "help", "commands"])) {
    return reply(
      "I'm Ask Siam AI — a conversational, portfolio-grounded bot created for this website. I explain Siam's work, answer follow-up questions, compare projects, help with skills and academic details, and provide working navigation, GitHub, CV and contact links. I use published portfolio information; I don't independently browse, change the website, or send messages.",
      [{ label: "All projects", href: "/projects" }, { label: "Contact Siam", href: "/#contact" }],
      "help",
    );
  }
  if (any(q, ["speak bangla", "banglay bolo", "bangla te bolo", "বাংলায় বলো", "বাংলা বলো"])) {
    next.language = "bn";
    return reply("অবশ্যই! এখন থেকে বাংলায় উত্তর দেওয়ার চেষ্টা করব। Siam-এর projects, skills, education বা contact নিয়ে প্রশ্ন করো।", [all], "language");
  }
  if (any(q, ["speak english", "answer in english", "english please"])) {
    next.language = "en";
    return reply("Of course. I'll answer in English. What would you like to explore?", [all], "language");
  }
  // Practical navigation commands work on each major section and the archive.
  if (any(q, ["go to", "navigate", "scroll to", "open", "take me to", "jump to", "where can i find", "show me the", "show section", "visit"])) {
    const destination = sectionLinks.find((s) => any(q, s.terms));
    if (destination) {
      return reply("You can open " + destination.label + " directly using the link below.", [{ label: "Open " + destination.label, href: destination.href }], "navigation");
    }
    if (any(q, ["resume", "cv"])) return reply("You can view or download Siam's resume here.", [{ label: "View resume", href: site.links.resume }], "resume");
    if (any(q, ["github"])) return reply("Here is Siam's GitHub profile.", [{ label: "GitHub profile", href: site.links.github }], "social");
    return reply("Which section should I open? I can take you to About, Education, Expertise, Projects, Upcoming Work, Achievements, Learning or Contact.", [all, contact], "navigation");
  }
  if (any(q, ["website sections", "sections of portfolio", "whats on this site", "site map", "sitemap", "how to use the site", "website tour", "portfolio tour"])) {
    return reply(
      "This website has a Hero introduction, About, Education, Expertise, Selected Work, Upcoming Projects, Areas of Work, Achievements, Currently Learning, Contact, and a searchable All Projects archive. Tell me a section name and I'll take you there.",
      [{ label: "Start at About", href: "/#about" }, { label: "All Projects archive", href: "/projects" }, contact],
      "navigation",
    );
  }
  if (any(q, ["capabilities", "areas of work", "what can siam build", "what can he build", "what does siam do", "services", "can he develop", "can siam build"])) {
    return reply(
      "Siam's portfolio highlights " + capabilities.length + " areas of work: " + capabilities.map((x) => x.title).join("; ") + ". Examples include responsive web apps, student productivity tools, graph routing systems, C++ programs, CPU architecture, and FPGA projects. For a new project or collaboration, please contact him directly.",
      [{ label: "Areas of Work", href: "/#capabilities" }, contact],
      "capabilities",
    );
  }
  if (any(q, ["tools he uses", "developer tools", "which tools", "vs code", "development tools"])) {
    return reply("Developer tools listed on this portfolio: " + developerTools.join(", ") + ".", [{ label: "Expertise", href: "/#expertise" }], "skills");
  }
  if (any(q, ["certificates", "certifications", "certified", "certificate"])) {
    return reply(certificates.length
      ? "Verified certificates listed on this site: " + certificates.map((c) => c.name + " — " + c.issuer).join("; ") + "."
      : "There are no verified certificates published on the portfolio at the moment. Siam's projects and academic achievements are available to review instead.",
    [{ label: "Achievements", href: "/#milestones" }, all], "certificates");
  }
  if (any(q, ["hobbies", "hobby", "interests", "favorite sports", "free time", "football", "cricket", "table tennis"])) {
    return reply("Outside software engineering, Siam lists these interests: " + site.interests.join(", ") + ".", [{ label: "About Siam", href: "/#about" }], "about");
  }
  if (any(q, ["recruiter", "hire siam", "can i hire", "job opportunity", "collaborate with", "client project", "work with siam"])) {
    return reply(
      "Thanks for your interest in collaborating with Siam. His portfolio shows academic and personal experience in web applications, algorithms, C++, React/TypeScript and digital systems. For availability, requirements or a proposal, please contact him directly.",
      [{ label: "Send a message", href: "/#contact" }, { label: "View resume", href: site.links.resume }, { label: "LinkedIn", href: site.links.linkedin }],
      "contact",
    );
  }
  // Extract projects independently of their conversational description. This
  // handles comparisons and questions like "what does it use?" in context.
  const mentioned = recognizedProjects(q);
  const unique = mentioned.filter((p, i) => mentioned.findIndex((other) => other.key === p.key) === i);
  if (unique.length >= 2 && any(q, ["compare", "difference", "versus", "vs", "which is", "better", "between"])) {
    const [a, b] = unique;
    next.activeProject = a.key;
    return reply(
      a.title + " is " + a.status.toLowerCase() + ": " + a.description + " Its stack includes " + a.technologies.join(", ") + ".\n\n" +
      b.title + " is " + b.status.toLowerCase() + ": " + b.description + " Its stack includes " + b.technologies.join(", ") +
      ".\n\nThey address different goals, so 'better' depends on what you want to evaluate.",
      [...projectLinks(a).slice(0, 1), ...projectLinks(b).slice(0, 1)], "projects",
    );
  }
  if (unique.length === 0 && previous.activeProject && any(q, [
    "tell me more", "more details", "more about it", "explain it", "explain more",
    "what about it", "what about that", "how does it work", "how was it built",
    "what can it do", "why was it built", "what is its purpose",
    "show its links", "where is its repo", "give me the link",
    "eta ki kore", "eta kivabe kaj kore", "aro bolo",
  ])) {
    const active = portfolioKnowledge.find((p) => p.key === previous.activeProject);
    if (active) {
      return reply(
        active.title + " — " + active.description +
        "\n\nStatus: " + active.status + ". Stack: " + active.technologies.join(", ") + "." +
        (active.features?.length ? "\n\nHighlights: " + active.features.join("; ") + "." : "") +
        (active.contribution ? "\n\nSiam's contribution: " + active.contribution : ""),
        projectLinks(active), "projects",
      );
    }
  }
  const techTerms = [
    "react native", "typescript", "next.js", "nextjs", "react", "verilog", "python",
    "c++", "cpp", "supabase", "dijkstra", "graph", "expo", "fastapi",
    "postgresql", "javaScript", "html", "css", "fpga", "digital logic", "oop",
  ];
  const techSearch = any(q, ["which project", "projects use", "projects built with", "where did", "examples using", "which work", "uses"]) && techTerms.find((t) => mentions(q, t));
  if (techSearch) {
    const found = portfolioKnowledge.filter((p) =>
      p.technologies.some((t) => clean(t).includes(clean(techSearch)) || clean(techSearch).includes(clean(t))));
    return reply(found.length
      ? "Projects involving " + techSearch + ": " + found.map((p) => p.title + " (" + p.status + ")").join("; ") + "."
      : "I couldn't verify a project explicitly listing " + techSearch + " in the published technology records.",
    found.flatMap((p) => projectLinks(p).slice(0, 1)).slice(0, 4).concat([all]), "projects");
  }
  if (any(q, ["is this a real ai", "do you have an ai api", "do you use openai", "are you connected to chatgpt"])) {
    return reply("This is a conversational portfolio bot powered by local, published knowledge and intent handling. It is not connected to a general-purpose LLM, so it won't invent private facts or claim to perform external actions.", [all], "help");
  }
  // Use the existing detailed portfolio knowledge engine for facts, project
  // details and contextual project-specific follow-ups.
  const base = answerPortfolioQuestion(raw, next);
  return {
    reply: base.reply,
    context: { ...next, ...base.context, lastTopic: unique.length ? "projects" : next.lastTopic },
  };
}
