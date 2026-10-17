import type { Property } from "@/types";
import { AGENTS } from "@/data/agents";

export type { Property } from "@/types";

export interface Filters {
  query: string;
  city: string;
  type: string;
  budget: string;
  beds: string;
  sort: "relevance" | "price-asc" | "price-desc" | "rating";
}

const GRADIENTS = [
  "from-teal-500 to-emerald-700",
  "from-amber-500 to-orange-700",
  "from-indigo-500 to-violet-700",
  "from-rose-500 to-pink-700",
  "from-cyan-500 to-blue-700",
  "from-lime-500 to-green-700",
  "from-fuchsia-500 to-purple-700",
  "from-sky-500 to-indigo-700",
];

const AMENITY_POOL = [
  "Swimming Pool",
  "Gym",
  "Clubhouse",
  "24x7 Security",
  "Power Backup",
  "Covered Parking",
  "Children's Play Area",
  "Landscaped Garden",
  "Lift",
  "Rainwater Harvesting",
  "Jogging Track",
  "Indoor Games",
  "CCTV",
  "Intercom",
  "Vaastu Compliant",
  "Pet Friendly",
];

interface Seed {
  title: string;
  kind: Property["kind"];
  type: Property["type"];
  city: string;
  locality: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  furnishing: Property["furnishing"];
  listerType: Property["listerType"];
  lat: number;
  lng: number;
  verified: boolean;
  rera: boolean;
  tags: string[];
}

const SEEDS: Seed[] = [
  { title: "Lodha Amara 3BHK with Skyline View", kind: "buy", type: "Apartment", city: "Mumbai", locality: "Powai", price: 32500000, beds: 3, baths: 3, area: 1580, furnishing: "Semi-Furnished", listerType: "Builder", lat: 19.1197, lng: 72.9051, verified: true, rera: true, tags: ["Premium", "Lake View"] },
  { title: "Hiranandani Gardens Villa", kind: "buy", type: "Villa", city: "Mumbai", locality: "Andheri West", price: 78000000, beds: 5, baths: 5, area: 4200, furnishing: "Furnished", listerType: "Agent", lat: 19.1364, lng: 72.8296, verified: true, rera: true, tags: ["Luxury", "Gated"] },
  { title: "Sea-Facing 2BHK at Worli", kind: "buy", type: "Apartment", city: "Mumbai", locality: "Worli", price: 54000000, beds: 2, baths: 2, area: 1240, furnishing: "Furnished", listerType: "Owner", lat: 19.0176, lng: 72.8178, verified: true, rera: false, tags: ["Sea View", "Corner Unit"] },
  { title: "DLF Camellias Signature Residence", kind: "buy", type: "Penthouse", city: "Delhi NCR", locality: "Golf Course Road", price: 145000000, beds: 4, baths: 5, area: 6800, furnishing: "Furnished", listerType: "Builder", lat: 28.4595, lng: 77.0995, verified: true, rera: true, tags: ["Ultra Luxury", "Private Lift"] },
  { title: "Godrej Woods 3BHK Green Living", kind: "buy", type: "Apartment", city: "Delhi NCR", locality: "Sector 43 Noida", price: 21500000, beds: 3, baths: 2, area: 1720, furnishing: "Semi-Furnished", listerType: "Builder", lat: 28.5708, lng: 77.3621, verified: true, rera: true, tags: ["Forest Theme", "New Launch"] },
  { title: "Sohna Road Independent Floor", kind: "buy", type: "Villa", city: "Delhi NCR", locality: "Sohna Road", price: 18500000, beds: 4, baths: 3, area: 2600, furnishing: "Unfurnished", listerType: "Owner", lat: 28.4089, lng: 77.0326, verified: false, rera: false, tags: ["Independent", "Corner Plot"] },
  { title: "Prestige Lakeside Habitat 2BHK", kind: "buy", type: "Apartment", city: "Bengaluru", locality: "Whitefield", price: 9800000, beds: 2, baths: 2, area: 1180, furnishing: "Semi-Furnished", listerType: "Builder", lat: 12.9698, lng: 77.7499, verified: true, rera: true, tags: ["Lake Facing", "Township"] },
  { title: "Brigade Cornerstone 4BHK Duplex", kind: "buy", type: "Penthouse", city: "Bengaluru", locality: "Hebbal", price: 42000000, beds: 4, baths: 4, area: 3400, furnishing: "Furnished", listerType: "Agent", lat: 13.0358, lng: 77.5970, verified: true, rera: true, tags: ["Duplex", "Sky Lounge"] },
  { title: "Sarjapur Road Plot — DTCP Approved", kind: "buy", type: "Plot", city: "Bengaluru", locality: "Sarjapur Road", price: 7200000, beds: 0, baths: 0, area: 2400, furnishing: "Unfurnished", listerType: "Owner", lat: 12.9010, lng: 77.6870, verified: true, rera: false, tags: ["DTCP", "Clear Title"] },
  { title: "Koregaon Park Studio Loft", kind: "buy", type: "Studio", city: "Pune", locality: "Koregaon Park", price: 6500000, beds: 1, baths: 1, area: 620, furnishing: "Furnished", listerType: "Agent", lat: 18.5362, lng: 73.8939, verified: true, rera: false, tags: ["Loft", "Cafe District"] },
  { title: "Baner Hills 3BHK with Terrace", kind: "buy", type: "Apartment", city: "Pune", locality: "Baner", price: 14500000, beds: 3, baths: 3, area: 1650, furnishing: "Semi-Furnished", listerType: "Builder", lat: 18.5590, lng: 73.7868, verified: true, rera: true, tags: ["Terrace", "Hill View"] },
  { title: "Gachibowli Financial District 3BHK", kind: "buy", type: "Apartment", city: "Hyderabad", locality: "Gachibowli", price: 13200000, beds: 3, baths: 3, area: 1740, furnishing: "Semi-Furnished", listerType: "Builder", lat: 17.4401, lng: 78.3489, verified: true, rera: true, tags: ["IT Corridor", "Clubhouse"] },
  { title: "Jubilee Hills Colonial Villa", kind: "buy", type: "Villa", city: "Hyderabad", locality: "Jubilee Hills", price: 62000000, beds: 5, baths: 6, area: 5200, furnishing: "Furnished", listerType: "Owner", lat: 17.4239, lng: 78.4122, verified: true, rera: false, tags: ["Colonial", "Private Pool"] },
  { title: "Adyar Riverfront 2BHK", kind: "buy", type: "Apartment", city: "Chennai", locality: "Adyar", price: 11200000, beds: 2, baths: 2, area: 1310, furnishing: "Semi-Furnished", listerType: "Agent", lat: 13.0067, lng: 80.2570, verified: false, rera: false, tags: ["Riverfront", "East Facing"] },
  { title: "OMR Sholinganallur 3BHK Smart Home", kind: "buy", type: "Apartment", city: "Chennai", locality: "Sholinganallur", price: 8900000, beds: 3, baths: 2, area: 1450, furnishing: "Furnished", listerType: "Builder", lat: 12.9010, lng: 80.2279, verified: true, rera: true, tags: ["Smart Home", "OMR"] },
  { title: "Fully Furnished 2BHK in Powai", kind: "rent", type: "Apartment", city: "Mumbai", locality: "Powai", price: 78000, beds: 2, baths: 2, area: 1050, furnishing: "Furnished", listerType: "Owner", lat: 19.1176, lng: 72.9060, verified: true, rera: false, tags: ["Zero Brokerage", "Move-in Ready"] },
  { title: "Bandra Sea Breeze 3BHK Rental", kind: "rent", type: "Apartment", city: "Mumbai", locality: "Bandra West", price: 185000, beds: 3, baths: 3, area: 1620, furnishing: "Furnished", listerType: "Agent", lat: 19.0596, lng: 72.8295, verified: true, rera: false, tags: ["Sea View", "Premium"] },
  { title: "Hauz Khas Village 1BHK Studio", kind: "rent", type: "Studio", city: "Delhi NCR", locality: "Hauz Khas", price: 42000, beds: 1, baths: 1, area: 560, furnishing: "Furnished", listerType: "Owner", lat: 28.5535, lng: 77.1944, verified: true, rera: false, tags: ["Bachelor Friendly", "Cafe Hub"] },
  { title: "Indiranagar Family 3BHK Rental", kind: "rent", type: "Apartment", city: "Bengaluru", locality: "Indiranagar", price: 95000, beds: 3, baths: 3, area: 1580, furnishing: "Semi-Furnished", listerType: "Agent", lat: 12.9784, lng: 77.6408, verified: true, rera: false, tags: ["Family", "Pet Friendly"] },
  { title: "HSR Layout Co-living Suite", kind: "rent", type: "Studio", city: "Bengaluru", locality: "HSR Layout", price: 28000, beds: 1, baths: 1, area: 420, furnishing: "Furnished", listerType: "Builder", lat: 12.9121, lng: 77.6446, verified: false, rera: false, tags: ["Co-living", "All Inclusive"] },
  { title: "Kharadi Riverside 2BHK Rental", kind: "rent", type: "Apartment", city: "Pune", locality: "Kharadi", price: 38000, beds: 2, baths: 2, area: 980, furnishing: "Semi-Furnished", listerType: "Owner", lat: 18.5515, lng: 73.9430, verified: true, rera: false, tags: ["Riverside", "IT Park"] },
  { title: "Hitech City Premium 3BHK Rental", kind: "rent", type: "Apartment", city: "Hyderabad", locality: "Hitech City", price: 62000, beds: 3, baths: 3, area: 1680, furnishing: "Furnished", listerType: "Agent", lat: 17.4483, lng: 78.3915, verified: true, rera: false, tags: ["IT Hub", "Gated"] },
  { title: "Besant Nagar Beachside 2BHK", kind: "rent", type: "Apartment", city: "Chennai", locality: "Besant Nagar", price: 45000, beds: 2, baths: 2, area: 1120, furnishing: "Furnished", listerType: "Owner", lat: 13.0002, lng: 80.2668, verified: true, rera: false, tags: ["Beachside", "Quiet Street"] },
  { title: "Lodha Bellagio New Launch 3BHK", kind: "new-launch", type: "Apartment", city: "Mumbai", locality: "Powai", price: 41000000, beds: 3, baths: 3, area: 1820, furnishing: "Unfurnished", listerType: "Builder", lat: 19.1200, lng: 72.9100, verified: true, rera: true, tags: ["Pre-Launch", "Early Bird"] },
  { title: "Godrej Tropical Isle New Launch", kind: "new-launch", type: "Apartment", city: "Delhi NCR", locality: "Sector 146 Noida", price: 19800000, beds: 3, baths: 2, area: 1550, furnishing: "Unfurnished", listerType: "Builder", lat: 28.5000, lng: 77.4000, verified: true, rera: true, tags: ["Pre-Launch", "Payment Plan"] },
  { title: "Sobha Dream Acres Phase 4", kind: "new-launch", type: "Apartment", city: "Bengaluru", locality: "Panathur Road", price: 11500000, beds: 2, baths: 2, area: 1240, furnishing: "Unfurnished", listerType: "Builder", lat: 12.9300, lng: 77.7000, verified: true, rera: true, tags: ["Pre-Launch", "Township"] },
];

function buildProperty(seed: Seed, i: number): Property {
  const agent = AGENTS[i % AGENTS.length];
  const gradient = GRADIENTS[i % GRADIENTS.length];
  const amenities = AMENITY_POOL.filter((_, idx) => (idx + i) % 3 === 0).slice(0, 6);
  const pricePerSqft = Math.round(seed.price / seed.area);
  const isRent = seed.kind === "rent";
  return {
    id: `pg-${i + 1}`,
    title: seed.title,
    kind: seed.kind,
    type: seed.type,
    city: seed.city,
    locality: seed.locality,
    address: `${seed.locality}, ${seed.city}`,
    price: seed.price,
    pricePerSqft,
    beds: seed.beds,
    baths: seed.baths,
    area: seed.area,
    furnishing: seed.furnishing,
    listerType: seed.listerType,
    verified: seed.verified,
    rera: seed.rera,
    rating: Number((4 + ((i * 7) % 10) / 10).toFixed(1)),
    reviews: 12 + ((i * 13) % 180),
    postedDaysAgo: (i * 3) % 45,
    popularity: 100 - i * 2 + ((i * 17) % 40),
    amenities,
    tags: seed.tags,
    images: [0, 1, 2, 3].map((n) => `${gradient}-${n}`),
    gradient,
    geo: { lat: seed.lat, lng: seed.lng },
    pricing: {
      base: seed.price,
      maintenanceMonthly: isRent ? 0 : Math.round(seed.area * 3.5),
      registration: isRent ? 0 : Math.round(seed.price * 0.01),
      stampDuty: isRent ? 0 : Math.round(seed.price * 0.05),
      parking: isRent ? 2500 : 350000,
    },
    agent,
    description: `A thoughtfully designed ${seed.type.toLowerCase()} in ${seed.locality}, ${seed.city}. ${seed.beds > 0 ? `${seed.beds} bedrooms and ${seed.baths} bathrooms across ` : ""}${seed.area} sqft of well-planned space. ${seed.furnishing} and ready for immediate ${isRent ? "move-in" : "possession"}. Close to schools, hospitals, metro connectivity and daily conveniences.`,
  };
}

export const properties: Property[] = SEEDS.map(buildProperty);

export const CITIES = Array.from(new Set(properties.map((p) => p.city))).sort();
export const PROPERTY_TYPES: Property["type"][] = ["Apartment", "Villa", "Studio", "Plot", "Penthouse"];
export const FURNISHINGS: Property["furnishing"][] = ["Furnished", "Semi-Furnished", "Unfurnished"];
export const LISTER_TYPES: Property["listerType"][] = ["Owner", "Agent", "Builder"];
export const ALL_AMENITIES = Array.from(new Set(properties.flatMap((p) => p.amenities))).sort();

export function formatPrice(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

export function formatRent(value: number): string {
  return `₹${value.toLocaleString("en-IN")}/mo`;
}

export function formatListingPrice(p: Property): string {
  return p.kind === "rent" ? formatRent(p.price) : formatPrice(p.price);
}
