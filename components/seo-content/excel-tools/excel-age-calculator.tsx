import React from "react"

export default function ExcelAgeCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Excel Age Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your CSV/Excel data or paste it directly. Select the column containing dates of birth. Choose the "as of" date for age calculation - default is today.
          </p>
          <p>
            Select your output format: years only, years and months, or years, months, and days. Enter a custom column name for the age column. The calculator computes precise ages for each row.
          </p>
          <p>
            Results show your data with a new age column added. Download as CSV or copy to clipboard. Perfect for HR records, membership databases, or any age-based analysis. All processing happens locally.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">HR employee records</h3>
            <p className="text-sm text-muted-foreground">
              Calculate employee ages for benefits eligibility. Track retirement planning. Generate age demographics for reporting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">School enrollment data</h3>
            <p className="text-sm text-muted-foreground">
              Determine student ages for grade placement. Verify age eligibility for programs. Generate age-based class rosters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Membership organizations</h3>
            <p className="text-sm text-muted-foreground">
              Calculate member ages for category pricing. Youth, adult, senior rates. Automate age-based membership classification.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Medical patient records</h3>
            <p className="text-sm text-muted-foreground">
              Patient age affects treatment protocols. Calculate ages from birthdates for medical forms. Age-specific care guidelines.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Event registration</h3>
            <p className="text-sm text-muted-foreground">
              Age-restricted events need verification. Calculate ages from provided birthdates. Ensure compliance with age requirements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Genealogy research</h3>
            <p className="text-sm text-muted-foreground">
              Calculate ages at specific historical dates. Understand family timelines. Age at marriage, death, or migration.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Date format matters.</strong>
              Use consistent date formats. ISO format (YYYY-MM-DD) works best. MM/DD/YYYY and DD/MM/YYYY can be ambiguous.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Age calculation is precise.</strong>
              Accounts for varying month lengths and leap years. Age on Feb 28 vs Mar 1 for Feb 29 birthdays is handled correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">"As of" date is flexible.</strong>
              Calculate age at any date, not just today. Useful for historical records or future planning scenarios.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Invalid dates show empty age.</strong>
              Rows with unparseable dates get blank age values. Check your date column for consistency before processing.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For Excel formulas, use =DATEDIF(birthdate, TODAY(), "Y") for years. This tool is great for batch processing without formulas.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is the calculation?</h3>
            <p className="text-sm text-muted-foreground">
              Exact to the day. Accounts for leap years and varying month lengths. More accurate than simple year subtraction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What date formats are supported?</h3>
            <p className="text-sm text-muted-foreground">
              ISO (YYYY-MM-DD), US (MM/DD/YYYY), and many common formats. If your dates aren't recognized, standardize them first.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I calculate age at a past date?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, set the "as of" date to any date. Calculate what someone's age was on a specific historical date.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are leap year birthdays handled?</h3>
            <p className="text-sm text-muted-foreground">
              Feb 29 birthdays are handled correctly. In non-leap years, age increments on Mar 1. Standard legal convention.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I get age in months only?</h3>
            <p className="text-sm text-muted-foreground">
              Current formats include years. For months-only, use the years-months format and calculate manually (years × 12 + months).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about future birthdates?</h3>
            <p className="text-sm text-muted-foreground">
              Future dates produce negative ages. This may indicate data errors. Check your birthdate column for typos.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, calculation happens entirely in your browser. No data is uploaded to servers. Safe for personal information.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
