export type ProcessStep = {
  day: string;
  label: string;
  title: string;
  description: string;
  deliverables: string[];
};

export const processSteps: ProcessStep[] = [
  {
    day: "01",
    label: "Days 01-02",
    title: "STRATEGY + SCOPE",
    description: "We clarify the product, buyer, category, current site, and launch goal.",
    deliverables: ["Product understanding", "Audience clarity", "Launch goal"],
  },
  {
    day: "02",
    label: "Days 03-05",
    title: "POSITIONING + MESSAGING",
    description: "We shape the story around what buyers need to understand, believe, and do.",
    deliverables: ["Page story", "Buyer questions", "Conversion copy"],
  },
  {
    day: "03",
    label: "Days 06-09",
    title: "DESIGN THE EXPERIENCE",
    description: "The story becomes a visual system, responsive page, and key interactions.",
    deliverables: ["Visual system", "Responsive page", "Interactions"],
  },
  {
    day: "04",
    label: "Days 10-14",
    title: "BUILD, REFINE + SHIP",
    description: "Build, QA, feedback, final polish, and launch.",
    deliverables: ["Development", "Responsive QA", "~Day 14: Shipped"],
  },
];
