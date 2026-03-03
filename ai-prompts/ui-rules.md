UI GENERATION PROMPT
Design a clean, ultra-simple, highly usable UI.
Follow these rules strictly:
1) STYLE & THEME
Use only the color variables defined in `app/globals.css`. Reference them via Tailwind utility classes:
   - `bg-background`, `text-foreground` — Main page background and text
   - `bg-card`, `text-card-foreground` — Card surfaces
   - `bg-primary`, `text-primary-foreground` — Primary actions/buttons
   - `bg-secondary`, `text-secondary-foreground` — Secondary elements
   - `bg-muted`, `text-muted-foreground` — Subtle/hint text
   - `bg-accent`, `text-accent-foreground` — Accents/highlights
   - `bg-destructive`, `text-destructive-foreground` — Errors/danger
   - `border-border` — Borders and dividers
   - `bg-input`, `bg-popover` — Form inputs and popovers
   - `ring-ring` — Focus rings

The UI must follow a minimalistic, distraction-free, tools-website aesthetic.
Avoid gradients, heavy shadows, unnecessary artwork, illustrations, or animations.
Keep spacing comfortable, balanced, and modern (Tailwind-style).
2) COMPONENTS
Use shadcn/ui components wherever applicable (Button, Input, Card, Dropdown, Sheet, Select, Tabs, Dialog, etc.).
Keep component styling consistent with the shadcn system and the theme colors.
3) LAYOUT PRINCIPLES
Prioritize clarity and speed.
The primary action or tool must appear above the fold.
Use simple layout patterns: vertical stacks, grids, cards.
Never clutter. Prefer fewer elements with better hierarchy.
All text should be legible with proper contrast using the theme colors.
4) ACCESSIBILITY & UX
Clear headings and labels
Obvious primary button
Generous tap/click area
Logical spacing (no dense UI)
Mobile-first responsiveness
No fancy animations unless minimal & functional
5) OUTPUT FORMAT
Provide UI using React + Tailwind + shadcn/ui.
Use semantic HTML.
Keep code clean, minimal, easy to modify.
6) TONE OF THE DESIGN
Professional
Tool-focused
Calm
Fast
Trustworthy
Zero visual noise
