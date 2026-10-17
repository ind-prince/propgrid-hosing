import { memo } from "react";
import { BedDouble, Bath, Ruler, Star, MapPin, Heart, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatListingPrice } from "@/data/properties";
import type { Property } from "@/types";

interface Props {
  property: Property;
  saved: boolean;
  active?: boolean;
  onToggleSave: (id: string) => void;
  onOpen: (p: Property) => void;
  onHover?: (p: Property | null) => void;
}

function PropertyCardBase({ property, saved, active, onToggleSave, onOpen, onHover }: Props) {
  return (
    <Card
      onMouseEnter={() => onHover?.(property)}
      onMouseLeave={() => onHover?.(null)}
      className={`group overflow-hidden border bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        active ? "border-teal-500 ring-2 ring-teal-500/30" : "border-slate-200"
      }`}
    >
      <div
        className={`relative h-44 cursor-pointer bg-gradient-to-br ${property.gradient}`}
        onClick={() => onOpen(property)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {property.verified && (
            <Badge className="border-0 bg-emerald-600 text-xs text-white hover:bg-emerald-600">
              <BadgeCheck className="mr-1 h-3 w-3" /> Verified
            </Badge>
          )}
          {property.tags.slice(0, 1).map((t) => (
            <Badge key={t} className="border-0 bg-white/90 text-xs text-slate-800 backdrop-blur hover:bg-white">
              {t}
            </Badge>
          ))}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(property.id);
          }}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:scale-110 hover:bg-white"
          aria-label={saved ? "Remove from saved" : "Save property"}
        >
          <Heart className={`h-4 w-4 ${saved ? "fill-rose-500 text-rose-500" : "text-slate-600"}`} />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-xs font-semibold text-slate-800 backdrop-blur">
          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
          {property.rating}
          <span className="font-normal text-slate-500">({property.reviews})</span>
        </div>
        <Badge className="absolute bottom-3 right-3 border-0 bg-slate-900/80 text-xs text-white backdrop-blur hover:bg-slate-900/80">
          {property.listerType}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="line-clamp-2 cursor-pointer text-sm font-semibold leading-snug text-slate-900 transition group-hover:text-teal-800"
            onClick={() => onOpen(property)}
          >
            {property.title}
          </h3>
          <Badge className="shrink-0 border-0 bg-slate-100 text-xs text-slate-600 hover:bg-slate-100">
            {property.type}
          </Badge>
        </div>

        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
          <MapPin className="h-3 w-3" />
          {property.locality}, {property.city}
        </p>

        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-lg font-bold text-teal-800">{formatListingPrice(property)}</p>
          <span className="text-xs text-slate-400">₹{property.pricePerSqft.toLocaleString("en-IN")}/sqft</span>
        </div>

        <div className="mt-3 flex items-center gap-4 border-t border-slate-100 pt-3 text-xs text-slate-600">
          {property.beds > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5 text-slate-400" />
              {property.beds} Beds
            </span>
          )}
          {property.baths > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5 text-slate-400" />
              {property.baths} Baths
            </span>
          )}
          <span className="flex items-center gap-1">
            <Ruler className="h-3.5 w-3.5 text-slate-400" />
            {property.area} sqft
          </span>
        </div>

        <Button
          onClick={() => onOpen(property)}
          className="mt-3 w-full bg-slate-900 text-white transition hover:bg-teal-800"
        >
          View details
        </Button>
      </CardContent>
    </Card>
  );
}

export const PropertyCard = memo(PropertyCardBase);