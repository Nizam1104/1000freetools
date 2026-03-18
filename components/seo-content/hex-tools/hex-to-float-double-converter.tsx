export default function HexToFloatDoubleConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This hex to float converter interprets hexadecimal values as IEEE 754
            floating-point numbers, converting between raw binary representation and decimal values.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Hex parsing:</strong> Convert the hexadecimal input to its binary representation.</li>
            <li><strong className="text-foreground">Bit field extraction:</strong> Separate the sign bit (1 bit), exponent (8 or 11 bits), and mantissa (23 or 52 bits).</li>
            <li><strong className="text-foreground">IEEE 754 decoding:</strong> Apply the IEEE 754 formula: value = (-1)^sign × 2^(exponent-bias) × 1.mantissa</li>
            <li><strong className="text-foreground">Result display:</strong> Show the decimal float/double value along with a breakdown of each component.</li>
          </ol>
          <p className="text-muted-foreground">
            This is crucial for understanding how computers store decimal numbers,
            debugging floating-point issues, and working with binary data formats.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Binary File Analysis",
              description: "Read floating-point values from binary files, save games, or data dumps that store floats as raw hex."
            },
            {
              title: "Debugging Precision Issues",
              description: "Understand why 0.1 + 0.2 ≠ 0.3 by examining the actual bit representation of floating-point numbers."
            },
            {
              title: "Network Protocol Analysis",
              description: "Decode floating-point values from network packets that transmit sensor data or scientific measurements."
            },
            {
              title: "Game Memory Editing",
              description: "Find and modify health values, coordinates, or other float variables in game memory for modding or analysis."
            },
            {
              title: "Scientific Computing",
              description: "Verify floating-point calculations at the bit level for numerical analysis and algorithm development."
            },
            {
              title: "Embedded Systems",
              description: "Work with sensor data, ADC readings, or control values stored as IEEE 754 floats in memory or registers."
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
              caveat: "Float vs Double have different sizes",
              explanation: "Float (32-bit/8 hex chars) has ~7 decimal digits precision. Double (64-bit/16 hex chars) has ~15 digits."
            },
            {
              caveat: "Endianness affects byte order",
              explanation: "Little-endian systems store least-significant byte first. The same hex may represent different values on different architectures."
            },
            {
              caveat: "Special values exist in IEEE 754",
              explanation: "Infinity, negative zero, and NaN (Not a Number) have specific bit patterns. The tool should identify these."
            },
            {
              caveat: "Not all decimals can be represented exactly",
              explanation: "0.1 in binary is a repeating fraction. This causes the famous 0.1 + 0.2 = 0.30000000000000004 issue."
            },
            {
              caveat: "Denormal numbers handle very small values",
              explanation: "Numbers close to zero use a special format (denormalized) that sacrifices precision for range."
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
              question: "What's the hex representation of 1.0?",
              answer: "Float: 0x3F800000. Double: 0x3FF0000000000000. The sign is 0 (positive), exponent is biased, mantissa is 0."
            },
            {
              question: "How do I represent negative numbers?",
              answer: "Set the sign bit (first bit) to 1. For -1.0 float: 0xBF800000. Only the sign bit changes from positive."
            },
            {
              question: "What's special about 0x7F800000?",
              answer: "That's positive infinity in float format. Exponent all 1s, mantissa all 0s. 0xFF800000 is negative infinity."
            },
            {
              question: "What does NaN look like in hex?",
              answer: "Exponent all 1s, mantissa non-zero. For example: 0x7FC00000 (quiet NaN) or 0x7FB00000 (signaling NaN)."
            },
            {
              question: "Why can't 0.1 be represented exactly?",
              answer: "In binary, 0.1 is 0.0001100110011... (repeating). Like 1/3 in decimal, it can't be expressed finitely in binary."
            },
            {
              question: "What's the exponent bias?",
              answer: "Float: 127. Double: 1023. The stored exponent = actual exponent + bias. This allows representing both large and small numbers."
            },
            {
              question: "Can I convert doubles too?",
              answer: "Yes, doubles use 64 bits (16 hex chars). They have 11 exponent bits and 52 mantissa bits for more precision."
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
