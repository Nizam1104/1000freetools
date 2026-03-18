import React from "react"

export default function IconFontGeneratorFromSvgSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Icon Font Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your SVG icon files. Select multiple SVGs to create a complete icon font. Each SVG becomes one character in the font.
          </p>
          <p>
            Assign Unicode code points or use auto-assignment. Set the font name and metadata. The generator creates webfont files in WOFF, WOFF2, TTF, and EOT formats.
          </p>
          <p>
            Download the font files plus CSS stylesheet and HTML demo page. The CSS includes classes for each icon. Drop the files into your project and start using icons as text characters.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating custom UI icon sets</h3>
            <p className="text-sm text-muted-foreground">
              Your design system needs unique icons. Convert your SVG icons to a webfont. Use icon classes throughout your application consistently.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Replacing icon libraries</h3>
            <p className="text-sm text-muted-foreground">
              FontAwesome is too heavy for your needs? Create a custom font with only the icons you use. Reduce page weight significantly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building component libraries</h3>
            <p className="text-sm text-muted-foreground">
              Publishing a React or Vue component library? Include a custom icon font. Consumers get all icons in one lightweight package.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating brand-specific icons</h3>
            <p className="text-sm text-muted-foreground">
              Your brand has unique symbols? Turn them into an icon font. Use brand icons alongside standard UI icons consistently.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Optimizing for performance</h3>
            <p className="text-sm text-muted-foreground">
              Multiple SVG requests slow down pages. One font file loads all icons. Browser caches the font, speeding up subsequent pages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Supporting older browsers</h3>
            <p className="text-sm text-muted-foreground">
              Need to support IE11 or older? Icon fonts work everywhere. SVG sprites don't work in older browsers. Fonts provide universal compatibility.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">SVGs should be properly prepared.</strong>
              Convert text to paths in your SVGs. Remove unnecessary metadata. Ensure all icons are the same visual size for consistent rendering.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Font icons are single color.</strong>
              Icon fonts inherit text color. This is great for theming but limits multi-color icons. Use SVG sprites for multi-color needs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">WOFF2 offers best compression.</strong>
              Modern browsers support WOFF2. It's 30% smaller than WOFF. Include WOFF2 for modern browsers, WOFF as fallback.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Accessibility requires care.</strong>
              Icon fonts need proper ARIA attributes. Hide decorative icons from screen readers. Use aria-label for functional icons.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Name your SVG files before uploading. The generator uses filenames as icon class names. "user-profile.svg" becomes ".icon-user-profile" in CSS.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many icons can I include?</h3>
            <p className="text-sm text-muted-foreground">
              No practical limit for most uses. Fonts can contain hundreds of icons. Very large fonts may impact initial load time. Keep under 500 icons for best performance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What SVG features are supported?</h3>
            <p className="text-sm text-muted-foreground">
              Basic paths, shapes, and fills work best. Gradients and complex effects may not render correctly. Keep SVGs simple for font conversion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I update the font later?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, regenerate with new or modified icons. Keep the same font name to maintain CSS compatibility. Update the font files on your server.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I use the icons?</h3>
            <p className="text-sm text-muted-foreground">
              Include the CSS file. Add icon classes to HTML elements: &lt;i class="icon-name"&gt;&lt;/i&gt;. Icons render as text characters with your chosen color.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about browser support?</h3>
            <p className="text-sm text-muted-foreground">
              WOFF2: Chrome 36+, Firefox 39+, Safari 12+, Edge 14+. WOFF: IE9+, all modern browsers. TTF: IE8+, older Android. EOT: IE8 and below.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I subset the font?</h3>
            <p className="text-sm text-muted-foreground">
              This tool generates fonts from your selected SVGs only. Include just the icons you need. No unused icons bloat the font file.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the font free to use?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, fonts you create are yours to use. No licensing restrictions from the generator. Ensure your SVG icons have appropriate licenses.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
