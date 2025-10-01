import React from "react";
import { useI18n, Locale } from "@/providers/I18n";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const next = (locale === "en" ? "pt" : "en") as Locale;
  return (
    <Button variant="outline" onClick={() => setLocale(next)} aria-label="Switch language">
      {locale.toUpperCase()}
    </Button>
  );
}
