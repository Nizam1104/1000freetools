"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function AudioBitrateConverterPage() {
  const config = converterMappings["Audio Bitrate Converter"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Audio Bitrate Converter"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Audio Bitrate Converter</h1>
        <p className="text-muted-foreground">Convert audio bitrate units and calculate file size from bitrate and duration. Free online audio bitrate converter for music production, podcasting, and streaming optimization.</p>
      </div>
      <UnitConverterBase
        title="Audio Bitrate Converter"
        description="Convert audio bitrate units and calculate file size from bitrate and duration. Free online audio bitrate converter for music production, podcasting, and streaming optimization."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Audio Bitrate</h2>
          <p className="text-muted-foreground mb-4">Bitrate measures audio data processed per second. Higher bitrates produce better sound quality. Lower bitrates reduce file size but lose audio detail. Bitrate gets measured in kilobits per second (kbps) or bits per second (bps).</p>
          <p className="text-muted-foreground mb-4">Lossless formats like FLAC preserve all audio data. Lossy formats like MP3 remove data to reduce file size. Streaming services use different bitrates based on connection speed and subscription tier.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Audio Bitrate Standards</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Bitrate</th>
                  <th className="text-left py-3 px-4 font-medium">Quality Level</th>
                  <th className="text-left py-3 px-4 font-medium">Common Use</th>
                  <th className="text-left py-3 px-4 font-medium">File Size (per minute)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">32 kbps</td>
                  <td className="py-3 px-4">Low</td>
                  <td className="py-3 px-4">Voice podcasts, audiobooks</td>
                  <td className="py-3 px-4">240 KB</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">64 kbps</td>
                  <td className="py-3 px-4">Fair</td>
                  <td className="py-3 px-4">Talk radio, low-quality streaming</td>
                  <td className="py-3 px-4">480 KB</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">96 kbps</td>
                  <td className="py-3 px-4">Good</td>
                  <td className="py-3 px-4">Standard streaming</td>
                  <td className="py-3 px-4">720 KB</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">128 kbps</td>
                  <td className="py-3 px-4">Good</td>
                  <td className="py-3 px-4">MP3 standard quality</td>
                  <td className="py-3 px-4">960 KB</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">192 kbps</td>
                  <td className="py-3 px-4">Very Good</td>
                  <td className="py-3 px-4">High-quality streaming</td>
                  <td className="py-3 px-4">1.4 MB</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">256 kbps</td>
                  <td className="py-3 px-4">Excellent</td>
                  <td className="py-3 px-4">Premium streaming (AAC)</td>
                  <td className="py-3 px-4">1.9 MB</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">320 kbps</td>
                  <td className="py-3 px-4">Excellent</td>
                  <td className="py-3 px-4">High-quality MP3</td>
                  <td className="py-3 px-4">2.4 MB</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">1411 kbps</td>
                  <td className="py-3 px-4">Lossless (CD)</td>
                  <td className="py-3 px-4">CD audio (16-bit/44.1kHz)</td>
                  <td className="py-3 px-4">10.6 MB</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">2304 kbps</td>
                  <td className="py-3 px-4">Lossless (Hi-Res)</td>
                  <td className="py-3 px-4">Hi-Res audio (24-bit/48kHz)</td>
                  <td className="py-3 px-4">17.3 MB</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Audio File Size Calculation Formula</h2>
          <p className="text-muted-foreground mb-4">Calculate file size from bitrate and duration.</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2 mb-4">
            <div>File Size (bits) = Bitrate (bps) × Duration (seconds)</div>
            <div>File Size (bytes) = (Bitrate × Duration) ÷ 8</div>
            <div>File Size (MB) = (Bitrate × Duration) ÷ 8 ÷ 1,048,576</div>
          </div>
          <p className="text-muted-foreground mb-4">Example: Calculating file size for a 4 minute song at 320 kbps</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            Duration: 4 minutes = 240 seconds
            File Size: (320,000 × 240) ÷ 8 ÷ 1,048,576 = 9.16 MB
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Streaming Service Bitrates</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Service</th>
                  <th className="text-left py-3 px-4 font-medium">Standard Quality</th>
                  <th className="text-left py-3 px-4 font-medium">High Quality</th>
                  <th className="text-left py-3 px-4 font-medium">Lossless</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Spotify</td>
                  <td className="py-3 px-4">96 kbps</td>
                  <td className="py-3 px-4">160 kbps</td>
                  <td className="py-3 px-4">320 kbps (Premium)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Apple Music</td>
                  <td className="py-3 px-4">64 kbps (AAC)</td>
                  <td className="py-3 px-4">256 kbps (AAC)</td>
                  <td className="py-3 px-4">Lossless (ALAC)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">YouTube Music</td>
                  <td className="py-3 px-4">48 kbps</td>
                  <td className="py-3 px-4">128 kbps</td>
                  <td className="py-3 px-4">256 kbps (AAC)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Amazon Music</td>
                  <td className="py-3 px-4">85 kbps</td>
                  <td className="py-3 px-4">256 kbps</td>
                  <td className="py-3 px-4">HD Lossless</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Tidal</td>
                  <td className="py-3 px-4">96 kbps</td>
                  <td className="py-3 px-4">320 kbps</td>
                  <td className="py-3 px-4">1411+ kbps (HiFi)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Deezer</td>
                  <td className="py-3 px-4">64 kbps</td>
                  <td className="py-3 px-4">128 kbps</td>
                  <td className="py-3 px-4">1411 kbps (HiFi)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Bitrate Unit Conversions</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>1 kbps = 1,000 bits per second</li>
            <li>1 Mbps = 1,000 kbps = 1,000,000 bps</li>
            <li>1 byte = 8 bits</li>
            <li>1 KB/s = 8 kbps</li>
            <li>1 MB/s = 8 Mbps</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">What bitrate is best for MP3 files?</h3>
              <p className="text-muted-foreground">Use 320 kbps for maximum MP3 quality. Use 192 kbps for good quality with smaller files. Use 128 kbps for basic listening or limited storage. Most listeners cannot distinguish 320 kbps from lossless.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Is higher bitrate always better?</h3>
              <p className="text-muted-foreground">Higher bitrate means more audio data and better quality. Diminishing returns occur above 256 kbps for most listeners. Consider storage space and bandwidth when choosing bitrate.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">What is the difference between CBR and VBR?</h3>
              <p className="text-muted-foreground">CBR (Constant Bitrate) uses the same bitrate throughout. VBR (Variable Bitrate) adjusts based on audio complexity. VBR produces smaller files with similar quality.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How much storage do I need for my music library?</h3>
              <p className="text-muted-foreground">At 320 kbps, one hour of music uses about 144 MB. A 1000-song library at 4 minutes each needs about 9.6 GB. Lossless formats require 5-10 times more storage space.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
