import React from "react"

export default function MagneticForceOnWireCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Magnetic Force on Wire Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter the current flowing through the wire, the length of wire in the magnetic field, the magnetic field strength, and the angle between the current direction and magnetic field.
          </p>
          <p>
            The calculator applies the magnetic force formula: F = BIL sin(θ), where B is magnetic field strength, I is current, L is wire length, and θ is the angle between current and field directions. Maximum force occurs at 90° (perpendicular).
          </p>
          <p>
            Results show the force magnitude in newtons. The direction is determined by the right-hand rule (shown in a diagram). Calculation steps display the formula with your values substituted.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Electric motor design</h3>
            <p className="text-sm text-muted-foreground">
              Calculate force on motor windings. Current-carrying coils in magnetic fields experience torque. This force drives motor rotation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Loudspeaker analysis</h3>
            <p className="text-sm text-muted-foreground">
              Understand speaker operation. Audio current in the voice coil creates force that moves the cone, producing sound waves.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Railgun calculations</h3>
            <p className="text-sm text-muted-foreground">
              Analyze electromagnetic projectile accelerators. Massive current through rails creates magnetic force that accelerates the projectile to high speeds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Galvanometer and ammeter design</h3>
            <p className="text-sm text-muted-foreground">
              Design current-measuring instruments. Magnetic force on a coil deflects a pointer proportional to current. Foundation of analog meters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Magnetic levitation systems</h3>
            <p className="text-sm text-muted-foreground">
              Calculate lifting force in maglev systems. Current in guideway coils creates magnetic force that levitates and propels trains.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Physics education demonstrations</h3>
            <p className="text-sm text-muted-foreground">
              Demonstrate motor effect in classrooms. A wire jumping between magnet poles when current flows shows the force dramatically.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Force is maximum when perpendicular.</strong>
              sin(90°) = 1 gives maximum force. Parallel wire (θ = 0°) feels no force. Angle dramatically affects the force magnitude.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Direction follows right-hand rule.</strong>
              Point fingers in current direction, curl toward field direction. Thumb points in force direction. Force is perpendicular to both I and B.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Force acts on the wire, not the field.</strong>
              The magnetic field exerts force on moving charges (current). By Newton's third law, the wire exerts equal opposite force on the magnet.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Only the perpendicular component matters.</strong>
              F = BIL sin(θ) = (B sin θ)IL. Only the component of B perpendicular to the wire contributes to force.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For a current loop in uniform field, net force is zero but there's a torque. This torque rotates electric motor armatures. Force on opposite sides of the loop are equal and opposite, creating a couple.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is there no force when wire is parallel to field?</h3>
            <p className="text-sm text-muted-foreground">
              Magnetic force acts perpendicular to both current and field. When they're parallel, there's no perpendicular direction - the cross product is zero.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the unit of magnetic field?</h3>
            <p className="text-sm text-muted-foreground">
              Tesla (T) in SI. 1 T = 1 N/(A⋅m). Earth's field is ~50 μT. Strong magnets are 1-10 T. MRI machines use 1.5-7 T fields.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does the wire material matter?</h3>
            <p className="text-sm text-muted-foreground">
              Not for the force calculation - only current matters. But material affects resistance, which determines how much current flows for a given voltage.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if the field isn't uniform?</h3>
            <p className="text-sm text-muted-foreground">
              Integrate F = I ∫(dl × B) along the wire. For simple non-uniform fields, divide the wire into segments and sum the forces.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can this force do work?</h3>
            <p className="text-sm text-muted-foreground">
              The magnetic force itself doesn't do work on charged particles (force is perpendicular to motion). But it can do work on the wire as a whole.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How is this related to Lorentz force?</h3>
            <p className="text-sm text-muted-foreground">
              This is the macroscopic version. Lorentz force F = q(v × B) acts on individual charges. Sum over all moving charges gives F = I(L × B).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens with AC current?</h3>
            <p className="text-sm text-muted-foreground">
              Force oscillates at twice the AC frequency (since force depends on current magnitude, not direction). This causes the hum in transformers.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
