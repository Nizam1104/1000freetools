"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ImageDPIConverterPage() {
  const config = converterMappings["Image DPI Converter"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Image DPI Converter"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Image DPI Converter</h1>
        <p className="text-muted-foreground">Convert image DPI and calculate print size from pixel dimensions. Free online image DPI converter for photographers, designers, and print-ready file preparation.</p>
      </div>
      <UnitConverterBase
        title="Image DPI Converter"
        description="Convert image DPI and calculate print size from pixel dimensions. Free online image DPI converter for photographers, designers, and print-ready file preparation."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding DPI and PPI</h2>
          <p className="text-muted-foreground mb-4">DPI stands for dots per inch. PPI stands for pixels per inch. Both measure image resolution. DPI applies to printed output. PPI applies to digital displays.</p>
          <p className="text-muted-foreground mb-4">Higher DPI values produce sharper prints. Standard photo printing uses 300 DPI. Large format prints like posters use 150 DPI. Billboards use 30-50 DPI because viewing distance is far.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">DPI Standards for Print</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Print Type</th>
                  <th className="text-left py-3 px-4 font-medium">Recommended DPI</th>
                  <th className="text-left py-3 px-4 font-medium">Viewing Distance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Photo prints (4x6, 5x7)</td>
                  <td className="py-3 px-4">300 DPI</td>
                  <td className="py-3 px-4">Close (arm length)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Magazine printing</td>
                  <td className="py-3 px-4">300 DPI</td>
                  <td className="py-3 px-4">Close</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Brochures and flyers</td>
                  <td className="py-3 px-4">300 DPI</td>
                  <td className="py-3 px-4">Close</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Posters (18x24)</td>
                  <td className="py-3 px-4">150-200 DPI</td>
                  <td className="py-3 px-4">2-3 feet</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Large banners</td>
                  <td className="py-3 px-4">100-150 DPI</td>
                  <td className="py-3 px-4">5-10 feet</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Billboards</td>
                  <td className="py-3 px-4">30-50 DPI</td>
                  <td className="py-3 px-4">50+ feet</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Newspaper</td>
                  <td className="py-3 px-4">150-200 DPI</td>
                  <td className="py-3 px-4">1-2 feet</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Print Size Calculation Formula</h2>
          <p className="text-muted-foreground mb-4">Calculate print dimensions from pixel dimensions and DPI.</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2 mb-4">
            <div>Print Width (inches) = Pixel Width ÷ DPI</div>
            <div>Print Height (inches) = Pixel Height ÷ DPI</div>
            <div>Required Pixels = Print Size (inches) × DPI</div>
          </div>
          <p className="text-muted-foreground mb-4">Example: Calculating print size for a 3000 x 2400 pixel image at 300 DPI</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            Width: 3000 ÷ 300 = 10 inches
            Height: 2400 ÷ 300 = 8 inches
            Print size: 10 x 8 inches at 300 DPI
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Image Resolutions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Resolution</th>
                  <th className="text-left py-3 px-4 font-medium">Pixels</th>
                  <th className="text-left py-3 px-4 font-medium">Print at 300 DPI</th>
                  <th className="text-left py-3 px-4 font-medium">Print at 150 DPI</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">VGA</td>
                  <td className="py-3 px-4">640 x 480</td>
                  <td className="py-3 px-4">2.1 x 1.6 in</td>
                  <td className="py-3 px-4">4.3 x 3.2 in</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">HD (720p)</td>
                  <td className="py-3 px-4">1280 x 720</td>
                  <td className="py-3 px-4">4.3 x 2.4 in</td>
                  <td className="py-3 px-4">8.5 x 4.8 in</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Full HD (1080p)</td>
                  <td className="py-3 px-4">1920 x 1080</td>
                  <td className="py-3 px-4">6.4 x 3.6 in</td>
                  <td className="py-3 px-4">12.8 x 7.2 in</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">2K</td>
                  <td className="py-3 px-4">2560 x 1440</td>
                  <td className="py-3 px-4">8.5 x 4.8 in</td>
                  <td className="py-3 px-4">17.1 x 9.6 in</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">4K UHD</td>
                  <td className="py-3 px-4">3840 x 2160</td>
                  <td className="py-3 px-4">12.8 x 7.2 in</td>
                  <td className="py-3 px-4">25.6 x 14.4 in</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">6K</td>
                  <td className="py-3 px-4">6144 x 3456</td>
                  <td className="py-3 px-4">20.5 x 11.5 in</td>
                  <td className="py-3 px-4">41.0 x 23.0 in</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">8K UHD</td>
                  <td className="py-3 px-4">7680 x 4320</td>
                  <td className="py-3 px-4">25.6 x 14.4 in</td>
                  <td className="py-3 px-4">51.2 x 28.8 in</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Scanning Resolution Guide</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Scan photos at 300 DPI for standard prints</li>
            <li>Scan negatives at 2400-4800 DPI for enlargement</li>
            <li>Scan documents at 150-200 DPI for archival</li>
            <li>Scan film slides at 3000+ DPI for maximum detail</li>
            <li>Match scan DPI to your intended output size and quality</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">What DPI should I use for printing photos?</h3>
              <p className="text-muted-foreground">Use 300 DPI for photo prints viewed at arm length. This resolution produces sharp, detailed prints. Lower DPI works for larger prints viewed from farther away.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Does increasing DPI improve image quality?</h3>
              <p className="text-muted-foreground">No. Increasing DPI without adding pixels just makes the image print smaller. True quality improvement requires more original pixel data. Upscaling creates artificial pixels that reduce sharpness.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">What is the difference between DPI and PPI?</h3>
              <p className="text-muted-foreground">DPI refers to printer dots per inch. PPI refers to image pixels per inch. Screens use PPI. Printers use DPI. The terms get used interchangeably but have different technical meanings.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How large can I print my 12 megapixel photo?</h3>
              <p className="text-muted-foreground">A 12 MP photo (4000 x 3000 pixels) prints at 13.3 x 10 inches at 300 DPI. At 150 DPI, you can print 26.7 x 20 inches. At 100 DPI for posters, print up to 40 x 30 inches.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
