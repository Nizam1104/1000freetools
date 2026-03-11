import React from "react"

export default function QrCodeYoutubeSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste any YouTube URL - full video links, short URLs (youtu.be), or embed URLs all work. The tool extracts the video ID automatically. Alternatively, enter just the 11-character video ID.
          </p>
          <p>
            The QR code generates instantly as you type. It encodes a link to the YouTube video. When scanned, it opens in the YouTube app (if installed) or web browser.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Supported YouTube link formats:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Full URL:</strong> youtube.com/watch?v=VIDEO_ID</li>
              <li><strong>Short URL:</strong> youtu.be/VIDEO_ID</li>
              <li><strong>Embed URL:</strong> youtube.com/embed/VIDEO_ID</li>
              <li><strong>Video ID only:</strong> 11-character code</li>
            </ul>
          </div>
          <p>
            Preview shows the generated QR code. Download as PNG for printing on materials, packaging, or digital use in presentations and documents.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Product packaging demo videos</h3>
            <p className="text-sm text-muted-foreground">
              Link physical products to tutorial videos. Customers scan to learn how to use their purchase. Reduces support calls and improves user experience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Presentation slide enhancements</h3>
            <p className="text-sm text-muted-foreground">
              Add QR codes to slides linking to detailed video explanations. Audience can watch later. Keeps presentations concise while offering depth.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Musician promotional materials</h3>
            <p className="text-sm text-muted-foreground">
              Band posters with QR codes to music videos or Spotify. Fans scan to listen immediately. Bridge the gap between physical and digital promotion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Educational resource sharing</h3>
            <p className="text-sm text-muted-foreground">
              Teachers share video lessons via QR codes on worksheets. Students access content instantly. Great for flipped classroom models.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Restaurant menu videos</h3>
            <p className="text-sm text-muted-foreground">
              Link to chef's specials videos or wine pairing guides. Diners scan to see dishes being prepared. Enhances the dining experience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Real estate video tours</h3>
            <p className="text-sm text-muted-foreground">
              Property signs with QR codes to video walkthroughs. Drive-by buyers can tour remotely. Qualifies leads before physical showings.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Video must be public or unlisted.</strong>
              Private videos won't play for scanners. Set videos to Public or Unlisted before creating QR codes. Test with an incognito browser window.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Links can't be changed later.</strong>
              The video URL is encoded in the pattern. To change the destination, you need a new QR code. Plan your video strategy before printing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">YouTube app provides best experience.</strong>
              Scanners with the YouTube app get the native experience. Others get the mobile website. Both work, but app is smoother.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Consider video length.</strong>
              Long videos may lose viewer attention. For QR code traffic, shorter, focused videos often perform better. Hook viewers in the first 10 seconds.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Create a custom landing page with multiple video options, then generate a QR code to that page. You can update videos without changing the QR code.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I link to a YouTube channel?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, paste any YouTube URL including channel pages, playlists, or specific videos. The QR code will open whatever link you provide.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this work on all phones?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, YouTube works on all smartphones. iPhones and Android devices both handle YouTube links. Older phones open the mobile website.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I track video views from the QR code?</h3>
            <p className="text-sm text-muted-foreground">
              YouTube Analytics shows traffic sources. Look for "External" traffic around the time you distribute QR codes. Use UTM parameters for more precise tracking.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if my video gets deleted?</h3>
            <p className="text-sm text-muted-foreground">
              The QR code will lead to a "Video unavailable" page. Always have a backup plan. Consider linking to a playlist that you can update.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use a URL shortener first?</h3>
            <p className="text-sm text-muted-foreground">
              Not necessary - YouTube URLs work fine in QR codes. Shorteners add a tracking layer but also a point of failure. Direct links are more reliable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize the QR code design?</h3>
            <p className="text-sm text-muted-foreground">
              This tool generates standard black and white codes. For branded QR codes with colors or logos, use a dedicated design tool after generating the base code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I test before printing?</h3>
            <p className="text-sm text-muted-foreground">
              Scan the preview with your phone. Verify it opens the correct video. Test on multiple devices. Check that the video plays properly.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
