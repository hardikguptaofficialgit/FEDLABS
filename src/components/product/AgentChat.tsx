"use client";

import {
  ArrowUp,
  ChatCircleDots,
  Plus,
  Robot,
  SidebarSimple,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import {
  chatMockReply,
  chatSeedMessages,
  chatSuggestedPrompts,
  chatThreads,
  flagshipProduct,
} from "@/lib/content";
import type { ChatMessage } from "@/types";

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-[#2f2f2f] px-4 py-2.5 text-[13px] leading-relaxed text-white/95 sm:max-w-[75%]">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff8a00]/30 to-[#ff3c00]/15 ring-1 ring-[#ff8a00]/25">
        <Robot weight="fill" size={16} className="text-[#ff8a00]" />
      </div>
      <div className="min-w-0 flex-1 space-y-1 pt-0.5">
        <p className="text-xs font-medium text-white/45">{flagshipProduct.name} Agent</p>
        <div className="max-w-[95%] text-[13px] leading-relaxed text-white/88 whitespace-pre-wrap">
          {message.content.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={i} className="font-semibold text-white">
                {part.slice(2, -2)}
              </strong>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export function AgentChat({ className = "" }: { className?: string }) {
  const [activeThread, setActiveThread] = useState(chatThreads[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>(chatSeedMessages);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isThinking) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: chatMockReply,
        },
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

  return (
    <div
      className={`flex h-[min(640px,75vh)] overflow-hidden rounded-2xl border border-white/[0.12] bg-[#171717] shadow-[0_24px_80px_-12px_rgba(0,0,0,0.65)] ${className}`}
    >
      {/* Sidebar - ChatGPT-style history */}
      <aside
        className={`flex shrink-0 flex-col border-r border-white/[0.08] bg-[#0d0d0d] transition-all ${
          sidebarOpen ? "w-[240px] sm:w-[260px]" : "w-0 overflow-hidden border-r-0"
        }`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] p-3">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/80 transition-colors hover:bg-white/[0.08]"
          >
            <Plus weight="bold" size={14} />
            New chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-white/30">
            Recent
          </p>
          <ul className="space-y-0.5">
            {chatThreads.map((thread) => (
              <li key={thread.id}>
                <button
                  type="button"
                  onClick={() => setActiveThread(thread.id)}
                  className={`w-full rounded-lg px-2.5 py-2.5 text-left transition-colors ${
                    activeThread === thread.id
                      ? "bg-white/[0.1] text-white"
                      : "text-white/55 hover:bg-white/[0.05]"
                  }`}
                >
                  <span className="flex items-center gap-2 text-xs font-medium">
                    <ChatCircleDots weight="fill" size={14} className="shrink-0 opacity-60" />
                    <span className="truncate">{thread.title}</span>
                  </span>
                  <span className="mt-1 block truncate pl-5 text-[10px] text-white/35">
                    {thread.preview}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main chat */}
      <div className="flex min-w-0 flex-1 flex-col bg-[#171717]">
        {/* Top bar */}
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
          <button
            type="button"
            onClick={() => setSidebarOpen((o) => !o)}
            className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white/80"
            aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
          >
            <SidebarSimple weight="bold" size={18} />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {chatThreads.find((t) => t.id === activeThread)?.title ?? "Chat"}
            </p>
            <p className="text-[11px] text-white/40">Marketing agent · Preview</p>
          </div>
          <span className="hidden rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 sm:inline">
            Online
          </span>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-6 sm:px-6"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {messages.length === 1 && (
              <div className="mb-4 flex flex-wrap justify-center gap-2">
                {chatSuggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-white/10 bg-[#2a2a2a] px-3.5 py-1.5 text-xs text-white/70 transition-colors hover:border-white/18 hover:bg-[#333] hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isThinking && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ff8a00]/15">
                  <Robot weight="fill" size={16} className="text-[#ff8a00]" />
                </div>
                <div className="flex items-center gap-1 pt-2">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-white/40 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-white/40 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-white/40 [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Composer - ChatGPT-style */}
        <div className="border-t border-white/[0.06] bg-[#171717] px-4 pb-4 pt-3 sm:px-6">
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-3xl"
          >
            <div className="relative flex items-end rounded-2xl border border-white/10 bg-[#2a2a2a] shadow-inner focus-within:border-white/20">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Message Unify agent…"
                className="max-h-32 min-h-[48px] flex-1 resize-none bg-transparent px-4 py-3.5 text-[13px] leading-relaxed text-white placeholder:text-white/35 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isThinking}
                className="m-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#171717] transition-opacity disabled:cursor-not-allowed disabled:opacity-25 enabled:hover:opacity-90"
                aria-label="Send message"
              >
                <ArrowUp weight="bold" size={16} />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-white/30">
              Unify can draft posts, schedule across Reddit & X, and coordinate team accounts.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
