import React from "react"

export default function PregnancyDueDateCalendarSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Pregnancy Due Date Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Choose your calculation method: Last Menstrual Period (LMP), conception date, or IVF transfer date. Each method uses medically-recognized formulas to estimate your due date.
          </p>
          <p>
            For LMP calculations, the tool uses Naegele's rule - adding 280 days (40 weeks) to your last period's start date. It adjusts for cycle lengths different from the standard 28 days.
          </p>
          <p>
            Conception date calculations add 266 days (38 weeks) from when the egg was fertilized. This method is more accurate if you know the exact conception date.
          </p>
          <p>
            IVF calculations account for embryo age at transfer. Select 3-day or 5-day (blastocyst) embryo, and the tool adjusts the due date accordingly.
          </p>
          <p>
            Results show your current week of pregnancy, trimester information, time remaining, and a visual progress bar. Key milestone dates are calculated automatically.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Confirming doctor's due date</h3>
            <p className="text-sm text-muted-foreground">
              Double-check the date your healthcare provider gave you. Compare calculations from different methods. Feel confident in your timeline.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">IVF pregnancy tracking</h3>
            <p className="text-sm text-muted-foreground">
              IVF pregnancies need different calculations. Input your transfer date and embryo age. Get an accurate due date specific to your treatment.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Irregular cycle adjustment</h3>
            <p className="text-sm text-muted-foreground">
              Standard calculators assume 28-day cycles. Adjust for your actual cycle length. Get a more personalized due date estimate.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Pregnancy announcement planning</h3>
            <p className="text-sm text-muted-foreground">
              Know your due date before sharing news. Plan announcements around milestones. "Coming [month/year]" becomes specific.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Baby shower scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Plan events at the right time in pregnancy. Avoid scheduling too close to due date. Give guests plenty of notice.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Maternity leave planning</h3>
            <p className="text-sm text-muted-foreground">
              Coordinate time off with your due date. Notify employers with accurate timelines. Plan for early or late arrivals.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Due dates are estimates, not deadlines.</strong>
              Only about 5% of babies arrive on their due date. Most are born within 2 weeks before or after. Your healthcare provider may adjust based on ultrasounds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">LMP method assumes regular cycles.</strong>
              If your cycles are irregular, the conception date method may be more accurate. Ultrasound dating is most precise in the first trimester.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">IVF dates are typically most accurate.</strong>
              Since fertilization date is known precisely, IVF due dates have less variance. Still expect natural variation in actual delivery timing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">First trimester ultrasounds refine dating.</strong>
              Crown-rump length measurements between 8-13 weeks provide accurate dating. Your provider may adjust the calculated due date based on these scans.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Medical disclaimer:</strong> This calculator provides estimates only. Always consult your healthcare provider for medical advice and accurate dating. Ultrasound measurements are the gold standard.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is my due date different from my doctor's?</h3>
            <p className="text-sm text-muted-foreground">
              Doctors use ultrasound measurements, especially first-trimester scans, which are more accurate than LMP calculations. They may also round to the nearest week. Trust your provider's dating.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if I don't know my cycle length?</h3>
            <p className="text-sm text-muted-foreground">
              Use the default 28 days. The difference is usually minimal - a few days at most. Early ultrasound will provide more accurate dating if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can the due date change?</h3>
            <p className="text-sm text-muted-foreground">
              The calculated date doesn't change, but your estimated delivery window might. Babies typically arrive within 2 weeks of the due date. First babies often arrive late.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is the conception date method?</h3>
            <p className="text-sm text-muted-foreground">
              Very accurate if you know the exact date. Ovulation predictor kits or fertility tracking apps can help identify conception. Sperm can live up to 5 days, so intercourse date isn't conception date.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a blastocyst transfer?</h3>
            <p className="text-sm text-muted-foreground">
              A blastocyst is a 5-6 day old embryo. Day 5 transfers are most common. The calculator subtracts these days from the standard 266-day conception-to-birth timeline.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I start prenatal care?</h3>
            <p className="text-sm text-muted-foreground">
              Contact your healthcare provider as soon as you suspect pregnancy. First prenatal visits typically occur around 8 weeks. Early care ensures healthy development.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are trimesters?</h3>
            <p className="text-sm text-muted-foreground">
              Pregnancy is divided into three trimesters: First (weeks 1-12), Second (weeks 13-26), Third (weeks 27-40). Each has different developmental milestones and symptoms.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
