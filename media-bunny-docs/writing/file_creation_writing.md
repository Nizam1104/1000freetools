# File Creation & Writing

## Overview
The File Creation & Writing module provides capabilities to create MP4, MOV, WebM, MKV, Ogg, MP3, WAV, AAC, FLAC, and MPEG-TS files with multiple video, audio, and subtitle tracks, set metadata tags (title, artist, date, cover art, custom tags), write directly to disk or stream over network, create files in memory or stream chunks, support fragmented MP4 and streamable formats, and provide append-only writing modes for live streaming.

## Key Capabilities

### 1. Format Support
- Create MP4, MOV, WebM, MKV, Ogg, MP3, WAV, AAC, FLAC, and MPEG-TS files
- Add multiple video, audio, and subtitle tracks
- Support for fragmented MP4 and streamable formats

### 2. Metadata Management
- Set metadata tags (title, artist, date, cover art, custom tags)
- Track language and metadata
- Subtitle support (WebVTT)

### 3. Writing Modes
- Write directly to disk or stream over network
- Create files in memory or stream chunks
- Append-only writing modes for live streaming

## API Reference

### Output Class
```ts
import { Output, BufferTarget, Mp4OutputFormat } from 'mediabunny';

const output = new Output({
    format: new Mp4OutputFormat(),
    target: new BufferTarget(),
});
```

### Available Output Formats
- `Mp4OutputFormat()` - MP4 container
- `QuickTimeOutputFormat()` - MOV/QT container
- `WebMOutputFormat()` - WebM container
- `MatroskaOutputFormat()` - MKV container
- `Mp3OutputFormat()` - MP3 audio file
- `WaveOutputFormat()` - WAV audio file
- `OggOutputFormat()` - Ogg container
- `FlacOutputFormat()` - FLAC audio file
- `MpegTsOutputFormat()` - MPEG Transport Stream

### Available Targets
- `BufferTarget` - Write to an in-memory buffer
- `BlobTarget` - Write to a Blob object
- `WritableStreamTarget` - Write to a WritableStream
- `FileTarget` - Write directly to a file (when supported)

## Code Examples

### Example 1: Create a Simple MP4 File
```ts
import {
    Input,
    Output,
    Mp4OutputFormat,
    BufferTarget,
    BlobSource,
    Conversion,
    ALL_FORMATS
} from 'mediabunny';

async function createMP4(inputFile) {
    // Read input file
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    // Set up output
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    // Perform conversion
    const conversion = await Conversion.init({ input, output });
    await conversion.execute();
    
    // Extract the buffer
    const mp4Buffer = output.target.buffer;
    
    // Convert to blob for downloading
    const mp4Blob = new Blob([mp4Buffer], { type: 'video/mp4' });
    
    await input.end();
    
    return mp4Blob;
}
```

### Example 2: Create a File with Custom Metadata
```ts
import {
    Output,
    Mp4OutputFormat,
    BufferTarget,
    Conversion,
    Input,
    BlobSource,
    ALL_FORMATS
} from 'mediabunny';

async function createMP4WithMetadata(inputFile, metadata) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    // Initialize conversion with custom tags
    const conversion = await Conversion.init({
        input,
        output,
        tags: metadata // e.g., { title: 'My Video', artist: 'Creator Name', ... }
    });
    
    await conversion.execute();
    
    const resultBuffer = output.target.buffer;
    const resultBlob = new Blob([resultBuffer], { type: 'video/mp4' });
    
    await input.end();
    
    return resultBlob;
}
```

### Example 3: Write Directly to a File
```ts
// Note: This example assumes a platform that supports File System Access API
async function writeToFileDirectly(inputFile, outputFileHandle) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    // Get writable stream from file handle
    const writable = await outputFileHandle.createWritable();
    
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new WritableStreamTarget(writable),
    });
    
    const conversion = await Conversion.init({ input, output });
    await conversion.execute();
    
    await input.end();
}
```

### Example 4: Create Memory-Based Output for Streaming
```ts
async function createInMemoryForStreaming(inputFile) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new WebMOutputFormat(),
        target: new BufferTarget(),
    });
    
    // Monitor progress for large files
    const conversion = await Conversion.init({ input, output });
    conversion.onProgress = (progress) => {
        console.log(`Progress: ${(progress * 100).toFixed(2)}%`);
    };
    
    await conversion.execute();
    
    // Get the result buffer to send over network
    const buffer = output.target.buffer;
    
    // Simulate network upload
    const response = await fetch('/api/upload', {
        method: 'POST',
        body: buffer,
        headers: {
            'Content-Type': 'video/webm'
        }
    });
    
    await input.end();
    
    return response.ok;
}
```

### Example 5: Create Fragmented MP4 for Streaming
```ts
async function createFragmentedMP4(inputFile) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    // Use fragmented MP4 format for streaming
    const output = new Output({
        format: new Mp4OutputFormat({
            fragmentation: 'segment' // Enable fragmentation
        }),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output
    });
    
    await conversion.execute();
    
    const fragmentedBuffer = output.target.buffer;
    
    await input.end();
    
    return new Blob([fragmentedBuffer], { type: 'video/mp4' });
}
```

### Example 6: Append-Only Writing Mode for Live Streaming
```ts
// This demonstrates how to use append-only mode (conceptual)
class LiveStreamWriter {
    constructor() {
        this.output = null;
        this.conversion = null;
    }
    
    async initialize(outputFilename) {
        // Create output with append-capable target
        this.output = new Output({
            format: new MpegTsOutputFormat(), // Good for streaming
            target: new BufferTarget(), // In practice, use streaming target
        });
        
        // Note: Actual streaming would use a specialized target that supports 
        // append operations, such as a streaming WritableStream
    }
    
    async addVideoFrame(frame) {
        // Conceptual method for adding frames during live recording
        // Actual implementation would depend on the streaming target used
    }
    
    async finalize() {
        // Finalize the streaming process
        if (this.conversion) {
            await this.conversion.execute();
        }
    }
}
```

## Supported Formats and Configuration Options

### MP4 Format Options
```ts
new Mp4OutputFormat({
    fastStart: true,  // Enable Fast Start optimization for web streaming
    fragmentation: 'none' | 'moof' | 'segment',  // Fragmentation mode
})
```

### WebM Format Options
```ts
new WebMOutputFormat({
    allowHighBitDepth: true,  // Allow high bit depth video
})
```

### Audio-Only Formats
```ts
// MP3 output (requires @mediabunny/mp3-encoder extension)
new Mp3OutputFormat()

// Wave output
new WaveOutputFormat({
    bitsPerSample: 16 | 24 | 32,  // Bit depth
    floatingPoint: false  // Whether to use floating point
})
```

## Best Practices

- Always call `input.end()` to properly clean up resources
- For large files, consider using streaming targets to minimize memory usage
- Use fragmentation options for web streaming to enable progressive download
- Choose the right format based on your target platform and requirements
- For metadata, ensure all tags are properly encoded to avoid corruption
- Monitor progress for long-running conversions to provide user feedback
- Use appropriate error handling around conversion operations