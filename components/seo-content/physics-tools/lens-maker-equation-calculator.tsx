import React from "react"

export default function LensMakerEquationCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Lens Maker Equation Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter the radii of curvature for both lens surfaces (R₁ and R₂), the lens material's refractive index, and the lens thickness. Use positive values for convex surfaces and negative for concave surfaces (sign convention matters).
          </p>
          <p>
            The calculator applies the lens maker equation: 1/f = (n-1)[1/R₁ - 1/R₂ + (n-1)d/(nR₁R₂)], where f is focal length, n is refractive index, R₁ and R₂ are surface radii, and d is thickness. For thin lenses, the thickness term is negligible.
          </p>
          <p>
            Results show the focal length with sign (positive for converging, negative for diverging). Lens power in diopters is also calculated. A ray diagram shows how parallel rays converge or diverge through the lens.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Eyeglass prescription design</h3>
            <p className="text-sm text-muted-foreground">
              Design corrective lenses. Optometrists specify power in diopters. Lens makers use this equation to grind lenses with correct curvature.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Camera lens design</h3>
            <p className="text-sm text-muted-foreground">
              Calculate focal lengths for camera lenses. Multi-element lenses combine multiple lens elements to correct aberrations while achieving desired focal length.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Telescope and microscope optics</h3>
            <p className="text-sm text-muted-foreground">
              Design objective and eyepiece lenses. Calculate magnification from focal lengths. Match lens combinations for optimal image quality.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Physics lab experiments</h3>
            <p className="text-sm text-muted-foreground">
              Predict lens behavior in optics experiments. Verify the lens maker equation by measuring focal length and comparing to calculated values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Laser beam focusing</h3>
            <p className="text-sm text-muted-foreground">
              Select lenses for laser applications. Calculate focal length needed to focus a laser to a specific spot size at a given distance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Contact lens fitting</h3>
            <p className="text-sm text-muted-foreground">
              Understand contact lens optics. Base curve radius affects how the lens fits the cornea. Power depends on both curvature and material.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Sign convention is critical.</strong>
              Convex surface (bulging toward incoming light): positive R. Concave surface: negative R. Wrong signs give wrong focal length.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Positive f means converging lens.</strong>
              Convex lenses (thicker in middle) have positive focal length. Concave lenses (thinner in middle) have negative focal length.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Diopters are inverse meters.</strong>
              Power P = 1/f (in meters). A 50 mm lens has power 1/0.05 = 20 diopters. Eyeglass prescriptions are in diopters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Refractive index depends on wavelength.</strong>
              Glass has different n for different colors. This causes chromatic aberration - different colors focus at different points.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For a symmetric biconvex lens (R₁ = -R₂ = R) in air, the equation simplifies to 1/f = 2(n-1)/R. This quick estimate works for many common lenses.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if both surfaces are flat?</h3>
            <p className="text-sm text-muted-foreground">
              R = infinity for flat surfaces. 1/R = 0. A flat piece of glass has infinite focal length - it doesn't focus light (ignoring thickness effects).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does thickness matter?</h3>
            <p className="text-sm text-muted-foreground">
              Thick lenses have additional refraction inside the material. The thickness term accounts for this. For thin lenses (d ≪ R), it's negligible.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can focal length be negative?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Negative focal length means diverging lens. Parallel rays appear to diverge from a virtual focus on the incoming side.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a meniscus lens?</h3>
            <p className="text-sm text-muted-foreground">
              Both surfaces curve the same direction (both convex or both concave from the same side). Can be converging or diverging depending on curvatures.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work for mirrors?</h3>
            <p className="text-sm text-muted-foreground">
              No, this is for refractive lenses. Mirrors use different equations. For spherical mirrors: 1/f = 2/R (half the radius of curvature).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is this equation?</h3>
            <p className="text-sm text-muted-foreground">
              It's exact within paraxial approximation (small angles). For large apertures or precise work, ray tracing software accounts for spherical aberration.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about compound lenses?</h3>
            <p className="text-sm text-muted-foreground">
              Use the lens equation for each element, then combine. For thin lenses in contact: 1/f_total = 1/f₁ + 1/f₂ + ... Powers add directly.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
