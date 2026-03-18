import React from "react"

export default function CoulombsLawCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Coulomb's Law Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter the magnitudes of both charges (q₁ and q₂) and the distance between them. Charges can be positive or negative. The calculator accepts values in coulombs, microcoulombs, nanocoulombs, or elementary charge units.
          </p>
          <p>
            The calculator applies Coulomb's Law: F = k|q₁q₂|/r², where k is Coulomb's constant (8.99 × 10⁹ N⋅m²/C²), q₁ and q₂ are the charges, and r is the separation distance. The force direction (attractive or repulsive) is determined by the charge signs.
          </p>
          <p>
            Results show the force magnitude in newtons and indicate whether the force is attractive (opposite charges) or repulsive (like charges). A diagram shows the charges with force vectors. Electric field at each charge location is also calculated.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Physics homework problems</h3>
            <p className="text-sm text-muted-foreground">
              Solve electrostatics problems. Calculate forces between point charges, find equilibrium positions, or analyze charge configurations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Atomic structure analysis</h3>
            <p className="text-sm text-muted-foreground">
              Calculate electron-proton attraction in atoms. The electrostatic force binds electrons to nuclei. Compare to gravitational force (electrostatic is 10³⁹ times stronger).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Electrostatic precipitator design</h3>
            <p className="text-sm text-muted-foreground">
              Design air pollution control devices. Charged plates attract and capture particles. Calculate forces on charged dust particles.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Particle accelerator physics</h3>
            <p className="text-sm text-muted-foreground">
              Analyze charged particle interactions. Beam dynamics depend on electrostatic repulsion between particles in the beam.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Static electricity analysis</h3>
            <p className="text-sm text-muted-foreground">
              Understand static cling and shocks. Calculate forces between charged objects. Explain why charged balloons stick to walls.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Molecular bonding estimation</h3>
            <p className="text-sm text-muted-foreground">
              Estimate ionic bond strength. Electrostatic attraction between Na⁺ and Cl⁻ holds salt crystals together. Calculate bond energies.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Force follows inverse-square law.</strong>
              Double the distance, force drops to 1/4. Triple the distance, force drops to 1/9. This is the same mathematical form as gravity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Like charges repel, opposites attract.</strong>
              Positive-positive or negative-negative: repulsion. Positive-negative: attraction. The calculator determines this from charge signs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Coulomb's law applies to point charges.</strong>
              For extended objects, integrate over the charge distribution. Spherical charge distributions act like point charges at their center.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Force pairs are equal and opposite.</strong>
              Charge 1 exerts force F on charge 2. Charge 2 exerts force -F on charge 1. Newton's third law holds for electrostatic forces.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For multiple charges, use superposition. Calculate the force from each charge separately, then add the force vectors. Net force is the vector sum of all individual forces.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's Coulomb's constant?</h3>
            <p className="text-sm text-muted-foreground">
              k = 8.99 × 10⁹ N⋅m²/C². It's related to the permittivity of free space: k = 1/(4πε₀). Determines the strength of electrostatic interactions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How strong is the electrostatic force?</h3>
            <p className="text-sm text-muted-foreground">
              Extremely strong. Two 1 C charges 1 m apart exert 9 billion newtons of force. Typical static charges are microcoulombs, giving more modest forces.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's an elementary charge?</h3>
            <p className="text-sm text-muted-foreground">
              e = 1.602 × 10⁻¹⁹ C. The charge of one proton (positive) or electron (negative). All charges are integer multiples of e.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does the medium affect the force?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. In a material, F = k|q₁q₂|/(εᵣr²), where εᵣ is relative permittivity. Water (εᵣ ≈ 80) reduces the force by 80× compared to vacuum.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does this compare to gravity?</h3>
            <p className="text-sm text-muted-foreground">
              Electrostatic force is vastly stronger. Between proton and electron, electrostatic force is ~10³⁹ times stronger than gravitational attraction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can charges be fractional?</h3>
            <p className="text-sm text-muted-foreground">
              Quarks have fractional charges (±1/3 e, ±2/3 e), but they're never found isolated. All observable particles have integer multiples of e.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the electric field?</h3>
            <p className="text-sm text-muted-foreground">
              E = F/q = kQ/r². Force per unit charge. Electric field exists around any charge. Other charges feel force F = qE in the field.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
