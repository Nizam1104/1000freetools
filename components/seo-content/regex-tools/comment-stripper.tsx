export default function CommentStripperSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This comment stripper removes comments from code, leaving only the executable 
            statements - useful for code analysis, minification, and size reduction.
          </p>
          <p className="text-muted-foreground">
            The stripping process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Language detection:</strong> The tool identifies the programming language to apply the correct comment syntax rules.</li>
            <li><strong className="text-foreground">Comment pattern matching:</strong> Using regex patterns, the tool identifies single-line comments (//, #) and multi-line comments (/* */, {"<!-- -->"}).</li>
            <li><strong className="text-foreground">String preservation:</strong> Comment-like patterns inside string literals are preserved to avoid breaking code.</li>
            <li><strong className="text-foreground">Code output:</strong> The remaining code is output with optional whitespace normalization.</li>
          </ol>
          <p className="text-muted-foreground">
            Removing comments reduces file size and can help analyze the actual logic 
            of code without documentation noise.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Code Minification",
              description: "Remove comments before deploying to reduce file size and improve load times."
            },
            {
              title: "Code Analysis",
              description: "Analyze actual code logic without comment distraction for complexity metrics."
            },
            {
              title: "Security Auditing",
              description: "Review production code to ensure no sensitive information is left in comments."
            },
            {
              title: "Learning from Examples",
              description: "Strip comments from tutorial code to test your understanding by adding your own comments."
            },
            {
              title: "Plagiarism Detection",
              description: "Compare code structure without comments to detect copied code with modified comments."
            },
            {
              title: "Build Process",
              description: "Automatically strip comments as part of the build pipeline for production releases."
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
              caveat: "Some comments contain important information",
              explanation: "License headers, author attributions, and critical documentation may be in comments. Don't strip these for distributed code."
            },
            {
              caveat: "String literals may contain comment-like text",
              explanation: "Good tools preserve // and /* inside strings. Poor implementations might break code by removing these."
            },
            {
              caveat: "Language-specific rules apply",
              explanation: "Different languages have different comment syntax. Python uses #, JavaScript uses //, HTML uses <!-- -->."
            },
            {
              caveat: "Documentation generators use comments",
              explanation: "JSDoc, Docstring, and similar documentation comments may be needed for API documentation generation."
            },
            {
              caveat: "Minification does more than strip comments",
              explanation: "True minification also removes whitespace, shortens variable names, and optimizes code. Comment stripping is just one step."
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
              question: "What languages are supported?",
              answer: "Common languages include JavaScript, Python, Java, C/C++, PHP, Ruby, HTML, CSS, and SQL. Each has its own comment syntax patterns."
            },
            {
              question: "Does this remove docstrings in Python?",
              answer: "It depends on the tool. Some treat docstrings as comments, others preserve them since they're accessible at runtime via __doc__."
            },
            {
              question: "Will this break my code?",
              answer: "Properly implemented tools preserve strings and code structure. Always test stripped code before deploying to production."
            },
            {
              question: "Can I remove only certain types of comments?",
              answer: "Advanced tools allow selecting which comment types to remove (single-line only, multi-line only, or both)."
            },
            {
              question: "What about conditional comments in HTML?",
              answer: "IE conditional comments <!--[if IE]> are special cases. Good HTML comment strippers handle these appropriately."
            },
            {
              question: "Is stripped code still readable?",
              answer: "Without comments and possibly with whitespace removal, code becomes harder to read. Keep original sources for development."
            },
            {
              question: "How much size reduction can I expect?",
              answer: "Heavily commented code might reduce 10-30%. Code with extensive documentation comments can reduce even more."
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
