// Genuine skills grouped by the problems they are used to solve.
// Avoid made-up proficiency percentages and inflated skill counts.
export const expertise = [
  {
    number: "01",
    label: "APPLICATIONS & EXPERIENCE",
    title: "Software & interfaces",
    description: "Building clear, usable applications and translating ideas into maintainable interfaces.",
    items: ["C", "C++", "TypeScript", "React", "Next.js", "React Native", "HTML", "CSS"],
  },
  {
    number: "02",
    label: "ALGORITHMS & ARCHITECTURE",
    title: "Systems & computation",
    description: "Solving implementation problems using algorithms, data structures, and hardware-aware design.",
    items: ["Data Structures", "Graph Algorithms", "Dijkstra", "Problem Solving", "OOP", "Verilog HDL", "Vivado", "Computer Architecture"],
  },
] as const;

export const developerTools = ["Git & GitHub", "VS Code", "Supabase", "Basys 3 FPGA"] as const;
export const marqueeSkills = ["C / C++", "DATA STRUCTURES", "REACT", "NEXT.JS", "TYPESCRIPT", "VERILOG HDL", "GRAPH ALGORITHMS", "GIT & GITHUB"] as const;
