import React from "react"

export default function QrCodePaypalSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the QR Code for PayPal Payment Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your PayPal email address. This is where payments will be sent. Use your business PayPal account for professional transactions.
          </p>
          <p>
            Optionally set a fixed amount for the payment. Leave blank to let payers choose the amount. Useful for donations or variable payments.
          </p>
          <p>
            Select the currency: USD, EUR, GBP, CAD, AUD, JPY, etc. Match your PayPal account's primary currency or customer base.
          </p>
          <p>
            Add an item name to identify what's being purchased. This appears in the payment details for both parties' records.
          </p>
          <p>
            Include an optional note that appears during checkout. Thank customers or provide payment instructions. Generate the payment QR code.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Marketplace vendor payments</h3>
            <p className="text-sm text-muted-foreground">
              Farmers market vendors accept PayPal. No cash handling needed. Customers pay from phones.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Freelancer invoicing</h3>
            <p className="text-sm text-muted-foreground">
              Include QR codes on invoices. Clients scan to pay instantly. Faster payment collection.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Donation collection</h3>
            <p className="text-sm text-muted-foreground">
              Nonprofits display donation QR codes. Supporters scan to contribute. Frictionless giving.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Service tip jars</h3>
            <p className="text-sm text-muted-foreground">
              Hair salons, tattoo artists accept tips. Digital tip jar alternative. Modern tipping method.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Class registration payments</h3>
            <p className="text-sm text-muted-foreground">
              Fitness studios accept class payments. Students scan to register. Streamlined checkout.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fundraising events</h3>
            <p className="text-sm text-muted-foreground">
              Silent auction payments via QR. Bidders pay without lining up. Efficient checkout process.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">PayPal account type matters.</strong>
              Personal accounts have limitations. Business accounts offer full features. Upgrade for commercial use.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Transaction fees apply.</strong>
              PayPal charges fees for payments. Factor this into pricing. Fees vary by country and transaction type.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Fixed amounts limit flexibility.</strong>
              Set amounts for specific products. Leave open for donations or tips. Choose based on use case.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Currency conversion affects amounts.</strong>
              International payments convert currencies. Exchange rates apply. Inform customers of potential fees.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Security tip:</strong> Verify your PayPal email carefully. Wrong email sends money to strangers. Double-check before printing QR codes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do payers need a PayPal account?</h3>
            <p className="text-sm text-muted-foreground">
              No, PayPal allows guest checkout with credit cards. But account holders pay faster. Both options available.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are PayPal's transaction fees?</h3>
            <p className="text-sm text-muted-foreground">
              Typically 2.9% + $0.30 for domestic US transactions. Varies by country and volume. Check PayPal's current fee schedule.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I refund payments?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, issue refunds from your PayPal account. Full or partial refunds available. Fees may not be refundable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I track QR code payments?</h3>
            <p className="text-sm text-muted-foreground">
              Use unique item names or notes for each QR location. Check PayPal transaction details. See which codes drive payments.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I change the payment amount later?</h3>
            <p className="text-sm text-muted-foreground">
              Not for generated QR codes. Create a new code with updated amount. Or let payers modify amount at checkout.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is PayPal QR code payment secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, PayPal handles all security. Payments are encrypted. Buyer and seller protection apply.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for international payments?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, PayPal works globally. Currency conversion happens automatically. Recipient may receive different currency.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
