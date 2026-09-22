export type Service = {
  id: string; title: string; description: string; amount: number;
  currency: "QAR"; interval: "project" | "month"; includes: string[];
};
/** Provisional starting prices for the local preview, not final quotations. */
export const services: Service[] = [
  { id: "discovery", title: "Find the right first move.", description: "Product discovery", amount: 5000, currency: "QAR", interval: "project",
    includes: ["Business goals & user needs", "Requirements & core journeys", "Prioritized scope & product roadmap"] },
  { id: "mvp", title: "Make the idea real.", description: "Scoped MVP", amount: 25000, currency: "QAR", interval: "project",
    includes: ["UX/UI for the agreed core experience", "Development, integrations & testing", "Launch support & product handover"] },
  { id: "support", title: "Keep moving forward.", description: "Ongoing support", amount: 2500, currency: "QAR", interval: "month",
    includes: ["Agreed maintenance & monitoring", "Prioritized fixes & improvements", "A clear monthly scope & review"] },
];
export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-QA", { maximumFractionDigits: 0 }).format(amount);
}
