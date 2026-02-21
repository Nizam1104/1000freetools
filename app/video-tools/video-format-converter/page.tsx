import VideoFormatsConversion from "@/components/video-tools/VideoFormatsConverter";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

const faqData = [
  {
    question: "Is this video converter really free with no file size limit?",
    answer:
      "Yes. There are no hidden fees, no account required, and no file size restrictions. Because conversion runs entirely in your browser, we have no server costs to pass on — so it's genuinely unlimited and free to use.",
  },
  {
    question: "Are my video files safe? Will they be uploaded anywhere?",
    answer:
      "Your files are 100% safe. All conversion processing happens locally inside your browser using WebAssembly. Nothing is ever uploaded to a server, shared, or stored. Once you close the tab, all data is gone.",
  },
  {
    question: "Why would I convert MP4 to WebM — or vice versa?",
    answer:
      "MP4 (H.264) offers the widest device compatibility, making it ideal for sharing. WebM (VP9 or AV1) is optimized for web streaming and has better compression at the same quality. You might convert WebM to MP4 to play a video on a TV or phone, or convert MP4 to WebM for a website to reduce load times.",
  },
  {
    question: "What is transmuxing and why does it matter?",
    answer:
      "Transmuxing means changing the container format (e.g., MKV to MP4) without re-encoding the video or audio streams inside. Because the codec data isn't touched, transmuxing is dramatically faster than full re-encoding and doesn't cause any quality loss. This tool automatically transmuxes when possible and only re-encodes when the codecs truly need to change.",
  },
  {
    question: "Can I convert a video file to MP3 or another audio-only format?",
    answer:
      "Yes. Select any video file as your input, then choose an audio output format — MP3, AAC, WAV, FLAC, or Opus. The tool will automatically strip the video track and export only the audio stream. This is perfect for extracting music, podcasts, or voiceovers from video recordings.",
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
      description: "Change video frame rate to 24fps, 30fps, 60fps or custom FPS",
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
      description: "Adjust video opacity and transparency with custom background",
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
            Free Online Video Converter – Convert MP4, WebM, MKV, MOV & More
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Convert video and audio files instantly in your browser — no
            uploads, completely free. Supports MP4, WebM, MOV, MP3, and more.
          </p>
        </section>

        {/* Tool Component */}
        <section>
          <VideoFormatsConversion />
        </section>

        {/* What Is a Video Format? */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">
            What Is a Video Format?
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
            <p className="leading-relaxed">
              A video format (also called a container format) is a file
              structure that holds video, audio, subtitles, and metadata
              together in one file. Common containers include MP4, MKV, WebM,
              and MOV. Each container can hold different video codecs (like
              H.264, H.265, VP9, or AV1) and audio codecs (like AAC, Opus, MP3,
              or FLAC).
            </p>
            <p className="leading-relaxed">
              When a video player, website, or device can't open your file, it's
              often a container or codec mismatch — not a corrupted file. The
              right video format converter resolves these issues in seconds by
              repackaging or re-encoding your media into a compatible format.
            </p>
          </div>
        </section>

        {/* What This Tool Does */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">
            What Does This Video Converter Do?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This tool gives you full control over your media files directly in
            the browser using WebAssembly-powered processing — the same
            technology used in professional desktop software, delivered for free
            online.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                1
              </span>
              <div>
                <h3 className="font-semibold">Container Conversion</h3>
                <p className="text-sm text-muted-foreground">
                  Switch between MP4, WebM, MKV, and MOV containers
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                2
              </span>
              <div>
                <h3 className="font-semibold">Video Codec Conversion</h3>
                <p className="text-sm text-muted-foreground">
                  Re-encode between H.264, H.265, VP8, VP9, and AV1 codecs
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                3
              </span>
              <div>
                <h3 className="font-semibold">Audio Extraction</h3>
                <p className="text-sm text-muted-foreground">
                  Strip the video track and export audio-only files as MP3, WAV,
                  AAC, FLAC, or Opus
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                4
              </span>
              <div>
                <h3 className="font-semibold">Fast Transmuxing</h3>
                <p className="text-sm text-muted-foreground">
                  Copy tracks without re-encoding when codecs are compatible
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose This Tool */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-center">
            Why Use Our Video Format Converter?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-card border border-border space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl">🔒</span>
              </div>
              <h3 className="font-semibold text-lg">100% Private</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                All processing happens in your browser using local computation.
                No files are uploaded to any server, making this the safest way
                to convert sensitive or personal video content online.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl">⚡</span>
              </div>
              <h3 className="font-semibold text-lg">Fast Transmuxing</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                When your input and output codecs are compatible, the tool
                transmuxes — copying tracks directly without re-encoding. This
                makes many conversions nearly instant, regardless of file size.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl">🆓</span>
              </div>
              <h3 className="font-semibold text-lg">Completely Free</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                No subscriptions, no file size caps, no daily limits. Convert as
                many video and audio files as you need, for free, forever.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl">🌐</span>
              </div>
              <h3 className="font-semibold text-lg">No Installation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Works on any modern browser — Chrome, Firefox, Safari, or Edge.
                No software downloads, no plugins, no admin rights needed.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl">📁</span>
              </div>
              <h3 className="font-semibold text-lg">Broad Format Support</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Supports all major video and audio formats with a full
                conversion matrix of compatible output options automatically
                shown based on your input file.
              </p>
            </div>
          </div>
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
