export default function UuidDecoderSEO() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the UUID Decoder Works</h2>
        <p className="text-muted-foreground">
          This decoder parses a UUID's 128-bit structure and extracts meaningful information from its component fields. It reads the version bits, variant bits, and—for version 1 UUIDs—the embedded timestamp.
        </p>
        <p className="text-muted-foreground">
          The tool breaks down the UUID into its RFC 4122 structure: time_low (32 bits), time_mid (16 bits), time_hi_and_version (16 bits), clock_seq_hi_and_reserved (8 bits), clock_seq_low (8 bits), and node (48 bits).
        </p>
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-sm font-medium mb-2">UUID v1 structure decoded:</p>
          <div className="font-mono text-xs space-y-1">
            <div className="flex flex-wrap gap-1">
              <span className="text-blue-500" title="time_low">xxxxxxxx</span>
              <span className="text-muted-foreground">-</span>
              <span className="text-green-500" title="time_mid">xxxx</span>
              <span className="text-muted-foreground">-</span>
              <span className="text-purple-500" title="time_hi_and_version">Vxxx</span>
              <span className="text-muted-foreground">-</span>
              <span className="text-orange-500" title="clock_seq">Nxxx</span>
              <span className="text-muted-foreground">-</span>
              <span className="text-red-500" title="node">xxxxxxxxxxxx</span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            <div className="bg-muted p-2 rounded">
              <p className="text-muted-foreground">time_low</p>
              <p className="font-medium">32 bits</p>
            </div>
            <div className="bg-muted p-2 rounded">
              <p className="text-muted-foreground">time_mid</p>
              <p className="font-medium">16 bits</p>
            </div>
            <div className="bg-muted p-2 rounded">
              <p className="text-muted-foreground">time_hi_and_version</p>
              <p className="font-medium">16 bits (includes version)</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Real Use Cases</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Forensic timestamp extraction</p>
            <p className="text-sm text-muted-foreground">
              A security analyst finds a v1 UUID in logs and needs to determine exactly when an event occurred, down to the 100-nanosecond interval.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Debugging UUID generation</p>
            <p className="text-sm text-muted-foreground">
              A developer suspects their UUID library is generating incorrect version bits and uses the decoder to verify the structure.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Learning UUID internals</p>
            <p className="text-sm text-muted-foreground">
              A computer science student studying distributed systems wants to understand how the 128 bits are actually allocated and used.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Node identifier analysis</p>
            <p className="text-sm text-muted-foreground">
              A network engineer examines the node field of v1 UUIDs to identify which machine in a cluster generated a particular record.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Variant compatibility check</p>
            <p className="text-sm text-muted-foreground">
              Someone integrating with a legacy system needs to verify whether the UUIDs use RFC 4122 variant or the older Microsoft variant.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Clock sequence debugging</p>
            <p className="text-sm text-muted-foreground">
              A developer troubleshooting duplicate v1 UUIDs checks the clock sequence field to see if it's incrementing correctly between generations.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What to Know Before Using</h2>
        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Version 1 timestamp extraction:</strong> Only v1 UUIDs contain timestamps. For v3, v4, or v5 UUIDs, the timestamp field will be null because those bits are used for random data or hash output.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">UUID epoch:</strong> Version 1 timestamps count 100-nanosecond intervals since October 15, 1582 (the Gregorian calendar reform date), not the Unix epoch of 1970. This tool converts to standard UTC dates automatically.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Node identifier privacy:</strong> Modern v1 UUID implementations often use random node identifiers instead of MAC addresses to prevent tracking. Don't assume the node field reveals actual hardware.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Little-endian storage:</strong> UUID v1 timestamps are stored in little-endian byte order within the UUID. This tool handles the byte-swapping automatically when extracting the timestamp.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-base font-semibold">What information can I extract from a UUID?</h3>
            <p className="text-sm text-muted-foreground">
              From any UUID: version number, variant type, node identifier, and clock sequence. From version 1 UUIDs specifically: the exact timestamp when it was generated (down to 100-nanosecond precision).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Why does my v4 UUID show no timestamp?</h3>
            <p className="text-sm text-muted-foreground">
              Version 4 UUIDs are random—the bits that would be a timestamp in v1 are just random numbers in v4. There's no meaningful timestamp to extract. Only version 1 (and some version 2) UUIDs contain time information.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">What does the variant field tell me?</h3>
            <p className="text-sm text-muted-foreground">
              The variant indicates which UUID specification the identifier follows. RFC 4122 (modern standard) uses variant bits 8, 9, A, or B. Microsoft's older format uses C, D, E, or F. This affects compatibility with different systems.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Can I determine which computer generated a UUID?</h3>
            <p className="text-sm text-muted-foreground">
              For old v1 UUIDs (pre-2000s), the node field might contain the MAC address, which could identify the network interface. Modern implementations use random node values for privacy, making this impossible.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">What is the clock sequence used for?</h3>
            <p className="text-sm text-muted-foreground">
              The 14-bit clock sequence prevents collisions when multiple UUIDs are generated at the same timestamp (common on multi-core systems). It should increment each time the clock appears to go backward or multiple UUIDs are generated in the same 100ns interval.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">How accurate is the extracted timestamp?</h3>
            <p className="text-sm text-muted-foreground">
              The timestamp is precise to 100 nanoseconds (10 million ticks per second). However, actual system clock resolution is typically much coarser (milliseconds). The precision is there, but the accuracy depends on the generating system's clock.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
