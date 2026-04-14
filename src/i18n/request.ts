import { getRequestConfig } from "next-intl/server";

import { routing, type AppLocale } from "./routing";

const { defaultLocale, locales } = routing;

function resolveLocale(locale: string | undefined): AppLocale {
  if (locale && locales.includes(locale as AppLocale)) {
    return locale as AppLocale;
  }

  return defaultLocale;
}

export default getRequestConfig(async ({ locale }) => {
  const appLocale = resolveLocale(locale);
  const messages = (await import(`../messages/${appLocale}.json`)).default;

  return { locale: appLocale, messages };
});
