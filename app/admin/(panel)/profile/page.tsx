"use client";

// Profile fields come straight from the DynamicForm/Prisma record - dynamic by design.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import DynamicForm from "@/components/admin/DynamicForm";
import { profileFields } from "@/config/formSchemas";

export default function ProfileAdminPage() {
  const [profile, setProfile] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(values: Record<string, any>) {
    setSaved(false);
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to save.");
    }
    const updated = await res.json();
    setProfile(updated);
    setSaved(true);
  }

  if (loading) return <p className="text-stone-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-100 mb-2">Profile & About</h1>
      <p className="text-stone-500 mb-6">
        This powers your hero section and About Me section on the public site.
      </p>

      {saved && (
        <p className="text-sm text-green-400 bg-green-950/40 border border-green-900 rounded-md px-3 py-2 mb-4">
          Saved successfully.
        </p>
      )}

      <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
        <DynamicForm
          fields={profileFields}
          initialValues={profile ?? {}}
          onSubmit={handleSubmit}
          submitLabel="Save Profile"
        />
      </div>
    </div>
  );
}
