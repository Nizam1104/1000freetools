export default function AudioSplitterSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Split an audio file into segments</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This audio splitter divides your file into multiple segments. Choose between equal-duration 
            segments (every X seconds) or fixed-count segments (split into N equal parts). The tool 
            processes everything in your browser.
          </p>
          <p>
            For equal-duration mode, specify how long each segment should be (10 seconds, 60 seconds, 
            etc.). For fixed-count mode, specify how many segments you want, and the tool divides the 
            total duration evenly.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who uses audio splitting</h2>
        <ul className="space-y-3">
          <li>
            Podcasters who have a 2-hour recording but their hosting platform has a 
            60-minute limit. They split it into three 40-minute episodes.
          </li>
          <li>
            Lecture recorders who want to share long recordings as individual chapters. 
            They split into 10-minute segments matching the lecture structure.
          </li>
          <li>
            Musicians who have a live album as one continuous file. They split it 
            into individual songs for distribution.
          </li>
          <li>
            Language teachers creating practice content from long dialogues. They 
            split into manageable practice segments.
          </li>
          <li>
            Content creators who have marathon recording sessions they want to release 
            as a series. Splitting creates natural episode breaks.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to know before you use it</h2>
        <ul className="space-y-3">
          <li>
            The split points are automatic, based purely on time, not content. You might get cuts in 
            the middle of words or musical phrases.
          </li>
          <li>
            For content-aware splitting (splitting at silence, chapter markers, etc.), you need 
            dedicated audio editing software.
          </li>
          <li>
            Each segment is encoded separately as MP3. This means slight quality variation at segment 
            boundaries compared to the original.
          </li>
          <li>
            Very short segments (under 5 seconds) might not play correctly in some players due to MP3 
            frame requirements.
          </li>
          <li>
            The tool outputs multiple files you download individually or as a batch.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">What's the difference between equal duration and fixed count?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Equal duration: you specify segment length (e.g., 60 seconds each). Fixed count: you 
              specify number of segments (e.g., 5 parts), and the tool calculates the length.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I choose where to split?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No, splits are automatic at regular intervals. For manual split points, use an audio editor.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">How many segments can I create?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Up to 100 segments. Beyond that, processing becomes impractical in a browser.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Will there be gaps between segments?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
               The splits are sample-accurate, but MP3 encoding can introduce tiny gaps. For truly 
               gapless segments, use lossless formats.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I split based on silence or content?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No, this tool splits at fixed time intervals. For content-aware splitting, use Audacity 
              or similar software.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What happens if the duration doesn't divide evenly?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              The last segment will be shorter. For example, a 65-second file split into 60-second 
              segments gives you one 60-second and one 5-second segment.
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
