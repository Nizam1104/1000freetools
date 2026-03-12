"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function AccelerationPage() {
  const config = converterMappings["Acceleration"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Acceleration"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Acceleration Converter</h1>
        <p className="text-muted-foreground">Convert acceleration units including m/s², g-force, ft/s², Gal, and more. Accurate online acceleration converter for physics, aerospace, and mechanical engineering.</p>
      </div>
      <UnitConverterBase
        title="Acceleration Converter"
        description="Convert acceleration units including m/s², g-force, ft/s², Gal, and more. Accurate online acceleration converter for physics, aerospace, and mechanical engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Acceleration</h2>
          <p className="text-muted-foreground mb-4">
            Acceleration measures the rate of change of velocity. You express acceleration in meters per second squared (m/s²). One m/s² means velocity increases by one meter per second every second.
          </p>
          <p className="text-muted-foreground mb-4">
            Acceleration is a vector quantity with magnitude and direction. Positive acceleration increases speed. Negative acceleration (deceleration) decreases speed. Gravity produces constant acceleration of 9.80665 m/s² at Earth's surface.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Acceleration Formulas and Newton's Laws</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">a = Δv / Δt</p>
            <p className="text-muted-foreground text-sm">
              Definition: Acceleration equals change in velocity divided by change in time. Units are m/s² or ft/s².
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">F = m × a</p>
            <p className="text-muted-foreground text-sm">
              Newton's Second Law: Force equals mass times acceleration. This fundamental law governs motion dynamics.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">v² = v₀² + 2 × a × s</p>
            <p className="text-muted-foreground text-sm">
              Kinematic equation: Final velocity squared equals initial velocity squared plus 2 times acceleration times displacement.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A car accelerating from 0 to 100 km/h (27.78 m/s) in 8 seconds has a = 27.78 / 8 = 3.47 m/s² or 0.35 g.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Acceleration Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">m/s²</th>
                  <th className="border border-border p-2 text-left">ft/s²</th>
                  <th className="border border-border p-2 text-left">g (standard)</th>
                  <th className="border border-border p-2 text-left">Gal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">0.0328</td>
                  <td className="border border-border p-2">0.00102</td>
                  <td className="border border-border p-2">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.3048</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.0311</td>
                  <td className="border border-border p-2">30.48</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">3.281</td>
                  <td className="border border-border p-2">0.102</td>
                  <td className="border border-border p-2">100</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">9.80665</td>
                  <td className="border border-border p-2">32.174</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">980.665</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">328.1</td>
                  <td className="border border-border p-2">10.2</td>
                  <td className="border border-border p-2">10,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Acceleration Reference Values</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Scenario</th>
                  <th className="border border-border p-2 text-left">Acceleration (m/s²)</th>
                  <th className="border border-border p-2 text-left">Acceleration (g)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Earth Gravity (standard)</td>
                  <td className="border border-border p-2">9.80665</td>
                  <td className="border border-border p-2">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Moon Gravity</td>
                  <td className="border border-border p-2">1.62</td>
                  <td className="border border-border p-2">0.165</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Mars Gravity</td>
                  <td className="border border-border p-2">3.71</td>
                  <td className="border border-border p-2">0.378</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Sports Car (0-100 km/h)</td>
                  <td className="border border-border p-2">3-5</td>
                  <td className="border border-border p-2">0.3-0.5</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Formula 1 Braking</td>
                  <td className="border border-border p-2">40-50</td>
                  <td className="border border-border p-2">4-5</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Human Tolerance (sustained)</td>
                  <td className="border border-border p-2">50-90</td>
                  <td className="border border-border p-2">5-9</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Rocket Launch</td>
                  <td className="border border-border p-2">30-50</td>
                  <td className="border border-border p-2">3-5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Automotive Performance</h3>
              <p className="text-muted-foreground text-sm">
                0-60 mph times indicate acceleration capability. A 3-second 0-60 time requires about 9 m/s² average acceleration. Electric vehicles achieve higher acceleration due to instant torque.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Accelerometer Sensors</h3>
              <p className="text-muted-foreground text-sm">
                MEMS accelerometers measure acceleration in smartphones and vehicles. Typical ranges are ±2g to ±16g. Used for screen rotation, step counting, and crash detection.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Aerospace Engineering</h3>
              <p className="text-muted-foreground text-sm">
                Aircraft experience acceleration during maneuvers. Fighter jets pull 9g turns. Commercial aircraft limit to 2.5g positive, 1g negative for passenger comfort.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Seismology</h3>
              <p className="text-muted-foreground text-sm">
                Earthquakes produce ground acceleration measured in Gal. Strong earthquakes exceed 100 Gal (0.1g). Building codes specify design acceleration for seismic zones.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What is g-force?</h3>
              <p className="text-muted-foreground text-sm">
                G-force expresses acceleration as multiples of Earth's gravity. 1g equals 9.80665 m/s². Pilots experience multiple g during maneuvers. Roller coasters typically reach 3-5g.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is a Gal?</h3>
              <p className="text-muted-foreground text-sm">
                Gal (galileo) is a CGS unit of acceleration. One Gal equals 1 cm/s² or 0.01 m/s². Named after Galileo Galilei. Common in geophysics and seismology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How much acceleration can humans withstand?</h3>
              <p className="text-muted-foreground text-sm">
                Trained pilots tolerate 9g briefly with g-suits. Untrained people lose consciousness around 5g. Sustained acceleration above 2g causes fatigue. Direction matters: chest-to-back tolerance exceeds head-to-foot.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you calculate acceleration from distance and time?</h3>
              <p className="text-muted-foreground text-sm">
                For constant acceleration from rest, use a = 2s/t² where s is distance and t is time. For example, falling 4.9 meters in 1 second gives a = 2 × 4.9 / 1² = 9.8 m/s².
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
