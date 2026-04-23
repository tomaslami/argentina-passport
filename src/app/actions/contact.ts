"use server";

import { z } from "zod";
import { headers } from "next/headers";

import { resend } from "@/lib/resend";
import { env } from "@/lib/env";

const ContactSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email().max(200),
  phone: z.string().max(30).optional().or(z.literal("")),
  country: z.string().min(2).max(100),
  language: z.enum(["English", "Russian", "Arabic", "Spanish"]),
  investmentRange: z.enum(["$500K-$1M", "$1M-$3M", "$3M-$5M", "$5M+"]),
  message: z.string().max(1000).optional().or(z.literal("")),
  website: z.string().max(0, "spam detected"), // honeypot — must be empty
});

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string }
  | { status: "validation"; errors: Record<string, string> };

export const contactInitialState: ContactState = { status: "idle" };

// In-memory rate limiting (per serverless instance).
// For multi-region deployments, migrate to Upstash Redis.
const submissions = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 3_600_000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const history = (submissions.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (history.length >= RATE_LIMIT) return true;
  history.push(now);
  submissions.set(ip, history);
  return false;
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c
  );
}

function renderEmail(data: z.infer<typeof ContactSchema>): string {
  return `
    <h2 style="font-family:sans-serif">New consultation request — Argentina Passport</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      <tr><td style="padding:6px 16px 6px 0;color:#666">Name</td><td style="padding:6px 0"><strong>${esc(data.fullName)}</strong></td></tr>
      <tr><td style="padding:6px 16px 6px 0;color:#666">Email</td><td style="padding:6px 0"><strong>${esc(data.email)}</strong></td></tr>
      <tr><td style="padding:6px 16px 6px 0;color:#666">Phone</td><td style="padding:6px 0">${esc(data.phone ?? "—")}</td></tr>
      <tr><td style="padding:6px 16px 6px 0;color:#666">Country</td><td style="padding:6px 0">${esc(data.country)}</td></tr>
      <tr><td style="padding:6px 16px 6px 0;color:#666">Language</td><td style="padding:6px 0">${esc(data.language)}</td></tr>
      <tr><td style="padding:6px 16px 6px 0;color:#666">Investment</td><td style="padding:6px 0">${esc(data.investmentRange)}</td></tr>
    </table>
    ${data.message ? `<p style="font-family:sans-serif;margin-top:16px"><strong>Message:</strong><br>${esc(data.message).replace(/\n/g, "<br/>")}</p>` : ""}
  `;
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const ip =
    ((await headers()).get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";

  if (isRateLimited(ip)) {
    return { status: "error", message: "rateLimit" };
  }

  const parsed = ContactSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path.join(".")] = issue.message;
    }
    return { status: "validation", errors };
  }

  const data = parsed.data;

  try {
    await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: env.RESEND_TO_EMAIL,
      replyTo: data.email,
      subject: `New consultation — ${data.fullName} (${data.investmentRange})`,
      html: renderEmail(data),
    });
    return { status: "success" };
  } catch (err) {
    console.error("[contact] send failed:", (err as Error).message);
    return { status: "error", message: "generic" };
  }
}
