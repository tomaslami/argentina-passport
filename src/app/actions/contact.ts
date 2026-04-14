"use server";

import { z } from "zod";

import { resend } from "@/lib/resend";
import { env } from "@/lib/env";

const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  message: z.string().min(20).max(2000),
  locale: z.enum(["en", "es", "ru", "ar"]).default("en"),
});

export type ContactState = {
  status: "idle" | "success" | "error" | "validation";
  errors?: Record<string, string>;
  message?: string;
};

export const contactInitialState: ContactState = { status: "idle" };

export async function submitContact(
  _prevState: ContactState = contactInitialState,
  formData: FormData,
): Promise<ContactState> {
  void _prevState;
  const parsed = ContactSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      errors[path] = issue.message;
    });

    return {
      status: "validation",
      errors,
    };
  }

  const { name, email, phone, message, locale } = parsed.data;

  try {
    await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: env.RESEND_TO_EMAIL,
      subject: `New consultation request (${locale.toUpperCase()})`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        `Locale: ${locale}`,
        "---",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return {
      status: "success",
      message: "SUBMITTED",
    };
  } catch (error) {
    console.error("[submitContact]", error);
    return {
      status: "error",
      message: "UNABLE_TO_SEND",
    };
  }
}
