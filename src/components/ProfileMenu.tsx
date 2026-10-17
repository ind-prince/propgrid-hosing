import { useEffect, useRef, useState } from "react";
import { Heart, Building2, LogOut, Settings, User, Inbox } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Props {
  savedCount: number;
  listedCount: number;
  leadsCount: number;
  onViewSaved: () => void;
  onViewListed: () => void;
  onViewLeads: () => void;
  onEditProfile: () => void;
  onPreferences: () => void;
  onSignOut: () => void;
}

export function ProfileMenu({
  savedCount,
  listedCount,
  leadsCount,
  onViewSaved,
  onViewListed,
  onViewLeads,
  onEditProfile,
  onPreferences,
  onSignOut,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const item =
    "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100";

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  const count = (n: number) => (
    <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-semibold text-slate-600">
      {n}
    </span>
  );

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="rounded-full ring-teal-600 transition hover:ring-2 focus:outline-none focus-visible:ring-2"
      >
        <Avatar className="h-9 w-9 border border-slate-200">
          <AvatarFallback className="bg-amber-100 text-xs font-semibold text-amber-800">
            YO
          </AvatarFallback>
        </Avatar>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg"
        >
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <Avatar className="h-10 w-10 border border-slate-200">
              <AvatarFallback className="bg-teal-100 text-sm font-semibold text-teal-800">
                YO
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">Your Account</p>
              <p className="truncate text-xs text-slate-500">you@propgrid.in</p>
            </div>
          </div>

          <div className="my-1 h-px bg-slate-100" />

          <button role="menuitem" className={`${item} justify-between`} onClick={() => run(onViewSaved)}>
            <span className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-500" />
              Saved properties
            </span>
            {count(savedCount)}
          </button>
          <button role="menuitem" className={`${item} justify-between`} onClick={() => run(onViewListed)}>
            <span className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-teal-600" />
              My listings
            </span>
            {count(listedCount)}
          </button>
          <button role="menuitem" className={`${item} justify-between`} onClick={() => run(onViewLeads)}>
            <span className="flex items-center gap-2">
              <Inbox className="h-4 w-4 text-amber-600" />
              My enquiries
            </span>
            {count(leadsCount)}
          </button>

          <div className="my-1 h-px bg-slate-100" />

          <button role="menuitem" className={item} onClick={() => run(onEditProfile)}>
            <User className="h-4 w-4 text-slate-500" />
            Edit profile
          </button>
          <button role="menuitem" className={item} onClick={() => run(onPreferences)}>
            <Settings className="h-4 w-4 text-slate-500" />
            Preferences
          </button>

          <div className="my-1 h-px bg-slate-100" />

          <button
            role="menuitem"
            className={`${item} text-rose-600 hover:bg-rose-50`}
            onClick={() => run(onSignOut)}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}