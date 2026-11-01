"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import mockResponse from "@/data/mock-response.json";
import { Cards } from "@/components/Cards";
import type { CardItem } from "@/components/types";

const THINKING_MS = 2000;

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
    <div className="app">
      <header className="top">
        <h1>Kyoto trip planner</h1>
      </header>

      <main className="thread" aria-live="polite">
        <div className="turn assistant">
          <span className="who">Assistant</span>
          <div className="bubble">
            Tell me about your trip and I&apos;ll suggest a stay, an experience and somewhere to eat.
          </div>
        </div>

        {messages.map((msg) =>
          msg.role === "user" ? (
            <div key={msg.id} className="turn user">
              <span className="who">You</span>
              <div className="bubble">{msg.text}</div>
            </div>
          ) : msg.status === "thinking" ? (
            <div key={msg.id} className="turn assistant">
              <span className="who">Assistant</span>
              <div className="bubble thinking" aria-label="Thinking">
                <span />
                <span />
                <span />
              </div>
            </div>
          ) : (
            <div key={msg.id} className="turn assistant">
              <span className="who">Assistant</span>
              <div className="bubble">Here&apos;s a weekend in Kyoto for two.</div>
              <Cards items={msg.items} />
            </div>
          ),
        )}
        <div ref={endRef} />
      </main>

      <form className="composer" onSubmit={send}>
        <input
          id="message"
          aria-label="Message"
          placeholder={busy ? "Planning your trip…" : "Plan a weekend in Kyoto for two"}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={busy}
          autoComplete="off"
        />
        <button type="submit" disabled={busy || !draft.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
