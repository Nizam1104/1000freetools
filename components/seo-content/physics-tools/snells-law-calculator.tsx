import React from "react"

export default function SnellsLawCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Snell's Law Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select what you want to calculate: angle of refraction, angle of incidence, or refractive index of either medium. Enter the known values for the incident medium (n₁), refracting medium (n₂), and the known angle.
          </p>
          <p>
            The calculator applies Snell's Law: n₁ × sin(θ₁) = n₂ × sin(θ₂). This relates the angles and refractive indices when light crosses a boundary between two materials. The calculator rearranges to solve for your unknown.
          </p>
          <p>
            Results show the calculated angle or index with proper units. A ray diagram illustrates the light path, showing incident ray, normal line, and refracted ray. Critical angle for total internal reflection is also calculated when applicable.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Lens design and analysis</h3>
            <p className="text-sm text-muted-foreground">
              Calculate how light bends at lens surfaces. Essential for designing eyeglasses, camera lenses, microscopes, and telescopes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fiber optic communications</h3>
            <p className="text-sm text-muted-foreground">
              Understand total internal reflection in optical fibers. Light stays trapped in the core when incident angle exceeds critical angle.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Underwater vision correction</h3>
            <p className="text-sm text-muted-foreground">
              Calculate why objects look different underwater. Water's refractive index changes how light enters your eye, blurring vision without a mask.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Prism dispersion calculations</h3>
            <p className="text-sm text-muted-foreground">
              Analyze how prisms separate white light into colors. Different wavelengths refract at slightly different angles, creating rainbows.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Gemstone optics</h3>
            <p className="text-sm text-muted-foreground">
              Understand diamond brilliance. High refractive index and precise cutting angles maximize internal reflection and light return.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Atmospheric refraction</h3>
            <p className="text-sm text-muted-foreground">
              Calculate why the sun appears above the horizon after sunset. Air density gradients bend light, extending daylight by several minutes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Angles are measured from the normal.</strong>
              The normal is perpendicular to the surface, not the surface itself. This is a common source of errors in manual calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Light bends toward normal in denser media.</strong>
              When entering a higher-n material, light slows and bends toward the normal. Exiting to lower-n, it speeds up and bends away.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Total internal reflection has conditions.</strong>
              Occurs only when going from higher to lower index, and angle exceeds critical angle. Critical angle: θc = arcsin(n₂/n₁).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Refractive index depends on wavelength.</strong>
              Blue light refracts more than red (dispersion). This is why prisms create rainbows and lenses have chromatic aberration.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When light enters perpendicular to the surface (angle = 0°), there's no bending regardless of refractive indices. The ray continues straight, just at a different speed.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is refractive index?</h3>
            <p className="text-sm text-muted-foreground">
              n = c/v, the ratio of light speed in vacuum to speed in the material. Vacuum n=1, air ≈1.0003, water ≈1.33, glass ≈1.5, diamond ≈2.42.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does light bend at boundaries?</h3>
            <p className="text-sm text-muted-foreground">
              Light changes speed in different materials. If it hits at an angle, one side of the wavefront slows first, causing the wave to turn.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can refractive index be less than 1?</h3>
            <p className="text-sm text-muted-foreground">
              Not for normal materials. Phase velocity can exceed c in some cases, but information still travels at or below c. Metamaterials can have negative n.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens at the critical angle?</h3>
            <p className="text-sm text-muted-foreground">
              Refracted ray travels along the boundary (90° from normal). Beyond critical angle, all light reflects internally - no transmission.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does Snell's Law work for sound?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, any wave phenomenon follows Snell's Law. Sound waves refract at boundaries between materials with different sound speeds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do pools look shallower than they are?</h3>
            <p className="text-sm text-muted-foreground">
              Light from the bottom bends away from normal exiting water. Your brain traces rays back straight, making the bottom appear closer than it is.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum refraction angle?</h3>
            <p className="text-sm text-muted-foreground">
              For light entering from air, maximum refraction is the critical angle (about 49° for water, 42° for typical glass). Beyond that, total internal reflection occurs.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
