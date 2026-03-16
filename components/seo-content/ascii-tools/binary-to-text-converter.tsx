import React from "react"

export default function BinaryToTextConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts between binary code and readable text using ASCII encoding.
            In binary-to-text mode, it takes groups of 0s and 1s, interprets each 8-bit
            group as a number, and maps that number to its corresponding ASCII character.
          </p>

          <p>
            In text-to-binary mode, each character is converted to its ASCII code (a number
            from 0-255), then that number is expressed in binary. For example, "A" is ASCII
            code 65, which is 01000001 in 8-bit binary.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Binary encoding basics:</p>
            <div className="space-y-2 text-sm">
              <div className="p-2 rounded bg-muted">
                <strong>8-bit (ASCII):</strong> Standard encoding where each character uses
                one byte. Covers English letters, numbers, and common symbols (codes 0-255).
              </div>
              <div className="p-2 rounded bg-muted">
                <strong>16-bit (Unicode):</strong> Extended encoding for international
                characters, emojis, and special symbols. Each character uses two bytes.
              </div>
            </div>
          </div>

          <p>
            The converter handles binary input with or without spaces between bytes.
            "0100100001101001" and "01001000 01101001" both decode to "Hi". Control
            characters like newlines and tabs are preserved in the conversion.
          </p>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Decoding binary messages in CTF challenges</h3>
            <p className="text-sm text-muted-foreground">
              A cybersecurity student encounters a capture-the-flag puzzle with a string
              of 0s and 1s. They paste it into the converter and instantly get the hidden
              message, revealing the next clue or flag for the challenge.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Understanding computer science homework</h3>
            <p className="text-sm text-muted-foreground">
              A CS student learning about data representation needs to verify their binary
              conversion homework. They type their text answers, convert to binary, and
              compare against their manual calculations to catch mistakes before submitting.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating binary art or secret messages</h3>
            <p className="text-sm text-muted-foreground">
              Someone wants to send a message that looks like random binary to casual
              observers. They convert their text to binary, share the 0s and 1s, and
              only recipients who know to decode it can read the actual message.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging binary protocol data</h3>
            <p className="text-sm text-muted-foreground">
              A network engineer captures raw packet data that includes ASCII strings in
              binary format. They extract the binary portion and convert it to text to
              read hostnames, error messages, or protocol identifiers embedded in the
              packet.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning how computers store text</h3>
            <p className="text-sm text-muted-foreground">
              A curious learner wants to understand what their text looks like at the
              machine level. They type their name, see the binary representation, and
              begin to grasp how all digital text is fundamentally just patterns of
              electrical on/off states.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Converting legacy binary dumps</h3>
            <p className="text-sm text-muted-foreground">
              A developer working with old system logs finds text data stored as binary
              strings. Instead of writing a custom parser, they paste chunks into the
              converter to quickly extract readable content for analysis.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Binary must be valid ASCII for readable output.</strong>
              Binary values 0-31 and 127 are control characters (non-printable). Values
              128-255 are extended ASCII and may display differently depending on your
              system's encoding. Only 32-126 produce standard printable characters.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Bit length matters for text-to-binary.</strong>
              8-bit encoding produces shorter output but only covers basic ASCII. 16-bit
              encoding handles Unicode characters (accents, emojis, non-Latin scripts)
              but doubles the output size. Choose based on your text content.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Binary input is flexible with formatting.</strong>
              Spaces, newlines, and other non-0/1 characters are ignored during binary-to-text
              conversion. "01001000 01101001" and "01001000,01101001" both work. But each
              byte must still be exactly 8 bits (or 16 for Unicode mode).
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Not all binary represents text.</strong>
              Random binary data (like from images or executables) may decode to gibberish
              or control characters. This tool assumes the binary represents ASCII text.
              For other data types, use appropriate hex or base64 converters.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When converting text to binary for transmission,
              use space delimiters. It's easier to read and debug than continuous streams.
              For compact storage or embedding, use no delimiter to minimize size.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my binary have question marks in the output?</h3>
            <p className="text-sm text-muted-foreground">
              Question marks indicate invalid or non-printable characters. This happens
              when binary values don't form valid 8-bit groups, or when the value
              represents a control character. Check that your binary is properly formatted
              with complete bytes.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can this convert images or files to binary?</h3>
            <p className="text-sm text-muted-foreground">
              No, this tool only handles text-to-binary conversion. Images, audio, and
              other binary files would produce enormous output (megabytes of 0s and 1s).
              For file-to-binary, use hex editors or specialized binary conversion tools.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between ASCII and Unicode binary?</h3>
            <p className="text-sm text-muted-foreground">
              ASCII uses 7-8 bits per character (128-256 possible characters). Unicode
              uses 16 or more bits (over 65,000 characters). For English text, ASCII is
              sufficient. For emojis, Chinese, Arabic, or accented characters, you need
              Unicode encoding.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I convert binary without spaces?</h3>
            <p className="text-sm text-muted-foreground">
              Just paste it directly—the converter automatically groups every 8 bits as
              one character. "0100100001101001" becomes "Hi". The tool validates that
              the total length is divisible by 8 (or 16 for Unicode mode).
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert lowercase and uppercase separately?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, case is preserved in conversion. "A" (65) is 01000001, while "a" (97)
              is 01100001. The binary difference is in bit 5, which is the case bit in
              ASCII encoding.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does 01001000 mean?</h3>
            <p className="text-sm text-muted-foreground">
              01001000 in binary equals 72 in decimal, which is the ASCII code for
              uppercase "H". This is a common example because it's the first letter of
              "Hello World" in binary tutorials.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is binary the same as base64?</h3>
            <p className="text-sm text-muted-foreground">
              No. Binary uses only 0 and 1. Base64 uses 64 characters (A-Z, a-z, 0-9, +, /)
              to represent binary data more compactly. Base64 is about 33% larger than
              raw binary but much smaller than writing out all the 0s and 1s.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
