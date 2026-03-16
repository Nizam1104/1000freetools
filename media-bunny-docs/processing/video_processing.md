# Video Processing

## Overview
The Video Processing module provides capabilities for video compression (adjusting bitrate and quality), video trimming/cutting (extracting time ranges), video resizing (changing dimensions), video rotation (90°, 180°, 270°), video cropping (extracting rectangular regions), frame rate adjustment (changing FPS), video fitting (fill, contain, cover), adding video overlays/watermarks (compositing), transparency handling (alpha channel support), color space transformations (custom processing), grayscale conversion (filter application), and hardware acceleration support.

## Key Capabilities

### 1. Video Transformation
- Video compression (adjust bitrate and quality)
- Video trimming/cutting (extract time ranges)
- Video resizing (change dimensions)
- Video rotation (90°, 180°, 270°)
- Video cropping (extract rectangular regions)
- Frame rate adjustment (change FPS)

### 2. Video Enhancement
- Video fitting (fill, contain, cover)
- Add video overlays/watermarks (compositing)
- Transparency handling (alpha channel support)
- Color space transformations (custom processing)
- Grayscale conversion (filter application)

### 3. Performance Optimization
- Hardware acceleration support
- Canvas pool optimization

## API Reference

### Video Processing Options
```ts
type ConversionVideoOptions = {
    discard?: boolean;
    width?: number;
    height?: number;
    fit?: 'fill' | 'contain' | 'cover';
    rotate?: 0 | 90 | 180 | 270;
    allowRotationMetadata?: boolean;
    crop?: { left: number; top: number; width: number; height: number };
    frameRate?: number;
    codec?: VideoCodec;
    bitrate?: number | Quality;
    alpha?: 'discard' | 'keep'; // Defaults to 'discard'
    hardwareAcceleration?: 'no-preference' | 'prefer-hardware' | 'prefer-software';
    keyFrameInterval?: number;
    forceTranscode?: boolean;
    process?: (sample: VideoSample) => MaybePromise<
        CanvasImageSource | VideoSample | (CanvasImageSource | VideoSample)[] | null
    >;
    processedWidth?: number;
    processedHeight?: number;
};
```

### Video Processing in Conversions
```ts
import { Conversion } from 'mediabunny';

const conversion = await Conversion.init({
    input,
    output,
    video: {
        // Apply video processing options
        width: 1280,
        height: 720,
        fit: 'contain',
        rotate: 90,
        bitrate: 2000000, // 2 Mbps
        frameRate: 30,
        crop: { left: 100, top: 50, width: 800, height: 600 },
        process: customProcessFunction
    }
});
```

## Code Examples

### Example 1: Resize Video
```ts
import { Conversion, Input, Output, Mp4OutputFormat, BufferTarget, BlobSource, ALL_FORMATS } from 'mediabunny';

async function resizeVideo(inputFile, newWidth, newHeight, fitMode = 'contain') {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        video: {
            width: newWidth,
            height: newHeight,
            fit: fitMode
        }
    });
    
    await conversion.execute();
    
    const resizedBuffer = output.target.buffer;
    const resizedBlob = new Blob([resizedBuffer], { type: 'video/mp4' });
    
    await input.end();
    
    return resizedBlob;
}
```

### Example 2: Rotate Video
```ts
async function rotateVideo(inputFile, degrees) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        video: {
            rotate: degrees,
            allowRotationMetadata: false // Actually rotate pixels, not just metadata
        }
    });
    
    await conversion.execute();
    
    const rotatedBuffer = output.target.buffer;
    const rotatedBlob = new Blob([rotatedBuffer], { type: 'video/mp4' });
    
    await input.end();
    
    return rotatedBlob;
}
```

### Example 3: Crop Video
```ts
async function cropVideo(inputFile, cropRect) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        video: {
            crop: cropRect // { left: 100, top: 50, width: 800, height: 600 }
        }
    });
    
    await conversion.execute();
    
    const croppedBuffer = output.target.buffer;
    const croppedBlob = new Blob([croppedBuffer], { type: 'video/mp4' });
    
    await input.end();
    
    return croppedBlob;
}
```

### Example 4: Video Compression
```ts
async function compressVideo(inputFile, targetBitrate) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        video: {
            bitrate: targetBitrate, // e.g., 1000000 for 1 Mbps
            codec: 'avc1.42E01E' // H.264 codec
        }
    });
    
    await conversion.execute();
    
    const compressedBuffer = output.target.buffer;
    const compressedBlob = new Blob([compressedBuffer], { type: 'video/mp4' });
    
    await input.end();
    
    return compressedBlob;
}
```

### Example 5: Change Frame Rate
```ts
async function changeFrameRate(inputFile, newFrameRate) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        video: {
            frameRate: newFrameRate
        }
    });
    
    await conversion.execute();
    
    const fpsChangedBuffer = output.target.buffer;
    const fpsChangedBlob = new Blob([fpsChangedBuffer], { type: 'video/mp4' });
    
    await input.end();
    
    return fpsChangedBlob;
}
```

### Example 6: Add Video Overlay/Watermark
```ts
async function addWatermark(inputFile, watermarkImage) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    let watermarkCanvas = null;
    let watermarkCtx = null;
    
    const conversion = await Conversion.init({
        input,
        output,
        video: {
            process: async (sample) => {
                // Initialize canvas if not done yet
                if (!watermarkCanvas) {
                    watermarkCanvas = new OffscreenCanvas(sample.displayWidth, sample.displayHeight);
                    watermarkCtx = watermarkCanvas.getContext('2d');
                }
                
                // Draw the video frame
                watermarkCtx.drawImage(sample, 0, 0);
                
                // Draw watermark image at bottom-right corner
                const padding = 20;
                watermarkCtx.drawImage(
                    watermarkImage, 
                    watermarkCanvas.width - watermarkImage.width - padding, 
                    watermarkCanvas.height - watermarkImage.height - padding
                );
                
                return watermarkCanvas;
            }
        }
    });
    
    await conversion.execute();
    
    const watermarkedBuffer = output.target.buffer;
    const watermarkedBlob = new Blob([watermarkedBuffer], { type: 'video/mp4' });
    
    await input.end();
    
    return watermarkedBlob;
}
```

### Example 7: Apply Grayscale Filter
```ts
async function applyGrayscaleFilter(inputFile) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    let grayscaleCanvas = null;
    let grayscaleCtx = null;
    
    const conversion = await Conversion.init({
        input,
        output,
        video: {
            process: async (sample) => {
                if (!grayscaleCanvas) {
                    grayscaleCanvas = new OffscreenCanvas(sample.displayWidth, sample.displayHeight);
                    grayscaleCtx = grayscaleCanvas.getContext('2d');
                    
                    // Apply grayscale filter
                    grayscaleCtx.filter = 'grayscale(100%)';
                }
                
                grayscaleCtx.drawImage(sample, 0, 0);
                
                return grayscaleCanvas;
            }
        }
    });
    
    await conversion.execute();
    
    const grayscaleBuffer = output.target.buffer;
    const grayscaleBlob = new Blob([grayscaleBuffer], { type: 'video/mp4' });
    
    await input.end();
    
    return grayscaleBlob;
}
```

### Example 8: Color Space Transformation
```ts
async function transformColors(inputFile, brightness = 0, contrast = 1, saturation = 1) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    let colorTransformCanvas = null;
    let colorTransformCtx = null;
    
    const conversion = await Conversion.init({
        input,
        output,
        video: {
            process: async (sample) => {
                if (!colorTransformCanvas) {
                    colorTransformCanvas = new OffscreenCanvas(sample.displayWidth, sample.displayHeight);
                    colorTransformCtx = colorTransformCanvas.getContext('2d');
                }
                
                // Reset filter for each frame
                colorTransformCtx.filter = `brightness(${1 + brightness}) 
                                          contrast(${contrast}) 
                                          saturate(${saturation})`;
                
                colorTransformCtx.drawImage(sample, 0, 0);
                
                return colorTransformCanvas;
            }
        }
    });
    
    await conversion.execute();
    
    const transformedBuffer = output.target.buffer;
    const transformedBlob = new Blob([transformedBuffer], { type: 'video/mp4' });
    
    await input.end();
    
    return transformedBlob;
}
```

### Example 9: Trim Video
```ts
async function trimVideo(inputFile, startSeconds, endSeconds) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        trim: {
            start: startSeconds,
            end: endSeconds
        }
    });
    
    await conversion.execute();
    
    const trimmedBuffer = output.target.buffer;
    const trimmedBlob = new Blob([trimmedBuffer], { type: 'video/mp4' });
    
    await input.end();
    
    return trimmedBlob;
}
```

### Example 10: Hardware Acceleration
```ts
async function processWithHardwareAcceleration(inputFile) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        video: {
            hardwareAcceleration: 'prefer-hardware',  // Use hardware acceleration when possible
            width: 1920,
            height: 1080
        }
    });
    
    await conversion.execute();
    
    const processedBuffer = output.target.buffer;
    const processedBlob = new Blob([processedBuffer], { type: 'video/mp4' });
    
    await input.end();
    
    return processedBlob;
}
```

## Performance Tips

- Use hardware acceleration when available to improve processing speed
- Apply transformations in a single conversion operation rather than chaining multiple operations
- For complex processing, consider using Web Workers to avoid blocking the main thread
- Optimize canvas creation by reusing canvases when possible
- Limit frame rate when processing to balance quality and performance
- For transparency handling, be aware that some formats don't support alpha channels