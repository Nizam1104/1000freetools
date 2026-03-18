import React from "react"

export default function PhoneNumberFormatterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Phone Number Formatter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool formats phone numbers according to international standards and regional conventions. Enter a phone number, select the country and desired format, and get a properly formatted number ready for display, storage, or dialing.
          </p>
          <p>
            Phone number formatting varies significantly by country. US numbers use (555) 123-4567 format, UK uses 020 7946 0958, and international format uses +1-555-123-4567. This formatter applies the correct rules for each country and format type.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Available format styles:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li><strong>International:</strong> +1 555-123-4567 (with country code)</li>
              <li><strong>National:</strong> (555) 123-4567 (local format)</li>
              <li><strong>E.164:</strong> +15551234567 (standardized for storage)</li>
              <li><strong>RFC 3966:</strong> tel:+1-555-123-4567 (for click-to-call links)</li>
              <li><strong>Digits only:</strong> 15551234567 (for processing)</li>
            </ul>
          </div>
          <p>
            The formatter validates number length for each country, strips unnecessary characters, and applies the appropriate formatting rules. Support for 20+ countries with their specific conventions.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cleaning imported contact data</h3>
            <p className="text-sm text-muted-foreground">
              Imported contacts from various sources have inconsistent formatting. Some have dashes, some have spaces, some include country codes. Standardize everything to one format for consistency.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing numbers for SMS APIs</h3>
            <p className="text-sm text-muted-foreground">
              SMS services like Twilio require E.164 format (+15551234567). Format your numbers correctly before sending. Invalid format means failed deliveries.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating click-to-call links</h3>
            <p className="text-sm text-muted-foreground">
              Website needs clickable phone numbers? Format as RFC 3966 (tel:+1-555-123-4567) for the href attribute. Mobile devices recognize this and offer to dial.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Displaying international contact info</h3>
            <p className="text-sm text-muted-foreground">
              Business cards, websites, and brochures for international audiences should show numbers in international format. +1 prefix tells overseas callers how to reach you.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating user input in forms</h3>
            <p className="text-sm text-muted-foreground">
              User enters phone number in your form. Format it as they type or on submit. Show the formatted version so they can verify it's correct before submitting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Database normalization</h3>
            <p className="text-sm text-muted-foreground">
              Store phone numbers in consistent E.164 format. Makes searching, comparing, and deduplicating easier. Format for display only when retrieving from database.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Country selection affects formatting.</strong>
              Same digits format differently for different countries. "07911123456" is UK mobile format. The same digits in US format would be invalid. Always select the correct country.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">E.164 is best for storage.</strong>
              E.164 format (+countrycode+number, no spaces or dashes) is the international standard. Store in this format, convert to local format for display.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Extension handling varies.</strong>
              Extensions (x123, ext. 456) aren't part of the core number. Some formats include them, some don't. For systems that support extensions, store separately from main number.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Mobile vs landline formatting.</strong>
              Some countries format mobile and landline numbers differently. UK mobile: 07xxx, landline: 020 xxxx. The formatter applies country-specific rules.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For international applications, always store in E.164 format and display in the user's local format. A UK user sees 020 7946 0958, a US user seeing the same number sees +44 20 7946 0958.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is E.164 format?</h3>
            <p className="text-sm text-muted-foreground">
              E.164 is the international phone number standard. Format: +[country code][number] with no spaces or punctuation. Maximum 15 digits. Example: +14155551234. Required by most telecom APIs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I format for WhatsApp?</h3>
            <p className="text-sm text-muted-foreground">
              WhatsApp uses E.164 format. Add country code, remove leading zero, no spaces or dashes. UK number 07911 123456 becomes +447911123456 for WhatsApp.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my formatted number look different?</h3>
            <p className="text-sm text-muted-foreground">
              Different countries have different conventions. US uses (XXX) XXX-XXXX, UK uses XXXX XXXXXX, Germany uses 0XXX XXXXXXXX. All are correct for their respective countries.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I include the country code?</h3>
            <p className="text-sm text-muted-foreground">
              For international use, yes. For domestic-only use, national format without country code is fine. When in doubt, include it - it doesn't hurt and ensures international dialability.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I validate phone numbers?</h3>
            <p className="text-sm text-muted-foreground">
              This formatter does basic length validation. For full validation (checking if number is actually assigned), you need a lookup service like Twilio's Lookup API or similar.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about toll-free numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Toll-free numbers (800, 888, 877, etc. in US) format like regular numbers. They have their own area codes but follow the same formatting rules as geographic numbers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I format vanity numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Vanity numbers (1-800-FLOWERS) are marketing formats. For actual dialing, convert to digits (1-800-356-9377). Store the numeric version, display vanity format for marketing.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
