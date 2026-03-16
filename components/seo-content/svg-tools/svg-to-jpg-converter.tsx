import React from "react"

export default function SvgToJpgConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your SVG code or upload an SVG file, then set your desired output dimensions in pixels. Choose a background color since JPEG doesn't support transparency. Adjust the quality slider from 1-100% to balance file size and image clarity.
          </p>
          <p>
            The tool renders your SVG on an HTML5 canvas, applies your selected background color, then exports the result as a JPEG image. Higher quality settings preserve more detail but create larger files.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Quality recommendations:</p>
            <ul className="text-sm space-y-1">
              <li>90-100%: Print-quality graphics, product photos</li>
              <li>70-89%: Web images, social media posts</li>
              <li>50-69%: Thumbnails, preview images</li>
              <li>Below 50%: Only for very small file size needs</li>
            </ul>
          </div>
          <p>
            Click Convert to generate your JPG. Preview the result, then download or copy the data URL for use in your projects.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sharing graphics on social media</h3>
            <p className="text-sm text-muted-foreground">
              Facebook, Instagram, and LinkedIn don't accept SVG uploads. Convert your vector logo or infographic to JPG for posting. Set dimensions to match each platform's recommended image sizes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Email newsletter graphics</h3>
            <p className="text-sm text-muted-foreground">
              Email clients have poor SVG support. Convert your SVG email header or product graphics to JPG before inserting into Mailchimp, Constant Contact, or other email platforms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating print-ready files</h3>
            <p className="text-sm text-muted-foreground">
              Some print shops require JPG submissions. Convert your SVG designs at high quality (95%+) and large dimensions (300 DPI equivalent) for professional printing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Embedding in documents</h3>
            <p className="text-sm text-muted-foreground">
              Microsoft Word, Google Docs, and PowerPoint handle JPG better than SVG. Convert your SVG charts, icons, or diagrams for reliable document embedding.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Client deliverables</h3>
            <p className="text-sm text-muted-foreground">
              Clients often request JPG files they can use anywhere. Keep your SVG master files, but deliver JPG versions for their marketing team, social media manager, or print vendor.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Website fallback images</h3>
            <p className="text-sm text-muted-foreground">
              Create JPG fallbacks for older browsers that don't support SVG. Use the JPG in your picture element or as a background-image fallback for maximum compatibility.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">JPG doesn't support transparency.</strong>
              Unlike PNG or SVG, JPEG has no alpha channel. You must choose a background color. White works for most cases, but match your destination background for seamless integration.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Conversion is one-way.</strong>
              Once converted to JPG, you can't get your SVG back. The vector data becomes pixels. Always keep your original SVG file for future edits.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Quality loss is permanent.</strong>
              JPEG uses lossy compression. Each save degrades quality slightly. Export at the highest quality you need for the final use case.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Dimensions matter for sharpness.</strong>
              Exporting at 100x100 then scaling to 500x500 creates blur. Set dimensions to your actual display size or larger for best results.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For graphics with text or sharp edges, use PNG instead. JPEG compression creates artifacts around text that look unprofessional. Reserve JPG for photos or complex gradients.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the best quality setting for web?</h3>
            <p className="text-sm text-muted-foreground">
              80-85% gives excellent quality with reasonable file sizes. Most visitors won't notice the difference from 100%, but your pages load faster.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert SVG with transparency to JPG?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but transparent areas become your chosen background color. Pick a color matching where you'll use the JPG, or use PNG for transparency support.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What dimensions should I use?</h3>
            <p className="text-sm text-muted-foreground">
              Match your display size. For responsive images, export at 2x your maximum display size for retina screens. A 500px wide image should be exported at 1000px.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my JPG look different than the SVG?</h3>
            <p className="text-sm text-muted-foreground">
              JPEG compression smooths edges and blends colors. Sharp vector lines may appear slightly soft. This is normal for raster conversion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I batch convert multiple SVGs?</h3>
            <p className="text-sm text-muted-foreground">
              This tool processes one SVG at a time. For batch conversion, consider desktop software like Adobe Illustrator or command-line tools like ImageMagick.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the conversion done locally?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, all processing happens in your browser using the HTML5 Canvas API. Your SVG code never leaves your computer.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if my SVG has animations?</h3>
            <p className="text-sm text-muted-foreground">
              Only the current frame is captured. Animated SVGs become static JPG images. For animated output, consider GIF or video formats instead.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
