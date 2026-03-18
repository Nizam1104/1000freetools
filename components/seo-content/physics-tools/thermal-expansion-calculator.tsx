import React from "react"

export default function ThermalExpansionCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Thermal Expansion Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select the type of expansion: linear (length change), area (surface change), or volumetric (volume change). Enter the initial dimension, temperature change, and the material's coefficient of thermal expansion.
          </p>
          <p>
            The calculator applies the appropriate formula: ΔL = αL₀ΔT for linear, ΔA = 2αA₀ΔT for area, or ΔV = 3αV₀ΔT for volumetric expansion. Here α is the coefficient of thermal expansion, L₀/A₀/V₀ is the initial dimension, and ΔT is the temperature change.
          </p>
          <p>
            Results show the change in dimension and the final dimension after expansion or contraction. Common materials are listed with their expansion coefficients. Both expansion (heating) and contraction (cooling) are handled correctly.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Bridge expansion joint design</h3>
            <p className="text-sm text-muted-foreground">
              Calculate how much a bridge expands in summer. A 100m steel bridge can expand 12cm from winter to summer. Expansion joints accommodate this movement.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Railway track installation</h3>
            <p className="text-sm text-muted-foreground">
              Determine gaps between rail segments. Without gaps, thermal expansion would buckle the tracks. Modern continuous welded rail uses tension to manage expansion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Bimetallic strip design</h3>
            <p className="text-sm text-muted-foreground">
              Design thermostats and thermal switches. Two metals with different expansion coefficients bonded together bend when heated, activating switches.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Pipeline engineering</h3>
            <p className="text-sm text-muted-foreground">
              Account for pipe expansion in long pipelines. Oil pipelines can expand meters over their length. Expansion loops and anchors manage the movement.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Precision instrument design</h3>
            <p className="text-sm text-muted-foreground">
              Minimize thermal effects in measuring equipment. Use low-expansion materials like Invar for precision instruments that must maintain accuracy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Glass-to-metal seals</h3>
            <p className="text-sm text-muted-foreground">
              Match expansion coefficients for vacuum seals. Glass and metal must expand similarly or the seal cracks during temperature changes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Expansion coefficients vary by material.</strong>
              Metals expand more than ceramics. Plastics expand most of all. Aluminum expands about twice as much as steel for the same temperature change.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Area expansion is 2× linear coefficient.</strong>
              For isotropic materials, area expansion coefficient β = 2α. Volume expansion coefficient γ = 3α. This assumes uniform expansion in all directions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Temperature change matters, not absolute temperature.</strong>
              ΔT is what causes expansion. A 50°C increase causes the same expansion whether from 20°C to 70°C or from 100°C to 150°C.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Coefficients can vary with temperature.</strong>
              The expansion coefficient isn't perfectly constant. For large temperature ranges, use average values or integrate over the temperature range.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Thermal stress from constrained expansion can be enormous. A steel rod prevented from expanding develops ~240 MPa stress per 100°C - enough to permanently deform or fracture the material.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do materials expand when heated?</h3>
            <p className="text-sm text-muted-foreground">
              Atoms vibrate more vigorously at higher temperatures. The asymmetric potential well means increased vibration increases average atomic spacing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do materials always expand when heated?</h3>
            <p className="text-sm text-muted-foreground">
              Most do, but some have negative thermal expansion. Water contracts from 0°C to 4°C. Some ceramics and alloys shrink when heated over certain ranges.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What material expands the least?</h3>
            <p className="text-sm text-muted-foreground">
              Invar (iron-nickel alloy) has extremely low expansion. Fused silica and some ceramics also have very low coefficients. Diamond has low expansion too.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does this affect liquids?</h3>
            <p className="text-sm text-muted-foreground">
              Liquids expand volumetrically only (no fixed shape). Liquid expansion coefficients are typically larger than solids. Mercury thermometers work on this principle.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about gases?</h3>
            <p className="text-sm text-muted-foreground">
              Gases expand much more than solids or liquids. Ideal gas law (PV = nRT) describes gas expansion. Volume is directly proportional to absolute temperature.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do jar lids loosen under hot water?</h3>
            <p className="text-sm text-muted-foreground">
              Metal lid expands more than glass jar. The differential expansion breaks the seal and increases the lid diameter, making it easier to twist off.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate are these calculations?</h3>
            <p className="text-sm text-muted-foreground">
              Good for moderate temperature ranges with constant α. For large ranges or precision work, account for temperature-dependent expansion coefficients.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
