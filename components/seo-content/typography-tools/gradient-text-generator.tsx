import React from "react"

export default function GradientTextGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Gradient Text Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool creates gradient-filled text effects using CSS. Choose your colors, adjust the gradient direction, and preview the effect on your text in real time.
          </p>
          <p>
            The generator uses CSS background-clip: text to apply gradients to text characters. You can create linear gradients (straight color transitions) or radial gradients (circular color spreads). Adjust angle, color stops, and opacity for custom effects.
          </p>
          <p>
            Export ready-to-use CSS code with all vendor prefixes. The tool generates both the gradient background and the text-clip properties needed for the effect to work across browsers.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating eye-catching headlines</h3>
            <p className="text-sm text-muted-foreground">
              Your hero section needs impact. Gradient text draws attention to key messages and adds visual interest without images or illustrations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing logos and wordmarks</h3>
            <p className="text-sm text-muted-foreground">
              Gradient text effects make logos memorable. Create a distinctive wordmark for your brand that stands out from flat-colored competitors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making social media graphics</h3>
            <p className="text-sm text-muted-foreground">
              Instagram posts and Twitter headers with gradient text get more engagement. Create scroll-stopping visuals without design software.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Highlighting CTAs and buttons</h3>
            <p className="text-sm text-muted-foreground">
              Gradient text on call-to-action buttons increases click-through rates. The colorful effect draws the eye and signals importance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating YouTube thumbnails</h3>
            <p className="text-sm text-muted-foreground">
              Thumbnail text needs to pop at small sizes. Gradient fills make your text stand out against busy backgrounds and compete with other videos.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing sale banners</h3>
            <p className="text-sm text-muted-foreground">
              Promotional content benefits from energetic gradient text. Create urgency with bold color transitions on "SALE" or "LIMITED" text.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Gradient text needs a dark background.</strong>
              The effect works by clipping a gradient to text. Light backgrounds make gradient text hard to read. Use on dark or contrasting backgrounds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Browser support is good but not universal.</strong>
              Modern browsers support background-clip: text. Older browsers need fallbacks. Always provide a solid color fallback for accessibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Use bold fonts for best results.</strong>
              Thin fonts don't show gradients well. Medium to bold weights display color transitions clearly. Avoid light or thin font weights.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Contrast matters for accessibility.</strong>
              Ensure your gradient has enough contrast against the background. Test with accessibility tools to meet WCAG requirements.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Use gradient text sparingly—one or two words max. Overuse diminishes impact and can hurt readability. Reserve it for emphasis.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does gradient text work on mobile?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, all modern mobile browsers support CSS gradient text. iOS Safari, Chrome Android, and Firefox Mobile all render it correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I animate gradient text?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, you can animate the background-position to create moving gradients. It's CPU-intensive but creates eye-catching effects for hero sections.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the best gradient angle?</h3>
            <p className="text-sm text-muted-foreground">
              45 degrees (top-left to bottom-right) feels natural. Horizontal (90 degrees) is classic. Vertical (0 degrees) is dramatic. Test different angles with your text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many colors should I use?</h3>
            <p className="text-sm text-muted-foreground">
              2-3 colors work best. More colors can look muddy. Start with two complementary colors, then add a third for complexity if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use gradient text for body copy?</h3>
            <p className="text-sm text-muted-foreground">
              Not recommended. Gradient text reduces readability for long passages. Reserve it for headlines, logos, and short accent text only.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I add a text shadow to gradient text?</h3>
            <p className="text-sm text-muted-foreground">
              Use text-shadow property normally, but note it applies to the clipped text. Subtle shadows work; heavy shadows can interfere with the gradient effect.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What file format should I export?</h3>
            <p className="text-sm text-muted-foreground">
              Export as CSS code, not an image. CSS gradients scale infinitely, load instantly, and remain editable. Only rasterize if you need it for non-web use.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
