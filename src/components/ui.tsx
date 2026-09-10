import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---------- Button ---------- */

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark";
type ButtonSize = "md" | "lg";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none select-none";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-flame-500 text-white hover:bg-flame-600 shadow-sm shadow-flame-500/30",
  secondary: "bg-white text-ink-950 border border-line hover:bg-cloud",
  ghost: "bg-transparent text-ink-500 hover:bg-cloud",
  dark: "bg-ink-950 text-white hover:bg-ink-700",
};

const buttonSizes: Record<ButtonSize, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

interface ButtonExtras {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & ButtonExtras) {
  return (
    <button
      className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<typeof Link> & ButtonExtras) {
  return (
    <Link
      className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)}
      {...props}
    />
  );
}

/* ---------- Card ---------- */

export function Card({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("tf-card p-5", className)} {...props}>
      {children}
    </div>
  );
}

/* ---------- ProgressBar ---------- */

export function ProgressBar({
  value,
  className,
  tone = "flame",
}: {
  value: number;
  className?: string;
  tone?: "flame" | "ink" | "grass";
}) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const fill =
    tone === "ink" ? "bg-ink-950" : tone === "grass" ? "bg-grass-500" : "bg-flame-500";
  return (
    <div
      className={cn("h-2.5 w-full overflow-hidden rounded-full bg-cloud", className)}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={cn("h-full rounded-full transition-all duration-500", fill)} style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ---------- Pills ---------- */

export function StatPill({
  icon,
  value,
  label,
  tone = "flame",
}: {
  icon: ReactNode;
  value: ReactNode;
  label: string;
  tone?: "flame" | "ink";
}) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white border border-line px-3 py-1.5">
      <span className={cn("text-base leading-none", tone === "flame" ? "text-flame-500" : "text-ink-950")}>
        {icon}
      </span>
      <span className="text-sm font-bold text-ink-950">{value}</span>
      <span className="text-xs text-ink-300">{label}</span>
    </div>
  );
}

export function Chip({
  children,
  active,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        active ? "bg-flame-50 text-flame-700" : "bg-cloud text-ink-400",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ---------- Section heading ---------- */

export function SectionTitle({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-end justify-between">
      <h2 className="text-sm font-bold uppercase tracking-wide text-ink-300">{children}</h2>
      {action}
    </div>
  );
}

/* ---------- Icon bubble ---------- */

export function IconBubble({
  children,
  className,
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const dim =
    size === "sm" ? "h-9 w-9 text-lg" : size === "lg" ? "h-16 w-16 text-3xl" : "h-12 w-12 text-2xl";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-2xl bg-cloud",
        dim,
        className,
      )}
    >
      {children}
    </span>
  );
}
