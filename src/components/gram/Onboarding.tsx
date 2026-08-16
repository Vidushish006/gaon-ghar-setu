import { useState } from "react";
import { MapPin, Phone, Loader2, ChevronLeft } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGram } from "@/lib/gram/store";
import { LANGUAGES, UPCOMING_LANGUAGES, type Lang } from "@/lib/gram/i18n";
import { BigTile, Field } from "./common";

function Screen({
  children,
  onBack,
}: {
  children: React.ReactNode;
  onBack?: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-6 px-5 pb-10 pt-8">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 flex w-fit items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold text-muted-foreground"
        >
          <ChevronLeft className="size-4" />
          Back
        </button>
      ) : null}
      {children}
    </div>
  );
}

export function Onboarding() {
  const g = useGram();
  const { t } = g;
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [manual, setManual] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [form, setForm] = useState({
    village: "",
    city: "",
    district: "",
    state: "",
  });

  if (g.stage === "lang") {
    return (
      <Screen>
        <div className="text-center">
          <div className="text-5xl">🌾</div>
          <h1 className="mt-3 text-3xl font-extrabold text-foreground">Gram Setu</h1>
          <p className="mt-1 text-muted-foreground">Gaon se Zarurat Tak</p>
        </div>
        <h2 className="text-center text-xl font-bold">
          {t("chooseLanguage")} / अपनी भाषा चुनें
        </h2>
        <div className="space-y-3">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                g.set({ lang: l.code as Lang, stage: "welcome" });
              }}
              className="flex w-full items-center gap-4 rounded-3xl border-2 border-border bg-card px-5 py-5 text-left shadow-[var(--shadow-soft)] transition-all hover:border-primary active:scale-[0.98]"
            >
              <span className="text-3xl">{l.flag}</span>
              <span>
                <span className="block text-xl font-bold">{l.native}</span>
                <span className="block text-sm text-muted-foreground">{l.label}</span>
              </span>
            </button>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Aa rahi hain: {UPCOMING_LANGUAGES.join(" · ")}
        </p>
      </Screen>
    );
  }

  if (g.stage === "welcome") {
    return (
      <Screen onBack={() => g.setStage("lang")}>
        <div className="overflow-hidden rounded-[2rem] border-2 border-border shadow-[var(--shadow-soft)]">
          <img src={heroImg} alt="Indian village fields at sunrise" width={1024} height={768} />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-extrabold">🌾 Gram Setu</h1>
          <p className="mt-2 text-xl font-semibold text-primary">{t("tagline")}</p>
          <p className="mt-1 text-muted-foreground">{t("support")}</p>
        </div>
        <Button size="lg" className="h-14 rounded-2xl text-lg" onClick={() => g.setStage("phone")}>
          {t("getStarted")}
        </Button>
      </Screen>
    );
  }

  if (g.stage === "phone") {
    return (
      <Screen onBack={() => g.setStage("welcome")}>
        <div className="mt-6 flex size-16 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <Phone className="size-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{t("enterMobile")}</h1>
          <p className="mt-1 text-muted-foreground">{t("mobileHelp")}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-14 items-center rounded-2xl border-2 border-border bg-muted px-4 text-lg font-bold">
            +91
          </span>
          <Input
            inputMode="numeric"
            maxLength={10}
            placeholder={t("mobile")}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            className="h-14 rounded-2xl border-2 text-lg"
          />
        </div>
        <Button
          size="lg"
          className="h-14 rounded-2xl text-lg"
          disabled={phone.length < 10}
          onClick={() => {
            g.set({ profile: { ...g.profile, phone: `+91 ${phone}` }, stage: "otp" });
          }}
        >
          {t("sendOtp")}
        </Button>
      </Screen>
    );
  }

  if (g.stage === "otp") {
    return (
      <Screen onBack={() => g.setStage("phone")}>
        <div className="mt-6">
          <h1 className="text-2xl font-bold">{t("verifyNumber")}</h1>
          <p className="mt-1 text-muted-foreground">{t("otpHelp")}</p>
          <p className="mt-1 text-sm font-semibold text-primary">{g.profile.phone}</p>
        </div>
        <Input
          inputMode="numeric"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          placeholder="0000"
          className="h-16 rounded-2xl border-2 text-center text-3xl tracking-[0.5em]"
        />
        <p className="text-center text-sm text-muted-foreground">{t("demoOtp")}</p>
        <Button
          size="lg"
          className="h-14 rounded-2xl text-lg"
          disabled={otp.length < 4}
          onClick={() => g.setStage("location")}
        >
          {t("verify")}
        </Button>
        <Button variant="ghost" className="h-12 rounded-2xl" onClick={() => setOtp("")}>
          {t("resendOtp")}
        </Button>
      </Screen>
    );
  }

  if (g.stage === "location") {
    return (
      <Screen onBack={() => g.setStage("otp")}>
        <h1 className="mt-4 text-2xl font-bold">{t("whereLocated")}</h1>
        {!manual ? (
          <div className="space-y-3">
            <BigTile
              emoji="📍"
              title={t("useCurrentLocation")}
              sub={t("useCurrentLocationSub")}
              onClick={() => {
                setDetecting(true);
                setTimeout(() => {
                  g.set({
                    profile: {
                      ...g.profile,
                      village: "Bassi",
                      city: "Jaipur",
                      district: "Jaipur",
                      state: "Rajasthan",
                    },
                    stage: "mode",
                  });
                }, 1200);
              }}
            />
            <BigTile
              emoji="🏘️"
              title={t("selectManually")}
              sub={t("selectManuallySub")}
              onClick={() => setManual(true)}
            />
            {detecting ? (
              <p className="flex items-center justify-center gap-2 pt-2 text-primary">
                <Loader2 className="size-5 animate-spin" />
                {t("detecting")}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="space-y-4">
            {(["village", "city", "district", "state"] as const).map((k) => (
              <Field key={k} label={t(k)}>
                <Input
                  value={form[k]}
                  onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                  className="h-13 rounded-2xl border-2 py-3 text-base"
                />
              </Field>
            ))}
            <Button
              size="lg"
              className="h-14 w-full rounded-2xl text-lg"
              disabled={!form.village || !form.district}
              onClick={() => g.set({ profile: { ...g.profile, ...form }, stage: "mode" })}
            >
              {t("continue")}
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setManual(false)}>
              {t("cancel")}
            </Button>
          </div>
        )}
      </Screen>
    );
  }

  if (g.stage === "mode") {
    return (
      <Screen onBack={() => g.setStage("location")}>
        <h1 className="mt-4 text-2xl font-bold">{t("howUse")}</h1>
        <p className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="size-4" /> {g.profile.village}, {g.profile.district}
        </p>
        <div className="space-y-4">
          <BigTile
            emoji="👨‍🌾"
            title={t("consumer")}
            sub={t("consumerSub")}
            onClick={() => g.set({ mode: "consumer", stage: "profile" })}
          />
          <BigTile
            emoji="🧑‍🌾"
            title={t("provider")}
            sub={t("providerSub")}
            onClick={() => g.set({ mode: "provider", stage: "profile" })}
          />
        </div>
        <p className="text-center text-sm text-muted-foreground">
          {t("switchMode")} — baad mein kabhi bhi. 🔄
        </p>
      </Screen>
    );
  }

  // profile
  return (
    <Screen onBack={() => g.setStage("mode")}>
      <h1 className="mt-4 text-2xl font-bold">{t("yourDetails")}</h1>
      <div className="space-y-4">
        <Field label={t("fullName")}>
          <Input
            value={g.profile.name}
            onChange={(e) => g.set({ profile: { ...g.profile, name: e.target.value } })}
            className="h-13 rounded-2xl border-2 py-3 text-base"
          />
        </Field>
        <Field label={t("mobile")}>
          <Input value={g.profile.phone} readOnly className="h-13 rounded-2xl border-2 py-3 text-base" />
        </Field>
        <Field label={t("fullAddress")}>
          <Input
            value={g.profile.address}
            onChange={(e) => g.set({ profile: { ...g.profile, address: e.target.value } })}
            className="h-13 rounded-2xl border-2 py-3 text-base"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          {(["village", "city", "district", "state"] as const).map((k) => (
            <Field key={k} label={t(k)}>
              <Input
                value={g.profile[k]}
                onChange={(e) => g.set({ profile: { ...g.profile, [k]: e.target.value } })}
                className="h-13 rounded-2xl border-2 py-3 text-base"
              />
            </Field>
          ))}
        </div>
      </div>
      <Button
        size="lg"
        className="h-14 rounded-2xl text-lg"
        disabled={!g.profile.name}
        onClick={() => g.setStage("app")}
      >
        {t("save")}
      </Button>
    </Screen>
  );
}
