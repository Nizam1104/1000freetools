import * as React from "react"

export default function UuencodeUudecodeToolSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Uuencode/Uudecode Tool Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Uuencode (Unix-to-Unix encoding) converts binary data into ASCII text for safe transmission over systems that only handle text, like old email servers or Usenet. The tool wraps your data with a header containing the filename and Unix file permissions, then encodes the content line by line.
          </p>
          <p>
            Each line encodes up to 45 bytes of binary data into 60 ASCII characters. The encoding works by taking 3 bytes (24 bits) and splitting them into 4 groups of 6 bits each. Each 6-bit value maps to a printable ASCII character by adding 32 to the value.
          </p>
          <p>
            When decoding, the tool reads the header to extract the original filename and permissions, then reverses the process: each character has 32 subtracted to recover the 6-bit values, which are recombined into the original bytes. The encoded data ends with a grave accent (`) followed by "end".
          </p>
          <p>
            To encode: enter your text, optionally set the filename and file mode (like 644 for readable files), then click Uuencode. To decode: paste Uuencoded data and click Uudecode. The tool automatically extracts the embedded filename and permissions from the header.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sending files through old email systems</h3>
            <p className="text-sm text-muted-foreground">
              Legacy email gateways strip binary attachments. Uuencode converts files to plain text that passes through safely. The recipient decodes to recover the original file with its name intact.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with Unix backup archives</h3>
            <p className="text-sm text-muted-foreground">
              Old Unix backup tapes and archives often contain Uuencoded files. Decode them to restore original data with proper permissions preserved in the header.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Posting binary files to Usenet</h3>
            <p className="text-sm text-muted-foreground">
              Usenet newsgroups historically used Uuencode for binary posts. Images, software, and data files were encoded as text articles. Decode to extract the original content.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging legacy system transfers</h3>
            <p className="text-sm text-muted-foreground">
              Old mainframe and Unix systems still use Uuencode for file transfers. When a transfer fails, decode the received text to verify what actually arrived versus what was sent.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preserving file metadata in text format</h3>
            <p className="text-sm text-muted-foreground">
              The Uuencode header stores the original filename and Unix permissions (like 755 or 644). This metadata survives text-only transmission and is restored on decode.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Converting man pages and documentation</h3>
            <p className="text-sm text-muted-foreground">
              Unix manual pages and technical documents were often distributed as Uuencoded files. Decode historical documentation archives to access original formatted content.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Uuencode is largely obsolete.</strong>
              Modern systems use Base64 (MIME) for email attachments. Uuencode persists in legacy Unix environments and historical archives. Use Base64 for new applications.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">File permissions are Unix-specific.</strong>
              The mode field (like 644) represents Unix file permissions. Windows systems don't use these permissions, but they're preserved for round-trip transfers between Unix systems.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Output is about 35% larger than input.</strong>
              Like all binary-to-text encodings, Uuencode expands data. Three bytes become four characters. Factor this into size limits for email or transmission.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Header format must be exact.</strong>
              The "begin MODE FILENAME" header and "end" footer are required for valid Uuencode. Malformed headers will cause decode failures. This tool handles standard format.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> The filename in the header is just metadata. When decoding, the tool extracts the content but you'll need to manually save it with the correct filename. The embedded filename tells you what it should be called.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does "uu" stand for?</h3>
            <p className="text-sm text-muted-foreground">
              "Unix-to-Unix". Uuencode was part of the UUCP (Unix-to-Unix Copy) suite of tools developed in the 1970s for transferring files between Unix systems over phone lines.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What file mode should I use?</h3>
            <p className="text-sm text-muted-foreground">
              Use 644 for regular readable files (owner read/write, others read-only). Use 755 for executable scripts (owner full, others read/execute). Use 600 for private files (owner only).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I encode binary files like images?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, Uuencode handles any binary data. Upload the file using the upload button. The binary bytes are encoded just like text. Decode restores the exact original bytes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does the output have a grave accent (`)?</h3>
            <p className="text-sm text-muted-foreground">
              The grave accent line marks the end of encoded data before the "end" keyword. It represents a zero-length line and signals the decoder that no more data follows.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is Uuencode secure?</h3>
            <p className="text-sm text-muted-foreground">
              No. Uuencode is encoding, not encryption. Anyone can decode it. It's for data representation, not confidentiality. Use encryption if you need to hide content.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between Uuencode and Base64?</h3>
            <p className="text-sm text-muted-foreground">
              Uuencode uses ASCII 32-95 (space to underscore). Base64 uses A-Z, a-z, 0-9, +, /. Base64 is more universal today. Uuencode includes filename/permissions in the header; Base64 doesn't.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I decode multiple Uuencoded files in one paste?</h3>
            <p className="text-sm text-muted-foreground">
              This tool decodes one file at a time. If you paste multiple Uuencoded blocks (each with begin/end), only the first complete block will be decoded. Separate files for individual decoding.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
