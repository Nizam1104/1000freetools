export default function VideoResolutionAnalyzerSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Analyzing Video Resolution and Codec Information</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This resolution analyzer displays detailed technical information about your video file: 
            width, height, aspect ratio, rotation, and codec. All processing happens in your 
            browser—no upload required.
          </p>
          <p>
            The tool reads the video track's encoded dimensions, display dimensions, and rotation 
            metadata. It calculates the aspect ratio and identifies the video codec for 
            compatibility checking.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who Needs Video Analysis</h2>
        <ul className="space-y-3">
          <li>
            <strong>Video editors</strong> who receive footage and need to verify resolution and 
            codec before importing into their editing software.
          </li>
          <li>
            <strong>Troubleshooters</strong> troubleshooting playback issues who check if their 
            video uses a supported codec.
          </li>
          <li>
            <strong>Content creators</strong> who verify their export settings produced the 
            expected resolution and format.
          </li>
          <li>
            <strong>Developers</strong> who need codec information to determine compatibility with 
            their platform or player.
          </li>
          <li>
            <strong>Archivists</strong> archiving videos who document the technical specifications 
            for their media library.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to Know Before Using It</h2>
        <ul className="space-y-3">
          <li>
            Coded dimensions are the actual encoded frame size. Display dimensions might differ if 
            the video has non-square pixels.
          </li>
          <li>
            Rotation metadata tells players how to orient the video. A video coded as 1080×1920 
            with 90° rotation displays as 1920×1080.
          </li>
          <li>
            Aspect ratio is calculated from the dimensions and simplified (e.g., 1920:1080 becomes 
            16:9).
          </li>
          <li>
            Codec information helps identify compatibility. H.264 is universally supported; HEVC, 
            VP9, and AV1 have more limited support.
          </li>
          <li>
            This is an analysis tool, not a fix. To change resolution or codec, you'd need video 
            conversion software.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">What's the difference between coded and display dimensions?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Coded dimensions are the actual encoded frame size. Display dimensions account for 
              pixel aspect ratio and rotation.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What does rotation mean?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Some videos (especially from phones) are encoded sideways with rotation metadata 
              telling players to rotate during playback.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What's a good aspect ratio?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Depends on the content: 16:9 for widescreen video, 4:3 for older content, 1:1 for 
              square social media videos, 9:16 for vertical/phone video.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What codecs are most compatible?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              H.264 (AVC) is universally supported. HEVC (H.265) offers better compression but has 
              limited support. VP9 and AV1 are web-focused.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can this detect HDR or color information?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—this tool shows resolution, rotation, and codec only. For HDR, color space, or bit 
              depth info, you need more advanced analysis tools.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Will this work with all video files?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Most common formats (MP4, WebM, MOV, MKV) work. Some exotic formats might not be 
              readable by the browser.
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
