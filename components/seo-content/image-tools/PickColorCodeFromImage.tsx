import React from "react";

export function PickColorCodeFromImageSEO() {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">What this tool does</h2>
        <p className="mb-4">
          This tool extracts exact color codes from any image. Upload a photo,
          hover over any pixel, and get the HEX and RGB values instantly. Click
          to copy the code to your clipboard. Everything runs in your browser -
          no upload required.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">How to use it</h2>
        <p className="mb-4">
          <strong>1. Upload your reference image</strong>
          <br />
          Drag a file into the workspace or click to browse. The image loads
          into your browser's memory instantly.
        </p>
        <p className="mb-4">
          <strong>2. Hover to sample colors</strong>
          <br />
          Move your cursor over the image. The tool shows the HEX and RGB
          values of whatever pixel you're hovering over in real-time.
        </p>
        <p className="mb-4">
          <strong>3. Click to copy</strong>
          <br />
          Click on a color to lock in the value and copy it to your clipboard.
          Paste it directly into CSS, Figma, or your design tool.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">When you'd use this</h2>
        <p className="mb-4">
          <strong>Matching a website to a client's logo</strong>
          <br />
          A client sends you a scanned business card and wants their site to
          match the exact brand colors. Upload the scan, click on their logo,
          and you've got the precise HEX codes for the CSS.
        </p>
        <p className="mb-4">
          <strong>Recreating colors from movie stills</strong>
          <br />
          Digital artists often reference cinematic lighting from film frames.
          Sampling the exact RGB values from a paused scene gives you accurate
          color data for painting realistic skin tones under specific lighting.
        </p>
        <p className="mb-4">
          <strong>Extracting interior design palettes</strong>
          <br />
          You see a beautiful room photo and want to paint your living room the
          same colors. Click on the wall, the trim, and the accent furniture to
          get the exact paint codes to take to the hardware store.
        </p>
        <p className="mb-4">
          <strong>Analyzing competitor design choices</strong>
          <br />
          A competitor's app has a "Buy Now" button that converts really well.
          Extract the exact HEX code of their button color to A/B test the same
          shade in your own designs.
        </p>
        <p className="mb-4">
          <strong>Standardizing team design assets</strong>
          <br />
          Multiple designers have submitted graphics with slightly different
          shades of the same brand color. Run them all through this tool to
          identify which files need correction before printing.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">What to know before using it</h2>
        <p className="mb-4">
          <strong>Zoom in for precision</strong>
          <br />
          If you're sampling from a small or detailed area, zoom in first.
          Clicking a 2-pixel border while zoomed out might grab the adjacent
          color instead.
        </p>
        <p className="mb-4">
          <strong>Compressed images may have color artifacts</strong>
          <br />
          Heavily compressed JPGs can have slight color variations due to
          compression artifacts. A solid blue sky might actually contain dozens
          of slightly different blue values. PNG files give cleaner readings.
        </p>
        <p className="mb-4">
          <strong>Transparent pixels return no color</strong>
          <br />
          If you click on a fully transparent area of a PNG, the tool will show
          no color value - there's literally nothing there to sample.
        </p>
        <p className="mb-4">
          <strong>Monitor calibration affects perception</strong>
          <br />
          The color values you extract are mathematically accurate to the file,
          but your monitor might display them differently. Always verify colors
          on multiple screens if color accuracy is critical.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Is this color picker free to use?
            </h3>
            <p>
              Yes. Upload as many images as you want and sample unlimited
              colors. No signup, no quotas, no watermarks.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              What color formats do you provide?
            </h3>
            <p>
              HEX (like #FF5733) for web/CSS and RGB (like rgb(255, 87, 51))
              for design software. Both values are shown simultaneously.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Are my images uploaded to a server?
            </h3>
            <p>
              No. The tool runs entirely in your browser. Your images never
              leave your computer.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I sample from a tiny area?
            </h3>
            <p>
              Yes, use the zoom feature to magnify small details. This lets you
              sample individual pixels accurately.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Does this work on transparent PNGs?
            </h3>
            <p>
              Yes, it reads colors from the opaque parts of transparent PNGs.
              Clicking on fully transparent areas returns no color value.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I save the colors I extract?
            </h3>
            <p>
              The tool copies colors to your clipboard instantly. From there,
              paste them into your design software, CSS file, or color
              management tool.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
