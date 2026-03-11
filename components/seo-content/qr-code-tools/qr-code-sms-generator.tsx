import React from "react"

export default function QrCodeSmsGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter the phone number that should receive the text messages. Include country code for international numbers (e.g., +1 for US, +44 for UK). This is the number people will text when they scan.
          </p>
          <p>
            Optionally add a pre-filled message. When scanned, the messaging app opens with this text already typed. Users just tap send. Great for standardized responses or keywords.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What happens when scanned:</p>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Device reads the SMSTO link from the QR code</li>
              <li>Default messaging app opens</li>
              <li>New message appears with number and text pre-filled</li>
              <li>User reviews and sends the message</li>
            </ol>
          </div>
          <p>
            The QR code generates as you type. Preview shows the encoded details. Download for marketing campaigns, customer service, or event management.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">SMS marketing opt-in campaigns</h3>
            <p className="text-sm text-muted-foreground">
              "Text JOIN to 12345" becomes a scannable QR code. Event attendees scan to subscribe. Much faster than manual typing. Higher opt-in rates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Customer support quick contact</h3>
            <p className="text-sm text-muted-foreground">
              Product packaging with "Need help? Scan to text support." Pre-filled message includes product info. Support team knows exactly what customers need.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Event RSVP collection</h3>
            <p className="text-sm text-muted-foreground">
              Invitations with "RSVP YES" QR codes. Guests scan to confirm attendance. Automatic tracking via incoming messages. No more phone tag.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Contest and giveaway entries</h3>
            <p className="text-sm text-muted-foreground">
              "Scan to enter our giveaway" with pre-filled keyword. Participants text to enter automatically. Easy to track entries and select winners.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Appointment reminder confirmations</h3>
            <p className="text-sm text-muted-foreground">
              Waiting room signs: "Running late? Text to reschedule." Patients can quickly notify the office. Reduces no-shows and fills cancelled slots.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Lead generation from print ads</h3>
            <p className="text-sm text-muted-foreground">
              Magazine ads with "Text INFO for details" QR codes. Interested readers scan for instant connection. Sales team follows up with warm leads.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Standard messaging rates apply.</strong>
              Users pay their normal SMS rates. International scanners may incur roaming charges. Mention this if your audience is global.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Message is draft, not auto-sent.</strong>
              Users must tap send themselves. This is actually good - they can customize the message. Respect their choice to modify or cancel.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Short codes require carrier approval.</strong>
              5-6 digit numbers need registration. Regular phone numbers work immediately. Use short codes for high-volume campaigns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some phones handle SMSTO differently.</strong>
              iOS and Android may format the message slightly differently. Test on both platforms. Most modern phones handle it correctly.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Compliance tip:</strong> Include opt-out instructions in your pre-filled message. "Text JOIN to 12345. Reply STOP to unsubscribe." Stay compliant with regulations.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do I need a special phone number?</h3>
            <p className="text-sm text-muted-foreground">
              Any phone number works. For business use, consider a dedicated SMS-enabled number. Services like Twilio provide SMS API numbers for automation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I send automated responses?</h3>
            <p className="text-sm text-muted-foreground">
              This tool just creates the QR code. For auto-responses, you need an SMS service like Twilio, TextMagic, or similar platforms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this work internationally?</h3>
            <p className="text-sm text-muted-foreground">
              The QR code works worldwide, but the phone number must be able to receive international texts. Consider regional numbers for global campaigns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How long can the message be?</h3>
            <p className="text-sm text-muted-foreground">
              Standard SMS is 160 characters. Longer messages may split into multiple texts. Keep pre-filled messages concise for best results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I track who scans the code?</h3>
            <p className="text-sm text-muted-foreground">
              You'll see incoming messages from scanners. For detailed analytics, use a dedicated SMS marketing platform with tracking features.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between SMS and WhatsApp?</h3>
            <p className="text-sm text-muted-foreground">
              SMS works on all phones but may cost money. WhatsApp is free but requires the app. Use SMS for broad reach, WhatsApp for app users.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I include instructions?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, add context near the QR code. "Scan to text us" or "Quick contact via SMS" helps users understand what will happen.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
