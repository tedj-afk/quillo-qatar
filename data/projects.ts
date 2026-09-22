export type Project = {
  slug: string;
  name: string;
  category: string;
  scope: string;
  note: string;
  palette: string;
  tags: string[];
  liveUrl?: string;
  caseStudy: {
    headline: string;
    founderPain: string;
    context: string;
    signature?: {
      label: string;
      title: string;
      body: string;
      trail: string[];
      trust: string[];
      system: string[];
    };
    before: string[];
    diagnosis: string[];
    strategy: string[];
    pageStructure: {
      label: string;
      title: string;
      detail: string;
    }[];
    proof: string[];
    outcome: string;
    takeaway: string;
  };
};

export const projects: Project[] = [
  {
    slug: "stackray",
    name: "Stackray",
    category: "SaaS spend intelligence",
    scope: "Strategy + positioning + UX/UI + development",
    note: "A private-beta SaaS went from hidden inbox problem to evidence-led waitlist.",
    palette: "project-e",
    tags: ["Live", "SaaS", "Waitlist"],
    liveUrl: "https://www.stackray.xyz/",
    caseStudy: {
      headline: "Turning an invisible SaaS spending problem into a product you understand in seconds.",
      founderPain:
        "Stackray could find wasted SaaS spend inside Gmail receipts, but the page had to make a sensitive inbox-scanning product feel obvious, useful, and safe before asking anyone to connect.",
      context:
        "Stackray was not trying to sell software yet. It needed to sell the problem, the insight, and the promise: SaaS waste is invisible until the charge hits. The website had to turn quiet receipts, trials, renewals, duplicate tools, and price changes into something a founder could inspect and act on.",
      signature: {
        label: "The strategic object",
        title: "A financial report someone has already investigated for you.",
        body:
          "The whole page was shaped around evidence before action. Ivory surfaces made the experience feel closer to receipts and documents than generic fintech. Charcoal bands created analytical pauses. Ember accents acted like investigator marks: not decoration, but a signal that the product had found something worth reviewing.",
        trail: ["Inbox", "Billing emails", "Receipts", "Evidence", "Findings", "Actions"],
        trust: [
          "Read-only OAuth",
          "No card needed today",
          "Tokens stay off browser",
          "No selling customer data",
          "Delete access anytime",
          "Evidence before action",
        ],
        system: [
          "Landing page",
          "Waitlist backend",
          "Position-in-line logic",
          "Confirmation emails",
          "Founder alerts",
          "Admin invite controls",
        ],
      },
      before: [
        "SaaS waste lives quietly across receipts, trials, renewals, employee accounts, forgotten tools, and price increases.",
        "The product could scan, detect, compare, flag, and eventually help cancel, but listing every capability would blur the first read.",
        "The biggest conversion objection was not price. It was access: what exactly am I giving this product when I connect Gmail?",
      ],
      diagnosis: [
        "Find one mental model that carries the whole product.",
        "Make every claim feel inspectable instead of hype-driven.",
        "Reduce the ask by designing trust into the conversion path.",
      ],
      strategy: [
        "Position Stackray as the financial X-ray for your SaaS stack: financial names the domain, X-ray makes the invisible visible, and SaaS stack defines what is being examined.",
        "Anchor the page in receipts, vendors, dates, charges, and evidence so the promise feels grounded before any savings claim appears.",
        "Keep the page pointed at one action, joining the waitlist, with read-only access, private beta framing, and no-card language placed near the moments of hesitation.",
      ],
      pageStructure: [
        {
          label: "01",
          title: "Promise",
          detail: "Open with the product in one mental image: see your stack in two minutes.",
        },
        {
          label: "02",
          title: "Recognition",
          detail: "Show familiar SaaS patterns so the visitor thinks, yes, we probably have this problem.",
        },
        {
          label: "03",
          title: "Evidence",
          detail: "Move from vague savings to inspectable artifacts: receipts, vendors, dates, findings, and actions.",
        },
        {
          label: "04",
          title: "Trust",
          detail: "Answer the access objection before it becomes anxiety: read-only, secure, no card, delete anytime.",
        },
        {
          label: "05",
          title: "Conversion",
          detail: "Remove competing CTAs and make Join the waitlist the only next step that matters.",
        },
      ],
      proof: [
        "Live private-beta landing page",
        "Positioning: financial X-ray for your SaaS stack",
        "Read-only Gmail trust architecture",
        "Evidence-led product narrative",
        "Waitlist system collecting leads",
        "Founder alert and admin invite flow",
      ],
      outcome:
        "Stackray shipped a live page and waitlist system that explains a complex Gmail-scanning product without making the visitor decode the machinery. The founder now has a proposition people can understand before finishing the hero: connect your inbox and see where SaaS money is leaking.",
      takeaway:
        "Your product probably is not too complicated. Your website may just be explaining it from the inside out.",
    },
  },
  {
    slug: "helpmegrow",
    name: "HelpMeGrow",
    category: "Social management SaaS",
    scope: "Positioning + landing page + UX/UI",
    note: "An all-in-one social platform, shaped into one clear story for e-commerce owners.",
    palette: "project-f",
    tags: ["Landing page", "SaaS", "Early access"],
    caseStudy: {
      headline: "Making an all-in-one social platform feel easy to understand.",
      founderPain: "HelpMeGrow combines analytics, scheduling, messages, comments, and content distribution. The landing page needed to make that breadth feel useful to a busy store owner.",
      context: "A landing page designed to turn a broad feature set into one focused product story for e-commerce owners. The audience is balancing products, orders, customers, content, and growth; their work is scattered.",
      before: [
        "A broad feature set made the product difficult to explain at first glance.",
        "Capabilities alone did not explain why an overwhelmed store owner should care.",
        "Performance, conversations, and planning felt like separate jobs.",
      ],
      diagnosis: [
        "Connect each capability to a familiar operational need.",
        "Organize the product around knowing, responding, and planning.",
        "Build confidence before repeating the early-access invitation.",
      ],
      strategy: [
        "Give the product one simple narrative: one place to see, answer, and plan everything.",
        "Make real interface moments the proof behind each workflow.",
        "Give ready visitors an early-access entry point in the hero and return to it after the product story.",
      ],
      pageStructure: [
        { label: "01", title: "What is this?", detail: "A social-management platform for e-commerce." },
        { label: "02", title: "Why should I care?", detail: "Better visibility, engagement, and consistency." },
        { label: "03", title: "How does it help?", detail: "Analytics, inbox, comments, and scheduling." },
        { label: "04", title: "Can I trust it?", detail: "Specific product proof and customer evidence." },
        { label: "05", title: "Can I try it?", detail: "A clear early-access conversion moment." },
      ],
      proof: ["Audience-led hero", "Analytics and inbox interface", "Comment management workflow", "Visual content calendar", "Early-access conversion path"],
      outcome: "The final direction brings HelpMeGrow’s core workflows into one focused story. Visitors can understand how the product helps them see performance, stay close to customers, and maintain a consistent content operation.",
      takeaway: "HelpMeGrow did not need to appear more powerful. It needed to make its existing power easier to understand.",
    },
  },
  {
    slug: "quillo",
    name: "Quillo",
    category: "AI learning platform",
    scope: "Positioning + messaging + visual design + landing page",
    note: "A complex AI learning product, shaped into a clear promise: a reliable path through unfamiliar territory.",
    palette: "project-g",
    tags: ["Landing page", "AI", "Education"],
    caseStudy: {
      headline: "Turning an unfamiliar AI learning product into a path people immediately understand.",
      founderPain: "Quillo needed to make a new learning model feel familiar, explain a personalized path, and earn trust in AI-generated knowledge before asking people to start.",
      context: "Quillo builds a sourced learning path around a specific goal, the learner’s starting point, and the foundations they still need.",
      before: ["An unfamiliar category between chatbots, courses, and expert guidance.", "Abundant information without a reliable sequence.", "Skepticism about the credibility of AI-generated knowledge."],
      diagnosis: ["Make direction the central promise.", "Connect the product to familiar learning problems.", "Make evidence and uncertainty visible."],
      strategy: ["Position Quillo as a reliable route through unfamiliar territory.", "Explain the product through mapping, teaching, and continuity.", "Build confidence before the invitation to start a free path."],
      pageStructure: [
        { label: "01", title: "Promise", detail: "Learn the thing no one has made a course for." },
        { label: "02", title: "Problem", detail: "Recognize the cost of unstructured information." },
        { label: "03", title: "Mechanism", detail: "Map the territory, teach in context, and keep the thread." },
        { label: "04", title: "Trust", detail: "Keep claims connected to their sources." },
        { label: "05", title: "Difference", detail: "Explain the gap between a chatbot, a course, and a colleague." },
        { label: "06", title: "Action", detail: "Start a path. The first one is free, with no card." },
      ],
      proof: ["A clear category position", "A three-step product story", "Visible source credibility", "An editorial visual system", "One consistent conversion action"],
      outcome: "The final landing page gives Quillo a clearer position, a stronger trust story, and one journey from first recognition to first path.",
      takeaway: "When information is everywhere, direction becomes the value. Quillo’s page makes the path, the evidence, and the next step easy to understand.",
    },
  },
  {
    slug: "atlas-mode",
    name: "Atlas Mode",
    category: "AI SaaS",
    scope: "Messaging + landing page",
    note: "A sharper first read for a technical product.",
    palette: "project-a",
    tags: ["Concept", "AI", "Launch"],
    caseStudy: {
      headline: "Turning a powerful AI workflow into a page buyers could understand in one pass.",
      founderPain:
        "The founder had a product that demoed well, but the page made prospects work too hard before they understood the use case.",
      context:
        "Atlas Mode needed a launch page that could carry technical depth without opening with technical fog. The job was to make the first screen specific enough for operators and credible enough for technical buyers.",
      before: [
        "The hero led with platform language instead of the urgent operational problem.",
        "Important workflows were buried below general AI claims.",
        "Proof points existed, but they appeared after the buyer had already formed a vague impression.",
      ],
      diagnosis: [
        "Lead with the moment the buyer already recognizes.",
        "Separate workflow clarity from model sophistication.",
        "Move trust signals closer to the first decision point.",
      ],
      strategy: [
        "Reframe the product around the daily decision Atlas Mode improves.",
        "Use product screenshots and workflow cards as the main proof layer.",
        "Create a section order that earns complexity step by step.",
      ],
      pageStructure: [
        {
          label: "01",
          title: "Founder pain",
          detail: "Name the expensive manual workflow before naming the product category.",
        },
        {
          label: "02",
          title: "Product answer",
          detail: "Show the AI workflow as a sequence of decisions, not a feature pile.",
        },
        {
          label: "03",
          title: "Proof close to claim",
          detail: "Pair every major promise with a visible product artifact or operating signal.",
        },
        {
          label: "04",
          title: "Conversion path",
          detail: "Let technical buyers self-qualify before asking them to book time.",
        },
      ],
      proof: [
        "Clearer category frame",
        "Product-led hero",
        "Workflow proof above the fold",
        "Sharper demo CTA",
      ],
      outcome:
        "The concept page gives Atlas Mode a calmer first read: buyers see the painful workflow, understand the product response, and know why a demo is worth taking.",
      takeaway:
        "When the product is complex, the page should not act impressed by the complexity. It should walk the buyer through one painful moment, one clear shift, and one believable next step.",
    },
  },
  {
    slug: "northstar-sync",
    name: "Northstar Sync",
    category: "B2B SaaS",
    scope: "Website refresh",
    note: "A clearer story, proof order, and product frame.",
    palette: "project-b",
    tags: ["Concept", "B2B", "Refresh"],
    caseStudy: {
      headline: "Restructuring a mature SaaS website around the buyer's actual decision path.",
      founderPain:
        "The product had evolved, but the website still explained the old version of the company.",
      context:
        "Northstar Sync needed a refresh that helped buyers understand what changed, why it mattered, and which parts of the product were now strongest.",
      before: [
        "The homepage mixed old positioning with new product capabilities.",
        "Pages competed with each other instead of building a single argument.",
        "Buyers could see features, but not the operational reason to switch.",
      ],
      diagnosis: [
        "Clarify the new center of gravity before touching visuals.",
        "Give each page one job in the buying journey.",
        "Move proof into the same order a founder would use on a sales call.",
      ],
      strategy: [
        "Rebuild the information architecture around buyer questions.",
        "Create a homepage that explains the shift in plain language.",
        "Use supporting pages for depth, comparison, and implementation confidence.",
      ],
      pageStructure: [
        {
          label: "01",
          title: "Old story audit",
          detail: "Identify the claims that no longer match the product or the sales conversation.",
        },
        {
          label: "02",
          title: "Homepage spine",
          detail: "Reorder the page around problem, shift, product, proof, and next step.",
        },
        {
          label: "03",
          title: "Core page roles",
          detail: "Give product, solution, and proof pages different responsibilities.",
        },
        {
          label: "04",
          title: "Launch-ready system",
          detail: "Leave the founder with repeatable sections for future pages.",
        },
      ],
      proof: [
        "Sharper homepage argument",
        "Cleaner page roles",
        "Reusable proof sections",
        "Refresh scope contained",
      ],
      outcome:
        "The refreshed structure helps Northstar Sync sound like the product it has become, while keeping the path to launch small enough to ship.",
      takeaway:
        "A refresh is not just a nicer version of the old site. The useful move is to rebuild the argument around what the buyer needs to believe now.",
    },
  },
  {
    slug: "signal-desk",
    name: "Signal Desk",
    category: "GTM tool",
    scope: "Product page system",
    note: "Dense workflow value made easier to scan.",
    palette: "project-c",
    tags: ["Concept", "GTM", "Copy"],
    caseStudy: {
      headline: "Making a dense GTM workflow scannable without flattening the value.",
      founderPain:
        "The founder could explain the product in a call, but the page collapsed into a long list of features.",
      context:
        "Signal Desk needed a product page system that respected how revenue teams scan: fast problem recognition, then proof that the workflow can actually replace the current mess.",
      before: [
        "Every feature looked equally important.",
        "The page assumed buyers would connect the workflow themselves.",
        "The strongest use cases were hidden inside dense copy blocks.",
      ],
      diagnosis: [
        "Turn the workflow into the organizing principle.",
        "Make the page easier to skim without making it shallow.",
        "Use contrast sections to show what changes after adoption.",
      ],
      strategy: [
        "Create modular page sections for use cases, workflow steps, and role-specific proof.",
        "Use short copy blocks with strong labels so buyers can scan the page out of order.",
        "Build repeatable structures the founder can reuse for future product pages.",
      ],
      pageStructure: [
        {
          label: "01",
          title: "Use-case entry",
          detail: "Open with the GTM mess the buyer is already trying to clean up.",
        },
        {
          label: "02",
          title: "Workflow map",
          detail: "Show how the product moves a team from signal to action.",
        },
        {
          label: "03",
          title: "Role proof",
          detail: "Give sales, marketing, and leadership each a reason to care.",
        },
        {
          label: "04",
          title: "System template",
          detail: "Create a reusable page pattern for future feature launches.",
        },
      ],
      proof: [
        "Scannable workflow story",
        "Reusable product-page modules",
        "Role-specific value",
        "Copy that can expand later",
      ],
      outcome:
        "Signal Desk gets a page system that can explain a heavy workflow quickly, then support deeper reading when the buyer is ready.",
      takeaway:
        "Dense products need better order, not thinner substance. The structure should let a busy buyer skim first and trust the depth second.",
    },
  },
  {
    slug: "kitebase",
    name: "Kitebase",
    category: "Developer SaaS",
    scope: "Positioning + build",
    note: "A founder-led product moved from vague to demo-ready.",
    palette: "project-d",
    tags: ["Concept", "Devtool", "Sprint"],
    caseStudy: {
      headline: "Moving a devtool from founder shorthand to a demo-ready website story.",
      founderPain:
        "The founder knew exactly why the tool mattered, but the site asked developers to decode too much shorthand.",
      context:
        "Kitebase needed positioning and build work that could translate founder knowledge into a page developers would trust before opening docs.",
      before: [
        "The core promise was buried in internal language.",
        "Developer objections were answered too late.",
        "The CTA asked for a demo before the page earned enough confidence.",
      ],
      diagnosis: [
        "Make the technical audience feel understood quickly.",
        "Show the setup moment before the architecture story.",
        "Answer trust, control, and migration concerns earlier.",
      ],
      strategy: [
        "Rewrite the page around the developer's first useful outcome.",
        "Use a tighter section order: problem, setup, control, proof, next step.",
        "Build a launchable page that can later support docs and comparison pages.",
      ],
      pageStructure: [
        {
          label: "01",
          title: "Developer problem",
          detail: "Start with the implementation pain, not the founder's internal category.",
        },
        {
          label: "02",
          title: "First useful moment",
          detail: "Show what the developer can do or understand in the first session.",
        },
        {
          label: "03",
          title: "Trust layer",
          detail: "Bring control, security, and migration concerns into the main story.",
        },
        {
          label: "04",
          title: "Demo handoff",
          detail: "Make the demo feel like the next logical step, not a premature ask.",
        },
      ],
      proof: [
        "Less internal language",
        "Earlier objection handling",
        "Developer-centered page flow",
        "Demo-ready launch page",
      ],
      outcome:
        "Kitebase gets a page that feels closer to a strong founder explanation: specific, practical, and ready to support a serious demo motion.",
      takeaway:
        "For developer tools, clarity is part of trust. The page should show that the team understands the work before it asks for attention.",
    },
  },
];

export const projectVisuals: Record<string, string> = {
  stackray: "/agero/stackray-desktop.png",
  helpmegrow: "/helpmegrow/hero.jpg",
  quillo: "/quillo/landing-preview.webp",
  "atlas-mode": "/agero/work-2.avif",
  "northstar-sync": "/agero/work-3.avif",
  "signal-desk": "/agero/service-web.avif",
  kitebase: "/agero/service-logo.avif",
};

export const featuredProjects = projects.filter(project =>
  ["stackray", "helpmegrow", "quillo", "atlas-mode", "northstar-sync"].includes(project.slug)
);
