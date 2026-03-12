"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ThreadCountConverterPage() {
  const config = converterMappings["Thread Count Converter"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Thread Count Converter"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Thread Count Converter</h1>
        <p className="text-muted-foreground">Convert and compare thread count values across different measurement standards for bed sheets and fabrics. Free online thread count converter for textile buyers and bedding shoppers.</p>
      </div>
      <UnitConverterBase
        title="Thread Count Converter"
        description="Convert and compare thread count values across different measurement standards for bed sheets and fabrics. Free online thread count converter for textile buyers and bedding shoppers."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Thread Count</h2>
          <p className="text-muted-foreground mb-4">
            Thread count measures the number of threads woven into one square inch of fabric. It includes both warp (vertical) and weft (horizontal) threads. Higher thread count generally indicates finer, softer fabric, but quality depends on fiber type and weave.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Thread Count Formula</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>Thread Count = Warp Threads + Weft Threads per sq inch</p>
            <p>TC per cm² = TC per in² / 6.45</p>
            <p>TC per in² = TC per cm² × 6.45</p>
          </div>

          <p className="text-muted-foreground">
            One square inch equals 6.45 square centimeters. Thread count per square centimeter is approximately 1/6.45 of the per-inch count. Some manufacturers use multi-ply counting methods.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Thread Count Quality Guide</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Thread Count</th>
                  <th className="border border-border p-3 text-left">Quality Level</th>
                  <th className="border border-border p-3 text-left">Feel</th>
                  <th className="border border-border p-3 text-left">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">80-120 TC</td>
                  <td className="border border-border p-3">Economy</td>
                  <td className="border border-border p-3">Coarse</td>
                  <td className="border border-border p-3">Guest rooms, budget</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">120-180 TC</td>
                  <td className="border border-border p-3">Standard</td>
                  <td className="border border-border p-3">Medium</td>
                  <td className="border border-border p-3">Everyday use</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">180-250 TC</td>
                  <td className="border border-border p-3">Good</td>
                  <td className="border border-border p-3">Soft</td>
                  <td className="border border-border p-3">Quality bedding</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">250-400 TC</td>
                  <td className="border border-border p-3">Very Good</td>
                  <td className="border border-border p-3">Very soft</td>
                  <td className="border border-border p-3">Luxury bedding</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">400-600 TC</td>
                  <td className="border border-border p-3">Excellent</td>
                  <td className="border border-border p-3">Silky</td>
                  <td className="border border-border p-3">Premium hotels</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">600+ TC</td>
                  <td className="border border-border p-3">Ultra Luxury</td>
                  <td className="border border-border p-3">Extremely soft</td>
                  <td className="border border-border p-3">High-end luxury</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Weave Types and Thread Count</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Percale Weave</p>
              <p className="text-muted-foreground">
                One-over-one-under pattern<br />
                Crisp, cool feel<br />
                Typical TC: 180-300<br />
                Best for: Hot sleepers, summer
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Sateen Weave</p>
              <p className="text-muted-foreground">
                Three-over-one-under pattern<br />
                Silky, lustrous surface<br />
                Typical TC: 300-600<br />
                Best for: Luxury feel, warmth
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Twill Weave</p>
              <p className="text-muted-foreground">
                Diagonal rib pattern<br />
                Durable, drapes well<br />
                Typical TC: 200-400<br />
                Best for: Durability, wrinkles resist
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Jersey Knit</p>
              <p className="text-muted-foreground">
                Knitted, not woven<br />
                T-shirt feel, stretchy<br />
                Thread count not applicable<br />
                Best for: Casual, cozy feel
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Thread Count Conversion Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: TC per in² to TC per cm²</p>
              <p className="text-muted-foreground">
                Thread count: 300 TC/in²<br />
                Conversion: 300 / 6.45 = 46.5 TC/cm²<br />
                Quality: Very good bedding<br />
                Feel: Soft and smooth
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: TC per cm² to TC per in²</p>
              <p className="text-muted-foreground">
                Thread count: 80 TC/cm²<br />
                Conversion: 80 × 6.45 = 516 TC/in²<br />
                Quality: Excellent luxury<br />
                Feel: Silky smooth
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Multi-ply Thread Count</p>
              <p className="text-muted-foreground">
                Single-ply: 200 threads each direction<br />
                Actual TC: 400<br />
                Two-ply marketing: 800 TC<br />
                Quality same as 400 TC single-ply
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 4: Fiber Quality Impact</p>
              <p className="text-muted-foreground">
                300 TC Egyptian cotton: Excellent<br />
                300 TC regular cotton: Good<br />
                600 TC polyester blend: Marketing<br />
                Fiber quality matters more than TC
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Thread Count Myths</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Higher is Not Always Better</p>
              <p className="text-muted-foreground">
                300-500 TC is optimal range<br />
                Above 600 may use multi-ply tricks<br />
                1000+ TC often marketing gimmick<br />
                Focus on fiber quality instead
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Multi-Ply Inflation</p>
              <p className="text-muted-foreground">
                Two-ply threads count doubled<br />
                400 TC two-ply = 800 marketed<br />
                Same quality as 400 single-ply<br />
                Check if TC is single or multi-ply
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Fiber Quality Matters</p>
              <p className="text-muted-foreground">
                Long-staple cotton = better sheets<br />
                Egyptian, Pima, Supima are premium<br />
                300 TC Egyptian beats 600 TC regular<br />
                Fiber length affects softness
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Weave Affects Feel</p>
              <p className="text-muted-foreground">
                Percale: Crisp and cool<br />
                Sateen: Silky and warm<br />
                Same TC, different feel<br />
                Choose weave for preference
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What thread count is best for sheets?</h3>
              <p className="text-muted-foreground">
                300-500 thread count offers the best balance of softness, durability, and breathability. Below 200 feels coarse. Above 600 may use marketing tricks. Focus on fiber quality and weave type.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Is 1000 thread count real?</h3>
              <p className="text-muted-foreground">
                True 1000 TC is rare and expensive. Most 1000+ TC uses multi-ply threads or inflated counting. A genuine 400-500 TC single-ply sheet often feels better than marketed 1000 TC.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the difference between warp and weft?</h3>
              <p className="text-muted-foreground">
                Warp threads run lengthwise on the loom. Weft threads run crosswise. Thread count adds both together. Balanced weave has similar warp and weft counts.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Does thread count affect cooling?</h3>
              <p className="text-muted-foreground">
                Lower thread count (200-400) breathes better. Higher thread count traps more heat. Percale weave cools better than sateen. Natural fibers cool better than synthetics.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
