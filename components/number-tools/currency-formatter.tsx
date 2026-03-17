"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, DollarSign } from "lucide-react";

const CurrencyFormatter: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [locale, setLocale] = useState("en-US");
  const [formatted, setFormatted] = useState("");

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
    { code: "KRW", name: "South Korean Won", symbol: "₩" },
    { code: "BRL", name: "Brazilian Real", symbol: "R$" },
    { code: "MXN", name: "Mexican Peso", symbol: "$" },
    { code: "RUB", name: "Russian Ruble", symbol: "₽" },
    { code: "ZAR", name: "South African Rand", symbol: "R" },
    { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
    { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
    { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
    { code: "SEK", name: "Swedish Krona", symbol: "kr" },
    { code: "DKK", name: "Danish Krone", symbol: "kr" },
    { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
    { code: "TRY", name: "Turkish Lira", symbol: "₺" },
    { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
    { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
    { code: "BTC", name: "Bitcoin", symbol: "₿" },
  ];

  const locales = [
    { code: "en-US", name: "English (US)" },
    { code: "en-GB", name: "English (UK)" },
    { code: "de-DE", name: "German" },
    { code: "fr-FR", name: "French" },
    { code: "es-ES", name: "Spanish" },
    { code: "it-IT", name: "Italian" },
    { code: "ja-JP", name: "Japanese" },
    { code: "zh-CN", name: "Chinese (Simplified)" },
    { code: "ko-KR", name: "Korean" },
    { code: "pt-BR", name: "Portuguese (Brazil)" },
    { code: "ru-RU", name: "Russian" },
    { code: "ar-SA", name: "Arabic" },
    { code: "hi-IN", name: "Hindi" },
  ];

  const formatCurrency = useCallback(() => {
    if (!amount) return;

    const numAmount = parseFloat(amount.replace(/[^0-9.-]/g, ""));
    if (isNaN(numAmount)) {
      setFormatted("Invalid amount");
      return;
    }

    try {
      const formatter = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setFormatted(formatter.format(numAmount));
    } catch (error) {
      setFormatted(`Error: Could not format with ${currency}`);
    }
  }, [amount, currency, locale]);

  const handleClear = useCallback(() => {
    setAmount("");
    setFormatted("");
  }, []);

  const handleCopy = useCallback(() => {
    if (formatted) {
      navigator.clipboard.writeText(formatted);
    }
  }, [formatted]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Currency Formatter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1000.00"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {currencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} - {curr.name} ({curr.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="locale">Locale/Region</Label>
              <select
                id="locale"
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {locales.map((loc) => (
                  <option key={loc.code} value={loc.code}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={formatCurrency} disabled={!amount}>
              <DollarSign className="w-4 h-4 mr-2" />
              Format
            </Button>
            <Button onClick={handleCopy} variant="outline" disabled={!formatted}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {formatted && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Formatted Amount</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-center py-4">{formatted}</p>
                </CardContent>
              </Card>

              <div className="p-4 border rounded-lg bg-blue-50">
                <p className="text-sm font-semibold mb-2">Format Details:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Currency: {currencies.find(c => c.code === currency)?.name}</li>
                  <li>• Locale: {locales.find(l => l.code === locale)?.name}</li>
                  <li>• Symbol: {currencies.find(c => c.code === currency)?.symbol}</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencyFormatter;
