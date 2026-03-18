import React from "react"

export default function SvgEditorOnlineSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the SVG Editor Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This online SVG editor gives you a split-screen workspace: paste or write SVG code on the left, see it render instantly on the right. No upload required, no server processing - everything runs in your browser.
          </p>
          <p>
            The preview panel uses React's <code>dangerouslySetInnerHTML</code> to render your SVG markup directly. Changes trigger a re-render within milliseconds, so you can tweak coordinates, colors, or paths and see results immediately.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What you can edit:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Shape attributes (cx, cy, r for circles; x, y, width, height for rectangles)</li>
              <li>Fill and stroke colors (hex, rgb, named colors)</li>
              <li>Path data (d attribute with M, L, C, Q, Z commands)</li>
              <li>Text content, font-size, font-family</li>
              <li>Transform attributes (translate, rotate, scale, skew)</li>
              <li>Opacity, stroke-width, stroke-dasharray</li>
            </ul>
          </div>
          <p>
            Zoom controls let you inspect details at 50%-200% scale. Toggle the grid overlay to check alignment. Download your edited SVG or copy the code directly to clipboard.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quick icon tweaks</h3>
            <p className="text-sm text-muted-foreground">
              A designer sends you an SVG icon but the stroke is 1.5px instead of 2px. Instead of opening Illustrator, paste the code, change <code>stroke-width="1.5"</code> to <code>stroke-width="2"</code>, download. Done in 30 seconds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging broken SVGs</h3>
            <p className="text-sm text-muted-foreground">
              An SVG exported from Figma isn't rendering correctly. Paste it here to see if the issue is in the markup itself - maybe a malformed path or missing namespace declaration.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning SVG by experimentation</h3>
            <p className="text-sm text-muted-foreground">
              New to SVG? Type <code>&lt;circle cx="50" cy="50" r="40" fill="blue"/&gt;</code> and watch it appear. Change the radius, move the center, try different colors. Immediate feedback beats reading documentation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Inlining SVGs for performance</h3>
            <p className="text-sm text-muted-foreground">
              You need to inline an SVG directly into HTML to avoid an HTTP request. Paste the file, remove any <code>&lt;?xml?&gt;</code> declarations, copy the clean markup, drop it into your HTML.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing SVG export issues</h3>
            <p className="text-sm text-muted-foreground">
              Some tools export SVGs with unnecessary metadata, duplicate IDs, or bloated group structures. Paste the export here, strip out the junk manually, save a cleaner version.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating simple graphics without design software</h3>
            <p className="text-sm text-muted-foreground">
              Need a basic shape for a presentation? Write the SVG directly - a rectangle here, a circle there. No need to fire up heavy design software for simple graphics.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Browser-based processing.</strong>
              Your SVG code never leaves your browser. This is good for privacy but means very large SVGs (thousands of lines) might cause lag when typing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">No validation.</strong>
              The editor shows whatever you paste, even if it's invalid SVG. Broken markup might render as nothing or partially. Check the browser console for XML parse errors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">External resources won't load.</strong>
              If your SVG references external images via <code>&lt;image xlink:href="..."&gt;</code>, they won't display due to CORS restrictions. Inline or base64-encode images instead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Zoom affects preview only.</strong>
              The zoom slider changes how you see the preview, not the actual SVG dimensions. Downloaded files retain their original viewBox and width/height.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> If your SVG looks tiny or huge, check the <code>viewBox</code> attribute. A viewBox of "0 0 24 24" with width="500" will scale up. Adjust width/height or viewBox to control display size.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I edit SVG files from my computer?</h3>
            <p className="text-sm text-muted-foreground">
              Open the SVG file in a text editor (Notepad, VS Code, etc.), copy the contents, paste into this editor. After editing, click Download to save the modified file.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why isn't my SVG rendering?</h3>
            <p className="text-sm text-muted-foreground">
              Check for XML syntax errors - unclosed tags, missing quotes around attributes, invalid characters. Also verify the SVG has a proper <code>xmlns</code> declaration. Open browser DevTools console to see specific parse errors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I animate SVGs here?</h3>
            <p className="text-sm text-muted-foreground">
              You can write SMIL animations (<code>&lt;animate&gt;</code> elements) or CSS animations in a <code>&lt;style&gt;</code> block, but the preview may not show animation playback. Use a browser to test animated SVGs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I change the SVG dimensions?</h3>
            <p className="text-sm text-muted-foreground">
              Modify the <code>width</code> and <code>height</code> attributes on the root <code>&lt;svg&gt;</code> element. For responsive SVGs, remove width/height and rely on viewBox plus CSS sizing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between viewBox and preserveAspectRatio?</h3>
            <p className="text-sm text-muted-foreground">
              viewBox defines the coordinate system (e.g., "0 0 100 100"). preserveAspectRatio controls how the SVG scales within its container - whether it stretches or maintains proportions. Default is "xMidYMid meet" (centered, letterboxed).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert this SVG to PNG?</h3>
            <p className="text-sm text-muted-foreground">
              This editor doesn't export PNG. Download the SVG, then use a converter tool or open in a browser and screenshot. For programmatic conversion, use libraries like sharp (Node.js) or canvas (browser).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is there a limit to SVG file size?</h3>
            <p className="text-sm text-muted-foreground">
              No hard limit, but very large SVGs (10,000+ lines) may cause typing lag since the preview re-renders on every keystroke. For complex files, consider using a desktop editor like Inkscape.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
