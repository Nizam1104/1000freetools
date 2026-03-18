import React from "react"

export default function QrCodeRestaurantMenuSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the QR Code Restaurant Menu Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your restaurant name that will appear with the QR code. This helps customers identify they're scanning the right menu.
          </p>
          <p>
            Provide the URL where your menu is hosted. This can be a PDF, online menu page, or digital ordering system.
          </p>
          <p>
            Optionally add table numbers for table-specific codes. This enables targeted ordering and service.
          </p>
          <p>
            Add a description or call-to-action like "Scan to View Menu" or "Order Online Now".
          </p>
          <p>
            Generate and download the QR code. Print and display on tables, windows, or takeout materials.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Contactless dining</h3>
            <p className="text-sm text-muted-foreground">
              Customers scan to view menus on their phones. No physical menus to sanitize. Safer dining experience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Online ordering integration</h3>
            <p className="text-sm text-muted-foreground">
              QR codes link to ordering platforms. Customers order from their table. Reduces server workload.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Takeout and delivery</h3>
            <p className="text-sm text-muted-foreground">
              Include QR codes on takeout bags. Customers access menus for next order. Drives repeat business.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Outdoor seating areas</h3>
            <p className="text-sm text-muted-foreground">
              Weather-resistant QR code displays. Patrons access menus outdoors. No laminated menus needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Happy hour specials</h3>
            <p className="text-sm text-muted-foreground">
              Separate QR codes for special menus. Link to happy hour or seasonal offerings. Easy menu updates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Multi-language menus</h3>
            <p className="text-sm text-muted-foreground">
              QR codes link to menu in customer's language. Tourists appreciate native language menus. Better dining experience.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Menu URL must be mobile-friendly.</strong>
              Most customers scan with phones. Ensure menu displays well on small screens. Test before distributing codes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">PDF menus have limitations.</strong>
              PDFs work but aren't ideal for mobile. Consider responsive web menus. Better user experience on phones.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Table numbers enable tracking.</strong>
              Unique codes per table show ordering patterns. Helps with service and analytics. Consider table-specific codes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Update menus easily.</strong>
              Change the linked menu without changing QR codes. Update your menu file. Codes continue working.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Accessibility note:</strong> Keep some physical menus for customers without smartphones. QR codes should supplement, not replace, traditional options.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Where should I display QR codes?</h3>
            <p className="text-sm text-muted-foreground">
              Table tents, window clings, counter displays, and takeout bags. Place at eye level. Ensure good lighting for scanning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I host my menu?</h3>
            <p className="text-sm text-muted-foreground">
              Use your website, Google Drive, or menu platforms like MenuSifu or Flipdish. Ensure public access and fast loading.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I track menu scans?</h3>
            <p className="text-sm text-muted-foreground">
              Use URL shorteners with analytics. Or host on your website with tracking. See peak scanning times and popular tables.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should each table have a unique code?</h3>
            <p className="text-sm text-muted-foreground">
              Unique codes enable table-specific ordering and tracking. Same codes are simpler. Depends on your ordering system needs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if customers can't scan?</h3>
            <p className="text-sm text-muted-foreground">
              Train staff to assist. Have backup physical menus. Some customers prefer traditional menus. Offer both options.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I update the menu?</h3>
            <p className="text-sm text-muted-foreground">
              Update the file at the same URL. QR codes don't change. Customers see new menu immediately.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can QR codes integrate with POS?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, many QR ordering systems integrate with POS. Orders go directly to kitchen. Streamlines operations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
