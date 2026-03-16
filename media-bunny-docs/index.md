# Mediabunny Documentation

Welcome to the comprehensive documentation for **Mediabunny**, a powerful JavaScript/TypeScript library for media processing that leverages the WebCodecs API and provides advanced multimedia capabilities in the browser and Node.js environments.

## Overview

Mediabunny is a comprehensive media processing library that provides:

- **File Reading & Metadata Extraction** - Read metadata from media files, extract video and audio properties, and detect codec support
- **Media Data Extraction** - Extract video frames and audio chunks at specific timestamps, decode packets to raw samples
- **File Creation & Writing** - Create MP4, MOV, WebM, MKV, and other formats with multiple tracks
- **Video Processing** - Resize, rotate, crop, compress, and apply effects to videos
- **Audio Processing** - Resample, compress, and apply effects to audio
- **Format Conversion** - Convert between different containers and codecs
- **Live Recording & Streaming** - Capture and stream media in real-time
- **Advanced Features** - Custom codecs, multi-track support, and performance optimizations

## Table of Contents

### 1. Reading Media
- [File Reading & Metadata Extraction](./reading/file_reading_metadata_extraction.md) - Extract metadata, properties, and thumbnails from media files
- [Media Data Extraction](./reading/media_data_extraction.md) - Extract frames, samples, and raw data at specific timestamps

### 2. Writing Media
- [File Creation & Writing](./writing/file_creation_writing.md) - Create media files in various formats with multiple tracks

### 3. Processing Media
- [Video Processing](./processing/video_processing.md) - Transform videos with resizing, rotation, cropping, compression, and effects
- [Audio Processing](./processing/audio_processing.md) - Process audio with resampling, compression, and custom effects

### 4. Converting Media
- [Format Conversion](./conversion/format_conversion.md) - Convert between different media containers and codecs

### 5. Live Media
- [Live Recording & Streaming](./live-streaming/live_recording_streaming.md) - Capture and stream media in real-time

### 6. Advanced Topics
- [Advanced Features](./advanced/advanced_features.md) - Custom codecs, multi-track support, performance optimizations, and more

## Getting Started

### Installation

Install Mediabunny using npm:

```bash
npm install mediabunny
```

For specific codec support, you might also need extensions:

```bash
# For MP3 encoding support
npm install @mediabunny/mp3-encoder
```

### Basic Usage

```javascript
import { 
    Input, 
    Output, 
    Mp4OutputFormat, 
    BufferTarget, 
    BlobSource, 
    Conversion, 
    ALL_FORMATS 
} from 'mediabunny';

// Read a media file
const input = new Input({
    source: new BlobSource(file), // File from input element
    formats: ALL_FORMATS
});

// Set up output
const output = new Output({
    format: new Mp4OutputFormat(),
    target: new BufferTarget()
});

// Convert the media
const conversion = await Conversion.init({ input, output });
await conversion.execute();

// Get the result
const resultBuffer = output.target.buffer;
const resultBlob = new Blob([resultBuffer], { type: 'video/mp4' });

// Clean up
await input.end();
```

### Browser Compatibility

Mediabunny makes use of modern web APIs including:

- WebCodecs API (VideoEncoder, VideoDecoder, AudioEncoder, AudioDecoder)
- MediaStreamTrackProcessor and MediaStreamTrackGenerator
- EncodedVideoChunk and EncodedAudioChunk
- OffscreenCanvas for efficient video processing

For environments that don't support these APIs natively, Mediabunny provides fallbacks through extensions and polyfills.

## Core Concepts

### Input/Output Model

Mediabunny follows a clear separation between input and output:

- **Input**: Represents a source of media data, with methods to extract metadata, frames, and samples
- **Output**: Represents a destination for media data, with configurable format and target
- **Conversion**: Processes media from input to output, applying transformations along the way

### Supported Formats

#### Input Formats
- MP4, MOV (ISO Base Media File Format/QuickTime)
- WebM, MKV (Matroska)
- MP3, WAV, AAC, FLAC, Ogg
- MPEG Transport Stream

#### Output Formats
- MP4, MOV
- WebM
- MKV/ Matroska
- MP3, WAV
- Ogg, FLAC

### Codec Support

#### Video Codecs
- H.264/AVC (`avc1`)
- H.265/HEVC (`hev1`, `hvc1`)
- VP8, VP9 (`vp8`, `vp09`)
- AV1 (`av01`)

#### Audio Codecs  
- AAC (`mp4a`)
- Opus (`opus`)
- MP3 (`mp3`) - with extension
- Vorbis (`vorbis`)
- FLAC (`fLaC`)

## Architecture

Mediabunny is designed with modularity in mind:

- **Demuxer Layer**: Handles parsing of container formats
- **Decoder Layer**: Converts encoded media to raw formats
- **Processing Layer**: Applies transformations to raw media
- **Encoder Layer**: Converts raw media back to encoded formats  
- **Muxer Layer**: Packages encoded streams into container formats

The library is designed to work efficiently in both browser and Node.js environments, with automatic fallbacks where needed.

## Common Use Cases

- **Video compression** and optimization for web delivery
- **Format conversion** for cross-platform compatibility  
- **Thumbnail generation** and preview creation
- **Audio extraction** from video files
- **Live streaming** and real-time processing
- **Media analysis** and metadata extraction
- **Watermarking** and branding application
- **Accessibility enhancement** through captioning and audio description

## Performance Considerations

- Use hardware acceleration when available
- Process media in chunks rather than loading entire files into memory
- Use appropriate formats for your use case (WebM for streaming, MP4 for compatibility)
- Implement proper error handling around media operations
- Monitor resource usage in long-running operations
- Consider using Web Workers for intensive processing to avoid blocking the UI thread

## Support and Community

For issues, suggestions, and community discussions, please visit the Mediabunny GitHub repository. The documentation is regularly updated to reflect new features and improvements.

---
*Documentation Version: Latest*  
*Last Updated: February 2026*