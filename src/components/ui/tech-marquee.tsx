import { Atom, Boxes, Braces, Cpu, FileCode2, GitBranch, PanelsTopLeft, Workflow } from "lucide-react";
import { marqueeSkills } from "@/data/skills";

const skillIcons = [Braces, Boxes, Atom, PanelsTopLeft, FileCode2, Cpu, Workflow, GitBranch];

export function TechMarquee() {
  const batch = marqueeSkills.map((skill, index) => {
    const Icon = skillIcons[index % skillIcons.length];
    return <span key={skill} className="marquee-chip"><Icon size={14} strokeWidth={1.6} aria-hidden="true" />{skill}</span>;
  });
  return (
    <div className="marquee-strip" role="group" aria-label="Technical skills and technologies">
      <div className="marquee-track">
        <div className="marquee-set">{batch}</div>
        <div className="marquee-set" aria-hidden="true">{batch}</div>
      </div>
    </div>
  );
}
