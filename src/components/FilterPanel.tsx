import { SlidersHorizontal, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CITIES,
  PROPERTY_TYPES,
  FURNISHINGS,
  LISTER_TYPES,
  ALL_AMENITIES,
  formatPrice,
} from "@/data/properties";
import { DEFAULT_FILTERS, countActiveFilters } from "@/lib/search";
import type { FilterState, PropertyType, Furnishing, ListerType } from "@/types";

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onReset: () => void;
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
        active
          ? "border-teal-600 bg-teal-50 text-teal-800"
          : "border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:bg-teal-50/50"
      }`}
    >
      {active && <Check className="h-3 w-3" />}
      {label}
    </button>
  );
}

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

export function FilterPanel({ filters, onChange, onReset }: Props) {
  const activeCount = countActiveFilters(filters);
  const set = <K extends keyof FilterState>(k: K, v: FilterState[K]) =>
    onChange({ ...filters, [k]: v });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-teal-700" />
          <h3 className="text-sm font-semibold text-slate-900">Filters</h3>
          {activeCount > 0 && (
            <Badge className="border-0 bg-teal-700 text-xs text-white hover:bg-teal-700">
              {activeCount}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-slate-500 hover:bg-slate-100 hover:text-slate-800"
        >
          <X className="mr-1 h-3.5 w-3.5" />
          Reset
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-14rem)]">
        <div className="space-y-5 p-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Budget
            </p>
            <Slider
              value={[filters.priceMin, filters.priceMax]}
              min={0}
              max={200000000}
              step={500000}
              onValueChange={(v) => {
                const values = typeof v === "number" ? [v, v] : v;
                onChange({ ...filters, priceMin: values[0], priceMax: values[1] });
              }}
              className="py-2"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
              <span className="rounded-md bg-slate-100 px-2 py-1 font-medium">
                {formatPrice(filters.priceMin)}
              </span>
              <span className="rounded-md bg-slate-100 px-2 py-1 font-medium">
                {formatPrice(filters.priceMax)}
              </span>
            </div>
          </div>

          <Separator />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              City
            </p>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  active={filters.cities.includes(c)}
                  onClick={() => set("cities", toggle(filters.cities, c))}
                />
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Property type
            </p>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TYPES.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  active={filters.types.includes(t)}
                  onClick={() => set("types", toggle<PropertyType>(filters.types, t))}
                />
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Bedrooms
            </p>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((b) => (
                <Chip
                  key={b}
                  label={`${b}+ BHK`}
                  active={filters.beds.includes(b)}
                  onClick={() => set("beds", toggle(filters.beds, b))}
                />
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Furnishing
            </p>
            <div className="flex flex-wrap gap-2">
              {FURNISHINGS.map((f) => (
                <Chip
                  key={f}
                  label={f}
                  active={filters.furnishing.includes(f)}
                  onClick={() => set("furnishing", toggle<Furnishing>(filters.furnishing, f))}
                />
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Listed by
            </p>
            <div className="flex flex-wrap gap-2">
              {LISTER_TYPES.map((l) => (
                <Chip
                  key={l}
                  label={l}
                  active={filters.listerType.includes(l)}
                  onClick={() => set("listerType", toggle<ListerType>(filters.listerType, l))}
                />
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Amenities
            </p>
            <div className="flex flex-wrap gap-2">
              {ALL_AMENITIES.slice(0, 12).map((a) => (
                <Chip
                  key={a}
                  label={a}
                  active={filters.amenities.includes(a)}
                  onClick={() => set("amenities", toggle(filters.amenities, a))}
                />
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div>
              <p className="text-sm font-medium text-slate-900">Verified only</p>
              <p className="text-xs text-slate-500">Show verified listings</p>
            </div>
            <Switch
              checked={filters.verifiedOnly}
              onCheckedChange={(v) => set("verifiedOnly", v)}
              className="data-[state=checked]:bg-teal-700"
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export { DEFAULT_FILTERS };
