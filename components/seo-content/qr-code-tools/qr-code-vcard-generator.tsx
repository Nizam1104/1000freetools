import React from "react"

export default function QrCodeVcardGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your contact information: first and last name, organization, job title, phone number, email, website, and address. Only name is required, but more details make the contact more useful.
          </p>
          <p>
            The tool generates a vCard 3.0 format contact card encoded in the QR code. This standard format is recognized by all smartphones and contact management systems.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What happens when scanned:</p>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Device reads the vCard data from the QR code</li>
              <li>Phone prompts to create a new contact</li>
              <li>All fields populate automatically</li>
              <li>User saves the contact to their address book</li>
            </ol>
          </div>
          <p>
            The QR code generates as you enter details. Preview shows your contact summary. Download for business cards, email signatures, or networking materials.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Modern business cards</h3>
            <p className="text-sm text-muted-foreground">
              Add QR codes to traditional business cards. People scan to save your contact instantly. No more manual data entry or typos in phone numbers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Conference networking</h3>
            <p className="text-sm text-muted-foreground">
              Badge holders with QR codes for easy contact sharing. Scan each other's codes instead of fumbling with physical cards. More connections made faster.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Email signature contact sharing</h3>
            <p className="text-sm text-muted-foreground">
              Include QR code in email signatures. Recipients can save your contact on mobile devices. Makes follow-up communication effortless.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Real estate agent marketing</h3>
            <p className="text-sm text-muted-foreground">
              Property signs with agent contact QR codes. Potential buyers save your info while viewing the property. Capture leads at the moment of interest.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Speaker and presenter bios</h3>
            <p className="text-sm text-muted-foreground">
              Event programs with speaker contact QR codes. Attendees connect with presenters they want to follow up with. Builds professional networks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Service provider directories</h3>
            <p className="text-sm text-muted-foreground">
              Contractors, consultants, and freelancers share contact info. Clients save multiple providers for future needs. Always top-of-mind when work arises.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Contact info is publicly visible.</strong>
              Anyone who scans gets all your details. Don't include personal information you want to keep private. Use business contact details.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some fields may not transfer.</strong>
              Different phones handle vCard fields differently. Core fields (name, phone, email) always work. Custom fields may be ignored.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Profile photos aren't supported.</strong>
              Standard vCard QR codes don't include images. Some apps support photo vCards, but compatibility varies. Keep it simple for best results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Updates require new QR codes.</strong>
              If your phone number changes, you need new QR codes everywhere. Consider using a digital business card service for updatable contacts.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Create separate QR codes for different contexts. One for personal contacts, one for business. Use a Google Voice number for public-facing codes.
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
              Yes, vCard format is universally supported. iPhones, Android devices, and even feature phones recognize vCard QR codes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I include social media profiles?</h3>
            <p className="text-sm text-muted-foreground">
              Add social URLs in the website field or description. Some vCard readers recognize social profile fields, but URL is most compatible.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many contacts can one QR code hold?</h3>
            <p className="text-sm text-muted-foreground">
              One QR code = one contact. For multiple contacts, create separate codes or link to a digital contact page with multiple options.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can people still call if they don't scan?</h3>
            <p className="text-sm text-muted-foreground">
              QR codes are scannable only. Always include your phone number in readable text too. The QR code is for convenience, not replacement.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between vCard and meCard?</h3>
            <p className="text-sm text-muted-foreground">
              vCard is more widely supported. meCard is simpler but less compatible. This tool uses vCard 3.0 for maximum device support.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use this or a digital business card?</h3>
            <p className="text-sm text-muted-foreground">
              vCard QR codes work offline and universally. Digital business cards offer analytics and updates. Use vCard for simplicity, digital for features.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I test the QR code?</h3>
            <p className="text-sm text-muted-foreground">
              Scan it with your phone. Verify all fields populate correctly. Save the contact and check it appears in your address book properly.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
