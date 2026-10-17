import { useMemo, useState } from "react";
import { Header, type Tab } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyDetail } from "@/components/PropertyDetail";
import { LeadDialog } from "@/components/LeadDialog";
import { Insights } from "@/components/Insights";
import { PostPropertyDialog } from "@/components/PostPropertyDialog";
import { AccountDrawer } from "@/components/AccountDrawer";
import { Footer } from "@/components/Footer";
import {
  EditProfileDialog,
  PreferencesDialog,
  type Profile,
} from "@/components/ProfileDialogs";
import {
  properties as seedProperties,
  formatPrice,
  formatRent,
  type Property,
  type Filters,
} from "@/data/properties";
import type { Lead } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Home, MapPin, TrendingUp } from "lucide-react";

const initialFilters: Filters = {
  query: "",
  city: "all",
  type: "all",
  budget: "all",
  beds: "all",
  sort: "relevance",
};

const TAB_COPY: Record<
  Exclude<Tab, "insights">,
  { title: string; subtitle: string; badge: string }
> = {
  buy: {
    badge: "Trusted by 2.4M home seekers",
    title: "Find a home that fits your life, not just your budget.",
    subtitle:
      "Verified listings across Mumbai, Bengaluru, Delhi NCR and more — with transparent pricing and locality insights.",
  },
  rent: {
    badge: "12,400+ rentals available today",
    title: "Rentals that are ready before you are.",
    subtitle:
      "Furnished and semi-furnished homes with verified owners, zero brokerage options and instant move-in dates.",
  },
  "new-launch": {
    badge: "Pre-launch pricing live",
    title: "Get in early on the next landmark address.",
    subtitle:
      "RERA-registered new launches with floor-rise waivers, flexible payment plans and early-bird pricing.",
  },
};

export default function App() {
  const [tab, setTab] = useState<Tab>("buy");
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [selected, setSelected] = useState<Property | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [userListings, setUserListings] = useState<Property[]>([]);
  const [postOpen, setPostOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"saved" | "listed" | "leads">("saved");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadOpen, setLeadOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [prefOpen, setPrefOpen] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    name: "Your Account",
    email: "you@propgrid",
    phone: "+91 90000 00000",
    city: "Delhi NCR",
  });

  const allProperties = useMemo(
    () => [...userListings, ...seedProperties],
    [userListings]
  );

  const cities = useMemo(
    () => Array.from(new Set(allProperties.map((p) => p.city))).sort(),
    [allProperties]
  );

  const handleTabChange = (t: Tab) => {
    setTab(t);
    setFilters(initialFilters);
    setSelected(null);
  };

  const filtered = useMemo(() => {
    if (tab === "insights") return [];
    let list = allProperties.filter((p) => {
      if (p.kind !== tab) return false;
      const q = filters.query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q);
      const matchesCity = filters.city === "all" || p.city === filters.city;
      const matchesType = filters.type === "all" || p.type === filters.type;
      const matchesBeds =
        filters.beds === "all" || p.beds >= Number(filters.beds);
      const matchesBudget =
        filters.budget === "all" || p.price <= Number(filters.budget);
      return (
        matchesQuery &&
        matchesCity &&
        matchesType &&
        matchesBeds &&
        matchesBudget
      );
    });

    if (filters.sort === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    if (filters.sort === "rating")
      list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [filters, tab, allProperties]);

  const toggleSave = (id: string) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const addListing = (p: Property) => {
    setUserListings((l) => [p, ...l]);
    setTab(p.kind);
    setFilters(initialFilters);
  };

  const openSaved = () => {
    setDrawerMode("saved");
    setDrawerOpen(true);
  };
  const openListed = () => {
    setDrawerMode("listed");
    setDrawerOpen(true);
  };
  const openLeads = () => {
    setDrawerMode("leads");
    setDrawerOpen(true);
  };

  const savedProperties = allProperties.filter((p) => saved.includes(p.id));

  const tabProperties = allProperties.filter((p) =>
    tab === "insights" ? false : p.kind === tab
  );
  const avgPrice = tabProperties.length
    ? Math.round(
        tabProperties.reduce((a, p) => a + p.price, 0) / tabProperties.length
      )
    : 0;

  const stats = [
    { label: "Live listings", value: tabProperties.length, icon: Building2 },
    {
      label: "Cities covered",
      value: new Set(tabProperties.map((p) => p.city)).size,
      icon: MapPin,
    },
    {
      label: tab === "rent" ? "Avg. rent" : "Avg. price",
      value: tab === "rent" ? formatRent(avgPrice) : formatPrice(avgPrice),
      icon: TrendingUp,
    },
    { label: "Saved by you", value: saved.length, icon: Home },
  ];

  const copy = tab === "insights" ? null : TAB_COPY[tab];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header
        activeTab={tab}
        onTabChange={handleTabChange}
        savedCount={saved.length}
        listedCount={userListings.length}
        leadsCount={leads.length}
        onPostProperty={() => setPostOpen(true)}
        onViewSaved={openSaved}
        onViewListed={openListed}
        onViewLeads={openLeads}
        onEditProfile={() => setEditOpen(true)}
        onPreferences={() => setPrefOpen(true)}
        onSignOut={() => {
          setSaved([]);
          setUserListings([]);
          setLeads([]);
          setTab("buy");
          setFilters(initialFilters);
        }}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        {copy && (
          <section className="relative overflow-hidden rounded-2xl border border-teal-900/10 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-700 p-6 shadow-lg sm:p-10">
            <div className="relative z-10 max-w-2xl">
              <Badge className="mb-4 border-0 bg-white/15 text-teal-50 backdrop-blur hover:bg-white/20">
                {copy.badge}
              </Badge>
              <h1 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
                {copy.title}
              </h1>
              <p className="mt-3 max-w-xl text-sm text-teal-50/80 sm:text-base">
                {copy.subtitle}
              </p>
            </div>
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 right-24 h-56 w-56 rounded-full bg-teal-300/10 blur-3xl" />
          </section>
        )}

        {tab !== "insights" && (
          <>
            <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {stats.map((s) => (
                <Card
                  key={s.label}
                  className="border-slate-200/80 bg-white shadow-sm transition hover:shadow-md"
                >
                  <CardContent className="flex items-center gap-3 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xl font-bold leading-none text-slate-900">
                        {s.value}
                      </p>
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {s.label}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </section>

            <FilterBar
              filters={filters}
              cities={cities}
              onChange={setFilters}
              onReset={() => setFilters(initialFilters)}
            />

            <div className="mt-6 flex items-baseline justify-between">
              <h2 className="font-serif text-xl font-semibold text-slate-900">
                {filtered.length} propert
                {filtered.length === 1 ? "y" : "ies"} found
              </h2>
              <p className="text-sm text-slate-500">
                {filters.city === "all" ? "All cities" : filters.city}
              </p>
            </div>

            {filtered.length === 0 ? (
              <Card className="mt-6 border-dashed border-slate-300 bg-white">
                <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                    <Home className="h-6 w-6" />
                  </span>
                  <p className="text-lg font-semibold text-slate-800">
                    No homes match those filters
                  </p>
                  <p className="max-w-sm text-sm text-slate-500">
                    Try widening your budget or clearing the locality search.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-2 border-teal-200 text-teal-700 hover:bg-teal-50"
                    onClick={() => setFilters(initialFilters)}
                  >
                    Reset filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <PropertyCard
                    key={p.id}
                    property={p}
                    saved={saved.includes(p.id)}
                    onToggleSave={() => toggleSave(p.id)}
                    onOpen={() => setSelected(p)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {tab === "insights" && <Insights />}
      </main>

      <Footer />

      <PropertyDetail
        property={selected}
        saved={selected ? saved.includes(selected.id) : false}
        onToggleSave={() => selected && toggleSave(selected.id)}
        onClose={() => setSelected(null)}
        onContact={() => setLeadOpen(true)}
      />

      <LeadDialog
        property={selected}
        open={leadOpen}
        onOpenChange={setLeadOpen}
        onSubmit={(lead) =>
          setLeads((items) => [
            { ...lead, id: `lead-${Date.now()}`, createdAt: Date.now(), status: "new" },
            ...items,
          ])
        }
      />

      <PostPropertyDialog
        open={postOpen}
        onOpenChange={setPostOpen}
        onAdd={addListing}
      />

      <AccountDrawer
        open={drawerOpen}
        mode={drawerMode}
        onOpenChange={setDrawerOpen}
        savedProperties={savedProperties}
        listedProperties={userListings}
        leads={leads}
        onOpenProperty={(p) => {
          setDrawerOpen(false);
          setSelected(p);
        }}
        onToggleSave={toggleSave}
      />

      <EditProfileDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        profile={profile}
        onSave={setProfile}
      />

      <PreferencesDialog open={prefOpen} onOpenChange={setPrefOpen} />
    </div>
  );
}
