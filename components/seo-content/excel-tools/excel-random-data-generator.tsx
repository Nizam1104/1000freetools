import React from "react"

export default function ExcelRandomDataGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Excel Random Data Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Specify the number of rows you need. Add columns with names and select data types: text, numbers, emails, names, dates, phone numbers, cities, products, prices, booleans, or UUIDs.
          </p>
          <p>
            For text columns, optionally provide comma-separated options to randomly select from. This creates realistic categorical data like status values or product categories.
          </p>
          <p>
            Click Generate to create your fake dataset. Download as CSV or copy to clipboard. Use for testing, demos, or sample data. All generation happens locally in your browser.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing application features</h3>
            <p className="text-sm text-muted-foreground">
              Need sample users for testing? Generate realistic names, emails, and data. Test pagination, search, and filters with real-looking data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating demo datasets</h3>
            <p className="text-sm text-muted-foreground">
              Building a demo for clients? Populate with fake but realistic data. Looks professional without using real customer information.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Practicing Excel formulas</h3>
            <p className="text-sm text-muted-foreground">
              Learn VLOOKUP, pivot tables, and charts. Generate practice data without privacy concerns. Experiment freely with fake data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Load testing databases</h3>
            <p className="text-sm text-muted-foreground">
              Need thousands of test records? Generate bulk data for performance testing. Verify your system handles scale.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Mocking API responses</h3>
            <p className="text-sm text-muted-foreground">
              Frontend development needs sample data. Generate JSON-compatible datasets. Build UIs before backend is ready.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Training and workshops</h3>
            <p className="text-sm text-muted-foreground">
              Teach data analysis without real data concerns. Everyone works with identical fake datasets. Focus on skills, not data sensitivity.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Generated data is completely fake.</strong>
              Names, emails, and values are randomly created. Any resemblance to real data is coincidence. Safe to share publicly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">ID columns auto-increment.</strong>
              Columns with "id" in the name get sequential numbers (1, 2, 3...). Other numeric columns get random values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Email domains are varied.</strong>
              Generated emails use common domains (gmail, yahoo, outlook). Realistic but non-existent addresses.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Dates span realistic ranges.</strong>
              Random dates fall within recent years. Not truly random across all time. Suitable for business data simulation.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For reproducible test data, save your generated CSV. Each generation creates new random data. Save datasets you want to reuse.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many rows can I generate?</h3>
            <p className="text-sm text-muted-foreground">
              Up to 1000 rows per generation. Browser performance limits apply. For more, generate in batches and combine.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I generate unique values?</h3>
            <p className="text-sm text-muted-foreground">
              ID columns are unique. Other fields may have duplicates (like real data). For guaranteed uniqueness, use UUID type.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are the emails real?</h3>
            <p className="text-sm text-muted-foreground">
              No, emails are randomly generated. They may coincidentally match real addresses. Don't use for actual email campaigns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize the data?</h3>
            <p className="text-sm text-muted-foreground">
              For text fields, provide custom options. For other types, use the predefined generators. Edit the CSV after generation for more customization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What format is the output?</h3>
            <p className="text-sm text-muted-foreground">
              CSV format, compatible with Excel, Google Sheets, and any spreadsheet. Also works for database imports and API testing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I generate international data?</h3>
            <p className="text-sm text-muted-foreground">
              Current generators use US-centric data (names, cities, phones). For international data, use custom text options with your own values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this tool free?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, completely free with no registration. Generate as much test data as you need. Your data stays in your browser.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
