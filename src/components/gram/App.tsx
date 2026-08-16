import { useState } from "react";
import { Home, Search, CalendarDays, User, ChevronDown, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useGram } from "@/lib/gram/store";
import { LANGUAGES, type Lang } from "@/lib/gram/i18n";
import { Onboarding } from "./Onboarding";
import { ConsumerApp, Page } from "./Consumer";
import { ProviderApp } from "./Provider";
import { SectionTitle } from "./common";

type Tab = "home" | "search" | "bookings" | "profile";

export function GramSetuApp() {
  const g = useGram();
  const { t } = g;
  const [tab, setTab] = useState<Tab>("home");

  if (g.stage !== "app") return <Onboarding />;

  const isProvider = g.mode === "provider";

  return (
    <div className="mx-auto min-h-dvh w-full max-w-md border-x border-border bg-background pb-24">
      {/* Header with always-visible mode switcher */}
      <header className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <span className="text-lg font-extrabold">🌾 Gram Setu</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-1 rounded-full border-2 border-primary bg-primary/10 px-3 py-2 text-sm font-bold text-primary"
            >
              {isProvider ? `🧑‍🌾 ${t("provider")}` : `👨‍🌾 ${t("consumer")}`}
              <ChevronDown className="size-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-2xl">
            <DropdownMenuLabel>{t("switchMode")}</DropdownMenuLabel>
            <DropdownMenuItem
              className="py-3 text-base"
              onClick={() => {
                g.setMode("consumer");
                setTab("home");
              }}
            >
              👨‍🌾 {t("consumer")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="py-3 text-base"
              onClick={() => {
                g.setMode("provider");
                setTab("home");
              }}
            >
              🧑‍🌾 {t("provider")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main>
        {tab === "profile" ? (
          <ProfileTab />
        ) : isProvider ? (
          <ProviderApp tab={tab} setTab={(x) => setTab(x)} />
        ) : (
          <ConsumerApp tab={tab} setTab={(x) => setTab(x)} />
        )}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto flex w-full max-w-md items-stretch justify-around border-t-2 border-border bg-card px-2 py-2">
        <NavItem icon={<Home />} label={t("home")} active={tab === "home"} onClick={() => setTab("home")} />
        <NavItem
          icon={<Search />}
          label={isProvider ? t("myListings") : t("search")}
          active={tab === "search"}
          onClick={() => setTab("search")}
        />
        <NavItem
          icon={<CalendarDays />}
          label={isProvider ? t("bookingRequests") : t("bookings")}
          active={tab === "bookings"}
          onClick={() => setTab("bookings")}
        />
        <NavItem icon={<User />} label={t("profile")} active={tab === "profile"} onClick={() => setTab("profile")} />
      </nav>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-w-16 flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[11px] font-semibold",
        active ? "bg-primary/10 text-primary" : "text-muted-foreground",
      )}
    >
      <span className="[&_svg]:size-6">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}

function ProfileTab() {
  const g = useGram();
  const { t } = g;
  return (
    <Page>
      <div className="flex items-center gap-4">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/12 text-3xl">
          👤
        </div>
        <div>
          <p className="text-xl font-extrabold">{g.profile.name || "Kisan"}</p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <Phone className="size-4" /> {g.profile.phone}
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-4" /> {g.profile.village}, {g.profile.district}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border-2 border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">{t("currentMode")}</p>
        <p className="text-lg font-bold">
          {g.mode === "provider" ? `🧑‍🌾 ${t("provider")}` : `👨‍🌾 ${t("consumer")}`}
        </p>
        <Button
          variant="secondary"
          className="mt-3 h-12 w-full rounded-2xl"
          onClick={() => g.setMode(g.mode === "provider" ? "consumer" : "provider")}
        >
          🔄 {t("switchMode")}
        </Button>
      </div>

      <div className="rounded-3xl border-2 border-border bg-card p-4">
        <SectionTitle>🌐 {t("language")}</SectionTitle>
        <div className="space-y-2">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => g.setLang(l.code as Lang)}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left font-semibold",
                g.lang === l.code ? "border-primary bg-primary/10 text-primary" : "border-border",
              )}
            >
              <span className={cn("size-4 rounded-full border-2", g.lang === l.code ? "border-primary bg-primary" : "border-muted-foreground")} />
              {l.flag} {l.native}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border-2 border-border bg-card p-4">
        <SectionTitle>⚙️ {t("settings")}</SectionTitle>
        <Button
          variant="outline"
          className="h-12 w-full rounded-2xl"
          onClick={() => g.setStage("profile")}
        >
          ✏️ {t("editProfile")}
        </Button>
        <Button variant="ghost" className="mt-2 h-12 w-full rounded-2xl text-destructive" onClick={() => g.reset()}>
          {t("logout")}
        </Button>
      </div>

      <p className="pb-4 text-center text-xs text-muted-foreground">
        💵 Gram Setu par koi online payment nahi hota. Aap seedhe baat karke tay karein.
      </p>
    </Page>
  );
}
