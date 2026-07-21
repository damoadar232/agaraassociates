import { Link } from "react-router-dom";

export function AgaraLogo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0">
      <img
        src="/logo.png"
        alt="Agara Architects logo"
        className="h-10 w-10 shrink-0 object-contain"
      />
      <span className="hidden sm:block text-[11px] font-medium uppercase tracking-[0.22em] text-agara-charcoal">
        Agara Architects
      </span>
    </Link>
  );
}
