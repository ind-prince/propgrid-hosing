import { Globe, Send, Camera, Rss, Mail, Phone } from "lucide-react";

const COLUMNS = [
  {
    title: "Buy",
    links: ["Apartments", "Villas", "Plots", "New launches", "Ready to move"],
  },
  {
    title: "Rent",
    links: ["Furnished homes", "Family rentals", "Bachelor pads", "PG & hostels"],
  },
  {
    title: "Cities",
    links: ["Mumbai", "Delhi NCR", "Bengaluru", "Pune", "Hyderabad", "Chennai"],
  },
  {
    title: "Company",
    links: ["About us", "Careers", "Press", "Contact", "Privacy policy"],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-700 to-emerald-600 text-sm font-bold text-white shadow-sm">
                h
              </span>
              <span className="font-serif text-lg font-bold tracking-tight text-slate-900">
                prop<span className="text-teal-700">grid</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              India's most trusted property discovery platform. Verified
              listings, transparent pricing, zero surprises.
            </p>
            <div className="mt-4 flex gap-2">
              {[Globe, Send, Camera, Rss].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-slate-900">
                {col.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 transition hover:text-teal-700"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-5 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-teal-600" />
              1800 41 99099
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-teal-600" />
              care@propgrid.com
            </span>
          </div>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} propgrid — a demo project. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}