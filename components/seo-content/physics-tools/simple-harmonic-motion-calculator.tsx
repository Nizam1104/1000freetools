import React from "react"

export default function SimpleHarmonicMotionCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Simple Harmonic Motion Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select your oscillating system: mass-spring or simple pendulum. For mass-spring, enter the mass and spring constant. For pendulum, enter the length and (optionally) the release angle.
          </p>
          <p>
            The calculator computes the period T, frequency f, and angular frequency ω. For mass-spring: T = 2π√(m/k). For pendulum (small angles): T = 2π√(L/g). You can also calculate displacement, velocity, and acceleration at any time.
          </p>
          <p>
            Results show all oscillation parameters with units. Graphs display position, velocity, and acceleration versus time. The phase relationships are visible: velocity leads position by 90°, acceleration is 180° out of phase with position.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Clock and timekeeping design</h3>
            <p className="text-sm text-muted-foreground">
              Design pendulum clocks. Pendulum length determines period. A 1-meter pendulum has ~2 second period, perfect for clock mechanisms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Vehicle suspension analysis</h3>
            <p className="text-sm text-muted-foreground">
              Analyze car suspension oscillations. Spring constant and vehicle mass determine natural frequency. Avoid resonance with road inputs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Seismometer calibration</h3>
            <p className="text-sm text-muted-foreground">
              Understand earthquake detection. Seismometers use mass-spring systems tuned to detect ground motion at specific frequencies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building vibration analysis</h3>
            <p className="text-sm text-muted-foreground">
              Calculate natural frequency of structures. Buildings oscillate during earthquakes. Engineers design to avoid resonance with seismic frequencies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Musical instrument physics</h3>
            <p className="text-sm text-muted-foreground">
              Analyze vibrating strings and air columns. String instruments follow similar harmonic motion principles. Frequency determines pitch.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Physics education labs</h3>
            <p className="text-sm text-muted-foreground">
              Verify SHM equations experimentally. Measure period for different masses or lengths. Compare experimental results to theoretical predictions.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Period is independent of amplitude (for small oscillations).</strong>
              Galileo discovered this for pendulums. A pendulum's period doesn't depend on swing size (for small angles). This isochronism enables accurate clocks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Pendulum formula assumes small angles.</strong>
              T = 2π√(L/g) is accurate for angles &lt; 15°. Larger angles require correction. At 30°, period is ~1.7% longer than the formula predicts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Mass doesn't affect pendulum period.</strong>
              Heavier pendulums swing at the same rate as light ones (same length). Gravity accelerates all masses equally.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Real systems have damping.</strong>
              Friction and air resistance cause amplitude to decay. The period is slightly affected. Pure SHM assumes no damping.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For large pendulum amplitudes, use the correction: T ≈ 2π√(L/g) × [1 + θ₀²/16], where θ₀ is in radians. At 30° (0.52 rad), this adds about 1.7% to the period.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between period and frequency?</h3>
            <p className="text-sm text-muted-foreground">
              Period (T) is time per cycle (seconds). Frequency (f) is cycles per second (Hz). They're reciprocals: f = 1/T.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why doesn't mass affect pendulum period?</h3>
            <p className="text-sm text-muted-foreground">
              Gravity provides restoring force proportional to mass (F = mg sin θ). In F = ma, mass cancels. All objects fall at the same rate.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's angular frequency?</h3>
            <p className="text-sm text-muted-foreground">
              ω = 2πf = 2π/T. Measured in radians/second. One complete cycle is 2π radians. Useful in equations: x(t) = A cos(ωt + φ).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How long should a 1-second pendulum be?</h3>
            <p className="text-sm text-muted-foreground">
              For T = 2 s (1 s each way), L = gT²/(4π²) ≈ 1 meter. Grandfather clocks use ~1 m pendulums for this reason.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens at resonance?</h3>
            <p className="text-sm text-muted-foreground">
              Driving at the natural frequency causes amplitude to grow dramatically. This can be useful (pushing swings) or destructive (bridge collapse).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does gravity affect spring oscillations?</h3>
            <p className="text-sm text-muted-foreground">
              Gravity shifts the equilibrium position but doesn't change the period. A vertical spring oscillates at the same frequency as a horizontal one.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the energy in SHM?</h3>
            <p className="text-sm text-muted-foreground">
              Total energy is constant: E = ½kA². Energy oscillates between kinetic (maximum at equilibrium) and potential (maximum at extremes).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
