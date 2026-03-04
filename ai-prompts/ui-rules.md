UI GENERATION PROMPT
Design a clean, ultra-simple, highly usable tool UI. This is a functional tool, not a marketing page. Every design decision must serve the user's task.

1. CORE UX PHILOSOPHY
   Think like a power user, design for a first-time user.

The tool's primary action must be immediately obvious — no scrolling, no hunting
Use progressive disclosure: show only what the user needs right now; reveal complexity on demand
Every element must earn its place. If removing it doesn't break the flow, remove it
Prefer inline interactions over modals and popovers unless absolutely necessary
Labels, placeholders, and helper text should anticipate confusion before it happens

2. LAYOUT RULES
   Never use Cards as generic containers. Cards are only for discrete, comparable, selectable items (e.g. a list of results, a plan selector). They are NOT wrappers for sections, forms, or tool panels.
   Instead, use:

Whitespace and visual weight to create separation (padding, border-b, subtle bg-muted strips)
Inline layouts: label left, control right — not stacked cards of stacked cards
A single-column flow for forms and tools — top to bottom, one decision at a time
Two-column grids only when genuinely comparing two things or showing input → output

The page should feel like a well-designed web app, not a dashboard of floating boxes.

3. COMPONENT DISCIPLINE
   Use shadcn/ui components, but use the right component for the job:
   NeedUsePrimary actionButton (full-width on mobile, fixed width on desktop)Text inputInput or Textarea with a visible label aboveChoice between optionsTabs (≤4 options) or Select (5+ options)TogglesSwitch with inline labelStatus/feedbackInline text with color, not a CardGrouped settingsA <section> with a heading + border-t separator, NOT a CardComparable resultsCards are appropriate here
   Never nest Cards. Never use Cards just to add a border around content.

4. STYLE & THEME
   Use only these Tailwind/CSS variable classes:

bg-background, text-foreground — page base
bg-muted, text-muted-foreground — secondary zones, hints, helper text
bg-primary, text-primary-foreground — one clear call to action
bg-accent, text-accent-foreground — hover states, subtle highlights
bg-destructive, text-destructive-foreground — errors only
border-border — dividers and input borders
ring-ring — focus states

No gradients. No shadows (except shadow-sm sparingly). No decorative illustrations.
Typography:

One clear heading (tool name or current step)
Muted subtext for context or instructions
Input labels are always visible (never rely solely on placeholders)

5. INTERACTION PATTERNS

Instant feedback: results appear inline below the trigger, not in a modal
Error states: shown inline near the field, in text-destructive, not in a toast
Loading: a simple spinner or disabled button state — no skeleton loaders unless content is genuinely unpredictable in size
Empty states: a single line of text-muted-foreground text, nothing more
Success: a subtle inline confirmation, not a celebration

6. ACCESSIBILITY & RESPONSIVENESS

All inputs have <label> elements (not just placeholders)
Tab order follows visual order
Buttons have clear, action-oriented labels ("Generate", "Copy", "Analyze" — not "Submit" or "Go")
Minimum tap target: 44px
Mobile layout: single column, full-width inputs, sticky primary button if needed

7. OUTPUT FORMAT
   React + Tailwind + shadcn/ui. Single file. Semantic HTML. No inline styles unless unavoidable.

8. SELF-CHECK BEFORE OUTPUTTING
   Before finalizing, verify:

Is the primary action visible without scrolling?
Does any Card exist that could be replaced with spacing + a separator?
Is there any element a user would ignore or be confused by?
Are there more than 2 levels of visual nesting anywhere?
Does the layout feel like a tool, or like a dashboard?

If any answer is wrong, revise before outputting.
