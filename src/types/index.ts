export type ListingKind = "buy" | "rent" | "new-launch";
export type PropertyType = "Apartment" | "Villa" | "Studio" | "Plot" | "Penthouse";
export type Furnishing = "Furnished" | "Semi-Furnished" | "Unfurnished";
export type ListerType = "Owner" | "Agent" | "Builder";
export type SortKey = "relevance" | "price-asc" | "price-desc" | "popularity" | "recent";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface PricingBreakdown {
  base: number;
  maintenanceMonthly: number;
  registration: number;
  stampDuty: number;
  parking: number;
}

export interface Agent {
  id: string;
  name: string;
  agency: string;
  avatarInitials: string;
  rating: number;
  dealsClosed: number;
  phone: string;
  verified: boolean;
}

export interface Property {
  id: string;
  title: string;
  kind: ListingKind;
  type: PropertyType;
  city: string;
  locality: string;
  address: string;
  price: number;
  pricePerSqft: number;
  beds: number;
  baths: number;
  area: number;
  furnishing: Furnishing;
  listerType: ListerType;
  verified: boolean;
  rera: boolean;
  rating: number;
  reviews: number;
  postedDaysAgo: number;
  popularity: number;
  amenities: string[];
  tags: string[];
  images: string[];
  gradient: string;
  geo: GeoPoint;
  pricing: PricingBreakdown;
  agent: Agent;
  description: string;
}

export interface FilterState {
  query: string;
  cities: string[];
  types: PropertyType[];
  beds: number[];
  furnishing: Furnishing[];
  listerType: ListerType[];
  priceMin: number;
  priceMax: number;
  amenities: string[];
  sort: SortKey;
  verifiedOnly: boolean;
}

export interface SearchParams extends FilterState {
  kind: ListingKind;
}

export interface LeadPayload {
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  tourDate: string;
  tourSlot: string;
}

export interface Lead extends LeadPayload {
  id: string;
  createdAt: number;
  status: "new" | "contacted";
}