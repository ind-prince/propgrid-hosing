import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

export interface Profile {
  name: string;
  email: string;
  phone: string;
  city: string;
}

interface EditProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  profile: Profile;
  onSave: (p: Profile) => void;
}

export function EditProfileDialog({
  open,
  onOpenChange,
  profile,
  onSave,
}: EditProps) {
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  const set = (k: keyof Profile, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    onSave(form);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onOpenChange(false);
    }, 700);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-slate-200 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Edit profile</DialogTitle>
          <DialogDescription>
            Update your contact details. Changes are saved to this session.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label className="mb-1.5 block text-xs font-medium text-slate-500">
              Full name
            </Label>
            <Input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="border-slate-200 focus-visible:ring-teal-600"
            />
          </div>
          <div>
            <Label className="mb-1.5 block text-xs font-medium text-slate-500">
              Email
            </Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className="border-slate-200 focus-visible:ring-teal-600"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1.5 block text-xs font-medium text-slate-500">
                Phone
              </Label>
              <Input
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className="border-slate-200 focus-visible:ring-teal-600"
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-xs font-medium text-slate-500">
                Preferred city
              </Label>
              <Input
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                className="border-slate-200 focus-visible:ring-teal-600"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-200"
          >
            Cancel
          </Button>
          <Button
            onClick={submit}
            className="bg-teal-700 text-white hover:bg-teal-800"
          >
            {saved ? "Saved ✓" : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface PrefProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

const PREFS = [
  { id: "alerts", label: "Price drop alerts", desc: "Notify me when saved homes get cheaper." },
  { id: "newlaunch", label: "New launch alerts", desc: "Early access to pre-launch projects." },
  { id: "whatsapp", label: "WhatsApp updates", desc: "Get listing updates on WhatsApp." },
  { id: "newsletter", label: "Weekly newsletter", desc: "Market trends and locality insights." },
];

export function PreferencesDialog({ open, onOpenChange }: PrefProps) {
  const [state, setState] = useState<Record<string, boolean>>({
    alerts: true,
    newlaunch: true,
    whatsapp: false,
    newsletter: true,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-slate-200 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Preferences</DialogTitle>
          <DialogDescription>
            Choose how propgrid keeps you informed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1 py-2">
          {PREFS.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900">{p.label}</p>
                <p className="text-xs text-slate-500">{p.desc}</p>
              </div>
              <Switch
                checked={state[p.id]}
                onCheckedChange={(v) =>
                  setState((s) => ({ ...s, [p.id]: v }))
                }
                className="data-[state=checked]:bg-teal-700"
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-teal-700 text-white hover:bg-teal-800"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}