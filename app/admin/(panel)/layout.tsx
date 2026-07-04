"use client";

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

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-stone-950 flex">
      <aside className="w-64 border-r border-stone-800 flex flex-col shrink-0">
        <div className="px-6 py-5 border-b border-stone-800">
          <p className="text-stone-100 font-semibold">Admin Panel</p>
          <p className="text-xs text-stone-500">Portfolio Management</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
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
      </aside>
      <main className="flex-1 p-8 max-w-4xl">{children}</main>
    </div>
  );
}
