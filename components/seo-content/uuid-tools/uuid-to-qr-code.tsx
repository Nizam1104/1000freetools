import React from "react"

export default function UuidToQrCodeSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Convert UUIDs into scannable QR codes. Enter a UUID string, and the tool generates a QR code that encodes the UUID. Scan the code with any smartphone or QR reader to retrieve the UUID.
          </p>
          <p>
            QR codes provide a convenient way to transfer UUIDs between devices without typing. Useful for physical asset tracking, event check-ins, and authentication tokens.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example usage:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Input UUID:
f47ac10b-58cc-4372-a567-0e02b2c3d479

Generated QR Code:
[QR code image displaying]

Scan result:
f47ac10b-58cc-4372-a567-0e02b2c3d479

Options:
- Size: 200x200 to 1000x1000 pixels
- Error correction: L, M, Q, H
- Download: PNG or SVG format
- Color: customize foreground/background</pre>
          </div>
          <p>
            The QR code uses error correction to remain scannable even if partially damaged. Higher error correction levels add redundancy but increase QR code complexity.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Asset tracking and inventory</h3>
            <p className="text-sm text-muted-foreground">
              Print QR codes with UUIDs on equipment labels. Scan with a phone to instantly get the asset ID. No manual entry errors, faster inventory audits.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Event ticketing and check-in</h3>
            <p className="text-sm text-muted-foreground">
              Each ticket has a unique UUID QR code. Attendees scan at entry, staff verify the UUID against the registration database. Prevents ticket fraud and speeds up entry.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Product authentication</h3>
            <p className="text-sm text-muted-foreground">
              Luxury goods include QR codes with unique UUIDs. Customers scan to verify authenticity on the manufacturer's website. Counterfeit products won't have valid UUIDs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">WiFi network access</h3>
            <p className="text-sm text-muted-foreground">
              Generate UUIDs for guest network sessions. Display as QR codes - guests scan to connect. The UUID tracks their session for bandwidth limits or time restrictions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Two-factor authentication setup</h3>
            <p className="text-sm text-muted-foreground">
              Some 2FA systems use UUID-based provisioning. Display the UUID as a QR code for users to scan with their authenticator app. Faster and more accurate than manual entry.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Document tracking and chain of custody</h3>
            <p className="text-sm text-muted-foreground">
              Legal or medical documents get UUID QR codes. Each scan logs who accessed the document and when. Maintains audit trail for compliance requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">QR code size affects scannability.</strong>
              Larger QR codes scan from farther away. For printed labels, 300x300 pixels minimum. For screen display, 200x200 works. For distance scanning, use 500x500 or larger.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Error correction levels trade capacity for durability.</strong>
              Level L (7% recovery) is smallest. Level H (30% recovery) survives more damage. For outdoor labels or harsh environments, use higher error correction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UUID length fits easily in QR codes.</strong>
              A UUID is 36 characters. QR codes can hold thousands of characters. Even with high error correction, a UUID QR code remains small and scannable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Print quality matters for physical labels.</strong>
              Use high-resolution output (SVG or 300+ DPI PNG). Blurry or pixelated QR codes may not scan. Test print before mass production.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Always test QR codes before deployment. Scan with multiple devices (iOS, Android) and apps. What scans on your phone might not scan on others.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What QR code reader should I use?</h3>
            <p className="text-sm text-muted-foreground">
              Modern smartphones have built-in QR readers in the camera app. iOS and Android both support this. Dedicated apps work too, but aren't usually necessary.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize the QR code colors?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but maintain contrast. Dark foreground on light background works best. Avoid light colors on white. Red on white may not scan with some cameras.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How small can I print the QR code?</h3>
            <p className="text-sm text-muted-foreground">
              Minimum 2x2 cm (about 1 inch) for reliable scanning. Smaller codes require closer scanning distance. For distance scanning, make them larger.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What file format should I use for printing?</h3>
            <p className="text-sm text-muted-foreground">
              SVG is best for printing - infinitely scalable without quality loss. PNG at 300+ DPI works too. Avoid JPEG as compression artifacts can interfere with scanning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can QR codes be damaged and still work?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, QR codes have built-in error correction. Level H can recover from 30% damage. Scratches, dirt, or partial obstruction won't prevent scanning if error correction is sufficient.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I verify the QR code works?</h3>
            <p className="text-sm text-muted-foreground">
              Scan it with your phone before using. The scanned result should exactly match the input UUID. Test with multiple devices if the QR code will be widely distributed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add a logo to the QR code?</h3>
            <p className="text-sm text-muted-foreground">
              Some QR generators allow logos in the center. This reduces data capacity but UUIDs are short enough to accommodate it. Ensure the logo doesn't cover critical positioning patterns.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
