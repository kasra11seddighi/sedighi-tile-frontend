import { Menu, X } from "lucide-react";

interface Props {
  open: boolean;
  onClick: () => void;
}

function MobileMenu({ open, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        lg:hidden
        text-white/90
        hover:text-brand
        transition-all
        duration-300
        p-1
      "
    >
      {open ? <X size={28} /> : <Menu size={28} />}
    </button>
  );
}

export default MobileMenu;
