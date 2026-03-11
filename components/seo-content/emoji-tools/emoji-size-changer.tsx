import React from "react"

export default function EmojiSizeChangerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Emoji Size Changer Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select an emoji from the popular presets or paste any emoji into the custom field. The emoji displays in the preview area at your selected size.
          </p>
          <p>
            Adjust the base pixel size using the slider or preset buttons. Choose from 16px for small icons up to 512px for large graphics. Use the scale factor to multiply the base size for even larger output.
          </p>
          <p>
            Select background color - transparent for overlays or any color for standalone images. Choose PNG or SVG output format. Download your resized emoji or copy it for immediate use.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating Discord custom emoji</h3>
            <p className="text-sm text-muted-foreground">
              Discord requires 128x128px emoji. Resize any emoji to exact specifications. Transparent background ensures clean integration in chat.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making presentation graphics</h3>
            <p className="text-sm text-muted-foreground">
              PowerPoint needs larger emoji than text provides. Resize to 256px for slide graphics. Emoji stay crisp when projected on big screens.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing social media posts</h3>
            <p className="text-sm text-muted-foreground">
              Instagram stories need big emoji for impact. Resize to 512px for full-screen graphics. Large emoji grab attention in fast-scrolling feeds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating print materials</h3>
            <p className="text-sm text-muted-foreground">
              Flyers and posters need high-resolution emoji. Resize to 512px or larger for print quality. SVG format ensures crisp edges at any print size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building app interface mockups</h3>
            <p className="text-sm text-muted-foreground">
              Figma and Sketch need properly sized assets. Resize emoji to match your design system. 24px, 32px, 48px for different UI elements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making YouTube thumbnail elements</h3>
            <p className="text-sm text-muted-foreground">
              Thumbnails need big, bold emoji. Resize to 256px+ for visibility at small sizes. Large emoji communicate emotion instantly to viewers.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">PNG has maximum practical size.</strong>
              Beyond 512px, PNG files get large with minimal visual benefit. For huge sizes (posters, billboards), use SVG vector format instead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Emoji rendering depends on your system.</strong>
              The emoji appearance comes from your operating system's emoji font. Windows emoji look different from Mac emoji. Both are valid.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Transparent backgrounds work best.</strong>
              Transparent PNGs overlay cleanly on any background. Choose colored backgrounds only when you need a specific look.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Scale factor multiplies base size.</strong>
              Base 64px with 2x scale = 128px output. Use scale for quick size adjustments without changing base size presets.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For Discord emoji, use 128x128px PNG. Discord displays them at much smaller sizes but requires 128px uploads. Always use transparent background.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum size I can create?</h3>
            <p className="text-sm text-muted-foreground">
              Maximum is 512px base with 10x scale = 5120px. That's huge. For most uses, 512px is more than enough. Larger files take longer to download.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why choose SVG over PNG?</h3>
            <p className="text-sm text-muted-foreground">
              SVG is vector - scales infinitely without quality loss. Smaller file size for simple emoji. Better for print and responsive designs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I resize multiple emoji at once?</h3>
            <p className="text-sm text-muted-foreground">
              This tool processes one emoji at a time. For batch resizing, use image editing software or command-line tools like ImageMagick.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will the emoji look pixelated when enlarged?</h3>
            <p className="text-sm text-muted-foreground">
              PNG can show pixelation at extreme enlargements. SVG never pixelates. For very large sizes, always choose SVG format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What size for Slack custom emoji?</h3>
            <p className="text-sm text-muted-foreground">
              Slack requires 128x128px PNG. Same as Discord. Upload at 128px, Slack displays at 20px in chat. Transparent background required.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I change the emoji color?</h3>
            <p className="text-sm text-muted-foreground">
              This tool resizes, doesn't recolor. For color changes, use image editing software or the icon color changer tool for SVG emoji.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my emoji look different after resizing?</h3>
            <p className="text-sm text-muted-foreground">
              Emoji appearance comes from your system font. The resizing preserves the image. Any difference is due to rendering at different sizes.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
