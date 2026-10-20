export type Capability = {
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  relatedProjects: { name: string; slug: string }[];
};

export const specializedSkills = [
  "COMMUNICATION",
  "PROBLEM SOLVING",
  "C / C++",
  "DATA STRUCTURES & ALGORITHMS",
  "REACT & NEXT.JS",
  "TYPESCRIPT",
  "VERILOG HDL",
  "GIT & GITHUB",
] as const;

// These practice areas are grounded in the existing project and skills records.
export const capabilities: Capability[] = [
  {
    number: "01",
    title: "Web Applications",
    category: "SOFTWARE & INTERFACES",
    description:
      "Building responsive web interfaces and interactive applications with clear workflows, reusable components, and maintainable architecture.",
    technologies: ["React", "Next.js", "TypeScript"],
    relatedProjects: [{ name: "CrisisMesh 2.0 Web Application", slug: "crisismesh-web" }],
  },
  {
    number: "02",
    title: "Academic Platforms",
    category: "PRODUCTIVITY & WORKFLOW",
    description:
      "Designing student-focused applications that simplify routine management, attendance tracking, and everyday academic workflows.",
    technologies: ["React Native", "Expo", "TypeScript"],
    relatedProjects: [{ name: "AcademicOS", slug: "academicos" }],
  },
  {
    number: "03",
    title: "Algorithms & Routing",
    category: "GRAPHS & DECISION SYSTEMS",
    description:
      "Exploring graph algorithms, shortest-path decisions, and resource-allocation problems through practical simulation.",
    technologies: ["C++", "BFS", "DFS", "Dijkstra"],
    relatedProjects: [{ name: "CrisisMesh 2.0", slug: "crisismesh-web" }],
  },
  {
    number: "04",
    title: "C++ Systems",
    category: "SOFTWARE ARCHITECTURE",
    description:
      "Developing modular console applications using object-oriented programming, data structures, algorithmic reasoning, and persistent data management.",
    technologies: ["C++17", "OOP", "Data Structures"],
    relatedProjects: [
      { name: "CrisisMesh Console Edition", slug: "crisismesh-console" },
      { name: "HydroSmart", slug: "hydrosmart" },
    ],
  },
  {
    number: "05",
    title: "Computer Architecture",
    category: "PROCESSOR & DATAPATH DESIGN",
    description:
      "Exploring processor design, instruction execution, control logic, and datapath integration through custom digital-system projects.",
    technologies: ["CPU Design", "Digital Logic", "Datapath"],
    relatedProjects: [{ name: "Custom 28-Bit CPU", slug: "28-bit-cpu" }],
  },
  {
    number: "06",
    title: "FPGA & Digital Logic",
    category: "HARDWARE IMPLEMENTATION",
    description:
      "Implementing digital systems using Verilog HDL, finite-state machines, and FPGA-based hardware interaction.",
    technologies: ["Verilog HDL", "FSM", "Basys 3"],
    relatedProjects: [{ name: "FPGA Random Number Guessing Game", slug: "fpga-number-game" }],
  },
];
