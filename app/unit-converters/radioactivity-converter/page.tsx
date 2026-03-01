"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function RadioactivityConverterPage() {
  const config = converterMappings["Radioactivity Converter"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Radioactivity Converter"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Radioactivity Converter</h1>
        <p className="text-muted-foreground">Convert radioactivity units — becquerels, curies, millicuries, rutherfords, and more. Free online radioactivity converter for nuclear medicine, radiation safety, and physics.</p>
      </div>
      <UnitConverterBase
        title="Radioactivity Converter"
        description="Convert radioactivity units — becquerels, curies, millicuries, rutherfords, and more. Free online radioactivity converter for nuclear medicine, radiation safety, and physics."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="w-full max-w-4xl mx-auto mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Radioactivity</h2>
          <p className="text-muted-foreground mb-4">
            Radioactivity measures the rate at which unstable atomic nuclei decay, emitting radiation. Each decay event releases particles or photons. Activity quantifies how many decays occur per second in a radioactive sample. Higher activity means more decays and more radiation emitted.
          </p>
          <p className="text-muted-foreground">
            The becquerel (Bq) is the SI unit, equal to one decay per second. The curie (Ci) is the traditional unit, originally based on the activity of 1 gram of radium-226. One curie equals 37 billion becquerels, reflecting the high activity of typical radioactive sources.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Radioactivity Formula</h2>
          <p className="text-muted-foreground mb-4">
            Activity relates to the number of radioactive atoms and decay constant:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">A = λ × N</p>
            <p className="text-sm text-muted-foreground mt-2">where A = activity (Bq), λ = decay constant (s⁻¹), N = number of radioactive atoms</p>
          </div>
          <p className="text-muted-foreground mb-4">
            The decay constant relates to half-life:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">λ = ln(2) / T½ = 0.693 / T½</p>
            <p className="text-sm text-muted-foreground mt-2">where T½ = half-life (seconds)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Calculate activity of 1 microgram of Iodine-131 (half-life = 8.02 days, atomic mass = 131 g/mol):
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">N = (1×10⁻⁶ g / 131 g/mol) × 6.022×10²³ = 4.6×10¹⁵ atoms</p>
            <p className="font-mono text-sm">λ = 0.693 / (8.02 × 86400 s) = 1.00×10⁻⁶ s⁻¹</p>
            <p className="font-mono text-sm">A = 1.00×10⁻⁶ × 4.6×10¹⁵ = 4.6×10⁹ Bq = 4.6 GBq = 124 mCi</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Radioactive Decay Over Time</h2>
          <p className="text-muted-foreground mb-4">
            Activity decreases exponentially as radioactive atoms decay:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">A(t) = A₀ × e^(-λt) = A₀ × (1/2)^(t/T½)</p>
            <p className="text-sm text-muted-foreground mt-2">where A(t) = activity at time t, A₀ = initial activity</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A 100 mCi source of Iodine-131 after 24 days (3 half-lives):
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">A = 100 mCi × (1/2)³ = 100 × 0.125 = 12.5 mCi</p>
          </div>
          <p className="text-muted-foreground">
            After each half-life, activity drops by half. After 10 half-lives, only 0.1 percent of original activity remains.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Radioisotope Activities</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Application</th>
                  <th className="border border-border p-3 text-left">Isotope</th>
                  <th className="border border-border p-3 text-left">Typical Activity</th>
                  <th className="border border-border p-3 text-left">Half-life</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Thyroid therapy</td>
                  <td className="border border-border p-3">I-131</td>
                  <td className="border border-border p-3">3.7 to 7.4 GBq (100 to 200 mCi)</td>
                  <td className="border border-border p-3">8.02 days</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Bone scan</td>
                  <td className="border border-border p-3">Tc-99m</td>
                  <td className="border border-border p-3">740 MBq (20 mCi)</td>
                  <td className="border border-border p-3">6 hours</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">PET scan</td>
                  <td className="border border-border p-3">F-18</td>
                  <td className="border border-border p-3">370 MBq (10 mCi)</td>
                  <td className="border border-border p-3">110 minutes</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Smoke detector</td>
                  <td className="border border-border p-3">Am-241</td>
                  <td className="border border-border p-3">37 kBq (1 μCi)</td>
                  <td className="border border-border p-3">432 years</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Industrial radiography</td>
                  <td className="border border-border p-3">Ir-192</td>
                  <td className="border border-border p-3">3.7 TBq (100 Ci)</td>
                  <td className="border border-border p-3">74 days</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Cancer radiotherapy</td>
                  <td className="border border-border p-3">Co-60</td>
                  <td className="border border-border p-3">185 to 370 TBq (5,000 to 10,000 Ci)</td>
                  <td className="border border-border p-3">5.27 years</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Carbon dating</td>
                  <td className="border border-border p-3">C-14</td>
                  <td className="border border-border p-3">0.23 Bq/g (modern carbon)</td>
                  <td className="border border-border p-3">5,730 years</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Exit signs</td>
                  <td className="border border-border p-3">H-3 (tritium)</td>
                  <td className="border border-border p-3">185 to 925 GBq (5 to 25 Ci)</td>
                  <td className="border border-border p-3">12.3 years</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Banana (natural K-40)</td>
                  <td className="border border-border p-3">K-40</td>
                  <td className="border border-border p-3">15 Bq (0.0004 μCi)</td>
                  <td className="border border-border p-3">1.25 billion years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Specific Activity</h2>
          <p className="text-muted-foreground mb-4">
            Specific activity measures activity per unit mass, important for handling and safety:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">SA = A / m = (ln(2) × NA) / (T½ × M)</p>
            <p className="text-sm text-muted-foreground mt-2">where SA = specific activity (Bq/g), NA = Avogadro's number, T½ = half-life (s), M = molar mass (g/mol)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Specific activity of common isotopes:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Isotope</th>
                  <th className="border border-border p-3 text-left">Specific Activity (Bq/g)</th>
                  <th className="border border-border p-3 text-left">Specific Activity (Ci/g)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Tritium (H-3)</td>
                  <td className="border border-border p-3">3.57 × 10¹⁴</td>
                  <td className="border border-border p-3">9,650</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Carbon-14</td>
                  <td className="border border-border p-3">1.65 × 10¹¹</td>
                  <td className="border border-border p-3">4.46</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Iodine-131</td>
                  <td className="border border-border p-3">4.6 × 10¹⁵</td>
                  <td className="border border-border p-3">124,000</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Cobalt-60</td>
                  <td className="border border-border p-3">4.2 × 10¹³</td>
                  <td className="border border-border p-3">1,140</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Cesium-137</td>
                  <td className="border border-border p-3">3.2 × 10¹²</td>
                  <td className="border border-border p-3">87</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Uranium-235</td>
                  <td className="border border-border p-3">8.0 × 10⁴</td>
                  <td className="border border-border p-3">0.0000022</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Uranium-238</td>
                  <td className="border border-border p-3">1.2 × 10⁴</td>
                  <td className="border border-border p-3">0.00000034</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Radium-226</td>
                  <td className="border border-border p-3">3.7 × 10¹⁰</td>
                  <td className="border border-border p-3">1 (by definition)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Conversions</h2>
          <p className="text-muted-foreground mb-4">
            Convert between radioactivity units:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>1 Ci = 37 GBq = 37,000 MBq = 3.7 × 10¹⁰ Bq</li>
            <li>1 mCi = 37 MBq = 37,000 kBq</li>
            <li>1 μCi = 37 kBq = 37,000 Bq</li>
            <li>1 nCi = 37 Bq</li>
            <li>1 pCi = 0.037 Bq</li>
            <li>1 Bq = 2.7 × 10⁻¹¹ Ci = 27 pCi</li>
            <li>1 kBq = 27 nCi</li>
            <li>1 MBq = 27 μCi = 0.027 mCi</li>
            <li>1 GBq = 27 mCi = 0.027 Ci</li>
            <li>1 TBq = 27 Ci</li>
            <li>1 Rutherford (Rd) = 1 MBq = 27 μCi</li>
            <li>1 dpm (disintegration per minute) = 1/60 Bq = 0.01667 Bq</li>
            <li>1 dps (disintegration per second) = 1 Bq</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applications of Radioactivity</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Nuclear medicine imaging (PET, SPECT, gamma cameras)</li>
            <li>Cancer radiotherapy (brachytherapy, external beam)</li>
            <li>Industrial radiography for weld inspection</li>
            <li>Well logging in oil and gas exploration</li>
            <li>Thickness gauging in manufacturing</li>
            <li>Smoke detectors (ionization type)</li>
            <li>Radioisotope thermoelectric generators (RTGs) for spacecraft</li>
            <li>Archaeological and geological dating</li>
            <li>Environmental tracer studies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What is the difference between becquerel and curie?</h3>
            <p className="text-muted-foreground">
              Both measure radioactivity (decays per second). One becquerel equals one decay per second. One curie equals 37 billion decays per second, originally based on the activity of 1 gram of radium-226. The becquerel is the SI unit; the curie is still used in the United States and for high-activity sources because it gives more convenient numbers.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How do you convert mCi to MBq?</h3>
            <p className="text-muted-foreground">
              Multiply mCi by 37 to get MBq. For example, 10 mCi equals 370 MBq. To convert MBq to mCi, divide by 37. This conversion factor comes from the definition: 1 Ci = 37 GBq, so 1 mCi = 37 MBq.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What does dpm mean in radiation measurements?</h3>
            <p className="text-muted-foreground">
              DPM stands for disintegrations per minute, measuring how many atomic decays occur each minute. One dpm equals 1/60 Bq (0.01667 Bq). Geiger counters and scintillation counters often display dpm. To convert to activity in becquerels, divide dpm by 60.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Why is technetium-99m used for medical imaging?</h3>
            <p className="text-muted-foreground">
              Tc-99m has ideal properties for medical imaging: 6-hour half-life (long enough for procedures, short enough to minimize dose), 140 keV gamma emission (easily detected, low patient dose), and versatile chemistry for labeling different compounds. It is produced from molybdenum-99 generators in hospitals, providing fresh activity daily.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
