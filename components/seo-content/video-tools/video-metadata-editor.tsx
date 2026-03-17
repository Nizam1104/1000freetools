export default function VideoMetadataEditorSEO() {
  return (
    <article className="seo-content space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Editing Video Metadata and Tags</h2>
        <div className="prose prose-slate dark:prose-invert">
          <p>
            This video metadata editor lets you view and modify metadata tags embedded in video 
            files. Edit title, artist, album, year, genre, and comment fields. The tool reads 
            existing tags from your file and lets you update them before downloading.
          </p>
          <p>
            Metadata tags travel with the video file and display in media players, helping you 
            organize and identify your video library. MP4 files use atoms/boxes for metadata storage.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Practical Use Cases</h2>
        <ul className="space-y-3">
          <li>
            <strong>Content creators</strong> who add descriptive titles and artist information to 
            their videos for better organization.
          </li>
          <li>
            <strong>Video librarians</strong> organizing their personal video library who fill in 
            metadata for proper categorization and searchability.
          </li>
          <li>
            <strong>Filmmakers</strong> who add credits, year, and genre information to their short 
            films before distribution.
          </li>
          <li>
            <strong>Teachers</strong> who create educational videos with descriptive metadata for 
            their institution's media library.
          </li>
          <li>
            <strong>Archivists</strong> preparing videos for archival who add comprehensive 
            metadata for future reference.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What to Know Before Using It</h2>
        <ul className="space-y-3">
          <li>
            The tool reads existing tags automatically when you load a file. You can modify any 
            field or leave it unchanged.
          </li>
          <li>
            Not all video formats support the same metadata fields. MP4 has extensive metadata 
            support; other formats vary.
          </li>
          <li>
            The output is MP4 format with metadata atoms. If your source is a different format, it 
            gets converted.
          </li>
          <li>
            Some media players display metadata differently. What shows as "Artist" in one player 
            might show as "Creator" in another.
          </li>
          <li>
            Year should be a 4-digit number (2024, not 24) for best compatibility.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold mb-2">What metadata fields can I edit?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Title, artist, album, year, genre, and comment. These are standard fields supported 
              by most media players.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Will this work with non-MP4 files?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              The tool accepts various video formats but outputs MP4 with metadata. Original format 
              metadata might not transfer completely.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I add cover art or thumbnails?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              No—this tool handles text metadata only. For cover art, you'd need dedicated tag 
              editing software.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">What happens if a field is empty?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              Empty fields are simply not written. A file with no artist tag just won't display 
              artist information.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Can I remove existing metadata?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              You can leave fields blank, but that doesn't necessarily remove existing tags. For 
              complete metadata removal, use the metadata remover tool.
            </dd>
          </div>
          <div>
            <dt className="font-semibold mb-2">Is this compatible with all media players?</dt>
            <dd className="text-slate-600 dark:text-slate-400">
              MP4 metadata is widely supported, but some players might not display all fields. 
              Title is most universally supported.
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
