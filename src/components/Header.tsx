import { Heart, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileMenu } from "@/components/ProfileMenu";
import type { ListingKind } from "@/types";

export type Tab = ListingKind | "insights";

const TABS: { id: Tab; label: string }[] = [
  { id: "buy", label: "Buy" },
  { id: "rent", label: "Rent" },
  { id: "new-launch", label: "New Launch" },
  { id: "insights", label: "Insights" },
];

interface Props {
  activeTab: Tab;
  onTabChange: (t: Tab) => void;
  savedCount: number;
  listedCount: number;
  leadsCount: number;
  onPostProperty: () => void;
  onViewSaved: () => void;
  onViewListed: () => void;
  onViewLeads: () => void;
  onEditProfile: () => void;
  onPreferences: () => void;
  onSignOut: () => void;
}

export function Header({
  activeTab,
  onTabChange,
  savedCount,
  listedCount,
  leadsCount,
  onPostProperty,
  onViewSaved,
  onViewListed,
  onViewLeads,
  onEditProfile,
  onPreferences,
  onSignOut,
}: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-700 to-emerald-600 text-sm font-bold text-white shadow-sm">
            p
          </span>
          <span className="font-serif text-lg font-bold tracking-tight text-slate-900">
            prop<span className="text-teal-700">grid</span>
          </span>
        </div>

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                activeTab === t.id
                  ? "bg-teal-50 text-teal-800"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative text-slate-600 hover:bg-slate-100">
            <Bell className="h-5 w-5" />
            {leadsCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white">
                {leadsCount}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onViewSaved}
            className="relative text-slate-600 hover:bg-slate-100"
          >
            <Heart className="h-5 w-5" />
            {savedCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                {savedCount}
              </span>
            )}
          </Button>
          <Button
            onClick={onPostProperty}
            className="hidden bg-teal-700 text-white hover:bg-teal-800 sm:inline-flex"
          >
            <Plus className="mr-2 h-4 w-4" />
            Post property
          </Button>
          <ProfileMenu
            savedCount={savedCount}
            listedCount={listedCount}
            leadsCount={leadsCount}
            onViewSaved={onViewSaved}
            onViewListed={onViewListed}
            onViewLeads={onViewLeads}
            onEditProfile={onEditProfile}
            onPreferences={onPreferences}
            onSignOut={onSignOut}
          />
        </div>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 md:hidden">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              activeTab === t.id
                ? "bg-teal-50 text-teal-800"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {t.label}
          </button>
        ))}
        <button
          onClick={onPostProperty}
          className="ml-auto shrink-0 rounded-lg bg-teal-700 px-3 py-1.5 text-sm font-medium text-white"
        >
          Post
        </button>
      </nav>
    </header>
  );
}