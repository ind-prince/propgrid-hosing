import { useState } from "react";
import { CalendarClock, Send, CheckCircle2 } from "lucide-react";
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
import { formatListingPrice } from "@/data/properties";
import type { LeadPayload, Property } from "@/types";

interface Props {
  property: Property | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSubmit: (lead: LeadPayload) => void;
}

const SLOTS = ["10:00 AM", "12:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"];

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  message: "",
  tourDate: "",
  tourSlot: "",
};

export function LeadDialog({ property, open, onOpenChange, onSubmit }: Props) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof EMPTY, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.tourDate) e.tourDate = "Pick a date";
    if (!form.tourSlot) e.tourSlot = "Pick a slot";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!property || !validate()) return;
    onSubmit({ propertyId: property.id, ...form });
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setForm(EMPTY);
      onOpenChange(false);
    }, 1200);
  };

  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-slate-200 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            Contact agent / Schedule tour
          </DialogTitle>
          <DialogDescription>
            {property.title} · {formatListingPrice(property)}
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
            <p className="text-lg font-semibold text-slate-900">Request sent!</p>
            <p className="text-sm text-slate-500">
              {property.agent.name} will reach out shortly.
            </p>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="mb-1.5 block text-xs font-medium text-slate-500">Full name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Your name"
                  className="border-slate-200 focus-visible:ring-teal-600"
                />
                {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
              </div>
              <div>
                <Label className="mb-1.5 block text-xs font-medium text-slate-500">Phone</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+91 90000 00000"
                  className="border-slate-200 focus-visible:ring-teal-600"
                />
                {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <Label className="mb-1.5 block text-xs font-medium text-slate-500">Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@example.com"
                className="border-slate-200 focus-visible:ring-teal-600"
              />
              {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="mb-1.5 block text-xs font-medium text-slate-500">Tour date</Label>
                <Input
                  type="date"
                  value={form.tourDate}
                  onChange={(e) => set("tourDate", e.target.value)}
                  className="border-slate-200 focus-visible:ring-teal-600"
                />
                {errors.tourDate && <p className="mt-1 text-xs text-rose-600">{errors.tourDate}</p>}
              </div>
              <div>
                <Label className="mb-1.5 block text-xs font-medium text-slate-500">Time slot</Label>
                <Select value={form.tourSlot} onValueChange={(v) => v !== null && set("tourSlot", v)}>
                  <SelectTrigger className="border-slate-200 focus:ring-teal-600">
                    <SelectValue placeholder="Choose a slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {SLOTS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.tourSlot && <p className="mt-1 text-xs text-rose-600">{errors.tourSlot}</p>}
              </div>
            </div>

            <div>
              <Label className="mb-1.5 block text-xs font-medium text-slate-500">
                Message (optional)
              </Label>
              <Textarea
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder="I'd like to know more about this property…"
                className="border-slate-200 focus-visible:ring-teal-600"
                rows={3}
              />
            </div>

            <Button
              onClick={submit}
              className="w-full bg-teal-700 text-white hover:bg-teal-800"
            >
              <Send className="mr-2 h-4 w-4" />
              Send request
            </Button>
            <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <CalendarClock className="h-3.5 w-3.5" />
              Agent typically responds within 2 hours
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
