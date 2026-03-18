import React from "react"

export default function GrayCodeEncoderDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Gray Code Encoder/Decoder Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter a binary number to convert to Gray code, or input Gray code to convert back to binary. Select the bit length for your conversion. The tool processes the conversion instantly.
          </p>
          <p>
            Gray code ensures adjacent values differ by only one bit. To encode: XOR each bit with the bit to its left. To decode: XOR each bit with all decoded bits to its left.
          </p>
          <p>
            The converter shows both the binary and Gray code representations side by side. Visual bit indicators show which bits change between consecutive values.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Reading rotary encoders</h3>
            <p className="text-sm text-muted-foreground">
              Optical rotary encoders output Gray code. Prevents errors when transitioning between positions. Convert Gray code to binary to get the actual angle value.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing Karnaugh maps</h3>
            <p className="text-sm text-muted-foreground">
              K-maps use Gray code ordering for axes. Adjacent cells differ by one variable. This enables visual grouping for logic minimization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building error correction systems</h3>
            <p className="text-sm text-muted-foreground">
              Gray code minimizes errors in state transitions. Single-bit errors are easier to detect and correct. Used in some communication protocols.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating genetic algorithms</h3>
            <p className="text-sm text-muted-foreground">
              Gray code encoding in GA prevents large value jumps from single bit mutations. Small mutations produce small value changes. Improves convergence.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Interfacing with analog sensors</h3>
            <p className="text-sm text-muted-foreground">
              Some ADCs output Gray code. Reduces errors during conversion transitions. Convert to binary for processing in microcontrollers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Teaching digital logic</h3>
            <p className="text-sm text-muted-foreground">
              Gray code demonstrates important digital design concepts. Shows why binary isn't always best. Great educational tool for engineering students.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Gray code isn't for arithmetic.</strong>
              You can't add or subtract Gray codes directly. Convert to binary first, do math, convert back. Gray code is for representation, not calculation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Multiple Gray code variants exist.</strong>
              This tool uses standard binary-reflected Gray code. Other variants exist for specific applications. Most common use is binary-reflected.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Bit length must be consistent.</strong>
              When working with hardware, know your bit width. 4-bit Gray code differs from 8-bit. Match your system's bit length.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Zero is always all zeros.</strong>
              In Gray code, zero is represented as all 0 bits. This is consistent across all bit lengths. First value in the sequence.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For rotary encoders, the key benefit is during transitions. When moving from position 3 to 4, only one bit changes. In binary, multiple bits might change, causing momentary incorrect readings.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is it called Gray code?</h3>
            <p className="text-sm text-muted-foreground">
              Named after Frank Gray, a Bell Labs physicist. He patented the code in 1953 for use in shaft encoders. Also called reflected binary code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I convert binary to Gray code?</h3>
            <p className="text-sm text-muted-foreground">
              Keep the MSB the same. XOR each bit with the bit to its left. For binary 1011: MSB=1, then 1⊕0=1, 0⊕1=1, 1⊕1=0. Result: 1110.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I convert Gray code to binary?</h3>
            <p className="text-sm text-muted-foreground">
              Keep the MSB the same. XOR each Gray bit with the previous binary result. For Gray 1110: MSB=1, then 1⊕1=0, 0⊕1=1, 1⊕0=1. Result: 1011.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the main advantage?</h3>
            <p className="text-sm text-muted-foreground">
              Adjacent values differ by exactly one bit. Prevents errors during transitions. Critical for position encoders and state machines.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can Gray code detect errors?</h3>
            <p className="text-sm text-muted-foreground">
              Single-bit errors are detectable if the result is an invalid transition. But Gray code isn't primarily an error-correcting code. Use Hamming code for that.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is Gray code unique?</h3>
            <p className="text-sm text-muted-foreground">
              Binary-reflected Gray code is the standard form. Other Gray codes exist for specific purposes. This tool uses the standard binary-reflected version.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What bit lengths are supported?</h3>
            <p className="text-sm text-muted-foreground">
              Any practical bit length works. Common sizes: 4-bit (0-15), 8-bit (0-255), 10-bit (0-1023), 12-bit (0-4095). Match your application's requirements.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
