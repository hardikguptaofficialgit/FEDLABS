"use client";

import {
  CaretDown,
  Circle,
  LinkedinLogo,
  Plus,
  RedditLogo,
  Robot,
  XLogo,
} from "@phosphor-icons/react";
import { useState } from "react";
import {
  agentRuns,
  connectedAccounts,
  flagshipProduct,
} from "@/lib/content";

type Channel = "reddit" | "x" | "linkedin";
type Agent = "growth" | "launch" | "engage";

const platformIcon = {
  reddit: RedditLogo,
  x: XLogo,
  linkedin: LinkedinLogo,
} as const;

const channels: { id: Channel; label: string; connected: boolean }[] = [
  { id: "reddit", label: "Reddit", connected: true },
  { id: "x", label: "X", connected: true },
  { id: "linkedin", label: "LinkedIn", connected: false },
];

const agents: { id: Agent; label: string }[] = [
  { id: "growth", label: "Growth agent" },
  { id: "launch", label: "Launch agent" },
  { id: "engage", label: "Engage agent" },
];

function PlatformIcon({ platform }: { platform: Channel }) {
  const Icon = platformIcon[platform];
  return <Icon weight="fill" size={15} className="shrink-0" />;
}

const runStatusStyle: Record<string, string> = {
  Running: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Scheduled: "bg-white/[0.06] text-white/55 border-white/10",
  Draft: "bg-amber-500/10 text-amber-400/90 border-amber-500/20",
};

export function AgentAppPreview({ className = "" }: { className?: string }) {
  const [channel, setChannel] = useState<Channel>("reddit");
  const [agent, setAgent] = useState<Agent>("growth");
  const [addPulse, setAddPulse] = useState(false);

  const displayAccounts =
    channel === "linkedin"
      ? connectedAccounts
      : connectedAccounts.filter((a) => a.platform === channel);

  const handleAdd = () => {
    setAddPulse(true);
    window.setTimeout(() => setAddPulse(false), 600);
  };

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/[0.14] bg-[#0d0f13] shadow-[0_24px_80px_-12px_rgba(0,0,0,0.65)] ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-white/[0.07] bg-[#0a0c10] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff8a00]/25 to-[#ff3c00]/15 ring-1 ring-[#ff8a00]/20">
            <Robot weight="fill" size={18} className="text-[#ff8a00]" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-none text-white">
              {flagshipProduct.name}
            </p>
            <p className="mt-0.5 text-[10px] text-white/40">workspace</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-medium text-white/75 transition-colors hover:bg-white/[0.08]"
          >
            Acme Startup
            <CaretDown weight="fill" size={11} className="text-white/50" />
          </button>
          <span
            className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
            title="Workspace active"
          />
        </div>
      </div>

      <div className="relative grid min-h-[380px] sm:grid-cols-[152px_1fr] lg:min-h-[420px]">
        {/* Sidebar */}
        <aside className="border-b border-white/[0.06] bg-[#0a0c10] p-3 sm:border-b-0 sm:border-r sm:p-4">
          <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/30">
            Channels
          </p>
          <ul className="space-y-1" role="tablist" aria-label="Channels">
            {channels.map((ch) => (
              <li key={ch.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={channel === ch.id}
                  onClick={() => setChannel(ch.id)}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium transition-colors ${
                    channel === ch.id
                      ? "bg-white/[0.08] text-white ring-1 ring-white/10"
                      : "text-white/45 hover:bg-white/[0.04] hover:text-white/70"
                  }`}
                >
                  <PlatformIcon platform={ch.id} />
                  <span>{ch.label}</span>
                  {ch.connected && (
                    <Circle
                      weight="fill"
                      size={7}
                      className="ml-auto text-emerald-500"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <p className="mb-2 mt-5 px-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/30">
            Agents
          </p>
          <ul className="space-y-1" role="tablist" aria-label="Agents">
            {agents.map((a) => (
              <li key={a.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={agent === a.id}
                  onClick={() => setAgent(a.id)}
                  className={`w-full rounded-lg px-2.5 py-2 text-left text-xs font-medium transition-colors ${
                    agent === a.id
                      ? "bg-[#ff8a00]/12 text-[#ff8a00] ring-1 ring-[#ff8a00]/25"
                      : "text-white/50 hover:bg-white/[0.04] hover:text-white/75"
                  }`}
                >
                  {a.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main */}
        <div className="flex flex-col bg-[#111318] p-4 sm:p-5">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[15px] font-semibold text-white">
                Connected accounts
              </h3>
              <p className="mt-0.5 text-[11px] text-white/38">
                You + team ·{" "}
                {channel === "x"
                  ? "X"
                  : channel.charAt(0).toUpperCase() + channel.slice(1)}
              </p>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className={`flex shrink-0 items-center gap-1 rounded-lg border border-dashed px-2.5 py-1.5 text-[11px] font-medium transition-all ${
                addPulse
                  ? "border-[#ff8a00]/50 bg-[#ff8a00]/10 text-[#ff8a00]"
                  : "border-white/18 text-white/45 hover:border-white/28 hover:text-white/65"
              }`}
            >
              <Plus weight="bold" size={12} />
              Add
            </button>
          </div>

          <ul className="mb-5 space-y-2">
            {displayAccounts.map((acc) => (
              <li
                key={`${acc.platform}-${acc.handle}`}
                className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#0c0e12] px-3.5 py-2.5 transition-colors hover:border-white/[0.12]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05]">
                  <PlatformIcon platform={acc.platform} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-white">
                    {acc.handle}
                  </p>
                  <p className="text-[10px] text-white/38">{acc.owner}</p>
                </div>
                <span
                  className={`shrink-0 rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
                    acc.status === "connected"
                      ? "bg-emerald-500/12 text-emerald-400"
                      : "bg-white/[0.05] text-white/35"
                  }`}
                >
                  {acc.status}
                </span>
              </li>
            ))}
          </ul>

          <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/30">
            Active runs · {agents.find((a) => a.id === agent)?.label}
          </p>
          <ul className="space-y-2">
            {agentRuns.map((run) => {
              const style =
                runStatusStyle[run.status] ??
                "bg-white/[0.06] text-white/55 border-white/10";
              return (
                <li
                  key={run.name}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-[#0c0e12] px-3.5 py-3 transition-colors hover:border-white/[0.11]"
                >
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-white">
                      {run.name}
                    </p>
                    <p className="mt-0.5 truncate text-[10px] text-white/38">
                      {run.detail}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-medium ${style}`}
                  >
                    {run.status}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
