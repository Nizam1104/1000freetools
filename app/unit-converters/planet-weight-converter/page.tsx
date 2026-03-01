"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function PlanetWeightConverterPage() {
  const config = converterMappings["Planet Weight Converter"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Planet Weight Converter"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Planet Weight Calculator</h1>
        <p className="text-muted-foreground">Find out how much you would weigh on Mars, Jupiter, the Moon, and other planets. Free online planet weight calculator based on surface gravity for astronomy and science education.</p>
      </div>
      <UnitConverterBase
        title="Planet Weight Calculator"
        description="Find out how much you would weigh on Mars, Jupiter, the Moon, and other planets. Free online planet weight calculator based on surface gravity for astronomy and science education."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Weight on Other Planets</h2>
          <p className="text-muted-foreground mb-4">
            Weight measures the gravitational force on your mass. Your mass stays constant everywhere, but weight changes based on local gravity. Different planets have different surface gravities based on their mass and radius.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Weight Calculation Formula</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>Weight = Mass × Surface Gravity</p>
            <p>W_planet = W_earth × (g_planet / g_earth)</p>
            <p>g = GM/r² (Newton's Law)</p>
            <p>G = 6.674 × 10⁻¹¹ N·m²/kg²</p>
          </div>

          <p className="text-muted-foreground">
            Surface gravity depends on planet mass (M) and radius (r). Earth gravity equals 9.807 m/s². Your weight on another planet equals Earth weight multiplied by the gravity ratio.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Weight on Each Planet Table</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Body</th>
                  <th className="border border-border p-3 text-left">Gravity (m/s²)</th>
                  <th className="border border-border p-3 text-left">vs Earth</th>
                  <th className="border border-border p-3 text-left">70 kg Person</th>
                  <th className="border border-border p-3 text-left">150 lb Person</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Sun</td>
                  <td className="border border-border p-3">274.0</td>
                  <td className="border border-border p-3">27.9×</td>
                  <td className="border border-border p-3">1,950 kg</td>
                  <td className="border border-border p-3">4,185 lb</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Mercury</td>
                  <td className="border border-border p-3">3.7</td>
                  <td className="border border-border p-3">0.38×</td>
                  <td className="border border-border p-3">26.6 kg</td>
                  <td className="border border-border p-3">57 lb</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Venus</td>
                  <td className="border border-border p-3">8.87</td>
                  <td className="border border-border p-3">0.90×</td>
                  <td className="border border-border p-3">63.0 kg</td>
                  <td className="border border-border p-3">135 lb</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Earth</td>
                  <td className="border border-border p-3">9.807</td>
                  <td className="border border-border p-3">1.00×</td>
                  <td className="border border-border p-3">70 kg</td>
                  <td className="border border-border p-3">150 lb</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Moon</td>
                  <td className="border border-border p-3">1.62</td>
                  <td className="border border-border p-3">0.165×</td>
                  <td className="border border-border p-3">11.6 kg</td>
                  <td className="border border-border p-3">25 lb</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Mars</td>
                  <td className="border border-border p-3">3.71</td>
                  <td className="border border-border p-3">0.38×</td>
                  <td className="border border-border p-3">26.6 kg</td>
                  <td className="border border-border p-3">57 lb</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Jupiter</td>
                  <td className="border border-border p-3">24.79</td>
                  <td className="border border-border p-3">2.53×</td>
                  <td className="border border-border p-3">177 kg</td>
                  <td className="border border-border p-3">379 lb</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Saturn</td>
                  <td className="border border-border p-3">10.44</td>
                  <td className="border border-border p-3">1.06×</td>
                  <td className="border border-border p-3">74.5 kg</td>
                  <td className="border border-border p-3">159 lb</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Uranus</td>
                  <td className="border border-border p-3">8.69</td>
                  <td className="border border-border p-3">0.89×</td>
                  <td className="border border-border p-3">62.3 kg</td>
                  <td className="border border-border p-3">134 lb</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Neptune</td>
                  <td className="border border-border p-3">11.15</td>
                  <td className="border border-border p-3">1.14×</td>
                  <td className="border border-border p-3">79.8 kg</td>
                  <td className="border border-border p-3">171 lb</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Pluto</td>
                  <td className="border border-border p-3">0.62</td>
                  <td className="border border-border p-3">0.063×</td>
                  <td className="border border-border p-3">4.4 kg</td>
                  <td className="border border-border p-3">9.5 lb</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Gravity Calculation Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: Weight on Mars</p>
              <p className="text-muted-foreground">
                Earth weight: 70 kg (154 lb)<br/>
                Mars gravity: 3.71 m/s²<br/>
                Ratio: 3.71 / 9.807 = 0.378<br/>
                Mars weight: 70 × 0.378 = 26.5 kg (58 lb)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: Weight on Jupiter</p>
              <p className="text-muted-foreground">
                Earth weight: 70 kg (154 lb)<br/>
                Jupiter gravity: 24.79 m/s²<br/>
                Ratio: 24.79 / 9.807 = 2.53<br/>
                Jupiter weight: 70 × 2.53 = 177 kg (389 lb)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Weight on the Moon</p>
              <p className="text-muted-foreground">
                Earth weight: 80 kg (176 lb)<br/>
                Moon gravity: 1.62 m/s²<br/>
                Ratio: 1.62 / 9.807 = 0.165<br/>
                Moon weight: 80 × 0.165 = 13.2 kg (29 lb)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 4: Weight on Europa</p>
              <p className="text-muted-foreground">
                Earth weight: 70 kg<br/>
                Europa gravity: 1.31 m/s²<br/>
                Ratio: 1.31 / 9.807 = 0.134<br/>
                Europa weight: 70 × 0.134 = 9.4 kg (21 lb)
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Planetary Gravity Factors</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Why Gravity Varies</p>
              <p className="text-muted-foreground">
                More mass = stronger gravity<br/>
                Larger radius = weaker surface gravity<br/>
                Dense planets have higher gravity<br/>
                Gas giants have deep gravity wells
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Jump Height Comparison</p>
              <p className="text-muted-foreground">
                Earth: 0.5 m (baseline)<br/>
                Moon: 3.0 m (6× higher)<br/>
                Mars: 1.3 m (2.6× higher)<br/>
                Jupiter: 0.2 m (impossible to stand)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Escape Velocity</p>
              <p className="text-muted-foreground">
                Earth: 11.2 km/s<br/>
                Moon: 2.4 km/s<br/>
                Mars: 5.0 km/s<br/>
                Jupiter: 59.5 km/s
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Human Survival Limits</p>
              <p className="text-muted-foreground">
                Long-term: 0.3-1.0 g optimal<br/>
                Short-term: Up to 3 g possible<br/>
                Mars (0.38 g): Possible long-term<br/>
                Jupiter (2.53 g): Not survivable
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Interesting Gravity Facts</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Saturn's Low Density</p>
              <p className="text-muted-foreground">
                Saturn's gravity is only 1.06× Earth despite being 95× more massive. Its low density (less than water) and large radius spread gravity over a larger surface area.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Mars vs Mercury</p>
              <p className="text-muted-foreground">
                Mars and Mercury have nearly identical surface gravity (0.38× Earth). Mars is larger but less dense. Mercury is smaller but denser with large iron core.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Weight on Asteroids</p>
              <p className="text-muted-foreground">
                Ceres (largest asteroid): 0.029× Earth<br/>
                70 kg person weighs 2 kg (4.4 lb)<br/>
                Easy to jump into space<br/>
                Escape velocity: 0.51 km/s
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Neutron Star Gravity</p>
              <p className="text-muted-foreground">
                Surface gravity: 2 × 10¹¹ × Earth<br/>
                70 kg person would weigh 14 billion kg<br/>
                Spaghettification occurs<br/>
                Escape velocity: 0.4× speed of light
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Why do I weigh less on the Moon?</h3>
              <p className="text-muted-foreground">
                The Moon has only 1.2% of Earth's mass and 27% of Earth's radius. This produces surface gravity of 1.62 m/s², which is 16.5% of Earth's gravity. Your mass stays the same, but gravitational force is less.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Would I be crushed on Jupiter?</h3>
              <p className="text-muted-foreground">
                Yes. Jupiter's gravity is 2.53× Earth's. Your body would weigh 2.5 times more. Combined with atmospheric pressure and lack of solid surface, humans cannot survive on Jupiter.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Does mass change on other planets?</h3>
              <p className="text-muted-foreground">
                No. Mass is the amount of matter in your body and stays constant everywhere. Weight is the gravitational force on that mass and changes based on local gravity.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Which planet has the strongest gravity?</h3>
              <p className="text-muted-foreground">
                Jupiter has the strongest surface gravity of any planet at 24.79 m/s² (2.53× Earth). The Sun has much stronger gravity at 274 m/s², but it is a star, not a planet.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
