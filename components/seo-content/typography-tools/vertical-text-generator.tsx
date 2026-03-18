import React from "react"

export default function VerticalTextGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Vertical Text Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts horizontal text into vertical layouts. Type or paste your text, choose a vertical style, and get instantly formatted output perfect for sidebars, banners, or design elements.
          </p>
          <p>
            You can stack letters vertically (one per line), use CSS writing-mode for true vertical text, or add spacing between characters. The tool preserves your original text while creating a vertical display version.
          </p>
          <p>
            Options include character spacing control, font selection, and export formats. Copy the CSS for web use, or download as an image for graphics projects. Preview changes in real time as you adjust settings.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating sidebar navigation</h3>
            <p className="text-sm text-muted-foreground">
              Your website has a vertical sidebar menu. Convert section titles to vertical text for a modern, space-efficient navigation design that stands out from horizontal menus.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing book spines</h3>
            <p className="text-sm text-muted-foreground">
              You're self-publishing and need text for book spines. Generate vertical titles that read correctly when books are shelved, then export for your cover designer.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making social media graphics</h3>
            <p className="text-sm text-muted-foreground">
              Vertical text adds visual interest to Instagram stories or Pinterest pins. Create eye-catching text elements that break the horizontal norm and grab attention.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating restaurant menus</h3>
            <p className="text-sm text-muted-foreground">
              Your menu design has narrow columns. Run section headers vertically along the sides to maximize space for dish descriptions while maintaining elegant typography.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing product packaging</h3>
            <p className="text-sm text-muted-foreground">
              Product boxes often have narrow sides. Vertical text fits ingredient lists, instructions, or branding on slim surfaces where horizontal text won't fit.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating Asian-style designs</h3>
            <p className="text-sm text-muted-foreground">
              Traditional Chinese, Japanese, and Korean use vertical text. Create authentic-looking designs with properly formatted vertical typography for cultural projects.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">CSS writing-mode has best browser support.</strong>
              Modern browsers support writing-mode: vertical-rl or vertical-lr. This is the proper semantic way to create vertical text, not just stacking characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Letter spacing becomes vertical spacing.</strong>
              When text runs vertically, letter-spacing controls vertical gaps. You'll need more spacing than horizontal text for readability.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some fonts work better vertically.</strong>
              Monospace fonts align cleanly. Sans-serif fonts generally read better vertically than script or decorative fonts. Test your chosen font before committing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Reading direction matters.</strong>
              Vertical text can read top-to-bottom (Western) or right-to-left columns (Asian). Choose the direction that matches your audience's expectations.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For web accessibility, keep vertical text short—labels, headers, or single words. Long vertical paragraphs are difficult for screen readers and keyboard navigation.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between stacking and writing-mode?</h3>
            <p className="text-sm text-muted-foreground">
              Stacking puts each character on a new line (simple but not real vertical text). CSS writing-mode rotates text flow properly, maintaining word relationships and better typography.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for CJK (Chinese, Japanese, Korean) text?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, vertical text is traditional for CJK languages. Use writing-mode: vertical-rl for authentic right-to-left column flow that these languages expect.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my vertical text look cramped?</h3>
            <p className="text-sm text-muted-foreground">
              Vertical text needs more spacing than horizontal. Increase letter-spacing to 0.1-0.2em for better readability. Also consider using a slightly larger font size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does vertical text affect SEO?</h3>
            <p className="text-sm text-muted-foreground">
              No, search engines read the HTML content regardless of visual orientation. As long as the text is in the HTML (not an image), it's fully indexable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I animate vertical text?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, vertical text supports all CSS animations. Animate opacity, transforms, or color just like horizontal text. Just remember animations run along the vertical axis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I make vertical text responsive?</h3>
            <p className="text-sm text-muted-foreground">
              Use relative units (em, rem, vh) for font size and spacing. Set max-height constraints so vertical text doesn't overflow on small screens.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use vertical text for body content?</h3>
            <p className="text-sm text-muted-foreground">
              Generally no. Vertical text is harder to read for long passages. Reserve it for decorative elements, labels, headers, or short accent text.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
