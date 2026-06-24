"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface ExchangeRate {
  currencyCode: string;
  currencySymbol: string | null;
  rateToInr: number;
}

interface CurrencyContextType {
  selectedCurrency: string;
  currencySymbol: string;
  exchangeRates: Record<string, number>;
  symbols: Record<string, string>;
  setCurrency: (currency: string) => void;
  formatPrice: (amountInInr: number) => string;
  convertPrice: (amountInInr: number) => number;
}

const DEFAULT_SYMBOLS: Record<string, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  AED: "د.إ",
  SGD: "S$",
};

const DEFAULT_RATES: Record<string, number> = {
  INR: 1.0,
  USD: 84.5,
  GBP: 107.2,
  AED: 23.0,
  SGD: 63.1,
  EUR: 91.8,
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(DEFAULT_RATES);
  const [symbols, setSymbols] = useState<Record<string, string>>(DEFAULT_SYMBOLS);

  useEffect(() => {
    // Load local storage setting
    const stored = localStorage.getItem("selectedCurrency");
    if (stored && DEFAULT_RATES[stored]) {
      setSelectedCurrency(stored);
    }

    // Fetch live rates from database endpoint
    fetch("/api/rates/exchange")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch rates");
        return res.json();
      })
      .then((data: ExchangeRate[]) => {
        const ratesMap: Record<string, number> = { INR: 1.0 };
        const symbolsMap: Record<string, string> = { ...DEFAULT_SYMBOLS };

        data.forEach((r) => {
          ratesMap[r.currencyCode] = r.rateToInr;
          if (r.currencySymbol) {
            symbolsMap[r.currencyCode] = r.currencySymbol;
          }
        });

        setExchangeRates(ratesMap);
        setSymbols(symbolsMap);
      })
      .catch((err) => console.error("Error updating exchange rates context:", err));
  }, []);

  const setCurrency = (currency: string) => {
    if (exchangeRates[currency]) {
      setSelectedCurrency(currency);
      localStorage.setItem("selectedCurrency", currency);
    }
  };

  const convertPrice = (amountInInr: number): number => {
    const rate = exchangeRates[selectedCurrency] || 1.0;
    if (selectedCurrency === "INR") return amountInInr;
    return amountInInr / rate;
  };

  const formatPrice = (amountInInr: number): string => {
    const converted = convertPrice(amountInInr);
    const symbol = symbols[selectedCurrency] || "₹";

    // Use Intl.NumberFormat for nice comma formatting
    const formattedNum = new Intl.NumberFormat(
      selectedCurrency === "INR" ? "en-IN" : "en-US",
      {
        maximumFractionDigits: converted % 1 === 0 ? 0 : 2,
      }
    ).format(converted);

    // Format like "$1,250" or "₹1,25,000" or "1,250 د.إ" depending on symbol position
    if (selectedCurrency === "AED") {
      return `${formattedNum} ${symbol}`;
    }
    return `${symbol}${formattedNum}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        currencySymbol: symbols[selectedCurrency] || "₹",
        exchangeRates,
        symbols,
        setCurrency,
        formatPrice,
        convertPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
