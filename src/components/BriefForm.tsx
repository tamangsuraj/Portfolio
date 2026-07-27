import { useState, type FormEvent } from "react";
import { identity } from "../data/content";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-line bg-void/40 px-3.5 py-2.5 font-mono text-sm text-ink " +
  "placeholder:text-faint/70 outline-none transition-colors focus:border-pulse/50 " +
  "disabled:opacity-50";

const label = "mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-faint";

export function BriefForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    // bots fill the hidden field; humans never see it
    if (data._honey) return;

    setStatus("sending");
    setError("");

    try {
      const res = await fetch(identity.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: `New brief from ${data.name || "the portfolio"}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const body = await res.json().catch(() => null);
      // FormSubmit returns success as the string "true"
      if (!res.ok || (body && String(body.success) !== "true")) {
        throw new Error(body?.message || `Request failed (${res.status})`);
      }

      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-9 rounded-2xl border border-live/25 bg-live/[0.06] p-6">
        <p className="font-mono text-xs leading-6 text-live">
          → brief received
        </p>
        <p className="mt-2 text-sm leading-relaxed text-dim">
          Thanks — it's in my inbox. I'll get back to you at the address you gave me.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 font-mono text-xs text-faint underline underline-offset-4 transition-colors hover:text-pulse"
        >
          send another
        </button>
      </div>
    );
  }

  const busy = status === "sending";

  return (
    <form onSubmit={onSubmit} className="mt-9 space-y-4">
      {/* honeypot — hidden from people, irresistible to bots */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="brief-name">
            name
          </label>
          <input
            id="brief-name"
            name="name"
            required
            disabled={busy}
            autoComplete="name"
            placeholder="your name"
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="brief-email">
            email
          </label>
          <input
            id="brief-email"
            name="email"
            type="email"
            required
            disabled={busy}
            autoComplete="email"
            placeholder="you@company.com"
            className={field}
          />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="brief-company">
          company <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="brief-company"
          name="company"
          disabled={busy}
          autoComplete="organization"
          placeholder="where you're writing from"
          className={field}
        />
      </div>

      <div>
        <label className={label} htmlFor="brief-message">
          the brief
        </label>
        <textarea
          id="brief-message"
          name="message"
          required
          rows={4}
          disabled={busy}
          placeholder="What are you trying to find out from your data?"
          className={`${field} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-full bg-pulse px-7 py-3.5 font-medium text-void transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Sending…" : "Send a brief"}
          {!busy && <span aria-hidden>↗</span>}
        </button>
        <span className="font-mono text-[11px] text-faint">
          or email me directly
        </span>
      </div>

      <p aria-live="polite" className="min-h-[1.25rem]">
        {status === "error" && (
          <span className="font-mono text-xs text-ember">
            → couldn't send: {error}. Email me at {identity.email} instead.
          </span>
        )}
      </p>
    </form>
  );
}
