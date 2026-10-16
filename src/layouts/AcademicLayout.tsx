import { SectionFrame } from "./SectionFrame";

const items = [
  { to: "/academic", label: "Overview", end: true },
  { to: "/academic/education", label: "Education" },
  { to: "/academic/projects", label: "Projects" },
  { to: "/academic/skills", label: "Skills" },
];

export function AcademicLayout() {
  return (
    <SectionFrame
      tone="academic"
      section="Academic"
      items={items}
      cross={{ to: "/freelance", label: "Freelance" }}
      footnote="Computer engineering · COMSATS Lahore"
    />
  );
}
