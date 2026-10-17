import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AGENTS } from "@/data/agents";
import { CITIES, PROPERTY_TYPES } from "@/data/properties";
import type { ListingKind, Property, PropertyType, Furnishing } from "@/types";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onAdd: (p: Property) => void;
}

const GRADIENTS = [
  "from-teal-500 to-emerald-700",
  "from-amber-500 to-orange-700",
  "from-indigo-500 to-violet-700",
  "from-rose-500 to-pink-700",
];

export function PostPropertyDialog({ open, onOpenChange, onAdd }: Props) {
  const [form, setForm] = useState({
    title: "",
    kind: "buy" as ListingKind,
    type: "Apartment" as PropertyType,
    city: CITIES[0],
    locality: "",
    price: "",
    beds: "2",
    baths: "2",
    area: "",
    furnishing: "Semi-Furnished" as Furnishing,
    description: "",
  });
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.title.trim() || !form.locality.trim() || !form.price || !form.area) {
      setError("Please fill in title, locality, price and area.");
      return;
    }
    const price = Number(form.price);
    const area = Number(form.area);
    const property: Property = {
      id: `user-${Date.now()}`,
      title: form.title,
      kind: form.kind,
      type: form.type,
      city: form.city,
      locality: form.locality,
      address: `${form.locality}, ${form.city}`,
      price,
      pricePerSqft: Math.round(price / area),
      beds: Number(form.beds),
      baths: Number(form.baths),
      area,
      furnishing: form.furnishing,
      listerType: "Owner",
      verified: false,
      rera: false,
      rating: 4.5,
      reviews: 0,
      postedDaysAgo: 0,
      popularity: 999,
      amenities: ["Covered Parking", "24x7 Security", "Lift"],
      tags: ["Just Listed"],
      images: ["0", "1", "2", "3"],
      gradient: GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)],
      geo: { lat: 19.076 + Math.random() * 2, lng: 72.877 + Math.random() * 2 },
      pricing: {
        base: price,
        maintenanceMonthly: form.kind === "rent" ? 0 : Math.round(area * 3.5),
        registration: form.kind === "rent" ? 0 : Math.round(price * 0.01),
        stampDuty: form.kind === "rent" ? 0 : Math.round(price * 0.05),
        parking: form.kind === "rent" ? 2500 : 350000,
      },
      agent: AGENTS[0],
      description: form.description || "A newly listed property on propgrid.",
    };
    onAdd(property);
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setError("");
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-slate-200 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Post your property</DialogTitle>
          <DialogDescription>List your home in under a minute.</DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
            <p className="text-lg font-semibold text-slate-900">Listing published!</p>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div>
              <Label className="mb-1.5 block text-xs font-medium text-slate-500">
                Listing title
              </Label>
              <Input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. Spacious 3BHK in Bandra West"
                className="border-slate-200 focus-visible:ring-teal-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-1.5 block text-xs font-medium text-slate-500">
                  Purpose
                </Label>
                <Select value={form.kind} onValueChange={(v) => v !== null && set("kind", v)}>
                  <SelectTrigger className="border-slate-200 focus:ring-teal-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                    <SelectItem value="new-launch">New Launch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block text-xs font-medium text-slate-500">Type</Label>
                <Select value={form.type} onValueChange={(v) => v !== null && set("type", v)}>
                  <SelectTrigger className="border-slate-200 focus:ring-teal-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROPERTY_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-1.5 block text-xs font-medium text-slate-500">City</Label>
                <Select value={form.city} onValueChange={(v) => v !== null && set("city", v)}>
                  <SelectTrigger className="border-slate-200 focus:ring-teal-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CITIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block text-xs font-medium text-slate-500">
                  Locality
                </Label>
                <Input
                  value={form.locality}
                  onChange={(e) => set("locality", e.target.value)}
                  placeholder="e.g. Powai"
                  className="border-slate-200 focus-visible:ring-teal-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="mb-1.5 block text-xs font-medium text-slate-500">
                  Price (₹)
                </Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  placeholder="5000000"
                  className="border-slate-200 focus-visible:ring-teal-600"
                />
              </div>
              <div>
                <Label className="mb-1.5 block text-xs font-medium text-slate-500">
                  Area (sqft)
                </Label>
                <Input
                  type="number"
                  value={form.area}
                  onChange={(e) => set("area", e.target.value)}
                  placeholder="1200"
                  className="border-slate-200 focus-visible:ring-teal-600"
                />
              </div>
              <div>
                <Label className="mb-1.5 block text-xs font-medium text-slate-500">
                  Furnishing
                </Label>
                <Select value={form.furnishing} onValueChange={(v) => v !== null && set("furnishing", v)}>
                  <SelectTrigger className="border-slate-200 focus:ring-teal-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Furnished">Furnished</SelectItem>
                    <SelectItem value="Semi-Furnished">Semi-Furnished</SelectItem>
                    <SelectItem value="Unfurnished">Unfurnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-1.5 block text-xs font-medium text-slate-500">
                  Bedrooms
                </Label>
                <Input
                  type="number"
                  value={form.beds}
                  onChange={(e) => set("beds", e.target.value)}
                  className="border-slate-200 focus-visible:ring-teal-600"
                />
              </div>
              <div>
                <Label className="mb-1.5 block text-xs font-medium text-slate-500">
                  Bathrooms
                </Label>
                <Input
                  type="number"
                  value={form.baths}
                  onChange={(e) => set("baths", e.target.value)}
                  className="border-slate-200 focus-visible:ring-teal-600"
                />
              </div>
            </div>

            <div>
              <Label className="mb-1.5 block text-xs font-medium text-slate-500">
                Description (optional)
              </Label>
              <Textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Tell buyers what makes this home special…"
                className="border-slate-200 focus-visible:ring-teal-600"
                rows={3}
              />
            </div>

            {error && <p className="text-xs text-rose-600">{error}</p>}

            <Button
              onClick={submit}
              className="w-full bg-teal-700 text-white hover:bg-teal-800"
            >
              Publish listing
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
