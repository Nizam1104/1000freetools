import React from "react"

export default function QrCodeForWhatsappSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter the WhatsApp phone number with country code (+1 for US, +44 for UK, +91 for India, etc.). The number must be registered on WhatsApp for the chat to work properly.
          </p>
          <p>
            Optionally add a pre-filled message. When scanned, WhatsApp opens with a chat to that number and your message already typed. Users just tap send.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What happens when scanned:</p>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Device reads the WhatsApp URL from the QR code</li>
              <li>WhatsApp app opens (or prompts to install)</li>
              <li>Chat window appears with number and message</li>
              <li>User sends the message to start conversation</li>
            </ol>
          </div>
          <p>
            The QR code generates as you type. Preview shows the encoded details. Download for marketing materials, customer support, or business communications.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">E-commerce customer support</h3>
            <p className="text-sm text-muted-foreground">
              Product pages with "Chat with us on WhatsApp" QR codes. Customers get instant answers before purchasing. Higher conversion rates, fewer abandoned carts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Restaurant order inquiries</h3>
            <p className="text-sm text-muted-foreground">
              Menus with WhatsApp ordering QR codes. Customers message their orders directly. Streamlines takeout process, reduces phone call volume.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Real estate property inquiries</h3>
            <p className="text-sm text-muted-foreground">
              Listing signs with "Chat about this property" QR codes. Prospects message agents instantly. Qualifies leads before scheduling viewings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Service appointment booking</h3>
            <p className="text-sm text-muted-foreground">
              Salons, clinics, and repair shops share booking QR codes. Clients message to schedule appointments. More convenient than phone calls for both parties.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">International business communication</h3>
            <p className="text-sm text-muted-foreground">
              Global companies use WhatsApp for international clients. Free messaging across borders. QR codes make connecting effortless for overseas customers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Event organizer communication</h3>
            <p className="text-sm text-muted-foreground">
              Event tickets with organizer WhatsApp QR codes. Attendees ask questions or report issues. Direct line improves event experience.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Requires WhatsApp installed.</strong>
              Scanners need WhatsApp on their device. If not installed, they're prompted to download. Consider your audience's app usage before deploying.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Business accounts have more features.</strong>
              WhatsApp Business accounts show business profiles, hours, and auto-replies. Upgrade for professional customer communication.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Message is draft, not auto-sent.</strong>
              Users must tap send themselves. This respects their choice to modify or cancel. Don't expect automatic message delivery.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Privacy settings apply.</strong>
              Users with strict privacy settings may not see your profile. Business accounts have more visibility. Respect user privacy preferences.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Use WhatsApp Business for commercial use. Set up quick replies for common questions. Create greeting messages for first-time contacts.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do both parties need WhatsApp?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, WhatsApp only works between WhatsApp users. The receiving number must have WhatsApp. The scanner needs the app to send messages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for group chats?</h3>
            <p className="text-sm text-muted-foreground">
              This creates individual chat links. For groups, you need a group invite link. Generate that in WhatsApp and create a QR code from the URL.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this work on desktop?</h3>
            <p className="text-sm text-muted-foreground">
              Desktop WhatsApp can handle these links. Scanners on computers will open WhatsApp Web or the desktop app if installed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I track messages from the QR code?</h3>
            <p className="text-sm text-muted-foreground">
              WhatsApp doesn't provide QR code analytics. Use unique pre-filled messages per location to track where conversations originate.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if the number isn't on WhatsApp?</h3>
            <p className="text-sm text-muted-foreground">
              The chat won't open properly. Users see an error. Always verify the number is registered on WhatsApp before creating QR codes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I change the number later?</h3>
            <p className="text-sm text-muted-foreground">
              No, the number is encoded in the QR pattern. Changing requires new QR codes. Use a consistent business number for long-term materials.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this different from WhatsApp's own QR codes?</h3>
            <p className="text-sm text-muted-foreground">
              WhatsApp generates personal profile QR codes. This tool creates chat links to any number. Different purposes - profile sharing vs. initiating chats.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
