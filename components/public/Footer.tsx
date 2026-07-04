export default function Footer({ name }: { name: string }) {
  return (
    <footer className="border-t border-editor-border">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {name || "portfolio"}. Built with Next.js.
        </p>
        <a
          href="#home"
          className="font-mono text-xs text-muted hover:text-signal transition-colors"
        >
          back to top ↑
        </a>
      </div>
    </footer>
  );
}
