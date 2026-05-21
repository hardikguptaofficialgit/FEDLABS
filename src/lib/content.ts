import type {
  ChatMessage,
  ChatThread,
  ConnectedAccount,
  Feature,
  MoatItem,
  NavLink,
  Pillar,
  Product,
  SocialLink,
  TeamMember,
  WorkflowStep,
} from "@/types";

export const siteConfig = {
  name: "FED Labs",
  tagline:
    "Products curated by the FED Society engineering team - built for founders",
  fedMainUrl:
    process.env.NEXT_PUBLIC_FED_MAIN_URL ?? "http://localhost:5173",
  contactEmail: "labs@fedkiit.org",
};

export const heroContent = {
  subtitle:
    "We design and ship software for founders - marketing automation, team tooling, and the infrastructure to grow faster.",
  stats: [
    { label: "Team", value: "FED Engineering" },
    { label: "Focus", value: "Founders" },
    { label: "Status", value: "Shipping" },
  ],
};

export const flagshipProduct = {
  id: "unify",
  name: "Unify",
  fullName: "Unify Agents",
  tagline: "Unified AI agents for founder marketing",
  description:
    "One minimal interface to connect Reddit, X, and more - yours and your team's - then run AI marketing agents that post, engage, and grow on autopilot.",
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Unify", href: "#unify" },
  { label: "Features", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
];

export const heroRotatingWords = [
  "Innovate.",
  "Build.",
  "Ship.",
  "Empower.",
  "Create.",
  "Deliver.",
];

export const pillars: Pillar[] = [
  {
    title: "Built by",
    highlight: "FED Engineering",
    description:
      "FED Labs is the product studio inside FED Society - we ship tools founders use every day for distribution and growth.",
  },
  {
    title: "Curated for",
    highlight: "founders",
    description:
      "No bloated martech stacks. Unify is opinionated around startup marketing: Reddit seeding, X threads, and team-coordinated social presence.",
  },
  {
    title: "Team-first",
    highlight: "by design",
    description:
      "Connect your accounts and your co-founders' - agents run with clear permissions, approval flows, and a single shared workspace.",
  },
];

export const products: Product[] = [
  {
    id: "unify",
    name: "Unify",
    tagline: flagshipProduct.tagline,
    description: flagshipProduct.description,
    status: "preview",
    icon: "agents",
    featured: true,
    href: "#unify",
    highlights: [
      "Reddit + X connectors",
      "Team account linking",
      "Marketing AI agents",
      "Approval & scheduling",
    ],
  },
  {
    id: "founder-os",
    name: "Founder OS",
    tagline: "Startup intelligence & execution",
    description:
      "Autonomous intelligence infrastructure - simulate outcomes, compound founder memory, and run strategic agents.",
    status: "coming-soon",
    icon: "terminal",
    highlights: ["Digital twin", "AI board room", "Memory graph"],
  },
  {
    id: "event-forge",
    name: "Event Forge",
    tagline: "Hackathons & founder events",
    description:
      "Registration, teams, and live insights - extending FED Society events into cohesive founder experiences.",
    status: "coming-soon",
    icon: "events",
    highlights: ["Live events", "Team tooling", "Sponsor dashboards"],
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "hardik",
    name: "Hardik",
    role: "Engineering · Unify",
    access: "member",
    status: "online",
  },
  {
    id: "rajatava",
    name: "Rajatava",
    role: "Engineering · Unify",
    access: "member",
    status: "online",
  },
  {
    id: "krishna",
    name: "Krishna",
    role: "Engineering · Unify",
    access: "member",
    status: "away",
  },
];

export const connectedAccounts: ConnectedAccount[] = [
  {
    platform: "reddit",
    handle: "u/founder_alex",
    owner: "You",
    status: "connected",
  },
  {
    platform: "reddit",
    handle: "u/sarah_pm",
    owner: "Sarah · Co-founder",
    status: "connected",
  },
  {
    platform: "x",
    handle: "@buildinpublic",
    owner: "You",
    status: "connected",
  },
  {
    platform: "x",
    handle: "@sarahbuilds",
    owner: "Sarah · Co-founder",
    status: "connected",
  },
  {
    platform: "linkedin",
    handle: "Company page",
    owner: "Team",
    status: "pending",
  },
];

export const chatThreads: ChatThread[] = [
  {
    id: "reddit-campaign",
    title: "Reddit launch campaign",
    preview: "Draft posts for r/SaaS and r/startups…",
  },
  {
    id: "x-thread",
    title: "X thread - product launch",
    preview: "6-post thread for tomorrow 9am…",
  },
  {
    id: "engage-replies",
    title: "Engagement replies",
    preview: "Reply to 12 mentions from last week…",
  },
];

export const chatSeedMessages: ChatMessage[] = [
  {
    id: "m1",
    role: "assistant",
    content:
      "Hi - I'm your Unify marketing agent. I can draft Reddit posts, X threads, schedule across your connected accounts, and coordinate with your team's profiles. What would you like to work on?",
  },
];

export const chatSuggestedPrompts = [
  "Draft a Reddit post for our launch",
  "Plan a 6-post X thread for tomorrow",
  "Which subreddits fit our ICP?",
  "Schedule posts for me + my co-founder",
];

export const chatMockReply =
  "Here's a draft tailored for your connected accounts:\n\n**Reddit (u/founder_alex)** - r/SaaS\n> We built Unify so founders can run marketing agents across Reddit & X without juggling five tools. Happy to share what we learned shipping v0.\n\n**X (@buildinpublic)** - Thread hook\n> Most founders don't need more dashboards - they need one agent workspace that actually posts.\n\nWant me to schedule these, or adjust tone for a more technical audience?";

export const agentRuns = [
  {
    name: "Reddit seeding",
    platform: "Reddit",
    status: "Running",
    detail: "4 subreddits · founder + Sarah",
  },
  {
    name: "X launch thread",
    platform: "X",
    status: "Scheduled",
    detail: "Tomorrow 9:00 AM · 6 posts",
  },
  {
    name: "Engagement replies",
    platform: "X",
    status: "Draft",
    detail: "Awaiting approval",
  },
];

export const features: Feature[] = [
  {
    id: "unified-ui",
    title: "AI chat interface",
    teaser: "ChatGPT-style agent chat - draft campaigns, get post ideas, and approve actions in conversation.",
    icon: "agent",
  },
  {
    id: "reddit",
    title: "Reddit connections",
    teaser: "Link your Reddit and teammates' accounts for coordinated community marketing.",
    icon: "reddit",
  },
  {
    id: "x",
    title: "X (Twitter) automation",
    teaser: "Schedule threads, replies, and engagement runs from a single command center.",
    icon: "xLogo",
  },
  {
    id: "team",
    title: "Team member accounts",
    teaser: "Invite co-founders and grant per-platform permissions - everyone posts in sync.",
    icon: "team",
  },
  {
    id: "connect",
    title: "Multi-platform connect",
    teaser: "OAuth-ready connectors for Reddit, X, LinkedIn, and more channels on the roadmap.",
    icon: "connect",
  },
  {
    id: "schedule",
    title: "Smart scheduling",
    teaser: "Queue posts across accounts with timezone-aware windows and rate limits.",
    icon: "schedule",
  },
  {
    id: "approval",
    title: "Approval workflows",
    teaser: "Review agent drafts before they go live - solo founder or team guardrails.",
    icon: "approval",
  },
  {
    id: "analytics",
    title: "Run analytics",
    teaser: "Track impressions, replies, and conversion signals per agent and per account.",
    icon: "analytics",
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    step: 1,
    title: "Connect accounts",
    description:
      "Link Reddit, X, and other platforms - yours and each team member's - in under a minute.",
  },
  {
    step: 2,
    title: "Configure agents",
    description:
      "Pick marketing agents for seeding, threads, or engagement. Set voice, subreddits, and guardrails.",
  },
  {
    step: 3,
    title: "Automate & approve",
    description:
      "Agents draft and schedule. You approve when needed. Everything runs from one minimal dashboard.",
  },
];

export const moatItems: MoatItem[] = [
  { label: "Team-scoped permissions" },
  { label: "Cross-platform orchestration" },
  { label: "Founder-tuned agent prompts" },
  { label: "Audit log for every post" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/fedkiit/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/fedkiit?igsh=amNpM3UxMjE1d3Iy",
  },
  {
    label: "X (Twitter)",
    href: "http://twitter.com/federation_kiit",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@federationkiit",
  },
  {
    label: "Medium",
    href: "http://medium.com/@fedkiit",
  },
];

export const footerExploreLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Unify", href: "#unify" },
  { label: "Features", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
];

export const statusLabels: Record<
  Product["status"],
  { label: string; className: string }
> = {
  live: {
    label: "Live",
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  },
  preview: {
    label: "In preview",
    className: "border-accent-orange/30 bg-accent-orange/10 text-accent-orange",
  },
  "coming-soon": {
    label: "Coming soon",
    className: "border-white/15 bg-white/5 text-text-muted",
  },
};
