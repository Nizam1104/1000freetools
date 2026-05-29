export default function AudioEqualizerBasicSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Basic audio equalizer for bass and treble</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This equalizer adjusts bass (low frequencies below 250 Hz) and treble (high frequencies 
            above 4 kHz) using simple slider controls. Each band can be boosted or cut by up to 12 dB. 
            Processing happens in your browser using Web Audio API filters.
          </p>
          <p>
            The bass control uses a low-shelf filter affecting everything below 250 Hz. The treble 
            control uses a high-shelf filter affecting everything above 4 kHz. Mid frequencies 
            (250 Hz to 4 kHz) remain unaffected.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who uses basic EQ</h2>
        <ul className="space-y-3">
          <li>
            Podcasters who recorded but their voice sounds thin. They boost bass by 
            +3 dB to add warmth and body.
          </li>
          <li>
            Musicians who have a mix that sounds too bright. They cut treble by -4 dB 
            to reduce harshness.
          </li>
          <li>
            Listeners using bass-heavy headphones reduce bass by -6 dB to compensate 
            for the headphone's sound signature.
          </li>
          <li>
            Content creators who have audio with rumble from wind or handling noise. 
            They cut bass by -8 dB to clean it up.
          </li>
          <li>
            Audio enhancers who want to make vocals more present without affecting 
            the overall mix. They boost treble by +2 dB for clarity.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to know before you use it</h2>
        <ul className="space-y-3">
          <li>
            This is a 2-band EQ, not a full parametric equalizer. You can't target specific frequencies 
            like "cut 400 Hz" or "boost 3 kHz."
          </li>
          <li>
            The bass and treble controls interact. Boosting both might create a "smile" EQ curve that 
            sounds scooped.
          </li>
          <li>
            Extreme boosts (+10 dB or more) can introduce distortion or artifacts. Subtle adjustments 
            (±3-6 dB) usually sound better.
          </li>
          <li>
            This isn't a replacement for proper mixing EQ. It's for broad tonal adjustments, not 
            surgical frequency correction.
          </li>
          <li>
            Output is MP3 format. If you're doing professional audio work, use a DAW with higher-quality 
            EQ plugins.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">What frequencies do bass and treble control?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Bass affects frequencies below 250 Hz (low end, warmth, rumble). Treble affects 
              frequencies above 4 kHz (brightness, air, sibilance).
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I adjust midrange frequencies?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No, this is a basic 2-band EQ. For midrange control, you need a 3-band or parametric 
              equalizer.
          </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What's a good starting point for EQ?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Make small adjustments (±2-4 dB) and listen. Cut problem frequencies rather than boosting 
              desired ones when possible.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Will EQ fix bad recordings?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              It can help, but EQ can't add what wasn't recorded. A thin recording can be warmed up 
              slightly, but it won't become rich.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Does EQ affect volume?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Boosting increases volume; cutting decreases it. The effect is frequency-dependent, not 
              uniform across all frequencies.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I preview the EQ before downloading?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No, this is a process-and-download tool. For real-time EQ preview, use audio editing 
              software or a media player with EQ.
          </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
