"use client";

import {
  CalendarStar,
  ChartLineUp,
  Robot,
  TerminalWindow,
  type Icon,
} from "@phosphor-icons/react";
import type { ProductIconKey } from "@/types";

export const productIconMap: Record<ProductIconKey, Icon> = {
  agents: Robot,
  terminal: TerminalWindow,
  chart: ChartLineUp,
  events: CalendarStar,
};
