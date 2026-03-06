import React from "react";

export function ImageFiltersSEO() {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">What this tool does</h2>
        <p className="mb-4">
          This tool applies preset visual filters to your photos - vintage
          film looks, black and white conversions, vibrant pop colors, and
          more. Click a filter thumbnail to see it applied instantly, then
          download the styled image. Everything runs in your browser.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">How to use it</h2>
        <p className="mb-4">
          <strong>1. Upload your photo</strong>
          <br />
          Drag a file into the workspace or click to browse. The image loads
          into your browser instantly.
        </p>
        <p className="mb-4">
          <strong>2. Browse and click filters</strong>
          <br />
          Scroll through the filter thumbnails and click to preview each one.
          The effect applies in real-time so you can see exactly how it looks.
        </p>
        <p className="mb-4">
          <strong>3. Download the result</strong>
          <br />
          When you find a filter you like, click download. The styled image
          saves to your device with the effect baked in.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">When you'd use this</h2>
        <p className="mb-4">
          <strong>Creating a consistent Instagram feed</strong>
          <br />
          Running a brand account requires visual consistency. Apply the same
          warm, faded filter to every product shot so your grid looks cohesive
          and recognizable.
        </p>
        <p className="mb-4">
          <strong>Hiding ugly backgrounds with black and white</strong>
          <br />
          Great portrait, distracting neon background? Converting to monochrome
          removes the clashing colors entirely and forces attention back to
          your subject's face.
        </p>
        <p className="mb-4">
          <strong>Creating vintage aesthetics for event marketing</strong>
          <br />
          Promoting a 90s-themed party or vintage clothing sale? Grainy,
          low-contrast filters give your promotional images authentic
          nostalgic credibility.
        </p>
        <p className="mb-4">
          <strong>Enhancing flat sunset photos</strong>
          <br />
          Smartphone cameras often capture muted, grayish sunsets. A vibrant,
          high-saturation filter pushes the warm oranges and reds to match
          what you actually saw in person.
        </p>
        <p className="mb-4">
          <strong>Fixing yellowed indoor real estate photos</strong>
          <br />
          Interior shots under incandescent bulbs look dingy and yellow. A
          cool, brightened filter neutralizes the tint and makes rooms appear
          larger and more modern.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">What to know before using it</h2>
        <p className="mb-4">
          <strong>Filters affect the entire image</strong>
          <br />
          You can't apply a filter to just part of the photo - it's global.
          If you need selective effects, use the full image editor instead.
        </p>
        <p className="mb-4">
          <strong>Vintage filters add intentional artifacts</strong>
          <br />
          Retro presets often inject film grain, slight blur, or color shifts
          to mimic old cameras. This is intentional - they're supposed to look
          imperfect.
        </p>
        <p className="mb-4">
          <strong>Filters look different on different images</strong>
          <br />
          A filter that looks amazing on a landscape might make skin tones
          look weird in a portrait. Always preview on your specific image
          before downloading.
        </p>
        <p className="mb-4">
          <strong>Your original stays untouched</strong>
          <br />
          The filter is applied to a copy. Your original file remains saved on
          your device exactly as it was.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Are these filters free to use?
            </h3>
            <p>
              Yes. All filters are available with no limits, no signup, and no
              watermarks on your downloads.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Does applying a filter ruin the original file?
            </h3>
            <p>
              No. Your original image stays untouched on your device. The
              filter is applied to a new file that you download separately.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Are my photos uploaded anywhere?
            </h3>
            <p>
              No. All filter processing happens in your browser. Your images
              never leave your computer.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Why do some filters make my photo look grainy?
            </h3>
            <p>
              Vintage and film emulation filters intentionally add grain to
              mimic the texture of analog photography. It's a stylistic
              choice, not a quality issue.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I use filtered images commercially?
            </h3>
            <p>
              Yes. You own the output completely. Use filtered photos for
              marketing, social media, or commercial products without any
              attribution required.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Do I need internet to use filters?
            </h3>
            <p>
              Only to load the page initially. Once loaded, all processing is
              local - you can apply filters even offline.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
