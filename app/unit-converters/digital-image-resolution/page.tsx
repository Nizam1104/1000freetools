"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function DigitalImageResolutionPage() {
  const config = converterMappings["Digital Image Resolution"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Digital Image Resolution"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Digital Image Resolution Converter</h1>
        <p className="text-muted-foreground">Convert digital image resolution units — DPI, PPI, dots/cm, pixels/mm, and more. Free online resolution converter for photography, printing, and graphic design.</p>
      </div>
      <UnitConverterBase
        title="Digital Image Resolution Converter"
        description="Convert digital image resolution units — DPI, PPI, dots/cm, pixels/mm, and more. Free online resolution converter for photography, printing, and graphic design."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="w-full max-w-4xl mx-auto mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Image Resolution</h2>
          <p className="text-muted-foreground mb-4">
            Image resolution describes the density of pixels or dots in a digital image or printed output. DPI (dots per inch) and PPI (pixels per inch) are the most common units. Higher resolution means more detail but larger file sizes. The right resolution depends on the output method and viewing distance.
          </p>
          <p className="text-muted-foreground">
            DPI technically refers to printer dots, while PPI refers to screen pixels. In practice, these terms are often used interchangeably, though they represent different concepts in digital imaging workflows.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">DPI vs PPI Explained</h2>
          <p className="text-muted-foreground mb-4">
            Understanding the difference between DPI and PPI is essential for quality output:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Term</th>
                  <th className="border border-border p-3 text-left">Stands For</th>
                  <th className="border border-border p-3 text-left">Applies To</th>
                  <th className="border border-border p-3 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">PPI</td>
                  <td className="border border-border p-3">Pixels Per Inch</td>
                  <td className="border border-border p-3">Digital images, displays</td>
                  <td className="border border-border p-3">Number of pixels in one inch of image</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">DPI</td>
                  <td className="border border-border p-3">Dots Per Inch</td>
                  <td className="border border-border p-3">Printers, printed output</td>
                  <td className="border border-border p-3">Number of ink dots per inch of print</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">LPI</td>
                  <td className="border border-border p-3">Lines Per Inch</td>
                  <td className="border border-border p-3">Halftone printing</td>
                  <td className="border border-border p-3">Screen frequency for halftone dots</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">SPPI</td>
                  <td className="border border-border p-3">Samples Per Inch</td>
                  <td className="border border-border p-3">Scanners</td>
                  <td className="border border-border p-3">Sampling resolution of scanner</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-4">
            Printers typically use multiple dots to represent one pixel. A 300 PPI image might print at 1200 to 2400 DPI, with the printer using multiple ink dots to create each pixel's color.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Print Size Calculation</h2>
          <p className="text-muted-foreground mb-4">
            Calculate print size from pixel dimensions and resolution:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Print Width (inches) = Pixel Width / DPI</p>
            <p className="font-mono text-sm">Print Height (inches) = Pixel Height / DPI</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A 6000 × 4000 pixel image at different resolutions:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Resolution</th>
                  <th className="border border-border p-3 text-left">Print Size (inches)</th>
                  <th className="border border-border p-3 text-left">Print Size (cm)</th>
                  <th className="border border-border p-3 text-left">Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">72 PPI</td>
                  <td className="border border-border p-3">83.3 × 55.6</td>
                  <td className="border border-border p-3">211.7 × 141.1</td>
                  <td className="border border-border p-3">Screen display</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">150 PPI</td>
                  <td className="border border-border p-3">40 × 26.7</td>
                  <td className="border border-border p-3">101.6 × 67.7</td>
                  <td className="border border-border p-3">Large format print</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">200 PPI</td>
                  <td className="border border-border p-3">30 × 20</td>
                  <td className="border border-border p-3">76.2 × 50.8</td>
                  <td className="border border-border p-3">Poster print</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">300 PPI</td>
                  <td className="border border-border p-3">20 × 13.3</td>
                  <td className="border border-border p-3">50.8 × 33.9</td>
                  <td className="border border-border p-3">Photo print, magazine</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">600 PPI</td>
                  <td className="border border-border p-3">10 × 6.7</td>
                  <td className="border border-border p-3">25.4 × 16.9</td>
                  <td className="border border-border p-3">High-quality print</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Pixel Dimension Calculation</h2>
          <p className="text-muted-foreground mb-4">
            Calculate required pixel dimensions for a target print size:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Pixel Width = Print Width (inches) × DPI</p>
            <p className="font-mono text-sm">Pixel Height = Print Height (inches) × DPI</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Pixels needed for an 8 × 10 inch print at 300 PPI:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Width = 8 × 300 = 2400 pixels</p>
            <p className="font-mono text-sm">Height = 10 × 300 = 3000 pixels</p>
            <p className="font-mono text-sm">Total = 2400 × 3000 = 7,200,000 pixels (7.2 megapixels)</p>
          </div>
          <p className="text-muted-foreground">
            Example: Pixels needed for a 24 × 36 inch poster at 150 PPI:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">Width = 24 × 150 = 3600 pixels</p>
            <p className="font-mono text-sm">Height = 36 × 150 = 5400 pixels</p>
            <p className="font-mono text-sm">Total = 3600 × 5400 = 19,440,000 pixels (19.4 megapixels)</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Recommended Resolutions by Output Type</h2>
          <p className="text-muted-foreground mb-4">
            Choose resolution based on your output method and viewing distance:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Output Type</th>
                  <th className="border border-border p-3 text-left">Recommended PPI</th>
                  <th className="border border-border p-3 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Web display</td>
                  <td className="border border-border p-3">72 to 96</td>
                  <td className="border border-border p-3">Standard screen resolution</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Retina/HiDPI display</td>
                  <td className="border border-border p-3">144 to 220</td>
                  <td className="border border-border p-3">2x standard for sharp rendering</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Inkjet photo print</td>
                  <td className="border border-border p-3">240 to 360</td>
                  <td className="border border-border p-3">Epson/Canon optimal range</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Magazine printing</td>
                  <td className="border border-border p-3">300</td>
                  <td className="border border-border p-3">Industry standard</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Book printing</td>
                  <td className="border border-border p-3">300 to 400</td>
                  <td className="border border-border p-3">High quality text and images</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Large format poster</td>
                  <td className="border border-border p-3">100 to 150</td>
                  <td className="border border-border p-3">Viewed from distance</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Billboard</td>
                  <td className="border border-border p-3">15 to 30</td>
                  <td className="border border-border p-3">Viewed from far distance</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Newspaper</td>
                  <td className="border border-border p-3">150 to 200</td>
                  <td className="border border-border p-3">Lower quality paper</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Screen printing</td>
                  <td className="border border-border p-3">150 to 225</td>
                  <td className="border border-border p-3">Depends on mesh count</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Offset printing</td>
                  <td className="border border-border p-3">300</td>
                  <td className="border border-border p-3">Standard commercial printing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">LPI and Halftone Screening</h2>
          <p className="text-muted-foreground mb-4">
            Commercial printing uses halftone screens measured in lines per inch (LPI). The relationship between PPI and LPI affects print quality:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Optimal PPI = LPI × Quality Factor</p>
            <p className="text-sm text-muted-foreground mt-2">Quality factor typically 1.5 to 2.0</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Common LPI values and recommended PPI:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Print Type</th>
                  <th className="border border-border p-3 text-left">LPI</th>
                  <th className="border border-border p-3 text-left">Recommended PPI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Newspaper</td>
                  <td className="border border-border p-3">85 to 100</td>
                  <td className="border border-border p-3">150 to 200</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Magazine</td>
                  <td className="border border-border p-3">133 to 150</td>
                  <td className="border border-border p-3">266 to 300</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Annual report</td>
                  <td className="border border-border p-3">150 to 175</td>
                  <td className="border border-border p-3">300 to 350</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Art book</td>
                  <td className="border border-border p-3">175 to 200</td>
                  <td className="border border-border p-3">350 to 400</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Conversions</h2>
          <p className="text-muted-foreground mb-4">
            Convert between resolution units:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>1 DPI = 1 PPI (numerically equal for conversion)</li>
            <li>1 DPI = 0.3937 dots/cm</li>
            <li>1 dots/cm = 2.54 DPI</li>
            <li>1 PPI = 0.3937 pixels/cm</li>
            <li>1 pixels/cm = 2.54 PPI</li>
            <li>1 DPI = 39.37 dots/meter</li>
            <li>1 dots/cm = 10 dots/mm</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            Quick reference:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">DPI/PPI</th>
                  <th className="border border-border p-3 text-left">dots/cm</th>
                  <th className="border border-border p-3 text-left">pixels/mm</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">72</td>
                  <td className="border border-border p-3">28.3</td>
                  <td className="border border-border p-3">2.83</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">96</td>
                  <td className="border border-border p-3">37.8</td>
                  <td className="border border-border p-3">3.78</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">150</td>
                  <td className="border border-border p-3">59.1</td>
                  <td className="border border-border p-3">5.91</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">200</td>
                  <td className="border border-border p-3">78.7</td>
                  <td className="border border-border p-3">7.87</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">300</td>
                  <td className="border border-border p-3">118.1</td>
                  <td className="border border-border p-3">11.81</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">600</td>
                  <td className="border border-border p-3">236.2</td>
                  <td className="border border-border p-3">23.62</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1200</td>
                  <td className="border border-border p-3">472.4</td>
                  <td className="border border-border p-3">47.24</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Screen Resolution Standards</h2>
          <p className="text-muted-foreground mb-4">
            Common display resolutions and their pixel densities:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Display Standard</th>
                  <th className="border border-border p-3 text-left">Resolution</th>
                  <th className="border border-border p-3 text-left">Common Sizes</th>
                  <th className="border border-border p-3 text-left">Approx PPI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">HD (720p)</td>
                  <td className="border border-border p-3">1280 × 720</td>
                  <td className="border border-border p-3">24 inch monitor</td>
                  <td className="border border-border p-3">61</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Full HD (1080p)</td>
                  <td className="border border-border p-3">1920 × 1080</td>
                  <td className="border border-border p-3">24 inch monitor</td>
                  <td className="border border-border p-3">92</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">2K / QHD</td>
                  <td className="border border-border p-3">2560 × 1440</td>
                  <td className="border border-border p-3">27 inch monitor</td>
                  <td className="border border-border p-3">109</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">4K / UHD</td>
                  <td className="border border-border p-3">3840 × 2160</td>
                  <td className="border border-border p-3">27 inch monitor</td>
                  <td className="border border-border p-3">163</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">iPhone (standard)</td>
                  <td className="border border-border p-3">Various</td>
                  <td className="border border-border p-3">6.1 inch</td>
                  <td className="border border-border p-3">460</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">iPhone Pro</td>
                  <td className="border border-border p-3">Various</td>
                  <td className="border border-border p-3">6.1 inch</td>
                  <td className="border border-border p-3">460</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">iPad</td>
                  <td className="border border-border p-3">Various</td>
                  <td className="border border-border p-3">10.9 inch</td>
                  <td className="border border-border p-3">264</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">MacBook Pro</td>
                  <td className="border border-border p-3">3024 × 1964</td>
                  <td className="border border-border p-3">14 inch</td>
                  <td className="border border-border p-3">254</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applications of Resolution Conversion</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Preparing images for print vs web</li>
            <li>Calculating scan resolution for archival</li>
            <li>Setting up design documents in graphic software</li>
            <li>Optimizing photos for social media</li>
            <li>Large format printing and signage</li>
            <li>Photo book and album creation</li>
            <li>Professional photography delivery</li>
            <li>Document scanning and OCR preparation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Is 72 DPI the same as 72 PPI?</h3>
            <p className="text-muted-foreground">
              Numerically yes, but they describe different things. 72 PPI describes a digital image with 72 pixels per inch. 72 DPI describes a printer placing 72 dots per inch. The 72 PPI standard comes from early Macintosh displays. Modern screens range from 100 to 500+ PPI.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What resolution do I need for printing photos?</h3>
            <p className="text-muted-foreground">
              Use 240 to 300 PPI for photo prints viewed at arm's length. Inkjet printers produce best results at 240 or 360 PPI (Epson) or 300 PPI (Canon). Lower resolutions like 150 PPI work for large prints viewed from farther away. Higher than 360 PPI provides no visible improvement for most prints.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How do I calculate print size from pixels?</h3>
            <p className="text-muted-foreground">
              Divide pixel dimensions by the PPI. A 4000 × 3000 pixel image at 300 PPI prints at 4000/300 = 13.3 inches wide by 3000/300 = 10 inches tall. At 150 PPI, the same image prints at 26.7 × 20 inches. Lower PPI means larger print size but less detail.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Can I increase the resolution of an image?</h3>
            <p className="text-muted-foreground">
              Upsampling (increasing PPI) adds pixels through interpolation but cannot create real detail. Modern AI upscaling tools produce better results than traditional methods, but cannot match native high-resolution capture. For best quality, capture or scan at the resolution you need from the start.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
