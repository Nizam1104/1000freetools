import React from "react"

export default function OhmsLawCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Ohm's Law Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select what you want to calculate from the dropdown: voltage, current, resistance, or power using any of three formulas. Enter the two required values in their respective fields, then click Calculate.
          </p>
          <p>
            The calculator applies Ohm's Law (V = I × R) or the power formulas (P = V × I, P = I² × R, P = V² / R) depending on your selection. Results display with proper units: volts (V), amperes (A), ohms (Ω), or watts (W).
          </p>
          <p>
            When you enter all three values (voltage, current, and resistance), the circuit summary shows all four parameters including calculated power. The Ohm's Law triangle diagram helps you remember the relationships between variables.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sizing resistors for LEDs</h3>
            <p className="text-sm text-muted-foreground">
              You have a 5V supply and an LED that needs 20mA at 2V forward voltage. Calculate the required resistance: R = (5V - 2V) / 0.02A = 150Ω.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Checking circuit power consumption</h3>
            <p className="text-sm text-muted-foreground">
              Your device draws 0.5A at 12V. Use P = V × I to find it consumes 6 watts. This tells you what power supply rating you need.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Troubleshooting electrical faults</h3>
            <p className="text-sm text-muted-foreground">
              A circuit should draw 2A but only draws 0.5A. Use R = V / I to check if resistance increased, indicating a loose connection or damaged component.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Electronics homework problems</h3>
            <p className="text-sm text-muted-foreground">
              Your assignment gives voltage and resistance, asks for current. Plug in the values and verify your manual calculation before submitting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Selecting wire gauge</h3>
            <p className="text-sm text-muted-foreground">
              You know the current and need to check voltage drop across a wire. Calculate expected voltage loss to ensure your components get adequate power.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Understanding heater specifications</h3>
            <p className="text-sm text-muted-foreground">
              A heater is rated 1500W at 120V. Calculate current draw: I = P / V = 1500W / 120V = 12.5A. This tells you what circuit breaker you need.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Ohm's Law applies to resistive circuits.</strong>
              The formulas work for DC circuits and AC circuits with pure resistance. Circuits with capacitors or inductors require impedance calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Power has three equivalent formulas.</strong>
              P = V × I works with any two values. P = I² × R is useful when you know current and resistance. P = V² / R works with voltage and resistance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Units must be consistent.</strong>
              Use volts, amperes, and ohms for correct results. Milliamps need conversion (100mA = 0.1A). Kilohms need conversion (4.7kΩ = 4700Ω).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">The triangle is a memory aid.</strong>
              Cover the value you want to find. V over I means V = I × R. I under V means I = V / R. The visual helps remember which operation to use.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Power dissipation in resistors generates heat. A resistor dissipating 0.5W needs at least a 1W rating for safety margin. Double the calculated power for safe resistor selection.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if I only have one value?</h3>
            <p className="text-sm text-muted-foreground">
              You need at least two values to calculate the others. Ohm's Law has three variables. With only one known, there are infinite possible solutions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for AC circuits?</h3>
            <p className="text-sm text-muted-foreground">
              For pure resistive AC loads (heaters, incandescent bulbs), yes. For motors, transformers, or electronics, you need to account for power factor and impedance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are there three power formulas?</h3>
            <p className="text-sm text-muted-foreground">
              They're mathematically equivalent, derived by substituting V = I × R into P = V × I. Each form is convenient when you have different pairs of known values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does the circuit summary show?</h3>
            <p className="text-sm text-muted-foreground">
              When you enter voltage, current, and resistance, it calculates power and displays all four values together. This gives a complete picture of the circuit.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate are the results?</h3>
            <p className="text-sm text-muted-foreground">
              The math is precise to many decimal places. Real-world measurements have tolerance. Resistor values vary by 1-10%, and multimeters have their own accuracy limits.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can current be negative?</h3>
            <p className="text-sm text-muted-foreground">
              In this calculator, no. Negative current indicates direction opposite to your reference. The magnitude is what matters for power and resistance calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if resistance is zero?</h3>
            <p className="text-sm text-muted-foreground">
              Zero resistance means a short circuit. Current would be infinite (I = V / 0). In reality, wires have some resistance and power supplies have current limits.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
