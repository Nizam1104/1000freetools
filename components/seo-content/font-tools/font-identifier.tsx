import React from "react"

export default function FontIdentifierSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Font Identifier Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload an image containing text you want to identify. The tool analyzes the letterforms and compares them against a database of known fonts.
          </p>
          <p>
            Results show matching fonts with similarity percentages. Higher percentages indicate closer matches. Each result includes a link to download or learn more about the font.
          </p>
          <p>
            Follow the tips for best results: use clear, high-resolution images with visible text. Crop to show only the text you want to identify. All processing happens locally in your browser.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Identifying fonts in logos</h3>
            <p className="text-sm text-muted-foreground">
              See a logo with great typography? Identify the font for inspiration. Understand what makes it effective.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Matching existing designs</h3>
            <p className="text-sm text-muted-foreground">
              Need to match fonts in a brand refresh. Identify what's currently used. Maintain visual consistency.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Finding fonts from screenshots</h3>
            <p className="text-sm text-muted-foreground">
              Saw great typography on a website? Screenshot and identify. Recreate the look for your projects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning typography</h3>
            <p className="text-sm text-muted-foreground">
              Study fonts you admire. Learn their names and characteristics. Build your typography vocabulary.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Competitor analysis</h3>
            <p className="text-sm text-muted-foreground">
              Analyze competitor typography. Understand their design choices. Inform your own brand decisions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Client requests</h3>
            <p className="text-sm text-muted-foreground">
              Client sends image: "I want something like this." Identify the font. Show similar options. Manage expectations.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Image quality matters.</strong>
              Clear, high-resolution images work best. Blurry or pixelated text confuses identification. Crop tightly around text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Custom lettering won't match.</strong>
              Hand-drawn logos and custom type won't have exact matches. You'll get similar styles. Close enough for inspiration.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Multiple fonts complicate things.</strong>
              Images with mixed fonts may not identify well. Use one font at a time. Crop to single-font sections.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Similarity scores are estimates.</strong>
              Percentages indicate visual similarity. Your judgment matters most. Compare results visually.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For best results, use images with clear, large text on solid backgrounds. Avoid decorative effects like shadows or gradients that obscure letterforms.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What image formats work?</h3>
            <p className="text-sm text-muted-foreground">
              PNG, JPG, GIF, and SVG all work. PNG is best for quality. JPG is fine for photos. Avoid heavily compressed images.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why didn't it find an exact match?</h3>
            <p className="text-sm text-muted-foreground">
              The font might be custom, modified, or not in the database. Try similar results. Or use dedicated font identification services.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can it identify handwriting?</h3>
            <p className="text-sm text-muted-foreground">
              Handwritten text is challenging. May match similar script fonts. Custom handwriting won't have exact matches.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it work with non-Latin fonts?</h3>
            <p className="text-sm text-muted-foreground">
              Limited support for non-Latin scripts. Works best with Latin alphabet. Other scripts may not identify correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are the suggested fonts free?</h3>
            <p className="text-sm text-muted-foreground">
              Results include both free and premium fonts. Check individual font licenses. Google Fonts are free for commercial use.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I identify fonts from videos?</h3>
            <p className="text-sm text-muted-foreground">
              Screenshot the frame with clearest text. Then upload the screenshot. Video frames work like any other image.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my uploaded image stored?</h3>
            <p className="text-sm text-muted-foreground">
              No, processing happens in your browser. Images aren't uploaded to servers. Your images stay private.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
