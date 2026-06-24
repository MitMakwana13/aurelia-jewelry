"use client";

import { useEffect, useState } from "react";

interface SiteSetting {
  id: string;
  key: string;
  value: string | null;
  label: string;
  category: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load settings");
        return res.json();
      })
      .then((data: SiteSetting[]) => {
        setSettings(data);
        const dict: Record<string, string> = {};
        data.forEach((s) => {
          dict[s.key] = s.value || "";
        });
        setFormData(dict);
      })
      .catch((err) => {
        console.error(err);
        setMessage({ type: "error", text: "Failed to load settings. Please authenticate." });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key: string, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: formData }),
      });

      if (!res.ok) throw new Error("Failed to save settings");
      setMessage({ type: "success", text: "Settings saved successfully." });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to save settings. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#c49a45] border-t-transparent" />
      </div>
    );
  }

  const contactFields = settings.filter((s) => s.category === "contact" || s.key === "site_name");
  const socialFields = settings.filter((s) => s.category === "social");

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-ink">Store Settings</h1>
        <p className="text-sm text-ink/50 mt-1">Configure global store details, boutique addresses, and social links.</p>
      </div>

      {message && (
        <div
          className={`p-4 text-xs font-semibold uppercase tracking-wider ${
            message.type === "success"
              ? "bg-[#053624]/10 text-[#053624] border border-[#053624]/20"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Contact & General Card */}
        <div className="bg-white border border-ink/10 p-6 space-y-6">
          <h2 className="font-serif text-xl text-ink border-b border-ink/5 pb-2">General & Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactFields.map((field) => (
              <div key={field.key} className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-ink/60 font-semibold">{field.label}</label>
                {field.key === "boutique_address" ? (
                  <textarea
                    rows={3}
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full border border-ink/10 bg-cream-light/30 px-4 py-3 text-xs outline-none focus:border-ink transition"
                  />
                ) : (
                  <input
                    type="text"
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full border border-ink/10 bg-cream-light/30 px-4 py-3 text-xs outline-none focus:border-ink transition"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Social Accounts Card */}
        <div className="bg-white border border-ink/10 p-6 space-y-6">
          <h2 className="font-serif text-xl text-ink border-b border-ink/5 pb-2">Social & Media Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialFields.map((field) => (
              <div key={field.key} className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-ink/60 font-semibold">{field.label}</label>
                <input
                  type="text"
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full border border-ink/10 bg-cream-light/30 px-4 py-3 text-xs outline-none focus:border-ink transition"
                />
              </div>
            ))}
            {socialFields.length === 0 && (
              <div className="col-span-2 space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-ink/60 font-semibold">Instagram URL</label>
                <input
                  type="text"
                  value={formData["instagram_url"] || ""}
                  onChange={(e) => handleChange("instagram_url", e.target.value)}
                  placeholder="https://instagram.com/radharanigemstone"
                  className="w-full border border-ink/10 bg-cream-light/30 px-4 py-3 text-xs outline-none focus:border-ink transition"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#053624] text-cream px-8 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-ink transition shadow-lg disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
