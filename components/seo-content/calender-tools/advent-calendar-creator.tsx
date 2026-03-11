import * as React from "react"

export default function AdventCalendarCreatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Create a custom digital advent calendar by setting a title, year, and start date. The calendar comes pre-populated with 24 default messages, one for each day leading up to Christmas. Click on any door in edit mode to customize its message and choose from eight festive colors.
          </p>
          <p>
            Toggle between edit mode and preview mode to see how your calendar will look to others. In preview mode, doors unlock one per day starting from your selected start date. You can also enable "Allow Future Doors" to let people peek ahead if you prefer.
          </p>
          <p>
            When finished, download your calendar as a standalone HTML file or copy the embed code to place it on any website. The downloaded file works offline and can be shared via email or messaging apps. A share code is also generated for other users of this tool to import your calendar settings.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Family Holiday Tradition</h3>
            <p className="text-sm text-muted-foreground">
              Create a personalized advent calendar with family inside jokes, photos, and special messages for each day.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Classroom Activities</h3>
            <p className="text-sm text-muted-foreground">
              Teachers can create educational advent calendars with daily learning activities, riddles, or fun facts for students.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Marketing Campaigns</h3>
            <p className="text-sm text-muted-foreground">
              Brands can build interactive advent calendars with daily deals, product reveals, or exclusive content for customers.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Long-Distance Relationships</h3>
            <p className="text-sm text-muted-foreground">
              Share a digital advent calendar with loved ones far away, revealing a new message or memory each day.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Church or Community Groups</h3>
            <p className="text-sm text-muted-foreground">
              Create faith-based advent calendars with daily scriptures, reflections, or community challenges.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Remote Team Building</h3>
            <p className="text-sm text-muted-foreground">
              Build team spirit with a work-friendly advent calendar featuring daily trivia, recognition, or small challenges.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Default start date is December 1st:</strong> You can change this to start earlier or later, but the traditional advent calendar runs from December 1st through December 24th.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Images require URLs:</strong> If selecting image type for a door, you'll need to provide a direct image URL. The tool doesn't host images - they must be hosted elsewhere.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">HTML file is self-contained:</strong> The downloaded HTML includes all content inline. Recipients don't need internet access to view messages, but external images won't load offline.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Edit mode vs preview mode:</strong> Edit mode lets you modify doors. Preview mode simulates the user experience where doors unlock daily. Always preview before sharing.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Share code is for tool users only:</strong> The share code (base64 encoded) only works when imported by someone else using this same advent calendar creator tool.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Can I start the calendar on a different date?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Change the start date in the settings. Doors will unlock one per day from that date forward. This is useful for creating countdowns to events other than Christmas.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I add images to doors?</h3>
            <p className="text-sm text-muted-foreground">
              Select a door in edit mode, change the content type to "Image," and provide a direct URL to an image hosted online (like Imgur, Google Photos, or your own server). The image will display when the door is opened.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can people open doors before their day?</h3>
            <p className="text-sm text-muted-foreground">
              By default, no - doors unlock one per day. However, you can enable "Allow Future Doors" in edit mode if you want people to be able to peek ahead or open doors at their own pace.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I share the calendar with others?</h3>
            <p className="text-sm text-muted-foreground">
              Download the HTML file and send it via email or messaging, or copy the embed code to add it to a website. The HTML file works in any modern browser and can be opened directly.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I reuse last year's calendar?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Save your share code or keep the HTML file. To make changes, import the share code back into this tool, edit as needed, and generate a new calendar for the current year.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Is there a limit to how many calendars I can create?</h3>
            <p className="text-sm text-muted-foreground">
              No limit. Create as many calendars as you like. Each download is independent, so you can make different calendars for different families, groups, or purposes.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I print this calendar?</h3>
            <p className="text-sm text-muted-foreground">
              The digital calendar is designed for screen viewing. For a printable version, you'd need to modify the HTML CSS or use a different tool specifically designed for printable advent calendars.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
