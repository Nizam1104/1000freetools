import React from "react"

export default function MachNumberCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Mach Number Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter the object's speed and the speed of sound in the medium. You can input speed in various units (m/s, km/h, mph, knots) and the calculator converts automatically. Specify the medium and temperature for accurate sound speed.
          </p>
          <p>
            The calculator applies the Mach number formula: M = v / a, where v is object speed and a is the speed of sound. Mach number is dimensionless - it's a ratio, not a speed itself.
          </p>
          <p>
            Results show the Mach number and classify the flow regime: subsonic (M &lt; 0.8), transonic (0.8-1.2), supersonic (1.2-5), or hypersonic (M &gt; 5). The speed of sound calculation accounts for temperature and medium properties.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Aircraft performance analysis</h3>
            <p className="text-sm text-muted-foreground">
              Determine if an aircraft is flying subsonic or supersonic. Mach number affects drag, lift, and control surface effectiveness.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Rocket and missile design</h3>
            <p className="text-sm text-muted-foreground">
              Calculate Mach number during ascent. Rockets pass through transonic regime where aerodynamic forces are complex and unpredictable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Wind tunnel testing</h3>
            <p className="text-sm text-muted-foreground">
              Match Mach number for scale model testing. Dynamic similarity requires matching Mach number between model and full-scale vehicle.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Bullet and projectile ballistics</h3>
            <p className="text-sm text-muted-foreground">
              Analyze supersonic projectile behavior. Bullets typically travel at Mach 2-3. Shock waves affect trajectory and create sonic booms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Jet engine inlet design</h3>
            <p className="text-sm text-muted-foreground">
              Ensure proper airflow into engines. Supersonic aircraft need inlet designs that slow air to subsonic before it reaches the compressor.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Atmospheric re-entry analysis</h3>
            <p className="text-sm text-muted-foreground">
              Calculate Mach number for spacecraft re-entry. Vehicles enter at hypersonic speeds (Mach 25+), creating intense shock heating.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Speed of sound varies with temperature.</strong>
              In air, sound speed ≈ 331 + 0.6T m/s (T in °C). At sea level (15°C), it's about 340 m/s. At altitude, colder air means slower sound speed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Mach 1 isn't a fixed speed.</strong>
              Mach 1 at sea level is ~767 mph. At 35,000 ft, it's ~660 mph. Aircraft can exceed Mach 1 without changing true airspeed by climbing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Compressibility matters at high Mach.</strong>
              Above M ≈ 0.3, air compressibility affects aerodynamics. Shock waves form at M &gt; 1, dramatically changing flow behavior.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Different regimes have different physics.</strong>
              Subsonic: smooth flow. Transonic: mixed sub/supersonic with shock waves. Supersonic: shock cones. Hypersonic: extreme heating and chemical effects.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> The "sound barrier" isn't a physical barrier. It's the region around Mach 1 where drag increases sharply due to shock wave formation. Modern aircraft pass through it routinely.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What creates a sonic boom?</h3>
            <p className="text-sm text-muted-foreground">
              Shock waves from supersonic objects merge into a cone. When this cone passes over you, you hear a sudden pressure change - the sonic boom.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can Mach number be negative?</h3>
            <p className="text-sm text-muted-foreground">
              No. Mach number is a ratio of speeds, both positive. Direction doesn't matter - only the magnitude of velocity relative to sound speed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is transonic flight problematic?</h3>
            <p className="text-sm text-muted-foreground">
              Some airflow is subsonic, some supersonic. Shock waves form and move unpredictably, causing control issues and buffeting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the highest Mach number achieved?</h3>
            <p className="text-sm text-muted-foreground">
              The X-15 reached Mach 6.7 (crewed). Spacecraft re-enter at Mach 25+. Parker Solar Probe reaches Mach 500+ relative to solar corona.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does Mach number apply underwater?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but sound travels ~4.3× faster in water. A submarine would need ~3300 mph to reach Mach 1. Cavitation is a bigger concern underwater.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's critical Mach number?</h3>
            <p className="text-sm text-muted-foreground">
              The freestream Mach number where airflow first reaches Mach 1 somewhere on the aircraft. Usually occurs on the wing's upper surface.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does altitude affect Mach number?</h3>
            <p className="text-sm text-muted-foreground">
              Colder air at altitude means slower sound speed. At constant true airspeed, Mach number increases with altitude. Pilots monitor Mach at high altitude.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
