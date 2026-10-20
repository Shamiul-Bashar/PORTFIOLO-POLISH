export type EducationStatus = "CURRENTLY STUDYING" | "COMPLETED";

export type EducationRecord = {
  id: string;
  institution: string;
  category: string;
  qualification: string;
  field?: string;
  period: string;
  location: string;
  result?: string;
  status: EducationStatus;
  website: string;
};

export const education: EducationRecord[] = [
  {
    id: "kuet",
    institution: "Khulna University of Engineering & Technology (KUET)",
    category: "UNIVERSITY",
    qualification: "Bachelor of Science (B.Sc.)",
    field: "Computer Science & Engineering",
    period: "2024 — Present",
    location: "Khulna, Bangladesh",
    status: "CURRENTLY STUDYING",
    website: "https://www.kuet.ac.bd/",
  },
  {
    id: "cantonment-college",
    institution: "Cantonment College, Jashore",
    category: "HIGHER SECONDARY",
    qualification: "Higher Secondary Certificate (HSC)",
    period: "2022 — 2024",
    location: "Jashore, Bangladesh",
    result: "GPA 5.00 (A+)",
    status: "COMPLETED",
    website: "https://ccj.edu.bd/",
  },
  {
    id: "kushtia-zilla-school",
    institution: "Kushtia Zilla School",
    category: "SECONDARY",
    qualification: "Secondary School Certificate (SSC)",
    period: "2013 — 2022",
    location: "Kushtia, Bangladesh",
    result: "GPA 5.00 (A+)",
    status: "COMPLETED",
    website: "https://kushtiazillaschool.edu.bd/",
  },
];
