export default function FileTimestampConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This file timestamp converter translates file system timestamps from various
            formats (Windows FILETIME, Mac OS time, Unix time) into human-readable dates.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Format detection:</strong> Identify the timestamp format based on its magnitude and structure.</li>
            <li><strong className="text-foreground">Epoch normalization:</strong> Convert the input to a standard internal representation (Unix timestamp).</li>
            <li><strong className="text-foreground">Date formatting:</strong> Transform the normalized timestamp into a human-readable date string.</li>
            <li><strong className="text-foreground">Multiple format output:</strong> Display the result in various common formats for flexibility.</li>
          </ol>
          <p className="text-muted-foreground">
            Different operating systems store file timestamps differently - Windows uses
            FILETIME (100-nanosecond intervals since 1601), while Unix uses seconds since 1970.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Digital Forensics",
              description: "Analyze file creation and modification times from different operating systems during investigations."
            },
            {
              title: "Cross-Platform Development",
              description: "Understand file timestamps when working with files shared between Windows, Mac, and Linux systems."
            },
            {
              title: "Backup System Analysis",
              description: "Interpret timestamps from backup metadata to understand when files were actually backed up."
            },
            {
              title: "File System Debugging",
              description: "Troubleshoot file synchronization issues by comparing timestamps across different systems."
            },
            {
              title: "Archive Extraction",
              description: "Verify file dates when extracting archives that preserve original timestamps from different platforms."
            },
            {
              title: "Metadata Extraction",
              description: "Read and interpret embedded timestamps in file metadata for documentation or compliance purposes."
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
              caveat: "Different epochs for different systems",
              explanation: "Windows FILETIME starts at 1601, Unix at 1970, Mac OS Classic at 1904. The converter handles these automatically."
            },
            {
              caveat: "Timezone affects displayed time",
              explanation: "The underlying timestamp is UTC, but the readable date may be shown in your local timezone."
            },
            {
              caveat: "File system precision varies",
              explanation: "Some file systems store timestamps with second precision, others with nanosecond precision."
            },
            {
              caveat: "NTFS stores three timestamps per file",
              explanation: "Created, Modified, and Accessed times. Each may have different values depending on file operations."
            },
            {
              caveat: "Network transfers can alter timestamps",
              explanation: "Copying files over networks or between file systems may change or lose timestamp information."
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
              question: "What is Windows FILETIME format?",
              answer: "FILETIME counts 100-nanosecond intervals since January 1, 1601 UTC. It's a 64-bit value used by Windows NT-based systems."
            },
            {
              question: "How do I get a file's timestamp?",
              answer: "Windows: Right-click > Properties. Mac: Get Info. Linux: stat command. Or use file explorer details view."
            },
            {
              question: "Why are my file timestamps wrong after copying?",
              answer: "Some copy operations preserve timestamps, others set them to the copy time. Use tools that preserve metadata if needed."
            },
            {
              question: "What's the Mac OS timestamp format?",
              answer: "Classic Mac OS used seconds since January 1, 1904. macOS (Unix-based) uses standard Unix timestamps since 1970."
            },
            {
              question: "Can timestamps be faked?",
              answer: "Yes, tools exist to modify file timestamps (touch command, Timestomp). Don't rely solely on timestamps for security."
            },
            {
              question: "What's the difference between created and modified time?",
              answer: "Created: when the file was first made. Modified: when content last changed. Accessed: when the file was last read."
            },
            {
              question: "Do timestamps survive cloud uploads?",
              answer: "Often not. Cloud services may set upload time as the timestamp. Check your service's documentation."
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
