import React from "react"

export default function EmojiSliderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Emoji Slider Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Choose a preset scale or create your own. Presets include Rating (sad to happy), Temperature (cold to hot), Size (small to large), and more. Each preset suggests appropriate start and end emoji.
          </p>
          <p>
            Customize your scale by selecting start and end emoji. Set the number of steps - 5 for simple ratings, 10 for detailed scales. Add labels like "Bad" to "Excellent" or "Cold" to "Hot".
          </p>
          <p>
            Choose horizontal or vertical orientation. Toggle labels on or off. Generate your scale and preview it instantly. Copy the emoji sequence or download as an image for use in surveys and presentations.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating customer feedback forms</h3>
            <p className="text-sm text-muted-foreground">
              Replace boring 1-5 stars with emoji scales. Crying face to heart eyes feels more expressive. Customers engage more with visual ratings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building survey questions</h3>
            <p className="text-sm text-muted-foreground">
              Google Forms and SurveyMonkey accept emoji. Create emoji rating scales for satisfaction questions. More fun than standard Likert scales.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making presentation polls</h3>
            <p className="text-sm text-muted-foreground">
              Live audience polling during presentations? Show emoji scales on slides. "Rate this idea" with emoji gets more participation than numbers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing mood tracking apps</h3>
            <p className="text-sm text-muted-foreground">
              Mood tracking needs intuitive scales. Angry to excited emoji scale helps users log feelings quickly. Visual scales reduce cognitive load.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating kids' activity sheets</h3>
            <p className="text-sm text-muted-foreground">
              Kids understand faces better than numbers. "How was your day?" with emoji scale. Teachers and parents get better feedback from children.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Running social media polls</h3>
            <p className="text-sm text-muted-foreground">
              Twitter and Instagram polls can use emoji scales. "Rate our new product" with emoji options. Visual polls get more engagement than text.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Emoji interpretation varies.</strong>
              Not everyone reads emoji the same way. Test your scale with a few people first. Ensure the progression makes sense to your audience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Cultural differences matter.</strong>
              Some emoji mean different things in different cultures. Thumbs up is offensive in some countries. Know your audience's cultural context.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Accessibility considerations apply.</strong>
              Screen readers read emoji names, not emotions. Include text labels for accessibility. Don't rely on emoji alone for critical feedback.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">More steps isn't always better.</strong>
              5-point scales are standard for a reason. 10-point scales cause decision fatigue. Match scale granularity to your needs.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Always include a neutral middle option. Not every experience is positive or negative. A neutral face in the middle captures "it was okay" responses.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the best scale length?</h3>
            <p className="text-sm text-muted-foreground">
              5 points is standard and recommended. 3 points for simple feedback. 7 points for detailed research. More than 7 causes respondent fatigue.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use custom emoji?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Select any emoji for start and end points. Create scales for anything - hunger, energy, pain, satisfaction. Emoji are flexible.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I embed the scale?</h3>
            <p className="text-sm text-muted-foreground">
              Copy the emoji sequence and paste into your form builder. Or download as image and insert. Most platforms accept emoji directly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I include labels?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, for clarity. Labels anchor the scale meaning. "Very Unsatisfied" to "Very Satisfied" removes ambiguity. Especially important for diverse audiences.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I make vertical scales?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Vertical orientation works for mobile-first designs. Horizontal is more common. Choose based on your layout constraints.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are emoji scales scientifically valid?</h3>
            <p className="text-sm text-muted-foreground">
              Research shows emoji scales correlate well with traditional scales. They're valid for most use cases. For academic research, validate for your specific population.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I analyze emoji responses?</h3>
            <p className="text-sm text-muted-foreground">
              Assign numeric values (1-5) to each emoji position. Analyze like traditional Likert data. Calculate averages, track trends over time.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
