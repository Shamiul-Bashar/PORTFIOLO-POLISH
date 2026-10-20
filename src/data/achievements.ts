export type AchievementCategory = "COMPETITION" | "ACADEMIC";

export type Achievement = {
  category: AchievementCategory;
  title: string;
  description: string;
  year?: string;
  institution?: string;
};

export const achievements: Achievement[] = [
  {
    category: "COMPETITION",
    title: "Divisional Physics Olympiad — Selected",
    description:
      "Selected for the Divisional Physics Olympiad after clearing school and district rounds.",
  },
  {
    category: "COMPETITION",
    title: "Divisional Mathematics Olympiad — Selected",
    description:
      "Selected for the Divisional Mathematics Olympiad, representing the school beyond the district level.",
  },
  {
    category: "ACADEMIC",
    title: "SSC — GPA 5.00",
    description:
      "Completed the Secondary School Certificate examination with GPA 5.00.",
    year: "2022",
    institution: "Kushtia Zilla School",
  },
  {
    category: "ACADEMIC",
    title: "HSC — GPA 5.00",
    description:
      "Completed the Higher Secondary Certificate examination with GPA 5.00.",
    year: "2024",
    institution: "Cantonment College, Jashore",
  },
];
