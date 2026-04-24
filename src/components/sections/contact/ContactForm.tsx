"use client";
// Reason: useActionState, form interactivity, controlled select states.

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { submitContact, contactInitialState } from "@/app/actions/contact";
import { duration, ease } from "@/lib/motion";

// ─── Underline-style field components ─────────────────────────────────────────

type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-eyebrow font-normal uppercase text-navy-900/50 tracking-[0.15em] md:tracking-[0.2em]">
        {label}
      </span>
      {children}
      {error && (
        <span className="text-small text-red-600">{error}</span>
      )}
    </div>
  );
}

const inputClass =
  "w-full border-b border-gold-500/40 bg-transparent pb-2 pt-1 text-body font-light text-navy-900 outline-none placeholder:text-navy-900/30 focus:border-gold-500 transition-colors duration-200 disabled:opacity-40";

const selectClass =
  "w-full appearance-none border-b border-gold-500/40 bg-transparent pb-2 pt-1 text-body font-light text-navy-900 outline-none focus:border-gold-500 transition-colors duration-200 disabled:opacity-40 cursor-pointer";

// ─── Success state ─────────────────────────────────────────────────────────────

function SuccessMessage({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <motion.div
      className="flex flex-col gap-4 py-12"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.base, ease: ease.out }}
    >
      <p className="text-h3 font-light text-navy-900">{t("form.success.title")}</p>
      <p className="text-body-lg font-light text-text-muted">{t("form.success.body")}</p>
    </motion.div>
  );
}

// ─── Main form ─────────────────────────────────────────────────────────────────

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, formAction, isPending] = useActionState(submitContact, contactInitialState);

  const fieldError = (name: string): string | undefined =>
    state.status === "validation" ? state.errors[name] : undefined;

  return (
    <section className="bg-cream-50 py-16 md:py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 md:gap-16 lg:grid-cols-2 lg:gap-20">

          {/* ── Left: form ── */}
          <div className="flex flex-col gap-10">
            {/* Header */}
            <div className="flex flex-col gap-3">
              <span className="text-eyebrow font-normal tracking-widest uppercase text-gold-500">
                {t("form.eyebrow")}
              </span>
              <h2 className="text-[2rem] font-light leading-tight text-navy-900 md:text-[2.5rem]">
                {t("form.title")}
              </h2>
            </div>

            {state.status === "success" ? (
              <SuccessMessage t={t} />
            ) : (
              <form action={formAction} className="flex flex-col gap-6 md:gap-7" noValidate>
                {/* Honeypot — invisible to humans, filled by bots */}
                <input
                  name="website"
                  type="text"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="hidden"
                  autoComplete="off"
                />

                <Field label={t("form.fields.fullName")} error={fieldError("fullName")}>
                  <input
                    name="fullName"
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="name"
                    disabled={isPending}
                    className={inputClass}
                  />
                </Field>

                <Field label={t("form.fields.email")} error={fieldError("email")}>
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    autoComplete="email"
                    disabled={isPending}
                    className={inputClass}
                  />
                </Field>

                <Field label={t("form.fields.phone")} error={fieldError("phone")}>
                  <input
                    name="phone"
                    type="tel"
                    maxLength={30}
                    autoComplete="tel"
                    disabled={isPending}
                    className={inputClass}
                  />
                </Field>

                <Field label={t("form.fields.country")} error={fieldError("country")}>
                  <input
                    name="country"
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="country-name"
                    disabled={isPending}
                    className={inputClass}
                  />
                </Field>

                <Field label={t("form.fields.language")} error={fieldError("language")}>
                  <div className="relative">
                    <select
                      name="language"
                      required
                      defaultValue="English"
                      disabled={isPending}
                      className={selectClass}
                    >
                      <option value="English">{t("form.languages.english")}</option>
                      <option value="Russian">{t("form.languages.russian")}</option>
                      <option value="Arabic">{t("form.languages.arabic")}</option>
                      <option value="Spanish">{t("form.languages.spanish")}</option>
                    </select>
                    {/* Custom chevron */}
                    <div className="pointer-events-none absolute end-0 top-1/2 -translate-y-1/2">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
                        <path d="M1 1L6 6L11 1" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </Field>

                <Field label={t("form.fields.investmentRange")} error={fieldError("investmentRange")}>
                  <div className="relative">
                    <select
                      name="investmentRange"
                      required
                      defaultValue="$500K-$1M"
                      disabled={isPending}
                      className={selectClass}
                    >
                      <option value="$500K-$1M">{t("form.ranges.tier1")}</option>
                      <option value="$1M-$3M">{t("form.ranges.tier2")}</option>
                      <option value="$3M-$5M">{t("form.ranges.tier3")}</option>
                      <option value="$5M+">{t("form.ranges.tier4")}</option>
                    </select>
                    <div className="pointer-events-none absolute end-0 top-1/2 -translate-y-1/2">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
                        <path d="M1 1L6 6L11 1" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </Field>

                <Field label={t("form.fields.message")} error={fieldError("message")}>
                  <textarea
                    name="message"
                    rows={3}
                    maxLength={1000}
                    disabled={isPending}
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                {/* Generic / rate-limit error */}
                {state.status === "error" && (
                  <p className="text-small text-red-600">
                    {state.message === "rateLimit"
                      ? t("form.errors.rateLimit")
                      : t("form.errors.generic")}
                  </p>
                )}
                {state.status === "validation" && (
                  <p className="text-small text-red-600">{t("form.errors.validation")}</p>
                )}

                <div>
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    disabled={isPending}
                    className="w-full md:w-auto"
                  >
                    {isPending ? t("form.submitting") : t("form.submit")}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* ── Right: ornamental image ── */}
          <div className="hidden lg:block">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/contact/contact-image.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 0px"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
