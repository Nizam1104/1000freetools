import React from "react"

export default function HalfLifeCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Half-Life Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select what you want to calculate: remaining amount, elapsed time, half-life, or initial amount. Enter the known values including the initial quantity, half-life of the substance, and time elapsed (or remaining amount).
          </p>
          <p>
            The calculator applies the radioactive decay formula: N(t) = N₀ × (1/2)^(t/t₁/₂), where N₀ is initial amount, N(t) is remaining amount, t is elapsed time, and t₁/₂ is the half-life. Alternative forms using decay constant λ are also available.
          </p>
          <p>
            Results show the calculated value with proper units. A decay curve graph shows how the amount decreases over multiple half-lives. The calculator also shows how many half-lives have elapsed and the percentage remaining.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Radiometric dating</h3>
            <p className="text-sm text-muted-foreground">
              Calculate ages of archaeological samples. Carbon-14 dating uses 5,730 year half-life. Measure remaining C-14 to determine how long ago an organism died.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Medical isotope dosing</h3>
            <p className="text-sm text-muted-foreground">
              Plan nuclear medicine procedures. Radioactive tracers decay during procedures. Calculate remaining activity to ensure proper imaging doses.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Nuclear waste management</h3>
            <p className="text-sm text-muted-foreground">
              Estimate how long waste remains hazardous. Plutonium-239 has 24,000 year half-life. Calculate storage time needed for safe disposal.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Radiation therapy planning</h3>
            <p className="text-sm text-muted-foreground">
              Calculate radiation dose from implanted seeds. Radioactive seeds decay during treatment. Account for decreasing activity in dose calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Geological age determination</h3>
            <p className="text-sm text-muted-foreground">
              Date rocks using uranium-lead or potassium-argon methods. Long half-lives (millions to billions of years) date Earth's oldest materials.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Physics and chemistry education</h3>
            <p className="text-sm text-muted-foreground">
              Solve nuclear decay problems. Calculate remaining amounts, elapsed times, or half-lives for various radioactive isotopes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Half-life is constant for each isotope.</strong>
              Temperature, pressure, and chemical state don't affect nuclear decay. Each radioactive isotope has a fixed, unchangeable half-life.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Decay is exponential, not linear.</strong>
              After one half-life, 50% remains. After two, 25% (not 0%). After ten, about 0.1%. The amount approaches zero but never reaches it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Half-life relates to decay constant.</strong>
              λ = ln(2)/t₁/₂ ≈ 0.693/t₁/₂. The decay constant appears in the differential equation: dN/dt = -λN.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Decay is random but predictable statistically.</strong>
              You can't predict when a specific atom decays. But for large numbers, the half-life precisely predicts the fraction that decays.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> After 10 half-lives, only 0.1% remains. After 20 half-lives, only 0.0001% remains. For practical purposes, a sample is "gone" after about 10-20 half-lives.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is half-life?</h3>
            <p className="text-sm text-muted-foreground">
              Time for half the radioactive atoms in a sample to decay. It's a statistical measure - after one half-life, half the atoms remain on average.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can half-life be changed?</h3>
            <p className="text-sm text-muted-foreground">
              No. Nuclear decay rates are fundamental constants. Unlike chemical reactions, they're unaffected by temperature, pressure, or chemical bonds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the shortest/longest half-life?</h3>
            <p className="text-sm text-muted-foreground">
              Shortest: fractions of a second for highly unstable isotopes. Longest: tellurium-128 at 2.2 × 10²⁴ years (trillions of times the age of the universe).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does carbon dating work?</h3>
            <p className="text-sm text-muted-foreground">
              Living things maintain constant C-14/C-12 ratio. After death, C-14 decays (5,730 year half-life). Measuring the ratio reveals time since death.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the decay constant?</h3>
            <p className="text-sm text-muted-foreground">
              λ = probability of decay per unit time. Related to half-life by λ = ln(2)/t₁/₂. Appears in the exponential: N(t) = N₀e^(-λt).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why use half-life instead of decay constant?</h3>
            <p className="text-sm text-muted-foreground">
              Half-life is more intuitive. "5,730 years" is easier to grasp than "λ = 1.21 × 10⁻⁴ per year." Both contain the same information.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's mean lifetime?</h3>
            <p className="text-sm text-muted-foreground">
              Average time an atom survives before decaying. τ = 1/λ = t₁/₂/ln(2) ≈ 1.44 × t₁/₂. Used in some physics calculations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
