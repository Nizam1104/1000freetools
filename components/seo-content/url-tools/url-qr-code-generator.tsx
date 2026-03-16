export default function UrlQrCodeGeneratorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool generates QR codes from URLs - two-dimensional barcodes that can be 
            scanned by smartphones to quickly access web addresses without typing.
          </p>
          <p className="text-muted-foreground">
            The QR generation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">URL encoding:</strong> The input URL is encoded into binary data suitable for QR encoding.</li>
            <li><strong className="text-foreground">Error correction:</strong> Reed-Solomon error correction is added so the QR code remains scannable even if partially damaged.</li>
            <li><strong className="text-foreground">Pattern generation:</strong> The data is converted into the characteristic black and white square pattern.</li>
            <li><strong className="text-foreground">Image output:</strong> The QR code is rendered as a downloadable image (PNG, SVG) in your chosen size.</li>
          </ol>
          <p className="text-muted-foreground">
            QR codes bridge the physical and digital worlds, making it easy to share URLs 
            in print, on screens, or in any situation where typing is inconvenient.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Print Marketing Materials",
              description: "Add QR codes to business cards, brochures, and flyers for instant website access."
            },
            {
              title: "Restaurant Menus",
              description: "Create contactless menu access by encoding your online menu URL in a QR code."
            },
            {
              title: "Event Promotion",
              description: "Share event registration pages, schedules, or venue information via scannable codes."
            },
            {
              title: "Product Packaging",
              description: "Link customers to product information, tutorials, or registration pages from packaging."
            },
            {
              title: "WiFi Access",
              description: "Generate QR codes that automatically connect guests to your WiFi network."
            },
            {
              title: "Digital Signage",
              description: "Display QR codes on screens to let viewers quickly access related content on their phones."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What to Know Before Using</h2>
        <div className="space-y-3">
          {[
            {
              caveat: "URL length affects QR complexity",
              explanation: "Longer URLs create denser, harder-to-scan QR codes. Use URL shorteners for long links to create cleaner, more reliable codes."
            },
            {
              caveat: "Error correction reduces capacity",
              explanation: "Higher error correction (more damage resistance) means larger QR codes. Balance reliability with size based on your use case."
            },
            {
              caveat: "Test before mass production",
              explanation: "Always test QR codes with multiple phones and scanning apps before printing. Lighting, distance, and angle affect scannability."
            },
            {
              caveat: "Size matters for scanning distance",
              explanation: "QR codes need to be large enough for the scanning distance. As a rule: 1cm of QR code per 30cm of scanning distance."
            },
            {
              caveat: "Contrast is critical",
              explanation: "QR codes need high contrast (dark on light). Reversed (light on dark) or low-contrast codes may not scan reliably."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4">
              <h3 className="font-semibold text-foreground mb-1">{item.caveat}</h3>
              <p className="text-sm text-muted-foreground">{item.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Questions</h2>
        <div className="space-y-6">
          {[
            {
              question: "What's the maximum URL length for QR codes?",
              answer: "Technically up to ~4000 characters, but practical limits are much lower. URLs over 100 characters create very dense codes. Use shorteners for URLs over 50 characters."
            },
            {
              question: "Can QR codes be customized with colors or logos?",
              answer: "Yes, but maintain contrast and don't cover too much of the code. Keep the three corner positioning squares intact. Test customized codes thoroughly."
            },
            {
              question: "Do QR codes expire?",
              answer: "The QR code itself doesn't expire, but the URL it contains might. If the destination changes, the QR code becomes useless. Use permanent URLs or redirect services."
            },
            {
              question: "What format should I download - PNG or SVG?",
              answer: "PNG for digital use and standard printing. SVG for large-format printing (banners, signs) as it scales infinitely without quality loss."
            },
            {
              question: "Why won't my QR code scan?",
              answer: "Common causes: too small, low contrast, damaged/corrupted, URL too long, or excessive customization. Test with multiple devices and scanning apps."
            },
            {
              question: "Are QR codes secure?",
              answer: "QR codes themselves are just encoded data. The risk is where they lead. Don't scan QR codes from untrusted sources - they could lead to phishing sites."
            },
            {
              question: "Can I track QR code scans?",
              answer: "Add UTM parameters to your URL before generating the QR code. Analytics will show traffic from the QR code separately from other sources."
            },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-semibold text-foreground">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
