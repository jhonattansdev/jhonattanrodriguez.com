"use client";

import { GlowButton, CalendarIcon, WhatsAppIcon } from "./shared/glow-button";
import { getWhatsAppLink, getCalendarLink, WHATSAPP_MESSAGES } from "@/lib/cta-links";

interface CTAButtonProps {
  variant?: "primary" | "secondary";
  context?: keyof typeof WHATSAPP_MESSAGES;
  className?: string;
  /** Visual mode of the parent surface (not site theme). Passed to GlowButton as surfaceDark. */
  dark?: boolean;
  accentColor?: string;
  accentSolidColor?: string;
  label?: string;
}

export function CTAWhatsApp({
  variant = "primary",
  context = "general",
  className = "",
  dark = true,
  accentColor,
  accentSolidColor,
  label,
}: CTAButtonProps) {
  // WhatsApp uses its brand green, but glow adapts to section
  const waGreen = "#25D366";
  const waGreenDark = "#128C7E";
  
  return (
    <GlowButton
      href={getWhatsAppLink(context)}
      external
      variant={variant}
      surfaceDark={dark}
      accentColor={variant === "primary" ? waGreen : (accentSolidColor || accentColor)}
      secondaryColor={variant === "primary" ? waGreenDark : (accentColor || accentSolidColor)}
      className={className}
      icon={<WhatsAppIcon />}
      iconPosition="left"
    >
      {label || "Escríbeme por WhatsApp"}
    </GlowButton>
  );
}

export function CTACalendar({
  variant = "primary",
  className = "",
  dark = true,
  accentColor,
  accentSolidColor,
  label,
}: CTAButtonProps) {
  return (
    <GlowButton
      href={getCalendarLink()}
      external
      variant={variant}
      surfaceDark={dark}
      accentColor={accentSolidColor || accentColor}
      secondaryColor={accentColor || accentSolidColor}
      className={className}
      icon={<CalendarIcon />}
      iconPosition="left"
    >
      {label || "Agenda una llamada"}
    </GlowButton>
  );
}

interface CTASectionProps {
  dark?: boolean;
  accentColor?: string;
  accentSolidColor?: string;
  context?: keyof typeof WHATSAPP_MESSAGES;
  title?: string;
  description?: string;
  calendarLabel?: string;
  whatsappLabel?: string;
}

export function CTASection({
  dark = true,
  accentColor,
  accentSolidColor,
  context = "general",
  title = "¿Listo para empezar?",
  description = "Agenda una llamada o escríbeme directamente por WhatsApp.",
  calendarLabel,
  whatsappLabel,
}: CTASectionProps) {
  const tp = dark ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.86)";
  const ts = dark ? "rgba(255,255,255,0.58)" : "rgba(0,0,0,0.6)";

  return (
    <div className="text-center py-16">
      <h3
        className="font-bold text-2xl md:text-3xl mb-4"
        style={{ fontFamily: "'Quicksand', sans-serif", color: tp }}
      >
        {title}
      </h3>
      <p
        className="text-base mb-8 max-w-md mx-auto"
        style={{ fontFamily: "'Lato', sans-serif", color: ts }}
      >
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <CTACalendar
          variant="primary"
          dark={dark}
          accentColor={accentColor}
          accentSolidColor={accentSolidColor}
          label={calendarLabel}
        />
        <CTAWhatsApp
          variant="secondary"
          context={context}
          dark={dark}
          accentColor={accentColor}
          accentSolidColor={accentSolidColor}
          label={whatsappLabel}
        />
      </div>
    </div>
  );
}
