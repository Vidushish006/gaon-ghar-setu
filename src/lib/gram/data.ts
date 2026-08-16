import tractorImg from "@/assets/tractor.jpg";
import harvesterImg from "@/assets/harvester.jpg";
import residueImg from "@/assets/residue.jpg";
import storageImg from "@/assets/storage.jpg";
import labourImg from "@/assets/labour.jpg";

export type Category = "machine" | "residue" | "labour" | "storage";
export type Status = "active" | "inactive";

export interface Listing {
  id: string;
  category: Category;
  ownerId: string;
  providerName: string;
  providerPhone: string;
  title: string;
  brand?: string;
  model?: string;
  capacity?: string;
  quantity?: string;
  skills?: string;
  experience?: string;
  area?: string;
  price: number;
  unit: "hour" | "day" | "acre" | "quintal" | "month";
  village: string;
  district: string;
  state: string;
  distanceKm: number;
  condition: "new" | "good" | "old";
  availableFrom: string;
  availableUntil: string;
  rating: number;
  reviews: number;
  description: string;
  image?: string;
  imageIsSample?: boolean;
  status: Status;
}

export type BookingStatus = "pending" | "confirmed" | "completed";

export interface Booking {
  id: string;
  listingId: string;
  listingTitle: string;
  providerName: string;
  providerPhone: string;
  consumerName: string;
  consumerPhone: string;
  start: string;
  end: string;
  status: BookingStatus;
  rated?: number;
  review?: string;
  ownerId: string;
}

export const CATEGORY_IMAGE: Record<Category, string> = {
  machine: tractorImg,
  residue: residueImg,
  labour: labourImg,
  storage: storageImg,
};

export const SAMPLE_IMAGES = {
  tractor: tractorImg,
  harvester: harvesterImg,
  residue: residueImg,
  storage: storageImg,
  labour: labourImg,
};

export const MACHINE_TYPES = ["Tractor", "Harvester", "Rotavator", "Thresher", "Cultivator"];
export const RESIDUE_TYPES = [
  "Sugarcane Residue",
  "Wheat Straw",
  "Rice Straw",
  "Corn Residue",
  "Other",
];
export const LABOUR_TYPES = [
  "Tractor Operator",
  "Harvesting Worker",
  "Machine Operator",
  "General Farm Labour",
];
export const STORAGE_TYPES = ["Warehouse", "Shed", "Container", "Open Storage", "Other"];

export const TYPES_BY_CATEGORY: Record<Category, string[]> = {
  machine: MACHINE_TYPES,
  residue: RESIDUE_TYPES,
  labour: LABOUR_TYPES,
  storage: STORAGE_TYPES,
};

const today = new Date();
const iso = (d: number) => new Date(today.getTime() + d * 86400000).toISOString().slice(0, 10);

export const DEMO_LISTINGS: Listing[] = [
  {
    id: "l1",
    category: "machine",
    ownerId: "p1",
    providerName: "Ramkishan Meena",
    providerPhone: "+91 98290 45120",
    title: "Mahindra Tractor 575 DI",
    brand: "Mahindra",
    model: "575 DI",
    capacity: "50 HP",
    price: 1800,
    unit: "day",
    village: "Bassi",
    district: "Jaipur",
    state: "Rajasthan",
    distanceKm: 4.2,
    condition: "good",
    availableFrom: iso(0),
    availableUntil: iso(45),
    rating: 4.7,
    reviews: 32,
    description: "Achhi halat mein tractor. Jotai aur dhulai dono ke liye theek.",
    image: tractorImg,
    imageIsSample: true,
    status: "active",
  },
  {
    id: "l2",
    category: "machine",
    ownerId: "p2",
    providerName: "Sukhbir Singh",
    providerPhone: "+91 98111 22045",
    title: "Swaraj 744 FE Tractor",
    brand: "Swaraj",
    model: "744 FE",
    capacity: "48 HP",
    price: 2000,
    unit: "day",
    village: "Chomu",
    district: "Jaipur",
    state: "Rajasthan",
    distanceKm: 11.5,
    condition: "new",
    availableFrom: iso(2),
    availableUntil: iso(60),
    rating: 4.5,
    reviews: 18,
    description: "Naya tractor, rotavator ke saath bhi de sakte hain.",
    image: tractorImg,
    imageIsSample: true,
    status: "active",
  },
  {
    id: "l3",
    category: "machine",
    ownerId: "p3",
    providerName: "Devilal Yadav",
    providerPhone: "+91 99280 71190",
    title: "Combine Harvester",
    brand: "New Holland",
    model: "TC5.30",
    capacity: "2 acre/hour",
    price: 2500,
    unit: "acre",
    village: "Dudu",
    district: "Jaipur",
    state: "Rajasthan",
    distanceKm: 22,
    condition: "good",
    availableFrom: iso(1),
    availableUntil: iso(30),
    rating: 4.8,
    reviews: 41,
    description: "Gehun aur dhaan ki katai ke liye. Driver saath mein.",
    image: harvesterImg,
    imageIsSample: true,
    status: "active",
  },
  {
    id: "l4",
    category: "machine",
    ownerId: "p4",
    providerName: "Mohanlal Gurjar",
    providerPhone: "+91 94140 33221",
    title: "Rotavator (7 feet)",
    brand: "Shaktiman",
    model: "RT-210",
    capacity: "7 ft",
    price: 350,
    unit: "hour",
    village: "Phulera",
    district: "Jaipur",
    state: "Rajasthan",
    distanceKm: 8.1,
    condition: "old",
    availableFrom: iso(0),
    availableUntil: iso(20),
    rating: 4.1,
    reviews: 9,
    description: "Khet taiyar karne ke liye rotavator.",
    image: tractorImg,
    imageIsSample: true,
    status: "active",
  },
  {
    id: "l5",
    category: "residue",
    ownerId: "p5",
    providerName: "Kalu Ram",
    providerPhone: "+91 97993 66120",
    title: "Wheat Straw (Bhusa)",
    quantity: "80 quintal",
    price: 600,
    unit: "quintal",
    village: "Renwal",
    district: "Jaipur",
    state: "Rajasthan",
    distanceKm: 6.4,
    condition: "new",
    availableFrom: iso(0),
    availableUntil: iso(25),
    rating: 4.4,
    reviews: 12,
    description: "Saaf bhusa, pashu chaare ke liye badhiya.",
    image: residueImg,
    imageIsSample: true,
    status: "active",
  },
  {
    id: "l6",
    category: "residue",
    ownerId: "p6",
    providerName: "Shanti Devi",
    providerPhone: "+91 90019 44531",
    title: "Sugarcane Residue",
    quantity: "150 quintal",
    price: 450,
    unit: "quintal",
    village: "Bagru",
    district: "Jaipur",
    state: "Rajasthan",
    distanceKm: 14.9,
    condition: "good",
    availableFrom: iso(3),
    availableUntil: iso(40),
    rating: 4.2,
    reviews: 7,
    description: "Ganne ka avshesh, khaad aur chaare ke liye.",
    image: residueImg,
    imageIsSample: true,
    status: "active",
  },
  {
    id: "l7",
    category: "labour",
    ownerId: "p7",
    providerName: "Ramesh Kumar",
    providerPhone: "+91 98765 11223",
    title: "Ramesh Kumar — Tractor Operator",
    skills: "Tractor operation, Harvesting, Machine handling",
    experience: "5 years",
    price: 800,
    unit: "day",
    village: "Bassi",
    district: "Jaipur",
    state: "Rajasthan",
    distanceKm: 3.1,
    condition: "good",
    availableFrom: iso(0),
    availableUntil: iso(60),
    rating: 4.9,
    reviews: 54,
    description: "Tractor aur harvester dono chala lete hain.",
    image: labourImg,
    imageIsSample: true,
    status: "active",
  },
  {
    id: "l8",
    category: "labour",
    ownerId: "p8",
    providerName: "Vikram Bairwa",
    providerPhone: "+91 93510 87742",
    title: "Vikram Bairwa — Harvesting Worker",
    skills: "Harvesting, Loading, General farm labour",
    experience: "3 years",
    price: 500,
    unit: "day",
    village: "Chaksu",
    district: "Jaipur",
    state: "Rajasthan",
    distanceKm: 17.3,
    condition: "good",
    availableFrom: iso(1),
    availableUntil: iso(35),
    rating: 4.3,
    reviews: 21,
    description: "Team ke saath katai ka kaam karte hain.",
    image: labourImg,
    imageIsSample: true,
    status: "active",
  },
  {
    id: "l9",
    category: "storage",
    ownerId: "p9",
    providerName: "Bhanwar Lal",
    providerPhone: "+91 94619 30012",
    title: "Village Storage Shed",
    area: "50 sq. metre",
    capacity: "1000 kg",
    price: 2500,
    unit: "month",
    village: "Bassi",
    district: "Jaipur",
    state: "Rajasthan",
    distanceKm: 2.5,
    condition: "good",
    availableFrom: iso(0),
    availableUntil: iso(90),
    rating: 4.6,
    reviews: 15,
    description: "Sukha aur surakshit shed, anaaj rakhne ke liye.",
    image: storageImg,
    imageIsSample: true,
    status: "active",
  },
  {
    id: "l10",
    category: "storage",
    ownerId: "p10",
    providerName: "Hariram Choudhary",
    providerPhone: "+91 97836 55410",
    title: "Village Warehouse",
    area: "200 sq. metre",
    capacity: "8000 kg",
    price: 7000,
    unit: "month",
    village: "Kotputli",
    district: "Jaipur",
    state: "Rajasthan",
    distanceKm: 34,
    condition: "new",
    availableFrom: iso(5),
    availableUntil: iso(180),
    rating: 4.4,
    reviews: 11,
    description: "Bada godam, truck aa-ja sakta hai.",
    image: storageImg,
    imageIsSample: true,
    status: "active",
  },
];

export const DEMAND_TRENDS: {
  emoji: string;
  label: string;
  trend: "up" | "stable" | "down";
  note: string;
}[] = [
  { emoji: "🌾", label: "Sugarcane Residue", trend: "up", note: "High demand" },
  { emoji: "🚜", label: "Harvesting Machine", trend: "up", note: "Season peak" },
  { emoji: "🚜", label: "Tractor", trend: "stable", note: "Normal" },
  { emoji: "👷", label: "Farm Labour", trend: "up", note: "Katai season" },
  { emoji: "📦", label: "Storage", trend: "down", note: "Off season" },
];

/** Mock AI price recommendation from nearby listings of the same category. */
export function suggestPrice(
  listings: Listing[],
  category: Category,
  unit: Listing["unit"],
): { low: number; high: number } | null {
  const peers = listings.filter((l) => l.category === category && l.unit === unit);
  if (peers.length === 0) return null;
  const avg = peers.reduce((s, l) => s + l.price, 0) / peers.length;
  const round = (n: number) => Math.round(n / 50) * 50;
  return { low: round(avg * 0.88), high: round(avg * 1.12) };
}

/** Mock AI best-match score: distance + price + availability + condition + rating. */
export function matchScore(
  l: Listing,
  opts: { maxDistance: number; maxPrice: number; cheapest: number; farthest: number },
): number {
  const distScore = 1 - Math.min(l.distanceKm / Math.max(opts.maxDistance, 1), 1);
  const priceScore = 1 - Math.min(l.price / Math.max(opts.maxPrice, 1), 1);
  const ratingScore = l.rating / 5;
  const condScore = l.condition === "new" ? 1 : l.condition === "good" ? 0.8 : 0.55;
  const availScore = new Date(l.availableFrom) <= new Date() ? 1 : 0.7;
  const raw =
    distScore * 0.3 + priceScore * 0.2 + ratingScore * 0.25 + condScore * 0.15 + availScore * 0.1;
  return Math.round(55 + raw * 44);
}
