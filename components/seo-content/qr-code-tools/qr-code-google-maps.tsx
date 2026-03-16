import React from "react"

export default function QrCodeGoogleMapsSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter either a street address or GPS coordinates. The address field accepts full addresses like "123 Main St, New York, NY". Coordinates use decimal format like "40.7128, -74.0060".
          </p>
          <p>
            Optionally add a place name for context. This doesn't affect the link but helps you identify the QR code later. "Office", "Store Location", or "Event Venue" work well.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What happens when scanned:</p>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Device reads the Google Maps URL from the QR code</li>
              <li>Maps app opens (Google Maps on Android, Apple Maps or Google Maps on iOS)</li>
              <li>Location appears with pin and details</li>
              <li>User taps "Directions" to get navigation</li>
            </ol>
          </div>
          <p>
            The QR code generates as you type. Preview shows the encoded location. Download for printing on signs, business cards, or marketing materials.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Physical store directions</h3>
            <p className="text-sm text-muted-foreground">
              Add QR codes to your website's contact page. Online visitors can instantly get directions to your store. Reduces "where are you located?" calls.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Event venue navigation</h3>
            <p className="text-sm text-muted-foreground">
              Include on event invitations and confirmations. Attendees scan for one-tap navigation. Especially helpful for venues in complex locations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Real estate property locations</h3>
            <p className="text-sm text-muted-foreground">
              Yard signs with QR codes to the property location. Drive-by prospects can save the location for later. Agents get qualified leads.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Tourist attraction info points</h3>
            <p className="text-sm text-muted-foreground">
              Place at transit stops or parking areas. Tourists scan to navigate to the attraction. Include in visitor guides and hotel concierge materials.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Food truck location sharing</h3>
            <p className="text-sm text-muted-foreground">
              Daily location posts with QR codes. Followers scan to navigate directly. Perfect for businesses that move locations regularly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Multi-location business directories</h3>
            <p className="text-sm text-muted-foreground">
              Create QR codes for each branch location. Customers find their nearest store instantly. Reduces confusion in chains with many locations.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Address accuracy matters.</strong>
              Typos in addresses lead to wrong locations. Double-check before generating. Use the full address including city and postal code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Coordinates are more precise.</strong>
              GPS coordinates always point to exact spots. Use for locations without clear addresses like trailheads, fields, or new construction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Opens default maps app.</strong>
              Users' default maps app will open. Most have Google Maps, but some use Apple Maps or Waze. The URL works in all major mapping services.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Data connection required.</strong>
              Maps need internet to load. The QR code works offline, but navigation requires data. Consider this for areas with poor coverage.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For events, create QR codes to the parking area, not just the venue. Guests will thank you when they find parking easily.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with Apple Maps?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the Google Maps URL opens in whatever maps app the user has set as default. iPhone users can choose Apple Maps or Google Maps.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I link to multiple locations?</h3>
            <p className="text-sm text-muted-foreground">
              Each QR code links to one location. For multiple locations, create separate QR codes labeled for each. Or link to a page listing all locations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I find GPS coordinates?</h3>
            <p className="text-sm text-muted-foreground">
              Right-click on Google Maps at your location and select the coordinates. They copy to clipboard. Format: latitude, longitude (e.g., 40.7128, -74.0060).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this work internationally?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, Google Maps works worldwide. Address formats vary by country, but the QR code will work anywhere Google Maps is available.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I track how many people scan?</h3>
            <p className="text-sm text-muted-foreground">
              Not directly through the QR code. Use a URL shortener with analytics as an intermediate step if you need scan tracking.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if the location doesn't exist?</h3>
            <p className="text-sm text-muted-foreground">
              Google Maps will show the nearest match or an empty area. Always test your QR code before distributing to ensure it points correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use address or coordinates?</h3>
            <p className="text-sm text-muted-foreground">
              Addresses are more user-friendly for verification. Coordinates are more precise. Use addresses for businesses, coordinates for exact spots.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
