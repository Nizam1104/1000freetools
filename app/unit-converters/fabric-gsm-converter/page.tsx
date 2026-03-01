"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function FabricGSMConverterPage() {
  const config = converterMappings["Fabric GSM Converter"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Fabric GSM Converter"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Fabric GSM Converter</h1>
        <p className="text-muted-foreground">Convert fabric weight between GSM, oz/yd², and other textile units. Free online fabric GSM converter for fashion designers, garment manufacturers, and textile buyers.</p>
      </div>
      <UnitConverterBase
        title="Fabric GSM Converter"
        description="Convert fabric weight between GSM, oz/yd², and other textile units. Free online fabric GSM converter for fashion designers, garment manufacturers, and textile buyers."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Fabric GSM</h2>
          <p className="text-muted-foreground mb-4">
            GSM (Grams per Square Meter) measures fabric weight and density. Higher GSM indicates heavier, thicker fabric. This measurement is essential for textile quality control, garment specification, and fabric sourcing across international markets.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">GSM Conversion Formulas</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>1 GSM = 0.02949 oz/yd²</p>
            <p>1 oz/yd² = 33.906 GSM</p>
            <p>GSM = Weight (grams) / Area (m²)</p>
            <p>oz/yd² = Weight (oz) / Area (yd²)</p>
          </div>

          <p className="text-muted-foreground">
            GSM is the international standard for fabric weight. Oz/yd² (ounces per square yard) is common in the US and UK. Both measure the same property using different units.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Fabric Weight Categories</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Category</th>
                  <th className="border border-border p-3 text-left">GSM Range</th>
                  <th className="border border-border p-3 text-left">oz/yd² Range</th>
                  <th className="border border-border p-3 text-left">Common Uses</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Ultra Light</td>
                  <td className="border border-border p-3">30-100 GSM</td>
                  <td className="border border-border p-3">1-3 oz/yd²</td>
                  <td className="border border-border p-3">Lining, chiffon, voile</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Light</td>
                  <td className="border border-border p-3">100-150 GSM</td>
                  <td className="border border-border p-3">3-4.5 oz/yd²</td>
                  <td className="border border-border p-3">Shirts, blouses, summer wear</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Medium</td>
                  <td className="border border-border p-3">150-250 GSM</td>
                  <td className="border border-border p-3">4.5-7.5 oz/yd²</td>
                  <td className="border border-border p-3">T-shirts, dresses, light pants</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Heavy</td>
                  <td className="border border-border p-3">250-350 GSM</td>
                  <td className="border border-border p-3">7.5-10 oz/yd²</td>
                  <td className="border border-border p-3">Hoodies, sweatshirts, jackets</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Extra Heavy</td>
                  <td className="border border-border p-3">350+ GSM</td>
                  <td className="border border-border p-3">10+ oz/yd²</td>
                  <td className="border border-border p-3">Coats, denim, upholstery</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Textile Standards by Fabric Type</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">T-Shirt Fabrics</p>
              <p className="text-muted-foreground">
                Lightweight: 130-150 GSM (4-4.5 oz/yd²)<br/>
                Standard: 150-180 GSM (4.5-5.5 oz/yd²)<br/>
                Heavy: 180-220 GSM (5.5-6.5 oz/yd²)<br/>
                Premium: 220-250 GSM (6.5-7.5 oz/yd²)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Hoodie and Sweatshirt Fabrics</p>
              <p className="text-muted-foreground">
                Lightweight: 250-280 GSM (7.5-8.5 oz/yd²)<br/>
                Standard: 280-320 GSM (8.5-9.5 oz/yd²)<br/>
                Heavy: 320-380 GSM (9.5-11 oz/yd²)<br/>
                Premium: 380-450 GSM (11-13 oz/yd²)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Denim Fabrics</p>
              <p className="text-muted-foreground">
                Lightweight: 200-250 GSM (6-7.5 oz/yd²)<br/>
                Standard: 250-350 GSM (7.5-10 oz/yd²)<br/>
                Heavy: 350-450 GSM (10-13 oz/yd²)<br/>
                Selvedge: 400-500+ GSM (12-15 oz/yd²)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Bed Sheet Fabrics</p>
              <p className="text-muted-foreground">
                Percale: 100-130 GSM (3-4 oz/yd²)<br/>
                Sateen: 130-180 GSM (4-5.5 oz/yd²)<br/>
                Flannel: 150-200 GSM (4.5-6 oz/yd²)<br/>
                Higher GSM = warmer, more durable
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">GSM Calculation Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: GSM to oz/yd²</p>
              <p className="text-muted-foreground">
                Fabric: 200 GSM<br/>
                Conversion: 200 × 0.02949 = 5.9 oz/yd²<br/>
                Use: Standard t-shirt weight<br/>
                Suitable for: Year-round wear
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: oz/yd² to GSM</p>
              <p className="text-muted-foreground">
                Fabric: 8 oz/yd²<br/>
                Conversion: 8 × 33.906 = 271 GSM<br/>
                Use: Light hoodie weight<br/>
                Suitable for: Spring/fall sweatshirts
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Calculate GSM from Sample</p>
              <p className="text-muted-foreground">
                Sample: 10 cm × 10 cm = 0.01 m²<br/>
                Weight: 2.5 grams<br/>
                GSM: 2.5 / 0.01 = 250 GSM<br/>
                Use: Heavy t-shirt or light hoodie
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 4: Fabric Order Calculation</p>
              <p className="text-muted-foreground">
                Order: 1000 t-shirts at 180 GSM<br/>
                Fabric per shirt: 1.5 m²<br/>
                Total fabric: 1,500 m²<br/>
                Total weight: 1,500 × 180 = 270 kg
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">GSM Measurement Methods</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Cut and Weigh Method</p>
              <p className="text-muted-foreground">
                Cut 100 cm² sample<br/>
                Weigh on precision scale<br/>
                Multiply by 100 for GSM<br/>
                Most accurate method
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">GSM Cutter</p>
              <p className="text-muted-foreground">
                Use circular cutter (100 cm²)<br/>
                Weigh sample directly<br/>
                Reading = GSM<br/>
                Industry standard tool
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Fabric Balance</p>
              <p className="text-muted-foreground">
                Specialized scale for GSM<br/>
                Direct reading in GSM<br/>
                Quick and convenient<br/>
                Requires calibration
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Online Conversion</p>
              <p className="text-muted-foreground">
                Enter known weight and area<br/>
                Automatic calculation<br/>
                Convert between units<br/>
                Useful for quick estimates
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What is a good GSM for t-shirts?</h3>
              <p className="text-muted-foreground">
                Standard t-shirts use 150-180 GSM. Lightweight summer shirts use 130-150 GSM. Heavy premium shirts use 180-220 GSM. Higher GSM means thicker, more durable fabric but less breathability.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Is higher GSM always better?</h3>
              <p className="text-muted-foreground">
                Higher GSM means heavier fabric, not necessarily better quality. Choose GSM based on garment purpose. Summer wear needs lower GSM. Winter wear benefits from higher GSM. Consider drape and comfort.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I convert GSM to oz/yd²?</h3>
              <p className="text-muted-foreground">
                Multiply GSM by 0.02949. For quick estimation, divide GSM by 34. Example: 200 GSM × 0.02949 = 5.9 oz/yd². Or 200 / 34 = 5.88 oz/yd².
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What GSM is suitable for hoodies?</h3>
              <p className="text-muted-foreground">
                Light hoodies: 250-280 GSM. Standard hoodies: 280-320 GSM. Heavy hoodies: 320-380 GSM. Premium winter hoodies: 380-450 GSM. French terry typically uses 280-350 GSM.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
