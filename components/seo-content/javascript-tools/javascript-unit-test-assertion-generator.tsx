import React from "react"

export default function JavascriptUnitTestAssertionGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the JavaScript Unit Test Assertion Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool generates assertion code for JavaScript unit tests. Select your test framework (Jest, Vitest, Chai, or Node assert), choose the assertion type, enter your actual and expected values, and get ready-to-use assertion code.
          </p>
          <p>
            Different test frameworks have different assertion syntaxes. Jest uses <code>expect(value).toEqual(expected)</code>, Chai uses <code>expect(value).to.equal(expected)</code>, and Node's assert uses <code>assert.strictEqual(actual, expected)</code>. The generator handles all these variations.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Supported assertion types:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li><strong>Equality:</strong> toBe, toEqual, strictEqual</li>
              <li><strong>Truthy/Falsy:</strong> toBeTruthy, toBeFalsy, ok</li>
              <li><strong>Null/Undefined:</strong> toBeNull, toBeUndefined</li>
              <li><strong>Type checks:</strong> toBeInstanceOf, typeof assertions</li>
              <li><strong>Contains:</strong> toContain, includes</li>
              <li><strong>Throws:</strong> toThrow for error testing</li>
              <li><strong>Regex match:</strong> toMatch for pattern testing</li>
              <li><strong>Range checks:</strong> toBeGreaterThan, toBeLessThan</li>
              <li><strong>Length:</strong> toHaveLength for arrays/strings</li>
              <li><strong>Property:</strong> toHaveProperty for object properties</li>
            </ul>
          </div>
          <p>
            Add optional custom messages for clearer failure output. Toggle negation (.not) for inverse assertions. The generated code includes a complete test wrapper example showing how to use the assertion in context.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing tests faster</h3>
            <p className="text-sm text-muted-foreground">
              Instead of looking up assertion syntax every time, generate it instantly. Select "equality", enter your values, copy the assertion. Saves mental context-switching during test-writing sessions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning a new test framework</h3>
            <p className="text-sm text-muted-foreground">
              Switching from Jest to Vitest? The syntax is similar but not identical. Use the generator to learn the new framework's assertion style. Compare outputs to understand differences.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Ensuring consistent test style</h3>
            <p className="text-sm text-muted-foreground">
              Team tests should look consistent. The generator produces standardized assertions. Everyone uses the same syntax for the same checks, making tests easier to read and maintain.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Discovering available assertions</h3>
            <p className="text-sm text-muted-foreground">
              Didn't know Jest has toHaveLength? Browse the assertion types to discover what's available. Learn about assertions you didn't know existed, then use them in your tests.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing negative test cases</h3>
            <p className="text-sm text-muted-foreground">
              Need to test that something does NOT happen? Toggle the "negate" option. The generator adds .not automatically, creating assertions like expect(value).not.toBeNull().
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating test documentation</h3>
            <p className="text-sm text-muted-foreground">
              Writing testing guidelines for your team? Generate example assertions for each type. Include them in documentation as reference examples for common testing scenarios.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">toEqual vs toBe matters in Jest.</strong>
              toBe uses Object.is (strict equality). toEqual does deep comparison for objects/arrays. Use toBe for primitives, toEqual for complex values. The generator helps you choose correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Custom messages aren't supported everywhere.</strong>
              Jest doesn't support custom assertion messages. Chai and Node assert do. The generator includes messages where supported, omits them for frameworks that don't support them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Async testing needs special handling.</strong>
              Testing async code? Wrap assertions appropriately. For Jest: <code>await expect(promise).resolves.toEqual(value)</code> or <code>rejects.toThrow()</code>. This generator creates basic assertions, not async wrappers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Snapshot testing isn't covered.</strong>
              Snapshot assertions (toMatchSnapshot) are a different pattern. This generator focuses on value assertions. Use Jest's snapshot feature directly for UI/component testing.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For object comparisons, consider toMatchObject for partial matching. Tests are more resilient to unrelated object changes when you only assert on relevant properties.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between Jest and Vitest assertions?</h3>
            <p className="text-sm text-muted-foreground">
              Vitest is designed to be Jest-compatible. Most assertions are identical: expect(value).toEqual(expected) works in both. Minor differences exist in async handling and some matchers, but 95% is interchangeable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I use Chai over Jest assertions?</h3>
            <p className="text-sm text-muted-foreground">
              Chai is framework-agnostic - works with Mocha, Jasmine, etc. Jest has built-in assertions. If you're using Jest, use Jest assertions. If using Mocha or another runner, Chai is a good choice.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I test for undefined?</h3>
            <p className="text-sm text-muted-foreground">
              Use the Null/Undefined assertion type. Generates toBeUndefined() in Jest or strictEqual(value, undefined) in Node assert. Don't use toEqual(undefined) - toBeUndefined is clearer.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I chain multiple assertions?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but each assertion is a separate statement. Generate each assertion you need, then combine them in your test. One assertion per line is clearer than complex chained expectations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if my framework isn't listed?</h3>
            <p className="text-sm text-muted-foreground">
              Select the closest match. Jasmine uses Jest-like syntax. Should.js uses Chai-like syntax. Or use Node assert as a baseline and adapt the output to your framework's specific syntax.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I test approximate values (floats)?</h3>
            <p className="text-sm text-muted-foreground">
              Jest has toBeCloseTo for floating point comparison. For other frameworks, assert the value is within a range: expect(value).toBeGreaterThan(min) and expect(value).toBeLessThan(max).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should assertions have custom messages?</h3>
            <p className="text-sm text-muted-foreground">
              For simple tests, no - the test name should explain what's being tested. For complex tests or when the same assertion runs multiple times (in loops), custom messages help identify which case failed.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
