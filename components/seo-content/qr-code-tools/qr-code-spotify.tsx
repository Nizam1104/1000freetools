import React from "react"

export default function QrCodeSpotifySeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste any Spotify URL - tracks, albums, artists, playlists, podcasts, or episodes. The tool extracts the content ID and creates a proper Spotify link. You can also enter the Spotify URI directly if you have it.
          </p>
          <p>
            The QR code encodes a link that opens in the Spotify app (if installed) or web player. When scanned, users go directly to your content ready to play.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Supported Spotify content:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Tracks:</strong> Individual songs</li>
              <li><strong>Albums:</strong> Full album releases</li>
              <li><strong>Artists:</strong> Artist profile pages</li>
              <li><strong>Playlists:</strong> Any public playlist</li>
              <li><strong>Podcasts:</strong> Show pages</li>
              <li><strong>Episodes:</strong> Individual podcast episodes</li>
            </ul>
          </div>
          <p>
            Preview shows your QR code instantly. Download for promotional materials, merchandise, or social media. Share your music with a simple scan.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Musician merchandise tables</h3>
            <p className="text-sm text-muted-foreground">
              Concert merch booths with QR codes to your latest release. Fans buying shirts can instantly stream your music. Convert merchandise buyers to streamers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">DJ set tracklists</h3>
            <p className="text-sm text-muted-foreground">
              Share your set's playlist via QR code. Crowd can find tracks they heard. Builds your following and supports the artists you play.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Restaurant ambiance playlists</h3>
            <p className="text-sm text-muted-foreground">
              "Like the music? Scan to listen at home." Tables or receipts with playlist QR codes. Great guest experience and playlist followers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Podcast episode promotion</h3>
            <p className="text-sm text-muted-foreground">
              Event flyers with QR codes to your latest episode. Attendees can subscribe immediately. Grow your audience from real-world interactions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Wedding reception playlists</h3>
            <p className="text-sm text-muted-foreground">
              Share your wedding playlist with guests. "Songs from our special day" QR code on thank you cards. Guests relive the celebration.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fitness class playlists</h3>
            <p className="text-sm text-muted-foreground">
              Instructors share workout playlists. Students scan to access the music. Builds community and helps students recreate the experience at home.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Content must be public.</strong>
              Private playlists and unlisted podcasts won't play for scanners. Set playlists to Public in Spotify settings before creating QR codes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Spotify app provides best experience.</strong>
              Users with Spotify get the native app experience. Others land on the web player which requires login. Most music fans have the app.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Playlist updates are automatic.</strong>
              Unlike YouTube, Spotify playlist QR codes stay valid when you add songs. The link points to the playlist, not specific tracks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Free users hear ads.</strong>
              Spotify Free users will hear advertisements. Premium subscribers get ad-free playback. You can't control this experience.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Create a "Best Of" playlist for your QR codes. Update it regularly with your latest releases. One QR code stays relevant as your catalog grows.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I get a Spotify URL?</h3>
            <p className="text-sm text-muted-foreground">
              In Spotify, click the three dots on any content, select "Share", then "Copy Link". Paste that URL into this tool.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this work without the Spotify app?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, scanners without the app go to Spotify's web player. They can listen there or get prompted to download the app.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I track how many people scan?</h3>
            <p className="text-sm text-muted-foreground">
              Spotify for Artists shows some referral data. For playlists, check follower growth after distributing QR codes. Exact scan counts aren't available.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if I delete the playlist?</h3>
            <p className="text-sm text-muted-foreground">
              The QR code will lead to a "Content not found" page. Don't delete playlists linked to printed QR codes. Make them private instead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for Apple Music?</h3>
            <p className="text-sm text-muted-foreground">
              No, this generates Spotify-specific links. For Apple Music, you'd need a separate QR code with Apple Music URLs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use the Spotify Code instead?</h3>
            <p className="text-sm text-muted-foreground">
              Spotify Codes (the wave-looking codes) only work in the Spotify app. QR codes work with any scanner. QR codes are more versatile.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I test the QR code?</h3>
            <p className="text-sm text-muted-foreground">
              Scan it with your phone. Verify it opens the correct content in Spotify. Test on both iPhone and Android for best coverage.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
