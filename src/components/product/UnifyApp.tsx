"use client";

import { UnifyAvatar, UnifyLogo } from "@/components/brand/UnifyLogo";
import {
  ArrowUp,
  CaretDown,
  CaretRight,
  Circle,
  Pulse,
  UsersThree,
  LinkedinLogo,
  MagnifyingGlass,
  NotePencil,
  Plus,
  RedditLogo,
  SidebarSimple,
  SquaresFour,
  UserCircle,
  XLogo,
} from "@phosphor-icons/react";
import { useEffect, useId, useRef, useState } from "react";
import {
  agentRuns,
  chatMockReply,
  chatSeedMessages,
  chatSuggestedPrompts,
  chatThreads,
  connectedAccounts,
  teamMembers,
} from "@/lib/content";
import type { ChatMessage } from "@/types";

type Channel = "reddit" | "x" | "linkedin";
type Agent = "growth" | "launch" | "engage";
type SidebarView = "chat" | "channels" | "accounts" | "team" | "runs";

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

const workspaceNav: { id: SidebarView; label: string; icon: typeof SquaresFour }[] = [
  { id: "channels", label: "Channels", icon: SquaresFour },
  { id: "accounts", label: "Connected accounts", icon: UserCircle },
  { id: "team", label: "Team members", icon: UsersThree },
  { id: "runs", label: "Active runs", icon: Pulse },
];

const runStatusStyle: Record<string, string> = {
  Running: "bg-emerald-500/15 text-emerald-400",
  Scheduled: "bg-white/[0.08] text-white/55",
  Draft: "bg-white/[0.08] text-white/50",
};

const viewTitles: Record<Exclude<SidebarView, "chat">, string> = {
  channels: "Channels",
  accounts: "Connected accounts",
  team: "Team members",
  runs: "Active runs",
};

function memberInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function PlatformIcon({ platform }: { platform: Channel }) {
  const Icon = platformIcon[platform];
  return <Icon weight="fill" size={16} className="shrink-0 text-white/70" />;
}

function AssistantMessage({ content }: { content: string }) {
  return (
    <div className="min-w-0 flex-1 text-[15px] leading-relaxed text-white/88">
      {content.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i} className="whitespace-pre-wrap">
            {part}
          </span>
        )
      )}
    </div>
  );
}

type ComposerProps = {
  input: string;
  setInput: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
  inputRef?: React.RefObject<HTMLTextAreaElement | null>;
};

function Composer({
  input,
  setInput,
  onSubmit,
  onKeyDown,
  disabled,
  inputRef,
}: ComposerProps) {
  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-3xl">
      <div className="unify-composer flex items-end gap-2 rounded-full px-2 py-2">
        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/[0.08] hover:text-white/75"
          aria-label="Add attachment"
        >
          <Plus weight="bold" size={18} />
        </button>
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder="Message your marketing agent…"
          className="max-h-32 min-h-[36px] flex-1 resize-none bg-transparent py-1.5 text-[15px] text-white placeholder:text-white/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={disabled}
          className="unify-send-btn flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-opacity enabled:hover:opacity-90"
          aria-label="Send message"
        >
          <ArrowUp weight="bold" size={18} />
        </button>
      </div>
      <p className="mt-2 text-center text-[11px] text-white/30">
        Preview · Unify can make mistakes. Verify posts before publishing.
      </p>
    </form>
  );
}

export function UnifyApp({ className = "" }: { className?: string }) {
  const [view, setView] = useState<SidebarView>("chat");
  const [activeThread, setActiveThread] = useState(chatThreads[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>(chatSeedMessages);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [channel, setChannel] = useState<Channel>("reddit");
  const [agent, setAgent] = useState<Agent>("growth");
  const [modelOpen, setModelOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const modelMenuRef = useRef<HTMLDivElement>(null);
  const modelMenuId = useId();

  const hasUserMessages = messages.some((m) => m.role === "user");
  const showEmptyHero = view === "chat" && !hasUserMessages && !isThinking;

  const displayAccounts =
    channel === "linkedin"
      ? connectedAccounts
      : connectedAccounts.filter((a) => a.platform === channel);

  useEffect(() => {
    if (view !== "chat") return;
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isThinking, view]);

  useEffect(() => {
    if (!modelOpen) return;
    const close = (e: MouseEvent) => {
      if (
        modelMenuRef.current &&
        !modelMenuRef.current.contains(e.target as Node)
      ) {
        setModelOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [modelOpen]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isThinking) return;
    setView("chat");

    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", content: trimmed },
    ]);
    setInput("");
    setIsThinking(true);

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: "assistant", content: chatMockReply },
      ]);
      setIsThinking(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const openChat = (threadId?: string) => {
    if (threadId) setActiveThread(threadId);
    setView("chat");
  };

  const newChat = () => {
    setMessages(chatSeedMessages);
    setView("chat");
    setInput("");
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const activeThreadTitle =
    chatThreads.find((t) => t.id === activeThread)?.title ?? "New chat";

  return (
    <div
      className={`unify-app-shell flex h-[min(680px,78vh)] overflow-hidden rounded-2xl border bg-black ${className}`}
    >
      {/* Sidebar - solid, no hero bg */}
      <aside
        className={`unify-sidebar flex shrink-0 flex-col transition-[width] duration-200 ${
          sidebarOpen ? "w-[260px] border-r" : "w-0 overflow-hidden border-r-0"
        }`}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-3">
          <UnifyLogo size={26} showWordmark className="min-w-0 flex-1" />
        </div>

        <div className="space-y-0.5 px-2 py-2">
          <button
            type="button"
            onClick={newChat}
            className="flex w-full items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.1]"
          >
            <NotePencil weight="fill" size={17} className="text-white/70" />
            New chat
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/50 transition-colors hover:bg-white/[0.05] hover:text-white/75"
          >
            <MagnifyingGlass weight="fill" size={17} className="text-white/40" />
            Search chats
          </button>
        </div>

        <div
          className="min-h-0 flex-1 overflow-y-auto px-2 pb-2"
          data-lenis-prevent
        >
          <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-white/30">
            Recent
          </p>
          <ul className="space-y-0.5">
            {chatThreads.map((thread) => (
              <li key={thread.id}>
                <button
                  type="button"
                  onClick={() => openChat(thread.id)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    view === "chat" && activeThread === thread.id
                      ? "unify-nav-active text-white"
                      : "text-white/55 hover:bg-white/[0.05]"
                  }`}
                >
                  <span className="block truncate font-medium">{thread.title}</span>
                  <span className="mt-0.5 block truncate text-[11px] text-white/35">
                    {thread.preview}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="my-3 border-t border-white/[0.06]" />

          <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-white/30">
            Workspace
          </p>
          <ul className="space-y-0.5">
            {workspaceNav.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setView(item.id)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                      view === item.id
                        ? "unify-nav-active text-white"
                        : "text-white/55 hover:bg-white/[0.05] hover:text-white/75"
                    }`}
                  >
                    <Icon weight="fill" size={17} className="shrink-0 text-white/40" />
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t border-white/[0.06] p-3">
          <button
            type="button"
            className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 text-left text-sm text-white/65 transition-colors hover:bg-white/[0.05]"
          >
            <span className="truncate font-medium">Acme Startup</span>
            <CaretDown weight="fill" size={14} className="shrink-0 text-white/35" />
          </button>
        </div>
      </aside>

      {/* Main - hero bg image layer only here */}
      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="unify-main-bg" aria-hidden />

        <header className="relative z-10 flex shrink-0 items-center gap-2 border-b border-white/[0.08] bg-black/50 px-3 py-2.5 backdrop-blur-md sm:px-4 sm:py-3">
          <button
            type="button"
            onClick={() => setSidebarOpen((o) => !o)}
            className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/[0.08] hover:text-white"
            aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
          >
            <SidebarSimple weight="fill" size={18} />
          </button>

          <div className="relative min-w-0" ref={modelMenuRef}>
            <button
              type="button"
              aria-expanded={modelOpen}
              aria-controls={modelMenuId}
              onClick={() => setModelOpen((o) => !o)}
              className="flex max-w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08] sm:text-[15px]"
            >
              <UnifyLogo size={20} />
              <span className="truncate">
                {view === "chat" ? "Unify" : viewTitles[view]}
              </span>
              <CaretDown
                weight="fill"
                size={14}
                className={`shrink-0 text-white/40 transition-transform ${modelOpen ? "rotate-180" : ""}`}
              />
            </button>
            {modelOpen && (
              <div
                id={modelMenuId}
                className="absolute left-0 top-full z-30 mt-1 min-w-[220px] rounded-xl border border-white/10 bg-[#212121] py-1 shadow-2xl"
              >
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-white hover:bg-white/[0.06]"
                  onClick={() => {
                    setView("chat");
                    setModelOpen(false);
                  }}
                >
                  <UnifyLogo size={18} />
                  Unify Marketing Agent
                </button>
                {agents.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => {
                      setAgent(a.id);
                      setModelOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-white/[0.06] ${
                      agent === a.id ? "text-white" : "text-white/50"
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {view === "chat" && !showEmptyHero && (
            <span className="hidden truncate text-xs text-white/40 sm:block">
              {activeThreadTitle}
            </span>
          )}

          <span className="ml-auto shrink-0 rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/45">
            Preview
          </span>
        </header>

        {/* Chat */}
        {view === "chat" && (
          <div className="relative z-10 flex min-h-0 flex-1 flex-col">
            <div
              ref={scrollRef}
              className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8"
              data-lenis-prevent
            >
              {showEmptyHero ? (
                <div className="mx-auto flex max-w-2xl flex-col items-center pt-[6vh] sm:pt-[10vh]">
                  <UnifyLogo size={52} />
                  <h2 className="mt-5 text-center text-2xl font-semibold text-white sm:text-[28px]">
                    Ship your next campaign
                  </h2>
                  <p className="mt-2 max-w-md text-center text-sm leading-relaxed text-white/50">
                    Draft Reddit posts, plan X threads, and schedule across your
                    team - all from one conversation.
                  </p>
                  <div className="unify-prompt-card mt-8 w-full overflow-hidden rounded-2xl">
                    <p className="border-b border-white/[0.08] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                      Try asking
                    </p>
                    <ul className="divide-y divide-white/[0.06]">
                      {chatSuggestedPrompts.map((prompt) => (
                        <li key={prompt}>
                          <button
                            type="button"
                            onClick={() => sendMessage(prompt)}
                            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
                          >
                            <span>{prompt}</span>
                            <CaretRight
                              weight="fill"
                              size={14}
                              className="shrink-0 text-white/25"
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="mx-auto flex max-w-3xl flex-col gap-7">
                  {messages.map((msg) =>
                    msg.role === "user" ? (
                      <div key={msg.id} className="flex justify-end">
                        <div className="max-w-[85%] rounded-3xl bg-[#2f2f2f] px-4 py-3 text-[15px] leading-relaxed text-white sm:max-w-[72%]">
                          {msg.content}
                        </div>
                      </div>
                    ) : (
                      <div key={msg.id} className="flex gap-3 sm:gap-4">
                        <UnifyAvatar size={32} />
                        <AssistantMessage content={msg.content} />
                      </div>
                    )
                  )}
                  {isThinking && (
                    <div className="flex gap-3 sm:gap-4">
                      <UnifyAvatar size={32} />
                      <div className="flex items-center gap-1.5 pt-2">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-white/35 [animation-delay:0ms]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-white/35 [animation-delay:150ms]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-white/35 [animation-delay:300ms]" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="relative z-10 shrink-0 border-t border-white/[0.08] bg-black/55 px-4 pb-4 pt-3 backdrop-blur-md sm:px-8">
              <Composer
                input={input}
                setInput={setInput}
                onSubmit={handleSubmit}
                onKeyDown={handleKeyDown}
                disabled={!input.trim() || isThinking}
                inputRef={inputRef}
              />
            </div>
          </div>
        )}

        {/* Workspace panels */}
        {view !== "chat" && (
          <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">
            <div
              className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8"
              data-lenis-prevent
            >
              {view === "channels" && (
                <>
                  <h2 className="text-xl font-semibold text-white">Channels</h2>
                  <p className="mt-1 text-sm text-white/45">
                    Connect platforms for your marketing agents
                  </p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {channels.map((ch) => (
                      <li key={ch.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setChannel(ch.id);
                            setView("accounts");
                          }}
                          className={`unify-panel-card flex w-full flex-col items-start gap-3 rounded-2xl p-5 text-left transition-colors hover:border-white/18 ${
                            channel === ch.id ? "unify-panel-card--active" : ""
                          }`}
                        >
                          <PlatformIcon platform={ch.id} />
                          <div>
                            <p className="font-semibold text-white">{ch.label}</p>
                            <p className="mt-1 text-xs text-white/40">
                              {ch.connected ? "Connected" : "Not connected"}
                            </p>
                          </div>
                          {ch.connected && (
                            <span className="flex items-center gap-1 text-xs text-emerald-400/90">
                              <Circle weight="fill" size={7} />
                              Live
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {view === "accounts" && (
                <>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        Connected accounts
                      </h2>
                      <p className="mt-1 text-sm text-white/45">
                        You + team ·{" "}
                        {channel === "x"
                          ? "X"
                          : channel.charAt(0).toUpperCase() + channel.slice(1)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {channels.map((ch) => (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() => setChannel(ch.id)}
                          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                            channel === ch.id
                              ? "bg-white text-black"
                              : "bg-white/10 text-white/55 hover:bg-white/15 hover:text-white"
                          }`}
                        >
                          {ch.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <ul className="mt-6 space-y-2">
                    {displayAccounts.map((acc) => (
                      <li
                        key={`${acc.platform}-${acc.handle}`}
                        className="unify-panel-card flex items-center gap-4 rounded-xl px-4 py-3.5"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.06]">
                          <PlatformIcon platform={acc.platform} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-white">{acc.handle}</p>
                          <p className="text-xs text-white/40">{acc.owner}</p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${
                            acc.status === "connected"
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-white/[0.06] text-white/40"
                          }`}
                        >
                          {acc.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="mt-4 flex items-center gap-2 rounded-lg border border-dashed border-white/20 px-4 py-2.5 text-sm text-white/50 transition-colors hover:border-white/35 hover:text-white/70"
                  >
                    <Plus weight="bold" size={14} />
                    Add account
                  </button>
                </>
              )}

              {view === "team" && (
                <>
                  <h2 className="text-xl font-semibold text-white">Team members</h2>
                  <p className="mt-1 text-sm text-white/45">
                    FED Engineering · who can run agents and manage connected accounts
                  </p>
                  <ul className="mt-6 space-y-2">
                    {teamMembers.map((member) => (
                      <li
                        key={member.id}
                        className="unify-panel-card flex items-center gap-4 rounded-xl px-4 py-4"
                      >
                        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-sm font-semibold text-white">
                          {memberInitials(member.name)}
                          <span
                            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#171717] ${
                              member.status === "online"
                                ? "bg-emerald-500"
                                : "bg-white/35"
                            }`}
                            title={member.status === "online" ? "Online" : "Away"}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-white">{member.name}</p>
                          <p className="text-xs text-white/40">{member.role}</p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${
                            member.access === "admin"
                              ? "bg-white/12 text-white/70"
                              : "bg-white/[0.06] text-white/45"
                          }`}
                        >
                          {member.access}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="mt-4 flex items-center gap-2 rounded-lg border border-dashed border-white/20 px-4 py-2.5 text-sm text-white/50 transition-colors hover:border-white/35 hover:text-white/70"
                  >
                    <Plus weight="bold" size={14} />
                    Invite member
                  </button>
                </>
              )}

              {view === "runs" && (
                <>
                  <h2 className="text-xl font-semibold text-white">Active runs</h2>
                  <p className="mt-1 text-sm text-white/45">
                    {agents.find((a) => a.id === agent)?.label ?? "Agent"} · live
                    campaigns
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {agents.map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => setAgent(a.id)}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                          agent === a.id
                            ? "bg-white text-black"
                            : "bg-white/10 text-white/50 hover:bg-white/15 hover:text-white"
                        }`}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                  <ul className="mt-6 space-y-2">
                    {agentRuns.map((run) => (
                      <li
                        key={run.name}
                        className="unify-panel-card flex items-center justify-between gap-4 rounded-xl px-4 py-4"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-white">{run.name}</p>
                          <p className="mt-0.5 truncate text-xs text-white/40">
                            {run.detail}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                            runStatusStyle[run.status] ??
                            "bg-white/[0.08] text-white/55"
                          }`}
                        >
                          {run.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="shrink-0 border-t border-white/[0.08] bg-black/55 px-4 py-3 backdrop-blur-md sm:px-8">
              <button
                type="button"
                onClick={() => setView("chat")}
                className="text-sm font-medium text-white/55 transition-colors hover:text-white"
              >
                ← Back to chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
