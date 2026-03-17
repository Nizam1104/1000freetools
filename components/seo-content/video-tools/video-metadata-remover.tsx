export default function VideoMetadataRemoverSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Removing Metadata from Video Files</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This metadata remover strips all embedded metadata from your video files, creating a 
            clean output with only the essential video and audio streams. Upload a video and 
            download a version without any identifying information.
          </p>
          <p>
            Metadata can include titles, creation dates, GPS coordinates, device information, and 
            other details you might not want to share. Removing it protects your privacy and 
            reduces file size slightly.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who Removes Video Metadata</h2>
        <ul className="space-y-3">
          <li>
            <strong>Privacy-conscious sharers</strong> who want to remove GPS coordinates and device 
            information before sharing videos online.
          </li>
          <li>
            <strong>Content creators</strong> who have videos with incorrect metadata from previous 
            edits. They strip it clean before adding correct information.
          </li>
          <li>
            <strong>Platform submitters</strong> submitting videos to a platform that rejects 
            certain metadata types. They remove everything to avoid issues.
          </li>
          <li>
            <strong>Privacy-focused users</strong> who remove all identifying information before 
            sharing videos online.
          </li>
          <li>
            <strong>Archivists</strong> preparing videos for archival who want consistent, clean 
            files without extraneous metadata.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to Know Before Using It</h2>
        <ul className="space-y-3">
          <li>
            This removes metadata atoms/boxes from the file, not the video or audio content. Your 
            actual footage is unchanged.
          </li>
          <li>
            Common removed metadata includes: title, artist, creation date, modification date, GPS 
            data, device info, software info.
          </li>
          <li>
            The output is MP4 format. If your source is a different format, it gets converted 
            during processing.
          </li>
          <li>
            File size reduction is usually minimal—metadata typically adds only kilobytes to a file.
          </li>
          <li>
            This is different from removing audio tracks or video tracks. This only removes 
            descriptive metadata.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">What metadata gets removed?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              All standard MP4 metadata: title, artist, album, year, genre, comments, creation date, 
              GPS coordinates, device information.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Will this affect video quality?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—the video and audio streams are preserved. Only metadata atoms are removed.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Why would I remove metadata?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Privacy (removing GPS, device info), troubleshooting (removing conflicting metadata), 
              or standardization (clean files for archival).
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I recover removed metadata?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—once removed, metadata is gone. If you need to preserve it, note it down before 
              removal.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Does this remove watermarks or burned-in text?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—this only removes metadata atoms. Watermarks or text burned into the video frames 
              require video editing to remove.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Will the video play without metadata?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Yes—metadata is optional. The video and audio play normally without any descriptive 
              information.
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
