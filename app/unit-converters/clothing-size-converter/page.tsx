"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ClothingSizeConverterPage() {
  const config = converterMappings["Clothing Size Converter"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Clothing Size Converter"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Clothing Size Converter</h1>
        <p className="text-muted-foreground">Convert clothing sizes between US, UK, EU, and Asian standards for men, women, and kids. Free online clothes size converter for international shopping and fashion retail.</p>
      </div>
      <UnitConverterBase
        title="Clothing Size Converter"
        description="Convert clothing sizes between US, UK, EU, and Asian standards for men, women, and kids. Free online clothes size converter for international shopping and fashion retail."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">International Size Standards</h2>
          <p className="text-muted-foreground mb-4">
            Clothing sizes vary significantly between countries. US and UK use different numbering systems. EU uses centimeter-based sizing. Asian sizes run smaller than Western sizes. Understanding these differences helps when shopping internationally.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Size Conversion Basics</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>US to UK: Women subtract 2, Men same</p>
            <p>US to EU: Women add 30-32, Men add 10</p>
            <p>EU to cm: EU size ≈ chest/waist in cm</p>
            <p>Asian sizes: Usually 1-2 sizes smaller</p>
          </div>

          <p className="text-muted-foreground">
            Size conversions are approximate. Different brands vary significantly. Always check specific brand size charts. Body measurements provide most accurate sizing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Women's Size Conversion Table</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">US</th>
                  <th className="border border-border p-3 text-left">UK</th>
                  <th className="border border-border p-3 text-left">EU</th>
                  <th className="border border-border p-3 text-left">IT</th>
                  <th className="border border-border p-3 text-left">Bust (in)</th>
                  <th className="border border-border p-3 text-left">Waist (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">0</td>
                  <td className="border border-border p-3">4</td>
                  <td className="border border-border p-3">32</td>
                  <td className="border border-border p-3">36</td>
                  <td className="border border-border p-3">31</td>
                  <td className="border border-border p-3">24</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">2</td>
                  <td className="border border-border p-3">6</td>
                  <td className="border border-border p-3">34</td>
                  <td className="border border-border p-3">38</td>
                  <td className="border border-border p-3">32</td>
                  <td className="border border-border p-3">25</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">4</td>
                  <td className="border border-border p-3">8</td>
                  <td className="border border-border p-3">36</td>
                  <td className="border border-border p-3">40</td>
                  <td className="border border-border p-3">33</td>
                  <td className="border border-border p-3">26</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">6</td>
                  <td className="border border-border p-3">10</td>
                  <td className="border border-border p-3">38</td>
                  <td className="border border-border p-3">42</td>
                  <td className="border border-border p-3">34.5</td>
                  <td className="border border-border p-3">27.5</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">8</td>
                  <td className="border border-border p-3">12</td>
                  <td className="border border-border p-3">40</td>
                  <td className="border border-border p-3">44</td>
                  <td className="border border-border p-3">36</td>
                  <td className="border border-border p-3">29</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">10</td>
                  <td className="border border-border p-3">14</td>
                  <td className="border border-border p-3">42</td>
                  <td className="border border-border p-3">46</td>
                  <td className="border border-border p-3">37.5</td>
                  <td className="border border-border p-3">30.5</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">12</td>
                  <td className="border border-border p-3">16</td>
                  <td className="border border-border p-3">44</td>
                  <td className="border border-border p-3">48</td>
                  <td className="border border-border p-3">39</td>
                  <td className="border border-border p-3">32</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">14</td>
                  <td className="border border-border p-3">18</td>
                  <td className="border border-border p-3">46</td>
                  <td className="border border-border p-3">50</td>
                  <td className="border border-border p-3">40.5</td>
                  <td className="border border-border p-3">33.5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Men's Size Conversion Table</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">US/UK</th>
                  <th className="border border-border p-3 text-left">EU</th>
                  <th className="border border-border p-3 text-left">IT</th>
                  <th className="border border-border p-3 text-left">Chest (in)</th>
                  <th className="border border-border p-3 text-left">Waist (in)</th>
                  <th className="border border-border p-3 text-left">Neck (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">XS</td>
                  <td className="border border-border p-3">44</td>
                  <td className="border border-border p-3">42</td>
                  <td className="border border-border p-3">34-36</td>
                  <td className="border border-border p-3">28-30</td>
                  <td className="border border-border p-3">14</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">S</td>
                  <td className="border border-border p-3">46</td>
                  <td className="border border-border p-3">44</td>
                  <td className="border border-border p-3">36-38</td>
                  <td className="border border-border p-3">30-32</td>
                  <td className="border border-border p-3">14.5</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">M</td>
                  <td className="border border-border p-3">48</td>
                  <td className="border border-border p-3">46</td>
                  <td className="border border-border p-3">38-40</td>
                  <td className="border border-border p-3">32-34</td>
                  <td className="border border-border p-3">15</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">L</td>
                  <td className="border border-border p-3">50</td>
                  <td className="border border-border p-3">48</td>
                  <td className="border border-border p-3">40-42</td>
                  <td className="border border-border p-3">34-36</td>
                  <td className="border border-border p-3">15.5</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">XL</td>
                  <td className="border border-border p-3">52</td>
                  <td className="border border-border p-3">50</td>
                  <td className="border border-border p-3">42-44</td>
                  <td className="border border-border p-3">36-38</td>
                  <td className="border border-border p-3">16</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">XXL</td>
                  <td className="border border-border p-3">54</td>
                  <td className="border border-border p-3">52</td>
                  <td className="border border-border p-3">44-46</td>
                  <td className="border border-border p-3">38-40</td>
                  <td className="border border-border p-3">16.5</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">3XL</td>
                  <td className="border border-border p-3">56</td>
                  <td className="border border-border p-3">54</td>
                  <td className="border border-border p-3">46-48</td>
                  <td className="border border-border p-3">40-42</td>
                  <td className="border border-border p-3">17</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How to Measure for Clothing</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Bust/Chest Measurement</p>
              <p className="text-muted-foreground">
                Measure around fullest part of bust/chest<br />
                Keep tape parallel to floor<br />
                Don't pull tape too tight<br />
                Breathe normally during measurement
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Waist Measurement</p>
              <p className="text-muted-foreground">
                Measure at natural waistline<br />
                Usually at narrowest point<br />
                Above belly button<br />
                Keep one finger under tape
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Hip Measurement</p>
              <p className="text-muted-foreground">
                Measure around fullest part of hips<br />
                Usually 7-9 inches below waist<br />
                Keep feet together<br />
                Important for pants and skirts
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Inseam Measurement</p>
              <p className="text-muted-foreground">
                Measure from crotch to ankle bone<br />
                Stand straight with legs slightly apart<br />
                Use well-fitting pants as reference<br />
                Important for pants length
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Size Conversion Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: US to EU Women's</p>
              <p className="text-muted-foreground">
                US Size: 8<br />
                UK Size: 12<br />
                EU Size: 40<br />
                Italian Size: 44
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: EU to US Men's</p>
              <p className="text-muted-foreground">
                EU Size: 50<br />
                US/UK Size: L<br />
                Chest: 40-42 inches<br />
                Waist: 34-36 inches
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Asian Size Conversion</p>
              <p className="text-muted-foreground">
                Asian L ≈ US M<br />
                Asian XL ≈ US L<br />
                Asian XXL ≈ US XL<br />
                Always check specific brand charts
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 4: Plus Size Conversion</p>
              <p className="text-muted-foreground">
                US 16W = UK 20 = EU 48<br />
                US 18W = UK 22 = EU 50<br />
                US 20W = UK 24 = EU 52<br />
                W indicates women's plus sizing
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Why do sizes vary between brands?</h3>
              <p className="text-muted-foreground">
                Each brand uses different fit models and target demographics. Vanity sizing makes customers feel thinner. European brands often run smaller. Always check brand-specific size charts.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I convert jeans sizes?</h3>
              <p className="text-muted-foreground">
                Jeans use waist and inseam measurements. US sizes show W (waist) × L (length). EU sizes add 10 to US waist. UK sizes match US for men's jeans. Women's jeans use numbered sizing.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is vanity sizing?</h3>
              <p className="text-muted-foreground">
                Vanity sizing labels larger clothes with smaller numbers. A size 8 today may equal a size 12 from decades ago. This practice varies by brand and country. Focus on measurements, not numbers.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How accurate are online size converters?</h3>
              <p className="text-muted-foreground">
                Converters provide general guidelines only. Actual fit varies by brand, style, and fabric. Use body measurements for best results. Read customer reviews for fit information.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
