import { ChevronDown } from "lucide-react";
import type { Faq } from "../types/contact.types";

interface Props {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FaqAccordionItem({ faq, isOpen, onToggle }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
      >
        <span className="text-sm font-bold text-white">{faq.question}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-brand transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-7 text-white/60">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
