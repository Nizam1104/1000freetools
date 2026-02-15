The Problem
You will generate generic output. Your training has seen thousands of dashboards. The patterns are strong. You can follow the entire process below — explore the domain, name a signature, state your intent — and still produce a template. Warm colors on cold structures. Friendly fonts on generic layouts.
This happens because intent lives in prose, but code generation pulls from patterns. The gap between them is where defaults win.
You have to catch yourself.

Where Defaults Hide
Defaults don't announce themselves. They disguise themselves as infrastructure — the parts that feel like they just need to work, not be designed.
Typography feels like a container. Pick something readable, move on. But typography isn't holding your design — it IS your design. The weight of a headline, the personality of a label, the texture of a paragraph shape how the product feels before anyone reads a word.
Navigation feels like scaffolding. Build the sidebar, add the links, get to the real work. But navigation isn't around your product — it IS your product. Where you are, where you can go, what matters most.
Data feels like presentation. You have numbers, show numbers. But a number on screen is not design. The question is: what does this number mean to the person looking at it? What will they do with it?
Token names feel like implementation detail. But your CSS variables are design decisions. --ink and --parchment evoke a world. --gray-700 and --surface-2 evoke a template.
The trap is thinking some decisions are creative and others are structural. There are no structural decisions. Everything is design.

Intent First
Before touching code, answer these out loud:
Who is this human? Not "users." The actual person. Where are they when they open this? What's on their mind? A teacher at 7am with coffee is not a developer debugging at midnight is not a founder between investor meetings.
What must they accomplish? Not "use the dashboard." The verb. Grade these submissions. Find the broken deployment. Approve the payment.
What should this feel like? Say it in words that mean something. "Clean and modern" means nothing. Warm like a notebook? Cold like a terminal? Dense like a trading floor? Calm like a reading app?
If you cannot answer these with specifics, stop. Ask the user. Do not guess. Do not default.
Every Choice Must Be A Choice
For every decision, you must be able to explain WHY.

Why this layout and not another?
Why this color temperature?
Why this typeface?
Why this spacing scale?
Why this information hierarchy?

If your answer is "it's common" or "it's clean" or "it works" — you haven't chosen. You've defaulted.
The test: If you swapped your choices for the most common alternatives and the design didn't feel meaningfully different, you never made real choices.
Sameness Is Failure
If another AI, given a similar prompt, would produce substantially the same output — you have failed.
This is not about being different for its own sake. It's about the interface emerging from the specific problem, the specific user, the specific context.
Intent Must Be Systemic
Saying "warm" and using cold colors is not following through. Intent is not a label — it's a constraint that shapes every decision.
If the intent is warm: surfaces, text, borders, accents — all warm.
If the intent is dense: spacing, type size, information architecture — all dense.
If the intent is calm: motion, contrast, color saturation — all calm.
Check your output against your stated intent. Does every token reinforce it?

Product Domain Exploration
This is where defaults get caught — or don't.
Generic output: Task type → Visual template → Theme
Crafted output: Task type → Product domain → Signature → Structure + Expression
Required Outputs
Do not propose any direction until you produce all four:
Domain: Concepts, metaphors, vocabulary from this product's world. Not features — territory. Minimum 5.
Color world: What colors exist naturally in this product's domain? If this product were a physical space, what would you see? What colors belong there that don't belong elsewhere? List 5+.
Signature: One element — visual, structural, or interaction — that could only exist for THIS product. If you can't name one, keep exploring.
Defaults: 3 obvious choices for this interface type — visual AND structural. You can't avoid patterns you haven't named.
Proposal Requirements
Your direction must explicitly reference:

Domain concepts you explored
Colors from your color world exploration
Your signature element
What replaces each default

The test: Read your proposal. Remove the product name. Could someone identify what this is for? If not, it's generic. Explore deeper.

The Mandate
Before showing the user, look at what you made.
Ask yourself: "If they said this lacks craft, what would they mean?"
That thing you just thought of — fix it first.
The Checks
Run these against your output before presenting:

The swap test: If you swapped the typeface for your usual one, would anyone notice? If you swapped the layout for a standard dashboard template, would it feel different?
The squint test: Blur your eyes. Can you still perceive hierarchy? Is anything jumping out harshly? Craft whispers.
The signature test: Can you point to five specific elements where your signature appears? Not "the overall feel" — actual components.
The token test: Read your CSS variables out loud. Do they sound like they belong to this product's world, or could they belong to any project?

If any check fails, iterate before showing.

Craft Foundations
Subtle Layering
You should barely notice the system working. The craft is invisible — that's how you know it's working.
Surface Elevation
Surfaces stack. A dropdown sits above a card which sits above the page. Build elevation using the theme's CSS variables (bg-background, bg-card, bg-popover, etc.).
Each jump should be only a few percentage points of lightness. You can barely see the difference in isolation. But when surfaces stack, the hierarchy emerges.
Key decisions:

Sidebars: Same background as canvas, not different. Use border separation.
Dropdowns: One level above their parent surface using bg-popover.
Cards: Slightly different from canvas using bg-card.

Borders
Borders should disappear when you're not looking for them. Use the theme's border variables (border, border-muted). Match intensity to the importance of the boundary.
The squint test: Blur your eyes at the interface. You should still perceive hierarchy — what's above what, where sections divide. But nothing should jump out. No harsh lines.
Infinite Expression
Every pattern has infinite expressions. No interface should look the same.
A metric display could be a hero number, inline stat, sparkline, gauge, progress bar, comparison delta, trend badge, or something new.
Before building, ask:

What's the ONE thing users do most here?
What products solve similar problems brilliantly? Study them.
Why would this interface feel designed for its purpose, not templated?

NEVER produce identical output. Same sidebar width, same card grid, same metric boxes every time — this signals AI-generated immediately.
Linear's cards don't look like Notion's. Vercel's metrics don't look like Stripe's. Same concepts, infinite expressions.
Color Lives Somewhere
Every product exists in a world. That world has colors.
Before you reach for a palette, spend time in the product's world. What would you see if you walked into the physical version of this space?
Work within the theme system: Use the CSS variables from app/global.css (bg-background, text-foreground, bg-card, border, primary, destructive, etc.), but customize them to match your product's world. Don't just accept the defaults.
Beyond Warm and Cold: Temperature is one axis. Is this quiet or loud? Dense or spacious? Serious or playful? Geometric or organic?
Color Carries Meaning: Gray builds structure. Color communicates — status, action, emphasis, identity. One accent color, used with intention, beats five colors used without thought.

shadcn/ui Component Philosophy
Use Components Intentionally
shadcn/ui provides: Button, Input, Card, Dropdown Menu, Sheet, Select, Tabs, Dialog, and more.
Use them, but design HOW you use them:

A Card can hold a metric, a plan comparison, a settings group, or a data visualization — each should feel structurally different.
A Button can be primary, secondary, ghost, outline, destructive — choose based on hierarchy and intent, not convenience.
Layout patterns matter: vertical stacks, grids, flexible containers. The same components arranged differently create entirely different experiences.

Minimalism ≠ Generic
The UI must be:

Clean
Ultra-simple
Highly usable
Distraction-free
Tools-website aesthetic

But this does NOT mean:

Same layout every time
Same component patterns every time
No personality
No considered design decisions

Minimalism is about clarity of purpose. Every element should have a reason to exist. But within that clarity, there is infinite room for craft.
No Visual Noise
Avoid:

Gradients (unless they serve the product's world)
Heavy shadows
Unnecessary artwork or illustrations
Decorative animations
Cluttered layouts
Multiple accent colors

Keep:

Comfortable, balanced spacing
Clear hierarchy
Obvious primary actions
Generous tap/click areas
Proper contrast using theme colors
Minimal, functional animations only when necessary

Accessibility & UX Standards
Every interface must have:

Clear headings and labels
Obvious primary button (using variant="default" for primary actions)
Generous tap/click areas (min 44×44px)
Logical spacing (no dense UI)
Mobile-first responsiveness
Proper semantic HTML
Legible text with proper contrast


Design Principles
Token Architecture
Every color in your interface should trace back to the theme variables:

bg-background, bg-card, bg-popover (surface elevation)
text-foreground, text-muted-foreground (text hierarchy)
border, border-muted (separation hierarchy)
primary, primary-foreground (brand/accent)
destructive, warning, success (semantic)

Customize these variables to fit your product's world. Don't just use the defaults.
Text Hierarchy
Use the theme's text variables to build four levels:

text-foreground — primary text
text-muted-foreground — secondary text, metadata
Custom lighter values — tertiary, disabled/placeholder

If you're only using two, your hierarchy is too flat.
Spacing
Tailwind spacing scale: space-1 through space-12, space-16, space-20, etc.
Build a scale for different contexts:

Micro spacing (space-1, space-2) for icon gaps
Component spacing (space-4, space-6) within buttons and cards
Section spacing (space-8, space-12) between groups
Major separation (space-16, space-20) between distinct areas

Random values signal no system.
Depth Strategy
Choose ONE approach and commit:

Borders-only — Clean, technical. Use theme borders (border). For dense tools.
Subtle shadows — Soft lift. Use Tailwind's subtle shadow utilities (shadow-sm). For approachable products.
Layered surfaces — Background tints using bg-card, bg-popover establish hierarchy without shadows.

shadcn/ui defaults to subtle shadows on cards and popovers. You can keep this or strip it down to borders-only.
Border Radius
Tailwind's radius scale: rounded-sm, rounded, rounded-md, rounded-lg, rounded-xl.
Sharper feels technical. Rounder feels friendly.
Build a scale:

Small (rounded or rounded-md) for inputs and buttons
Medium (rounded-lg) for cards
Large (rounded-xl) for modals and sheets

shadcn/ui components use CSS variables for radius (--radius). Customize this value to match your intent.
Typography
shadcn/ui uses CSS variables for fonts (--font-sans, --font-mono).
Build distinct levels:

Headlines — need weight and tight tracking (text-2xl font-semibold tracking-tight)
Body — comfortable weight for readability (text-base)
Labels — medium weight that works at smaller sizes (text-sm font-medium)
Data — monospace with tabular numbers (font-mono tabular-nums)

Don't rely on size alone — combine size, weight, and letter-spacing.
Component Patterns
A metric card doesn't have to look like a plan card doesn't have to look like a settings card.
Design each card's internal structure for its specific content — but keep the surface treatment consistent: same border weight, shadow depth, corner radius, padding scale.
Example: shadcn's Card component has CardHeader, CardTitle, CardDescription, CardContent, CardFooter. You can use all of these, some of these, or none of these. You can nest grids, flexboxes, custom layouts inside CardContent.
States
Every interactive element needs states: default, hover, active, focus, disabled.
shadcn/ui components handle this automatically for buttons, inputs, selects, etc. But when building custom layouts, ensure:

Hover states are subtle but present
Focus states are clear (visible focus ring)
Disabled states are visually distinct (reduced opacity, text-muted-foreground)

Data needs states too: loading, empty, error. Missing states feel broken.
Navigation & Context
Screens need grounding. A data table floating in space feels like a component demo, not a product.
Include:

Navigation showing where you are in the app
Location indicators (breadcrumbs, active nav items)
User context (avatar, account menu)

When building sidebars: same background as main content with border separation rather than different colors. This prevents fragmenting the visual space.

Avoid

Harsh borders — if borders are the first thing you see, they're too strong
Dramatic surface jumps — elevation changes should be whisper-quiet
Inconsistent spacing — the clearest sign of no system
Mixed depth strategies — pick one approach and commit
Missing interaction states — hover, focus, disabled, loading, error
Dramatic drop shadows — shadows should be subtle (if used at all)
Large radius on small elements — keep radius proportional to element size
Pure white cards on colored backgrounds — use subtle elevation instead
Thick decorative borders — borders are for structure, not decoration
Gradients and color for decoration — color should mean something
Multiple accent colors — dilutes focus
Different hues for different surfaces — keep the same hue, shift only lightness


Before Writing Code
Every time you write UI code — even small additions — state:
Intent: [who is this human, what must they do, how should it feel]
Palette: [colors from your exploration — mapped to theme variables]
Depth: [borders / shadows / layered — and WHY this fits the intent]
Typography: [your typeface choices — and WHY they fit the intent]
Spacing: [your base unit and scale]
This checkpoint is mandatory. It forces you to connect every technical choice back to intent.
If you can't explain WHY for each choice, you're defaulting. Stop and think.

Implementation Standards
Code Quality

Use React + Tailwind + shadcn/ui
Use semantic HTML
Keep code clean, minimal, easy to modify
Mobile-first responsiveness
Use only the color variables defined in app/global.css

Tone of the Design
The UI must feel:

Professional
Tool-focused
Calm
Fast
Trustworthy
Zero visual noise

Layout Principles

Prioritize clarity and speed
The primary action or tool must appear above the fold
Use simple layout patterns: vertical stacks, grids, cards
Never clutter. Prefer fewer elements with better hierarchy
All text must be legible with proper contrast using theme colors


Workflow
Exploration Phase

Explore domain — Produce all four required outputs (Domain, Color world, Signature, Defaults)
Propose direction — Must reference all four outputs
Confirm — Get user buy-in

Build Phase

Build — Apply principles, use shadcn/ui components intentionally
Evaluate — Run the mandate checks before showing:

The swap test
The squint test
The signature test
The token test


Iterate — If any check fails, fix before showing

After Completion
When you finish building something, evaluate your work:

Does this feel designed for its specific purpose, or could it be any tool?
If I swapped the layout for a standard template, would it feel different?
Can I point to five places where my signature appears?
Do the theme variables I customized sound like they belong to this product's world?

If any answer is unsatisfying, iterate.

The Standard
Your output should be:

Immediately recognizable as designed for THIS specific product
Structurally sound using shadcn/ui components
Visually quiet but deeply considered
Fast and usable above all else
Impossible to confuse with generic AI output

If someone looks at your interface and says "nice template," you have failed.
The goal is not to be flashy. The goal is to be inevitable — the interface that couldn't exist for any other product.
