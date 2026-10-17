import { MapPin, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatListingPrice } from "@/data/properties";
import type { Property } from "@/types";

interface Props {
  properties: Property[];
  active: Property | null;
  onHover: (p: Property | null) => void;
  onOpen: (p: Property) => void;
}

export function MapView({ properties, active, onHover, onOpen }: Props) {
  const lats = properties.map((p) => p.geo.lat);
  const lngs = properties.map((p) => p.geo.lng);
  const minLat = Math.min(...lats, 0);
  const maxLat = Math.max(...lats, 1);
  const minLng = Math.min(...lngs, 0);
  const maxLng = Math.max(...lngs, 1);

  const pos = (p: Property) => ({
    left: `${((p.geo.lng - minLng) / (maxLng - minLng || 1)) * 82 + 9}%`,
    top: `${(1 - (p.geo.lat - minLat) / (maxLat - minLat || 1)) * 76 + 12}%`,
  });

  return (
    <div className="relative h-full min-h-96 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 via-teal-50 to-emerald-50 shadow-sm">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 shadow-sm backdrop-blur">
        <Navigation className="h-4 w-4 text-teal-700" />
        <span className="text-xs font-semibold text-slate-700">
          {properties.length} listings on map
        </span>
      </div>

      {properties.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-sm text-slate-500">No pins to display</p>
        </div>
      )}

      {properties.map((p) => {
        const isActive = active?.id === p.id;
        return (
          <button
            key={p.id}
            onMouseEnter={() => onHover(p)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onOpen(p)}
            style={pos(p)}
            className="absolute -translate-x-1/2 -translate-y-full transition-transform duration-200 hover:z-30 hover:scale-110"
          >
            <span
              className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold shadow-md transition ${
                isActive
                  ? "border-teal-700 bg-teal-700 text-white"
                  : "border-slate-200 bg-white text-slate-800"
              }`}
            >
              <MapPin className={`h-3 w-3 ${isActive ? "text-white" : "text-teal-700"}`} />
              {formatListingPrice(p)}
            </span>
            <span
              className={`mx-auto block h-2 w-2 rotate-45 ${
                isActive ? "bg-teal-700" : "bg-white"
              }`}
            />
          </button>
        );
      })}

      {active && (
        <div className="absolute bottom-4 left-4 right-4 z-20 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
          <div className="flex items-center gap-3">
            <div className={`h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br ${active.gradient}`} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">{active.title}</p>
              <p className="truncate text-xs text-slate-500">
                {active.locality}, {active.city}
              </p>
            </div>
            <Badge className="shrink-0 border-0 bg-teal-50 text-teal-800 hover:bg-teal-50">
              {formatListingPrice(active)}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
}