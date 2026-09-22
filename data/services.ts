export type Service = {
  id: string; title: string; description: string; amount: number;
  currency: "QAR"; interval: "project" | "month"; includes: string[]; scopeNote?: string;
};
/** Provisional starting prices for the local preview, not final quotations. */
export const services: Service[] = [
  { id: "discovery", title: "Find the right first move.", description: "Product discovery", amount: 5000, currency: "QAR", interval: "project",
    includes: ["Business goals & user needs", "Requirements & core journeys", "Prioritized scope & product roadmap"] },
  { id: "mvp", title: "Design the first version.", description: "MVP Design", amount: 25000, currency: "QAR", interval: "project",
    includes: ["Core user journeys & high-fidelity screens", "Interactive prototype & usability testing", "Design files, UI specifications & developer handoff"],
    scopeNote: "Design deliverables only. Development is scoped separately." },
  { id: "support", title: "Keep moving forward.", description: "Ongoing design support", amount: 2500, currency: "QAR", interval: "month",
    includes: ["UX reviews & usability improvements", "Design updates for agreed features", "A clear monthly design scope & review"] },
];
export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-QA", { maximumFractionDigits: 0 }).format(amount);
}
