"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function DataStoragePage() {
  const config = converterMappings["Data Storage"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Data Storage"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Data Storage Converter</h1>
        <p className="text-muted-foreground">Convert digital storage units — bytes, kilobytes, megabytes, gigabytes, terabytes, and beyond. Free online data storage converter for computing, cloud storage, and IT professionals.</p>
      </div>
      <UnitConverterBase
        title="Data Storage Converter"
        description="Convert digital storage units — bytes, kilobytes, megabytes, gigabytes, terabytes, and beyond. Free online data storage converter for computing, cloud storage, and IT professionals."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="w-full max-w-4xl mx-auto mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Digital Storage Units</h2>
          <p className="text-muted-foreground mb-4">
            Digital storage measures the capacity of memory and storage devices. The byte is the fundamental unit, representing 8 bits. Storage capacity has grown exponentially, from kilobytes in early computers to terabytes and petabytes in modern data centers.
          </p>
          <p className="text-muted-foreground">
            Two systems exist for naming storage units: decimal (SI) prefixes use powers of 1000, while binary prefixes use powers of 1024. Hard drive manufacturers use decimal prefixes, while operating systems often display binary values, causing apparent capacity discrepancies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Binary vs Decimal Prefixes</h2>
          <p className="text-muted-foreground mb-4">
            The confusion between binary and decimal prefixes led to the creation of binary prefix names (kibi, mebi, gibi) by the International Electrotechnical Commission in 1998:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Prefix Type</th>
                  <th className="border border-border p-3 text-left">Name</th>
                  <th className="border border-border p-3 text-left">Symbol</th>
                  <th className="border border-border p-3 text-left">Multiplier</th>
                  <th className="border border-border p-3 text-left">Bytes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3" rowSpan={2}>Kilo/Kibi</td>
                  <td className="border border-border p-3">Kilobyte (decimal)</td>
                  <td className="border border-border p-3">KB</td>
                  <td className="border border-border p-3">10³</td>
                  <td className="border border-border p-3">1,000</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Kibibyte (binary)</td>
                  <td className="border border-border p-3">KiB</td>
                  <td className="border border-border p-3">2¹⁰</td>
                  <td className="border border-border p-3">1,024</td>
                </tr>
                <tr>
                  <td className="border border-border p-3" rowSpan={2}>Mega/Mebi</td>
                  <td className="border border-border p-3">Megabyte (decimal)</td>
                  <td className="border border-border p-3">MB</td>
                  <td className="border border-border p-3">10⁶</td>
                  <td className="border border-border p-3">1,000,000</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Mebibyte (binary)</td>
                  <td className="border border-border p-3">MiB</td>
                  <td className="border border-border p-3">2²⁰</td>
                  <td className="border border-border p-3">1,048,576</td>
                </tr>
                <tr>
                  <td className="border border-border p-3" rowSpan={2}>Giga/Gibi</td>
                  <td className="border border-border p-3">Gigabyte (decimal)</td>
                  <td className="border border-border p-3">GB</td>
                  <td className="border border-border p-3">10⁹</td>
                  <td className="border border-border p-3">1,000,000,000</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Gibibyte (binary)</td>
                  <td className="border border-border p-3">GiB</td>
                  <td className="border border-border p-3">2³⁰</td>
                  <td className="border border-border p-3">1,073,741,824</td>
                </tr>
                <tr>
                  <td className="border border-border p-3" rowSpan={2}>Tera/Tebi</td>
                  <td className="border border-border p-3">Terabyte (decimal)</td>
                  <td className="border border-border p-3">TB</td>
                  <td className="border border-border p-3">10¹²</td>
                  <td className="border border-border p-3">1,000,000,000,000</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Tebibyte (binary)</td>
                  <td className="border border-border p-3">TiB</td>
                  <td className="border border-border p-3">2⁴⁰</td>
                  <td className="border border-border p-3">1,099,511,627,776</td>
                </tr>
                <tr>
                  <td className="border border-border p-3" rowSpan={2}>Peta/Pebi</td>
                  <td className="border border-border p-3">Petabyte (decimal)</td>
                  <td className="border border-border p-3">PB</td>
                  <td className="border border-border p-3">10¹⁵</td>
                  <td className="border border-border p-3">1,000,000,000,000,000</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Pebibyte (binary)</td>
                  <td className="border border-border p-3">PiB</td>
                  <td className="border border-border p-3">2⁵⁰</td>
                  <td className="border border-border p-3">1,125,899,906,842,624</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-4">
            The 7.4 percent difference between GB and GiB explains why a 500 GB hard drive shows approximately 465 GiB in Windows.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Storage Capacity Examples</h2>
          <p className="text-muted-foreground mb-4">
            What can you store with different capacities?
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Capacity</th>
                  <th className="border border-border p-3 text-left">Photos (12 MP)</th>
                  <th className="border border-border p-3 text-left">Songs (4 min, MP3)</th>
                  <th className="border border-border p-3 text-left">HD Video (1080p)</th>
                  <th className="border border-border p-3 text-left">4K Video</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">1 GB</td>
                  <td className="border border-border p-3">330</td>
                  <td className="border border-border p-3">250</td>
                  <td className="border border-border p-3">15 min</td>
                  <td className="border border-border p-3">3 min</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">4 GB</td>
                  <td className="border border-border p-3">1,300</td>
                  <td className="border border-border p-3">1,000</td>
                  <td className="border border-border p-3">1 hour</td>
                  <td className="border border-border p-3">12 min</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">16 GB</td>
                  <td className="border border-border p-3">5,300</td>
                  <td className="border border-border p-3">4,000</td>
                  <td className="border border-border p-3">4 hours</td>
                  <td className="border border-border p-3">48 min</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">64 GB</td>
                  <td className="border border-border p-3">21,000</td>
                  <td className="border border-border p-3">16,000</td>
                  <td className="border border-border p-3">16 hours</td>
                  <td className="border border-border p-3">3.2 hours</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">256 GB</td>
                  <td className="border border-border p-3">85,000</td>
                  <td className="border border-border p-3">64,000</td>
                  <td className="border border-border p-3">64 hours</td>
                  <td className="border border-border p-3">12.8 hours</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">512 GB</td>
                  <td className="border border-border p-3">170,000</td>
                  <td className="border border-border p-3">128,000</td>
                  <td className="border border-border p-3">128 hours</td>
                  <td className="border border-border p-3">25.6 hours</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1 TB</td>
                  <td className="border border-border p-3">340,000</td>
                  <td className="border border-border p-3">250,000</td>
                  <td className="border border-border p-3">256 hours</td>
                  <td className="border border-border p-3">51 hours</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">4 TB</td>
                  <td className="border border-border p-3">1,360,000</td>
                  <td className="border border-border p-3">1,000,000</td>
                  <td className="border border-border p-3">1,024 hours</td>
                  <td className="border border-border p-3">204 hours</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">10 TB</td>
                  <td className="border border-border p-3">3,400,000</td>
                  <td className="border border-border p-3">2,500,000</td>
                  <td className="border border-border p-3">2,560 hours</td>
                  <td className="border border-border p-3">512 hours</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-4">
            Estimates assume: photos at 3 MB each (12 MP JPEG), songs at 4 MB each (128 kbps MP3), HD video at 4 GB/hour, 4K video at 20 GB/hour.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Bit vs Byte</h2>
          <p className="text-muted-foreground mb-4">
            Bits and bytes are related but distinct units. One byte equals 8 bits. Storage capacity uses bytes, while data transfer rates typically use bits per second.
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">1 Byte = 8 bits</p>
            <p className="font-mono text-sm">1 KB = 8 Kbit</p>
            <p className="font-mono text-sm">1 MB = 8 Mbit</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A 100 Mbps internet connection transfers data at:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">100 Mbps / 8 = 12.5 MB/s (megabytes per second)</p>
          </div>
          <p className="text-muted-foreground">
            Downloading a 1 GB file would take:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">1 GB / 12.5 MB/s = 1000 MB / 12.5 MB/s = 80 seconds</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Storage Device Capacities</h2>
          <p className="text-muted-foreground mb-4">
            Typical storage capacities for different device types:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Device Type</th>
                  <th className="border border-border p-3 text-left">Typical Capacity Range</th>
                  <th className="border border-border p-3 text-left">Common Sizes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">USB flash drive</td>
                  <td className="border border-border p-3">8 GB to 2 TB</td>
                  <td className="border border-border p-3">16, 32, 64, 128, 256 GB</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">SD card</td>
                  <td className="border border-border p-3">16 GB to 1 TB</td>
                  <td className="border border-border p-3">32, 64, 128, 256, 512 GB</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Smartphone</td>
                  <td className="border border-border p-3">64 GB to 1 TB</td>
                  <td className="border border-border p-3">128, 256, 512 GB</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Laptop SSD</td>
                  <td className="border border-border p-3">256 GB to 4 TB</td>
                  <td className="border border-border p-3">512 GB, 1 TB, 2 TB</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Desktop HDD</td>
                  <td className="border border-border p-3">1 TB to 22 TB</td>
                  <td className="border border-border p-3">2, 4, 8, 10, 14, 16 TB</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">External SSD</td>
                  <td className="border border-border p-3">500 GB to 8 TB</td>
                  <td className="border border-border p-3">1, 2, 4 TB</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">NAS device</td>
                  <td className="border border-border p-3">4 TB to 100+ TB</td>
                  <td className="border border-border p-3">Multi-bay with multiple drives</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Enterprise storage</td>
                  <td className="border border-border p-3">100 TB to petabytes</td>
                  <td className="border border-border p-3">Storage arrays, cloud storage</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Conversions</h2>
          <p className="text-muted-foreground mb-4">
            Convert between storage units:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>1 byte = 8 bits</li>
            <li>1 KB = 1,000 bytes (decimal) or 1,024 bytes (binary/KiB)</li>
            <li>1 MB = 1,000 KB = 1,000,000 bytes (decimal)</li>
            <li>1 MB = 1,024 KB = 1,048,576 bytes (binary/MiB)</li>
            <li>1 GB = 1,000 MB = 1,000,000,000 bytes (decimal)</li>
            <li>1 GB = 1,024 MB = 1,073,741,824 bytes (binary/GiB)</li>
            <li>1 TB = 1,000 GB = 10¹² bytes (decimal)</li>
            <li>1 TB = 1,024 GB = 2⁴⁰ bytes (binary/TiB)</li>
            <li>1 PB = 1,000 TB = 10¹⁵ bytes</li>
            <li>1 EB = 1,000 PB = 10¹⁸ bytes</li>
            <li>1 ZB = 1,000 EB = 10²¹ bytes</li>
            <li>1 YB = 1,000 ZB = 10²⁴ bytes</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            Converting between decimal and binary:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>1 GB = 0.9313 GiB</li>
            <li>1 GiB = 1.0737 GB</li>
            <li>1 TB = 0.9095 TiB</li>
            <li>1 TiB = 1.0995 TB</li>
            <li>100 GB = 93.13 GiB</li>
            <li>500 GB = 465.66 GiB</li>
            <li>1 TB = 931.32 GiB</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Growth and Storage Trends</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>Global data creation reached 120 zettabytes in 2023</li>
            <li>Data volume doubles approximately every 2 to 3 years</li>
            <li>Average smartphone photo is now 3 to 5 MB (vs 1 MB in 2010)</li>
            <li>4K video requires 4 to 6 times more storage than 1080p</li>
            <li>Cloud storage costs have dropped 90 percent since 2010</li>
            <li>NVMe SSDs now offer 4 to 8 TB in M.2 form factor</li>
            <li>HAMR technology enables 30+ TB hard drives</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applications of Storage Conversion</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Cloud storage plan selection and cost comparison</li>
            <li>Backup capacity planning</li>
            <li>File transfer time estimation</li>
            <li>Storage device purchase decisions</li>
            <li>Data migration planning</li>
            <li>Database capacity management</li>
            <li>Video production storage requirements</li>
            <li>IT infrastructure planning</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Why does my 1 TB drive show only 931 GB?</h3>
            <p className="text-muted-foreground">
              Hard drive manufacturers use decimal gigabytes (1 GB = 1 billion bytes), while Windows displays binary gibibytes (1 GiB = 1,073,741,824 bytes). A 1 TB drive contains 1 trillion bytes, which equals 1,000,000,000,000 / 1,073,741,824 = 931.32 GiB. This is not lost space, just different unit definitions.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What is the difference between GB and GiB?</h3>
            <p className="text-muted-foreground">
              GB (gigabyte) uses decimal prefix: 1 GB = 1,000,000,000 bytes. GiB (gibibyte) uses binary prefix: 1 GiB = 1,073,741,824 bytes. The 7.4 percent difference matters for large capacities. Linux and macOS display GiB but may label it as GB. Windows displays GiB but labels it as GB, causing confusion.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How much storage do I need for my phone?</h3>
            <p className="text-muted-foreground">
              Light users (calls, messaging, some apps) need 64 to 128 GB. Moderate users (photos, social media, some videos) need 128 to 256 GB. Heavy users (lots of photos, 4K video, many apps, games) need 256 to 512 GB or more. Consider cloud storage options and whether your phone supports expandable storage via SD card.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How long will it take to download a file?</h3>
            <p className="text-muted-foreground">
              Divide file size by download speed. A 5 GB file on a 100 Mbps connection: 5 GB = 5,000 MB = 40,000 Mbit. Time = 40,000 / 100 = 400 seconds = 6.7 minutes. Real-world speeds are typically 70 to 90 percent of advertised speeds due to network overhead and congestion.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
