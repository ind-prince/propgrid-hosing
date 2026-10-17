import { Heart, Building2, Inbox, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatListingPrice } from "@/data/properties";
import type { Lead, Property } from "@/types";

export type DrawerMode = "saved" | "listed" | "leads";

interface Props {
  open: boolean;
  mode: DrawerMode;
  onOpenChange: (o: boolean) => void;
  savedProperties: Property[];
  listedProperties: Property[];
  leads: Lead[];
  onOpenProperty: (p: Property) => void;
  onToggleSave: (id: string) => void;
}

const TITLES: Record<DrawerMode, { title: string; desc: string }> = {
  saved: { title: "Saved properties", desc: "Your shortlisted homes" },
  listed: { title: "My listings", desc: "Properties you've posted" },
  leads: { title: "My enquiries", desc: "Tour requests you've sent" },
};

export function AccountDrawer({
  open,
  mode,
  onOpenChange,
  savedProperties,
  listedProperties,
  leads,
  onOpenProperty,
  onToggleSave,
}: Props) {
  const list = mode === "saved" ? savedProperties : listedProperties;
  const meta = TITLES[mode];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto border-slate-200 sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl">{meta.title}</SheetTitle>
          <SheetDescription>{meta.desc}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-3">
          {mode === "leads" ? (
            leads.length === 0 ? (
              <EmptyState icon={Inbox} text="No enquiries yet" />
            ) : (
              leads.map((l) => (
                <div key={l.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{l.name}</p>
                    <Badge className="border-0 bg-amber-50 text-xs text-amber-700 hover:bg-amber-50">
                      {l.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {l.tourDate} · {l.tourSlot}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {l.email} · {l.phone}
                  </p>
                  {l.message && (
                    <p className="mt-2 rounded-lg bg-slate-50 p-2 text-xs text-slate-600">{l.message}</p>
                  )}
                </div>
              ))
            )
          ) : list.length === 0 ? (
            <EmptyState
              icon={mode === "saved" ? Heart : Building2}
              text={mode === "saved" ? "No saved properties yet" : "You haven't posted any listings"}
            />
          ) : (
            list.map((p) => (
              <div
                key={p.id}
                className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md"
              >
                <div className={`h-16 w-16 shrink-0 rounded-lg bg-gradient-to-br ${p.gradient}`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">{p.title}</p>
                  <p className="flex items-center gap-1 truncate text-xs text-slate-500">
                    <MapPin className="h-3 w-3" />
                    {p.locality}, {p.city}
                  </p>
                  <p className="mt-1 text-sm font-bold text-teal-800">{formatListingPrice(p)}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-200 text-xs"
                    onClick={() => onOpenProperty(p)}
                  >
                    View
                  </Button>
                  {mode === "saved" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs text-rose-600 hover:bg-rose-50"
                      onClick={() => onToggleSave(p.id)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function EmptyState({ icon: Icon, text }: { icon: typeof Heart; text: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
        <Icon className="h-5 w-5" />
      </span>
      <p className="text-sm text-slate-500">{text}</p>
    </div>
  );
}