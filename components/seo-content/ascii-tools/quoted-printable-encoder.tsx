import React from "react"

export default function QuotedPrintableEncoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Quoted-printable encoding converts binary data and non-ASCII text
            into ASCII characters safe for email transmission. It's designed
            for data that's mostly readable text with occasional special characters.
          </p>
          <p>
            The encoding keeps printable ASCII characters (33-126, except =)
            unchanged. Non-ASCII bytes become equals sign followed by two hex
            digits (like =E2 for byte 0xE2). Soft line breaks use = at line end
            to indicate continuation.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example encoding:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">Hello café</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">Hello caf=C3=A9</code>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">Text with = sign</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">Text with =3D sign</code>
              </div>
            </div>
          </div>
          <p>
            Paste text to encode or quoted-printable to decode. The tool handles
            soft line breaks automatically and shows the result with a copy
            button for use in email clients or MIME processing.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sending emails with accented characters</h3>
            <p className="text-sm text-muted-foreground">
              Someone emails French colleagues with accented names like François.
              Their email client encodes the message as quoted-printable so the
              accents survive SMTP transmission through ASCII-only systems.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging MIME email parts</h3>
            <p className="text-sm text-muted-foreground">
              A developer investigates why email attachments arrive corrupted.
              They decode the quoted-printable body to verify the content matches
              what was sent, isolating the encoding layer from the problem.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing email bounce messages</h3>
            <p className="text-sm text-muted-foreground">
              A sysadmin parses bounce notifications that contain quoted-printable
              encoded error messages. They decode to read the actual error text
              and diagnose why emails failed delivery.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building email marketing templates</h3>
            <p className="text-sm text-muted-foreground">
              A marketer creates HTML email templates with special characters.
              The email service encodes them as quoted-printable to ensure
              consistent rendering across all email clients.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing email localization</h3>
            <p className="text-sm text-muted-foreground">
              A QA tester verifies that localized emails display correctly in
              different languages. They encode test strings with various scripts
              and decode to confirm no characters are lost in transmission.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Extracting data from raw email files</h3>
            <p className="text-sm text-muted-foreground">
              A forensic analyst examines .eml files and needs to extract the
              actual message content. They decode quoted-printable sections to
              recover the original text for analysis.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Quoted-printable is for text, not binary.</strong>
              It's designed for mostly-text content. For binary attachments,
              Base64 is more efficient. Quoted-printable bloats binary data
              significantly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Line length is limited to 76 characters.</strong>
              RFC 2045 specifies 76-character max lines. Longer lines get soft
              breaks with = at the end. Decoders must handle these breaks correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Equals signs always get encoded.</strong>
              Even if an = is part of your content, it becomes =3D. This prevents
              ambiguity with soft line breaks and hex encoding markers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Trailing whitespace gets encoded.</strong>
              Spaces or tabs at line ends become =20 or =09. This prevents mail
              servers from stripping trailing whitespace during transit.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Historical context:</strong> Quoted-printable was created
              when email systems were ASCII-only and often modified content
              (stripping trailing spaces, limiting line length). It survives
              today for backward compatibility even though modern systems handle
              binary better.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does quoted-printable mean?</h3>
            <p className="text-sm text-muted-foreground">
              The name comes from "quoting" special characters by making them
              "printable" ASCII. Non-printable bytes get quoted as =XX where
              XX is the hex value, making everything safe for transmission.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I use Base64 instead?</h3>
            <p className="text-sm text-muted-foreground">
              Use Base64 for binary data like images or executables. Use
              quoted-printable for mostly-text with occasional special characters.
              Base64 adds 33% overhead; quoted-printable adds minimal overhead
              for ASCII text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are there equals signs at line ends?</h3>
            <p className="text-sm text-muted-foreground">
              An equals sign at the end of a line indicates a soft line break.
              The line continues on the next line. The = and newline are removed
              during decoding, rejoining the text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can quoted-printable handle emoji?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but inefficiently. Each byte of a multi-byte emoji becomes
              three characters (=XX). A 4-byte emoji becomes 12 characters.
              Base64 is more compact for emoji-heavy content.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is quoted-printable still used?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, in email. MIME standard (RFC 2045) defines it for email
              content transfer encoding. Modern email clients still use it
              for text parts with non-ASCII characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I decode quoted-printable manually?</h3>
            <p className="text-sm text-muted-foreground">
              Replace each =XX sequence with the byte value XX in hex. Remove
              soft line breaks (= at end of line). Keep all other characters
              as-is. The result is the original text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What characters stay unchanged?</h3>
            <p className="text-sm text-muted-foreground">
              Printable ASCII 33-126 except = stay as-is. That's letters, digits,
              and most punctuation. Spaces and tabs stay unless at line ends.
              Everything else gets encoded.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
