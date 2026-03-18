import React from "react"

export default function IconResizerForAndroidIosSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Icon Resizer Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your base icon image - ideally a high-resolution square PNG or SVG. The resizer automatically generates all required sizes for Android and iOS app icons.
          </p>
          <p>
            Select your target platforms: Android, iOS, or both. The tool uses platform-specific size requirements. Android needs multiple densities (mdpi, hdpi, xhdpi, etc.). iOS requires various point sizes for different devices.
          </p>
          <p>
            Preview how your icon looks at each size. The resizer applies proper scaling algorithms to maintain quality. Download as a ZIP file with correctly named icons ready for your project's asset folders.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Launching a React Native app</h3>
            <p className="text-sm text-muted-foreground">
              Your app is ready but you need icons for both platforms. Upload one master icon. Get all sizes for Android's mipmap folders and iOS's Assets.xcassets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Submitting to App Store</h3>
            <p className="text-sm text-muted-foreground">
              Apple requires specific icon sizes for App Store Connect. Generate the 1024x1024 App Store icon plus all device-specific sizes from one source.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Publishing on Google Play</h3>
            <p className="text-sm text-muted-foreground">
              Google Play needs a 512x512 high-res icon and adaptive icon layers. Generate all required sizes from your master design in one go.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Updating existing app icons</h3>
            <p className="text-sm text-muted-foreground">
              Rebranding your app? Replace icons across all densities. Upload the new design and regenerate the complete set for both platforms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating PWA icons</h3>
            <p className="text-sm text-muted-foreground">
              Progressive Web Apps need multiple icon sizes too. Use the resizer to generate 192x192, 512x512, and other sizes for your manifest.json.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing app store screenshots</h3>
            <p className="text-sm text-muted-foreground">
              Marketing materials need icons at various sizes. Generate icons for screenshots, promotional graphics, and website previews from one upload.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Start with a large square source.</strong>
              Upload at least 1024x1024 pixels. Larger source files produce better results when scaled down. Never upscale small images - quality degrades.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">iOS requires no transparency.</strong>
              Apple adds rounded corners automatically. Don't include rounded corners or transparency in your source. iOS will apply its own masking.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Android supports adaptive icons.</strong>
              Android 8.0+ uses adaptive icons with foreground and background layers. Prepare separate layers for best results on modern Android devices.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Test on actual devices.</strong>
              Icons look different on various screens. Check how your icon appears on real devices before final submission. Home screen backgrounds vary.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Design your icon with a safe zone. Keep important elements within the center 66% of the square. iOS and Android may crop edges differently.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What size should my source icon be?</h3>
            <p className="text-sm text-muted-foreground">
              1024x1024 pixels is ideal. This covers all required output sizes. Minimum 512x512 works but may show quality loss at largest outputs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What format should I upload?</h3>
            <p className="text-sm text-muted-foreground">
              PNG with transparency works best. SVG is also supported and scales perfectly. Avoid JPG as compression artifacts may appear in smaller sizes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do I get all Android densities?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, generates mdpi, hdpi, xhdpi, xxhdpi, and xxxhdpi sizes. Also includes legacy sizes if needed. All standard Android density buckets covered.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about iOS @2x and @3x?</h3>
            <p className="text-sm text-muted-foreground">
              All iOS scale factors included: @1x, @2x, and @3x for various devices. Names follow Apple's convention for easy integration into Xcode projects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize the output sizes?</h3>
            <p className="text-sm text-muted-foreground">
              This tool uses standard platform requirements. For custom sizes, use a general image resizer. This focuses on Android and iOS specifications.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are the files organized?</h3>
            <p className="text-sm text-muted-foreground">
              ZIP contains separate folders for Android and iOS. Android uses mipmap folder structure. iOS uses Assets.xcassets naming. Ready to drop into projects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it work for app icons only?</h3>
            <p className="text-sm text-muted-foreground">
              Primarily designed for app icons, but works for any icon set needing multiple sizes. Use for notification icons, settings icons, or custom markers.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
