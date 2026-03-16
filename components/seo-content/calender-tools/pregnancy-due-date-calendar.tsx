import * as React from "react"

export default function PregnancyDueDateCalendarSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter either your last menstrual period (LMP) date or conception date to calculate your estimated due date. The calculator uses Naegele's rule (LMP + 280 days) or conception date + 266 days to determine your due date.
          </p>
          <p>
            View a week-by-week pregnancy calendar showing your current trimester, weeks remaining, and baby's developmental milestones. Each week displays key information like baby's size, major developments, and what to expect during prenatal visits.
          </p>
          <p>
            Track important pregnancy milestones including when you'll hear the heartbeat, anatomy scan window, glucose testing period, and when baby is considered full-term. The calendar updates automatically as your pregnancy progresses.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Due Date Calculation</h3>
            <p className="text-sm text-muted-foreground">
              Get an accurate estimated due date based on your LMP or conception date for planning and medical care.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Prenatal Appointment Planning</h3>
            <p className="text-sm text-muted-foreground">
              Know when to schedule key appointments like anatomy scans, glucose tests, and weekly visits near term.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Baby Development Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Follow your baby's growth week by week with size comparisons and developmental milestone information.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Maternity Leave Planning</h3>
            <p className="text-sm text-muted-foreground">
              Plan when to start maternity leave based on your due date and workplace policies.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Baby Shower Timing</h3>
            <p className="text-sm text-muted-foreground">
              Schedule baby showers and preparation activities during the comfortable second trimester window.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Partner Involvement</h3>
            <p className="text-sm text-muted-foreground">
              Help partners understand pregnancy progression and important dates to be supportive and prepared.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Due dates are estimates:</strong> Only about 5% of babies are born on their due date. It's a target date, not a deadline. Most babies arrive between 37-42 weeks.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">LMP vs conception dating:</strong> Medical providers typically date pregnancy from LMP (about 2 weeks before conception). This tool calculates both ways for clarity.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Irregular cycles affect accuracy:</strong> If your cycles aren't 28 days, the LMP-based calculation may be off. Early ultrasound dating is more accurate for irregular cycles.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Trimester breakdown:</strong> First trimester is weeks 1-13, second is 14-27, and third is 28-40+. Each has different milestones and considerations.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Not medical advice:</strong> This tool provides general information. Always follow your healthcare provider's guidance for your specific pregnancy.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">How accurate is the due date calculator?</h3>
            <p className="text-sm text-muted-foreground">
              For women with regular 28-day cycles, LMP dating is fairly accurate. However, only 1 in 20 babies arrive on the due date. Early ultrasound (8-12 weeks) provides the most accurate dating.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What if I don't know my LMP?</h3>
            <p className="text-sm text-muted-foreground">
              Use the conception date option if you know when you ovulated or had IVF transfer. Otherwise, your healthcare provider can estimate based on early ultrasound measurements.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">When is my baby considered full-term?</h3>
            <p className="text-sm text-muted-foreground">
              Full-term is 39-40 weeks. Early term is 37-38 weeks, late term is 41 weeks, and post-term is 42+ weeks. Most providers won't induce before 39 weeks without medical reason.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">When should I start prenatal care?</h3>
            <p className="text-sm text-muted-foreground">
              Contact your healthcare provider as soon as you have a positive test. The first prenatal visit is typically around 8-10 weeks of pregnancy.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's the 2-week wait?</h3>
            <p className="text-sm text-muted-foreground">
              The "2-week wait" refers to the time between ovulation and when you can test for pregnancy. Pregnancy is dated from your LMP, so you're considered 2 weeks pregnant at conception.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I have my baby before the due date?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Babies born between 37-42 weeks are considered within normal range. About 80% of babies are born within 2 weeks before or after the due date.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I calculate for twins or multiples?</h3>
            <p className="text-sm text-muted-foreground">
              The due date calculation is the same, but multiples often arrive earlier. Twin pregnancies typically deliver around 36-37 weeks, triplets around 32-34 weeks.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
