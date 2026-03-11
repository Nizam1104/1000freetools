import React from "react"

export default function FontPreviewerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Font Previewer Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Type your custom text in the sample text field. See it rendered in multiple fonts simultaneously. Compare how each font displays your actual content.
          </p>
          <p>
            Adjust font size, weight, letter spacing, and line height with sliders. Change text and background colors. Toggle between normal and italic styles. Every change updates all previews instantly.
          </p>
          <p>
            Add or remove fonts from the comparison view. Copy the CSS code for your selected settings. Export your typography decisions for implementation. All processing happens locally.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Choosing website fonts</h3>
            <p className="text-sm text-muted-foreground">
              See how fonts look with your actual headlines. Compare options side by side. Make informed typography decisions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing logo typography</h3>
            <p className="text-sm text-muted-foreground">
              Preview your company name in different fonts. Find the perfect typographic voice. Test before committing to a direction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Checking readability</h3>
            <p className="text-sm text-muted-foreground">
              Test body text at various sizes and spacing. Ensure comfortable reading experience. Accessibility matters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Client presentations</h3>
            <p className="text-sm text-muted-foreground">
              Show font options with client's actual content. More meaningful than lorem ipsum. Get better feedback.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning typography</h3>
            <p className="text-sm text-muted-foreground">
              Understand how settings affect appearance. See letter spacing in action. Build typography intuition through experimentation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating style guides</h3>
            <p className="text-sm text-muted-foreground">
              Document exact font settings. Capture size, weight, spacing values. Consistent implementation across teams.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Preview with real content.</strong>
              Lorem ipsum hides issues. Your actual text reveals problems. Long words, awkward breaks, personality fit.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Test at actual sizes.</strong>
              Fonts look different at 14px vs 72px. Set size to match your use case. Headline fonts need headline sizes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Consider all weights.</strong>
              Regular may look great, but what about bold? Check all weights you'll use. Some fonts have weak bold variants.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Letter spacing matters.</strong>
              Tight spacing looks cramped. Loose looks airy. Find the balance for your font and size. Defaults aren't always best.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Preview on multiple devices if possible. Fonts render differently on Mac, Windows, and mobile. Test where your audience will see it.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a good body text size?</h3>
            <p className="text-sm text-muted-foreground">
              16px is standard for web. 14-18px range works depending on font. Test with your actual content and audience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How much letter spacing is normal?</h3>
            <p className="text-sm text-muted-foreground">
              0 is default. -0.5 to -1 for tight headlines. 0.5 to 2 for airy designs. All-caps often needs positive spacing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What line height should I use?</h3>
            <p className="text-sm text-muted-foreground">
              1.5 is comfortable for body text. 1.2-1.3 for headlines. More for long-form content. Adjust for your font's x-height.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use system or web fonts?</h3>
            <p className="text-sm text-muted-foreground">
              System fonts load instantly. Web fonts offer more choice. Consider performance vs. brand needs. Often use both strategically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many fonts should I compare?</h3>
            <p className="text-sm text-muted-foreground">
              3-5 is manageable. More causes decision paralysis. Narrow down, then deep-dive on finalists. Quality over quantity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I preview italic versions?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, toggle the italic button. See how italics look in each font. Some fonts have true italics, others just oblique.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this tool free?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, completely free with no registration. Preview as many fonts as you need. No limitations or watermarks.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
