// Decorative Greek pillar (original line drawing). Hidden from screen readers.
export default function Pillar({ className }) {
  return (
    <svg className={className} viewBox="0 0 48 58" aria-hidden="true" focusable="false">
      <path d="M5 12h38M8 8h32M11 4h26M8 13l3 4h26l3-4M12 17v3m24-3v3M14 20h20M14 20v27m20-27v27M19 21v25m10-25v25M11 47h26M8 51h32M5 55h38" />
      <path d="M11 47l-3 4m29-4 3 4M14 20l-2 3m24-3 2 3" />
    </svg>
  );
}
