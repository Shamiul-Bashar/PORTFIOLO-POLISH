"use client";

import {
  useCallback, useEffect, useRef, useState,
  type FormEvent,
} from "react";
import {
  ArrowUpRight, RotateCcw, SendHorizontal, X,
} from "lucide-react";
import {
  type AssistantReply,
} from "@/lib/siam-assistant";
import {
  converseWithSiam, INITIAL_CONVERSATION, type ConversationContext,
} from "@/lib/siam-conversation";
import styles from "./ask-siam-ai.module.css";

type Message = AssistantReply & { id: number; role: "assistant" | "user" };
const WELCOME: Message = {
  id: 0,
  role: "assistant",
  text: "Hello! I'm Ask Siam AI, your personal guide to Siam's portfolio. Say hi, explore a project, ask follow-up questions, or find anything on the site. How can I help?",
};
const PROMPTS = [
  { label: "About Siam", query: "Who is Siam?" },
  { label: "Say Hello", query: "Hi!" },
  { label: "All Projects", query: "Show me your projects" },
  { label: "In Development", query: "What is currently in development?" },
  { label: "Tech Stack", query: "What are his skills and tech stack?" },
  { label: "Education", query: "Tell me about Siam's education" },
  { label: "Contact", query: "How can I contact Siam?" },
  { label: "What Can He Build?", query: "What can Siam build?" },
] as const;

const STARTER_QUESTIONS = [
  { label: "What can you help me explore?", query: "What can you do?" },
  { label: "Which projects are being developed?", query: "What is currently in development?" },
  { label: "How was CrisisMesh built?", query: "Tell me about CrisisMesh 2" },
] as const;


/** Purpose-built robot-head mark; a real bot identity, not a message bubble. */
function RobotHeadMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      className={styles.robotMark}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      aria-hidden="true"
    >
      <path d="M32 12V6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="5.5" r="3" fill="currentColor" />
      <rect x="10" y="15" width="44" height="39" rx="12" fill="#16160F" stroke="currentColor" strokeWidth="3.3" />
      <path d="M7 30H4V40H7M57 30H60V40H57" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect className={styles.robotVisor} x="17" y="24" width="30" height="17" rx="7.5" fill="currentColor" fillOpacity=".11" />
      <g className={styles.robotEyes} fill="currentColor">
        <rect x="21.5" y="29" width="7" height="8" rx="2.6" />
        <rect x="35.5" y="29" width="7" height="8" rx="2.6" />
      </g>
      <path d="M25 46C29.5 49.5 34.5 49.5 39 46" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M24 55V58M40 55V58" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function AskSiamAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [replyPending, setReplyPending] = useState(false);
  const contextRef = useRef<ConversationContext>({ ...INITIAL_CONVERSATION });
  const pendingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageIdRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const reset = useCallback(() => {
    if (pendingRef.current) clearTimeout(pendingRef.current);
    pendingRef.current = null;
    contextRef.current = { ...INITIAL_CONVERSATION };
    messageIdRef.current = 0;
    setMessages([WELCOME]);
    setReplyPending(false);
    setInput("");
    inputRef.current?.focus();
  }, []);

  const send = useCallback((raw: string) => {
    const text = raw.trim().slice(0, 400);
    if (!text || pendingRef.current) return;
    const user: Message = { id: ++messageIdRef.current, role: "user", text };
    const response = converseWithSiam(text, contextRef.current);
    contextRef.current = response.context;
    setMessages((previous) => [...previous, user]);
    setInput("");
    setReplyPending(true);
    pendingRef.current = setTimeout(() => {
      pendingRef.current = null;
      setMessages((previous) => [
        ...previous,
        { id: ++messageIdRef.current, role: "assistant", ...response.reply },
      ]);
      setReplyPending(false);
    }, 320);
  }, []);

  useEffect(() => {
    return () => {
      if (pendingRef.current) clearTimeout(pendingRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onEscape);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onEscape);
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen && scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, replyPending, isOpen]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send(input);
  }

  return (
    <aside className={styles.widget} aria-label="Ask Siam AI portfolio assistant">
      {isOpen && (
        <section
          id="ask-siam-panel"
          className={styles.panel}
          data-ask-siam-panel
          role="dialog"
          aria-modal="false"
          aria-labelledby="ask-siam-heading"
          aria-describedby="ask-siam-description"
        >
          <header className={styles.header}>
            <div className={styles.identity}>
              <span className={styles.assistantIcon} aria-hidden="true"><RobotHeadMark size={27} /></span>
              <div>
                <h2 id="ask-siam-heading">Ask Siam <span>AI</span></h2>
                <p id="ask-siam-description">Personal portfolio assistant</p>
              </div>
            </div>
            <div className={styles.headerActions}>
              <button type="button" onClick={reset} title="Start a new conversation" aria-label="Reset conversation">
                <RotateCcw size={16} />
              </button>
              <button type="button" onClick={close} title="Close assistant" aria-label="Close Ask Siam AI">
                <X size={20} />
              </button>
            </div>
          </header>

          <div className={styles.introLine}>
            <span className={styles.onlineDot} aria-hidden="true" />
            YOUR PORTFOLIO GUIDE · CONVERSATIONAL BOT
          </div>

          <div className={styles.transcript} ref={scrollRef} role="log" aria-live="polite" aria-relevant="additions" aria-label="Chat messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={message.role === "user" ? styles.messageUserRow : styles.messageAssistantRow}
                data-ask-siam-message={message.role}
              >
                <div className={message.role === "user" ? styles.userBubble : styles.assistantBubble}>
                  <p>{message.text}</p>
                  {message.links && message.links.length > 0 && (
                    <div className={styles.messageLinks}>
                      {message.links.map((link) => {
                        const external = link.href.startsWith("https://");
                        return (
                          <a
                            key={link.href + link.label}
                            href={link.href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noopener noreferrer" : undefined}
                            onClick={() => { if (!external && !link.href.startsWith("mailto:")) setIsOpen(false); }}
                          >
                            {link.label} <ArrowUpRight size={13} aria-hidden="true" />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {messages.length === 1 && !replyPending && (
              <div className={styles.starters} data-ask-siam-starters>
                <p>START WITH A QUESTION</p>
                {STARTER_QUESTIONS.map((question) => (
                  <button type="button" key={question.label} onClick={() => send(question.query)}>
                    {question.label} <ArrowUpRight size={14} aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}
            {replyPending && (
              <div className={styles.messageAssistantRow} aria-label="Preparing a portfolio answer">
                <div className={styles.thinking}>
                  <span /><span /><span />
                  <span className={styles.srOnly}>Preparing portfolio answer...</span>
                </div>
              </div>
            )}
          </div>

          <div className={styles.prompts}>
            <p>EXPLORE THIS PORTFOLIO</p>
            <div className={styles.promptList}>
              {PROMPTS.map((prompt) => (
                <button
                  key={prompt.label}
                  type="button"
                  disabled={replyPending}
                  onClick={() => send(prompt.query)}
                  className={styles.prompt}
                >
                  {prompt.label} <ArrowUpRight size={12} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <form className={styles.form} onSubmit={submit}>
            <label className={styles.srOnly} htmlFor="ask-siam-input">Ask a question about Siam</label>
            <input
              ref={inputRef}
              id="ask-siam-input"
              data-ask-siam-input
              value={input}
              onChange={(event) => setInput(event.target.value.slice(0, 400))}
              placeholder="Ask me anything about Siam..."
              maxLength={400}
              enterKeyHint="send"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!input.trim() || replyPending}
              aria-label="Send message to Ask Siam AI"
              className={styles.sendButton}
            >
              <SendHorizontal size={18} aria-hidden="true" />
            </button>
          </form>
          <p className={styles.footnote}>Verified portfolio knowledge · No external AI service</p>
        </section>
      )}

      <button
        ref={triggerRef}
        data-ask-siam-trigger
        type="button"
        className={styles.floatingButton}
        aria-label={isOpen ? "Close Ask Siam AI" : "Open Ask Siam AI"}
        aria-controls="ask-siam-panel"
        aria-expanded={isOpen}
        onClick={() => {
          if (isOpen) close();
          else setIsOpen(true);
        }}
      >
        <span className={styles.floatingLabel} aria-hidden="true">{isOpen ? "CLOSE ASSISTANT" : "ASK SIAM AI"}</span>
        <span className={styles.floatingIcon} aria-hidden="true">
          {isOpen ? <X size={25} /> : <RobotHeadMark size={38} />}
        </span>
        {!isOpen && <span className={styles.floatingStatus} aria-hidden="true" />}
      </button>
    </aside>
  );
}
