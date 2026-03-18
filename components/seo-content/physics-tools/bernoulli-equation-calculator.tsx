import React from "react"

export default function BernoulliEquationCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Bernoulli Equation Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select what you want to calculate: pressure, velocity, or height at point 2. Enter the known values for both points along the streamline: pressure, velocity, height, and fluid density.
          </p>
          <p>
            The calculator applies Bernoulli's equation: P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂. This expresses conservation of energy for ideal fluid flow. The calculator rearranges to solve for your unknown variable.
          </p>
          <p>
            Results display with proper units and show the calculation steps. A diagram illustrates the two points along the flow path. The calculator also shows the pressure, kinetic, and potential energy terms separately.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Pipe flow analysis</h3>
            <p className="text-sm text-muted-foreground">
              Calculate pressure changes in pipes of varying diameter. As water speeds up in narrow sections, pressure drops - important for pipe design.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Airplane wing lift estimation</h3>
            <p className="text-sm text-muted-foreground">
              Understand how wing shape creates lift. Faster airflow over the curved top creates lower pressure, generating upward force.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Venturi meter calculations</h3>
            <p className="text-sm text-muted-foreground">
              Design flow measurement devices. Pressure difference in a constriction reveals flow rate. Used in carburetors and industrial flow meters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Water tower pressure analysis</h3>
            <p className="text-sm text-muted-foreground">
              Calculate water pressure at different elevations. Higher towers provide more pressure to distribution systems through gravitational head.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Spray bottle and atomizer design</h3>
            <p className="text-sm text-muted-foreground">
              Understand how fast air creates low pressure to draw liquid up. Bernoulli effect enables spray bottles, paint sprayers, and perfume atomizers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fire hose nozzle calculations</h3>
            <p className="text-sm text-muted-foreground">
              Determine exit velocity from nozzle pressure. Firefighters need to know how nozzle settings affect water stream reach and impact.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Bernoulli applies to ideal fluids.</strong>
              Assumes no viscosity, incompressible flow, steady state. Real fluids have friction losses. Use for approximate calculations or add loss terms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Points must be on the same streamline.</strong>
              Bernoulli's equation applies along a flow path. Don't compare points in separate, unconnected flow streams.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Pressure-speed tradeoff is key.</strong>
              Higher velocity means lower pressure (and vice versa) when height is constant. This inverse relationship drives many fluid phenomena.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Units must be consistent.</strong>
              Use SI units: Pascals for pressure, m/s for velocity, meters for height, kg/m³ for density. The calculator handles conversions.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For horizontal flow (h₁ = h₂), Bernoulli simplifies to P₁ + ½ρv₁² = P₂ + ½ρv₂². This shows directly that pressure drops where velocity increases - the key to understanding many fluid devices.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does faster flow mean lower pressure?</h3>
            <p className="text-sm text-muted-foreground">
              Energy is conserved. Kinetic energy (½ρv²) increases, so pressure energy must decrease. Think of pressure as stored energy available to accelerate fluid.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for gases?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, for low-speed gas flow where density changes are small (Mach &lt; 0.3). For high-speed compressible flow, use compressible flow equations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about friction losses?</h3>
            <p className="text-sm text-muted-foreground">
              Real pipes have friction. Add a head loss term: P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂ + losses. Use Darcy-Weisbach equation for losses.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work for turbulent flow?</h3>
            <p className="text-sm text-muted-foreground">
              Bernoulli applies to individual streamlines even in turbulent flow, but you need time-averaged values. For engineering, use with loss coefficients.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's dynamic pressure?</h3>
            <p className="text-sm text-muted-foreground">
              Dynamic pressure is ½ρv² - the kinetic energy per unit volume. Total pressure = static pressure + dynamic pressure (for horizontal flow).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does this relate to continuity equation?</h3>
            <p className="text-sm text-muted-foreground">
              Continuity (A₁v₁ = A₂v₂) gives velocity changes from area changes. Bernoulli then gives pressure changes from velocity changes. Use both together.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do shower curtains billow inward?</h3>
            <p className="text-sm text-muted-foreground">
              Fast-moving water creates fast air flow inside the shower. Lower pressure inside pulls the curtain inward. Classic Bernoulli effect demonstration.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
