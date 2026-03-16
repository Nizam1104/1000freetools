import React from "react"

export default function NumberBaseCalculatorSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the Number Base Calculator Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool performs arithmetic operations (addition, subtraction, multiplication, division) on numbers in different bases.
            Input numbers in binary, octal, decimal, or hexadecimal, and get results in your chosen output base.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Base Arithmetic Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Select the base for each input number (Binary, Octal, Decimal, Hexadecimal)</li>
            <li>Enter the numbers using valid digits for their base</li>
            <li>Choose the operation: add (+), subtract (−), multiply (×), or divide (÷)</li>
            <li>Select the output base for the result</li>
            <li>The tool converts inputs to decimal, performs the calculation, then converts to output base</li>
            <li>Results are displayed in uppercase for hex (A-F)</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Computer Science Education</h3>
            <p className="text-sm text-muted-foreground">
              A student learning about number systems practices converting between bases and performing arithmetic.
              They verify their manual calculations by comparing with the tool&apos;s results.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Memory Address Calculations</h3>
            <p className="text-sm text-muted-foreground">
              A systems programmer needs to calculate memory offsets. They add a base address (0x1000) to an offset (0x4F)
              and get the result in hexadecimal for use in debugging.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Network Subnet Math</h3>
            <p className="text-sm text-muted-foreground">
              A network administrator calculates IP address ranges by adding subnet sizes to base addresses.
              Binary arithmetic helps them understand bit-level operations in subnetting.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Embedded Systems Development</h3>
            <p className="text-sm text-muted-foreground">
              An embedded developer works with register values in hexadecimal. They multiply a base register address
              by an index to calculate the address of a specific register in a peripheral.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Digital Logic Design</h3>
            <p className="text-sm text-muted-foreground">
              An engineer designing digital circuits uses binary arithmetic to verify their logic designs.
              They add binary numbers to check carry propagation and overflow conditions.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding number bases and valid digits:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Binary (base 2) uses digits 0-1</li>
            <li>Octal (base 8) uses digits 0-7</li>
            <li>Decimal (base 10) uses digits 0-9</li>
            <li>Hexadecimal (base 16) uses digits 0-9 and A-F</li>
            <li>Each input can have a different base - the tool handles conversion automatically</li>
            <li>Division by zero returns an error message</li>
            <li>Results are shown in the selected output base with clear labeling</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I add binary numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Select &quot;Binary&quot; for both inputs, enter your binary numbers (like 1010 and 0101),
              choose add, and select your output base. 1010 + 0101 = 1111 in binary (10 + 5 = 15 in decimal).
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What does 0x mean in hexadecimal?</h3>
            <p className="text-sm text-muted-foreground">
              &quot;0x&quot; is a common prefix indicating a hexadecimal number (like 0x1A = 26 in decimal).
              This tool doesn&apos;t require the prefix - just enter the hex digits (1A).
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I mix different bases in one calculation?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! You can add a binary number to a hexadecimal number. The tool converts both to decimal,
              performs the operation, then converts to your chosen output base.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why are hex letters uppercase?</h3>
            <p className="text-sm text-muted-foreground">
              Uppercase (A-F) is the conventional format for hexadecimal in technical documentation.
              The tool accepts both uppercase and lowercase input but displays results in uppercase.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I convert decimal 255 to binary?</h3>
            <p className="text-sm text-muted-foreground">
              Enter 255 with Decimal base, enter 0 (or any number) with Decimal base, select add,
              and choose Binary output. The result shows 11111111.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What&apos;s the largest number I can calculate?</h3>
            <p className="text-sm text-muted-foreground">
              The tool uses JavaScript&apos;s number type, which safely handles integers up to 2^53 - 1
              (about 9 quadrillion). For most practical purposes, this is more than sufficient.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
