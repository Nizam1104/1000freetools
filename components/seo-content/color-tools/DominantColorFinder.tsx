import React from "react";

export function DominantColorFinderSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Is a Dominant Color?
        </h2>
        <p className="text-muted-foreground">
          The dominant color is the single hue that covers the largest percentage of an image. Unlike extracting a full palette, this tool identifies just one color — the one that defines the overall feel of the image. It's useful when you need a single accent color that matches an image's mood.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Extraction Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The tool uses the same color quantization algorithm as the full image extractor, but returns only the top result. It analyzes every pixel, groups similar colors using k-means clustering with k=1, and reports the centroid color along with what percentage of the image it covers.
        </p>
        <p className="text-muted-foreground">
          Processing happens entirely in your browser via the Canvas API. No images upload to any server.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Real Use Cases
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Auto-Theming from Hero Images</h3>
            <p className="text-sm text-muted-foreground">
              A landing page has a large hero photo. The developer extracts the dominant color and uses it for the navigation bar background, creating instant visual cohesion between the image and UI.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Dynamic Profile Accent Colors</h3>
            <p className="text-sm text-muted-foreground">
              A social platform lets users upload cover photos. The app extracts the dominant color and uses it as a subtle accent for buttons and links on that user's profile page.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Quick Brand Color Extraction</h3>
            <p className="text-sm text-muted-foreground">
              Someone sends a logo in PNG format and asks "what's their brand color?" Upload the logo, get the dominant hex, and you have an answer in seconds.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Matching UI to Photography</h3>
            <p className="text-sm text-muted-foreground">
              A photographer's portfolio site uses their own photos as backgrounds. Each page extracts the dominant color from the featured photo and applies it to text highlights and borders.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When Dominant Color Isn't the Right Tool
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Complex images with no clear dominant color.</strong> A busy street scene might have dozens of colors with similar coverage. The "dominant" color might only cover 15% of the image and not represent the overall feel.
          </p>
          <p>
            <strong>Images with large white or black borders.</strong> If your image has padding or letterboxing, the dominant color might be pure white or black — technically correct but not useful. Crop first.
          </p>
          <p>
            <strong>When you need a full palette.</strong> If you're building a complete color scheme, use the Extract Colors from Image tool instead. It gives you 2-12 colors with percentage breakdowns.
          </p>
          <p>
            <strong>Gradient-heavy images.</strong> A sunset gradient might extract as orange, but that misses the purple and pink tones that make the image distinctive.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">What percentage is considered "dominant"?</h3>
            <p className="text-sm text-muted-foreground">
              There's no threshold — the tool returns whichever color covers the most pixels, even if it's only 20% of the image. For solid-color backgrounds or simple graphics, you'll see 60-90%. For complex photos, 15-30% is more typical.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why does the dominant color look different from what I see?</h3>
            <p className="text-sm text-muted-foreground">
              Human vision doesn't work like pixel counting. We notice high-contrast areas and faces more than large uniform regions. The algorithm treats every pixel equally — a large sky might dominate even if your eye is drawn to a small subject.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use this for video frames?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but you'll need to extract a frame first. Screenshot the frame you want, save it as an image, then upload it here.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What file formats are supported?</h3>
            <p className="text-sm text-muted-foreground">
              JPG, PNG, GIF, and WebP. Animated GIFs will process only the first frame. Transparent PNGs treat transparent pixels as a single color (usually black or white depending on the browser).
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How accurate is the percentage value?</h3>
            <p className="text-sm text-muted-foreground">
              The percentage represents how many pixels are closest to the extracted color after quantization. It's approximate — the algorithm groups similar colors, so the percentage reflects the cluster size, not exact pixel matches.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Is there a file size limit?</h3>
            <p className="text-sm text-muted-foreground">
              The tool processes images in your browser, so the limit is your device's memory. Very large images (over 10MB or 5000×5000 pixels) might cause slow processing or browser warnings. Resize first if needed.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How This Differs from Full Palette Extraction
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Dominant Color Finder:</strong> Returns one color — the most prevalent. Fast, simple, focused. Best when you need a single accent color or want to know "what color is this image overall?"
          </p>
          <p>
            <strong>Extract Colors from Image:</strong> Returns 2-12 colors with percentages. Better for building complete palettes, understanding color distribution, or when the image has multiple important colors.
          </p>
          <p>
            <strong>Use both together:</strong> Start with dominant color for your primary accent, then use the full extractor to find complementary colors from the same image.
          </p>
        </div>
      </div>
    </section>
  );
}

export default DominantColorFinderSEO;
