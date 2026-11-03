import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

interface Props {
  autoFocus?: boolean;
  onSubmitted?: () => void;
  className?: string;
}

function HeaderSearchForm({ autoFocus, onSubmitted, className }: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    navigate(`/products?search=${encodeURIComponent(trimmed)}`);
    onSubmitted?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 transition-colors focus-within:border-brand/50 ${className ?? ""}`}
    >
      <Search size={16} className="shrink-0 text-white/40" />
      <input
        type="text"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        placeholder="جستجوی محصول..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
      />
    </form>
  );
}

export default HeaderSearchForm;
