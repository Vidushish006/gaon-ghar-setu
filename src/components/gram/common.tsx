import { Star } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Category, Listing } from "@/lib/gram/data";

export const UNIT_KEY: Record<Listing["unit"], string> = {
  hour: "perHour",
  day: "perDay",
  acre: "perAcre",
  quintal: "perQuintal",
  month: "perMonth",
};

export const CATEGORY_EMOJI: Record<Category, string> = {
  machine: "🚜",
  residue: "🌾",
  labour: "👷",
  storage: "📦",
};

export function priceText(l: Listing, t: (k: string) => string) {
  return `₹${l.price.toLocaleString("en-IN")}/${t(UNIT_KEY[l.unit])}`;
}

export function BigTile({
  emoji,
  title,
  sub,
  onClick,
  className,
}: {
  emoji: string;
  title: string;
  sub?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full flex-col items-start gap-1 rounded-3xl border-2 border-border bg-card p-5 text-left shadow-[var(--shadow-soft)] transition-all active:scale-[0.98] hover:border-primary/60",
        className,
      )}
    >
      <span className="text-4xl leading-none">{emoji}</span>
      <span className="mt-2 text-lg font-bold text-foreground">{title}</span>
      {sub ? <span className="text-sm text-muted-foreground">{sub}</span> : null}
    </button>
  );
}

export function Rating({ value, reviews }: { value: number; reviews?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
      <Star className="size-4 fill-[oklch(0.8_0.16_80)] text-[oklch(0.8_0.16_80)]" />
      {value.toFixed(1)}
      {reviews != null ? (
        <span className="font-normal text-muted-foreground">({reviews})</span>
      ) : null}
    </span>
  );
}

export function StatusDot({ active, label }: { active: boolean; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold",
        active
          ? "bg-primary/12 text-primary"
          : "bg-destructive/10 text-destructive",
      )}
    >
      <span className={cn("size-2 rounded-full", active ? "bg-primary" : "bg-destructive")} />
      {label}
    </span>
  );
}

export function SectionTitle({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2">
      <h2 className="text-lg font-bold text-foreground">{children}</h2>
      {right}
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      {children}
    </label>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-border bg-card/60 p-8 text-center text-muted-foreground">
      {text}
    </div>
  );
}
