import * as React from "react"

export default function AcademicCalendarMakerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Build a complete academic calendar by defining terms (semesters, quarters, or trimesters), adding important dates like first day of classes, add/drop deadlines, exam periods, and breaks. Select from common academic calendar templates or start from scratch.
          </p>
          <p>
            Add recurring events like weekly classes, office hours, or study sessions. The calendar automatically handles holiday breaks and adjusts for the academic year structure you define (August-May, September-June, etc.).
          </p>
          <p>
            Export the calendar in multiple formats: PDF for printing and distribution, iCal/ICS for importing into personal calendars, or shareable web link for online access. Customize colors and labels for different event types.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">University Administration</h3>
            <p className="text-sm text-muted-foreground">
              Create official academic calendars for publication on university websites and student handbooks.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Course Planning</h3>
            <p className="text-sm text-muted-foreground">
              Instructors can map out syllabus schedules, assignment due dates, and exam periods for their courses.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Student Planning</h3>
            <p className="text-sm text-muted-foreground">
              Students can visualize their entire academic year including breaks, exam periods, and personal commitments.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">K-12 Schools</h3>
            <p className="text-sm text-muted-foreground">
              Generate school year calendars with holidays, professional development days, and parent-teacher conferences.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Training Programs</h3>
            <p className="text-sm text-muted-foreground">
              Structure corporate training, certification programs, or professional development courses with clear timelines.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Homeschool Planning</h3>
            <p className="text-sm text-muted-foreground">
              Organize homeschool terms, field trips, co-op meetings, and assessment periods throughout the year.
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
              <strong className="text-foreground">Academic year conventions:</strong> Academic years are typically named for their ending year. The 2024-2025 academic year usually starts in August/September 2024 and ends in May/June 2025.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Term types supported:</strong> Choose from semester (2 terms), quarter (4 terms), trimester (3 terms), or custom term structures that match your institution.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Holiday variations:</strong> Different institutions observe different holidays. Customize the holiday list to match your specific academic calendar requirements.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Time zone awareness:</strong> When sharing calendars digitally, remember that deadline times are in your local time zone. Specify time zones for remote students.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Calendar sync limitations:</strong> While iCal exports work with most calendar apps, some advanced features may not transfer. Always verify critical dates after import.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">How do I create a semester-based calendar?</h3>
            <p className="text-sm text-muted-foreground">
              Select "Semester" as your term type. Define start and end dates for Fall and Spring semesters, then add breaks and important dates within each term.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I add assignment due dates?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Add individual events for assignments, exams, and projects. Color-code by course or assignment type for easy visual identification.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I share the calendar with students?</h3>
            <p className="text-sm text-muted-foreground">
              Export as iCal and share the file, publish to a web-accessible URL, or distribute the PDF. Students can import into Google Calendar, Apple Calendar, or Outlook.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I include recurring class meetings?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Set up recurring events for regular class meetings, specifying which days of the week and the date range. The calendar generates all occurrences automatically.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What if my school uses a quarter system?</h3>
            <p className="text-sm text-muted-foreground">
              Select "Quarter" as your term type. Define four quarters (Fall, Winter, Spring, Summer) with appropriate start/end dates and breaks between them.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I print this for a bulletin board?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. The PDF export is formatted for standard paper sizes. For large format printing, select the poster or large format option if available.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I handle summer sessions?</h3>
            <p className="text-sm text-muted-foreground">
              Add summer as an optional term with its own date range. Summer sessions often have different structures (multiple mini-sessions) that can be configured separately.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
