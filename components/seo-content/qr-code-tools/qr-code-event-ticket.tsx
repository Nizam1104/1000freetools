import React from "react"

export default function QrCodeEventTicketSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the QR Code Event Ticket Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your event name, date, time, and venue. This information appears on the ticket and is encoded in the QR code.
          </p>
          <p>
            Select ticket type: General Admission, VIP, Premium, Student, or Early Bird. This helps with access control and seating.
          </p>
          <p>
            Add attendee name for personalized tickets. Generate unique ticket numbers for tracking and validation.
          </p>
          <p>
            The QR code contains all ticket information. Event staff scan to verify authenticity and check in attendees.
          </p>
          <p>
            Download tickets as SVG files. Email to attendees or print for physical distribution.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Conference registration</h3>
            <p className="text-sm text-muted-foreground">
              Digital tickets with QR codes for check-in. Track attendance by session. Streamline registration process.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Concert and festival entry</h3>
            <p className="text-sm text-muted-foreground">
              E-tickets reduce fraud. Quick scanning at gates. Multiple entry points stay synchronized.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Wedding invitations</h3>
            <p className="text-sm text-muted-foreground">
              Elegant digital invitations with RSVP tracking. Guests scan to confirm attendance. Modern wedding planning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Workshop and class booking</h3>
            <p className="text-sm text-muted-foreground">
              Students receive QR tickets after booking. Scan at class for attendance. Automated capacity management.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Corporate event management</h3>
            <p className="text-sm text-muted-foreground">
              Employee event tickets with department tracking. Manage headcount. Streamline check-in.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Charity gala admissions</h3>
            <p className="text-sm text-muted-foreground">
              Track donor attendance and ticket tiers. VIP vs. general admission. Silent auction integration.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Unique ticket numbers prevent fraud.</strong>
              Each ticket should have a unique identifier. Duplicate numbers indicate copying. Train staff to check.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Ticket types control access.</strong>
              VIP tickets grant different access than general. Encode ticket type in QR code. Staff know what to check.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Screenshots work for entry.</strong>
              Most attendees screenshot tickets. Ensure QR codes scan from screenshots. Test before event.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Backup entry methods needed.</strong>
              Some phones die or malfunction. Have manual lookup available. Don't deny entry for technical issues.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Security tip:</strong> For high-value events, use dynamic QR codes that refresh. Prevents screenshot sharing. Requires dedicated app.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I verify tickets at the door?</h3>
            <p className="text-sm text-muted-foreground">
              Use any QR scanner app. Scan and verify ticket details match event. Mark as used to prevent re-entry.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can tickets be transferred?</h3>
            <p className="text-sm text-muted-foreground">
              Depends on your policy. If transferable, attendees can share tickets. If not, check ID against ticket name.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if someone's ticket doesn't scan?</h3>
            <p className="text-sm text-muted-foreground">
              Have a manual lookup system. Search by name or ticket number. Don't turn away legitimate attendees.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I prevent ticket copying?</h3>
            <p className="text-sm text-muted-foreground">
              Use unique codes and track scans. First scan wins, subsequent scans flagged. Or use dynamic codes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I include seat numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, add seat info to ticket details. Encode in QR code or display on ticket. Helps with seating management.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I send reminder emails?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, send tickets with event details. Remind attendees day before. Include QR code for easy access.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle refunds?</h3>
            <p className="text-sm text-muted-foreground">
              Invalidate ticket numbers in your system. Mark as refunded. Prevents use after refund.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
