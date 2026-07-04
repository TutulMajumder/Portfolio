"use client";

import { useEffect, useState } from "react";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadMessages() {
    setLoading(true);
    const res = await fetch("/api/contact-messages");
    const data = await res.json();
    setMessages(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function markRead(id: string, read: boolean) {
    await fetch(`/api/contact-messages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    await loadMessages();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/contact-messages/${id}`, { method: "DELETE" });
    await loadMessages();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-100 mb-2">Messages</h1>
      <p className="text-stone-500 mb-8">
        Submissions from your public contact form.
      </p>

      {loading ? (
        <p className="text-stone-500">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-stone-500">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-lg border p-5 ${
                msg.read
                  ? "bg-stone-900 border-stone-800"
                  : "bg-stone-900 border-amber-600/50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-stone-100 font-medium">
                    {msg.name}{" "}
                    <span className="text-stone-500 font-normal text-sm">
                      &lt;{msg.email}&gt;
                    </span>
                  </p>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <button
                    onClick={() => markRead(msg.id, !msg.read)}
                    className="text-xs text-amber-400 hover:text-amber-300"
                  >
                    {msg.read ? "Mark unread" : "Mark read"}
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-stone-300 text-sm mt-3 whitespace-pre-line">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}