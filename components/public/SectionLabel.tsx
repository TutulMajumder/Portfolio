export default function SectionLabel({ text }: { text: string }) {
  return (
    <p className="font-mono text-sm text-teal mb-3 -ml-1">
      <span className="text-muted">{"// "}</span>
      {text}
    </p>
  );
}