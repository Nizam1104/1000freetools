import React from "react"

export default function QrCodeCouponGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the QR Code Coupon Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your business name and coupon title. This identifies your promotion and appears on the coupon design.
          </p>
          <p>
            Choose discount type: percentage off, fixed amount off, or free item. Enter the discount value (20 for 20%, 10 for $10 off, etc.).
          </p>
          <p>
            Generate a unique coupon code or create your own. The code is what customers present to redeem the offer.
          </p>
          <p>
            Set an expiry date to create urgency. Coupons with deadlines have higher redemption rates.
          </p>
          <p>
            Add terms and conditions to specify restrictions. Include expiration, limits, or exclusions. Download the coupon for distribution.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Email marketing campaigns</h3>
            <p className="text-sm text-muted-foreground">
              Include QR code coupons in newsletters. Subscribers scan to save offers. Track email campaign effectiveness through redemptions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Social media promotions</h3>
            <p className="text-sm text-muted-foreground">
              Post QR code coupons on social platforms. Followers scan to claim offers. Viral sharing increases reach organically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Receipt-based rewards</h3>
            <p className="text-sm text-muted-foreground">
              Print QR coupons on customer receipts. Encourage return visits. Turn one-time buyers into repeat customers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Event handouts</h3>
            <p className="text-sm text-muted-foreground">
              Distribute QR coupons at trade shows or community events. Attendees scan for special offers. Capture leads while engaged.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Loyalty program rewards</h3>
            <p className="text-sm text-muted-foreground">
              Send QR coupons as loyalty rewards. Members scan to redeem points. Makes rewards tangible and immediate.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Flash sale announcements</h3>
            <p className="text-sm text-muted-foreground">
              Send time-limited QR coupons for flash sales. Create urgency with short expiry. Drive immediate traffic and sales.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Coupon codes should be unique.</strong>
              Generate unique codes for tracking or use one code for all. Unique codes prevent sharing and enable individual tracking.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Terms protect your business.</strong>
              Specify expiration, usage limits, and exclusions. Clear terms prevent disputes. Include "one per customer" or other restrictions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Discount amounts affect margins.</strong>
              Calculate profit impact before setting discount values. Ensure promotions are sustainable. Test different discount levels.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Expiry dates drive action.</strong>
              Coupons without deadlines often go unused. Set reasonable expiry (2-4 weeks typical). Balance urgency with convenience.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Legal note:</strong> Coupon terms constitute a legal offer. Ensure compliance with local consumer protection laws. Some jurisdictions have specific coupon regulations.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do customers redeem QR coupons?</h3>
            <p className="text-sm text-muted-foreground">
              Customers scan the QR code to view the coupon. They show the screen at checkout. Staff verify the code and apply the discount.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I track coupon redemptions?</h3>
            <p className="text-sm text-muted-foreground">
              Track manually by recording codes used. Or use a POS system that logs coupon codes. Unique codes enable per-customer tracking.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use percentage or fixed amount?</h3>
            <p className="text-sm text-muted-foreground">
              Percentage works for varied cart sizes. Fixed amounts are simple and clear. Test both to see what drives more conversions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I limit coupon usage?</h3>
            <p className="text-sm text-muted-foreground">
              Specify limits in terms. Use unique codes to enforce one-time use. Train staff on redemption policies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if the QR code doesn't scan?</h3>
            <p className="text-sm text-muted-foreground">
              Always include the coupon code as text. Customers can type it manually if scanning fails. Redundancy prevents lost redemptions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I prevent coupon fraud?</h3>
            <p className="text-sm text-muted-foreground">
              Use unique codes. Set usage limits. Verify customer identity for high-value coupons. Monitor for unusual redemption patterns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I combine QR coupons with other offers?</h3>
            <p className="text-sm text-muted-foreground">
              Specify in terms whether stacking is allowed. Most retailers don't allow combining. Clear policies prevent checkout confusion.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
