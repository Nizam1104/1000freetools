export default function AudioFrequencyAnalyzerSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Analyze the audio frequency spectrum</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This frequency analyzer displays the frequency content of your audio as a spectrum graph. 
            Choose FFT size (1024 to 8192) for different resolution levels. The graph shows magnitude 
            (loudness) at each frequency from 20 Hz to 20 kHz.
          </p>
          <p>
            FFT (Fast Fourier Transform) breaks down the audio into its component frequencies. Higher 
            FFT sizes give finer frequency resolution but coarser time resolution. The result is a 
            frequency spectrum showing which frequencies are present and how strong they are.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Practical applications</h2>
        <ul className="space-y-3">
          <li>
            Musicians who identify problematic frequencies in a mix. They see a spike 
            at 400 Hz and know to cut that range.
          </li>
          <li>
            Audio diagnosticians spotting excessive low-end rumble or harsh high 
            frequencies.
          </li>
          <li>
            Producers checking if their mix has balanced frequency content across 
            the spectrum.
          </li>
          <li>
            Audio engineers verifying that a high-pass filter is working by seeing 
            the low frequencies disappear.
          </li>
          <li>
            Educators creating content about audio who use frequency spectrum 
            visualizations to demonstrate concepts.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to know before you use it</h2>
        <ul className="space-y-3">
          <li>
            The spectrum shows the entire file averaged together, not a real-time display. You can't 
            see how frequencies change over time.
          </li>
          <li>
            FFT size affects resolution: 1024 gives coarse frequency bins; 8192 gives fine detail but 
            requires more processing.
          </li>
          <li>
            The graph uses a logarithmic frequency scale (like human hearing). Low frequencies are 
            spread out; high frequencies are compressed.
          </li>
          <li>
            Magnitude is shown in dB. Higher lines = louder at that frequency. The scale typically 
            ranges from -100 dB to -20 dB.
          </li>
          <li>
            This is an analysis tool, not a fix. Use the equalizer to actually change frequency content.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">What does the frequency spectrum show?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Which frequencies are present in your audio and how loud each one is. Peaks show dominant 
              frequencies; valleys show absent ones.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What FFT size should I use?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              2048 (default) works for most purposes. Use 1024 for quick overviews; 4096 or 8192 for 
              detailed analysis.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What's a healthy frequency spectrum?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Generally, a gentle downward slope from low to high frequencies. Excessive peaks indicate 
              resonances; big dips indicate missing content.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I see how frequencies change over time?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No, this shows a static spectrum of the entire file. For time-varying spectra 
               (spectrograms), you need dedicated analysis software.
          </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Does this show stereo frequency content?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No, the analysis is mono (combined channels). Stereo spectrum analysis would need separate 
              left/right displays.
          </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What frequencies should I look for?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              20-80 Hz: sub-bass. 80-250 Hz: bass. 250-500 Hz: low mids. 500 Hz-2 kHz: mids. 2-4 kHz: 
              upper mids. 4-20 kHz: highs/treble.
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
