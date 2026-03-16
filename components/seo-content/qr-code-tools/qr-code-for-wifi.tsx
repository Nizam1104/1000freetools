import React from "react"

export default function QrCodeForWifiSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your WiFi network name (SSID) - this is required. Add the password if your network is secured. Select the security type: WPA/WPA2 for most modern networks, WEP for older systems, or Open Network for public WiFi.
          </p>
          <p>
            If your network is hidden (not broadcasting its name), check the hidden network option. This tells devices to actively search for your network rather than waiting for it to appear.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What happens when scanned:</p>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Device reads the WiFi credentials from the QR code</li>
              <li>iOS shows a "Join Network" notification</li>
              <li>Android prompts to connect to the network</li>
              <li>User confirms and connects automatically</li>
            </ol>
          </div>
          <p>
            The QR code generates as you type. Preview shows your network details. Download and print for guest areas, offices, or rental properties.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Guest WiFi at home</h3>
            <p className="text-sm text-muted-foreground">
              Frame the QR code in your entryway. Guests scan to connect instantly. No more spelling out complicated passwords. Looks professional too.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Coffee shop customer WiFi</h3>
            <p className="text-sm text-muted-foreground">
              Display on tables or at the counter. Customers connect while waiting for orders. Reduces staff time spent sharing passwords repeatedly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Office visitor access</h3>
            <p className="text-sm text-muted-foreground">
              Reception area display for visitors. They connect immediately upon arrival. Keeps your main network secure while providing guest access.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Vacation rental amenities</h3>
            <p className="text-sm text-muted-foreground">
              Include in the welcome book or frame on the wall. Guests connect without calling you for the password. Better reviews, fewer messages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Event venue connectivity</h3>
            <p className="text-sm text-muted-foreground">
              Conference centers and wedding venues provide WiFi access. Attendees scan to connect. Include on event programs or signage.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Co-working space member access</h3>
            <p className="text-sm text-muted-foreground">
              New members scan to connect on day one. Multiple locations can have unique codes. Simplifies onboarding for hot-desking members.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">iOS requires iOS 11 or later.</strong>
              WiFi QR code support was added in iOS 11. Older iPhones won't recognize the code. Most devices are updated, but worth noting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Password is visible in the code.</strong>
              Anyone who scans can see your password. Use a guest network with limited access. Don't put this on public-facing materials for your main network.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Hidden networks are harder to join.</strong>
              Some devices struggle with hidden network QR codes. Consider broadcasting your SSID if connection issues arise.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Enterprise networks need different setup.</strong>
              WPA2-Enterprise with username/password isn't supported by standard WiFi QR codes. Use for simple PSK networks only.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Security tip:</strong> Create a separate guest network for QR codes. Limit bandwidth and block access to your local devices. Change the password periodically.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do I need to include the password?</h3>
            <p className="text-sm text-muted-foreground">
              For secured networks, yes. Open networks (no password) work without it. Select "Open Network" as the security type for password-free WiFi.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this work on Android and iPhone?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, both platforms support WiFi QR codes. Android added support earlier, iOS joined in iOS 11. Most modern devices work perfectly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if someone shares the QR code?</h3>
            <p className="text-sm text-muted-foreground">
              Anyone with the image can connect. Use a guest network with rate limiting. Change passwords periodically if concerned about unauthorized access.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I update the password later?</h3>
            <p className="text-sm text-muted-foreground">
              No, the password is encoded in the QR pattern. Changing it requires generating and redistributing new QR codes everywhere.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why isn't my phone connecting?</h3>
            <p className="text-sm text-muted-foreground">
              Check that WiFi is enabled. Ensure you're scanning from the camera app. Some phones require a QR scanner app. Verify the network is in range.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add a logo to the QR code?</h3>
            <p className="text-sm text-muted-foreground">
              This tool generates standard codes. For branded QR codes with logos, use a design tool afterward. Keep the center clear for reliable scanning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I laminate the printed code?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, especially in high-traffic areas. Lamination protects from wear and moisture. Use matte finish to reduce glare that interferes with scanning.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
