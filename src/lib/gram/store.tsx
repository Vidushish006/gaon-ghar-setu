import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { DEMO_LISTINGS, type Booking, type Listing } from "./data";
import { translate, type Lang } from "./i18n";

export type Mode = "consumer" | "provider";
export type Stage = "lang" | "welcome" | "phone" | "otp" | "location" | "mode" | "profile" | "app";

export interface Profile {
  name: string;
  phone: string;
  address: string;
  village: string;
  city: string;
  district: string;
  state: string;
}

interface State {
  lang: Lang | null;
  stage: Stage;
  mode: Mode;
  profile: Profile;
  listings: Listing[];
  bookings: Booking[];
  saved: string[];
}

const ME = "me";

const initialState: State = {
  lang: null,
  stage: "lang",
  mode: "consumer",
  profile: {
    name: "",
    phone: "",
    address: "",
    village: "",
    city: "",
    district: "",
    state: "",
  },
  listings: DEMO_LISTINGS,
  bookings: [],
  saved: [],
};

interface Ctx extends State {
  t: (key: string) => string;
  set: (patch: Partial<State>) => void;
  setLang: (l: Lang) => void;
  setStage: (s: Stage) => void;
  setMode: (m: Mode) => void;
  myId: string;
  myListings: Listing[];
  addListing: (l: Omit<Listing, "id" | "ownerId" | "providerName" | "providerPhone">) => void;
  updateListing: (id: string, patch: Partial<Listing>) => void;
  removeListing: (id: string) => void;
  addBooking: (b: Omit<Booking, "id">) => void;
  updateBooking: (id: string, patch: Partial<Booking>) => void;
  toggleSaved: (id: string) => void;
  reset: () => void;
}

const GramContext = createContext<Ctx | null>(null);
const KEY = "gram-setu-state-v1";

export function GramProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...initialState, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, hydrated]);

  const set = useCallback((patch: Partial<State>) => setState((s) => ({ ...s, ...patch })), []);

  const value = useMemo<Ctx>(() => {
    const lang = state.lang ?? "en";
    return {
      ...state,
      myId: ME,
      t: (key: string) => translate(lang, key),
      set,
      setLang: (l) => set({ lang: l }),
      setStage: (s) => set({ stage: s }),
      setMode: (m) => set({ mode: m }),
      myListings: state.listings.filter((l) => l.ownerId === ME),
      addListing: (l) =>
        setState((s) => ({
          ...s,
          listings: [
            {
              ...l,
              id: `my-${Date.now()}`,
              ownerId: ME,
              providerName: s.profile.name || "Me",
              providerPhone: s.profile.phone || "+91 00000 00000",
            },
            ...s.listings,
          ],
        })),
      updateListing: (id, patch) =>
        setState((s) => ({
          ...s,
          listings: s.listings.map((l) => (l.id === id ? { ...l, ...patch } : l)),
        })),
      removeListing: (id) =>
        setState((s) => ({ ...s, listings: s.listings.filter((l) => l.id !== id) })),
      addBooking: (b) =>
        setState((s) => ({ ...s, bookings: [{ ...b, id: `b-${Date.now()}` }, ...s.bookings] })),
      updateBooking: (id, patch) =>
        setState((s) => ({
          ...s,
          bookings: s.bookings.map((b) => (b.id === id ? { ...b, ...patch } : b)),
        })),
      toggleSaved: (id) =>
        setState((s) => ({
          ...s,
          saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id],
        })),
      reset: () => setState({ ...initialState }),
    };
  }, [state, set]);

  return <GramContext.Provider value={value}>{children}</GramContext.Provider>;
}

export function useGram() {
  const ctx = useContext(GramContext);
  if (!ctx) throw new Error("useGram must be used inside GramProvider");
  return ctx;
}
