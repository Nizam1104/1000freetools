import React from "react"

export default function QrCodeAppStoreSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the QR Code for App Store Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your app name for identification. This helps organize multiple app QR codes and appears in downloads.
          </p>
          <p>
            Choose your platform: iOS only, Android only, or Both. For single-platform apps, the QR code links directly to that store. For both, it creates a smart link.
          </p>
          <p>
            Paste your App Store URL for iOS apps. Find this in App Store Connect or by copying the share link from the App Store app.
          </p>
          <p>
            Paste your Google Play Store URL for Android apps. Find this in Google Play Console or by copying the share link from the Play Store app.
          </p>
          <p>
            Generate the QR code and download it in SVG or PNG format. Print on marketing materials, business cards, or display digitally.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">App launch marketing</h3>
            <p className="text-sm text-muted-foreground">
              Include QR codes in press releases and launch materials. Journalists and users can instantly access your app. Reduces friction in discovery.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Physical advertising</h3>
            <p className="text-sm text-muted-foreground">
              Add QR codes to billboards, bus stops, and print ads. Passersby scan to download immediately. Bridge the gap between physical and digital.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Business card networking</h3>
            <p className="text-sm text-muted-foreground">
              Include your app QR code on business cards. Contacts can download while you talk. Memorable way to share your work.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">In-store promotions</h3>
            <p className="text-sm text-muted-foreground">
              Retail locations display QR codes for companion apps. Customers download while shopping. Enables loyalty programs and mobile checkout.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Event booth displays</h3>
            <p className="text-sm text-muted-foreground">
              Trade show booths feature app QR codes. Attendees scan during demos. Captures interest while engagement is high.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Product packaging</h3>
            <p className="text-sm text-muted-foreground">
              Include QR codes on product boxes for companion apps. Customers download while unboxing. Enhances the product experience.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Smart links detect user's device.</strong>
              For "Both" option, use a smart link service. iOS users go to App Store, Android users to Play Store. Services like Branch.io provide this.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">App Store URLs are long.</strong>
              Consider using a URL shortener before generating the QR code. Shorter URLs create simpler, more scannable QR codes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Test on actual devices.</strong>
              Scan your QR code with both iOS and Android phones. Verify it opens the correct store. Test before mass printing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">App reviews affect downloads.</strong>
              The QR code takes users to your store page. Ensure your app has good ratings and compelling screenshots. First impressions matter.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Add a call-to-action near the QR code. "Scan to Download" or "Get the App" increases scan rates. People need to know what to expect.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I get my App Store URL?</h3>
            <p className="text-sm text-muted-foreground">
              In the App Store, search for your app, tap share, and copy the link. Or find it in App Store Connect under your app's general information.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I get my Play Store URL?</h3>
            <p className="text-sm text-muted-foreground">
              The format is play.google.com/store/apps/details?id=your.package.name. Find your package name in Google Play Console.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I track app downloads from QR codes?</h3>
            <p className="text-sm text-muted-foreground">
              Use campaign parameters in your URLs. Apple and Google provide attribution tools. Third-party services offer detailed QR-specific analytics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if my app isn't published yet?</h3>
            <p className="text-sm text-muted-foreground">
              Create a landing page that notifies users when the app launches. Update the QR code destination once published. Or wait until launch to distribute.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use different codes for iOS and Android?</h3>
            <p className="text-sm text-muted-foreground">
              If targeting both platforms, use a smart link that auto-detects. For platform-specific marketing (iOS-only ads), use direct store links.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize the QR code design?</h3>
            <p className="text-sm text-muted-foreground">
              Basic generators offer color changes. For branded QR codes with logos, use specialized tools. Always test scannability after customization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do QR codes work for app updates?</h3>
            <p className="text-sm text-muted-foreground">
              QR codes link to the store page, which shows update buttons. However, most users enable auto-update. QR codes are mainly for new downloads.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
