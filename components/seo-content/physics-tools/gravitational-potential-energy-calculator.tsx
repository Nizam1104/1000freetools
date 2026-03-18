import React from "react"

export default function GravitationalPotentialEnergyCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Gravitational Potential Energy Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select what you want to calculate: gravitational potential energy (GPE), mass, height, or gravitational acceleration. Enter the known values in their respective fields. The calculator supports various units for each parameter.
          </p>
          <p>
            The calculator applies the formula GPE = m × g × h, where m is mass, g is gravitational acceleration (9.8 m/s² on Earth), and h is height above a reference point. When solving for any variable, it rearranges the formula accordingly.
          </p>
          <p>
            Results display with proper units and scientific notation for very large or small values. The calculation steps show the formula substitution. A diagram illustrates the concept of potential energy relative to a reference level.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Physics homework problems</h3>
            <p className="text-sm text-muted-foreground">
              Solve textbook problems about objects at height. Calculate the energy stored in a raised weight or find the height given energy and mass.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Hydroelectric power estimation</h3>
            <p className="text-sm text-muted-foreground">
              Estimate energy available from water at height. Calculate potential energy of water in a reservoir to understand power generation capacity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Roller coaster design</h3>
            <p className="text-sm text-muted-foreground">
              Calculate energy at different points on the track. The first hill's height determines maximum energy available for the entire ride.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Elevator system planning</h3>
            <p className="text-sm text-muted-foreground">
              Estimate energy needed to lift elevator cars. Calculate potential energy changes to size motors and understand energy recovery opportunities.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Construction crane operations</h3>
            <p className="text-sm text-muted-foreground">
              Determine energy requirements for lifting materials. Calculate work needed to raise steel beams to upper floors of buildings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Pendulum and swing analysis</h3>
            <p className="text-sm text-muted-foreground">
              Analyze energy conversion in swinging objects. At the highest point, all energy is potential; at the bottom, all is kinetic.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Height is relative to a reference point.</strong>
              GPE depends on where you set h = 0. Only changes in GPE matter physically. Choose a convenient reference like ground level.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">g varies slightly by location.</strong>
              Standard gravity is 9.80665 m/s², but it varies from 9.78 to 9.83 m/s² on Earth's surface. Use local value for precision work.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">GPE converts to kinetic energy.</strong>
              When an object falls, GPE becomes kinetic energy. Total mechanical energy is conserved (ignoring air resistance).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Units must be consistent.</strong>
              Use kg for mass, m/s² for gravity, and meters for height to get joules. The calculator handles unit conversions automatically.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For objects falling from rest, you can find impact velocity using energy conservation: mgh = ½mv², so v = √(2gh). Mass cancels out - all objects fall at the same rate in vacuum.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is GPE sometimes negative?</h3>
            <p className="text-sm text-muted-foreground">
              GPE is negative when the object is below your reference point. If ground is h=0, a basement object has negative GPE. Only differences matter.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does GPE depend on the path taken?</h3>
            <p className="text-sm text-muted-foreground">
              No. Gravity is a conservative force. GPE depends only on initial and final heights, not how the object got there.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about objects in space?</h3>
            <p className="text-sm text-muted-foreground">
              For large distances, use the universal gravitation formula: U = -GMm/r. The mgh formula only works near a planet's surface.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can GPE be zero?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, at your chosen reference height. An object at ground level (if ground is h=0) has zero GPE by definition.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does this relate to work?</h3>
            <p className="text-sm text-muted-foreground">
              Work done against gravity equals the change in GPE. Lifting an object stores energy; letting it fall releases that energy as work.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the unit of GPE?</h3>
            <p className="text-sm text-muted-foreground">
              Joules (J) in SI units. 1 J = 1 kg⋅m²/s² = 1 N⋅m. In imperial units, foot-pounds are sometimes used.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does air resistance affect GPE?</h3>
            <p className="text-sm text-muted-foreground">
              No, GPE depends only on position. But air resistance converts some mechanical energy to heat, so total mechanical energy isn't conserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
