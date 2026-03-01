"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ShoeSizeConverterPage() {
  const config = converterMappings["Shoe Size Converter"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Shoe Size Converter"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Shoe Size Converter</h1>
        <p className="text-muted-foreground">Convert shoe sizes between US, UK, EU, and international standards for men, women, and kids. Free online shoe size converter for global shopping and footwear retail.</p>
      </div>
      <UnitConverterBase
        title="Shoe Size Converter"
        description="Convert shoe sizes between US, UK, EU, and international standards for men, women, and kids. Free online shoe size converter for global shopping and footwear retail."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Shoe Size Measurement Systems</h2>
          <p className="text-muted-foreground mb-4">
            Shoe sizes vary by country and gender. The Brannock Device measures foot length and width in the US. EU sizes use Paris points (2/3 cm). UK sizes use barleycorns (1/3 inch). Understanding these systems helps when buying shoes internationally.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Size Conversion Formulas</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>EU = (US + 1) × 1.5 + 30 (approximate)</p>
            <p>UK = US - 1 (men), US - 2 (women)</p>
            <p>CM = (US + 1) × 0.847 + 18 (men)</p>
            <p>JP = CM (Japanese uses centimeters)</p>
          </div>

          <p className="text-muted-foreground">
            Formulas provide estimates only. Actual sizes vary by brand and style. Always try shoes when possible. Measure feet at end of day for best fit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Men's Shoe Size Conversion Table</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">US</th>
                  <th className="border border-border p-3 text-left">UK</th>
                  <th className="border border-border p-3 text-left">EU</th>
                  <th className="border border-border p-3 text-left">CM</th>
                  <th className="border border-border p-3 text-left">Inches</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">6</td>
                  <td className="border border-border p-3">5.5</td>
                  <td className="border border-border p-3">38.5</td>
                  <td className="border border-border p-3">24</td>
                  <td className="border border-border p-3">9.4</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">7</td>
                  <td className="border border-border p-3">6.5</td>
                  <td className="border border-border p-3">40</td>
                  <td className="border border-border p-3">25</td>
                  <td className="border border-border p-3">9.8</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">8</td>
                  <td className="border border-border p-3">7.5</td>
                  <td className="border border-border p-3">41</td>
                  <td className="border border-border p-3">26</td>
                  <td className="border border-border p-3">10.2</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">9</td>
                  <td className="border border-border p-3">8.5</td>
                  <td className="border border-border p-3">42.5</td>
                  <td className="border border-border p-3">27</td>
                  <td className="border border-border p-3">10.6</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">10</td>
                  <td className="border border-border p-3">9.5</td>
                  <td className="border border-border p-3">44</td>
                  <td className="border border-border p-3">28</td>
                  <td className="border border-border p-3">11.0</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">11</td>
                  <td className="border border-border p-3">10.5</td>
                  <td className="border border-border p-3">45</td>
                  <td className="border border-border p-3">29</td>
                  <td className="border border-border p-3">11.4</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">12</td>
                  <td className="border border-border p-3">11.5</td>
                  <td className="border border-border p-3">46</td>
                  <td className="border border-border p-3">30</td>
                  <td className="border border-border p-3">11.8</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">13</td>
                  <td className="border border-border p-3">12.5</td>
                  <td className="border border-border p-3">47.5</td>
                  <td className="border border-border p-3">31</td>
                  <td className="border border-border p-3">12.2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Women's Shoe Size Conversion Table</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">US</th>
                  <th className="border border-border p-3 text-left">UK</th>
                  <th className="border border-border p-3 text-left">EU</th>
                  <th className="border border-border p-3 text-left">CM</th>
                  <th className="border border-border p-3 text-left">Inches</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">5</td>
                  <td className="border border-border p-3">3</td>
                  <td className="border border-border p-3">35.5</td>
                  <td className="border border-border p-3">22</td>
                  <td className="border border-border p-3">8.7</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">6</td>
                  <td className="border border-border p-3">4</td>
                  <td className="border border-border p-3">36.5</td>
                  <td className="border border-border p-3">23</td>
                  <td className="border border-border p-3">9.1</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">7</td>
                  <td className="border border-border p-3">5</td>
                  <td className="border border-border p-3">37.5</td>
                  <td className="border border-border p-3">24</td>
                  <td className="border border-border p-3">9.4</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">8</td>
                  <td className="border border-border p-3">6</td>
                  <td className="border border-border p-3">38.5</td>
                  <td className="border border-border p-3">25</td>
                  <td className="border border-border p-3">9.8</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">9</td>
                  <td className="border border-border p-3">7</td>
                  <td className="border border-border p-3">40</td>
                  <td className="border border-border p-3">26</td>
                  <td className="border border-border p-3">10.2</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">10</td>
                  <td className="border border-border p-3">8</td>
                  <td className="border border-border p-3">41</td>
                  <td className="border border-border p-3">27</td>
                  <td className="border border-border p-3">10.6</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">11</td>
                  <td className="border border-border p-3">9</td>
                  <td className="border border-border p-3">42.5</td>
                  <td className="border border-border p-3">28</td>
                  <td className="border border-border p-3">11.0</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">12</td>
                  <td className="border border-border p-3">10</td>
                  <td className="border border-border p-3">44</td>
                  <td className="border border-border p-3">29</td>
                  <td className="border border-border p-3">11.4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How to Measure Foot Size</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Using the Brannock Device</p>
              <p className="text-muted-foreground">
                Stand with full weight on foot<br/>
                Heel against back of device<br/>
                Slide marker to longest toe<br/>
                Read length and width measurements
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Home Measurement Method</p>
              <p className="text-muted-foreground">
                Place foot on paper<br/>
                Trace around foot with pencil<br/>
                Measure heel to longest toe<br/>
                Compare to size chart
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Width Measurement</p>
              <p className="text-muted-foreground">
                Measure widest part of foot<br/>
                Usually across ball of foot<br/>
                Compare to width chart<br/>
                US widths: AAA (narrow) to EEE (wide)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Best Measurement Practices</p>
              <p className="text-muted-foreground">
                Measure at end of day<br/>
                Feet swell throughout day<br/>
                Measure both feet<br/>
                Use larger foot for sizing
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Size Conversion Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: US Men's to EU</p>
              <p className="text-muted-foreground">
                US Men's: 10<br/>
                UK: 9.5<br/>
                EU: 44<br/>
                CM: 28
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: US Women's to UK</p>
              <p className="text-muted-foreground">
                US Women's: 8<br/>
                UK: 6<br/>
                EU: 38.5<br/>
                CM: 25
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Kids to Adult</p>
              <p className="text-muted-foreground">
                US Kids 4 = US Women's 6<br/>
                US Kids 4 = US Men's 4.5<br/>
                Transition at size 4<br/>
                Check specific brand charts
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 4: Athletic Shoe Sizing</p>
              <p className="text-muted-foreground">
                Running shoes: Size up 0.5<br/>
                Basketball: True to size<br/>
                Soccer cleats: Snug fit<br/>
                Hiking boots: Room for thick socks
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Why are men's and women's shoe sizes different?</h3>
              <p className="text-muted-foreground">
                Men's and women's feet have different proportions. Women's sizes are typically 1.5-2 sizes higher than men's for the same foot length. A men's 8 equals approximately a women's 9.5-10.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How often should I measure my feet?</h3>
              <p className="text-muted-foreground">
                Measure feet every 1-2 years. Feet change with age, weight, and pregnancy. Measure before buying expensive shoes. Children need measurement every 2-3 months during growth spurts.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What if my feet are different sizes?</h3>
              <p className="text-muted-foreground">
                Most people have one foot slightly larger. Always fit to the larger foot. Use insoles or pads for the smaller foot if needed. Custom orthotics can address significant differences.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Do shoe sizes vary by brand?</h3>
              <p className="text-muted-foreground">
                Yes, sizes vary significantly between brands. Nike runs narrow. New Balance offers multiple widths. European brands often run smaller. Always check brand-specific size charts and reviews.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
