"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function LightYearstoParsecsPage() {
  const config = converterMappings["Light Years to Parsecs"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Light Years to Parsecs"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Light-Years to Parsecs Converter</h1>
        <p className="text-muted-foreground">Convert astronomical distances between light-years, parsecs, astronomical units, and kilometers. Free online space distance converter for astronomy, astrophysics, and science education.</p>
      </div>
      <UnitConverterBase
        title="Light-Years to Parsecs Converter"
        description="Convert astronomical distances between light-years, parsecs, astronomical units, and kilometers. Free online space distance converter for astronomy, astrophysics, and science education."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Astronomical Distance Units</h2>
          <p className="text-muted-foreground mb-4">
            Astronomical distances are so vast that conventional units become impractical. Light-years measure how far light travels in one year. Parsecs use parallax angles for distance measurement. Both units help astronomers describe cosmic distances.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Distance Conversion Formulas</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>1 light-year = 9.461 × 10¹² km</p>
            <p>1 parsec = 3.262 light-years</p>
            <p>1 parsec = 3.086 × 10¹³ km</p>
            <p>1 parsec = 206,265 AU</p>
          </div>

          <p className="text-muted-foreground">
            A parsec equals the distance at which one astronomical unit subtends an angle of one arcsecond. The name combines parallax and arcsecond. One parsec equals approximately 3.26 light-years.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Distance Unit Comparison Table</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Unit</th>
                  <th className="border border-border p-3 text-left">Kilometers</th>
                  <th className="border border-border p-3 text-left">Light-Years</th>
                  <th className="border border-border p-3 text-left">Parsecs</th>
                  <th className="border border-border p-3 text-left">AU</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">1 AU</td>
                  <td className="border border-border p-3">1.496 × 10⁸</td>
                  <td className="border border-border p-3">1.58 × 10⁻⁵</td>
                  <td className="border border-border p-3">4.85 × 10⁻⁶</td>
                  <td className="border border-border p-3">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1 Light-Year</td>
                  <td className="border border-border p-3">9.461 × 10¹²</td>
                  <td className="border border-border p-3">1</td>
                  <td className="border border-border p-3">0.307</td>
                  <td className="border border-border p-3">63,241</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1 Parsec</td>
                  <td className="border border-border p-3">3.086 × 10¹³</td>
                  <td className="border border-border p-3">3.262</td>
                  <td className="border border-border p-3">1</td>
                  <td className="border border-border p-3">206,265</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1 Kiloparsec</td>
                  <td className="border border-border p-3">3.086 × 10¹⁶</td>
                  <td className="border border-border p-3">3,262</td>
                  <td className="border border-border p-3">1,000</td>
                  <td className="border border-border p-3">2.06 × 10⁸</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1 Megaparsec</td>
                  <td className="border border-border p-3">3.086 × 10¹⁹</td>
                  <td className="border border-border p-3">3.26 × 10⁶</td>
                  <td className="border border-border p-3">1,000,000</td>
                  <td className="border border-border p-3">2.06 × 10¹¹</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Astronomical Distance Ladder</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Radar Ranging (Solar System)</p>
              <p className="text-muted-foreground">
                Range: Up to 50 AU<br />
                Method: Radio wave reflection<br />
                Accuracy: Meters to kilometers<br />
                Used for: Planets, asteroids
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Stellar Parallax (Nearby Stars)</p>
              <p className="text-muted-foreground">
                Range: Up to 1,000 parsecs<br />
                Method: Apparent position shift<br />
                Accuracy: 1-10%<br />
                Used for: Distance to nearby stars
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Standard Candles (Galaxies)</p>
              <p className="text-muted-foreground">
                Range: Up to 100 megaparsecs<br />
                Method: Cepheid variables, supernovae<br />
                Accuracy: 10-20%<br />
                Used for: Galaxy distances
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Redshift (Universe Scale)</p>
              <p className="text-muted-foreground">
                Range: Billions of light-years<br />
                Method: Hubble's Law<br />
                Accuracy: 10-30%<br />
                Used for: Distant galaxies, quasars
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Distance Conversion Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: Nearest Star</p>
              <p className="text-muted-foreground">
                Proxima Centauri: 4.24 light-years<br />
                Parsecs: 4.24 / 3.262 = 1.30 pc<br />
                Kilometers: 4.24 × 9.461 × 10¹² = 4.01 × 10¹³ km<br />
                AU: 4.24 × 63,241 = 268,142 AU
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: Andromeda Galaxy</p>
              <p className="text-muted-foreground">
                Distance: 2.537 million light-years<br />
                Megaparsecs: 2.537 / 3.262 = 0.778 Mpc<br />
                Kilometers: 2.4 × 10¹⁹ km<br />
                Light travel time: 2.537 million years
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Galactic Center</p>
              <p className="text-muted-foreground">
                Distance: 8 kiloparsecs<br />
                Light-years: 8 × 3,262 = 26,096 ly<br />
                Kilometers: 2.47 × 10¹⁷ km<br />
                From Earth to Milky Way center
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 4: Observable Universe</p>
              <p className="text-muted-foreground">
                Radius: 46.5 billion light-years<br />
                Gigaparsecs: 46.5 × 10⁹ / 3.262 × 10⁹ = 14.26 Gpc<br />
                Diameter: 93 billion light-years<br />
                Comoving distance includes expansion
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Notable Astronomical Distances</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Solar System Distances</p>
              <p className="text-muted-foreground">
                Earth to Sun: 1 AU (8.3 light-minutes)<br />
                Earth to Pluto: 39 AU (5.5 light-hours)<br />
                Voyager 1: 160 AU (22 light-hours)<br />
                Heliopause: 120 AU
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Nearby Stars</p>
              <p className="text-muted-foreground">
                Proxima Centauri: 4.24 ly (1.3 pc)<br />
                Alpha Centauri: 4.37 ly (1.34 pc)<br />
                Barnard's Star: 5.96 ly (1.83 pc)<br />
                Sirius: 8.6 ly (2.64 pc)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Deep Sky Objects</p>
              <p className="text-muted-foreground">
                Orion Nebula: 1,344 ly (412 pc)<br />
                Pleiades: 444 ly (136 pc)<br />
                Crab Nebula: 6,523 ly (2,000 pc)<br />
                Whirlpool Galaxy: 23 Mly (7 Mpc)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Cosmic Distances</p>
              <p className="text-muted-foreground">
                Virgo Cluster: 54 Mly (16.5 Mpc)<br />
                Coma Cluster: 321 Mly (98 Mpc)<br />
                Hubble Deep Field: 12 Gly (3.7 Gpc)<br />
                CMB: 46 Gly (14 Gpc)
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Why use parsecs instead of light-years?</h3>
              <p className="text-muted-foreground">
                Parsecs derive directly from parallax measurements, making them natural for stellar astronomy. Professional astronomers prefer parsecs. Light-years are more intuitive for public communication.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How is a parsec defined?</h3>
              <p className="text-muted-foreground">
                One parsec is the distance at which one AU subtends one arcsecond. This equals 3.26 light-years or 3.086 × 10¹³ km. The definition links directly to parallax angle measurements.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the farthest object we can measure?</h3>
              <p className="text-muted-foreground">
                GN-z11 galaxy is 13.4 billion light-years away (redshift 11.09). The cosmic microwave background is 46 billion light-years in comoving distance. Light from CMB traveled 13.8 billion years.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How long would it take to travel to nearby stars?</h3>
              <p className="text-muted-foreground">
                At current spacecraft speeds (17 km/s), Proxima Centauri would take 75,000 years. At 10% light speed, it would take 42 years. Light itself takes 4.24 years to reach us.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
