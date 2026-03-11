import React from "react"

export default function AgeCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your date of birth to calculate your exact age. The calculator shows years, months, and days for precise age. By default, it calculates age as of today.
          </p>
          <p>
            Optionally select a target date to calculate age on any specific day. Useful for planning future milestones or determining age at historical events.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Age calculation example:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Birth Date: March 15, 1990
Today: January 10, 2024
Age: 33 years, 9 months, 26 days

Total: 12,354 days
Next Birthday: March 15, 2024 (in 65 days)</pre>
          </div>
          <p>
            Comprehensive statistics include total days, weeks, months, hours, minutes, and seconds lived. Next birthday countdown shows days remaining and what day of week it falls on.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Official form filling</h3>
            <p className="text-sm text-muted-foreground">
              Applications need exact age. Visa forms, insurance, employment. Precise age prevents errors. Verify before submitting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Birthday planning</h3>
            <p className="text-sm text-muted-foreground">
              Know exactly how old you'll be. Plan milestone celebrations. Share fun age facts. Track time until next birthday.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Genealogy research</h3>
            <p className="text-sm text-muted-foreground">
              Calculate ancestors' ages. Verify family tree dates. Understand generational spans. Historical context for records.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Pet age calculation</h3>
            <p className="text-sm text-muted-foreground">
              Track pet's age in human years. Veterinary records need age. Pet insurance forms. Adoption paperwork.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Age verification</h3>
            <p className="text-sm text-muted-foreground">
              Confirm eligibility for activities. Voting, drinking, driving ages. Senior discounts. Youth programs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Historical curiosity</h3>
            <p className="text-sm text-muted-foreground">
              How old would someone be today? Calculate age at historical events. Fun facts for presentations. Educational purposes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Age calculation follows calendar rules.</strong>
              Birthday must occur before age increments. March 15 birth means age changes March 15. Not January 1. Accounts for varying month lengths.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Leap year births handled correctly.</strong>
              Born February 29? Age increments on Feb 28 or Mar 1 in non-leap years. Legal definitions vary by jurisdiction. Calculator uses standard approach.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Total days is exact count.</strong>
              Days lived counts every calendar day. Includes leap days. Precise number for curiosity or calculations. Hours/minutes extrapolate from this.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Next birthday accounts for today.</strong>
              If today IS your birthday, next birthday is one year away. Days remaining shows 0 on birthday. Then resets to 364/365.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For legal purposes, always verify age requirements with official sources. Different jurisdictions may calculate differently.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do you calculate age exactly?</h3>
            <p className="text-sm text-muted-foreground">
              Count complete years first. Then complete months. Then remaining days. Birthday must pass for year to increment. Standard age calculation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if I was born on Feb 29?</h3>
            <p className="text-sm text-muted-foreground">
              Leapling! In non-leap years, legal birthday is Feb 28 or Mar 1. Varies by jurisdiction. Calculator uses standard convention.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I calculate age at a past date?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use the target date option. Select any date in past or future. Shows age on that specific day. Historical or planning use.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why show total seconds lived?</h3>
            <p className="text-sm text-muted-foreground">
              Fun perspective on life duration. Makes time tangible. Educational value. Impressive party fact. Not practically useful.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this accurate for babies?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, works for any age. Newborns show days and weeks prominently. Pediatricians track age in weeks initially. Useful for parents.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How is next birthday calculated?</h3>
            <p className="text-sm text-muted-foreground">
              Finds next occurrence of birth date. If passed this year, uses next year. Shows day of week and days remaining. Plan celebrations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I calculate someone else's age?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, enter any birth date. Calculate age for family, friends, celebrities. Historical figures too. Any valid date works.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
