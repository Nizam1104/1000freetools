import React from "react"

export default function BlackbodyRadiationCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Blackbody Radiation Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter the temperature of the blackbody in Kelvin, Celsius, or Fahrenheit. The calculator converts to Kelvin for all calculations. Specify whether you want peak wavelength, total power, or spectral radiance at a specific wavelength.
          </p>
          <p>
            The calculator applies Wien's Displacement Law (λ_max = b/T) for peak wavelength and Stefan-Boltzmann Law (P = σAT⁴) for total power. For spectral radiance, it uses Planck's Law to calculate intensity at specific wavelengths.
          </p>
          <p>
            Results show peak wavelength (with color indication), total radiated power per unit area, and a spectral distribution curve. The visible spectrum is highlighted to show what color the object would appear.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Stellar temperature estimation</h3>
            <p className="text-sm text-muted-foreground">
              Determine star temperatures from their color. Blue stars are hot (30,000 K), red stars are cool (3,000 K). Our Sun peaks in green at 5,800 K.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Incandescent bulb design</h3>
            <p className="text-sm text-muted-foreground">
              Calculate filament temperature and efficiency. Tungsten filaments at 2,800 K emit mostly infrared - only 5% visible light explains their inefficiency.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Thermal imaging analysis</h3>
            <p className="text-sm text-muted-foreground">
              Understand infrared emission from objects. Room temperature objects (300 K) peak at 10 μm - far infrared, invisible to human eyes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Industrial furnace monitoring</h3>
            <p className="text-sm text-muted-foreground">
              Estimate furnace temperature from glow color. Red hot ≈ 800°C, orange ≈ 1,000°C, yellow ≈ 1,200°C, white hot ≈ 1,500°C+.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Climate science calculations</h3>
            <p className="text-sm text-muted-foreground">
              Model Earth's radiation balance. Earth radiates as a ~288 K blackbody. Greenhouse gases trap some of this outgoing infrared radiation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Pyrometer temperature measurement</h3>
            <p className="text-sm text-muted-foreground">
              Understand non-contact thermometers. Optical pyrometers measure temperature by detecting emitted radiation intensity at specific wavelengths.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Blackbody is an ideal emitter.</strong>
              A perfect blackbody absorbs all radiation and emits according to temperature alone. Real objects emit less - characterized by emissivity (0 to 1).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Hotter objects emit more and shift bluer.</strong>
              Total power increases as T⁴ (dramatically). Peak wavelength shifts inversely with T. Double the temperature, halve the peak wavelength.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Peak wavelength isn't the only emission.</strong>
              Blackbodies emit a continuous spectrum. The peak is just the maximum. Significant energy is emitted at wavelengths on both sides of the peak.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Color perception is complex.</strong>
              An object peaking in green doesn't look green. Our eyes integrate the whole spectrum. The Sun peaks in green but appears white/yellow.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For real objects, multiply blackbody results by emissivity. Polished metals have low emissivity (~0.05). Black paint has high emissivity (~0.95). Human skin is ~0.98 in infrared.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is it called "black" body?</h3>
            <p className="text-sm text-muted-foreground">
              A blackbody absorbs all incident radiation (appears black). But when hot, it emits radiation. A perfect absorber is also a perfect emitter.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What wavelength does room temperature peak at?</h3>
            <p className="text-sm text-muted-foreground">
              At 20°C (293 K), peak wavelength is about 9.9 μm - far infrared. This is why thermal cameras operate in the 8-14 μm range.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do humans emit blackbody radiation?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, approximately. At 37°C, we emit infrared radiation peaking around 9.3 μm. This is what thermal cameras detect.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the Stefan-Boltzmann constant?</h3>
            <p className="text-sm text-muted-foreground">
              σ = 5.67 × 10⁻⁸ W/(m²⋅K⁴). It relates temperature to radiated power. The T⁴ dependence means small temperature changes cause large power changes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why don't we glow in the dark?</h3>
            <p className="text-sm text-muted-foreground">
              We do glow - in infrared! Our eyes can't see infrared. At ~2,000 K, objects start glowing visibly (red hot). We're far too cool at 310 K.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's Wien's displacement constant?</h3>
            <p className="text-sm text-muted-foreground">
              b ≈ 2.898 × 10⁻³ m⋅K. Peak wavelength (meters) = b / T (Kelvin). Hotter objects have shorter peak wavelengths.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does this relate to the UV catastrophe?</h3>
            <p className="text-sm text-muted-foreground">
              Classical physics predicted infinite UV emission from hot objects - the "UV catastrophe." Planck's quantum hypothesis resolved this, founding quantum mechanics.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
