import React from "react"

export default function QrCodeErrorCorrectionSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the QR Code Error Correction Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter the content for your QR code - URL, text, contact info, or any data. The error correction applies to whatever you encode.
          </p>
          <p>
            Select an error correction level: L (Low), M (Medium), Q (Quartile), or H (High). Each level provides different damage resistance.
          </p>
          <p>
            Level L recovers from 7% damage - smallest code but least protection. Level H recovers from 30% damage - largest code but most protection.
          </p>
          <p>
            The tool shows how much of the code can be damaged while still scanning. Higher levels add more redundancy data.
          </p>
          <p>
            Generate the QR code with your selected error correction. Download and use based on your environment's needs.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Outdoor signage</h3>
            <p className="text-sm text-muted-foreground">
              Weather and UV exposure damage codes. Use High error correction for billboards and outdoor displays. Ensures long-term scannability.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Product labels with logos</h3>
            <p className="text-sm text-muted-foreground">
              Logos cover part of the QR code. High error correction allows center logos. Code still scans with logo obstruction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Industrial asset tags</h3>
            <p className="text-sm text-muted-foreground">
              Factory environments damage labels. Oil, chemicals, and abrasion affect codes. High correction ensures reliability.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Wearable event badges</h3>
            <p className="text-sm text-muted-foreground">
              Badges get bent and worn. Medium or High correction handles wear. Ensures networking features work throughout event.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Food packaging</h3>
            <p className="text-sm text-muted-foreground">
              Condensation and handling affect codes. Higher correction handles moisture damage. Important for recall and traceability.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Print magazine ads</h3>
            <p className="text-sm text-muted-foreground">
              Magazines get folded and creased. Medium correction handles typical wear. Ensures ad campaigns remain scannable.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Higher correction = larger code.</strong>
              More redundancy means more modules. Level H codes are noticeably larger than Level L for the same data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Error correction uses Reed-Solomon algorithm.</strong>
              This mathematical approach adds redundant data. Damaged sections can be reconstructed from remaining data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Corner damage is most critical.</strong>
              Position detection patterns (corner squares) must remain readable. Error correction can't recover if these are destroyed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Medium is good for most uses.</strong>
              Level M (15%) handles typical wear and tear. Upgrade to Q or H for harsh environments or logo overlay.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For logo QR codes, use Level H and keep logo under 30% of code area. Test extensively with different phones.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does error correction actually do?</h3>
            <p className="text-sm text-muted-foreground">
              It adds redundant data that allows reconstruction if part of the code is damaged. Like backup data that rebuilds missing pieces.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How much of the code can be damaged?</h3>
            <p className="text-sm text-muted-foreground">
              Level L: 7%, Level M: 15%, Level Q: 25%, Level H: 30%. This is approximate - damage location matters too.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does error correction slow down scanning?</h3>
            <p className="text-sm text-muted-foreground">
              Negligibly. Modern phones decode instantly. Error correction happens in milliseconds. Users won't notice any difference.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I change error correction after printing?</h3>
            <p className="text-sm text-muted-foreground">
              No, error correction is encoded in the pattern. To change it, you need to generate and print a new QR code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What level should I use for business cards?</h3>
            <p className="text-sm text-muted-foreground">
              Medium (M) is sufficient. Business cards get handled but not abused. Balance code size with protection.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does data length affect error correction?</h3>
            <p className="text-sm text-muted-foreground">
              No, error correction percentage is independent of data. But longer data creates larger codes regardless of correction level.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can error correction fix dirty codes?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, within limits. Dirt, smudges, and minor scratches are treated as damage. Wipe codes clean for best results.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
