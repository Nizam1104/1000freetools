export default function SqliteViewerOnlineSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This online SQLite viewer opens .db and .sqlite database files directly in your browser,
            letting you explore tables, run queries, and export data without installing any software.
          </p>
          <p className="text-muted-foreground">
            The viewing process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">File upload:</strong> Select your SQLite database file from your computer. The file stays local - nothing is uploaded to servers.</li>
            <li><strong className="text-foreground">Database parsing:</strong> The SQLite file format is read using WebAssembly-based SQLite implementation running entirely in your browser.</li>
            <li><strong className="text-foreground">Schema extraction:</strong> Tables, indexes, views, and triggers are discovered and displayed in a navigable interface.</li>
            <li><strong className="text-foreground">Query execution:</strong> Run custom SQL queries against the loaded database and view results in a formatted table.</li>
          </ol>
          <p className="text-muted-foreground">
            Everything happens client-side using modern browser technologies. Your database file
            never leaves your computer, making this safe for sensitive data.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Quick Database Inspection",
              description: "Open a SQLite file from a colleague or download to see what tables and data it contains."
            },
            {
              title: "Mobile App Development",
              description: "Inspect SQLite databases created by iOS or Android apps during debugging sessions."
            },
            {
              title: "Data Recovery",
              description: "Open recovered or backup SQLite files to verify data integrity before restoration."
            },
            {
              title: "Educational Exploration",
              description: "Students can examine sample databases to understand schema design and data relationships."
            },
            {
              title: "Cross-Platform Data Sharing",
              description: "View SQLite files on machines without SQLite installed (public computers, restricted workstations)."
            },
            {
              title: "Export and Conversion",
              description: "Extract data from SQLite to CSV or JSON for use in other applications or analysis tools."
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
              caveat: "File size limits apply",
              explanation: "Browser memory constraints mean very large databases (hundreds of MB) may not load properly. Best for files under 50MB."
            },
            {
              caveat: "Read-only access",
              explanation: "For safety, this viewer is read-only. You can query and export but not modify the original database file."
            },
            {
              caveat: "Encrypted databases not supported",
              explanation: "SQLCipher-encrypted or password-protected SQLite files cannot be opened. Remove encryption first."
            },
            {
              caveat: "Browser compatibility required",
              explanation: "Requires a modern browser with WebAssembly support. Chrome, Firefox, Safari, and Edge all work."
            },
            {
              caveat: "Some extensions may not work",
              explanation: "Custom SQLite extensions or specialized functions may not be available in the browser-based implementation."
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
              question: "Is my data uploaded to a server?",
              answer: "No. The database file is processed entirely in your browser using WebAssembly. Nothing is transmitted to external servers, making this safe for sensitive data."
            },
            {
              question: "What file extensions are supported?",
              answer: "Any valid SQLite database file works: .db, .sqlite, .sqlite3, .db3, or files with no extension. The tool checks the file format, not the extension."
            },
            {
              question: "Can I export the data?",
              answer: "Yes. You can export individual tables or query results as CSV or JSON files. This is useful for migrating data or creating backups."
            },
            {
              question: "How do I run custom queries?",
              answer: "Use the SQL query editor to type any SELECT statement. Results appear in a table below. You can also view table schemas with PRAGMA commands."
            },
            {
              question: "What if my database is corrupted?",
              answer: "Corrupted files may fail to load or show incomplete data. Try SQLite's built-in recovery tools (sqlite3 .recover) before using this viewer."
            },
            {
              question: "Can I view multiple databases at once?",
              answer: "One database loads at a time. To switch databases, reload the page and select a different file. Browser tabs can run multiple instances."
            },
            {
              question: "Does this work on mobile devices?",
              answer: "Yes, the viewer works on tablets and phones with modern browsers. However, large files may strain mobile device memory."
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
