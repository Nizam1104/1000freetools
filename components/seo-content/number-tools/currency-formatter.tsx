import React from "react"

export default function CurrencyFormatterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Currency Formatter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool formats numerical amounts as properly localized currency strings. Enter a number, select a currency and locale, and get a correctly formatted currency value with the right symbol, decimal places, and thousands separators.
          </p>
          <p>
            Currency formatting varies significantly by region. $1,234.56 in the US becomes 1.234,56 $ in some European countries, or ₹१,२३४.५६ in Indian numbering. This tool uses the Intl.NumberFormat API to handle all these variations correctly.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Formatting variations handled:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Currency symbol position ($100 vs 100$ vs 100 USD)</li>
              <li>Decimal separator (period vs comma)</li>
              <li>Thousands separator (comma vs period vs space vs apostrophe)</li>
              <li>Decimal precision (0, 2, or 3 decimal places depending on currency)</li>
              <li>Negative number formatting (-$100 vs $-100 vs ($100))</li>
              <li>Native numeral systems (Arabic-Indic, Devanagari, etc.)</li>
            </ul>
          </div>
          <p>
            Select from 150+ currencies and 20+ locales. The formatter applies the correct rules for each combination, ensuring your financial data displays appropriately for your target audience.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building international e-commerce sites</h3>
            <p className="text-sm text-muted-foreground">
              Product prices need to display correctly for customers worldwide. A German customer expects "1.234,56 €" not "$1,234.56". Use the formatter to verify your prices display correctly in each target market.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating financial reports</h3>
            <p className="text-sm text-muted-foreground">
              Quarterly reports going to international stakeholders? Format figures according to each recipient's locale. US investors see $1,234.56, Japanese investors see ¥123,456, European investors see €1.234,56.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Developing multi-currency applications</h3>
            <p className="text-sm text-muted-foreground">
              Your SaaS charges in USD, EUR, GBP, and JPY. Each currency has different conventions - JPY typically has no decimal places, while most others use 2. The formatter handles these differences automatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing documentation with price examples</h3>
            <p className="text-sm text-muted-foreground">
              Documentation shows pricing examples. Instead of manually typing "$1,000.00" everywhere, use the formatter to ensure consistency. Change the base price once, regenerate all examples.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating currency display in UIs</h3>
            <p className="text-sm text-muted-foreground">
              QA testing an internationalized app? Use the formatter to verify correct output. If your app shows "€1.234,56" for German locale but the formatter shows "1.234,56 €", there's a bug to fix.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing invoices for international clients</h3>
            <p className="text-sm text-muted-foreground">
              Invoices need to show amounts in the client's expected format. A French client expects different formatting than a US client. Generate correctly formatted amounts for professional invoices.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Currency and locale are separate.</strong>
              Currency (USD, EUR) determines the symbol and decimal precision. Locale (en-US, de-DE) determines the formatting style. You can display EUR in US format (€1,234.56) or German format (1.234,56 €).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some currencies have no decimals.</strong>
              Japanese Yen (JPY), Korean Won (KRW), and others typically display without decimal places. The formatter knows this and shows ¥1,000 not ¥1,000.00.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Exchange rates aren't included.</strong>
              This tool formats numbers, it doesn't convert currencies. Enter the amount in the target currency. For conversion, use a separate currency converter with live exchange rates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Cryptocurrency formatting varies.</strong>
              Bitcoin and other crypto often use different conventions - sometimes 8 decimal places (₿0.00123456), sometimes fewer. Standard currency formatting may not match crypto community expectations.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For applications, use the locale from the user's browser settings (navigator.language) combined with their selected currency. This gives the most natural formatting for each user.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does the same currency format differently?</h3>
            <p className="text-sm text-muted-foreground">
              Because locale affects formatting. EUR with en-US locale shows "€1,234.56". EUR with de-DE locale shows "1.234,56 €". Both are correct - they match regional conventions for their respective locales.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I format currency without decimals?</h3>
            <p className="text-sm text-muted-foreground">
              Some formatters offer a "no decimals" option. Or use a locale/currency combination that naturally omits decimals (like JPY). For custom control, you'd need to modify the formatting options programmatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I format multiple currencies at once?</h3>
            <p className="text-sm text-muted-foreground">
              This tool formats one amount at a time. For batch formatting, use a spreadsheet with the TEXT function or write a script using Intl.NumberFormat in a loop.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about accounting format with parentheses for negatives?</h3>
            <p className="text-sm text-muted-foreground">
              Some locales (like en-US) support accounting format where -$100 displays as ($100). Select an accounting locale or use a formatter with currencyDisplay option set appropriately.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this handle large numbers correctly?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the formatter handles numbers in the billions and beyond. For extremely large numbers (trillions+), some locales use different grouping patterns. The formatter applies the correct rules.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I get just the symbol without formatting?</h3>
            <p className="text-sm text-muted-foreground">
              This tool shows the full formatted string. For just the symbol, reference a currency symbol table or use Intl.NumberFormat with formatToParts() to extract just the currency component.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why doesn't my currency appear in the list?</h3>
            <p className="text-sm text-muted-foreground">
              The tool includes ISO 4217 standard currencies. Some local or historical currencies aren't included. For unsupported currencies, use a similar currency's formatting as a reference.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
