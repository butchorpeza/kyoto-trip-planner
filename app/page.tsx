"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import mockResponse from "@/data/mock-response.json";
import { Cards } from "@/components/Cards";
import type { CardItem } from "@/components/types";

const THINKING_MS = 2000;

const turn = "flex flex-col gap-1.5";
const who = "text-[0.72rem] font-semibold tracking-[0.08em] text-muted uppercase";
const assistantBubble = "max-w-[88%] rounded-[16px_16px_16px_4px] border border-line bg-surface px-3.5 py-2.5";
const userBubble = "max-w-[88%] rounded-[16px_16px_4px_16px] bg-user px-3.5 py-2.5 text-user-ink";
const dot = "size-2 rounded-full bg-muted animate-dot motion-reduce:animate-none motion-reduce:opacity-60";

type Message =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; status: "thinking" }
  | { id: number; role: "assistant"; status: "done"; items: CardItem[] };

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const nextId = useRef(1);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  function send(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || busy) return;

    const userId = nextId.current++;
    const replyId = nextId.current++;
    setMessages((m) => [
      ...m,
      { id: userId, role: "user", text },
      { id: replyId, role: "assistant", status: "thinking" },
    ]);
    setDraft("");
    setBusy(true);

    setTimeout(() => {
      setMessages((m) =>
        m.map((msg) =>
          msg.id === replyId
            ? { id: replyId, role: "assistant", status: "done", items: mockResponse as CardItem[] }
            : msg,
        ),
      );
      setBusy(false);
    }, THINKING_MS);
  }

  return (
    <div className="mx-auto flex h-full max-w-[560px] flex-col">
      <header className="border-b border-line px-4 py-3.5">
        <h1 className="m-0 text-[1.1rem] font-bold">Kyoto trip planner</h1>
      </header>

      <main className="flex flex-1 flex-col gap-[18px] overflow-y-auto px-4 pt-5 pb-7" aria-live="polite">
        <div className={turn}>
          <span className={who}>Assistant</span>
          <div className={assistantBubble}>
            Tell me about your trip and I&apos;ll suggest a stay, an experience and somewhere to eat.
          </div>
        </div>

        {messages.map((msg) =>
          msg.role === "user" ? (
            <div key={msg.id} className={`${turn} items-end`}>
              <span className={who}>You</span>
              <div className={userBubble}>{msg.text}</div>
            </div>
          ) : msg.status === "thinking" ? (
            <div key={msg.id} className={turn}>
              <span className={who}>Assistant</span>
              <div
                data-thinking
                className={`${assistantBubble} inline-flex w-fit gap-1.5 px-4 py-3.5`}
                aria-label="Thinking"
              >
                <span className={dot} />
                <span className={`${dot} [animation-delay:0.15s]`} />
                <span className={`${dot} [animation-delay:0.3s]`} />
              </div>
            </div>
          ) : (
            <div key={msg.id} className={turn}>
              <span className={who}>Assistant</span>
              <div className={assistantBubble}>Here&apos;s a weekend in Kyoto for two.</div>
              <Cards items={msg.items} />
            </div>
          ),
        )}
        <div ref={endRef} />
      </main>

      <form className="flex gap-2 border-t border-line px-4 pt-3 pb-4" onSubmit={send}>
        <input
          id="message"
          aria-label="Message"
          className="min-w-0 flex-1 rounded-full border border-line bg-surface px-4 py-2.5 text-ink disabled:cursor-not-allowed disabled:bg-bg disabled:text-muted"
          placeholder={busy ? "Planning your trip…" : "Plan a weekend in Kyoto for two"}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={busy}
          autoComplete="off"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-full bg-ink px-[18px] py-2 font-semibold text-bg disabled:cursor-not-allowed disabled:opacity-40"
          disabled={busy || !draft.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
