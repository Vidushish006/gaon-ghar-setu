import { useState } from "react";
import { Pencil, Plus, Trash2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useGram } from "@/lib/gram/store";
import {
  CATEGORY_IMAGE,
  SAMPLE_IMAGES,
  TYPES_BY_CATEGORY,
  suggestPrice,
  type Category,
  type Listing,
} from "@/lib/gram/data";
import { BigTile, EmptyState, Field, SectionTitle, StatusDot, priceText, CATEGORY_EMOJI } from "./common";
import { Chip, DemandTrends, Page } from "./Consumer";

type View =
  | { name: "dash" }
  | { name: "form"; category: Category; editId?: string }
  | { name: "requests" };

const UNITS: Listing["unit"][] = ["hour", "day", "acre", "quintal", "month"];

const emptyForm = {
  title: "",
  brand: "",
  model: "",
  capacity: "",
  quantity: "",
  skills: "",
  experience: "",
  area: "",
  price: "",
  unit: "day" as Listing["unit"],
  condition: "good" as Listing["condition"],
  availableFrom: new Date().toISOString().slice(0, 10),
  availableUntil: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
  description: "",
  image: "",
};

export function ProviderApp({
  tab,
  setTab,
}: {
  tab: "home" | "search" | "bookings";
  setTab: (t: "home" | "search" | "bookings") => void;
}) {
  const g = useGram();
  const { t } = g;
  const [view, setView] = useState<View>({ name: "dash" });
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const requests = g.bookings.filter((b) => g.myListings.some((l) => l.id === b.listingId));

  const startAdd = (category: Category) => {
    setForm({ ...emptyForm, unit: category === "residue" ? "quintal" : category === "storage" ? "month" : "day" });
    setTab("home");
    setView({ name: "form", category });
  };

  const startEdit = (l: Listing) => {
    setForm({
      title: l.title,
      brand: l.brand ?? "",
      model: l.model ?? "",
      capacity: l.capacity ?? "",
      quantity: l.quantity ?? "",
      skills: l.skills ?? "",
      experience: l.experience ?? "",
      area: l.area ?? "",
      price: String(l.price),
      unit: l.unit,
      condition: l.condition,
      availableFrom: l.availableFrom,
      availableUntil: l.availableUntil,
      description: l.description,
      image: l.image ?? "",
    });
    setTab("home");
    setView({ name: "form", category: l.category, editId: l.id });
  };

  /* -------------------------------- REQUESTS ------------------------------- */
  if (tab === "bookings") {
    return (
      <Page>
        <h1 className="text-2xl font-extrabold">📅 {t("bookingRequests")}</h1>
        {requests.length === 0 ? <EmptyState text={t("noBookings")} /> : null}
        <div className="space-y-3">
          {requests.map((b) => (
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
                {b.consumerName || "Consumer"} · {b.consumerPhone}
              </p>
              <p className="text-sm text-muted-foreground">
                📅 {b.start} → {b.end}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  className="h-11 rounded-2xl"
                  onClick={() => toast(`📞 ${t("calling")}`, { description: b.consumerPhone })}
                >
                  <Phone /> {t("callProvider")}
                </Button>
                {b.status === "pending" ? (
                  <Button
                    className="h-11 rounded-2xl"
                    onClick={() => g.updateBooking(b.id, { status: "confirmed" })}
                  >
                    {t("accept")}
                  </Button>
                ) : null}
                {b.status === "confirmed" ? (
                  <Button
                    variant="outline"
                    className="h-11 rounded-2xl"
                    onClick={() => g.updateBooking(b.id, { status: "completed" })}
                  >
                    {t("markComplete")}
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </Page>
    );
  }

  /* ----------------------------- MY LISTINGS TAB ---------------------------- */
  if (tab === "search") {
    return (
      <Page>
        <h1 className="text-2xl font-extrabold">📋 {t("myListings")}</h1>
        <div className="flex flex-wrap gap-2">
          {(["machine", "residue", "labour", "storage"] as Category[]).map((c) => (
            <Chip key={c} onClick={() => startAdd(c)}>
              <Plus className="mr-1 inline size-4" />
              {CATEGORY_EMOJI[c]} {t(c)}
            </Chip>
          ))}
        </div>
        {g.myListings.length === 0 ? <EmptyState text={t("noListings")} /> : null}
        <div className="space-y-3">
          {g.myListings.map((l) => (
            <ListingRow key={l.id} l={l} onEdit={() => startEdit(l)} onDelete={() => setDeleteId(l.id)} />
          ))}
        </div>
        <DeleteDialog id={deleteId} onClose={() => setDeleteId(null)} />
      </Page>
    );
  }

  /* ---------------------------------- FORM --------------------------------- */
  if (view.name === "form") {
    const category = view.category;
    const suggestion = suggestPrice(g.listings, category, form.unit);
    const sample =
      category === "machine"
        ? form.title.toLowerCase().includes("harvest")
          ? SAMPLE_IMAGES.harvester
          : SAMPLE_IMAGES.tractor
        : CATEGORY_IMAGE[category];

    const submit = () => {
      if (!form.title || !form.price) {
        toast.error(t("requiredFields"));
        return;
      }
      const payload = {
        category,
        title: form.title,
        brand: form.brand,
        model: form.model,
        capacity: form.capacity,
        quantity: form.quantity,
        skills: form.skills,
        experience: form.experience,
        area: form.area,
        price: Number(form.price),
        unit: form.unit,
        village: g.profile.village,
        district: g.profile.district,
        state: g.profile.state,
        distanceKm: 0.5,
        condition: form.condition,
        availableFrom: form.availableFrom,
        availableUntil: form.availableUntil,
        rating: 5,
        reviews: 0,
        description: form.description,
        image: form.image || sample,
        imageIsSample: !form.image,
        status: "active" as const,
      };
      if (view.editId) {
        g.updateListing(view.editId, payload);
        toast.success(t("updated"));
      } else {
        g.addListing(payload);
        toast.success(t("published"));
      }
      setView({ name: "dash" });
      setTab("search");
    };

    return (
      <Page onBack={() => setView({ name: "dash" })}>
        <h1 className="text-2xl font-extrabold">
          {CATEGORY_EMOJI[category]} {view.editId ? t("edit") : t("addNew")}
        </h1>

        <div className="overflow-hidden rounded-3xl border-2 border-border">
          <img src={form.image || sample} alt={t("photo")} loading="lazy" className="h-40 w-full object-cover" />
        </div>
        <p className="-mt-2 text-xs text-muted-foreground">📸 {t("photoNote")}</p>
        <Field label={`${t("photo")} (URL)`}>
          <Input
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="https://..."
            className="h-13 rounded-2xl border-2 py-3 text-base"
          />
        </Field>

        <Field label={t("name")}>
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="h-13 rounded-2xl border-2 py-3 text-base"
          />
        </Field>
        <div className="flex flex-wrap gap-2">
          {TYPES_BY_CATEGORY[category].map((ty) => (
            <Chip key={ty} active={form.title === ty} onClick={() => setForm({ ...form, title: ty })}>
              {ty}
            </Chip>
          ))}
        </div>

        {category === "machine" ? (
          <div className="grid grid-cols-2 gap-3">
            <Field label={t("brand")}>
              <Input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="h-13 rounded-2xl border-2 py-3 text-base" />
            </Field>
            <Field label={t("model")}>
              <Input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className="h-13 rounded-2xl border-2 py-3 text-base" />
            </Field>
            <Field label={t("capacity")}>
              <Input value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className="h-13 rounded-2xl border-2 py-3 text-base" />
            </Field>
          </div>
        ) : null}
        {category === "residue" ? (
          <Field label={t("quantity")}>
            <Input value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="h-13 rounded-2xl border-2 py-3 text-base" />
          </Field>
        ) : null}
        {category === "labour" ? (
          <div className="space-y-3">
            <Field label={t("skills")}>
              <Input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="h-13 rounded-2xl border-2 py-3 text-base" />
            </Field>
            <Field label={t("experience")}>
              <Input value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="h-13 rounded-2xl border-2 py-3 text-base" />
            </Field>
          </div>
        ) : null}
        {category === "storage" ? (
          <div className="grid grid-cols-2 gap-3">
            <Field label={t("area")}>
              <Input value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className="h-13 rounded-2xl border-2 py-3 text-base" />
            </Field>
            <Field label={t("capacity")}>
              <Input value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className="h-13 rounded-2xl border-2 py-3 text-base" />
            </Field>
          </div>
        ) : null}

        <Field label={t("price")}>
          <Input
            inputMode="numeric"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value.replace(/\D/g, "") })}
            className="h-13 rounded-2xl border-2 py-3 text-base"
          />
        </Field>
        <div className="flex flex-wrap gap-2">
          {UNITS.map((u) => (
            <Chip key={u} active={form.unit === u} onClick={() => setForm({ ...form, unit: u })}>
              /{t(`per${u[0]!.toUpperCase()}${u.slice(1)}`)}
            </Chip>
          ))}
        </div>
        {suggestion ? (
          <div className="rounded-3xl border-2 border-accent/50 bg-accent/12 p-4">
            <p className="font-bold">💰 {t("suggestedPrice")}</p>
            <p className="text-xl font-extrabold text-foreground">
              ₹{suggestion.low} – ₹{suggestion.high}/{t(`per${form.unit[0]!.toUpperCase()}${form.unit.slice(1)}`)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{t("priceNote")}</p>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {(["new", "good", "old"] as const).map((c) => (
            <Chip key={c} active={form.condition === c} onClick={() => setForm({ ...form, condition: c })}>
              🔧 {t(c)}
            </Chip>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label={t("availableFrom")}>
            <Input type="date" value={form.availableFrom} onChange={(e) => setForm({ ...form, availableFrom: e.target.value })} className="h-13 rounded-2xl border-2 py-3 text-base" />
          </Field>
          <Field label={t("availableUntil")}>
            <Input type="date" value={form.availableUntil} onChange={(e) => setForm({ ...form, availableUntil: e.target.value })} className="h-13 rounded-2xl border-2 py-3 text-base" />
          </Field>
        </div>

        <Field label={t("description")}>
          <Textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="min-h-24 rounded-2xl border-2"
          />
        </Field>

        <Button size="lg" className="h-14 rounded-2xl text-lg" onClick={submit}>
          {view.editId ? t("save") : t("publish")}
        </Button>
      </Page>
    );
  }

  /* -------------------------------- DASHBOARD ------------------------------- */
  const active = g.myListings.filter((l) => l.status === "active").length;
  const pending = requests.filter((b) => b.status === "pending").length;
  const upcoming = requests.filter((b) => b.status === "confirmed").length;
  const done = requests.filter((b) => b.status === "completed").length;

  return (
    <Page>
      <h1 className="text-2xl font-extrabold">
        {t("namaste")}, {g.profile.name || "Kisan"} 👋
      </h1>
      <h2 className="text-xl font-bold">{t("whatProvide")}</h2>
      <div className="grid grid-cols-2 gap-3">
        <BigTile emoji="🚜" title={t("machine")} sub={t("provideMachine")} onClick={() => startAdd("machine")} />
        <BigTile emoji="🌾" title={t("residue")} sub={t("provideResidue")} onClick={() => startAdd("residue")} />
        <BigTile emoji="👷" title={t("labour")} sub={t("provideLabour")} onClick={() => startAdd("labour")} />
        <BigTile emoji="📦" title={t("storage")} sub={t("provideStorage")} onClick={() => startAdd("storage")} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Stat label={t("activeListings")} value={active} />
        <Stat label={t("bookingRequests")} value={pending} />
        <Stat label={t("upcoming")} value={upcoming} />
        <Stat label={t("completed")} value={done} />
      </div>

      <SectionTitle
        right={
          <Button className="h-11 rounded-2xl" onClick={() => startAdd("machine")}>
            <Plus /> {t("addNew")}
          </Button>
        }
      >
        {t("myListings")}
      </SectionTitle>
      {g.myListings.length === 0 ? <EmptyState text={t("noListings")} /> : null}
      <div className="space-y-3">
        {g.myListings.map((l) => (
          <ListingRow key={l.id} l={l} onEdit={() => startEdit(l)} onDelete={() => setDeleteId(l.id)} />
        ))}
      </div>
      <DeleteDialog id={deleteId} onClose={() => setDeleteId(null)} />
      <DemandTrends />
    </Page>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl border-2 border-border bg-card p-4">
      <p className="text-3xl font-extrabold text-primary">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function ListingRow({ l, onEdit, onDelete }: { l: Listing; onEdit: () => void; onDelete: () => void }) {
  const g = useGram();
  const { t } = g;
  return (
    <div className="rounded-3xl border-2 border-border bg-card p-3">
      <div className="flex gap-3">
        <img
          src={l.image ?? CATEGORY_IMAGE[l.category]}
          alt={l.title}
          loading="lazy"
          className="size-20 shrink-0 rounded-2xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold">{l.title}</p>
          <p className="font-extrabold text-primary">{priceText(l, t)}</p>
          <p className="text-xs text-muted-foreground">
            📅 {l.availableFrom} → {l.availableUntil}
          </p>
          <div className="mt-1">
            <StatusDot active={l.status === "active"} label={l.status === "active" ? t("active") : t("inactive")} />
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <Button variant="secondary" className="h-11 rounded-2xl" onClick={onEdit}>
          <Pencil /> {t("edit")}
        </Button>
        <Button
          variant="outline"
          className="h-11 rounded-2xl"
          onClick={() => g.updateListing(l.id, { status: l.status === "active" ? "inactive" : "active" })}
        >
          {l.status === "active" ? `🔴 ${t("makeInactive")}` : `🟢 ${t("makeActive")}`}
        </Button>
        <Button variant="ghost" className="h-11 rounded-2xl text-destructive" onClick={onDelete}>
          <Trash2 /> {t("delete")}
        </Button>
      </div>
    </div>
  );
}

function DeleteDialog({ id, onClose }: { id: string | null; onClose: () => void }) {
  const g = useGram();
  const { t } = g;
  return (
    <AlertDialog open={!!id} onOpenChange={(o) => !o && onClose()}>
      <AlertDialogContent className="rounded-3xl">
        <AlertDialogTitle>{t("deleteConfirm")}</AlertDialogTitle>
        <AlertDialogFooter>
          <AlertDialogCancel className="h-12 rounded-2xl">{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            className="h-12 rounded-2xl bg-destructive text-destructive-foreground"
            onClick={() => {
              if (id) g.removeListing(id);
              onClose();
            }}
          >
            {t("delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
