export default function VideoAudioRemoverSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">What This Tool Does</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This tool strips the audio track from your video file, leaving you with a completely
            silent video. Upload any common video format (MP4, MOV, AVI, MKV, WebM), and it outputs
            an MP4 with no audio stream at all — not just muted, but actually removed. The processing
            happens in your browser using WebAssembly, so your video never leaves your computer.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong className="text-foreground">Upload your video:</strong> Select the file from
              your device. The tool reads it locally — no upload to any server.
            </li>
            <li>
              <strong className="text-foreground">Audio track removal:</strong> The tool uses FFmpeg
              (compiled to WebAssembly) to demux the video, discard the audio stream entirely, and
              remux the video-only stream into a new MP4 container.
            </li>
            <li>
              <strong className="text-foreground">Download:</strong> Once processing completes,
              download the silent video. The filename is prefixed with &quot;silent-&quot; for easy
              identification.
            </li>
          </ol>
          <p>
            Because the audio is discarded rather than silenced, the resulting file is smaller than
            the original — you&apos;re literally removing data, not just adding a mute flag.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When You&apos;d Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Background video for presentations</h3>
            <p className="text-sm text-muted-foreground">
              You found the perfect B-roll clip but it has narration or music you don&apos;t need.
              Strip the audio so it doesn&apos;t clash with your own voiceover or presentation
              soundtrack.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Social media overlays</h3>
            <p className="text-sm text-muted-foreground">
              Instagram and TikTok creators often layer multiple video clips. Removing audio from
              underlying layers prevents muddy, overlapping sound.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Accessibility compliance</h3>
            <p className="text-sm text-muted-foreground">
              Some digital signage and kiosk displays require video content without audio. This tool
              creates compliant versions without needing professional editing software.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Stock footage prep</h3>
            <p className="text-sm text-muted-foreground">
              Downloaded a free stock video with unwanted ambient noise? Remove it before importing
              into your main project timeline.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Privacy protection</h3>
            <p className="text-sm text-muted-foreground">
              Sharing a screen recording that accidentally captured private conversations? Strip the
              audio entirely before sharing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">GIF alternative</h3>
            <p className="text-sm text-muted-foreground">
              Silent videos work like GIFs but with better compression. Remove audio from short clips
              for web use where sound isn&apos;t needed.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to Know Before Using It</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Output is always MP4:</strong> Regardless of your
              input format, the output will be an MP4 file. This is because the tool uses the MP4
              container format for maximum compatibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">File size limits depend on your browser:</strong>{" "}
              Since processing happens entirely in your browser, available memory is your limit.
              Chrome and Firefox typically handle files up to 2-4 GB, but older browsers or low-RAM
              devices may struggle with videos over 500 MB.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Processing time scales with file size:</strong> A
              100 MB video might take 10-30 seconds. A 1 GB file could take several minutes. The
              progress bar shows real-time completion percentage.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Video codec is preserved:</strong> If your input is
              H.264, the output stays H.264. The tool doesn&apos;t re-encode the video stream — it
              just removes audio and repackages, which means no quality loss.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Multiple audio tracks:</strong> If your video has
              multiple audio streams (like a DVD rip with different language tracks), all of them are
              removed.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work on iPhone or Android?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but with caveats. Mobile browsers have stricter memory limits. Videos under 200 MB
              should work fine on modern devices (iPhone 12+, recent Android flagships). Larger files
              may crash the browser tab.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">
              What&apos;s the difference between removing audio and muting video?
            </h3>
            <p className="text-sm text-muted-foreground">
              Muting keeps the audio stream but sets volume to zero — the data is still there.
              Removing audio deletes the stream entirely, resulting in a smaller file. For most use
              cases, removal is cleaner.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I extract the audio instead of removing it?</h3>
            <p className="text-sm text-muted-foreground">
              This tool only removes audio. For extraction, you&apos;d need a separate audio extractor
              tool. The workflow would be: use an extractor to save the audio, then use this tool to
              create a silent video.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is my output file still large?</h3>
            <p className="text-sm text-muted-foreground">
              Video data is much larger than audio. A typical video file is 90-95% video stream,
              5-10% audio. Removing audio saves some space, but the video stream dominates the file
              size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this remove embedded subtitles or captions?</h3>
            <p className="text-sm text-muted-foreground">
              No. This tool only removes audio streams. Subtitle tracks (if present) are preserved in
              the output. If you need to remove subtitles, that requires a different tool.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I batch process multiple videos?</h3>
            <p className="text-sm text-muted-foreground">
              This tool processes one video at a time. For batch operations, you&apos;d need to
              process each file sequentially. Consider desktop FFmpeg if you need to strip audio from
              dozens of files.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens if the video has no audio track?</h3>
            <p className="text-sm text-muted-foreground">
              The tool will still process it and output a video-only MP4. The result will be
              essentially identical to the input, just repackaged in an MP4 container.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}


