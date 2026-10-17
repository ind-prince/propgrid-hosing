import { useState } from "react";
import {
  X,
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Star,
  BadgeCheck,
  Phone,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatListingPrice, formatPrice } from "@/data/properties";
import type { Property } from "@/types";

interface Props {
  property: Property | null;
  saved: boolean;
  onToggleSave: (id: string) => void;
  onClose: () => void;
  onContact: (p: Property) => void;
}

export function PropertyDetail({ property, saved, onToggleSave, onClose, onContact }: Props) {
  const [imgIndex, setImgIndex] = useState(0);

  if (!property) return null;
  const isRent = property.kind === "rent";

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm">
      <button className="flex-1 cursor-default" onClick={onClose} aria-label="Close" />
      <div className="flex h-full w-full max-w-2xl flex-col overflow-y-auto bg-white shadow-2xl">
        <div className={`relative h-72 shrink-0 bg-gradient-to-br ${property.gradient}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 backdrop-blur transition hover:bg-white"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={() => onToggleSave(property.id)}
            className="absolute right-16 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:bg-white"
          >
            <Heart className={`h-5 w-5 ${saved ? "fill-rose-500 text-rose-500" : "text-slate-700"}`} />
          </button>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <button
              onClick={() => setImgIndex((i) => Math.max(0, i - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 backdrop-blur transition hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {property.images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === imgIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setImgIndex((i) => Math.min(property.images.length - 1, i + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 backdrop-blur transition hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="flex flex-wrap items-center gap-2">
            {property.verified && (
              <Badge className="border-0 bg-emerald-600 text-xs text-white hover:bg-emerald-600">
                <BadgeCheck className="mr-1 h-3 w-3" /> Verified
              </Badge>
            )}
            {property.rera && (
              <Badge className="border-0 bg-indigo-600 text-xs text-white hover:bg-indigo-600">
                RERA
              </Badge>
            )}
            <Badge className="border-0 bg-slate-100 text-xs text-slate-700 hover:bg-slate-100">
              {property.listerType}
            </Badge>
            <Badge className="border-0 bg-slate-100 text-xs text-slate-700 hover:bg-slate-100">
              {property.furnishing}
            </Badge>
          </div>

          <h2 className="mt-3 font-serif text-2xl font-bold text-slate-900">{property.title}</h2>
          <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="h-4 w-4" />
            {property.address}
          </p>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-teal-800">
              {formatListingPrice(property)}
            </span>
            <span className="text-sm text-slate-400">
              ₹{property.pricePerSqft.toLocaleString("en-IN")}/sqft
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { icon: BedDouble, label: "Bedrooms", value: property.beds || "—" },
              { icon: Bath, label: "Bathrooms", value: property.baths || "—" },
              { icon: Ruler, label: "Area", value: `${property.area} sqft` },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                <s.icon className="mx-auto h-4 w-4 text-teal-700" />
                <p className="mt-1 text-sm font-bold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-semibold text-slate-900">About this property</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{property.description}</p>
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-semibold text-slate-900">Amenities</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {property.amenities.map((a) => (
                <span
                  key={a}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600"
                >
                  <Check className="h-3 w-3 text-teal-600" />
                  {a}
                </span>
              ))}
            </div>
          </div>

          <Separator className="my-5" />

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              {isRent ? "Rent breakdown" : "Price breakdown"}
            </h3>
            <div className="mt-2 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">{isRent ? "Monthly rent" : "Base price"}</span>
                <span className="font-medium text-slate-900">{formatPrice(property.pricing.base)}</span>
              </div>
              {!isRent && (
                <>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Stamp duty (5%)</span>
                    <span className="font-medium text-slate-900">{formatPrice(property.pricing.stampDuty)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Registration (1%)</span>
                    <span className="font-medium text-slate-900">{formatPrice(property.pricing.registration)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Maintenance / mo</span>
                    <span className="font-medium text-slate-900">{formatPrice(property.pricing.maintenanceMonthly)}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">{isRent ? "Security deposit" : "Parking"}</span>
                <span className="font-medium text-slate-900">{formatPrice(property.pricing.parking)}</span>
              </div>
            </div>
          </div>

          <Separator className="my-5" />

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border border-slate-200">
                <AvatarFallback className="bg-teal-100 text-sm font-semibold text-teal-800">
                  {property.agent.avatarInitials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                  {property.agent.name}
                  {property.agent.verified && <BadgeCheck className="h-4 w-4 text-emerald-600" />}
                </p>
                <p className="text-xs text-slate-500">{property.agent.agency}</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  {property.agent.rating} · {property.agent.dealsClosed} deals closed
                </p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
              <Button
                onClick={() => onContact(property)}
                className="flex-1 bg-teal-700 text-white hover:bg-teal-800"
              >
                <CalendarClock className="mr-2 h-4 w-4" />
                Schedule tour
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}