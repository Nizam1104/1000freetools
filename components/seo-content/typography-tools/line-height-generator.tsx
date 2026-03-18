import React from "react"

export default function LineHeightGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Line Height Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool generates optimal line height (leading) values for any font size. Enter your font size and get recommended line heights for different content types—body text, headings, captions, and more.
          </p>
          <p>
            Line height is expressed as a unitless multiplier (like 1.5) or in units (px, em, rem). The generator shows both. It calculates the actual pixel spacing so you see exactly how much space appears between lines.
          </p>
          <p>
            Preview your text with different line heights in real time. Adjust until your content feels comfortable to read. Export CSS-ready values for immediate use in your projects.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Setting body text line height</h3>
            <p className="text-sm text-muted-foreground">
              Body text needs comfortable line spacing for extended reading. Use 1.5-1.7 for most content. The tool helps you find the sweet spot between cramped and wasteful.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Tightening heading line height</h3>
            <p className="text-sm text-muted-foreground">
              Headings look better with tighter line height (1.1-1.3). Multi-line headings with loose spacing look awkward. Generate appropriate values for each heading level.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating a typography system</h3>
            <p className="text-sm text-muted-foreground">
              Your design system needs consistent line heights. Generate a scale that pairs with your type scale—tighter for large text, looser for small text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Improving readability for older audiences</h3>
            <p className="text-sm text-muted-foreground">
              Older readers need more line spacing. Increase line height to 1.7-1.8 for better readability. The tool shows exactly how much extra space this creates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Optimizing for mobile screens</h3>
            <p className="text-sm text-muted-foreground">
              Mobile reading often benefits from slightly looser line height. Generate values that work well on small screens where eyes track shorter line lengths.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing text that feels "off"</h3>
            <p className="text-sm text-muted-foreground">
              Your content feels hard to read but you can't pinpoint why. Often it's line height. Test different values—small changes make big differences in readability.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Use unitless line height values.</strong>
              Unitless values (1.5 not 24px) scale properly when font size changes. This is crucial for responsive design and accessibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Larger fonts need tighter line height.</strong>
              As font size increases, line height multiplier should decrease. A 48px heading might use 1.2, while 16px body uses 1.6.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Line length affects ideal line height.</strong>
              Longer lines need more line height. If your content has wide measure (60+ characters), increase line height for easier eye tracking.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Different fonts need different spacing.</strong>
              Fonts with tall ascenders/descenders need more line height. Compact fonts can go tighter. Always preview with your actual font choice.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> The "squint test" works for line height. Squint at your text—if lines blur together, increase line height. If there are obvious gaps, decrease it.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the default line height?</h3>
            <p className="text-sm text-muted-foreground">
              Browsers default to about 1.2 (normal). This is too tight for body text. Most content looks better at 1.5-1.7. Always override the default for body content.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use px or unitless for line height?</h3>
            <p className="text-sm text-muted-foreground">
              Always use unitless (1.5) for line height. Pixel values don't scale when users change font size. Unitless values multiply by the current font size automatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between line-height and leading?</h3>
            <p className="text-sm text-muted-foreground">
              Same concept, different terms. "Leading" (pronounced ledding) is the traditional typography term. "Line height" is the CSS property. They both control vertical space between lines.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does line height affect accessibility?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, significantly. WCAG recommends at least 1.5 for body text. Users with dyslexia or low vision often need 1.7-2.0. Don't set line height too tight.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does line height work with flexbox?</h3>
            <p className="text-sm text-muted-foreground">
              Line height affects inline content height, which affects flex item sizing. Unexpected gaps in flex layouts often trace back to line height. Use align-items to control.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can line height be negative?</h3>
            <p className="text-sm text-muted-foreground">
              Technically yes, but don't do it. Negative line height causes lines to overlap, making text unreadable. It's occasionally used for visual tricks, never for actual content.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about line height for code blocks?</h3>
            <p className="text-sm text-muted-foreground">
              Code benefits from 1.4-1.6 line height. Monospace fonts often need slightly more space than proportional fonts. Test with your actual code samples.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
