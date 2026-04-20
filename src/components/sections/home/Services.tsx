"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

// ─── Scrub config ──────────────────────────────────────────────────────────────
const VH_PER_STAGE = 180; // 3 × 180 = 540vh of scroll pinned (longer between steps)
const SCRUB = 1.6; // heavier scrub → softer, more cinematic
const T = 0.42; // longer transition window → cleaner cross-dissolve
const EASE_OUT = "power3.out";
const EASE_IN = "power2.in";

const CARD_KEYS = ["card1", "card2", "card3"] as const;
type CardKey = (typeof CARD_KEYS)[number];
const BULLETS = ["bullet1", "bullet2", "bullet3", "bullet4"] as const;

export function ThreeServices() {
  const t = useTranslations("home.services");
  const sectionRef = useRef<HTMLElement>(null);

  const numRefs = useRef<(HTMLSpanElement | null)[]>([null, null, null]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const nums = numRefs.current;
      const cards = contentRefs.current;
      const imgs = imageRefs.current;

      const dots = sectionRef.current
        ? Array.from(
            sectionRef.current.querySelectorAll<HTMLElement>("[data-progress-dot]"),
          )
        : [];

      const DOT_IDLE = "rgba(247,244,238,0.2)";
      const DOT_ACTIVE = "#C9A84C";

      if (dots[0]) gsap.set(dots[0], { backgroundColor: DOT_ACTIVE });
      if (dots[1]) gsap.set(dots[1], { backgroundColor: DOT_IDLE });
      if (dots[2]) gsap.set(dots[2], { backgroundColor: DOT_IDLE });

      // Initial state: only stage 1 visible (number + content + image)
      gsap.set([nums[1], nums[2]], { opacity: 0, y: 24 });
      gsap.set([cards[1], cards[2]], {
        opacity: 0,
        y: 18,
        pointerEvents: "none",
      });
      gsap.set([imgs[1], imgs[2]], { opacity: 0, scale: 1.04 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${CARD_KEYS.length * VH_PER_STAGE}vh`,
          pin: true,
          scrub: SCRUB,
          anticipatePin: 1,
        },
      });

      tl.to({}, { duration: 3 });

      function stageTransition(from: number, to: number, boundary: number) {
        // Outgoing starts slightly before the boundary; incoming overlaps it
        // (soft cross-dissolve rather than hard swap).
        const outStart = boundary - T * 0.85;
        const inStart = boundary - T * 0.35;

        // Progress dots — linear colour shift
        if (dots[from])
          tl.to(
            dots[from],
            { backgroundColor: DOT_IDLE, duration: T, ease: "none" },
            outStart,
          );
        if (dots[to])
          tl.to(
            dots[to],
            { backgroundColor: DOT_ACTIVE, duration: T, ease: "none" },
            outStart,
          );

        // Number: soft fade + subtle vertical drift
        tl.to(
          nums[from],
          { opacity: 0, y: -24, duration: T * 0.7, ease: EASE_IN },
          outStart,
        );
        tl.fromTo(
          nums[to],
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: T, ease: EASE_OUT },
          inStart,
        );

        // Content: clean fade with a small upward rise on entry
        tl.to(
          cards[from]!,
          { opacity: 0, y: -14, duration: T * 0.7, ease: EASE_IN },
          outStart,
        );
        tl.fromTo(
          cards[to]!,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: T,
            ease: EASE_OUT,
            pointerEvents: "auto",
          },
          inStart,
        );

        // Image: soft scale + fade for a cinematic feel
        tl.to(
          imgs[from]!,
          { opacity: 0, scale: 0.98, duration: T * 0.7, ease: EASE_IN },
          outStart,
        );
        tl.fromTo(
          imgs[to]!,
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: T, ease: EASE_OUT },
          inStart,
        );

        tl.set(cards[from]!, { pointerEvents: "none" }, inStart + T * 0.5);
      }

      stageTransition(0, 1, 1);
      stageTransition(1, 2, 2);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden bg-navy-900 text-cream-50"
    >
      <Container className="flex h-full flex-col py-5 md:py-7 lg:py-9">
        {/* ── Compact header ────────────────────────────────────────────────── */}
        <div className="flex shrink-0 items-end justify-between gap-6 pb-4 md:pb-6 lg:pb-8">
          <div className="space-y-1.5 md:space-y-2">
            <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
            <h2 className="text-h4 font-light leading-tight md:text-h3 lg:text-h2">
              {t("title")}
            </h2>
          </div>
          <Link href="/services" className="hidden shrink-0 md:block">
            <Button size="md">{t("exploreCta")}</Button>
          </Link>
        </div>

        {/* ── Desktop: centered stage ───────────────────────────────────────── */}
        <div className="hidden min-h-0 flex-1 items-center md:flex">
          <div className="grid w-full grid-cols-[auto_minmax(0,1fr)_clamp(260px,30%,420px)] items-center gap-8 lg:gap-12">
            {/* Number column — single giant number, 3 stacked cross-fading */}
            <div
              className="relative leading-[0.9] tracking-tight"
              aria-hidden
            >
              {/* Invisible reserver keeps the grid cell sized correctly */}
              <span
                className="block text-[clamp(7rem,14vw,14rem)] font-light opacity-0 select-none"
                aria-hidden
              >
                01
              </span>
              {(["01", "02", "03"] as const).map((n, i) => (
                <span
                  key={n}
                  ref={(el) => {
                    numRefs.current[i] = el;
                  }}
                  className="absolute inset-0 text-[clamp(7rem,14vw,14rem)] font-light text-cream-50"
                >
                  {n}
                </span>
              ))}
            </div>

            {/* Content column — all 3 stacked in the same cell */}
            <div className="relative min-h-[clamp(220px,36vh,320px)]">
              {CARD_KEYS.map((key: CardKey, i) => (
                <div
                  key={key}
                  ref={(el) => {
                    contentRefs.current[i] = el;
                  }}
                  className={
                    i === 0
                      ? "space-y-3 lg:space-y-4"
                      : "absolute inset-0 space-y-3 lg:space-y-4"
                  }
                >
                  <h3 className="text-[clamp(1.375rem,2.4vw,2rem)] font-light leading-tight">
                    {t(`${key}.title`)}
                  </h3>

                  <p className="max-w-[54ch] text-[clamp(0.875rem,1vw,1rem)] font-light leading-relaxed text-cream-50/80">
                    {t(`${key}.body`)}
                  </p>

                  <ul className="space-y-1 pt-1">
                    {BULLETS.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-[clamp(0.8125rem,0.95vw,0.9375rem)] text-cream-50/80"
                      >
                        <span className="shrink-0 text-gold-500" aria-hidden>
                          —
                        </span>
                        <span>{t(`${key}.${b}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Image column */}
            <div className="relative">
              {CARD_KEYS.map((key: CardKey, i) => (
                <div
                  key={key}
                  ref={(el) => {
                    imageRefs.current[i] = el;
                  }}
                  className={
                    i === 0
                      ? "aspect-[647/509] max-h-[48vh] w-full overflow-hidden border border-cream-50/10 bg-navy-800"
                      : "absolute inset-0 aspect-[647/509] max-h-[48vh] overflow-hidden border border-cream-50/10 bg-navy-800"
                  }
                  role="img"
                  aria-label={t(`${key}.title`)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Stage progress indicator ──────────────────────────────────────── */}
        <div className="hidden shrink-0 justify-center gap-3 pt-4 md:flex lg:pt-6">
          {CARD_KEYS.map((key, i) => (
            <span
              key={key}
              className="h-px w-10 bg-cream-50/20"
              data-progress-dot={i}
              aria-hidden
            />
          ))}
        </div>

        {/* ── Mobile fallback: stacked cards (non-pinned) ───────────────────── */}
        <div className="space-y-0 md:hidden">
          {CARD_KEYS.map((key: CardKey, i) => (
            <article
              key={key}
              className="border-t border-cream-50/10 py-12 first:border-t-0 first:pt-0"
            >
              <div className="grid gap-6">
                <span className="text-h1 font-light text-cream-50" aria-hidden>
                  {(["01", "02", "03"] as const)[i]}
                </span>
                <h3 className="text-h2 font-light leading-tight">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-body font-light text-cream-50/80">
                  {t(`${key}.body`)}
                </p>
                <ul className="space-y-2">
                  {BULLETS.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-body text-cream-50/80"
                    >
                      <span className="shrink-0 text-gold-500" aria-hidden>
                        —
                      </span>
                      <span>{t(`${key}.${b}`)}</span>
                    </li>
                  ))}
                </ul>
                <div
                  className="aspect-[647/509] w-full overflow-hidden border border-cream-50/10 bg-navy-800"
                  role="img"
                  aria-label={t(`${key}.title`)}
                />
              </div>
            </article>
          ))}
          <div className="flex justify-center pt-8">
            <Link href="/services">
              <Button size="lg">{t("exploreCta")}</Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
