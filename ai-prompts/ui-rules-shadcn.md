UI GENERATION PROMPT — TOOL UI SYSTEM
Design a functional, beautiful, and immediately usable tool UI. This is not a marketing page. Every visual decision must serve the user's task — but "functional" is not an excuse for ugly. The best tool UIs are both frictionless and visually confident.

1. CORE UX PHILOSOPHY
Think like a power user. Design for a first-time user. Make it beautiful for both.

The tool's primary action must be immediately obvious — no scrolling, no hunting
Use progressive disclosure: show only what the user needs right now; reveal complexity on demand
Every element must earn its place. If removing it doesn't break the flow, remove it
Prefer inline interactions over modals and popovers unless absolutely necessary
Labels, placeholders, and helper text should anticipate confusion before it happens
The UI should feel crafted, not generated — spacing, alignment, and contrast should feel intentional at every level


2. VISUAL IDENTITY & AESTHETIC
Commit to a clear visual language. Don't be neutral — be deliberate.

Choose a typographic hierarchy that creates immediate visual clarity:

One strong tool title (larger, heavier weight)
One muted descriptor line beneath it
Input labels are medium weight, never bold — they guide, not shout


Spacing is design: use generous padding inside interactive zones; tight spacing signals grouping
Use subtle surface variation to create depth without shadows:

bg-muted strips to visually anchor input zones
A faint border-border on the container edge to separate from the page
border-b separators between logical sections instead of cards


Micro-refinements that separate good from great:

Consistent border-radius across all interactive elements
Input focus states with a clearly visible ring-ring — never invisible
Icon + label alignment is always vertically centered, never approximate
Button text is never all-caps unless the design system demands it




3. LAYOUT RULES
Never use Cards as generic containers. Cards are only for discrete, comparable, selectable items (e.g. a result list, a plan selector). They are NOT wrappers for sections, forms, or tool panels.
Instead use:

Whitespace and visual weight to create separation — padding, border-b, subtle bg-muted strips
Inline layouts: label left, control right — not stacked cards of stacked cards
A single-column flow for forms and tools — top to bottom, one decision at a time
Two-column grids only when genuinely comparing two things or showing input → output side by side
The page should feel like a well-designed web app, not a dashboard of floating boxes

Layout archetypes by tool type:
Tool TypeLayout PatternSingle input → outputStacked: input area, action button, output zone belowMulti-step wizardStep indicator at top, one step visible, prev/next at bottomSettings/config panelLabeled rows with border-b, toggle/select on the rightComparison or diffTwo-column with a clear dividing line, synced scrollData input formSingle column, grouped by <section> with heading + separator

4. COMPONENT DISCIPLINE
Use shadcn/ui components — but use the right component for the right job:
NeedUsePrimary actionButton — full-width on mobile, fixed width on desktopText inputInput or Textarea with a visible label aboveChoice ≤ 4 optionsTabs or SegmentedControl-style button groupChoice 5+ optionsSelectBoolean togglesSwitch with an inline label and descriptionStatus / feedbackInline text with semantic color — never a CardGrouped settings<section> with heading + border-t separatorComparable resultsCards are appropriate hereCounts / metadataSmall text-muted-foreground inline — not a badge unless actionable
Hard rules:

Never nest Cards
Never use a Card just to add a border around content
Never use a Tooltip as the only source of critical information
Never put helper text inside a Toast — it disappears before they read it


5. STYLE & THEME
Use only these semantic Tailwind/CSS variable classes:
TokenUsebg-background, text-foregroundPage basebg-muted, text-muted-foregroundSecondary zones, hints, helper textbg-primary, text-primary-foregroundOne clear call to actionbg-accent, text-accent-foregroundHover states, subtle highlightsbg-destructive, text-destructive-foregroundErrors onlyborder-borderDividers and input bordersring-ringFocus states
No gradients. No decorative illustrations. Shadows only as shadow-sm sparingly on floating elements.
Typography rules:

One clear heading — tool name or current step
Muted subtext for context or instructions, text-sm text-muted-foreground
Input labels always visible — never rely solely on placeholders
Use font-mono for output values, code, hashes, or anything the user will copy
Numeric outputs should be larger and heavier than surrounding context — make the result feel like a result

Color use:

Accent color appears in at most 2–3 places per screen — primary button, active state, and one highlight
Error red appears only on actual errors — never for warnings or info
If the tool has a "result" state, the result zone should feel visually distinct from the input zone — a subtle bg-muted background or a faint top border is enough


6. INTERACTION PATTERNS

Instant feedback: results appear inline below the trigger, not in a modal
Error states: shown inline near the field, in text-destructive, not in a toast
Loading: a simple spinner or disabled button state — no skeleton loaders unless content is genuinely unpredictable in size
Empty states: a single centered line of text-muted-foreground, nothing more
Success: a subtle inline confirmation — a checkmark icon + short message, not a celebration modal
Copy actions: show a Check icon replacing the Copy icon for 1.5s — no toast needed
Destructive actions: require a second confirmation inline (e.g. button label changes to "Are you sure?") — not a modal


7. ACCESSIBILITY & RESPONSIVENESS

All inputs have <label> elements — not just placeholders
Tab order follows visual order
Buttons have clear, action-oriented labels: "Generate", "Copy", "Analyze" — never "Submit" or "Go"
Minimum tap target: 44px
Mobile: single column, full-width inputs, sticky primary button if the output is below the fold
Every icon-only button has an aria-label
Color is never the only indicator of state — pair it with an icon or label


8. OUTPUT FORMAT
React + Tailwind + shadcn/ui. Single file. Semantic HTML. No inline styles unless unavoidable.

9. SELF-CHECK BEFORE OUTPUTTING
Before finalizing, verify against this checklist:
UX checks:

 Is the primary action visible without scrolling?
 Is there any element a user would ignore or be confused by?
 Are there more than 2 levels of visual nesting anywhere?
 Does every interactive element have a clear label?

Visual checks:

 Does any Card exist that could be replaced with spacing + a separator?
 Is spacing consistent — does it feel measured, not accidental?
 Does the result zone feel visually distinct from the input zone?
 Are there more than 3 accent-colored elements on screen at once?
 Does the UI look good in both light and dark mode?

Quality bar:

 Does this look like it was designed by a human who cares, or auto-generated?
 Would a power user find it fast? Would a first-time user find it obvious?
 Does the layout feel like a tool, or like a dashboard?

If any answer is wrong, revise before outputting.
