import React from "react"

export default function PhotoelectricEffectCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Photoelectric Effect Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select what you want to calculate: maximum kinetic energy of emitted electrons, stopping potential, work function, or threshold frequency/wavelength. Enter the known values including light frequency (or wavelength) and material properties.
          </p>
          <p>
            The calculator applies Einstein's photoelectric equation: K_max = hf - Φ, where h is Planck's constant, f is light frequency, and Φ is the work function. For stopping potential: eV_s = K_max.
          </p>
          <p>
            Results show the calculated value with proper units. The calculator also determines if photoelectric emission occurs (photon energy must exceed work function). A diagram illustrates photons striking the metal surface and ejecting electrons.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Physics homework and exams</h3>
            <p className="text-sm text-muted-foreground">
              Solve photoelectric effect problems. Calculate electron energies, stopping potentials, or work functions for various metals and light frequencies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Photodetector selection</h3>
            <p className="text-sm text-muted-foreground">
              Choose appropriate photocathode materials. Different metals respond to different wavelength ranges. Match material to your light source.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Solar cell analysis</h3>
            <p className="text-sm text-muted-foreground">
              Understand the quantum basis of photovoltaics. Photons must have enough energy to free electrons from the semiconductor material.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Night vision device design</h3>
            <p className="text-sm text-muted-foreground">
              Analyze photocathode response in image intensifiers. Infrared photons eject electrons that are amplified to create visible images.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Spectroscopy applications</h3>
            <p className="text-sm text-muted-foreground">
              Use photoelectron spectroscopy to study materials. Measuring electron energies reveals the electronic structure of surfaces.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Light sensor calibration</h3>
            <p className="text-sm text-muted-foreground">
              Calibrate photomultiplier tubes and photodiodes. Understand the relationship between incident light and generated current.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Photon energy depends on frequency, not intensity.</strong>
              Higher frequency means more energetic photons. Brighter light means more photons, not more energetic ones. This was Einstein's key insight.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">There's a threshold frequency.</strong>
              Below threshold frequency, no electrons are emitted regardless of intensity. Photon energy must exceed the work function to free electrons.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Emission is instantaneous.</strong>
              Electrons are ejected immediately when light strikes - no time delay for energy accumulation. This proved light's particle nature.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Work function varies by material.</strong>
              Cesium has low work function (2.1 eV) - good for visible light. Platinum has high work function (5.7 eV) - needs UV light.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Stopping potential directly measures maximum electron kinetic energy: K_max = eV_s. This experimental method confirmed Einstein's equation and earned Millikan the Nobel Prize (though he initially doubted quantum theory).
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why doesn't intensity affect electron energy?</h3>
            <p className="text-sm text-muted-foreground">
              Each electron absorbs one photon. More intensity means more photons (more electrons), but each electron gets the same energy from its photon.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the work function?</h3>
            <p className="text-sm text-muted-foreground">
              Minimum energy needed to remove an electron from the metal surface. It's a property of the material, typically 2-5 electron-volts for metals.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can one photon eject multiple electrons?</h3>
            <p className="text-sm text-muted-foreground">
              Not in the standard photoelectric effect. One photon ejects one electron. Multi-photon processes require extremely intense lasers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens to excess photon energy?</h3>
            <p className="text-sm text-muted-foreground">
              Energy above the work function becomes electron kinetic energy. K_max = hf - Φ. Higher frequency means faster electrons.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why was this effect important?</h3>
            <p className="text-sm text-muted-foreground">
              It proved light has particle properties. Classical wave theory couldn't explain the frequency threshold or instantaneous emission. Einstein won the Nobel for this.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's an electron-volt?</h3>
            <p className="text-sm text-muted-foreground">
              1 eV = 1.602 × 10⁻¹⁹ joules. It's the energy an electron gains moving through 1 volt potential. Convenient unit for atomic-scale energies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does angle of incidence matter?</h3>
            <p className="text-sm text-muted-foreground">
              Not for the basic effect. Photon energy depends only on frequency. But angle affects how many photons are absorbed (reflectance varies with angle).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
