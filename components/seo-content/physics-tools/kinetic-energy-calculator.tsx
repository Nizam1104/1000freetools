import React from "react"

export default function KineticEnergyCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Kinetic Energy Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select what you want to calculate: kinetic energy, mass, or velocity. Enter the known values in their respective fields. The calculator supports various units for mass (kg, g, lb) and velocity (m/s, km/h, mph, knots).
          </p>
          <p>
            The calculator applies the classical kinetic energy formula: KE = ½mv², where m is mass and v is velocity. For relativistic speeds (approaching light speed), the relativistic formula is available.
          </p>
          <p>
            Results display in joules with alternative units (calories, kWh, electron-volts) for context. The calculation steps show the formula substitution. A comparison shows equivalent energies (like TNT or food calories) for perspective.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Vehicle crash analysis</h3>
            <p className="text-sm text-muted-foreground">
              Calculate energy in collisions. A car's kinetic energy must be dissipated in a crash. Higher speed means dramatically more energy (v² relationship).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Ballistics calculations</h3>
            <p className="text-sm text-muted-foreground">
              Determine projectile energy. Bullet kinetic energy affects penetration and stopping power. Hunters and ballisticians compare cartridge energies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sports performance analysis</h3>
            <p className="text-sm text-muted-foreground">
              Analyze ball or athlete energy. A baseball's kinetic energy affects how far it travels. Sprinters' kinetic energy relates to their speed and mass.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Wind turbine power estimation</h3>
            <p className="text-sm text-muted-foreground">
              Calculate kinetic energy in moving air. Wind power is proportional to air mass flow rate and v². Doubling wind speed octuples available power.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Physics problem solving</h3>
            <p className="text-sm text-muted-foreground">
              Solve mechanics problems involving energy. Use kinetic energy with potential energy for conservation of energy calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Flywheel energy storage</h3>
            <p className="text-sm text-muted-foreground">
              Design rotating energy storage. Flywheels store kinetic energy. Energy capacity depends on moment of inertia and rotational speed squared.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Kinetic energy scales with velocity squared.</strong>
              Double the speed, quadruple the energy. This is why high-speed crashes are so much more dangerous than low-speed ones.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">KE is always positive.</strong>
              Mass is positive, v² is positive. Direction doesn't matter - a car has the same KE traveling east or west at the same speed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Classical formula works for everyday speeds.</strong>
              Below about 10% of light speed, classical KE = ½mv² is accurate. For relativistic speeds, use KE = (γ - 1)mc².
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Work-energy theorem connects force and KE.</strong>
              Net work done on an object equals its change in kinetic energy. This is often easier than using F = ma for complex problems.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Kinetic energy is frame-dependent. A ball has zero KE in its own frame, but significant KE in the frame of someone it's flying toward. Always specify your reference frame.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is there a ½ in the formula?</h3>
            <p className="text-sm text-muted-foreground">
              It comes from integrating F = ma over distance. Work = ∫F·dx = ∫ma·dx = ½mv². The ½ is a mathematical consequence of the derivation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the unit of kinetic energy?</h3>
            <p className="text-sm text-muted-foreground">
              Joules (J) in SI. 1 J = 1 kg⋅m²/s² = 1 N⋅m. Other units: calories, BTU, kWh, electron-volts. The calculator shows conversions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can kinetic energy be negative?</h3>
            <p className="text-sm text-muted-foreground">
              No. Mass is always positive, and velocity squared is always positive. Kinetic energy is a scalar quantity that's always ≥ 0.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does KE relate to momentum?</h3>
            <p className="text-sm text-muted-foreground">
              Momentum p = mv, KE = ½mv². So KE = p²/(2m). Momentum is a vector, KE is a scalar. Both are conserved in elastic collisions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about rotational kinetic energy?</h3>
            <p className="text-sm text-muted-foreground">
              Rotating objects have KE_rot = ½Iω², where I is moment of inertia and ω is angular velocity. Analogous to linear KE with mass→I, v→ω.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does speed affect KE more than mass?</h3>
            <p className="text-sm text-muted-foreground">
              KE is linear in mass but quadratic in velocity. Doubling mass doubles KE. Doubling speed quadruples KE. Speed is more "expensive" energetically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens to KE when an object stops?</h3>
            <p className="text-sm text-muted-foreground">
              KE converts to other forms: heat (friction), sound, deformation (crashes), or potential energy (climbing a hill). Energy is conserved, just transformed.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
