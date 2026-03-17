export default function VideoCompressorSimpleSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Compressing Videos to Reduce File Size</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This video compressor reduces file size by re-encoding at lower bitrates. Choose from 
            compression levels: Low (4 Mbps, highest quality), Medium (2 Mbps, balanced), High 
            (1 Mbps, smaller files), or Extreme (500 kbps, smallest files).
          </p>
          <p>
            The tool re-encodes your video using H.264 compression at your selected bitrate. Lower 
            bitrates mean smaller files but reduced video quality. Processing happens entirely in 
            your browser.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Practical Use Cases</h2>
        <ul className="space-y-3">
          <li>
            <strong>Message senders</strong> who need to share a video via messaging apps with file 
            size limits. They compress to fit within WhatsApp's or Telegram's limits.
          </li>
          <li>
            <strong>Content creators</strong> who have raw footage taking up too much storage. They 
            compress dailies or rough cuts to save space.
          </li>
          <li>
            <strong>Backup creators</strong> who want to backup their video collection but don't 
            have enough drive space. Compression lets them fit more content.
          </li>
          <li>
            <strong>Teachers</strong> who create video lessons for students with limited internet. 
            Compressed videos download faster and use less data.
          </li>
          <li>
            <strong>Archivists</strong> who want to preserve content while minimizing storage. They 
            compress to a reasonable quality level.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to Know Before Using It</h2>
        <ul className="space-y-3">
          <li>
            Compression is lossy—you can't recover the original quality after compressing. Keep your 
            originals if quality matters.
          </li>
          <li>
            The compression levels are bitrate-based. "Extreme" compression (500 kbps) will show 
            noticeable artifacts on most content.
          </li>
          <li>
            Video complexity affects results. Simple content (talking head, slides) compresses well. 
            Complex content (action, crowds) needs higher bitrates.
          </li>
          <li>
            This isn't dynamic range compression (which affects audio levels). This is file size 
            compression through re-encoding.
          </li>
          <li>
            Output is MP4/H.264 format. If your source is a different format, you're transcoding.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">How much can I reduce file size?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Depends on the original bitrate. Going from 8 Mbps to 500 kbps reduces size by about 
              94%. From 4 Mbps to 1 Mbps, about 75%.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What's the minimum usable quality?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              For web viewing, 1 Mbps (High compression) is acceptable. For important content, use 
              Medium (2 Mbps) or Low (4 Mbps).
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Will compressed video look worse?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Yes, but how much worse depends on the compression level and source material. At 
              Medium compression, most viewers won't notice on small screens.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I compress to formats other than MP4?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—this tool outputs MP4/H.264 only. For HEVC, VP9, or AV1, you need dedicated 
              encoding software.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Is there a file size limit?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Your browser's memory is the constraint. Files over 500MB might process slowly or 
              fail on devices with limited RAM.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I batch compress multiple videos?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—this tool processes one file at a time. For batch compression, you'd need desktop 
              software.
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
