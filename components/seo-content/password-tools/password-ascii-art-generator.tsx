export default function PasswordAsciiArtGeneratorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool transforms your password or any text into ASCII art - visual representations 
            made entirely from keyboard characters. It's like turning text into a drawing using only letters and symbols.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Character mapping:</strong> Each letter, number, and symbol maps to a predefined pattern of characters that forms its shape.</li>
            <li><strong className="text-foreground">Style selection:</strong> Different font styles (Block, Slant, Small, Bubble) use different character arrangements to create varied visual effects.</li>
            <li><strong className="text-foreground">Line assembly:</strong> The tool builds the output line by line, combining the corresponding row from each character's pattern.</li>
            <li><strong className="text-foreground">Spacing optimization:</strong> Characters are spaced appropriately to maintain readability while keeping the art compact.</li>
          </ol>
          <p className="text-muted-foreground">
            The result is copy-pasteable text art that works anywhere - in code comments, 
            documentation, terminal outputs, or plain text files.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Code Documentation Headers",
              description: "Create eye-catching section headers in code comments that stand out during code reviews."
            },
            {
              title: "Terminal Application Banners",
              description: "Add memorable startup banners to CLI tools and scripts for branding or version identification."
            },
            {
              title: "README File Decoration",
              description: "Make your GitHub README files more visually appealing with ASCII art titles and section dividers."
            },
            {
              title: "Password Memory Aids",
              description: "Create a visual representation of your password that's easier to remember than raw characters."
            },
            {
              title: "Plain Text Presentations",
              description: "Add visual interest to text-only documents, emails, or presentations where images aren't an option."
            },
            {
              title: "Retro Aesthetic Projects",
              description: "Capture the nostalgic feel of early computing in creative projects, games, or digital art."
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
              caveat: "Works best with short text",
              explanation: "ASCII art gets very wide quickly. A 10-character password in Block style creates art about 50 characters wide. Best for words under 15 characters."
            },
            {
              caveat: "Monospace fonts required for proper display",
              explanation: "ASCII art only looks correct in monospace fonts where every character has the same width. In proportional fonts, the alignment breaks."
            },
            {
              caveat: "Limited character support",
              explanation: "Most ASCII art fonts only support basic letters, numbers, and common symbols. Accented characters and emoji won't render properly."
            },
            {
              caveat: "Not for actual password security",
              explanation: "While fun, ASCII art versions of passwords shouldn't be used for security purposes. They're actually easier to shoulder-surf than plain text."
            },
            {
              caveat: "Line breaks matter",
              explanation: "When copying ASCII art, preserve the exact line breaks. Even a single missing newline can completely distort the image."
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
              question: "What's the difference between the font styles?",
              answer: "Block style uses solid block characters for a bold, heavy look. Slant creates an italicized effect with angled lines. Small is compact for space-constrained contexts. Bubble uses circled characters for a playful appearance."
            },
            {
              question: "Can I use this for my actual password?",
              answer: "You can, but it's not recommended for security. ASCII art passwords are harder to type accurately and easier for others to recognize visually. Use it for decoration, not authentication."
            },
            {
              question: "Why do some characters look wrong?",
              answer: "Not all characters have ASCII art representations. Unsupported characters typically render as spaces or simple placeholders. Stick to basic alphanumeric characters for best results."
            },
            {
              question: "How do I preserve the formatting when copying?",
              answer: "Paste into a monospace environment like a code editor, terminal, or markdown code block (triple backticks). Regular text editors and word processors may distort the spacing."
            },
            {
              question: "Can I create multi-line ASCII art?",
              answer: "This tool converts single lines of text. For multi-line art, generate each line separately and combine them. Some characters may need manual adjustment at line boundaries."
            },
            {
              question: "Is there a character limit?",
              answer: "There's no hard limit, but practical usability drops after 20-25 characters. The output becomes extremely wide and may not display properly in all contexts."
            },
            {
              question: "Can I customize the characters used?",
              answer: "This tool uses predefined fonts. For custom ASCII art, you'd need specialized software or to create your own character mappings manually."
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
