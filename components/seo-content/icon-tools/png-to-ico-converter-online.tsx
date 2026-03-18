import React from "react"

export default function PngToIcoConverterOnlineSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the PNG to ICO Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your PNG image file. The converter accepts PNG files with or without transparency. Select the icon sizes you want to include in the final ICO file.
          </p>
          <p>
            ICO files can contain multiple sizes in one file. Choose from standard sizes: 16x16, 32x32, 48x48, 64x64, 128x128, and 256x256 pixels. Including multiple sizes ensures your icon looks sharp at any display size.
          </p>
          <p>
            Click convert and download your ICO file. The converter preserves transparency from your PNG. The resulting ICO works as a favicon, Windows application icon, or system icon.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating website favicons</h3>
            <p className="text-sm text-muted-foreground">
              Your logo is a PNG but browsers need favicon.ico. Convert it to ICO format. Include 16x16 and 32x32 for browser tabs and bookmarks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building Windows applications</h3>
            <p className="text-sm text-muted-foreground">
              Windows executables need .ico files for application icons. Convert your app logo PNG to ICO. Include multiple sizes for different Windows views.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Customizing folder icons</h3>
            <p className="text-sm text-muted-foreground">
              Windows lets you set custom folder icons. Convert your PNG designs to ICO format. Apply them to organize folders visually.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making desktop shortcuts</h3>
            <p className="text-sm text-muted-foreground">
              Custom shortcuts need custom icons. Convert PNG logos or images to ICO. Right-click shortcut properties to apply your custom icon.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating software installers</h3>
            <p className="text-sm text-muted-foreground">
              Installer packages need ICO icons. Convert your product logo to ICO format. The icon appears during installation and in Add/Remove Programs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing browser themes</h3>
            <p className="text-sm text-muted-foreground">
              Custom browser themes may need ICO files. Convert PNG assets to ICO for theme packages. Works for Chrome, Firefox, and Edge themes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Square images work best.</strong>
              ICO icons are square. If your PNG is rectangular, it will be cropped or padded. Start with a square PNG for best results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Include multiple sizes.</strong>
              Windows uses different sizes in different contexts. File Explorer shows 48px, taskbar shows 16px. Include 16, 32, 48, and 256 for full coverage.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Transparency is preserved.</strong>
              PNG alpha transparency converts to ICO transparency. This creates smooth edges instead of jagged borders. Essential for non-square designs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">256px is the max standard size.</strong>
              ICO format supports up to 256x256 pixels. Larger PNG files will be scaled down. For modern high-DPI displays, 256px provides enough detail.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For favicons, include at least 16x16 and 32x32. Modern browsers also support PNG favicons, but ICO provides best compatibility across all browsers including older versions.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum PNG file size?</h3>
            <p className="text-sm text-muted-foreground">
              Most browsers handle uploads up to 10MB. For icon conversion, PNG files should be much smaller - typically under 1MB. Large files may process slowly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert multiple PNGs at once?</h3>
            <p className="text-sm text-muted-foreground">
              This tool converts one PNG at a time. For batch conversion, use desktop software like IcoFX or online batch converters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does ICO support animation?</h3>
            <p className="text-sm text-muted-foreground">
              Standard ICO doesn't support animation. For animated icons, use GIF format. Windows cursors (.ani) support animation but require different tools.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why include so many sizes?</h3>
            <p className="text-sm text-muted-foreground">
              Windows picks the best size for each context. Without multiple sizes, Windows scales the icon, which can look blurry. Pre-rendered sizes stay sharp.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert ICO back to PNG?</h3>
            <p className="text-sm text-muted-foreground">
              This tool only converts PNG to ICO. For the reverse, use an ICO to PNG converter. Note that multi-size ICOs will extract as separate PNG files.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What color depth does ICO support?</h3>
            <p className="text-sm text-muted-foreground">
              Modern ICO supports 32-bit color with alpha transparency. Older formats supported 24-bit, 8-bit, and even 1-bit. This tool uses 32-bit for best quality.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this work on Mac?</h3>
            <p className="text-sm text-muted-foreground">
              ICO is primarily a Windows format. Mac uses ICNS files. For Mac icons, convert PNG to ICNS using macOS tools or online ICNS converters.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
