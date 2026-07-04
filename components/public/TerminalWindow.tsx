interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function TerminalWindow({
  title,
  children,
  className = "",
}: TerminalWindowProps) {
  return (
    <div
      className={`rounded-xl border border-editor-border bg-editor-panel overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-editor-border bg-black/20">
        <span className="h-2.5 w-2.5 rounded-full bg-rose" />
        <span className="h-2.5 w-2.5 rounded-full bg-signal" />
        <span className="h-2.5 w-2.5 rounded-full bg-teal" />
        <span className="ml-3 font-mono text-xs text-muted">{title}</span>
      </div>
      <div className="p-6 md:p-8">{children}</div>
    </div>
  );
}
