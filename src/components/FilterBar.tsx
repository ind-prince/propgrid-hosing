import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Filters } from "@/data/properties";

interface Props {
  filters: Filters;
  cities: string[];
  onChange: (f: Filters) => void;
  onReset: () => void;
}

const BUDGETS = [
  { v: "5000000", l: "Under ₹50 L" },
  { v: "10000000", l: "Under ₹1 Cr" },
  { v: "20000000", l: "Under ₹2 Cr" },
  { v: "50000000", l: "Under ₹5 Cr" },
  { v: "100000000", l: "Under ₹10 Cr" },
];

export function FilterBar({ filters, cities, onChange, onReset }: Props) {
  const set = (k: keyof Filters, v: string) => onChange({ ...filters, [k]: v });

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={filters.query}
            onChange={(e) => set("query", e.target.value)}
            placeholder="Search by locality, project or city…"
            className="border-slate-200 pl-9 focus-visible:ring-teal-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-auto">
          <Select value={filters.city} onValueChange={(v) => v !== null && set("city", v)}>
            <SelectTrigger className="border-slate-200 focus:ring-teal-600">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All cities</SelectItem>
              {cities.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.type} onValueChange={(v) => v !== null && set("type", v)}>
            <SelectTrigger className="border-slate-200 focus:ring-teal-600">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="Villa">Villa</SelectItem>
              <SelectItem value="Studio">Studio</SelectItem>
              <SelectItem value="Plot">Plot</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.beds} onValueChange={(v) => v !== null && set("beds", v)}>
            <SelectTrigger className="border-slate-200 focus:ring-teal-600">
              <SelectValue placeholder="Beds" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any beds</SelectItem>
              <SelectItem value="1">1+ BHK</SelectItem>
              <SelectItem value="2">2+ BHK</SelectItem>
              <SelectItem value="3">3+ BHK</SelectItem>
              <SelectItem value="4">4+ BHK</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.budget} onValueChange={(v) => v !== null && set("budget", v)}>
            <SelectTrigger className="border-slate-200 focus:ring-teal-600">
              <SelectValue placeholder="Budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any budget</SelectItem>
              {BUDGETS.map((b) => (
                <SelectItem key={b.v} value={b.v}>
                  {b.l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Sort
        </span>
        <Select value={filters.sort} onValueChange={(v) => v !== null && set("sort", v)}>
          <SelectTrigger className="h-8 w-44 border-slate-200 text-xs focus:ring-teal-600">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Top rated</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="ml-auto text-slate-500 hover:bg-slate-100 hover:text-slate-800"
        >
          <X className="mr-1.5 h-3.5 w-3.5" />
          Clear all
        </Button>
      </div>
    </section>
  );
}
