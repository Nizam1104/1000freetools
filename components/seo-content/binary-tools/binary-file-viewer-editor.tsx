export default function BinaryFileViewerEditorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This binary file viewer and hex editor displays any file's raw byte content.
            It shows offset addresses, hexadecimal values, and ASCII representation side by side.
            You can search for patterns, edit individual bytes, and save modified files.
          </p>
          <p className="text-muted-foreground">
            The viewing process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Upload file:</strong> Any file type loads into memory as a byte array.</li>
            <li><strong className="text-foreground">Display hex dump:</strong> Bytes are shown in rows with offset addresses (0x00000000, 0x00000010, etc.).</li>
            <li><strong className="text-foreground">Show ASCII preview:</strong> Printable characters (32-126) display alongside hex values; non-printable show as dots.</li>
            <li><strong className="text-foreground">Enable editing:</strong> Click any byte to modify its value in hex, binary, decimal, or ASCII format.</li>
          </ol>
          <p className="text-muted-foreground">
            Each row shows 16 bytes by default. The left column is the offset (position in file),
            the middle is hex values, and the right is ASCII interpretation. This triptych view
            is standard in hex editors because it lets you correlate raw bytes with readable text.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Reverse Engineering",
              description: "Inspect executable files, understand file formats, and analyze binary protocols."
            },
            {
              title: "File Recovery & Repair",
              description: "Fix corrupted files by examining and editing raw bytes directly."
            },
            {
              title: "Malware Analysis",
              description: "Examine suspicious files for embedded strings, signatures, and hidden data."
            },
            {
              title: "Save Game Editing",
              description: "Modify game save files by finding and changing specific byte values."
            },
            {
              title: "Embedded Systems Debugging",
              description: "Analyze firmware dumps, memory captures, and device communication logs."
            },
            {
              title: "CTF & Security Challenges",
              description: "Find hidden flags, steganography, and encoded messages in binary files."
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
              caveat: "Editing can corrupt files",
              explanation: "Changing the wrong byte can break file structure. Always work on a copy. Understand the file format before making changes."
            },
            {
              caveat: "Hex is the standard view",
              explanation: "Hexadecimal is used because each byte (0-255) maps to exactly 2 hex digits (00-FF). More compact than binary, more precise than decimal."
            },
            {
              caveat: "Offsets are zero-based",
              explanation: "Offset 0x00000000 is the first byte. Offset 0x00000010 (16 in decimal) is the 17th byte. This matches programming array indexing."
            },
            {
              caveat: "ASCII view shows printable chars only",
              explanation: "Bytes 32-126 display as characters. Others show as dots. Text files show readable content; binary files show mostly dots."
            },
            {
              caveat: "Changes are in-memory until download",
              explanation: "Edits don't modify the original file. You must download the edited version. This protects against accidental corruption."
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
              question: "What is a hex editor used for?",
              answer: "Viewing and editing files at the byte level. Useful for reverse engineering, file format analysis, data recovery, malware analysis, and understanding how data is stored."
            },
            {
              question: "Why do some bytes show as dots?",
              answer: "Only bytes 32-126 are printable ASCII characters. Other values (control characters, high bytes) aren't displayable, so they show as dots for readability."
            },
            {
              question: "What does the offset column mean?",
              answer: "It's the byte position in the file. 0x00000000 = byte 0 (first byte). 0x00000010 = byte 16. Each row advances by 0x10 (16 bytes) with default settings."
            },
            {
              question: "Can I edit any file type?",
              answer: "Yes — images, executables, documents, anything. But understand the format first. Random edits to structured files (like JPEGs or PDFs) will likely corrupt them."
            },
            {
              question: "How do I find text in a binary file?",
              answer: "Use the search function. It looks for byte sequences matching your text. Works great for finding strings in executables or hidden messages in files."
            },
            {
              question: "What's the difference between hex and binary view?",
              answer: "Same data, different representation. Hex shows each byte as 2 hex digits (00-FF). Binary shows 8 bits (00000000-11111111). Hex is more compact and readable."
            },
            {
              question: "Why would I edit a file in hex?",
              answer: "Some changes can't be made with normal editors — fixing corrupted headers, removing DRM, modifying game saves, patching executables, or analyzing malware behavior."
            },
            {
              question: "Is this safe for analyzing malware?",
              answer: "Viewing is safe — the file doesn't execute. But don't download edited malware back to your system. Use a VM for analysis. This tool is for inspection, not execution."
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
