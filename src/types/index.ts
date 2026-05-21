export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type Pillar = {
  title: string;
  highlight: string;
  description: string;
};

export type ProductStatus = "live" | "preview" | "coming-soon";

export type ProductIconKey = "agents" | "terminal" | "chart" | "events";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  icon: ProductIconKey;
  highlights: string[];
  href?: string;
  featured?: boolean;
};

export type FeatureIconKey =
  | "connect"
  | "team"
  | "agent"
  | "reddit"
  | "xLogo"
  | "schedule"
  | "analytics"
  | "approval";

export type Feature = {
  id: string;
  title: string;
  teaser: string;
  icon: FeatureIconKey;
};

export type WorkflowStep = {
  step: number;
  title: string;
  description: string;
};

export type ConnectedAccount = {
  platform: "reddit" | "x" | "linkedin";
  handle: string;
  owner: string;
  status: "connected" | "pending";
};

export type MoatItem = {
  label: string;
};

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

export type ChatThread = {
  id: string;
  title: string;
  preview: string;
};

export type TeamMemberRole = "admin" | "member";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  access: TeamMemberRole;
  status: "online" | "away";
};
