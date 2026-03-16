import React from "react"

export default function QrCodeEmailGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter the email address you want people to contact. This is required - the QR code won't work without a valid recipient address.
          </p>
          <p>
            Optionally add a subject line and message body. When someone scans the code, their email app opens with these fields pre-filled. They just hit send.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What happens when scanned:</p>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Device detects the mailto link in the QR code</li>
              <li>Default email app opens (Gmail, Outlook, Apple Mail, etc.)</li>
              <li>New message window appears with pre-filled fields</li>
              <li>User reviews and sends the email</li>
            </ol>
          </div>
          <p>
            The QR code generates automatically as you type. Preview shows how it will look. Download the PNG for printing or digital use.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Customer support contact points</h3>
            <p className="text-sm text-muted-foreground">
              Place QR codes on product packaging linking to support. Customers scan when they need help. Pre-filled subject helps route tickets correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Event feedback collection</h3>
            <p className="text-sm text-muted-foreground">
              Display at conference exits or restaurant tables. "Scan to share feedback" with pre-filled subject. Makes it easy for attendees to respond.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Business card networking</h3>
            <p className="text-sm text-muted-foreground">
              Add a QR code that drafts an email to you. "Let's connect" with pre-filled subject. Removes friction from follow-up conversations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Newsletter signup prompts</h3>
            <p className="text-sm text-muted-foreground">
              Create a code that emails your newsletter signup address. Subject line "Subscribe" triggers automated addition. Simple opt-in method.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sales inquiry generation</h3>
            <p className="text-sm text-muted-foreground">
              Marketing materials with "Scan for pricing" QR codes. Pre-filled message helps qualify leads. Sales team knows exactly what they need.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Partnership outreach</h3>
            <p className="text-sm text-muted-foreground">
              Pitch decks with QR codes to your partnership email. Investors or partners can reach out immediately. Capture interest while it's hot.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Requires an email app.</strong>
              The QR code opens the device's default email client. Devices without configured email apps may not handle the link properly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Message is draft, not sent.</strong>
              Scanning creates a draft email. The user must still review and hit send. This is actually good - they can customize the message.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Subject lines should be clear.</strong>
              Vague subjects get ignored. "Product Inquiry - Model X100" performs better than "Hello". Be specific about the purpose.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Keep messages short.</strong>
              Long pre-filled messages may get truncated in some email clients. Use brief prompts that users can expand on.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Use UTM parameters in your subject line for tracking. "Interested - Source: Trade Show Booth" helps attribute leads.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do I need to enter all fields?</h3>
            <p className="text-sm text-muted-foreground">
              Only the email address is required. Subject and message are optional. Empty fields just open a blank compose window to your address.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this work on all phones?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, mailto links are universally supported. iPhone, Android, tablets - any device with email capability will handle these QR codes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I track who scans the code?</h3>
            <p className="text-sm text-muted-foreground">
              Not directly. Email QR codes don't have built-in analytics. Use unique subject lines per location to track where scans come from.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if someone doesn't have email set up?</h3>
            <p className="text-sm text-muted-foreground">
              They'll be prompted to set up an email account. Most smartphones have this configured already. Consider a web form as backup.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for multiple recipients?</h3>
            <p className="text-sm text-muted-foreground">
              Enter comma-separated addresses. However, this exposes all emails to recipients. For multiple recipients, use a mailing list address instead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I test the QR code?</h3>
            <p className="text-sm text-muted-foreground">
              Scan it with your phone before distributing. Verify the email, subject, and message all appear correctly. Test on both iPhone and Android.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I change the email later?</h3>
            <p className="text-sm text-muted-foreground">
              No, the email is encoded in the QR code pattern. To change it, generate a new QR code and replace the old one everywhere it's used.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
