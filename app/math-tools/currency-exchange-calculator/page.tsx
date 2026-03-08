"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Static exchange rates (base: USD)
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  CAD: 1.36,
  AUD: 1.52,
  CHF: 0.88,
  CNY: 7.19,
  INR: 83.12,
  MXN: 17.15,
  BRL: 4.97,
  ZAR: 18.85,
  SGD: 1.34,
  HKD: 7.82,
  NZD: 1.63,
  SEK: 10.42,
  NOK: 10.68,
  DKK: 6.87,
  PLN: 3.98,
  KRW: 1320.50,
  RUB: 92.50,
  TRY: 32.15,
  AED: 3.67,
  SAR: 3.75,
  THB: 35.80,
  MYR: 4.72,
  IDR: 15680,
  PHP: 56.25,
  VND: 24350,
  CZK: 22.85,
  HUF: 355.20,
  ILS: 3.65,
  CLP: 975.50,
  COP: 3920,
  ARS: 850,
  EGP: 30.90,
  NGN: 1450,
  KES: 129.50,
  PKR: 278.50,
  BDT: 109.80
};

const CURRENCY_NAMES: Record<string, string> = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  CAD: "Canadian Dollar",
  AUD: "Australian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  INR: "Indian Rupee",
  MXN: "Mexican Peso",
  BRL: "Brazilian Real",
  ZAR: "South African Rand",
  SGD: "Singapore Dollar",
  HKD: "Hong Kong Dollar",
  NZD: "New Zealand Dollar",
  SEK: "Swedish Krona",
  NOK: "Norwegian Krone",
  DKK: "Danish Krone",
  PLN: "Polish Zloty",
  KRW: "South Korean Won",
  RUB: "Russian Ruble",
  TRY: "Turkish Lira",
  AED: "UAE Dirham",
  SAR: "Saudi Riyal",
  THB: "Thai Baht",
  MYR: "Malaysian Ringgit",
  IDR: "Indonesian Rupiah",
  PHP: "Philippine Peso",
  VND: "Vietnamese Dong",
  CZK: "Czech Koruna",
  HUF: "Hungarian Forint",
  ILS: "Israeli Shekel",
  CLP: "Chilean Peso",
  COP: "Colombian Peso",
  ARS: "Argentine Peso",
  EGP: "Egyptian Pound",
  NGN: "Nigerian Naira",
  KES: "Kenyan Shilling",
  PKR: "Pakistani Rupee",
  BDT: "Bangladeshi Taka"
};

export default function CurrencyExchangeCalculator() {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const convert = () => {
    setError("");
    setResult(null);

    const amt = parseFloat(amount);
    if (isNaN(amt) || amt < 0) {
      setError("Please enter a valid amount");
      return;
    }

    const fromRate = EXCHANGE_RATES[fromCurrency];
    const toRate = EXCHANGE_RATES[toCurrency];

    if (!fromRate || !toRate) {
      setError("Invalid currency selected");
      return;
    }

    // Convert to USD first, then to target currency
    const inUSD = amt / fromRate;
    const converted = inUSD * toRate;
    const rate = toRate / fromRate;

    // Calculate inverse rates for common amounts
    const commonAmounts = [1, 5, 10, 20, 50, 100, 500, 1000];
    const conversions = commonAmounts.map(a => ({
      from: a,
      to: Math.round(a * rate * 100) / 100
    }));

    setResult({
      fromAmount: amt,
      fromCurrency,
      toAmount: Math.round(converted * 100) / 100,
      toCurrency,
      rate: Math.round(rate * 6) / 6,
      inverseRate: Math.round((1 / rate) * 6) / 6,
      conversions,
      fromName: CURRENCY_NAMES[fromCurrency],
      toName: CURRENCY_NAMES[toCurrency]
    });
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
    setError("");
  };

  const reset = () => {
    setAmount("100");
    setFromCurrency("USD");
    setToCurrency("EUR");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Currency Exchange Calculator – Convert Currencies Online</h1>
        <p className="text-muted-foreground">
          Convert between 40+ world currencies with our free online currency exchange calculator. Get instant conversions with static exchange rates for travel, business, and personal use.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
          <div>
            <Label>From</Label>
            <Select value={fromCurrency} onValueChange={(v) => { setFromCurrency(v); setResult(null); }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CURRENCY_NAMES).map(([code, name]) => (
                  <SelectItem key={code} value={code}>{code} - {name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-2"
            />
          </div>

          <Button variant="outline" size="icon" onClick={swapCurrencies} className="mb-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16"/>
            </svg>
          </Button>

          <div>
            <Label>To</Label>
            <Select value={toCurrency} onValueChange={(v) => { setToCurrency(v); setResult(null); }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CURRENCY_NAMES).map(([code, name]) => (
                  <SelectItem key={code} value={code}>{code} - {name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-2 p-3 bg-muted rounded-md min-h-[42px]">
              {result ? `${result.toAmount.toLocaleString()} ${toCurrency}` : "-"}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={convert}>Convert</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {result.fromAmount.toLocaleString()} {result.fromCurrency} ({result.fromName})
              </p>
              <p className="text-4xl font-bold my-2">
                = {result.toAmount.toLocaleString()} {result.toCurrency}
              </p>
              <p className="text-sm text-muted-foreground">
                ({result.toName})
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Exchange Rate</p>
                <p className="text-xl font-semibold">
                  1 {result.fromCurrency} = {result.rate} {result.toCurrency}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Inverse Rate</p>
                <p className="text-xl font-semibold">
                  1 {result.toCurrency} = {result.inverseRate} {result.fromCurrency}
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Quick Reference</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {result.conversions.map((c: any, i: number) => (
                  <div key={i} className="p-2 bg-muted rounded text-center">
                    <p className="text-xs text-muted-foreground">{c.from} {result.fromCurrency}</p>
                    <p className="font-semibold">{c.to} {result.toCurrency}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="p-4 bg-amber-50 text-amber-900 rounded-md text-sm">
          <strong>Note:</strong> These are static reference rates for educational purposes. For actual transactions, please check with your bank or currency exchange service for real-time rates.
        </div>
      </div>

    </div>
  );
}
