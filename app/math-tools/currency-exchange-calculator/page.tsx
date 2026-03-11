"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

    const inUSD = amt / fromRate;
    const converted = inUSD * toRate;
    const rate = toRate / fromRate;

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

  const loadExample = (type: string) => {
    const examples: Record<string, { amount: string; from: string; to: string }> = {
      usd_eur: { amount: "100", from: "USD", to: "EUR" },
      eur_gbp: { amount: "500", from: "EUR", to: "GBP" },
      jpy_usd: { amount: "10000", from: "JPY", to: "USD" },
      gbp_usd: { amount: "1000", from: "GBP", to: "USD" },
      inr_usd: { amount: "50000", from: "INR", to: "USD" },
      cad_usd: { amount: "500", from: "CAD", to: "USD" },
      aud_nzd: { amount: "200", from: "AUD", to: "NZD" }
    };
    const ex = examples[type] || examples.usd_eur;
    setAmount(ex.amount);
    setFromCurrency(ex.from);
    setToCurrency(ex.to);
    setResult(null);
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

        <div className="flex flex-wrap gap-2">
          <Button onClick={convert}>Convert</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("usd_eur")}>USD→EUR</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("eur_gbp")}>EUR→GBP</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("jpy_usd")}>JPY→USD</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("gbp_usd")}>GBP→USD</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("inr_usd")}>INR→USD</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("cad_usd")}>CAD→USD</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("aud_nzd")}>AUD→NZD</Button>
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Currency Exchange</h2>
        <p className="text-muted-foreground">
          Currency exchange is the process of converting one country's money into another's. Every international transaction – buying something from a foreign website, sending money to family abroad, or exchanging cash before a trip – involves currency conversion.
        </p>
        <p className="text-muted-foreground">
          Exchange rates tell you how much of one currency you get for another. If the USD/EUR rate is 0.92, one US dollar buys 0.92 euros. These rates fluctuate constantly based on economic conditions, interest rates, trade balances, and market sentiment.
        </p>
        <p className="text-muted-foreground">
          This calculator uses static reference rates for educational purposes. Real-world rates change by the second and include spreads (the difference between buy and sell rates) that banks and exchange services use to make money.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">How Exchange Rates Work</h2>
        <div className="p-6 bg-muted rounded-lg">
          <div className="font-mono text-sm mb-4">
            Converted Amount = Original Amount × Exchange Rate
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Exchange rates are typically quoted as how many units of the "quote currency" you get for one unit of the "base currency."
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">Direct Quote</div>
              <div className="text-muted-foreground">How much foreign currency for 1 unit of your currency (e.g., 1 USD = 0.92 EUR)</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">Indirect Quote</div>
              <div className="text-muted-foreground">How much of your currency for 1 unit of foreign currency (e.g., 1 EUR = 1.09 USD)</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">What Affects Exchange Rates</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Interest Rates</div>
                <div className="text-muted-foreground">Higher rates attract foreign investment, strengthening the currency</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Inflation</div>
                <div className="text-muted-foreground">Lower inflation typically strengthens a currency's purchasing power</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Economic Performance</div>
                <div className="text-muted-foreground">Strong GDP growth and employment boost currency value</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Political Stability</div>
                <div className="text-muted-foreground">Stable governments attract investment and support currency strength</div>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Major Currency Pairs</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>EUR/USD</span>
                <span className="text-muted-foreground">Euro/US Dollar</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>GBP/USD</span>
                <span className="text-muted-foreground">British Pound/US Dollar</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>USD/JPY</span>
                <span className="text-muted-foreground">US Dollar/Japanese Yen</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>USD/CHF</span>
                <span className="text-muted-foreground">US Dollar/Swiss Franc</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>AUD/USD</span>
                <span className="text-muted-foreground">Australian Dollar/US Dollar</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>USD/CAD</span>
                <span className="text-muted-foreground">US Dollar/Canadian Dollar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Worked Examples</h2>
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 1: US Tourist in Europe</h3>
            <p className="text-sm text-muted-foreground mb-3">An American traveler wants to convert $500 to euros for a trip to Paris.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Amount:</strong> $500 USD</div>
              <div><strong>Exchange Rate:</strong> 1 USD = 0.92 EUR</div>
              <div className="pt-2 border-t font-mono">
                €500 × 0.92 = €460
              </div>
              <div className="text-muted-foreground">
                The traveler receives €460 for their $500. Note: A bank or exchange service would likely give less due to fees and spread.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 2: UK Business Importing from Japan</h3>
            <p className="text-sm text-muted-foreground mb-3">A British company needs to pay a Japanese supplier ¥1,000,000.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Amount Needed:</strong> ¥1,000,000 JPY</div>
              <div><strong>Exchange Rate:</strong> 1 GBP = 189.24 JPY (inverse of 149.50/0.79)</div>
              <div className="pt-2 border-t font-mono">
                £1,000,000 ÷ 189.24 = £5,284
              </div>
              <div className="text-muted-foreground">
                The British company needs approximately £5,284 to pay the million-yen invoice.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 3: Indian Professional Sending Remittance</h3>
            <p className="text-sm text-muted-foreground mb-3">An Indian worker in the US wants to send $1,000 home to family.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Amount:</strong> $1,000 USD</div>
              <div><strong>Exchange Rate:</strong> 1 USD = 83.12 INR</div>
              <div className="pt-2 border-t font-mono">
                ₹1,000 × 83.12 = ₹83,120
              </div>
              <div className="text-muted-foreground">
                The family in India would receive approximately ₹83,120 (before any transfer fees).
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 4: Comparing Vacation Destinations</h3>
            <p className="text-sm text-muted-foreground mb-3">A Canadian with $5,000 CAD is deciding between Mexico and Thailand.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Budget:</strong> $5,000 CAD</div>
              <div className="pt-2"><strong>To Mexican Pesos:</strong></div>
              <div className="font-mono ml-4">$5,000 CAD → $3,676 USD → 63,047 MXN</div>
              <div className="pt-2"><strong>To Thai Baht:</strong></div>
              <div className="font-mono ml-4">$5,000 CAD → $3,676 USD → 131,621 THB</div>
              <div className="pt-2 text-muted-foreground">
                Understanding exchange rates helps travelers compare purchasing power across destinations.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Quick Fact</h2>
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm">
            <strong>The Gold Standard</strong> dominated international currency from the 1870s until World War I. Under this system, each currency was worth a specific amount of gold, making exchange rates fixed and predictable. The US dollar was worth $20.67 per ounce of gold until 1934, then $35/oz until 1971. President Nixon ended the gold standard in 1971, leading to today's system of floating exchange rates where currency values fluctuate based on market forces. The foreign exchange market now trades over $7 trillion daily – the world's largest financial market.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-sm mb-2">Why do exchange rates change?</h3>
            <p className="text-sm text-muted-foreground">
              Exchange rates fluctuate based on supply and demand in the global currency market. Economic data (GDP, employment, inflation), central bank policies, political events, trade balances, and investor sentiment all affect how much people want to hold a particular currency. Major announcements can move rates significantly within minutes.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What's the difference between the rate I see online and what the bank gives me?</h3>
            <p className="text-sm text-muted-foreground">
              The rate you see online is typically the "mid-market rate" – the midpoint between what banks pay each other. Banks and exchange services add a "spread" (markup) to make money. They might also charge additional fees. Always ask for the total amount you'll receive, not just the rate.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">When is the best time to exchange currency?</h3>
            <p className="text-sm text-muted-foreground">
              Timing the currency market is nearly impossible, even for professionals. If you need currency for a specific purpose (like a trip), consider exchanging gradually over time to average out rate fluctuations. For large amounts, some people use "forward contracts" to lock in a rate for future delivery.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What currency should I bring when traveling?</h3>
            <p className="text-sm text-muted-foreground">
              Local currency is usually best for everyday purchases. However, US dollars and euros are widely accepted in many countries and easy to exchange. Consider getting some local currency before you arrive for immediate expenses, then use ATMs (which typically offer good rates) for additional cash.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Why are some currency values so large (like JPY or KRW)?</h3>
            <p className="text-sm text-muted-foreground">
              Currency denominations are arbitrary – they're just different units of measurement. One Japanese yen is worth less than one US cent, so prices and exchange rates use larger numbers. It's like measuring distance in millimeters vs. kilometers. Some countries have redenominated (removed zeros) to make numbers more manageable.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What is currency hedging?</h3>
            <p className="text-sm text-muted-foreground">
              Hedging is protecting against currency risk. A company expecting payment in euros in 3 months might lock in today's exchange rate using a forward contract. This eliminates the risk that the euro will fall before payment arrives. Individuals can hedge by holding savings in multiple currencies.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What's the strongest currency in the world?</h3>
            <p className="text-sm text-muted-foreground">
              By nominal value, the Kuwaiti Dinar (KWD) is worth the most – about $3.25 USD per dinar. However, "strength" can also mean stability, widespread acceptance, or reserve currency status. The US dollar, euro, and Japanese yen are considered major reserve currencies held by central banks worldwide.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
