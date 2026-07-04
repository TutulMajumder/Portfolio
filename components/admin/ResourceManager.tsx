"use client";

// Items here are arbitrary Prisma records (Skill | Education | Experience |
// Project | SocialLink), so `any` is a deliberate, scoped choice.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import DynamicForm from "./DynamicForm";
import { FieldConfig } from "@/config/formSchemas";

interface ResourceManagerProps {
  title: string;
  apiPath: string; // e.g. "/api/skills"
  fields: FieldConfig[];
  displayField: string; // which field to show as the row title in the list
  subDisplayField?: string;
}

export default function ResourceManager({
  title,
  apiPath,
  fields,
  displayField,
  subDisplayField,
}: ResourceManagerProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadItems() {
    setLoading(true);
    const res = await fetch(apiPath);
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const res = await fetch(apiPath);
      const data = await res.json();
      if (!cancelled) {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiPath]);

  async function handleCreateOrUpdate(values: Record<string, any>) {
    const url = editing ? `${apiPath}/${editing.id}` : apiPath;
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to save.");
    }
    setShowForm(false);
    setEditing(null);
    await loadItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    setError(null);
    const res = await fetch(`${apiPath}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Failed to delete item.");
      return;
    }
    await loadItems();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-stone-100">{title}</h1>
        {!showForm && (
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="rounded-md bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium px-4 py-2 transition-colors"
          >
            + Add New
          </button>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-md px-3 py-2 mb-4">
          {error}
        </p>
      )}

      {showForm ? (
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-stone-100 mb-4">
            {editing ? `Edit ${title.replace(/s$/, "")}` : `Add ${title.replace(/s$/, "")}`}
          </h2>
          <DynamicForm
            fields={fields}
            initialValues={editing ?? {}}
            onSubmit={handleCreateOrUpdate}
            submitLabel={editing ? "Update" : "Create"}
          />
          <button
            onClick={() => {
              setShowForm(false);
              setEditing(null);
            }}
            className="mt-3 text-sm text-stone-400 hover:text-stone-200"
          >
            Cancel
          </button>
        </div>
      ) : null}

      {loading ? (
        <p className="text-stone-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-stone-500">Nothing here yet. Add your first entry above.</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-stone-900 border border-stone-800 rounded-lg px-4 py-3"
            >
              <div>
                <p className="text-stone-100 font-medium">{item[displayField]}</p>
                {subDisplayField && item[subDisplayField] && (
                  <p className="text-sm text-stone-500">{item[subDisplayField]}</p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditing(item);
                    setShowForm(true);
                  }}
                  className="text-sm text-amber-400 hover:text-amber-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
