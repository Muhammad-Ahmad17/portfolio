import { SectionFrame } from "./SectionFrame";

const items = [
  { to: "/freelance", label: "Overview", end: true },
  { to: "/freelance/work", label: "Work" },
  { to: "/freelance/services", label: "Services" },
  { to: "/freelance/contact", label: "Contact" },
  { to: "/freelance/blog", label: "Notes" },
];

export function FreelanceLayout() {
  return (
    <SectionFrame
      tone="freelance"
      section="Freelance"
      items={items}
      cross={{ to: "/academic", label: "Academic" }}
      footnote="Software engineer · available for freelance"
    />
  );
}
