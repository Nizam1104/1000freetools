import React from "react"

export default function DopplerEffectCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Doppler Effect Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select whether you're calculating for sound waves or light waves. Enter the source frequency (or wavelength for light), the speed of the source, the speed of the observer, and the wave speed in the medium.
          </p>
          <p>
            Specify the direction of motion: approaching or receding. For sound, also indicate if the source, observer, or both are moving. The calculator applies the appropriate Doppler formula with correct sign conventions.
          </p>
          <p>
            Results show the observed frequency (or wavelength), the frequency shift, and the percentage change. For light, it also calculates redshift or blueshift. A diagram illustrates the wave compression or expansion.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Astronomy redshift measurements</h3>
            <p className="text-sm text-muted-foreground">
              Calculate galaxy recession velocities from spectral line shifts. Determine how fast distant galaxies move away from us due to cosmic expansion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Radar speed detection</h3>
            <p className="text-sm text-muted-foreground">
              Understand how police radar guns work. The frequency shift of reflected radio waves reveals vehicle speed for traffic enforcement.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Medical ultrasound imaging</h3>
            <p className="text-sm text-muted-foreground">
              Calculate blood flow velocity from ultrasound frequency shifts. Doppler echocardiography measures heart valve function and blood circulation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Weather radar analysis</h3>
            <p className="text-sm text-muted-foreground">
              Measure wind speeds in storms. Doppler weather radar detects precipitation motion to identify rotation in severe thunderstorms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Train whistle pitch changes</h3>
            <p className="text-sm text-muted-foreground">
              Calculate the pitch shift of a passing train's horn. Classic physics example showing frequency increase as it approaches, decrease as it recedes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Satellite communication</h3>
            <p className="text-sm text-muted-foreground">
              Compensate for Doppler shift in satellite signals. Low Earth orbit satellites move fast enough to cause noticeable frequency shifts.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Sound requires a medium, light doesn't.</strong>
              Sound Doppler depends on motion relative to air. Light Doppler depends only on relative motion between source and observer.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Approaching means higher frequency.</strong>
              Waves get compressed when source approaches, raising frequency (blueshift for light). Receding stretches waves, lowering frequency (redshift).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Relativistic effects matter for light.</strong>
              At speeds approaching light speed, use relativistic Doppler formula. Classical formula works for everyday speeds but fails near c.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Sign convention is critical.</strong>
              Velocity toward the other is positive for observer, negative for source (in common convention). The calculator handles this automatically.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For sound, motion of source and observer have different effects. A moving source changes wavelength. A moving observer changes how fast wave crests are encountered. Both change observed frequency but through different mechanisms.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does the pitch change suddenly as a vehicle passes?</h3>
            <p className="text-sm text-muted-foreground">
              The frequency changes continuously, but the rate of change is fastest at closest approach. Your ear perceives this as a sudden drop.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between redshift and blueshift?</h3>
            <p className="text-sm text-muted-foreground">
              Redshift: object moving away, wavelength increases (shifts toward red). Blueshift: object approaching, wavelength decreases (shifts toward blue).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can Doppler effect occur with any wave?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, any wave phenomenon shows Doppler effect: sound, light, water waves, even matter waves in quantum mechanics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens at the speed of sound?</h3>
            <p className="text-sm text-muted-foreground">
              When source moves at sound speed, waves pile up creating a shock wave (sonic boom). The Doppler formula breaks down at supersonic speeds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do astronomers measure redshift?</h3>
            <p className="text-sm text-muted-foreground">
              Compare observed spectral lines to laboratory wavelengths. The shift z = (λ_observed - λ_rest) / λ_rest gives the redshift parameter.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does wind affect Doppler shift?</h3>
            <p className="text-sm text-muted-foreground">
              Wind changes the effective speed of sound relative to ground, affecting the Doppler shift. The calculator assumes still air unless you adjust wave speed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum Doppler shift?</h3>
            <p className="text-sm text-muted-foreground">
              For sound, theoretically infinite as source approaches sound speed. For light, limited by relativity - frequency can't exceed infinite energy requirements.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
