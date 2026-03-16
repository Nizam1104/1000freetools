import React from "react"

export default function PhysicsCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Physics Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select the type of calculation you need from the dropdown. The calculator shows the formula and input fields for that specific equation. Enter your known values with their units, then click Calculate.
          </p>
          <p>
            The result appears with the correct unit and a step-by-step breakdown showing how the answer was derived. Each step displays the formula, the substitution of your values, and the final calculation.
          </p>
          <p>
            Ten calculations are available: velocity, acceleration, force, kinetic energy, potential energy, momentum, power, pressure, density, and work. Each uses standard SI units (meters, kilograms, seconds).
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Homework problem checking</h3>
            <p className="text-sm text-muted-foreground">
              You solved a physics problem but aren't sure about the answer. Plug in the given values to verify your work before submitting the assignment.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Lab report calculations</h3>
            <p className="text-sm text-muted-foreground">
              Your experiment collected distance and time data. Use the velocity calculator to process multiple trials quickly without manual computation errors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Engineering quick estimates</h3>
            <p className="text-sm text-muted-foreground">
              You need a rough force calculation for a design decision. Enter mass and acceleration to get instant feedback without opening complex simulation software.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Studying for exams</h3>
            <p className="text-sm text-muted-foreground">
              Practice problems become learning tools when you can see each step. Use the step-by-step output to understand where your approach differs from the correct method.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Science fair project analysis</h3>
            <p className="text-sm text-muted-foreground">
              Your project involves calculating energy or momentum. Run multiple scenarios to find patterns and support your hypothesis with real numbers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Teaching physics concepts</h3>
            <p className="text-sm text-muted-foreground">
              Demonstrate how changing one variable affects the result. Show students what happens to kinetic energy when velocity doubles (it quadruples).
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Units must match the formula.</strong>
              All calculations use SI units: meters, kilograms, seconds. Enter distance in meters, not feet. Convert before calculating or your answer will be wrong.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Gravity defaults to Earth standard.</strong>
              Potential energy uses 9.81 m/s² for gravity unless you change it. For Moon calculations, use 1.62 m/s². For Mars, use 3.71 m/s².
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Work calculation assumes constant force.</strong>
              The work formula W = F × d × cos(θ) assumes force doesn't change over distance. Variable force requires calculus integration.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Angle is in degrees, not radians.</strong>
              The work calculation takes angle in degrees. Zero degrees means force and motion are in the same direction (maximum work).
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Kinetic energy scales with velocity squared. Doubling speed quadruples energy. This is why high-speed crashes are so much more dangerous than low-speed ones.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for non-SI units?</h3>
            <p className="text-sm text-muted-foreground">
              Not directly. Convert to SI first, then calculate. For example, convert pounds to kilograms (divide by 2.2) and feet to meters (multiply by 0.3048).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between momentum and kinetic energy?</h3>
            <p className="text-sm text-muted-foreground">
              Momentum (p = mv) is linear with velocity. Kinetic energy (KE = ½mv²) scales with velocity squared. Both describe motion but answer different questions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is my acceleration negative?</h3>
            <p className="text-sm text-muted-foreground">
              Negative acceleration means slowing down or accelerating in the opposite direction. If final velocity is less than initial velocity, acceleration is negative.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this handle projectile motion?</h3>
            <p className="text-sm text-muted-foreground">
              Not directly. Projectile motion requires separate horizontal and vertical calculations. Use velocity for horizontal motion and acceleration (gravity) for vertical.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does pressure measure?</h3>
            <p className="text-sm text-muted-foreground">
              Pressure is force per unit area (P = F/A). One Pascal equals one Newton per square meter. Higher pressure means the same force concentrated on a smaller area.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I calculate with zero values?</h3>
            <p className="text-sm text-muted-foreground">
              You can enter zero, but some results become zero or undefined. Zero mass gives zero force. Zero time in velocity gives undefined (division by zero).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this accurate enough for lab work?</h3>
            <p className="text-sm text-muted-foreground">
              The math is precise, but real-world measurements have uncertainty. Use this for calculations, but account for measurement error in your final results.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
