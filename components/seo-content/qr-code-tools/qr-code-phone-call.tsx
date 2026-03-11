import React from "react"

export default function QrCodePhoneCallSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter the phone number you want people to call. Include country code for international numbers (+1 for US, +44 for UK, etc.). The tool creates a tel: link encoded in the QR code.
          </p>
          <p>
            When scanned, the device recognizes the telephone link and prompts to place a call. Users confirm and the call connects immediately. No need to manually dial.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What happens when scanned:</p>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Device reads the tel: link from the QR code</li>
              <li>Phone app opens with number pre-dialed</li>
              <li>User sees the number and confirms</li>
              <li>Call connects when user taps call button</li>
            </ol>
          </div>
          <p>
            The QR code generates instantly. Preview shows the encoded number. Download for business cards, advertisements, or customer service materials.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Business card instant contact</h3>
            <p className="text-sm text-muted-foreground">
              Add QR codes that dial your number directly. Networking contacts can call immediately while you're still talking. Capture momentum in conversations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Customer service hotlines</h3>
            <p className="text-sm text-muted-foreground">
              Product packaging with "Need help? Scan to call support." Customers reach you instantly when issues arise. Reduces frustration and negative reviews.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Emergency contact information</h3>
            <p className="text-sm text-muted-foreground">
              Equipment or facilities with emergency contact QR codes. First responders scan to call immediately. Critical seconds saved in urgent situations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Restaurant reservation lines</h3>
            <p className="text-sm text-muted-foreground">
              Menus or window displays with "Call to reserve" QR codes. Hungry customers connect instantly. Captures spontaneous dining decisions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Real estate showing requests</h3>
            <p className="text-sm text-muted-foreground">
              Yard signs with "Call for showing" QR codes. Drive-by prospects contact agents immediately. Hot leads don't cool down while searching for numbers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Taxi and ride service contact</h3>
            <p className="text-sm text-muted-foreground">
              Taxi stands or ride share pickup points with dispatch QR codes. Passengers call for rides instantly. Faster pickups, happier customers.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Call confirmation is required.</strong>
              Modern phones always ask before placing calls. This prevents accidental calls from rogue QR codes. Users must confirm before connecting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Data connection not required.</strong>
              Phone calls use cellular voice network, not data. QR codes work even in areas without internet. Only cellular signal is needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">International calls may incur charges.</strong>
              Scanners calling international numbers pay roaming or international rates. Consider local numbers for different regions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Tablets and WiFi-only devices can't call.</strong>
              iPads and WiFi tablets may open FaceTime Audio or do nothing. The QR code works best on cellular-enabled phones.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Add context near the QR code. "Scan to call our sales team" or "Emergency contact - scan to call" helps users understand what will happen.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this work on all phones?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, tel: links are universally supported. Any smartphone with a camera and phone capability will recognize and handle these QR codes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I track calls from the QR code?</h3>
            <p className="text-sm text-muted-foreground">
              Not directly. Use a dedicated tracking number (like Google Voice or call tracking services) to measure QR code call volume.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about toll-free numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Toll-free numbers work perfectly. Include the full number with country code. Callers won't be charged for scanning and calling.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I change the number later?</h3>
            <p className="text-sm text-muted-foreground">
              No, the number is encoded in the QR pattern. Changing requires new QR codes everywhere. Plan your number strategy before printing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this work from printed materials?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, printed QR codes work perfectly. Ensure good print quality and sufficient size (at least 1x1 inch) for reliable scanning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add extension numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Add pauses using commas: +1-555-123-4567,,123. Each comma adds a 2-second pause. Not all phones support this feature reliably.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use this or click-to-call links?</h3>
            <p className="text-sm text-muted-foreground">
              Use both. QR codes for print materials, click-to-call links for digital. Same functionality, different mediums.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
