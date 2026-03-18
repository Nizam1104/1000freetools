import React from "react"

export default function TextWatermarkAdderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Text Watermark Adder Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool adds text watermarks to your images. Upload an image, enter your watermark text, and customize position, opacity, size, and rotation. Download the watermarked image instantly.
          </p>
          <p>
            Watermarks protect your images by overlaying semi-transparent text. The tool processes everything in your browser—no server uploads. Adjust transparency so the watermark is visible but doesn't ruin the image.
          </p>
          <p>
            Choose from preset positions (corners, center, tiled) or place the watermark precisely. Rotate for diagonal watermarks. Export in PNG or JPEG format at your chosen quality level.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Protecting photography portfolios</h3>
            <p className="text-sm text-muted-foreground">
              Display your work online without fear of theft. Add your name or website as a watermark. It won't stop determined thieves but discourages casual copying.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating stock photo previews</h3>
            <p className="text-sm text-muted-foreground">
              Share low-res previews with watermarks to potential buyers. They can evaluate the image but can't use it without purchasing the clean version.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Branding social media content</h3>
            <p className="text-sm text-muted-foreground">
              Add your handle or logo to images before posting. When others share your content, your brand travels with it. Great for Instagram and Pinterest marketing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Marking draft or proof images</h3>
            <p className="text-sm text-muted-foreground">
              Send client proofs with "DRAFT" or "PROOF" watermarks. It prevents accidental use of unapproved images and clearly marks work-in-progress.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating meme templates</h3>
            <p className="text-sm text-muted-foreground">
              Add your watermark to meme templates you create. When they go viral, your brand gets exposure. Place it subtly so it doesn't interfere with the meme text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Protecting screenshots and tutorials</h3>
            <p className="text-sm text-muted-foreground">
              Tutorial images and software screenshots benefit from watermarks. Add your site URL so readers can find the full tutorial if images get shared.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Watermarks aren't foolproof protection.</strong>
              Determined users can crop out or clone-stamp watermarks. They're a deterrent, not security. For real protection, use low-res images and proper licensing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Opacity affects both visibility and aesthetics.</strong>
              Too transparent and the watermark is useless. Too opaque and it ruins the image. 30-50% opacity usually balances protection with visual appeal.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Position matters for effectiveness.</strong>
              Corner watermarks are easy to crop. Center watermarks are harder to remove but more intrusive. Tiled watermarks offer best protection but affect aesthetics most.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">All processing happens locally.</strong>
              Your images never leave your browser. This tool runs entirely client-side. Your photos aren't uploaded to any server or stored anywhere.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For portfolios, use a subtle corner watermark. For previews and proofs, use a large diagonal watermark across the center. Match protection level to risk.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What image formats are supported?</h3>
            <p className="text-sm text-muted-foreground">
              Upload JPEG, PNG, WebP, and GIF. Download as PNG (lossless, supports transparency) or JPEG (smaller files, good for photos).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use a logo instead of text?</h3>
            <p className="text-sm text-muted-foreground">
              This tool focuses on text watermarks. For logo watermarks, use an image editor or dedicated logo watermark tool. Text is simpler and often sufficient.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I make a tiled watermark pattern?</h3>
            <p className="text-sm text-muted-foreground">
              Select the tiled/repeat option. The watermark repeats across the entire image. Adjust spacing between tiles for denser or sparser coverage.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does watermarking reduce image quality?</h3>
            <p className="text-sm text-muted-foreground">
              The watermark itself is lossless. But saving as JPEG introduces compression. Use PNG for maximum quality, or high JPEG quality (90%+) for photos.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I batch watermark multiple images?</h3>
            <p className="text-sm text-muted-foreground">
              This tool processes one image at a time. For batch watermarking, use desktop software like Lightroom or dedicated batch tools.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What text should I use for watermarks?</h3>
            <p className="text-sm text-muted-foreground">
              Your name, business name, website URL, or social handle. Keep it short. For proofs, add "DRAFT" or "PROOF" with a date or client name.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is there a size limit for images?</h3>
            <p className="text-sm text-muted-foreground">
              Browser memory limits apply. Very large images (50MB+) may cause issues. For typical photos (under 10MB), there are no practical limits.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
