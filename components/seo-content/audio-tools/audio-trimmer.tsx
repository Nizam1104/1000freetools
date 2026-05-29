export default function AudioTrimmerSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Trim audio files in your browser</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This audio trimmer lets you cut MP3, WAV, and other audio files directly in your browser. 
            You pick a start and end time using the sliders or by entering exact seconds, and the tool 
            extracts just that portion of your audio. Everything processes locally. Your file never leaves your device.
          </p>
          <p>
            The interface shows the total duration upfront, so you know exactly what you're working with. 
            You can drag the start and end sliders independently, or type in precise timestamps if you need 
            frame-accurate cuts. The output is encoded to MP3 format for broad compatibility.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who actually needs this</h2>
        <ul className="space-y-3">
          <li>
            Podcasters removing awkward intros and outros before publishing episodes. 
            They need consistent segment lengths without re-recording.
          </li>
          <li>
            Ringtone makers grabbing that 30-second hook from their favorite songs, 
            trimming it cleanly, and dropping it on their phone.
          </li>
          <li>
            Teachers preparing audio clips for language lessons. Instead of sending 
            students a 20-minute recording, you extract just the relevant dialogue sections.
          </li>
          <li>
            Musicians sampling their own recordings. You isolate a specific bar or 
            phrase to use in a different track.
          </li>
          <li>
            Content creators cutting silence or mistakes from voice recordings before 
            uploading to YouTube or Spotify.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to know before you use it</h2>
        <ul className="space-y-3">
          <li>
            The tool outputs MP3 format regardless of your input format. That's usually fine, but if 
            you need lossless output, you'll want a different solution.
          </li>
          <li>
            Precision is limited to 0.1-second increments. For most use cases that's plenty, but audio 
            engineers doing sample-accurate editing will find this too coarse.
          </li>
          <li>
            Very long files might take noticeable time to process, especially on older devices. The 
            trimming happens in real-time using your browser's audio processing.
          </li>
          <li>
            There's no waveform preview, so you're working blind. If you need visual feedback, open 
            your audio in a proper editor first to find your timestamps, then come back here to trim.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">What audio formats can I trim?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              MP3, WAV, OGG, WebM, and most common audio formats. The tool uses your browser's native 
              decoding, so if it plays in Chrome or Firefox, it'll work here.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Does trimming reduce audio quality?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              The audio gets re-encoded to MP3, which introduces some quality loss. For casual use 
              you won't notice, but audiophiles might want to look elsewhere.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I trim multiple sections at once?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—this tool extracts a single continuous segment. If you need multiple clips, trim 
              once, download, then trim the remainder separately.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Is there a file size limit?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Your browser's available memory is the practical limit. Files over 100MB might cause 
              slowdowns or crashes on devices with limited RAM.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Where does my audio get processed?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Everything happens locally in your browser. Your file never uploads to any server, 
              which matters if you're working with sensitive or copyrighted material.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I save my trim settings?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—this is a stateless tool. If you need to trim the same file the same way repeatedly, 
              you'll need to re-enter the timestamps each time.
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
