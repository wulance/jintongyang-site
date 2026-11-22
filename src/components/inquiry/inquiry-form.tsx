"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site";
import { getProduct, itemCode } from "@/content";
import { buttonClass } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { inquirySchema } from "@/lib/inquiry-schema";

type Labels = Dictionary["contact"]["form"];
type Status = "idle" | "sending" | "sent" | "demo" | "invalid" | "failed";

const projectTypes = ["custom", "oem", "wholesale", "other"] as const;

export function InquiryForm({ locale, labels }: { locale: Locale; labels: Labels }) {
  const product = getProduct(useSearchParams().get("product") ?? "");
  const defaultProduct = product ? product.name[locale] + " (" + itemCode(product) + ")" : "";
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<string[]>([]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const parsed = inquirySchema.safeParse({ ...Object.fromEntries(new FormData(form)), locale });
    if (!parsed.success) {
      setInvalid(Object.keys(parsed.error.flatten().fieldErrors));
      setStatus("invalid");
      return;
    }

    setInvalid([]);
    // No endpoint configured: say so instead of pretending the brief was sent.
    if (!siteConfig.inquiryEndpoint || parsed.data.website) return setStatus("demo");

    setStatus("sending");
    try {
      const response = await fetch(siteConfig.inquiryEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) return setStatus("failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("failed");
    }
  }

  const bad = (name: string) => (invalid.includes(name) ? true : undefined);
  const message = status === "idle" || status === "sending" ? null : labels[status];

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <label className="grid gap-2 text-sm font-medium">
        {labels.name}
        <input name="name" autoComplete="name" className="field" aria-invalid={bad("name")} />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        {labels.company}
        <input name="company" autoComplete="organization" className="field" />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        {labels.email}
        <input name="email" type="email" autoComplete="email" className="field" aria-invalid={bad("email")} />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        {labels.market}
        <input name="market" placeholder={labels.marketHint} className="field" />
      </label>

      <fieldset className="sm:col-span-2">
        <legend className="mb-3 text-sm font-medium">{labels.projectType}</legend>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((type, i) => (
            <label key={type} className="cursor-pointer">
              <input type="radio" name="projectType" value={type} defaultChecked={i === 0} className="peer sr-only" />
              <span className="flex h-10 items-center px-4 text-sm ring-1 ring-inset ring-[#bdbdbd] transition-colors peer-checked:bg-ink peer-checked:text-paper peer-checked:ring-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                {labels.types[type]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="grid gap-2 text-sm font-medium">
        {labels.quantity}
        <input name="quantity" placeholder={labels.quantityHint} className="field" />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        {labels.targetDate}
        <input name="targetDate" placeholder={labels.targetDateHint} className="field" />
      </label>
      <label className="grid gap-2 text-sm font-medium sm:col-span-2">
        {labels.product}
        <input name="product" defaultValue={defaultProduct} className="field" />
      </label>
      <label className="grid gap-2 text-sm font-medium sm:col-span-2">
        {labels.message}
        <textarea name="message" rows={5} placeholder={labels.messageHint} className="field resize-y" aria-invalid={bad("message")} />
      </label>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "sending"} className={buttonClass("ink", "lg", "cursor-pointer disabled:opacity-60")}>
          {status === "sending" ? labels.sending : labels.submit}
        </button>
        <p role="status" aria-live="polite" className="text-sm leading-relaxed text-ink/80">
          {message}
        </p>
      </div>
    </form>
  );
}
