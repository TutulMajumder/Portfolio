"use client";

// Contact fields come straight from the DynamicForm/Prisma record - dynamic by design.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import ResourceManager from "@/components/admin/ResourceManager";
import DynamicForm from "@/components/admin/DynamicForm";
import { socialLinkFields, contactFields } from "@/config/formSchemas";

function ContactSection() {
  const [contact, setContact] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => setContact(data))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(values: Record<string, any>) {
    setSaved(false);
    const res = await fetch("/api/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to save.");
    }
    const updated = await res.json();
    setContact(updated);
    setSaved(true);
  }

  if (loading) return <p className="text-stone-500">Loading...</p>;

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
      {saved && (
        <p className="text-sm text-green-400 bg-green-950/40 border border-green-900 rounded-md px-3 py-2 mb-4">
          Saved successfully.
        </p>
      )}
      <DynamicForm
        fields={contactFields}
        initialValues={contact ?? {}}
        onSubmit={handleSubmit}
        submitLabel="Save Contact Info"
      />
    </div>
  );
}

export default function SocialContactAdminPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-stone-100 mb-2">
          Contact Information
        </h1>
        <p className="text-stone-500 mb-4">
          Shown in your Contact section for visitors to reach you.
        </p>
        <ContactSection />
      </div>

      <div>
        <ResourceManager
          title="Social Links"
          apiPath="/api/social-links"
          fields={socialLinkFields}
          displayField="platform"
          subDisplayField="url"
        />
      </div>
    </div>
  );
}
