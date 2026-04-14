import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { routing } from "@/i18n/routing";

type NotFoundMessages = {
  title: string;
  body: string;
  cta: string;
};

export default async function NotFound() {
  const fallbackLocale = routing.defaultLocale;
  const messages = (await import(`@/messages/${fallbackLocale}.json`)).default as {
    notFound: NotFoundMessages;
  };
  const t = messages.notFound;

  return (
    <section className="py-24">
      <Container className="text-center">
        <h1 className="text-h2 font-light text-cream-50">{t.title}</h1>
        <p className="mt-4 text-body text-cream-50/80">{t.body}</p>
        <Link href={`/${fallbackLocale}`} className="mt-8 inline-flex justify-center">
          <Button size="md">{t.cta}</Button>
        </Link>
      </Container>
    </section>
  );
}