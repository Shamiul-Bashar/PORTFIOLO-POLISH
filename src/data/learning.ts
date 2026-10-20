export type LearningTopic = {
  id: string;
  title: string;
  domain: string;
  description: string;
  focus: [string, string, string];
};

export type LearningTrack = {
  id: string;
  title: string;
  topics: LearningTopic[];
};

export const learningTracks: LearningTrack[] = [
  {
    id: "software-algorithms",
    title: "SOFTWARE & ALGORITHMS",
    topics: [
      {
        id: "01",
        title: "Data Structures & Algorithms",
        domain: "SOFTWARE & ALGORITHMS",
        description:
          "Strengthening problem-solving fundamentals through data structures, graph algorithms, algorithm analysis, and competitive programming.",
        focus: [
          "Data Structures",
          "Graph Algorithms",
          "Algorithmic Problem Solving",
        ],
      },
      {
        id: "02",
        title: "Next.js & Modern Web Development",
        domain: "WEB ENGINEERING",
        description:
          "Exploring modern web application architecture, reusable interfaces, and performance-conscious development through practical projects.",
        focus: ["Next.js", "React", "TypeScript"],
      },
      {
        id: "06",
        title: "Assembly Language Programming",
        domain: "LOW-LEVEL COMPUTING",
        description:
          "Studying x86 assembly, registers, memory addressing, stack operations, interrupts, and low-level instruction execution.",
        focus: ["x86 Assembly", "Registers & Memory", "Low-Level Programming"],
      },
    ],
  },
  {
    id: "systems-hardware",
    title: "SYSTEMS & HARDWARE",
    topics: [
      {
        id: "03",
        title: "Digital Logic & FPGA Design",
        domain: "DIGITAL SYSTEMS",
        description:
          "Extending digital logic knowledge through Verilog HDL, sequential circuits, finite-state machines, and FPGA-based implementations.",
        focus: ["Verilog HDL", "FPGA", "Finite-State Machines"],
      },
      {
        id: "04",
        title: "Computer Architecture",
        domain: "COMPUTER SYSTEMS",
        description:
          "Developing a deeper understanding of processor design, instruction execution, datapath organization, memory systems, and performance analysis.",
        focus: [
          "Processor Architecture",
          "Instruction Execution",
          "Datapath & Control",
        ],
      },
      {
        id: "05",
        title: "AutoCAD & Technical Drafting",
        domain: "ENGINEERING DESIGN",
        description:
          "Exploring AutoCAD for accurate two-dimensional technical drawings and engineering design documentation.",
        focus: ["AutoCAD", "2D Drafting", "Engineering Drawings"],
      },
    ],
  },
];
