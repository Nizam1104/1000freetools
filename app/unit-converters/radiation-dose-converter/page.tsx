"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function RadiationDoseConverterPage() {
  const config = converterMappings["Radiation Dose Converter"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Radiation Dose Converter"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Radiation Dose Converter</h1>
        <p className="text-muted-foreground">Convert radiation dose units — gray, rad, sievert, rem, and more. Free online radiation dose converter for medical physics, radiology, nuclear safety, and health physics.</p>
      </div>
      <UnitConverterBase
        title="Radiation Dose Converter"
        description="Convert radiation dose units — gray, rad, sievert, rem, and more. Free online radiation dose converter for medical physics, radiology, nuclear safety, and health physics."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="w-full max-w-4xl mx-auto mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Radiation Dose Units</h2>
          <p className="text-muted-foreground mb-4">
            Radiation dose measurements fall into two categories: absorbed dose and equivalent dose. Absorbed dose measures energy deposited in tissue, expressed in gray (Gy) or rad. Equivalent dose accounts for biological effectiveness of different radiation types, expressed in sievert (Sv) or rem.
          </p>
          <p className="text-muted-foreground">
            The gray (Gy) is the SI unit for absorbed dose, equal to one joule per kilogram. The sievert (Sv) is the SI unit for equivalent and effective dose, used for radiation protection. For gamma rays and beta particles, 1 Gy equals 1 Sv because the radiation weighting factor is 1.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Absorbed Dose: Gray and Rad</h2>
          <p className="text-muted-foreground mb-4">
            Absorbed dose quantifies energy deposited by ionizing radiation per unit mass:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">D = E / m</p>
            <p className="text-sm text-muted-foreground mt-2">where D = absorbed dose (Gy), E = energy deposited (J), m = mass (kg)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Unit conversions:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>1 Gy = 100 rad</li>
            <li>1 rad = 0.01 Gy = 10 mGy</li>
            <li>1 Gy = 1 J/kg</li>
            <li>1 mGy = 0.1 rad</li>
          </ul>
          <p className="text-muted-foreground">
            The rad (radiation absorbed dose) was used before the gray was adopted in 1975. One gray represents a substantial dose: typical medical imaging uses milligray (mGy) ranges.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Equivalent Dose: Sievert and Rem</h2>
          <p className="text-muted-foreground mb-4">
            Equivalent dose accounts for varying biological damage from different radiation types:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">H = D × wR</p>
            <p className="text-sm text-muted-foreground mt-2">where H = equivalent dose (Sv), D = absorbed dose (Gy), wR = radiation weighting factor</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Radiation weighting factors (wR):
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Radiation Type</th>
                  <th className="border border-border p-3 text-left">Weighting Factor (wR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Gamma rays, X-rays</td>
                  <td className="border border-border p-3">1</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Beta particles</td>
                  <td className="border border-border p-3">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Protons</td>
                  <td className="border border-border p-3">2</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Neutrons (thermal)</td>
                  <td className="border border-border p-3">2.5</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Neutrons (fast)</td>
                  <td className="border border-border p-3">10 to 20</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Alpha particles</td>
                  <td className="border border-border p-3">20</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Heavy ions</td>
                  <td className="border border-border p-3">20</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-4 mb-4">
            Unit conversions:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>1 Sv = 100 rem</li>
            <li>1 rem = 0.01 Sv = 10 mSv</li>
            <li>1 mSv = 0.1 rem</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Radiation Exposure Levels</h2>
          <p className="text-muted-foreground mb-4">
            Common radiation doses from natural and artificial sources:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Source</th>
                  <th className="border border-border p-3 text-left">Dose (mSv)</th>
                  <th className="border border-border p-3 text-left">Dose (mrem)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Natural background (annual, worldwide avg)</td>
                  <td className="border border-border p-3">2.4</td>
                  <td className="border border-border p-3">240</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Natural background (annual, US avg)</td>
                  <td className="border border-border p-3">3.1</td>
                  <td className="border border-border p-3">310</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Chest X-ray (single)</td>
                  <td className="border border-border p-3">0.1</td>
                  <td className="border border-border p-3">10</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Dental X-ray (single)</td>
                  <td className="border border-border p-3">0.005</td>
                  <td className="border border-border p-3">0.5</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Mammogram (bilateral)</td>
                  <td className="border border-border p-3">0.4</td>
                  <td className="border border-border p-3">40</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">CT head</td>
                  <td className="border border-border p-3">2.0</td>
                  <td className="border border-border p-3">200</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">CT chest</td>
                  <td className="border border-border p-3">7.0</td>
                  <td className="border border-border p-3">700</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">CT abdomen/pelvis</td>
                  <td className="border border-border p-3">10.0</td>
                  <td className="border border-border p-3">1000</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Transatlantic flight</td>
                  <td className="border border-border p-3">0.05</td>
                  <td className="border border-border p-3">5</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Nuclear worker annual limit (US)</td>
                  <td className="border border-border p-3">50</td>
                  <td className="border border-border p-3">5000</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Public annual limit (above background)</td>
                  <td className="border border-border p-3">1</td>
                  <td className="border border-border p-3">100</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Acute radiation sickness threshold</td>
                  <td className="border border-border p-3">1000</td>
                  <td className="border border-border p-3">100,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">LD50/60 (lethal dose 50 percent)</td>
                  <td className="border border-border p-3">3500 to 4500</td>
                  <td className="border border-border p-3">350,000 to 450,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Radiation Dose Limits</h2>
          <p className="text-muted-foreground mb-4">
            Regulatory agencies set dose limits to protect workers and the public:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Category</th>
                  <th className="border border-border p-3 text-left">Annual Limit (mSv)</th>
                  <th className="border border-border p-3 text-left">Annual Limit (rem)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Occupational (whole body, US)</td>
                  <td className="border border-border p-3">50</td>
                  <td className="border border-border p-3">5</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Occupational (lens of eye, US)</td>
                  <td className="border border-border p-3">150</td>
                  <td className="border border-border p-3">15</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Occupational (skin, hands, feet)</td>
                  <td className="border border-border p-3">500</td>
                  <td className="border border-border p-3">50</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Public (continuous exposure)</td>
                  <td className="border border-border p-3">1</td>
                  <td className="border border-border p-3">0.1</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Public (infrequent exposure)</td>
                  <td className="border border-border p-3">5</td>
                  <td className="border border-border p-3">0.5</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Pregnant worker (to fetus)</td>
                  <td className="border border-border p-3">5 (total)</td>
                  <td className="border border-border p-3">0.5 (total)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Half-Life and Radioactive Decay</h2>
          <p className="text-muted-foreground mb-4">
            Radioactive materials decay over time according to their half-life:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">A = A₀ × (1/2)^(t/T½)</p>
            <p className="text-sm text-muted-foreground mt-2">where A = activity at time t, A₀ = initial activity, T½ = half-life</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Common radioisotope half-lives:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>Iodine-131: 8 days (medical therapy)</li>
            <li>Technetium-99m: 6 hours (medical imaging)</li>
            <li>Cesium-137: 30 years (industrial sources)</li>
            <li>Cobalt-60: 5.27 years (radiotherapy)</li>
            <li>Uranium-238: 4.47 billion years</li>
            <li>Carbon-14: 5,730 years (dating)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Conversions</h2>
          <p className="text-muted-foreground mb-4">
            Convert between radiation dose units:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>1 Gy = 100 rad</li>
            <li>1 Sv = 100 rem</li>
            <li>1 mGy = 0.1 rad = 100 mrad</li>
            <li>1 mSv = 0.1 rem = 100 mrem</li>
            <li>1 μGy = 0.0001 rad = 0.1 mrad</li>
            <li>1 μSv = 0.0001 rem = 0.1 mrem</li>
            <li>1 kGy = 100,000 rad</li>
            <li>1 kSv = 100,000 rem</li>
          </ul>
          <p className="text-muted-foreground">
            For gamma and beta radiation, absorbed dose in Gy equals equivalent dose in Sv because the weighting factor is 1.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applications of Radiation Dose Measurement</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Medical imaging dose tracking and optimization</li>
            <li>Radiation therapy treatment planning</li>
            <li>Occupational radiation monitoring</li>
            <li>Environmental radiation surveillance</li>
            <li>Nuclear emergency response</li>
            <li>Radiation shielding design</li>
            <li>Food irradiation process control</li>
            <li>Industrial radiography safety</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What is the difference between gray and sievert?</h3>
            <p className="text-muted-foreground">
              Gray measures absorbed dose (energy deposited per kg), while sievert measures equivalent dose (biological effect). For X-rays and gamma rays, 1 Gy equals 1 Sv. For alpha particles, 1 Gy equals 20 Sv because alpha radiation causes 20 times more biological damage per unit of absorbed energy.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How much radiation is safe?</h3>
            <p className="text-muted-foreground">
              Natural background radiation averages 2.4 to 3.1 mSv per year worldwide. Regulatory limits for radiation workers are 50 mSv per year (US) or 20 mSv per year averaged over 5 years (ICRP). The public limit is 1 mSv per year above natural background. No dose is completely risk-free, but low doses carry very small risks.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Is a CT scan dangerous?</h3>
            <p className="text-muted-foreground">
              CT scans deliver higher doses than X-rays but provide valuable diagnostic information. A CT abdomen (10 mSv) equals about 3 years of natural background radiation. The cancer risk from a single CT scan is very small, estimated at less than 0.1 percent. Medical benefits typically outweigh radiation risks, but unnecessary scans should be avoided.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What does rem stand for?</h3>
            <p className="text-muted-foreground">
              Rem stands for Roentgen Equivalent Man. It was developed to express equivalent dose, accounting for different biological effects of radiation types. The rem has been largely replaced by the sievert (1 Sv = 100 rem), but rem is still commonly used in the United States for radiation protection purposes.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
