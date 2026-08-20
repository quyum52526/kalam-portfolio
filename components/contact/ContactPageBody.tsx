"use client";

import { useId, useState, type FormEvent } from "react";
import { Calendar } from "lucide-react";
import { workCategories } from "@/data/categories";
import { primaryContactChannels, profileContactChannels } from "@/data/contact";
import { cn } from "@/lib/utils";

/** Easy-to-change targets for this page's WhatsApp/email actions — kept as one small
 *  object right here rather than threaded through data/contact.ts, since PRIMARY_EMAIL
 *  here is deliberately the secondary/personal address (data/contact.ts's own
 *  `emailPrimary`/`emailSecondary` naming means something different site-wide — Footer,
 *  FloatingDock, and the Direct Lines list below all still read from that file). */
export const CONTACT_CONSTANTS = {
  WHATSAPP_NUMBER: "8801962434901",
  PRIMARY_EMAIL: "quyum52526@gmail.com",
};

const NEED_OPTIONS = [...workCategories.map((c) => c.label), "Something else"];

// GAP — no budget bands were specified; these are a reasonable placeholder scale, not
// confirmed copy. Adjust freely.
const BUDGET_OPTIONS = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
];

const BOOK_CALL_MESSAGE =
  "Hi Kalam — I would like to book a 20-minute call about a project.";

interface BriefFields {
  name: string;
  email: string;
  need: string;
  budget: string;
  reference: string;
  details: string;
}

interface BriefErrors {
  name?: string;
  email?: string;
  details?: string;
  reference?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validate(fields: BriefFields): BriefErrors {
  const errors: BriefErrors = {};
  if (!fields.name.trim()) errors.name = "Your name is required.";
  if (!fields.email.trim() || !EMAIL_RE.test(fields.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (fields.details.trim().length < 20) {
    errors.details = "Add at least 20 characters so I know what you need.";
  }
  if (fields.reference.trim() && !isValidHttpUrl(fields.reference.trim())) {
    errors.reference = "Enter a valid link (starting with http:// or https://).";
  }
  return errors;
}

/** Builds the exact WhatsApp/email brief text — real newlines, "Reference:" omitted
 *  entirely when that field is empty. */
function buildBriefMessage(fields: BriefFields): string {
  const lines = [
    "New project brief from kalamcreative.com",
    "",
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Need: ${fields.need}`,
    `Budget: ${fields.budget}`,
  ];
  if (fields.reference.trim()) {
    lines.push(`Reference: ${fields.reference}`);
  }
  lines.push("", "Details:", fields.details);
  return lines.join("\n");
}

// text-base (16px) below sm prevents iOS Safari's auto-zoom-on-focus; sm:text-sm
// (14px) restores the original desktop/tablet size unchanged. min-h-11 (44px) is a
// touch-target floor — py-2.5 + text-sm alone renders ~40px, just under the minimum.
const INPUT_CLASS =
  "w-full min-h-11 rounded-xl border border-border bg-surface-inset px-4 py-2.5 text-base text-text-body placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring sm:text-sm";
const LABEL_CLASS = "mb-1.5 block text-sm font-medium text-text-body";
const ERROR_CLASS = "mt-1 text-xs text-danger";

export function ContactPageBody() {
  const formId = useId();
  const [fields, setFields] = useState<BriefFields>({
    name: "",
    email: "",
    need: NEED_OPTIONS[0],
    budget: BUDGET_OPTIONS[1],
    reference: "",
    details: "",
  });
  const [errors, setErrors] = useState<BriefErrors>({});

  function updateField<K extends keyof BriefFields>(key: K, value: BriefFields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function runValidation(): boolean {
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  // Nothing below is stored anywhere — no backend, no database, no analytics. The
  // brief is only ever URL-encoded into a wa.me / mailto link that the visitor's own
  // device opens; this app never transmits it anywhere itself.
  // TODO: once a real backend exists (Formspree, Resend, or a Next.js API route that
  // also accepts file uploads), have these handlers POST there too, instead of (or in
  // addition to) opening WhatsApp/mailto.
  function openWhatsApp() {
    const message = buildBriefMessage(fields);
    const url = `https://wa.me/${CONTACT_CONSTANTS.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function openEmail() {
    const message = buildBriefMessage(fields);
    const subject = `New project brief — ${fields.name}`;
    const url = `mailto:${CONTACT_CONSTANTS.PRIMARY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (runValidation()) openWhatsApp();
  }

  function handleEmailFallback() {
    if (runValidation()) openEmail();
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr]">
      {/* Left — brief form */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-2xl border border-border bg-surface-card p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Send a project brief
        </h2>
        <p className="mt-1 text-sm text-muted">
          Five fields. I reply within one business day.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-name`} className={LABEL_CLASS}>
              Your name
            </label>
            <input
              id={`${formId}-name`}
              type="text"
              value={fields.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Your name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${formId}-name-error` : undefined}
              className={INPUT_CLASS}
            />
            {errors.name && (
              <p id={`${formId}-name-error`} className={ERROR_CLASS}>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={`${formId}-email`} className={LABEL_CLASS}>
              Email
            </label>
            <input
              id={`${formId}-email`}
              type="email"
              inputMode="email"
              value={fields.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="you@company.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${formId}-email-error` : undefined}
              className={INPUT_CLASS}
            />
            {errors.email && (
              <p id={`${formId}-email-error`} className={ERROR_CLASS}>
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={`${formId}-need`} className={LABEL_CLASS}>
              What do you need?
            </label>
            <select
              id={`${formId}-need`}
              value={fields.need}
              onChange={(e) => updateField("need", e.target.value)}
              className={INPUT_CLASS}
            >
              {NEED_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`${formId}-budget`} className={LABEL_CLASS}>
              Budget range (USD)
            </label>
            <select
              id={`${formId}-budget`}
              value={fields.budget}
              onChange={(e) => updateField("budget", e.target.value)}
              className={INPUT_CLASS}
            >
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor={`${formId}-details`} className={LABEL_CLASS}>
              Project details
            </label>
            <textarea
              id={`${formId}-details`}
              rows={5}
              value={fields.details}
              onChange={(e) => updateField("details", e.target.value)}
              placeholder="What are you building, who is it for, and when do you need it?"
              aria-invalid={Boolean(errors.details)}
              aria-describedby={errors.details ? `${formId}-details-error` : undefined}
              className={cn(INPUT_CLASS, "min-h-[140px] resize-y")}
            />
            <span className="mt-1 block text-xs text-muted">
              {fields.details.length} character{fields.details.length === 1 ? "" : "s"}
            </span>
            {errors.details && (
              <p id={`${formId}-details-error`} className={ERROR_CLASS}>
                {errors.details}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor={`${formId}-reference`} className={LABEL_CLASS}>
              Reference link <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id={`${formId}-reference`}
              type="url"
              inputMode="url"
              value={fields.reference}
              onChange={(e) => updateField("reference", e.target.value)}
              placeholder="Google Drive, Dropbox, Figma, or a site link"
              aria-invalid={Boolean(errors.reference)}
              aria-describedby={`${formId}-reference-help${errors.reference ? ` ${formId}-reference-error` : ""}`}
              className={INPUT_CLASS}
            />
            <p id={`${formId}-reference-help`} className="mt-1.5 text-xs text-muted">
              Put your files in a shared folder and paste the link — attachments cannot
              travel over WhatsApp links.
            </p>
            {errors.reference && (
              <p id={`${formId}-reference-error`} className={ERROR_CLASS}>
                {errors.reference}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-action-primary px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
          >
            Send on WhatsApp <span aria-hidden>→</span>
          </button>

          <button
            type="button"
            onClick={handleEmailFallback}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border-strong px-6 text-sm font-semibold text-text-body transition-colors hover:bg-surface-inset sm:w-auto"
          >
            Send by email instead
          </button>
        </div>

        <p className="mt-4 text-sm text-muted">
          Or email{" "}
          <a
            href={`mailto:${CONTACT_CONSTANTS.PRIMARY_EMAIL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-link underline underline-offset-4"
          >
            {CONTACT_CONSTANTS.PRIMARY_EMAIL}
          </a>{" "}
          directly.
        </p>

        <p className="mt-4 text-xs text-muted">
          Opens WhatsApp with your brief filled in — just hit send. You can attach
          files there too.
        </p>
      </form>

      {/* Right — direct lines, book time, elsewhere */}
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-border bg-surface-card p-6">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted">
            Direct lines
          </h3>
          <ul className="mt-4 flex flex-col gap-4">
            {primaryContactChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={channel.label}
                    className="flex items-center gap-3 text-sm transition-opacity hover:opacity-80"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-inset text-muted">
                      <Icon size={16} aria-hidden />
                    </span>
                    {/* min-w-0 lets this flex item shrink below its text's intrinsic
                        width — without it, a long unbroken value like an email address
                        forces the row (and the card) wider than the viewport. */}
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider text-muted">
                        {channel.label}
                      </span>
                      <span className="block break-words font-medium text-text-body">
                        {channel.value}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-surface-card p-6">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted">
            Book time
          </h3>
          <p className="mt-3 text-sm text-muted">
            A 20-minute call is usually faster than five emails. Dhaka time, GMT+6.
          </p>
          <a
            href={`https://wa.me/${CONTACT_CONSTANTS.WHATSAPP_NUMBER}?text=${encodeURIComponent(BOOK_CALL_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 text-sm font-semibold text-navy-900 transition-opacity hover:opacity-90"
          >
            Request a 20-min call
            <Calendar size={16} aria-hidden />
          </a>
          <p className="mt-3 flex items-center gap-2 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden />
            Taking new projects for September
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface-card p-6">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted">
            Elsewhere
          </h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {profileContactChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={channel.label}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-sm font-medium text-text-body transition-colors hover:bg-surface-inset"
                  >
                    <Icon size={16} aria-hidden />
                    {channel.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
