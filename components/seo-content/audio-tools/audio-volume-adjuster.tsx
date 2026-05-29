export default function AudioVolumeAdjusterSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Adjust audio volume in decibels</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This volume adjuster changes audio loudness using precise decibel (dB) values. You can 
            boost quiet recordings by up to +20 dB or reduce loud ones by -20 dB. The adjustment 
            applies a gain multiplier to every sample in your audio file.
          </p>
          <p>
            The interface uses a simple slider with clear markers: -20 dB for significant reduction, 
            0 dB for unchanged, and +20 dB for maximum boost. Your browser processes the audio locally 
            using the Web Audio API's gain nodes.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Real use cases</h2>
        <ul className="space-y-3">
          <li>
            Podcasters who recorded an episode but spoke too quietly. They boost it 
            by +6 dB to match typical podcast loudness without re-recording.
          </li>
          <li>
            Video editors with background music that's drowning out narration. They 
            reduce the music track by -12 dB to create proper balance.
          </li>
          <li>
            Musicians who captured a live performance with inconsistent levels. They 
            adjust the overall gain before sending it to a mastering engineer.
          </li>
          <li>
            Phone recording users whose audio is barely audible. They apply +15 dB 
            gain to make speech intelligible.
          </li>
          <li>
            Content creators who need all their audio files at consistent levels 
            for a compilation. They adjust each file to hit the same target volume.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to know before you use it</h2>
        <ul className="space-y-3">
          <li>
            Boosting volume doesn't create headroom that wasn't there. If your original recording 
            clipped (hit 0 dBFS), making it louder just makes the distortion louder too.
          </li>
          <li>
            The tool applies uniform gain across the entire file. If you need to adjust only certain 
            sections, you'll need a proper audio editor with automation capabilities.
          </li>
          <li>
            Extreme boosts (+15 dB or more) on already-hot recordings can cause digital clipping. 
            The output will distort if the gain pushes samples beyond the maximum level.
          </li>
          <li>
            This isn't a replacement for proper gain staging during recording. It's a fix for 
            existing files, not a solution for poor recording technique.
          </li>
          <li>
            The output is MP3 format. If you're doing professional audio work, you'll want to 
            preserve the original format and use a DAW instead.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">How much can I increase the volume?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Up to +20 dB, which is a 10x amplitude multiplier. Beyond that, you're almost guaranteed 
              to cause clipping unless the original was recorded extremely quietly.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What's the difference between this and normalization?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Normalization finds the peak level and boosts to a target. This applies a fixed gain 
              regardless of the source level. Normalization is automatic; this is manual control.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Will boosting volume introduce noise?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              It amplifies everything equally, your signal and any background noise. A +15 dB boost 
              makes hiss and hum 15 dB louder too.
          </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I reduce volume to make a file quieter?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Yes. Reducing by -6 dB cuts amplitude in half. This is useful for tracks that are too 
              loud for your project.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Does the volume adjustment affect quality?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              The gain calculation itself is lossless. However, the output gets encoded to MP3, which 
              introduces standard MP3 compression artifacts.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What if I need different volumes for different sections?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              This tool applies one gain value to the entire file. For sectional adjustments, use 
              Audacity or another editor with envelope tools.
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
