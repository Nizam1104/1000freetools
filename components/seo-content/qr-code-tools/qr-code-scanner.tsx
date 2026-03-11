import React from "react"

export default function QrCodeScannerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Choose between uploading a QR code image or using your device camera. For image upload, select any image file containing a QR code - screenshots, photos, or downloaded images all work.
          </p>
          <p>
            For camera scanning, grant camera permission when prompted. Position the QR code within the frame. The scanner automatically detects and decodes when the code is clearly visible.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Supported QR code content:</p>
            <ul className="text-sm space-y-1">
              <li><strong>URLs:</strong> Website links that open in browser</li>
              <li><strong>Text:</strong> Plain text messages</li>
              <li><strong>Email:</strong> Email addresses and mailto links</li>
              <li><strong>Phone:</strong> Phone numbers for calling</li>
              <li><strong>vCard:</strong> Contact information</li>
              <li><strong>WiFi:</strong> Network credentials</li>
              <li><strong>SMS:</strong> Text message content</li>
            </ul>
          </div>
          <p>
            Once decoded, the content displays with its detected type. Copy the result to clipboard or click to open URLs directly. Scan another code anytime.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Checking QR codes before sharing</h3>
            <p className="text-sm text-muted-foreground">
              Created a QR code for your business? Scan it to verify it works correctly before printing thousands of copies. Catch typos and broken links early.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Accessing QR content on desktop</h3>
            <p className="text-sm text-muted-foreground">
              Found a QR code in an email or document on your computer? Upload the image to scan it without pulling out your phone. Faster workflow.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Investigating suspicious QR codes</h3>
            <p className="text-sm text-muted-foreground">
              Received a QR code from an unknown source? Scan it safely to see the destination before visiting. Verify it's not a phishing attempt.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Extracting contact information</h3>
            <p className="text-sm text-muted-foreground">
              Someone shared a vCard QR code? Scan to extract the contact details. Copy the information or save it to your contacts manually.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing QR code campaigns</h3>
            <p className="text-sm text-muted-foreground">
              Marketing team launched a QR campaign? Test all the codes to ensure they point to the right landing pages. Quality assurance before launch.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning from QR code examples</h3>
            <p className="text-sm text-muted-foreground">
              Studying QR code implementations? Scan various codes to see how different businesses use them. Gather inspiration for your own projects.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Camera requires browser permission.</strong>
              Your browser will ask for camera access. This is required for live scanning. The camera feed stays in your browser - no video is recorded or transmitted.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Image quality affects scanning.</strong>
              Blurry, dark, or angled QR codes may not scan. Ensure good lighting and a clear, straight image for best results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some QR codes require apps.</strong>
              Special QR codes for apps like WhatsApp or specific services may need those apps installed to work properly after scanning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Damaged codes may not scan.</strong>
              Scratched, torn, or partially obscured QR codes might not decode. The error correction has limits.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Security tip:</strong> Never scan QR codes from untrusted sources without checking the destination first. This tool shows you the URL before you visit it.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this scanner free to use?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, completely free with no limits. Scan as many QR codes as you need. No registration or download required.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it work on mobile devices?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, works on any device with a camera and modern browser. iOS Safari, Android Chrome, and desktop browsers all supported.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What image formats are supported?</h3>
            <p className="text-sm text-muted-foreground">
              Common formats like JPG, PNG, GIF, and WebP work. Most screenshots and photos will scan successfully.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can it scan multiple QR codes at once?</h3>
            <p className="text-sm text-muted-foreground">
              This scanner decodes one QR code at a time. For images with multiple codes, it will find the most prominent one.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data private?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, scanning happens in your browser. Images aren't uploaded to servers. Your scanned content stays on your device.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why isn't my QR code scanning?</h3>
            <p className="text-sm text-muted-foreground">
              Check that the code is clear, well-lit, and not damaged. Try adjusting distance or angle. For images, ensure the QR code is fully visible.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I scan QR codes from videos?</h3>
            <p className="text-sm text-muted-foreground">
              Take a screenshot of the video frame with the QR code, then upload the image. Live video scanning works through the camera option.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
