import React from "react"

export default function CapacitanceCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Capacitance Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select the capacitor geometry: parallel plate, spherical, or cylindrical. Enter the dimensions appropriate for your selection: plate area and separation for parallel plate, inner and outer radii for spherical or cylindrical.
          </p>
          <p>
            Choose the dielectric material between the conductors. The calculator uses the material's relative permittivity (dielectric constant) in the capacitance formula. Common materials like air, paper, glass, and ceramic are included.
          </p>
          <p>
            Results show the capacitance in farads (typically displayed in μF, nF, or pF for practical values). The calculation steps show the formula with your values substituted. A diagram illustrates the capacitor geometry.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Electronic circuit design</h3>
            <p className="text-sm text-muted-foreground">
              Design custom capacitors for specific applications. Calculate required plate area for a target capacitance value in your circuit.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sensor development</h3>
            <p className="text-sm text-muted-foreground">
              Design capacitive sensors for position, pressure, or humidity. Changes in geometry or dielectric create measurable capacitance changes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">High voltage equipment</h3>
            <p className="text-sm text-muted-foreground">
              Design capacitors for power systems. Calculate capacitance of bushings, cables, and other high voltage components for proper system modeling.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Coaxial cable analysis</h3>
            <p className="text-sm text-muted-foreground">
              Calculate capacitance per unit length of coaxial cables. Important for impedance matching and signal transmission characteristics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Physics education</h3>
            <p className="text-sm text-muted-foreground">
              Understand how geometry affects capacitance. Explore why larger plates, closer spacing, and higher-k dielectrics increase capacitance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Energy storage calculations</h3>
            <p className="text-sm text-muted-foreground">
              Estimate energy storage in capacitors. Energy = ½CV². Calculate required capacitance for specific energy storage needs.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Capacitance stores electrical energy.</strong>
              Capacitors store energy in the electric field between conductors. Unlike batteries, they release energy quickly and can charge/discharge rapidly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Dielectric increases capacitance.</strong>
              Insulating materials between plates increase capacitance by the dielectric constant k. Air has k≈1, ceramics can have k in the thousands.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Smaller separation means more capacitance.</strong>
              Capacitance is inversely proportional to plate separation. But too close risks dielectric breakdown and arcing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Formulas assume ideal conditions.</strong>
              Parallel plate formula assumes uniform field (plate size ≫ separation). Edge effects (fringing) increase actual capacitance slightly.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Dielectric strength limits operating voltage. Even with high capacitance, a thin dielectric may break down at low voltage. Check both capacitance and voltage rating for your application.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is a farad?</h3>
            <p className="text-sm text-muted-foreground">
              One farad = one coulomb per volt. It's a huge unit. Practical capacitors are measured in microfarads (μF), nanofarads (nF), or picofarads (pF).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do different shapes have different formulas?</h3>
            <p className="text-sm text-muted-foreground">
              Electric field geometry differs. Parallel plates have uniform field. Spherical and cylindrical have radial fields. Gauss's law gives different results for each.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the best dielectric material?</h3>
            <p className="text-sm text-muted-foreground">
              Depends on application. Ceramic: high k, good for small capacitors. Film: stable, low loss. Electrolytic: very high capacitance but polarized.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can capacitance be negative?</h3>
            <p className="text-sm text-muted-foreground">
              No. Capacitance is always positive. It represents the ability to store charge. Negative values would violate energy conservation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens if I exceed breakdown voltage?</h3>
            <p className="text-sm text-muted-foreground">
              The dielectric ionizes and conducts. This can permanently damage the capacitor. Always operate well below the rated breakdown voltage.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does frequency affect capacitance?</h3>
            <p className="text-sm text-muted-foreground">
              Ideal capacitance is frequency-independent. Real capacitors have parasitic inductance and resistance, making impedance frequency-dependent.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's permittivity?</h3>
            <p className="text-sm text-muted-foreground">
              Permittivity (ε) measures how a material responds to electric fields. ε = ε₀ × εᵣ, where ε₀ is vacuum permittivity and εᵣ is relative permittivity (dielectric constant).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
