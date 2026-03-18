import React from "react"

export default function AdventCalendarCreatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Advent Calendar Creator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Name your advent calendar and select the year. The calendar includes 24 doors numbered 1-24, representing December 1st through Christmas Eve.
          </p>
          <p>
            Customize each door by clicking on it in the editor section. Enter a surprise message, activity, or treat idea for each day. Choose from 8 different door colors.
          </p>
          <p>
            Click any door in the main grid to reveal or hide its content. This interactive feature lets you preview what recipients will see each day.
          </p>
          <p>
            Export the calendar as a JSON file to save your work or share with others. Import the file later to continue editing or use the calendar.
          </p>
          <p>
            Reset all doors to default content with one click. Start fresh if you want to create entirely new surprises for each day.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Family Christmas tradition</h3>
            <p className="text-sm text-muted-foreground">
              Create personalized daily surprises for kids. Include activities like baking cookies, watching movies, or driving to see lights. Build Christmas excitement.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Classroom holiday activities</h3>
            <p className="text-sm text-muted-foreground">
              Plan daily classroom activities for December. Include educational content, crafts, and holiday traditions. Keeps students engaged before winter break.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Long-distance relationship connection</h3>
            <p className="text-sm text-muted-foreground">
              Share a digital advent calendar with a partner far away. Each day reveals a message, memory, or virtual date idea. Stay connected during the holidays.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Workplace team building</h3>
            <p className="text-sm text-muted-foreground">
              Create daily team activities or recognition. Include small challenges, appreciation notes, or holiday trivia. Boost morale during the busy season.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sunday school or religious education</h3>
            <p className="text-sm text-muted-foreground">
              Include Bible verses, nativity story elements, or faith-based activities. Teach the religious meaning of Advent. Prepare hearts for Christmas.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Self-care December challenge</h3>
            <p className="text-sm text-muted-foreground">
              Plan daily self-care activities for yourself. Include relaxation, reflection, and treats. Make December about wellness, not just stress.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Advent traditionally starts on the fourth Sunday before Christmas.</strong>
              This calendar uses December 1-24 for simplicity. Traditional Advent calendars vary in length based on when Sundays fall. This version ensures 24 consistent days.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Content is entirely customizable.</strong>
              Each door can contain any text - messages, activities, jokes, recipes, or gift ideas. Make it age-appropriate and relevant to your recipients.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Colors help organize content types.</strong>
              Use different colors for different types of content - activities in one color, treats in another, messages in a third. Creates visual variety.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Export preserves your work.</strong>
              Always export before closing the browser. The JSON file contains all your custom content. Import it anytime to restore your calendar.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Mix content types for variety - some days offer activities, others have treats, jokes, or kind messages. This keeps the calendar exciting throughout December.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What should I put in each door?</h3>
            <p className="text-sm text-muted-foreground">
              Ideas include: small candies, stickers, notes with activities, Bible verses, jokes, riddles, craft ideas, recipe cards, or coupons for experiences. Tailor to your audience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I print this calendar?</h3>
            <p className="text-sm text-muted-foreground">
              This is a digital calendar. For physical advent calendars, print the door contents and place them in numbered envelopes or boxes. Arrange in order for daily opening.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I share this with family?</h3>
            <p className="text-sm text-muted-foreground">
              Export the JSON file and share it. Family members can import it to see all the surprises. Or gather together and open one digital door each day.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for other countdowns?</h3>
            <p className="text-sm text-muted-foreground">
              While designed for Advent, you could adapt it for any 24-day countdown. Rename it for birthdays, vacations, or other special events leading up to a date.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What age is this appropriate for?</h3>
            <p className="text-sm text-muted-foreground">
              All ages! Young children love simple treats and activities. Teens enjoy jokes and challenges. Adults appreciate self-care ideas and nostalgic traditions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add images or videos?</h3>
            <p className="text-sm text-muted-foreground">
              This version supports text only. For multimedia, include links to videos or describe images in text. Consider pairing with physical items for a complete experience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I start using the calendar?</h3>
            <p className="text-sm text-muted-foreground">
              Start December 1st and open one door each day through Christmas Eve (December 24). Some families open doors in the morning, others at dinner or bedtime.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
