import React from "react"

export default function HtmlEmailTemplateBuilderSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the HTML Email Template Builder Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This visual builder creates responsive HTML email templates using a block-based approach.
            Add headers, text, buttons, images, dividers, and footers through a drag-and-drop interface.
            The tool generates table-based HTML that renders consistently across email clients.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Email Template Building Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Click block type buttons to add elements (header, text, button, image, divider, footer)</li>
            <li>Reorder blocks using up/down arrows in the blocks list</li>
            <li>Select a block to edit its content in the edit panel</li>
            <li>Customize text, URLs, and image sources for each block</li>
            <li>Click &quot;Generate HTML&quot; to create the email template</li>
            <li>Preview the rendered email in the iframe preview</li>
            <li>Copy the HTML or download as a .html file</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Marketing Newsletter Creation</h3>
            <p className="text-sm text-muted-foreground">
              A marketing team builds weekly newsletters with consistent branding.
              They reuse the template structure, updating content blocks for each edition.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">E-commerce Promotional Emails</h3>
            <p className="text-sm text-muted-foreground">
              An online store creates product promotion emails with images, descriptions,
              and call-to-action buttons. The template ensures mobile-friendly rendering.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Transactional Email Templates</h3>
            <p className="text-sm text-muted-foreground">
              A SaaS company builds order confirmation and password reset emails.
              The structured template ensures professional appearance across all clients.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Event Invitation Emails</h3>
            <p className="text-sm text-muted-foreground">
              An event organizer creates invitation emails with event details,
              images, and RSVP buttons. The template works in Gmail, Outlook, and Apple Mail.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Welcome Email Series</h3>
            <p className="text-sm text-muted-foreground">
              A startup builds a welcome email sequence for new users.
              Consistent templates maintain brand identity across the onboarding flow.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding email HTML requirements:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Email clients require table-based layouts for consistent rendering</li>
            <li>Inline styles are necessary (external CSS is often stripped)</li>
            <li>Some email clients block images by default</li>
            <li>Mobile responsiveness is achieved through fluid tables</li>
            <li>Maximum width of 600px is standard for email templates</li>
            <li>Always test emails in multiple clients before sending</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why use tables for email layouts?</h3>
            <p className="text-sm text-muted-foreground">
              Email clients like Outlook use Microsoft Word&apos;s rendering engine,
              which doesn&apos;t support modern CSS. Tables provide the most consistent
              rendering across all email platforms.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Will this work in all email clients?</h3>
            <p className="text-sm text-muted-foreground">
              The generated HTML is compatible with major clients: Gmail, Outlook,
              Apple Mail, Yahoo Mail, and mobile apps. However, always test before
              sending to your full list.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I customize the colors and fonts?</h3>
            <p className="text-sm text-muted-foreground">
              The template uses default styling. To customize, edit the generated HTML
              and modify the inline style values for colors, fonts, and spacing.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I add my logo?</h3>
            <p className="text-sm text-muted-foreground">
              Add an image block and enter your logo&apos;s URL. Ensure the image is
              hosted on a public server (not localhost) so recipients can view it.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What size should my images be?</h3>
            <p className="text-sm text-muted-foreground">
              For a 600px wide template, images should be 600px wide or less.
              Keep file sizes under 200KB for fast loading. Use JPG for photos,
              PNG for graphics with transparency.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I use this with email marketing platforms?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, copy the generated HTML and paste it into platforms like
              Mailchimp, SendGrid, or Constant Contact as a custom template.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
