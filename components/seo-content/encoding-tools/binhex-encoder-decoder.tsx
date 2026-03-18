import React from "react"

export default function BinhexEncoderDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the BinHex Encoder/Decoder Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload a file or paste binary data to encode to BinHex format, or input BinHex-encoded text to decode. The tool handles the complete conversion process.
          </p>
          <p>
            BinHex converts binary data to ASCII text using a 64-character alphabet. It includes a CRC checksum for error detection. Originally designed for Mac file transfers.
          </p>
          <p>
            The encoder adds Mac-specific metadata (resource fork, data fork). The decoder extracts the binary data and validates the CRC. Modern use is primarily for legacy file handling.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Opening vintage Mac files</h3>
            <p className="text-sm text-muted-foreground">
              Old Mac archives use BinHex (.hqx). Decode to access the contents. Essential for Mac software preservation and retro computing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Email attachment conversion</h3>
            <p className="text-sm text-muted-foreground">
              Legacy email systems used BinHex for attachments. Decode old email archives. Extract attachments from historical communications.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Software archaeology</h3>
            <p className="text-sm text-muted-foreground">
              Studying classic Mac software? BinHex was the distribution format. Decode to analyze vintage applications and games.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Data recovery from old media</h3>
            <p className="text-sm text-muted-foreground">
              Recovering data from old Mac disks? Files may be BinHex encoded. Decode to access the original data. Preserve digital history.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Understanding encoding history</h3>
            <p className="text-sm text-muted-foreground">
              BinHex shows early solutions to binary-in-text problem. Educational value for understanding encoding evolution. Compare with modern methods.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing Usenet archives</h3>
            <p className="text-sm text-muted-foreground">
              Old Usenet posts used BinHex for Mac files. Decode archived posts. Access historical file distributions.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">BinHex is largely obsolete.</strong>
              Modern systems use Base64 or direct binary. BinHex was for 1980s-1990s Mac transfers. Mainly needed for legacy file handling.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Includes CRC error checking.</strong>
              BinHex files contain a CRC-16 checksum. Decoder validates integrity. Detects transmission errors automatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Mac file structure is unique.</strong>
              Classic Mac files had two forks: data and resource. BinHex encoded both. Modern systems only have data forks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">File extension is .hqx.</strong>
              BinHex files typically end in .hqx. Sometimes .bin.hqx. The extension helps identify the encoding format.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When decoding vintage Mac files, you may need additional tools to handle the resource fork. Modern extractors often discard resource forks as they're not usable on non-Mac systems.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is BinHex?</h3>
            <p className="text-sm text-muted-foreground">
              Binary-to-Hexadecimal encoding for Macintosh. Created in 1980s for file transfers. Converts binary to ASCII for safe transmission over text-only channels.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why was BinHex created?</h3>
            <p className="text-sm text-muted-foreground">
              Early networks couldn't handle binary reliably. BinHex made files text-safe. Mac-specific solution before Base64 became standard.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is BinHex still used?</h3>
            <p className="text-sm text-muted-foreground">
              Rarely. Replaced by Base64, ZIP, and direct binary transfer. Only needed for vintage Mac files and historical archives.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the file extension?</h3>
            <p className="text-sm text-muted-foreground">
              .hqx is standard for BinHex files. Sometimes seen as .bin.hqx. The extension indicates the file needs BinHex decoding.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does CRC checking work?</h3>
            <p className="text-sm text-muted-foreground">
              CRC-16 checksum is calculated on the data. Stored in the BinHex file. Decoder recalculates and compares. Mismatch indicates corruption.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I decode on modern Mac?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but modern macOS doesn't include native BinHex support. Use third-party tools like The Unarchiver or online decoders.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about resource forks?</h3>
            <p className="text-sm text-muted-foreground">
              BinHex encoded both data and resource forks. Modern systems ignore resource forks. Data fork contains the main file content.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
