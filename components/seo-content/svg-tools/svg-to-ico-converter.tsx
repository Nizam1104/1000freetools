import React from "react"

export default function SvgToIcoConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your SVG code into the input area. The ICO format supports multiple icon sizes in a single file - select which sizes you want to include from the available options.
          </p>
          <p>
            Common favicon sizes are pre-selected: 16x16 for browser tabs, 32x32 for taskbars, 48x48 for desktop shortcuts. Add larger sizes like 128x128 or 256x256 for high-DPI displays and app icons.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Size recommendations:</p>
            <ul className="text-sm space-y-1">
              <li><strong>16x16:</strong> Browser tabs, file lists</li>
              <li><strong>32x32:</strong> Taskbars, start menu</li>
              <li><strong>48x48:</strong> Desktop icons</li>
              <li><strong>64x64:</strong> Large taskbar icons</li>
              <li><strong>128x256:</strong> App icons, retina displays</li>
            </ul>
          </div>
          <p>
            Click Generate ICO Preview to see how your icon looks at each selected size. The tool shows a preview grid. Note: This generates a preview SVG - for actual .ico files, use a dedicated converter.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating website favicons</h3>
            <p className="text-sm text-muted-foreground">
              Convert your SVG logo to ICO format for browser tabs. Include multiple sizes so your icon looks sharp everywhere - from tiny tab icons to bookmark lists.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building Windows application icons</h3>
            <p className="text-sm text-muted-foreground">
              Windows .exe files need ICO icons. Generate all required sizes in one file. From 16px file explorer icons to 256px properties dialog previews.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing progressive web app icons</h3>
            <p className="text-sm text-muted-foreground">
              PWAs installed on desktop need ICO files. Preview how your icon scales before committing to PNG exports. Ensure brand consistency across platforms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing icon scalability</h3>
            <p className="text-sm text-muted-foreground">
              See how your design holds up at tiny sizes. Details that look great at 256px may become mud at 16px. Identify simplification needs early.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating shortcut icons</h3>
            <p className="text-sm text-muted-foreground">
              Custom shortcuts need ICO files. Convert your brand icon for desktop shortcuts, folder icons, or custom file type associations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing client deliverables</h3>
            <p className="text-sm text-muted-foreground">
              Clients need favicons in multiple formats. Preview the ICO version to confirm it meets their needs before delivering the final files.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">This tool generates a preview, not actual ICO.</strong>
              True ICO files require binary format encoding. Use this preview to verify sizing, then use a dedicated converter for the actual .ico file.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Small sizes need simple designs.</strong>
              Details disappear below 32px. Icons with fine text or complex elements won't scale well. Design specifically for small sizes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">ICO supports limited colors at small sizes.</strong>
              Windows may reduce colors for 16px icons. Test on actual Windows systems. What looks good in preview may render differently.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Modern sites often use PNG favicons.</strong>
              PNG format is more common now. ICO is mainly for legacy support. Consider PNG for modern browsers, ICO as fallback.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For best results, create a simplified version of your logo specifically for 16x16 and 32x32 sizes. Don't just scale down - redesign for tiny sizes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I get an actual .ico file?</h3>
            <p className="text-sm text-muted-foreground">
              Use a dedicated ICO converter like ICOConvert, ConvertICO, or command-line tools like ImageMagick. This tool helps you preview and plan.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What sizes are required for favicons?</h3>
            <p className="text-sm text-muted-foreground">
              Minimum: 16x16 and 32x32. Recommended: Add 48x48 and 64x64. Modern sites also use PNG favicons at 180x180 for Apple devices.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use SVG as favicon directly?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, modern browsers support SVG favicons. Use &lt;link rel="icon" href="logo.svg" type="image/svg+xml"&gt;. ICO is for legacy support.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my icon look blurry at small sizes?</h3>
            <p className="text-sm text-muted-foreground">
              Complex designs don't scale well. Simplify shapes, increase contrast, and remove fine details for small icon sizes. Design specifically for each size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I include all sizes?</h3>
            <p className="text-sm text-muted-foreground">
              Include sizes you actually need. More sizes = larger file. For web favicons, 16-64px is usually sufficient. For app icons, include up to 256px.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I animate ICO files?</h3>
            <p className="text-sm text-muted-foreground">
              No, ICO is a static format. For animated favicons, use GIF format (limited support) or CSS/JavaScript animations on SVG favicons.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum ICO file size?</h3>
            <p className="text-sm text-muted-foreground">
              ICO files can be several megabytes with many sizes. For web use, keep under 50KB. For application icons, size is less critical.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
