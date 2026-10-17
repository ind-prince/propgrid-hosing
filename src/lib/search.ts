import type { FilterState, Property, SearchParams, SortKey } from "@/types";

export const DEFAULT_FILTERS: FilterState = {
  query: "",
  cities: [],
  types: [],
  beds: [],
  furnishing: [],
  listerType: [],
  priceMin: 0,
  priceMax: 200000000,
  amenities: [],
  sort: "relevance",
  verifiedOnly: false,
};

export function filterProperties(all: Property[], params: SearchParams): Property[] {
  const q = params.query.trim().toLowerCase();
  let list = all.filter((p) => {
    if (p.kind !== params.kind) return false;
    if (q) {
      const hay = `${p.title} ${p.locality} ${p.city} ${p.type}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (params.cities.length && !params.cities.includes(p.city)) return false;
    if (params.types.length && !params.types.includes(p.type)) return false;
    if (params.beds.length && !params.beds.some((b) => p.beds >= b)) return false;
    if (params.furnishing.length && !params.furnishing.includes(p.furnishing)) return false;
    if (params.listerType.length && !params.listerType.includes(p.listerType)) return false;
    if (params.amenities.length && !params.amenities.every((a) => p.amenities.includes(a))) return false;
    if (p.price < params.priceMin || p.price > params.priceMax) return false;
    if (params.verifiedOnly && !p.verified) return false;
    return true;
  });

  const sorters: Record<SortKey, (a: Property, b: Property) => number> = {
    relevance: (a, b) => b.popularity - a.popularity,
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    popularity: (a, b) => b.popularity - a.popularity,
    recent: (a, b) => a.postedDaysAgo - b.postedDaysAgo,
  };
  list = [...list].sort(sorters[params.sort]);
  return list;
}

export function countActiveFilters(f: FilterState): number {
  let n = 0;
  n += f.cities.length;
  n += f.types.length;
  n += f.beds.length;
  n += f.furnishing.length;
  n += f.listerType.length;
  n += f.amenities.length;
  if (f.verifiedOnly) n += 1;
  if (f.priceMin > DEFAULT_FILTERS.priceMin || f.priceMax < DEFAULT_FILTERS.priceMax) n += 1;
  return n;
}