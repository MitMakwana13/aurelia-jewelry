"use client";

import React, { createContext, useContext } from "react";

interface CurrencyContextType {
  selectedCurrency: string;
  currencySymbol: string;
  exchangeRates: Record<string, number>;
  symbols: Record<string, string>;
  setCurrency: (currency: string) => void;
  formatPrice: (amountInInr: number) => string;
  convertPrice: (amountInInr: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const selectedCurrency = "INR";
  const currencySymbol = "₹";
  const exchangeRates = { INR: 1.0 };
  const symbols = { INR: "₹" };

  const setCurrency = () => {
    // No-op since we only support INR
  };

  const convertPrice = (amountInInr: number): number => {
    return amountInInr;
  };

  const formatPrice = (amountInInr: number): string => {
    const formattedNum = new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(amountInInr);
    return `₹${formattedNum}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        currencySymbol,
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
