"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function AstronomicalUnitConverterPage() {
  const config = converterMappings["Astronomical Unit Converter"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Astronomical Unit Converter"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Astronomical Unit (AU) Converter</h1>
        <p className="text-muted-foreground">Convert astronomical units to light-years, parsecs, kilometers, miles, and more. Free online AU converter for planetary science, astronomy, and space exploration calculations.</p>
      </div>
      <UnitConverterBase
        title="Astronomical Unit (AU) Converter"
        description="Convert astronomical units to light-years, parsecs, kilometers, miles, and more. Free online AU converter for planetary science, astronomy, and space exploration calculations."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Astronomical Units</h2>
          <p className="text-muted-foreground mb-4">
            The astronomical unit (AU) represents the average distance from Earth to the Sun. This fundamental measurement provides a convenient scale for describing distances within our solar system. One AU equals approximately 150 million kilometers.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">AU Conversion Formulas</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>1 AU = 149,597,870.7 km (exact)</p>
            <p>1 AU = 92,955,807 miles</p>
            <p>1 AU = 8.317 light-minutes</p>
            <p>1 AU = 4.848 × 10⁻⁶ parsecs</p>
          </div>

          <p className="text-muted-foreground">
            The IAU defined the AU as exactly 149,597,870,700 meters in 2012. This fixed value replaced the previous definition based on Earth's orbit. Light takes 499 seconds (8.3 minutes) to travel one AU.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Solar System Distances in AU</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Object</th>
                  <th className="border border-border p-3 text-left">Distance (AU)</th>
                  <th className="border border-border p-3 text-left">Distance (km)</th>
                  <th className="border border-border p-3 text-left">Light Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Mercury</td>
                  <td className="border border-border p-3">0.39</td>
                  <td className="border border-border p-3">58 million</td>
                  <td className="border border-border p-3">3.2 minutes</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Venus</td>
                  <td className="border border-border p-3">0.72</td>
                  <td className="border border-border p-3">108 million</td>
                  <td className="border border-border p-3">6.0 minutes</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Earth</td>
                  <td className="border border-border p-3">1.00</td>
                  <td className="border border-border p-3">150 million</td>
                  <td className="border border-border p-3">8.3 minutes</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Mars</td>
                  <td className="border border-border p-3">1.52</td>
                  <td className="border border-border p-3">228 million</td>
                  <td className="border border-border p-3">12.6 minutes</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Jupiter</td>
                  <td className="border border-border p-3">5.20</td>
                  <td className="border border-border p-3">778 million</td>
                  <td className="border border-border p-3">43.2 minutes</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Saturn</td>
                  <td className="border border-border p-3">9.58</td>
                  <td className="border border-border p-3">1.43 billion</td>
                  <td className="border border-border p-3">79.8 minutes</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Uranus</td>
                  <td className="border border-border p-3">19.22</td>
                  <td className="border border-border p-3">2.87 billion</td>
                  <td className="border border-border p-3">2.7 hours</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Neptune</td>
                  <td className="border border-border p-3">30.05</td>
                  <td className="border border-border p-3">4.50 billion</td>
                  <td className="border border-border p-3">4.2 hours</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Pluto (avg)</td>
                  <td className="border border-border p-3">39.48</td>
                  <td className="border border-border p-3">5.91 billion</td>
                  <td className="border border-border p-3">5.5 hours</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">AU to Other Units</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">AU to Kilometers</p>
              <p className="text-muted-foreground">
                1 AU = 149,597,870.7 km<br/>
                10 AU = 1.496 billion km<br/>
                100 AU = 14.96 billion km<br/>
                Multiply AU by 149,597,870.7
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">AU to Miles</p>
              <p className="text-muted-foreground">
                1 AU = 92,955,807 miles<br/>
                10 AU = 929.6 million miles<br/>
                100 AU = 9.30 billion miles<br/>
                Multiply AU by 92,955,807
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">AU to Light-Time</p>
              <p className="text-muted-foreground">
                1 AU = 8.317 light-minutes<br/>
                1 AU = 499.0 light-seconds<br/>
                1 light-year = 63,241 AU<br/>
                Light time = AU × 499 seconds
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">AU to Parsecs</p>
              <p className="text-muted-foreground">
                1 AU = 4.848 × 10⁻⁶ parsecs<br/>
                1 parsec = 206,265 AU<br/>
                1 kiloparsec = 2.06 × 10⁸ AU<br/>
                Divide AU by 206,265 for parsecs
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Distance Conversion Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: Earth to Mars</p>
              <p className="text-muted-foreground">
                Closest approach: 0.52 AU<br/>
                Kilometers: 0.52 × 149.6 million = 77.8 million km<br/>
                Miles: 0.52 × 92.96 million = 48.3 million miles<br/>
                Light time: 4.3 minutes
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: Voyager 1 Distance</p>
              <p className="text-muted-foreground">
                Current distance: ~160 AU<br/>
                Kilometers: 160 × 149.6 million = 23.9 billion km<br/>
                Light-hours: 160 × 8.3 / 60 = 22.1 hours<br/>
                Signal round-trip: 44+ hours
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Oort Cloud</p>
              <p className="text-muted-foreground">
                Inner edge: 2,000 AU<br/>
                Outer edge: 100,000 AU<br/>
                Light-years: 100,000 / 63,241 = 1.58 ly<br/>
                Boundary of solar system
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 4: Proxima Centauri</p>
              <p className="text-muted-foreground">
                Distance: 4.24 light-years<br/>
                AU: 4.24 × 63,241 = 268,142 AU<br/>
                Kilometers: 4.01 × 10¹³ km<br/>
                Nearest star to Sun
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Space Mission Distances</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Planetary Missions</p>
              <p className="text-muted-foreground">
                Moon: 0.0026 AU (384,400 km)<br/>
                Mars rovers: 1.52 AU average<br/>
                Cassini (Saturn): 9.58 AU<br/>
                New Horizons (Pluto): 32.9 AU at flyby
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Communication Delays</p>
              <p className="text-muted-foreground">
                Moon: 1.3 seconds<br/>
                Mars: 3-22 minutes<br/>
                Jupiter: 35-52 minutes<br/>
                Pluto: 4.5-6.5 hours
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Travel Times (Current Tech)</p>
              <p className="text-muted-foreground">
                Moon: 3 days<br/>
                Mars: 6-9 months<br/>
                Jupiter: 6 years<br/>
                Pluto: 9.5 years (New Horizons)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Heliopause Boundary</p>
              <p className="text-muted-foreground">
                Distance: ~120 AU<br/>
                Voyager 1 crossed: 2012<br/>
                Voyager 2 crossed: 2018<br/>
                Edge of Sun's influence
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Why is the AU important?</h3>
              <p className="text-muted-foreground">
                The AU provides a convenient scale for solar system distances. Using kilometers produces unwieldy numbers. The AU relates directly to Earth's orbit, making it intuitive for understanding planetary positions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How was the AU originally measured?</h3>
              <p className="text-muted-foreground">
                Early measurements used parallax during Venus transits. Radar ranging to planets improved accuracy in the 1960s. Modern measurements use spacecraft telemetry and laser ranging.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Does Earth's distance from the Sun change?</h3>
              <p className="text-muted-foreground">
                Yes, Earth's orbit is elliptical. Perihelion (closest): 0.983 AU in January. Aphelion (farthest): 1.017 AU in July. Average distance defines the AU at exactly 149,597,870.7 km.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How far is the edge of the solar system?</h3>
              <p className="text-muted-foreground">
                Heliopause: ~120 AU. Oort Cloud inner edge: 2,000 AU. Oort Cloud outer edge: 100,000 AU (1.58 light-years). This marks the Sun's gravitational influence boundary.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
