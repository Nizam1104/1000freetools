import React from "react"

export default function ProjectileMotionSimulatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Projectile Motion Simulator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter the launch parameters: initial velocity, launch angle, and initial height. Adjust gravity for different planets or celestial bodies. Optionally include air resistance for more realistic trajectories.
          </p>
          <p>
            The simulator solves the equations of motion: x(t) = v₀cos(θ)t for horizontal position and y(t) = h₀ + v₀sin(θ)t - ½gt² for vertical position. With air resistance, numerical integration is used.
          </p>
          <p>
            Results show the trajectory curve, time of flight, maximum height, and horizontal range. Key points are marked on the graph. Velocity components and total velocity are displayed throughout the flight.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sports performance analysis</h3>
            <p className="text-sm text-muted-foreground">
              Analyze ball trajectories in baseball, golf, or soccer. Find optimal launch angles for maximum distance. Understand how initial speed affects range.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Physics education</h3>
            <p className="text-sm text-muted-foreground">
              Visualize projectile motion concepts. Students see how angle affects range, how gravity shapes the trajectory, and why 45° gives maximum range.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Artillery and ballistics</h3>
            <p className="text-sm text-muted-foreground">
              Calculate projectile trajectories for targeting. Military applications require precise range calculations accounting for elevation and atmospheric conditions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Water fountain design</h3>
            <p className="text-sm text-muted-foreground">
              Design decorative water features. Calculate where water jets will land based on nozzle angle and pressure. Create aesthetically pleasing arc patterns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fire safety planning</h3>
            <p className="text-sm text-muted-foreground">
              Determine water stream reach for firefighting. Calculate how high and far fire hoses can project water for effective fire suppression.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Space mission planning</h3>
            <p className="text-sm text-muted-foreground">
              Understand basic orbital mechanics. While orbits require more complex calculations, projectile motion is the foundation for understanding trajectories.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Horizontal and vertical motions are independent.</strong>
              Gravity only affects vertical motion. Horizontal velocity stays constant (ignoring air resistance). This independence simplifies analysis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">45° gives maximum range (on level ground).</strong>
              For a given speed, 45° launch angle achieves maximum horizontal distance. Complementary angles (30° and 60°) give the same range.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Trajectory is parabolic (without air resistance).</strong>
              The path follows a parabola: y = ax² + bx + c. This results from constant horizontal velocity and constant vertical acceleration.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Air resistance significantly affects real projectiles.</strong>
              Drag reduces range and maximum height. Fast-moving or light objects are most affected. Baseballs, golf balls, and arrows all experience significant drag.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For elevated launches, optimal angle is less than 45°. When launching from a cliff, aim slightly lower than 45° for maximum range. The simulator shows the exact optimum for your conditions.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is 45° the optimal angle?</h3>
            <p className="text-sm text-muted-foreground">
              At 45°, you balance vertical time-of-flight with horizontal speed. Lower angles have more horizontal speed but less time. Higher angles have more time but less horizontal speed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does mass affect the trajectory?</h3>
            <p className="text-sm text-muted-foreground">
              Without air resistance, no. All objects fall at the same rate regardless of mass. With air resistance, heavier objects are less affected by drag.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the velocity at maximum height?</h3>
            <p className="text-sm text-muted-foreground">
              Vertical velocity is zero at the peak. Horizontal velocity remains v₀cos(θ). Total velocity is minimum at the peak (just the horizontal component).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I find time of flight?</h3>
            <p className="text-sm text-muted-foreground">
              For level ground: t = 2v₀sin(θ)/g. Time up equals time down. For elevated launches, solve y(t) = 0 using the quadratic formula.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about on the Moon?</h3>
            <p className="text-sm text-muted-foreground">
              Lower gravity (1.62 m/s² vs 9.8 m/s²) means longer flight time and greater range. Projectiles travel about 6× farther on the Moon.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do complementary angles give same range?</h3>
            <p className="text-sm text-muted-foreground">
              sin(2θ) = sin(2(90°-θ)). The range formula R = v₀²sin(2θ)/g gives the same value for 30° and 60°, 20° and 70°, etc.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does air resistance change things?</h3>
            <p className="text-sm text-muted-foreground">
              Drag reduces range, lowers maximum height, and makes the descent steeper than the ascent. Optimal angle becomes less than 45°. Terminal velocity limits speed.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
