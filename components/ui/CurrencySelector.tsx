"use client";

import { useState, useRef, useEffect } from "react";
import { useCurrency } from "@/context/CurrencyContext";

export function CurrencySelector() {
  const { selectedCurrency, setCurrency, symbols } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currencies = [
    { code: "INR", label: "Indian Rupee" },
    { code: "USD", label: "US Dollar" },
    { code: "EUR", label: "Euro" },
    { code: "GBP", label: "British Pound" },
    { code: "AED", label: "UAE Dirham" },
    { code: "SGD", label: "Singapore Dollar" },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-ink hover:text-ink/60 transition duration-300"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-[#c49a45]">{symbols[selectedCurrency] || "₹"}</span>
        <span>{selectedCurrency}</span>
        <svg
          className={`w-2.5 h-2.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-ink/10 shadow-2xl rounded-sm z-50 py-1 transition-all duration-300">
          <div className="px-3 py-1.5 border-b border-ink/5 mb-1">
            <span className="text-[8px] uppercase tracking-wider text-ink/40 font-semibold">Select Currency</span>
          </div>
          {currencies.map((curr) => (
            <button
              key={curr.code}
              onClick={() => {
                setCurrency(curr.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-[10px] uppercase tracking-[0.15em] flex items-center justify-between transition-colors duration-300 ${
                selectedCurrency === curr.code
                  ? "bg-[#053624] text-cream"
                  : "text-ink hover:bg-cream-warm"
              }`}
            >
              <span>{curr.label}</span>
              <span className="font-serif font-bold opacity-80">{symbols[curr.code]} {curr.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
