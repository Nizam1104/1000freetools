import VideoFormatsConversion from "@/components/video-tools/VideoFormatsConverter";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";

const faqData = [
  {
    question: "Can I convert an MKV file to MP4 without re-encoding the video?",
    answer:
      "Yes, in many cases. When the video track inside the MKV already uses a codec that MP4 supports, such as H.264, the converter performs a transmux operation. It moves the existing video and audio data into the new container without re-encoding, which completes in seconds and produces no quality loss.",
  },
  {
    question: "How long does it take to convert a large video file?",
    answer:
      "If the codecs are compatible and only the container changes, conversion is nearly instant regardless of file size. If the video needs to be re-encoded into a different codec, the time depends on the length and resolution of the video and your device's CPU speed. A 10-minute 1080p video may take several minutes to re-encode on a standard laptop.",
  },
  {
    question: "Does this tool support converting video to MP3 or WAV?",
    answer:
      "Yes. Selecting an audio output format such as MP3 or WAV extracts the audio track from the video and discards the video data. MP3 uses compressed audio and produces smaller files. WAV produces an uncompressed audio file with no quality loss, which is useful for audio editing workflows.",
  },
  {
    question: "Will converting a video reduce its quality?",
    answer:
      "A transmux operation produces no quality loss because the pixel data is not re-encoded. A re-encode operation applies a new compression pass, which can introduce a small quality reduction depending on the target codec and bitrate settings. If preserving the original quality is important, avoid re-encoding when possible.",
  },
  {
    question: "Can anyone else see the video files I convert with this tool?",
    answer:
      "No. The file is read from your local drive and processed inside your browser's memory. It is never uploaded to a server. No third party has access to your video at any point during or after conversion.",
  },
  {
    question: "Is there a maximum file size I can convert?",
    answer:
      "The tool runs entirely in your browser and does not upload files to a server. The practical limit is your device's available RAM. Most devices handle files up to a few gigabytes without issues. Very large files such as raw 4K footage above 10 GB may run out of available browser memory before conversion completes.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function VideoFormatsConversionPage() {
  const relatedTools = [
    {
      name: "Video Compressor",
      description: "Compress videos online - reduce file size, No size limit",
      href: "/video-tools/video-compressor",
    },
    {
      name: "Video Metadata Viewer",
      description: "See Video or Audio files metadata",
      href: "/video-tools/video-metadata-viewer",
    },
    {
      name: "Video Player",
      description: "Play any video file format instantly, Supports subtitles",
      href: "/video-tools/video-player",
    },
    {
      name: "Change Video FPS",
      description:
        "Change video frame rate to 24fps, 30fps, 60fps or custom FPS",
      href: "/video-tools/change-video-fps",
    },
    {
      name: "Crop Video",
      description: "Crop videos online - remove unwanted edges and reframe",
      href: "/video-tools/crop-video",
    },
    {
      name: "Enhance Video Quality",
      description: "Upscale, sharpen, denoise and improve video quality",
      href: "/video-tools/enhance-video-quality",
    },
    {
      name: "Extract Audio from Video",
      description: "Extract audio from video files - save as MP3, AAC, or WAV",
      href: "/video-tools/extract-audio-from-video",
    },
    {
      name: "Resize Video Dimensions",
      description: "Resize video to 4K, 1080p, 720p or custom dimensions",
      href: "/video-tools/resize-video-dimensions",
    },
    {
      name: "Rotate Video",
      description: "Rotate videos 90°, 180° or 270° - fix orientation",
      href: "/video-tools/rotate-video",
    },
    {
      name: "Video Color Space Transformation",
      description: "Adjust brightness, contrast, saturation, hue and more",
      href: "/video-tools/video-color-space-transformation",
    },
    {
      name: "Video Grayscale",
      description: "Convert videos to black and white instantly",
      href: "/video-tools/video-grayscale",
    },
    {
      name: "Video Overlays",
      description: "Add watermarks, logos or image overlays to videos",
      href: "/video-tools/video-overlays",
    },
    {
      name: "Video Transparency Maker",
      description:
        "Adjust video opacity and transparency with custom background",
      href: "/video-tools/video-transparency-maker",
    },
  ];
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Free Online Video Converter — Convert MP4, MKV, MOV, WebM and More
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Convert video and audio files between formats directly in your
            browser. No uploads, no account, and no file size limits imposed by
            a server. Supports MP4, WebM, MKV, MOV, MP3, WAV, and more.
          </p>
        </section>

        {/* Tool Component */}
        <section>
          <VideoFormatsConversion />
        </section>

        {/* What The Tool Does Section */}
        <section className="space-y-6">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                What it Does
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                This tool changes the format of your video or audio file. You
                can change the container, such as MKV to MP4, or extract the
                audio track as MP3 or WAV. When the internal codecs are already
                compatible, the tool performs a transmux, copying the data into
                the new container without re-encoding. This completes quickly
                and produces no quality loss. When the codecs are not
                compatible, the tool re-encodes the video, which takes longer
                but produces a file that works in the target format. All
                conversion runs locally in your browser so your file is never
                uploaded to a server.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* How to Use Section */}
        <section className="space-y-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How to Use</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="relative font-semibold text-xl">Load your file</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click the upload area or drag your video file into the tool. The
                converter reads the file from your local drive and never sends
                it to a server. Most common video formats are accepted,
                including MP4, MKV, MOV, WebM, and AVI.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Choose the output format
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Select the target format from the dropdown. For maximum device
                compatibility, choose MP4. For web embedding, choose WebM. To
                extract only the audio, choose MP3 or WAV depending on whether
                you need compressed or uncompressed audio.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Convert and download
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click the Convert button. If the codecs are compatible, the
                conversion finishes in seconds. If re-encoding is required, a
                progress bar shows the current status. When it completes,
                download the converted file to your drive.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="space-y-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Use Cases</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Making an MKV file play on a smart TV or media player
                </h3>
                <p className="text-sm text-muted-foreground">
                  Many older TVs and media players do not support the MKV
                  container. Converting the file to MP4 while keeping the same
                  H.264 video track is a transmux operation, which takes seconds
                  and produces a file that plays on virtually all devices.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Extracting audio from a long video interview
                </h3>
                <p className="text-sm text-muted-foreground">
                  A 3-hour video interview can be several gigabytes in size. If
                  you only need the audio, converting it to MP3 strips the video
                  frames and produces a compressed audio file that is a fraction
                  of the original size and easy to listen to offline.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Optimizing a background video for a website
                </h3>
                <p className="text-sm text-muted-foreground">
                  MP4 files are widely supported but WebM with VP9 codec often
                  produces smaller files at the same quality on modern browsers.
                  Converting a landing page background video from MP4 to WebM
                  can reduce load time for users on slower mobile connections.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Opening a MOV file on a Windows device
                </h3>
                <p className="text-sm text-muted-foreground">
                  MOV files from iPhones and Macs sometimes fail to open on
                  Windows without the QuickTime codec. Converting the MOV to MP4
                  produces a file that the Windows default media player and most
                  other Windows applications can open without additional
                  software.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Submitting a video in a format accepted by an upload portal
                </h3>
                <p className="text-sm text-muted-foreground">
                  Online submission portals for education or corporate platforms
                  sometimes only accept specific file formats such as MP4 or
                  AVI. Converting from WebM or MOV to the accepted format lets
                  you submit without contacting support or using additional
                  conversion software.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Settings Explained Section */}
        <section className="space-y-6">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                Settings Explained
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg">Output Format</h3>
                  <p className="text-muted-foreground mt-2">
                    The output format determines the container file that wraps
                    your video and audio tracks. MP4 is compatible with the
                    widest range of devices. WebM works well for browser-based
                    video with smaller file sizes. MKV supports multiple audio
                    and subtitle tracks but has limited device support. MOV is
                    the native format for Apple devices.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    Audio Output: MP3 vs WAV
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Selecting MP3 extracts the audio and compresses it. The
                    compression reduces file size but introduces a small
                    reduction in audio quality compared to the original. WAV
                    extracts the audio without compression, which preserves the
                    original quality but produces a much larger file. WAV is
                    recommended when you plan to edit the audio further. MP3 is
                    recommended when you want a smaller file for listening.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Transmux vs. Re-encode</h3>
                  <p className="text-muted-foreground mt-2">
                    A transmux operation copies the existing video and audio
                    data into a new container without re-encoding. This
                    completes in seconds and produces no quality loss. A
                    re-encode operation compresses the video data using a new
                    codec, which takes longer but is required when the source
                    and target codecs are different.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-center">
            Frequently Asked Questions
          </h2>
          <Faqs faqs={faqData} />
        </section>

        <ToolLinkCards tools={relatedTools} />
      </div>
    </>
  );
}
