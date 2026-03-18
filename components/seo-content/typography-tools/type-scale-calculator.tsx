import React from "react"

export default function TypeScaleCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Type Scale Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool generates a complete typography scale based on mathematical ratios. Enter your base font size and choose a scale ratio to instantly see all heading sizes from H1 through H6, plus body text sizes.
          </p>
          <p>
            Type scales use modular ratios like the golden ratio (1.618), major third (1.25), or perfect fourth (1.333). Each heading level multiplies the base size by the ratio raised to a power. H1 might be base × ratio⁵, H2 is base × ratio⁴, and so on.
          </p>
          <p>
            The preview shows how your scale looks in real time. Adjust the base size or ratio until the hierarchy feels balanced. The tool also generates CSS custom properties you can copy directly into your stylesheet.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Starting a new web design project</h3>
            <p className="text-sm text-muted-foreground">
              You're building a website from scratch and need consistent heading sizes. Generate a type scale once, export the CSS variables, and maintain perfect typography hierarchy throughout the project.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing inconsistent headings</h3>
            <p className="text-sm text-muted-foreground">
              Your site has random font sizes scattered across pages. Use this tool to create a unified scale, then replace all hardcoded sizes with the generated CSS variables.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating a design system</h3>
            <p className="text-sm text-muted-foreground">
              Your team needs typography standards. Generate multiple scale options, present them to stakeholders, and document the chosen scale in your design system guidelines.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Improving mobile readability</h3>
            <p className="text-sm text-muted-foreground">
              Your headings look great on desktop but overwhelm mobile screens. Generate a separate mobile scale with a smaller base size while maintaining the same ratio.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Matching brand typography</h3>
            <p className="text-sm text-muted-foreground">
              Your brand guidelines specify exact heading sizes. Work backwards—enter the H1 size and adjust the ratio until the scale produces your required sizes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Auditing existing designs</h3>
            <p className="text-sm text-muted-foreground">
              You inherited a site with mysterious font sizes. Test different ratios to reverse-engineer the original scale, then document it for future maintenance.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Base size is usually 16px.</strong>
              Most browsers default to 16px. Changing this affects all relative units. If you set base to 18px for accessibility, your entire scale shifts proportionally.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Smaller ratios create subtle hierarchy.</strong>
              Ratios like 1.125 (major second) create gentle size differences. Larger ratios like 1.618 (golden ratio) create dramatic contrast between headings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Line height should adjust with size.</strong>
              Larger headings need tighter line height (1.1-1.3). Body text needs more (1.5-1.7). Don't use the same line height across all sizes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Consider viewport-based scaling.</strong>
              For responsive design, use CSS clamp() with your scale values. This creates fluid typography that grows smoothly between breakpoints.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Test your scale at actual content lengths. A ratio that looks good with "Heading" might feel off with "The Complete Guide to Modern Web Typography in 2024".
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What ratio should I choose?</h3>
            <p className="text-sm text-muted-foreground">
              For most websites, 1.25 (major third) or 1.333 (perfect fourth) work well. Use 1.5+ for bold, editorial designs. Use 1.125-1.2 for content-heavy sites with many heading levels.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use px, rem, or em?</h3>
            <p className="text-sm text-muted-foreground">
              Use rem for accessibility—it respects user font preferences. The tool outputs rem by default. Only use px for fixed-size elements like icons or borders.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many heading levels do I need?</h3>
            <p className="text-sm text-muted-foreground">
              Most sites use H1-H4. H5 and H6 are rare. If you need more than 4 levels, consider redesigning your content hierarchy instead of adding more sizes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use different ratios for different sections?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but be careful. You might use a larger ratio for hero sections and a smaller one for blog content. Just keep body text consistent across the site.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about negative steps for small text?</h3>
            <p className="text-sm text-muted-foreground">
              Good scales include sizes smaller than base for captions, footnotes, and labels. The tool generates these by dividing base by the ratio (base × ratio⁻¹, ratio⁻², etc.).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with variable fonts?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Type scales control size, variable fonts control weight and other axes. Use both together—pick a scale for sizes, then adjust weight to enhance hierarchy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I implement the CSS variables?</h3>
            <p className="text-sm text-muted-foreground">
              Copy the generated CSS into your root selector. Then use var(--text-4xl) for H1, var(--text-3xl) for H2, etc. Apply consistently across your components.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
