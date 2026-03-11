import React from "react"

export default function QrCodeGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the QR Code Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool uses the qrserver.com API to generate QR codes instantly. Type or paste your content - a URL, text, email address, or phone number - and the API encodes it into a 2D barcode pattern.
          </p>
          <p>
            QR codes use Reed-Solomon error correction, which means they can still be scanned even if partially damaged or obscured. You can choose different error correction levels depending on how much of the code might get blocked (like by a logo in the center).
          </p>
          <p>
            The generator supports multiple output formats: PNG for general use, SVG for scalable vector graphics (perfect for print), and JPG for compatibility. Adjust the size from 100px to 600px depending on where you'll use the code.
          </p>
          <p>
            Customization options let you change the foreground color (the actual QR pattern) and background color. Just remember: high contrast is essential for scanability. Dark QR on light background works best.
          </p>
          <p>
            The preview updates automatically as you type, so you can see exactly how your QR code will look before downloading. No need to click generate repeatedly.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating restaurant menu QR codes</h3>
            <p className="text-sm text-muted-foreground">
              Put a QR code on tables that links to your digital menu. Customers scan with their phone and instantly see your offerings. Update the menu URL seasonally without reprinting - the QR code stays the same.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sharing Wi-Fi passwords with guests</h3>
            <p className="text-sm text-muted-foreground">
              Create a QR code with your Wi-Fi network name and password. Guests scan it and their phone automatically connects. No more spelling out "it's capital T, underscore, then the number 7..."
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Adding product information to packaging</h3>
            <p className="text-sm text-muted-foreground">
              Small products can't fit detailed instructions. Add a QR code linking to setup videos, ingredient lists, or troubleshooting guides. Customers get full information without cluttering your design.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating contact cards for networking</h3>
            <p className="text-sm text-muted-foreground">
              Encode your vCard contact info in a QR code. Put it on business cards or show it on your phone at events. People scan and instantly have your name, email, phone, and LinkedIn profile.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Setting up event check-in systems</h3>
            <p className="text-sm text-muted-foreground">
              Generate unique QR codes for each attendee's ticket. At the event, scan codes to mark people as arrived. Works for conferences, weddings, or any ticketed gathering.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Linking physical displays to digital content</h3>
            <p className="text-sm text-muted-foreground">
              Museum exhibits, retail displays, or real estate signs can include QR codes. Visitors scan to see videos, additional photos, or detailed specifications without needing to type URLs.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Test before printing.</strong>
              Always scan your QR code with multiple phones (iOS and Android) before mass printing. What looks scannable on screen might not work at small sizes or with certain camera apps.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Size matters for scanning distance.</strong>
              A 100px QR code works on business cards viewed from 6 inches. A 600px code is needed for posters scanned from several feet away. Rule of thumb: 1 inch of QR code per 10 feet of scanning distance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Color contrast is critical.</strong>
              Light QR patterns on dark backgrounds often fail to scan. The camera needs to distinguish the pattern from the background. Black on white is most reliable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">URL length affects complexity.</strong>
              Longer URLs create denser QR codes with more tiny squares. Use a URL shortener for long links - shorter URLs produce simpler, more scannable codes.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For printed materials, always download SVG format. Vector graphics scale to any size without pixelation. PNG is fine for digital use, but SVG ensures crisp prints at any size.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I create a QR code for my Wi-Fi network?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! Use the format: WIFI:T:WPA;S:YourNetworkName;P:YourPassword;; The T is security type (WPA, WEP, or nopass), S is network name, P is password. Phones will automatically prompt to join when scanned.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between PNG, SVG, and JPG?</h3>
            <p className="text-sm text-muted-foreground">
              PNG has transparent background and sharp edges - best for digital use. SVG is vector (infinitely scalable) - best for print. JPG is universally compatible but loses quality at large sizes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How small can I print a QR code?</h3>
            <p className="text-sm text-muted-foreground">
              Minimum recommended size is 0.8 x 0.8 inches (2 x 2 cm) for close-up scanning. Business card QR codes work at this size. For scanning from distance, go much larger - 3+ inches for posters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add my logo to the QR code?</h3>
            <p className="text-sm text-muted-foreground">
              This basic generator doesn't support logo embedding. For logo QR codes, use a tool that supports error correction level H (30% redundancy) so the logo doesn't break scannability.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do QR codes expire?</h3>
            <p className="text-sm text-muted-foreground">
              The QR code itself never expires - it's just a visual representation of data. But if it links to a URL and that page goes down, the QR code becomes useless. The code doesn't expire; the content might.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why won't my QR code scan?</h3>
            <p className="text-sm text-muted-foreground">
              Common issues: low contrast colors, too small when printed, damaged/cut off edges, or the encoded URL is malformed. Test with multiple phone cameras and ensure high contrast between foreground and background.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I track how many people scan my QR code?</h3>
            <p className="text-sm text-muted-foreground">
              Not directly - QR codes are just data. But if you link to a URL you control, use UTM parameters or a link shortener with analytics. Then track clicks, which approximate scans.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
