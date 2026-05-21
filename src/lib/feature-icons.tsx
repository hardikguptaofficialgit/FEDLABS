"use client";

import {
  Calendar,
  ChartLine,
  PlugsConnected,
  RedditLogo,
  Robot,
  ShieldCheck,
  UsersThree,
  XLogo,
  type Icon,
} from "@phosphor-icons/react";
import type { FeatureIconKey } from "@/types";

export const featureIconMap: Record<FeatureIconKey, Icon> = {
  connect: PlugsConnected,
  team: UsersThree,
  agent: Robot,
  reddit: RedditLogo,
  xLogo: XLogo,
  schedule: Calendar,
  analytics: ChartLine,
  approval: ShieldCheck,
};
