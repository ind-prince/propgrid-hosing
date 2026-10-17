import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, MapPin, IndianRupee } from "lucide-react";

const priceTrend = [
  { year: "2019", mumbai: 180, delhi: 120, bengaluru: 95 },
  { year: "2020", mumbai: 175, delhi: 118, bengaluru: 92 },
  { year: "2021", mumbai: 190, delhi: 128, bengaluru: 105 },
  { year: "2022", mumbai: 210, delhi: 142, bengaluru: 122 },
  { year: "2023", mumbai: 232, delhi: 158, bengaluru: 138 },
  { year: "2024", mumbai: 255, delhi: 172, bengaluru: 152 },
];

const rentals = [
  { city: "Mumbai", rent: 78000 },
  { city: "Delhi NCR", rent: 66000 },
  { city: "Bengaluru", rent: 62000 },
  { city: "Pune", rent: 42000 },
  { city: "Hyderabad", rent: 38000 },
  { city: "Chennai", rent: 34000 },
];

const hotspots = [
  { name: "Golf Course Road, Delhi NCR", change: 12.4, up: true },
  { name: "Powai, Mumbai", change: 9.1, up: true },
  { name: "Whitefield, Bengaluru", change: 7.8, up: true },
  { name: "Sohna Road, Delhi NCR", change: 6.2, up: true },
  { name: "Adyar, Chennai", change: -1.4, up: false },
];

export function Insights() {
  return (
    <div className="mt-6 space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-slate-900">
          Market insights
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Price trends, rental yields and the localities buyers are watching
          right now.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-slate-200 bg-white shadow-sm lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-teal-700" />
              Price index (₹ per sqft, indexed)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #e2e8f0",
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mumbai"
                    stroke="#0f766e"
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="delhi"
                    stroke="#c2410c"
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="bengaluru"
                    stroke="#4338ca"
                    strokeWidth={2.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full bg-teal-700" /> Mumbai
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full bg-orange-700" /> Delhi
                NCR
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-700" />{" "}
                Bengaluru
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4 text-teal-700" />
              Hot localities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {hotspots.map((h) => (
              <div
                key={h.name}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
              >
                <span className="text-sm font-medium text-slate-800">
                  {h.name}
                </span>
                <span
                  className={`flex shrink-0 items-center gap-1 text-sm font-semibold ${
                    h.up ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {h.up ? (
                    <TrendingUp className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5" />
                  )}
                  {h.change}%
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <IndianRupee className="h-4 w-4 text-teal-700" />
            Average monthly rent by city
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rentals}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="city" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    fontSize: 12,
                  }}
                  formatter={(v) => `₹${Number(v ?? 0).toLocaleString("en-IN")}`}
                />
                <Bar dataKey="rent" fill="#0f766e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Avg. price growth (YoY)", value: "8.4%", tone: "emerald" },
          { label: "Avg. rental yield", value: "3.2%", tone: "teal" },
          { label: "New launches this quarter", value: "1,240", tone: "amber" },
        ].map((s) => (
          <Card key={s.label} className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5">
              <Badge className="mb-2 border-0 bg-teal-50 text-teal-800 hover:bg-teal-50">
                {s.label}
              </Badge>
              <p className="text-3xl font-bold text-slate-900">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
