"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function RingSizeConverterPage() {
  const config = converterMappings["Ring Size Converter"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Ring Size Converter"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Ring Size Converter</h1>
        <p className="text-muted-foreground">Convert ring sizes between US, UK, EU, French, Swiss, and Japanese standards. Free online ring size converter for jewelry shopping, gifting, and custom ring orders worldwide.</p>
      </div>
      <UnitConverterBase
        title="Ring Size Converter"
        description="Convert ring sizes between US, UK, EU, French, Swiss, and Japanese standards. Free online ring size converter for jewelry shopping, gifting, and custom ring orders worldwide."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Ring Size Measurement Systems</h2>
          <p className="text-muted-foreground mb-4">
            Ring sizes vary by country and measurement method. US uses a numbered scale based on circumference. UK uses letters A-Z. EU uses circumference in millimeters. Understanding these systems ensures proper ring fit when shopping internationally.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Ring Size Formulas</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>Circumference (mm) = Diameter (mm) × π</p>
            <p>US Size = (Circumference - 36.5) / 3.15</p>
            <p>EU Size = Circumference in mm</p>
            <p>UK Size = (Circumference - 36.25) / 1.25 (letter)</p>
          </div>

          <p className="text-muted-foreground">
            Circumference is the distance around the finger. Diameter is the distance across the ring. Pi (π) equals approximately 3.14159. Measure at end of day when fingers are warmest.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">International Ring Size Conversion Table</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">US</th>
                  <th className="border border-border p-3 text-left">UK</th>
                  <th className="border border-border p-3 text-left">EU</th>
                  <th className="border border-border p-3 text-left">France</th>
                  <th className="border border-border p-3 text-left">Diameter (mm)</th>
                  <th className="border border-border p-3 text-left">Circumference (mm)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">3</td>
                  <td className="border border-border p-3">F</td>
                  <td className="border border-border p-3">44</td>
                  <td className="border border-border p-3">44</td>
                  <td className="border border-border p-3">14.1</td>
                  <td className="border border-border p-3">44.2</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">4</td>
                  <td className="border border-border p-3">H</td>
                  <td className="border border-border p-3">47</td>
                  <td className="border border-border p-3">47</td>
                  <td className="border border-border p-3">14.9</td>
                  <td className="border border-border p-3">46.8</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">5</td>
                  <td className="border border-border p-3">J</td>
                  <td className="border border-border p-3">49</td>
                  <td className="border border-border p-3">49</td>
                  <td className="border border-border p-3">15.7</td>
                  <td className="border border-border p-3">49.3</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">6</td>
                  <td className="border border-border p-3">L</td>
                  <td className="border border-border p-3">51</td>
                  <td className="border border-border p-3">51</td>
                  <td className="border border-border p-3">16.5</td>
                  <td className="border border-border p-3">51.9</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">7</td>
                  <td className="border border-border p-3">N</td>
                  <td className="border border-border p-3">54</td>
                  <td className="border border-border p-3">54</td>
                  <td className="border border-border p-3">17.3</td>
                  <td className="border border-border p-3">54.4</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">8</td>
                  <td className="border border-border p-3">P</td>
                  <td className="border border-border p-3">57</td>
                  <td className="border border-border p-3">57</td>
                  <td className="border border-border p-3">18.1</td>
                  <td className="border border-border p-3">57.0</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">9</td>
                  <td className="border border-border p-3">R</td>
                  <td className="border border-border p-3">59</td>
                  <td className="border border-border p-3">59</td>
                  <td className="border border-border p-3">18.9</td>
                  <td className="border border-border p-3">59.5</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">10</td>
                  <td className="border border-border p-3">T</td>
                  <td className="border border-border p-3">62</td>
                  <td className="border border-border p-3">62</td>
                  <td className="border border-border p-3">19.8</td>
                  <td className="border border-border p-3">62.1</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">11</td>
                  <td className="border border-border p-3">V</td>
                  <td className="border border-border p-3">64</td>
                  <td className="border border-border p-3">64</td>
                  <td className="border border-border p-3">20.6</td>
                  <td className="border border-border p-3">64.6</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">12</td>
                  <td className="border border-border p-3">X</td>
                  <td className="border border-border p-3">67</td>
                  <td className="border border-border p-3">67</td>
                  <td className="border border-border p-3">21.4</td>
                  <td className="border border-border p-3">67.2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How to Measure Ring Size</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Ring Sizer Tool</p>
              <p className="text-muted-foreground">
                Use plastic or metal ring sizer set<br />
                Slide rings onto finger<br />
                Find comfortable fit<br />
                Most accurate method
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Measure Existing Ring</p>
              <p className="text-muted-foreground">
                Measure inside diameter of well-fitting ring<br />
                Use ruler or caliper<br />
                Compare to size chart<br />
                Measure multiple rings for accuracy
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">String or Paper Method</p>
              <p className="text-muted-foreground">
                Wrap string around finger base<br />
                Mark where string overlaps<br />
                Measure length in mm<br />
                This is circumference
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Best Measurement Practices</p>
              <p className="text-muted-foreground">
                Measure at end of day<br />
                Fingers swell in heat<br />
                Measure 3-4 times<br />
                Consider knuckle size
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Ring Size Conversion Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: US to EU</p>
              <p className="text-muted-foreground">
                US Size: 7<br />
                UK Size: N<br />
                EU Size: 54<br />
                Circumference: 54.4 mm
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: EU to US</p>
              <p className="text-muted-foreground">
                EU Size: 57<br />
                US Size: 8<br />
                UK Size: P<br />
                Diameter: 18.1 mm
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Circumference to Size</p>
              <p className="text-muted-foreground">
                Circumference: 52 mm<br />
                US Size: 6<br />
                EU Size: 52<br />
                UK Size: L
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 4: Diameter to Size</p>
              <p className="text-muted-foreground">
                Diameter: 19 mm<br />
                Circumference: 19 × 3.14 = 59.7 mm<br />
                US Size: 9<br />
                EU Size: 60
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Ring Sizing Tips</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Finger Variations</p>
              <p className="text-muted-foreground">
                Dominant hand: Slightly larger<br />
                Morning: Fingers smallest<br />
                Evening: Fingers largest<br />
                Temperature affects size
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Ring Width Effect</p>
              <p className="text-muted-foreground">
                Wide bands feel tighter<br />
                Add 0.25-0.5 for wide rings<br />
                Thin bands fit looser<br />
                Consider ring style
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Knuckle Considerations</p>
              <p className="text-muted-foreground">
                Ring must pass over knuckle<br />
                Size for knuckle if large<br />
                Add sizing beads for fit<br />
                Consider adjustable settings
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Seasonal Changes</p>
              <p className="text-muted-foreground">
                Summer: Fingers swell<br />
                Winter: Fingers shrink<br />
                Average for year-round wear<br />
                Resizing may be needed
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What is the average ring size for women?</h3>
              <p className="text-muted-foreground">
                Average women's ring size is US 6-7 (EU 51-54). Size 6 is most common for engagement rings. Sizes vary by country and individual. Always measure for accurate sizing.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the average ring size for men?</h3>
              <p className="text-muted-foreground">
                Average men's ring size is US 9-10 (EU 59-62). Size 10 is most common for wedding bands. Men's fingers vary more than women's. Measure before purchasing.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Can rings be resized?</h3>
              <p className="text-muted-foreground">
                Most rings can be resized 1-2 sizes up or down. Platinum and gold resize easily. Titanium and tungsten cannot be resized. Eternity bands are difficult to resize.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I know if a ring fits properly?</h3>
              <p className="text-muted-foreground">
                Ring should slide over knuckle with slight resistance. Should fit snugly but not tight. Should not spin freely. Should leave slight indentation when removed.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
