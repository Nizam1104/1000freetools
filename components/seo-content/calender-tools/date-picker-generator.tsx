import * as React from "react"

export default function DatePickerGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Configure a custom date picker by setting the minimum and maximum selectable dates, default selected date, and date format (MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD, etc.). Choose whether to show week numbers, highlight weekends, or disable specific days of the week.
          </p>
          <p>
            Add custom disabled dates for holidays, blackout periods, or unavailable slots. Set up recurring disabled patterns like "no weekends" or "every third Monday" for complex scheduling rules.
          </p>
          <p>
            Generate the date picker code in your preferred format - standalone HTML/JavaScript, React component, or integration code for popular frameworks. Copy the generated code and paste it into your project where you need date selection functionality.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Booking Systems</h3>
            <p className="text-sm text-muted-foreground">
              Add date selection to hotel, rental, or appointment booking forms with proper availability constraints.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Event Registration</h3>
            <p className="text-sm text-muted-foreground">
              Let users select event dates or session preferences with validation against available slots.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Form Builders</h3>
            <p className="text-sm text-muted-foreground">
              Embed date pickers in contact forms, surveys, or applications that require date input.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">E-commerce Checkout</h3>
            <p className="text-sm text-muted-foreground">
              Allow customers to select delivery dates or schedule installation appointments during checkout.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">HR Systems</h3>
            <p className="text-sm text-muted-foreground">
              Build time-off request forms, interview schedulers, or onboarding date selectors for employees.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Prototyping</h3>
            <p className="text-sm text-muted-foreground">
              Quickly add functional date pickers to wireframes and prototypes without writing code from scratch.
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
              <strong className="text-foreground">Framework-specific code:</strong> Select the output format that matches your tech stack. React, Vue, and vanilla JavaScript options are available.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Accessibility built-in:</strong> Generated date pickers include keyboard navigation, screen reader support, and ARIA labels for accessibility compliance.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Mobile responsive:</strong> The date picker adapts to different screen sizes and works well on touch devices with appropriately sized tap targets.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Localization options:</strong> Choose from multiple languages and regional date formats to match your audience's expectations.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">No external dependencies:</strong> The vanilla JavaScript version works standalone without requiring jQuery or other libraries.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Can I customize the appearance?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. The generated code includes CSS that you can modify. Color variables are defined at the top for easy theming to match your brand.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I get the selected date value?</h3>
            <p className="text-sm text-muted-foreground">
              The code includes a callback function or event that fires when a date is selected. Access the selected date through the provided event object or ref.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I disable past dates?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Set the minimum date to today's date to prevent selecting any past dates. This is common for booking and appointment systems.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Does it work with form validation?</h3>
            <p className="text-sm text-muted-foreground">
              The date picker integrates with standard HTML form validation. You can mark it as required and it will participate in form submit validation.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I select a date range?</h3>
            <p className="text-sm text-muted-foreground">
              The basic generator creates single-date pickers. For date range selection (start and end dates), generate two pickers and link them with min/max constraints.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I update disabled dates dynamically?</h3>
            <p className="text-sm text-muted-foreground">
              The generated code includes an API to update disabled dates after initialization. Call the provided method with a new list of dates to disable.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Is this free to use commercially?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. The generated code is yours to use without restrictions, attribution, or licensing fees in both personal and commercial projects.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
