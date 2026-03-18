import React from "react"

export default function CenterOfMassCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Center of Mass Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your system of point masses. For each mass, input the mass value and its coordinates (x for 1D, x and y for 2D, or x, y, z for 3D). Add as many masses as needed - the calculator handles systems from 2 to hundreds of point masses.
          </p>
          <p>
            The calculator applies the center of mass formula: x_cm = Σ(mᵢ × xᵢ) / Σmᵢ for each coordinate dimension. This finds the weighted average position, where each position is weighted by its mass.
          </p>
          <p>
            Results show the center of mass coordinates with a visual diagram. For 2D systems, a plot displays all masses and the center of mass point. The calculation steps show the sum of moments and total mass.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Balancing and stability analysis</h3>
            <p className="text-sm text-muted-foreground">
              Find where to support an object for balance. The center of mass must be directly above the support point for stable equilibrium.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Vehicle design and handling</h3>
            <p className="text-sm text-muted-foreground">
              Calculate car or motorcycle center of gravity. Low, centered mass improves handling. High center of mass increases rollover risk.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Robotics and mechanism design</h3>
            <p className="text-sm text-muted-foreground">
              Analyze robot arm balance and motor torque requirements. Center of mass position affects actuator sizing and control algorithms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sports biomechanics</h3>
            <p className="text-sm text-muted-foreground">
              Study athlete body positions. Divers and gymnasts manipulate their center of mass to control rotation and landing position.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Spacecraft attitude control</h3>
            <p className="text-sm text-muted-foreground">
              Determine satellite center of mass for stability. Thrusters and reaction wheels are positioned relative to center of mass for efficient control.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Structural engineering</h3>
            <p className="text-sm text-muted-foreground">
              Calculate building or bridge center of mass. Important for seismic design - asymmetric mass distribution causes torsional earthquake response.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Center of mass is the balance point.</strong>
              If you support an object at its center of mass, it balances in any orientation. Gravity creates no net torque about this point.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Center of mass can be outside the object.</strong>
              For a donut, ring, or boomerang, the center of mass is in empty space. It's a mathematical point, not necessarily within material.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">For uniform objects, it's the geometric center.</strong>
              A uniform sphere, cube, or rod has center of mass at its geometric center. Non-uniform density shifts it toward heavier regions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Center of mass and center of gravity differ slightly.</strong>
              In uniform gravitational fields, they're the same. In varying fields (like satellites), they can differ slightly.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For complex objects, break them into simple shapes. Find each shape's center of mass, treat as point masses, then calculate the combined center of mass using this calculator.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How is center of mass different from centroid?</h3>
            <p className="text-sm text-muted-foreground">
              Centroid is the geometric center (average position). Center of mass is the mass-weighted average. They're the same for uniform density objects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does center of mass matter for rotation?</h3>
            <p className="text-sm text-muted-foreground">
              Objects naturally rotate about their center of mass. Applying force at the center of mass causes translation without rotation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for continuous objects?</h3>
            <p className="text-sm text-muted-foreground">
              Approximate by dividing into small pieces. For exact results with simple shapes, use calculus: integrate r × dm over the object.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about systems in motion?</h3>
            <p className="text-sm text-muted-foreground">
              The center of mass follows a simple trajectory even if individual parts move complexly. External forces act as if applied at the center of mass.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I find center of mass experimentally?</h3>
            <p className="text-sm text-muted-foreground">
              Suspend the object from two different points. Draw vertical lines from each suspension point. Where lines intersect is the center of mass.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does center of mass change with orientation?</h3>
            <p className="text-sm text-muted-foreground">
              No, center of mass is fixed relative to the object (for rigid bodies). But its position in space changes as the object moves.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the relationship to momentum?</h3>
            <p className="text-sm text-muted-foreground">
              Total momentum equals total mass times center of mass velocity. The center of mass moves as if all mass were concentrated there.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
