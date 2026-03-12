"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function VideoFrameRateConverterPage() {
  const config = converterMappings["Video Frame Rate Converter"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Video Frame Rate Converter"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Video Frame Rate Converter</h1>
        <p className="text-muted-foreground">Convert video frame rates between 24fps, 30fps, 60fps, 120fps, and more. Calculate total frames for any video duration. Free online frame rate converter for video editors and filmmakers.</p>
      </div>
      <UnitConverterBase
        title="Video Frame Rate Converter"
        description="Convert video frame rates between 24fps, 30fps, 60fps, 120fps, and more. Calculate total frames for any video duration. Free online frame rate converter for video editors and filmmakers."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Frame Rates</h2>
          <p className="text-muted-foreground mb-4">Frame rate measures how many images display per second. Higher frame rates produce smoother motion. Lower frame rates create a cinematic look. Different media formats use different standard frame rates.</p>
          <p className="text-muted-foreground mb-4">Film traditionally uses 24 fps for a cinematic appearance. Television uses 30 fps in NTSC regions and 25 fps in PAL regions. Gaming and high-motion content benefit from 60 fps or higher.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Standard Frame Rates</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Frame Rate</th>
                  <th className="text-left py-3 px-4 font-medium">Common Use</th>
                  <th className="text-left py-3 px-4 font-medium">Region/Standard</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">24 fps</td>
                  <td className="py-3 px-4">Cinema films, cinematic video</td>
                  <td className="py-3 px-4">Global film standard</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">25 fps</td>
                  <td className="py-3 px-4">PAL television, European broadcast</td>
                  <td className="py-3 px-4">Europe, Australia, parts of Asia</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">30 fps</td>
                  <td className="py-3 px-4">NTSC television, online video</td>
                  <td className="py-3 px-4">North America, Japan</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">50 fps</td>
                  <td className="py-3 px-4">PAL high-frame-rate video</td>
                  <td className="py-3 px-4">Europe, Australia</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">60 fps</td>
                  <td className="py-3 px-4">Gaming, sports, smooth motion</td>
                  <td className="py-3 px-4">NTSC regions, gaming</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">120 fps</td>
                  <td className="py-3 px-4">Slow motion capture, gaming</td>
                  <td className="py-3 px-4">High-end cameras, gaming</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">240 fps</td>
                  <td className="py-3 px-4">Super slow motion</td>
                  <td className="py-3 px-4">Professional cameras</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frame Count Calculation Formula</h2>
          <p className="text-muted-foreground mb-4">Calculate total frames from video duration and frame rate.</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2 mb-4">
            <div>Total Frames = Duration (seconds) × Frame Rate (fps)</div>
            <div>Duration (seconds) = Total Frames ÷ Frame Rate</div>
            <div>Frame Rate = Total Frames ÷ Duration (seconds)</div>
          </div>
          <p className="text-muted-foreground mb-4">Example: Calculating frames in a 2 minute 30 second video at 24 fps</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            Duration: 2:30 = 150 seconds
            Total Frames: 150 × 24 = 3,600 frames
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frames per Common Video Duration</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Duration</th>
                  <th className="text-left py-3 px-4 font-medium">24 fps</th>
                  <th className="text-left py-3 px-4 font-medium">30 fps</th>
                  <th className="text-left py-3 px-4 font-medium">60 fps</th>
                  <th className="text-left py-3 px-4 font-medium">120 fps</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">1 second</td>
                  <td className="py-3 px-4">24</td>
                  <td className="py-3 px-4">30</td>
                  <td className="py-3 px-4">60</td>
                  <td className="py-3 px-4">120</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">5 seconds</td>
                  <td className="py-3 px-4">120</td>
                  <td className="py-3 px-4">150</td>
                  <td className="py-3 px-4">300</td>
                  <td className="py-3 px-4">600</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">10 seconds</td>
                  <td className="py-3 px-4">240</td>
                  <td className="py-3 px-4">300</td>
                  <td className="py-3 px-4">600</td>
                  <td className="py-3 px-4">1,200</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">30 seconds</td>
                  <td className="py-3 px-4">720</td>
                  <td className="py-3 px-4">900</td>
                  <td className="py-3 px-4">1,800</td>
                  <td className="py-3 px-4">3,600</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">1 minute</td>
                  <td className="py-3 px-4">1,440</td>
                  <td className="py-3 px-4">1,800</td>
                  <td className="py-3 px-4">3,600</td>
                  <td className="py-3 px-4">7,200</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">5 minutes</td>
                  <td className="py-3 px-4">7,200</td>
                  <td className="py-3 px-4">9,000</td>
                  <td className="py-3 px-4">18,000</td>
                  <td className="py-3 px-4">36,000</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">10 minutes</td>
                  <td className="py-3 px-4">14,400</td>
                  <td className="py-3 px-4">18,000</td>
                  <td className="py-3 px-4">36,000</td>
                  <td className="py-3 px-4">72,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frame Rate Conversion for Slow Motion</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Shoot at higher frame rate for slow motion playback</li>
            <li>120 fps played at 24 fps creates 5x slow motion</li>
            <li>60 fps played at 30 fps creates 2x slow motion</li>
            <li>240 fps played at 24 fps creates 10x slow motion</li>
            <li>Slow motion factor = Capture fps ÷ Playback fps</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">What frame rate should I use for YouTube videos?</h3>
              <p className="text-muted-foreground">Use 24 fps for cinematic content. Use 30 fps for standard videos and tutorials. Use 60 fps for gaming, sports, or high-motion content. YouTube supports all these frame rates.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Why do movies use 24 fps?</h3>
              <p className="text-muted-foreground">Twenty-four fps became the film standard in the late 1920s for sound synchronization. The slight motion blur creates a cinematic look audiences associate with films. Higher frame rates look too realistic or video-like.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Is 60 fps better than 30 fps?</h3>
              <p className="text-muted-foreground">Sixty fps produces smoother motion with less blur. It works well for gaming and sports. Thirty fps looks more cinematic and uses less storage. Choose based on your content type and desired look.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How do I convert between NTSC and PAL frame rates?</h3>
              <p className="text-muted-foreground">NTSC uses 30 fps (29.97 actual). PAL uses 25 fps. Converting requires frame rate conversion software. Simple conversion causes speed and audio pitch changes. Professional tools use frame interpolation.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
