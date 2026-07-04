"use client";

// This component is a generic, schema-driven form renderer — form values are
// inherently dynamic (string | number | boolean | string[] depending on field
// config), so `any` here is a deliberate, scoped choice rather than an oversight.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { FieldConfig } from "@/config/formSchemas";

interface DynamicFormProps {
  fields: FieldConfig[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => Promise<void>;
  submitLabel?: string;
}

export default function DynamicForm({
  fields,
  initialValues = {},
  onSubmit,
  submitLabel = "Save",
}: DynamicFormProps) {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const defaults: Record<string, any> = {};
    fields.forEach((f) => {
      if (initialValues[f.name] !== undefined) {
        defaults[f.name] = Array.isArray(initialValues[f.name])
          ? initialValues[f.name].join(", ")
          : initialValues[f.name];
      } else {
        defaults[f.name] = f.type === "checkbox" ? false : "";
      }
    });
    return defaults;
  });
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(name: string, value: any) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleFileUpload(name: string, file: File) {
    setUploading(name);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      handleChange(name, data.url);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    for (const field of fields) {
      if (field.required && !values[field.name]) {
        setError(`${field.label} is required.`);
        return;
      }
    }

    setSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-stone-300">
            {field.label}
            {field.required && <span className="text-amber-400"> *</span>}
          </label>

          {field.type === "text" || field.type === "number" ? (
            <input
              type={field.type}
              value={values[field.name] ?? ""}
              placeholder={field.placeholder}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="rounded-md bg-stone-800 border border-stone-700 px-3 py-2 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          ) : field.type === "textarea" ? (
            <textarea
              value={values[field.name] ?? ""}
              placeholder={field.placeholder}
              onChange={(e) => handleChange(field.name, e.target.value)}
              rows={4}
              className="rounded-md bg-stone-800 border border-stone-700 px-3 py-2 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          ) : field.type === "checkbox" ? (
            <input
              type="checkbox"
              checked={!!values[field.name]}
              onChange={(e) => handleChange(field.name, e.target.checked)}
              className="h-5 w-5 accent-amber-500 self-start"
            />
          ) : field.type === "select" ? (
            <select
              value={values[field.name] ?? ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="rounded-md bg-stone-800 border border-stone-700 px-3 py-2 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">Select...</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : field.type === "image" || field.type === "file" ? (
            <div className="flex flex-col gap-2">
              <input
                type="file"
                accept={field.type === "image" ? "image/*" : "application/pdf"}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(field.name, file);
                }}
                className="text-sm text-stone-400 file:mr-3 file:rounded-md file:border-0 file:bg-amber-600 file:px-3 file:py-1.5 file:text-sm file:text-stone-950 file:font-medium"
              />
              {uploading === field.name && (
                <span className="text-xs text-amber-400">Uploading...</span>
              )}
              {values[field.name] && (
                <span className="text-xs text-stone-500 truncate">
                  Current: {values[field.name]}
                </span>
              )}
            </div>
          ) : null}

          {field.helpText && (
            <p className="text-xs text-stone-500">{field.helpText}</p>
          )}
        </div>
      ))}

      {error && (
        <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || !!uploading}
        className="rounded-md bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-medium px-4 py-2 transition-colors"
      >
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
