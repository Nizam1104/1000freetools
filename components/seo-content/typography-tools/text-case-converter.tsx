import React from "react"

export default function TextCaseConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Text Case Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Type or paste your text into the input field. The tool instantly shows your text in 14 different case formats. Click any result to copy it, or use the quick convert buttons for common cases.
          </p>
          <p>
            Each case follows specific rules. Title case capitalizes major words but not articles or prepositions. Sentence case only capitalizes the first word of each sentence. camelCase removes spaces and capitalizes each word after the first.
          </p>
          <p>
            The conversions handle edge cases like multiple spaces, special characters, and numbers. Punctuation is preserved. The tool works with single words, sentences, or entire paragraphs.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Naming JavaScript variables</h3>
            <p className="text-sm text-muted-foreground">
              You're refactoring legacy code with inconsistent naming. Paste old variable names and convert them to camelCase to match your team's style guide.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing blog post titles</h3>
            <p className="text-sm text-muted-foreground">
              Your CMS requires title case for headlines. Type your draft title and convert it instantly instead of manually capitalizing each word.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating URL slugs</h3>
            <p className="text-sm text-muted-foreground">
              Turn "My Amazing Blog Post" into "my-amazing-blog-post" with kebab-case. Clean URLs improve SEO and are easier to share.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Setting up environment variables</h3>
            <p className="text-sm text-muted-foreground">
              Your .env file needs CONSTANT_CASE format. Convert "database host" to "DATABASE_HOST" without retyping or using find-and-replace.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Formatting Python code</h3>
            <p className="text-sm text-muted-foreground">
              Python convention uses snake_case for functions and variables. Convert your camelCase imports to match PEP 8 standards.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating CSS class names</h3>
            <p className="text-sm text-muted-foreground">
              BEM methodology uses kebab-case like "button--primary". Convert your component names quickly when building a new design system.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Title case has style variations.</strong>
              AP, APA, Chicago, and MLA styles differ on which words to capitalize. This tool uses a common standard but may not match your specific style guide.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Special characters are preserved.</strong>
              Symbols, numbers, and punctuation stay in place. "hello@world.com" becomes "HELLO@WORLD.COM" in uppercase, not "HELLO WORLD COM".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">camelCase and PascalCase differ by one letter.</strong>
              camelCase starts lowercase (myVariable), PascalCase starts uppercase (MyClass). Use camelCase for variables, PascalCase for classes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Alternating case is for fun, not code.</strong>
              aLtErNaTiNg CaSe is a meme format. It's useful for testing case-sensitivity but rarely for production code.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When converting to snake_case or kebab-case from camelCase, the tool splits on capital letters. "XMLParser" becomes "x_m_l_parser" - you may need to fix acronyms manually.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between snake_case and CONSTANT_CASE?</h3>
            <p className="text-sm text-muted-foreground">
              Same format, different case. snake_case is lowercase (my_variable), CONSTANT_CASE is uppercase (MY_VARIABLE). Use CONSTANT_CASE for constants and environment variables.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does sentence case work for multiple sentences?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Each sentence after a period, exclamation mark, or question mark gets capitalized. "hello. world." becomes "Hello. World."
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert database column names?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely. Database columns typically use snake_case. Convert "userName" to "user_name" when migrating from JavaScript to SQL.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens to numbers in the text?</h3>
            <p className="text-sm text-muted-foreground">
              Numbers stay unchanged. "test123" in uppercase is "TEST123". In camelCase, "hello 2 world" becomes "hello2World".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is dot.case used anywhere?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, in some languages. Elixir uses dot.case for module aliases. It's also used in file paths and some configuration formats.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why would I use path/case?</h3>
            <p className="text-sm text-muted-foreground">
              Path/case mirrors directory structures. Converting "user profile settings" to "user/profile/settings" helps generate file paths from labels.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this preserve accented characters?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. "café" converts to "CAFÉ" in uppercase. Accented characters maintain their diacritics through all case transformations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
