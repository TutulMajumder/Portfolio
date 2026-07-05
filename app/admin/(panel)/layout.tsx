"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/profile", label: "Profile & About" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/certifications", label: "Certifications" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/social-contact", label: "Social & Contact" },
  { href: "/admin/messages", label: "Messages" },
];

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const sidebarContent = (
    <>
      <div className="px-6 py-5 border-b border-stone-800 flex items-center justify-between">
        <div>
          <p className="text-stone-100 font-semibold">Admin Panel</p>
          <p className="text-xs text-stone-500">Portfolio Management</p>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
          className="md:hidden text-stone-500 hover:text-stone-300 text-xl leading-none"
        >
          ✕
        </button>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setSidebarOpen(false)}
            className={`block rounded-md px-3 py-2 text-sm transition-colors ${
              pathname === item.href
                ? "bg-amber-600 text-stone-950 font-medium"
                : "text-stone-300 hover:bg-stone-900"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-stone-800 space-y-1">
        <Link
          href="/"
          className="block rounded-md px-3 py-2 text-sm text-stone-400 hover:bg-stone-900"
        >
          View Public Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full text-left rounded-md px-3 py-2 text-sm text-red-400 hover:bg-stone-900"
        >
          Log Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-stone-950 flex">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-stone-950 border-b border-stone-800 flex items-center justify-between px-4">
        <p className="text-stone-100 font-semibold text-sm">Admin Panel</p>
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
          className="flex flex-col gap-1.5 p-2"
        >
          <span className="block h-0.5 w-5 bg-stone-100" />
          <span className="block h-0.5 w-5 bg-stone-100" />
          <span className="block h-0.5 w-5 bg-stone-100" />
        </button>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 z-40"
        />
      )}

      {/* Sidebar - slides in on mobile, static on desktop */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 border-r border-stone-800 flex flex-col shrink-0 bg-stone-950 z-50 transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {sidebarContent}
      </aside>

      <main className="flex-1 p-5 md:p-8 pt-20 md:pt-8 w-full">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}