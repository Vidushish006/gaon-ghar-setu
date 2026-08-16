import { useMemo, useState } from "react";
import {
  ChevronLeft,
  MapPin,
  Phone,
  Search as SearchIcon,
  Star,
  Heart,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useGram } from "@/lib/gram/store";
import {
  CATEGORY_IMAGE,
  DEMAND_TRENDS,
  TYPES_BY_CATEGORY,
  matchScore,
  type Booking,
  type Category,
  type Listing,
} from "@/lib/gram/data";
import { BigTile, CATEGORY_EMOJI, EmptyState, Field, Rating, SectionTitle, priceText } from "./common";

type View =
  | { name: "home" }
  | { name: "search"; category: Category }
  | { name: "details"; id: string }
  | { name: "book"; id: string }
  | { name: "sent" }
  | { name: "rate"; bookingId: string };

const CONDITIONS = ["any", "new", "good", "old"] as const;

export function ConsumerApp({
  tab,
  setTab,
}: {
  tab: "home" | "search" | "bookings";
  setTab: (t: "home" | "search" | "bookings") => void;
}) {
  const g = useGram();
  const { t } = g;
  const [view, setView] = useState<View>({ name: "home" });
  const [category, setCategory] = useState<Category>("machine");
  const [query, setQuery] = useState("");
  const [maxDistance, setMaxDistance] = useState(40);
  const [maxPrice, setMaxPrice] = useState(8000);
  const [typeFilter, setTypeFilter] = useState<string>("any");
  const [condition, setCondition] = useState<string>("any");
  const [minRating, setMinRating] = useState(0);
  const [dates, setDates] = useState({ start: "", end: "" });
  const [stars, setStars] = useState(5);
  const [review, setReview] = useState("");

  const openCategory = (c: Category) => {
    setCategory(c);
    setTypeFilter("any");
    setQuery("");
    setTab("search");
    setView({ name: "search", category: c });
  };

  const results = useMemo(() => {
    const list = g.listings.filter(
      (l) =>
        l.status === "active" &&
        l.category === category &&
        l.distanceKm <= maxDistance &&
        l.price <= maxPrice &&
        l.rating >= minRating &&
        (condition === "any" || l.condition === condition) &&
        (typeFilter === "any" ||
          `${l.title} ${l.brand ?? ""} ${l.skills ?? ""}`
            .toLowerCase()
            .includes(typeFilter.toLowerCase())) &&
        (query.trim() === "" ||
          `${l.title} ${l.brand ?? ""} ${l.village} ${l.description}`
            .toLowerCase()
            .includes(query.toLowerCase())),
    );
    return list
      .map((l) => ({ l, score: matchScore(l, { maxDistance, maxPrice, cheapest: 0, farthest: 0 }) }))
      .sort((a, b) => b.score - a.score);
  }, [g.listings, category, maxDistance, maxPrice, minRating, condition, typeFilter, query]);

  const listingById = (id: string) => g.listings.find((l) => l.id === id);

  /* ------------------------------- BOOKINGS ------------------------------- */
  if (tab === "bookings" && view.name !== "rate") {
    return (
      <BookingsTab
        onRate={(id) => {
          setStars(5);
          setReview("");
          setView({ name: "rate", bookingId: id });
        }}
      />
    );
  }

  if (view.name === "rate") {
    const b = g.bookings.find((x) => x.id === view.bookingId);
    return (
      <Page onBack={() => setView({ name: "home" })}>
        <h1 className="text-2xl font-bold">{t("rateExp")}</h1>
        <p className="text-muted-foreground">{b?.listingTitle}</p>
        <div className="flex justify-center gap-2 py-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" onClick={() => setStars(n)} aria-label={`${n} star`}>
              <Star
                className={cn(
                  "size-10",
                  n <= stars
                    ? "fill-[oklch(0.8_0.16_80)] text-[oklch(0.8_0.16_80)]"
                    : "text-muted-foreground",
                )}
              />
            </button>
          ))}
        </div>
        <Textarea
          placeholder={t("writeReview")}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="min-h-24 rounded-2xl border-2"
        />
        <Button
          size="lg"
          className="h-14 rounded-2xl text-lg"
          onClick={() => {
            if (b) {
              g.updateBooking(b.id, { rated: stars, review });
              const l = listingById(b.listingId);
              if (l) {
                const total = l.rating * l.reviews + stars;
                g.updateListing(l.id, {
                  reviews: l.reviews + 1,
                  rating: Math.round((total / (l.reviews + 1)) * 10) / 10,
                });
              }
            }
            toast.success(t("thanks"));
            setView({ name: "home" });
            setTab("bookings");
          }}
        >
          {t("submit")}
        </Button>
      </Page>
    );
  }

  /* -------------------------------- DETAILS ------------------------------- */
  if (view.name === "details" || view.name === "book") {
    const l = listingById(view.id);
    if (!l) return <EmptyState text={t("noResults")} />;
    const isSaved = g.saved.includes(l.id);

    if (view.name === "book") {
      return (
        <Page onBack={() => setView({ name: "details", id: l.id })}>
          <h1 className="text-2xl font-bold">{t("bookRequest")}</h1>
          <p className="font-semibold text-muted-foreground">{l.title}</p>
          <div className="rounded-2xl border-2 border-border bg-card p-4 text-sm">
            🟢 {t("available")}: {l.availableFrom} → {l.availableUntil}
          </div>
          <Field label={t("startDate")}>
            <Input
              type="date"
              min={l.availableFrom}
              max={l.availableUntil}
              value={dates.start}
              onChange={(e) => setDates({ ...dates, start: e.target.value })}
              className="h-13 rounded-2xl border-2 py-3 text-base"
            />
          </Field>
          <Field label={t("endDate")}>
            <Input
              type="date"
              min={dates.start || l.availableFrom}
              max={l.availableUntil}
              value={dates.end}
              onChange={(e) => setDates({ ...dates, end: e.target.value })}
              className="h-13 rounded-2xl border-2 py-3 text-base"
            />
          </Field>
          <Button
            size="lg"
            className="h-14 rounded-2xl text-lg"
            disabled={!dates.start || !dates.end}
            onClick={() => {
              g.addBooking({
                listingId: l.id,
                listingTitle: l.title,
                providerName: l.providerName,
                providerPhone: l.providerPhone,
                consumerName: g.profile.name,
                consumerPhone: g.profile.phone,
                start: dates.start,
                end: dates.end,
                status: "pending",
                ownerId: l.ownerId,
              });
              setView({ name: "sent" });
            }}
          >
            {t("sendRequest")}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            💵 App mein koi payment nahi. Paisa aap khud tay karein.
          </p>
        </Page>
      );
    }

    return (
      <Page onBack={() => setView({ name: "search", category: l.category })}>
        <div className="overflow-hidden rounded-3xl border-2 border-border">
          <img
            src={l.image ?? CATEGORY_IMAGE[l.category]}
            alt={l.title}
            loading="lazy"
            className="h-52 w-full object-cover"
          />
        </div>
        {l.imageIsSample ? (
          <p className="-mt-3 text-xs text-muted-foreground">
            📸 Sample picture (illustration) — provider ki asli photo nahi.
          </p>
        ) : null}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">{l.title}</h1>
            <Rating value={l.rating} reviews={l.reviews} />
          </div>
          <button
            type="button"
            onClick={() => g.toggleSaved(l.id)}
            className="rounded-full border-2 border-border p-3"
            aria-label={t("saveToggle")}
          >
            <Heart className={cn("size-5", isSaved && "fill-destructive text-destructive")} />
          </button>
        </div>
        <p className="text-2xl font-extrabold text-primary">{priceText(l, t)}</p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Info label={t("location")} value={`${l.village}, ${l.district}`} />
          <Info label={t("distance")} value={`${l.distanceKm} ${t("kmAway")}`} />
          {l.capacity ? <Info label={t("capacity")} value={l.capacity} /> : null}
          {l.quantity ? <Info label={t("quantity")} value={l.quantity} /> : null}
          {l.area ? <Info label={t("area")} value={l.area} /> : null}
          {l.skills ? <Info label={t("skills")} value={l.skills} /> : null}
          {l.experience ? <Info label={t("experience")} value={l.experience} /> : null}
          <Info label={t("condition")} value={t(l.condition)} />
        </div>
        <div className="rounded-3xl border-2 border-primary/30 bg-primary/6 p-4">
          <p className="font-bold">📅 {t("availability")}</p>
          <p className="mt-1 text-sm">
            🟢 {t("available")}: {l.availableFrom} → {l.availableUntil}
          </p>
        </div>
        <p className="text-muted-foreground">{l.description}</p>
        <div className="rounded-3xl border-2 border-border bg-card p-4">
          <p className="text-sm font-bold text-muted-foreground">{t("provided")}</p>
          <p className="text-lg font-bold">{l.providerName}</p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-4" /> {l.village}, {l.district}
          </p>
          <p className="mt-1 flex items-center gap-1 font-semibold">
            <Phone className="size-4" /> {l.providerPhone}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            size="lg"
            className="h-14 rounded-2xl text-base"
            onClick={() => toast(`📞 ${t("calling")}`, { description: l.providerPhone })}
          >
            <Phone /> {t("callProvider")}
          </Button>
          <Button
            size="lg"
            className="h-14 rounded-2xl text-base"
            onClick={() => setView({ name: "book", id: l.id })}
          >
            <CalendarDays /> {t("bookRequest")}
          </Button>
        </div>
      </Page>
    );
  }

  if (view.name === "sent") {
    return (
      <Page>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
          <CheckCircle2 className="size-20 text-primary" />
          <h1 className="text-2xl font-bold">✅ {t("requestSent")}</h1>
          <p className="text-muted-foreground">{t("requestSentSub")}</p>
          <Button
            size="lg"
            className="h-14 w-full rounded-2xl text-lg"
            onClick={() => {
              setView({ name: "home" });
              setTab("bookings");
            }}
          >
            {t("myBookings")}
          </Button>
        </div>
      </Page>
    );
  }

  /* --------------------------------- SEARCH -------------------------------- */
  if (tab === "search") {
    const best = results[0];
    return (
      <Page>
        <div className="flex items-center gap-2">
          <SearchIcon className="size-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="h-13 rounded-2xl border-2 py-3 text-base"
          />
        </div>
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
          {(["machine", "residue", "labour", "storage"] as Category[]).map((c) => (
            <Chip key={c} active={category === c} onClick={() => openCategory(c)}>
              {CATEGORY_EMOJI[c]} {t(c === "labour" ? "labour" : c)}
            </Chip>
          ))}
        </div>

        <div className="space-y-4 rounded-3xl border-2 border-border bg-card p-4">
          <div>
            <p className="text-sm font-bold">
              📍 {t("distance")} <span className="text-primary">{maxDistance} km</span>
            </p>
            <Slider
              value={[maxDistance]}
              min={2}
              max={50}
              step={2}
              onValueChange={(v) => setMaxDistance(v[0])}
              className="mt-3"
            />
          </div>
          <div>
            <p className="text-sm font-bold">
              💰 {t("maxPrice")} <span className="text-primary">₹{maxPrice}</span>
            </p>
            <Slider
              value={[maxPrice]}
              min={200}
              max={10000}
              step={100}
              onValueChange={(v) => setMaxPrice(v[0])}
              className="mt-3"
            />
          </div>
          <div className="-mx-1 flex flex-wrap gap-2">
            <Chip active={typeFilter === "any"} onClick={() => setTypeFilter("any")}>
              {t("any")}
            </Chip>
            {TYPES_BY_CATEGORY[category].map((ty) => (
              <Chip key={ty} active={typeFilter === ty} onClick={() => setTypeFilter(ty)}>
                {ty}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {CONDITIONS.map((c) => (
              <Chip key={c} active={condition === c} onClick={() => setCondition(c)}>
                🔧 {t(c)}
              </Chip>
            ))}
            <Chip active={minRating > 0} onClick={() => setMinRating(minRating > 0 ? 0 : 4.5)}>
              ⭐ 4.5+
            </Chip>
          </div>
        </div>

        {results.length === 0 ? (
          <EmptyState text={t("noResults")} />
        ) : (
          <>
            <SectionTitle>⭐ {t("bestMatch")}</SectionTitle>
            <ListingCard
              listing={best.l}
              score={best.score}
              highlight
              onOpen={() => setView({ name: "details", id: best.l.id })}
            />
            {results.length > 1 ? (
              <div className="space-y-3 pt-2">
                {results.slice(1).map(({ l, score }) => (
                  <ListingCard
                    key={l.id}
                    listing={l}
                    score={score}
                    onOpen={() => setView({ name: "details", id: l.id })}
                  />
                ))}
              </div>
            ) : null}
          </>
        )}
      </Page>
    );
  }

  /* ---------------------------------- HOME --------------------------------- */
  return (
    <Page>
      <div>
        <h1 className="text-2xl font-extrabold">
          {t("namaste")}, {g.profile.name || "Kisan"} 👋
        </h1>
        <p className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="size-4" /> {g.profile.village || g.profile.city},{" "}
          {g.profile.district}
        </p>
      </div>
      <h2 className="text-xl font-bold">{t("whatNeed")}</h2>
      <div className="grid grid-cols-2 gap-3">
        <BigTile emoji="🚜" title={t("machine")} sub={t("machineSub")} onClick={() => openCategory("machine")} />
        <BigTile emoji="🌾" title={t("residue")} sub={t("residueSub")} onClick={() => openCategory("residue")} />
        <BigTile emoji="👷" title={t("labour")} sub={t("labourSub")} onClick={() => openCategory("labour")} />
        <BigTile emoji="📦" title={t("storage")} sub={t("storageSub")} onClick={() => openCategory("storage")} />
      </div>
      <DemandTrends />
    </Page>
  );
}

/* ------------------------------ sub components ----------------------------- */

export function Page({ children, onBack }: { children: React.ReactNode; onBack?: () => void }) {
  const { t } = useGram();
  return (
    <div className="flex flex-col gap-4 px-5 py-5">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 flex w-fit items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold text-muted-foreground"
        >
          <ChevronLeft className="size-4" />
          {t("back")}
        </button>
      ) : null}
      {children}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-muted px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

export function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function ListingCard({
  listing: l,
  score,
  highlight,
  onOpen,
}: {
  listing: Listing;
  score: number;
  highlight?: boolean;
  onOpen: () => void;
}) {
  const { t } = useGram();
  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border-2 bg-card shadow-[var(--shadow-soft)]",
        highlight ? "border-primary" : "border-border",
      )}
    >
      <div className="flex gap-3 p-3">
        <img
          src={l.image ?? CATEGORY_IMAGE[l.category]}
          alt={l.title}
          loading="lazy"
          className="size-24 shrink-0 rounded-2xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="truncate font-bold">{l.title}</p>
            <span className="shrink-0 rounded-full bg-primary/12 px-2 py-0.5 text-xs font-bold text-primary">
              {score}% {t("match")}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            📍 {l.distanceKm} {t("kmAway")}
          </p>
          <p className="font-extrabold text-primary">{priceText(l, t)}</p>
          <div className="flex items-center gap-2">
            <Rating value={l.rating} />
            <span className="text-xs font-semibold text-primary">🟢 {t("available")}</span>
          </div>
        </div>
      </div>
      <Button className="h-12 w-full rounded-none rounded-b-2xl text-base" onClick={onOpen}>
        {t("viewDetails")}
      </Button>
    </div>
  );
}

export function DemandTrends() {
  const { t } = useGram();
  return (
    <div className="rounded-3xl border-2 border-border bg-card p-4">
      <SectionTitle>📈 {t("demandTrends")}</SectionTitle>
      <div className="space-y-2">
        {DEMAND_TRENDS.map((d) => (
          <div key={d.label} className="flex items-center justify-between gap-2">
            <span className="font-semibold">
              {d.emoji} {d.label}
            </span>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-bold",
                d.trend === "up"
                  ? "bg-primary/12 text-primary"
                  : d.trend === "down"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-muted text-muted-foreground",
              )}
            >
              {d.trend === "up" ? "📈 " : d.trend === "down" ? "📉 " : "➡️ "}
              {t(d.trend === "up" ? "increasing" : d.trend === "down" ? "decreasing" : "stable")}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{t("demandNote")}</p>
    </div>
  );
}

function BookingsTab({ onRate }: { onRate: (id: string) => void }) {
  const g = useGram();
  const { t } = g;
  const mine = g.bookings.filter((b) => b.consumerPhone === g.profile.phone);
  const groups: { key: string; items: Booking[] }[] = [
    { key: "upcoming", items: mine.filter((b) => b.status === "confirmed") },
    { key: "pending", items: mine.filter((b) => b.status === "pending") },
    { key: "completed", items: mine.filter((b) => b.status === "completed") },
  ];
  const savedListings = g.listings.filter((l) => g.saved.includes(l.id));

  return (
    <Page>
      <h1 className="text-2xl font-extrabold">📅 {t("myBookings")}</h1>
      {mine.length === 0 ? <EmptyState text={t("noBookings")} /> : null}
      {groups.map((grp) =>
        grp.items.length ? (
          <div key={grp.key}>
            <SectionTitle>{t(grp.key)}</SectionTitle>
            <div className="space-y-3">
              {grp.items.map((b) => (
                <div key={b.id} className="rounded-3xl border-2 border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold">{b.listingTitle}</p>
                    <span className="text-xs font-bold">
                      {b.status === "pending"
                        ? `🟡 ${t("pending")}`
                        : b.status === "confirmed"
                          ? `🟢 ${t("confirmed")}`
                          : `🔵 ${t("completed")}`}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t("provided")}: {b.providerName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    📅 {b.start} → {b.end}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      variant="secondary"
                      className="h-11 rounded-2xl"
                      onClick={() => toast(`📞 ${t("calling")}`, { description: b.providerPhone })}
                    >
                      <Phone /> {b.providerPhone}
                    </Button>
                    {b.status === "confirmed" ? (
                      <Button
                        variant="outline"
                        className="h-11 rounded-2xl"
                        onClick={() => g.updateBooking(b.id, { status: "completed" })}
                      >
                        {t("markComplete")}
                      </Button>
                    ) : null}
                    {b.status === "completed" && !b.rated ? (
                      <Button className="h-11 rounded-2xl" onClick={() => onRate(b.id)}>
                        <Star /> {t("rateExp")}
                      </Button>
                    ) : null}
                    {b.rated ? (
                      <span className="flex items-center gap-1 text-sm font-semibold">
                        <Star className="size-4 fill-[oklch(0.8_0.16_80)] text-[oklch(0.8_0.16_80)]" />
                        {b.rated}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null,
      )}
      {savedListings.length ? (
        <div>
          <SectionTitle>❤️ {t("saved")}</SectionTitle>
          <div className="space-y-2">
            {savedListings.map((l) => (
              <div
                key={l.id}
                className="flex items-center justify-between gap-2 rounded-2xl border-2 border-border bg-card p-3"
              >
                <span className="font-semibold">{l.title}</span>
                <span className="font-bold text-primary">{priceText(l, t)}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </Page>
  );
}
