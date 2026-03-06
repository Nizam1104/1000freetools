import React from "react";

export function ExtractColorsFromImageSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Does This Tool Do?
        </h2>
        <p className="text-muted-foreground">
          This tool analyzes any uploaded image and extracts its dominant colors using color quantization algorithms running entirely in your browser. It identifies the most frequently occurring colors and presents them as a usable palette with HEX, RGB, and percentage values.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How Image Color Extraction Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The extraction process happens in three stages:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Pixel sampling:</strong> The tool reads every pixel in the image using the HTML5 Canvas API, collecting millions of RGB values.</li>
          <li><strong>Color quantization:</strong> Similar colors are grouped together using a k-means clustering algorithm. This reduces thousands of unique shades to a manageable palette of 2-12 representative colors.</li>
          <li><strong>Percentage calculation:</strong> Each extracted color is assigned a percentage showing how much of the image it covers.</li>
        </ol>
        <p className="text-muted-foreground mt-4">
          All processing happens locally — your image never leaves your device.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Who Actually Needs This?
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Web Designers Building Theme Colors</h3>
            <p className="text-sm text-muted-foreground">
              You have a hero image for a landing page and want the button colors to match its aesthetic. Extract the palette, pick the most prominent color, and use it for CTAs that feel integrated with the imagery.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Brand Designers Matching Existing Assets</h3>
            <p className="text-sm text-muted-foreground">
              A client sends a low-res logo and asks you to "match the colors." Instead of eyeballing it in Photoshop, upload the logo and get exact hex values for their brand palette.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Content Creators Maintaining Visual Consistency</h3>
            <p className="text-sm text-muted-foreground">
              A YouTuber extracts colors from their channel banner to use in video thumbnails, ensuring all their content has a cohesive look across platforms.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Developers Prototyping from Screenshots</h3>
            <p className="text-sm text-muted-foreground">
              You screenshot an app you admire and want to study its color choices. Extract the palette to analyze how they use color for hierarchy, states, and emphasis.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Artists Creating Digital Color Studies</h3>
            <p className="text-sm text-muted-foreground">
              A painter photographs their physical artwork and extracts the palette to create digital prints, merchandise, or social media graphics that match the original piece.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">E-commerce Sellers Creating Product Listings</h3>
            <p className="text-sm text-muted-foreground">
              An Etsy seller extracts colors from product photos to write accurate color descriptions ("navy blue with sage accents") and create matching listing graphics.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What to Know Before Uploading
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Image quality affects results.</strong> A high-resolution, well-lit photo will yield more accurate colors than a small, compressed thumbnail. For best results, use images at least 800×600 pixels.
          </p>
          <p>
            <strong>Complex images produce more varied palettes.</strong> A landscape photo with sky, trees, and buildings will extract differently than a solid-color product shot. Adjust the color count slider based on image complexity.
          </p>
          <p>
            <strong>Gradients and shadows create multiple shades.</strong> A blue sky with gradients might extract as 3-4 separate "blue" colors. This is expected — the algorithm captures tonal variations.
          </p>
          <p>
            <strong>Supported formats: JPG, PNG, GIF, WebP.</strong> Animated GIFs will extract from the first frame only. Transparent PNGs treat transparent pixels as a color.
          </p>
          <p>
            <strong>Privacy note:</strong> Images are processed entirely in your browser using the Canvas API. No data is uploaded to any server.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">How many colors should I extract?</h3>
            <p className="text-sm text-muted-foreground">
              Start with 5 colors — it's usually enough to capture the main palette without overwhelming you. For simple images (logos, icons), 2-4 colors works well. For complex scenes (landscapes, crowds), try 8-12 colors.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why are some extracted colors very similar?</h3>
            <p className="text-sm text-muted-foreground">
              The k-means algorithm groups similar colors, but subtle variations in lighting or compression can create nearby shades. If you need fewer distinct colors, reduce the color count or manually merge similar hex values.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I extract colors from a URL instead of uploading?</h3>
            <p className="text-sm text-muted-foreground">
              This tool requires direct file upload for security and privacy reasons. If you have an image URL, right-click to save it first, then upload the file.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What export format should I use?</h3>
            <p className="text-sm text-muted-foreground">
              CSS for web projects (gives you custom properties). SCSS for Sass/Less workflows. JSON for design tokens or importing into other tools. PNG for sharing palettes visually with clients or teammates.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Does this work with black and white images?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but the palette will be mostly grays. Black and white photos still contain tonal variations — pure black, multiple gray shades, and pure white — which the tool will extract as separate colors.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How accurate are the percentage values?</h3>
            <p className="text-sm text-muted-foreground">
              Percentages represent the proportion of pixels closest to each extracted color. They're approximate due to the clustering algorithm, but useful for understanding which colors dominate the image.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use extracted colors for commercial projects?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the colors themselves aren't copyrighted. However, be careful about extracting and replicating another brand's exact palette — while colors can't be copyrighted, trade dress laws may apply in some contexts.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Export Formats Explained
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>CSS:</strong> Generates CSS custom properties like {`--color-1: #3b82f6;`} plus utility classes. Drop directly into your stylesheet.
          </p>
          <p>
            <strong>SCSS:</strong> Creates Sass variables like {`$color-1: #3b82f6;`}. Works with any SCSS or Less setup.
          </p>
          <p>
            <strong>JSON:</strong> Outputs an array of color objects with hex, RGB, and percentage data. Useful for design systems, React component libraries, or importing into tools like Figma.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Alternatives and How This Compares
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>vs. Adobe Color's "Extract Theme":</strong> This tool runs entirely in your browser with no Adobe account required. It's faster for quick extractions and doesn't require uploading to Adobe's servers.
          </p>
          <p>
            <strong>vs. Coolors Image Picker:</strong> Similar functionality, but this tool shows percentage breakdowns and offers more export formats (CSS, SCSS, JSON) without requiring a login.
          </p>
          <p>
            <strong>vs. Manual color picking in Photoshop:</strong> Much faster than using the eyedropper tool repeatedly. Instead of clicking individual points, you get the statistically dominant colors automatically.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ExtractColorsFromImageSEO;
