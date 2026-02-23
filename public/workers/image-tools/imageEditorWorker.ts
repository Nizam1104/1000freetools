/**
 * Image Editor Worker
 * Handles CPU-intensive image processing operations for the image editor
 */

// Image processing functions
class ImageProcessor {
  canvas: OffscreenCanvas | null = null
  ctx: OffscreenCanvasRenderingContext2D | null = null

  initCanvas(width: number, height: number) {
    this.canvas = new OffscreenCanvas(width, height)
    this.ctx = this.canvas.getContext('2d')
    return this.canvas
  }

  async loadImage(imageData: Blob) {
    const bitmap = await createImageBitmap(imageData)
    return bitmap
  }

  // Crop functionality
  async cropImage(imageData: Blob, cropArea: any) {
    const { x, y, width, height } = cropArea
    const bitmap = await this.loadImage(imageData)

    const canvas = new OffscreenCanvas(width, height)
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      bitmap.close()
      throw new Error('Failed to get canvas context')
    }

    ctx.drawImage(bitmap, x, y, width, height, 0, 0, width, height)
    bitmap.close()

    return canvas
  }

  // Resize functionality
  async resizeImage(imageData: Blob, newWidth: number, newHeight: number, maintainAspect = true) {
    const bitmap = await this.loadImage(imageData)

    let finalWidth = newWidth
    let finalHeight = newHeight

    if (maintainAspect) {
      const aspectRatio = bitmap.width / bitmap.height
      if (newWidth / newHeight > aspectRatio) {
        finalWidth = newHeight * aspectRatio
      } else {
        finalHeight = newWidth / aspectRatio
      }
    }

    const canvas = new OffscreenCanvas(finalWidth, finalHeight)
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      bitmap.close()
      throw new Error('Failed to get canvas context')
    }

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(bitmap, 0, 0, finalWidth, finalHeight)
    bitmap.close()

    return canvas
  }

  // Rotate functionality
  async rotateImage(imageData: Blob, angle: number) {
    const bitmap = await this.loadImage(imageData)
    const radians = (angle * Math.PI) / 180

    // Calculate new dimensions after rotation
    const sin = Math.abs(Math.sin(radians))
    const cos = Math.abs(Math.cos(radians))
    const newWidth = bitmap.width * cos + bitmap.height * sin
    const newHeight = bitmap.width * sin + bitmap.height * cos

    const canvas = new OffscreenCanvas(newWidth, newHeight)
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      bitmap.close()
      throw new Error('Failed to get canvas context')
    }

    // Move to center, rotate, then move back
    ctx.translate(newWidth / 2, newHeight / 2)
    ctx.rotate(radians)
    ctx.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2)
    bitmap.close()

    return canvas
  }

  // Flip functionality
  async flipImage(imageData: Blob, direction: 'horizontal' | 'vertical') {
    const bitmap = await this.loadImage(imageData)
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      bitmap.close()
      throw new Error('Failed to get canvas context')
    }

    if (direction === 'horizontal') {
      ctx.scale(-1, 1)
      ctx.drawImage(bitmap, -bitmap.width, 0)
    } else {
      ctx.scale(1, -1)
      ctx.drawImage(bitmap, 0, -bitmap.height)
    }

    bitmap.close()
    return canvas
  }

  // Basic filters
  async applyFilter(imageData: Blob, filterType: string, intensity = 100) {
    const bitmap = await this.loadImage(imageData)
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      bitmap.close()
      throw new Error('Failed to get canvas context')
    }

    ctx.drawImage(bitmap, 0, 0)
    const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageDataObj.data
    const factor = intensity / 100

    switch (filterType) {
      case 'grayscale':
        for (let i = 0; i < data.length; i += 4) {
          const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
          data[i] = data[i] + (gray - data[i]) * factor     // R
          data[i + 1] = data[i + 1] + (gray - data[i + 1]) * factor // G
          data[i + 2] = data[i + 2] + (gray - data[i + 2]) * factor // B
        }
        break

      case 'sepia':
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]

          data[i] = Math.min(255, (r * 0.393 + g * 0.769 + b * 0.189) * factor + r * (1 - factor))
          data[i + 1] = Math.min(255, (r * 0.349 + g * 0.686 + b * 0.168) * factor + g * (1 - factor))
          data[i + 2] = Math.min(255, (r * 0.272 + g * 0.534 + b * 0.131) * factor + b * (1 - factor))
        }
        break

      case 'brightness':
        const brightness = (intensity - 50) * 2.55
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.max(0, Math.min(255, data[i] + brightness))
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + brightness))
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + brightness))
        }
        break

      case 'contrast':
        const contrast = (intensity - 50) / 50
        const intercept = 128 * (1 - contrast)
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.max(0, Math.min(255, data[i] * contrast + intercept))
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1] * contrast + intercept))
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2] * contrast + intercept))
        }
        break

      case 'blur':
        // Simple box blur
        const blurRadius = Math.floor(intensity / 20)
        const tempData = new Uint8ClampedArray(data)
        const width = canvas.width
        const height = canvas.height

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0, a = 0
            let count = 0

            for (let dy = -blurRadius; dy <= blurRadius; dy++) {
              for (let dx = -blurRadius; dx <= blurRadius; dx++) {
                const nx = x + dx
                const ny = y + dy

                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                  const idx = (ny * width + nx) * 4
                  r += tempData[idx]
                  g += tempData[idx + 1]
                  b += tempData[idx + 2]
                  a += tempData[idx + 3]
                  count++
                }
              }
            }

            const idx = (y * width + x) * 4
            data[idx] = r / count
            data[idx + 1] = g / count
            data[idx + 2] = b / count
            data[idx + 3] = a / count
          }
        }
        break

      case 'sharpen':
        const sharpen = intensity / 100
        const kernel = [
          0, -1 * sharpen, 0,
          -1 * sharpen, 1 + 4 * sharpen, -1 * sharpen,
          0, -1 * sharpen, 0
        ]
        this.applyConvolution(data, canvas.width, canvas.height, kernel)
        break
    }

    ctx.putImageData(imageDataObj, 0, 0)
    bitmap.close()
    return canvas
  }

  applyConvolution(data: Uint8ClampedArray, width: number, height: number, kernel: number[]) {
    const tempData = new Uint8ClampedArray(data)
    const kernelSize = Math.sqrt(kernel.length)
    const halfKernel = Math.floor(kernelSize / 2)

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0, g = 0, b = 0

        for (let ky = 0; ky < kernelSize; ky++) {
          for (let kx = 0; kx < kernelSize; kx++) {
            const nx = x + kx - halfKernel
            const ny = y + ky - halfKernel

            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              const idx = (ny * width + nx) * 4
              const kernelIdx = ky * kernelSize + kx
              r += tempData[idx] * kernel[kernelIdx]
              g += tempData[idx + 1] * kernel[kernelIdx]
              b += tempData[idx + 2] * kernel[kernelIdx]
            }
          }
        }

        const idx = (y * width + x) * 4
        data[idx] = Math.max(0, Math.min(255, r))
        data[idx + 1] = Math.max(0, Math.min(255, g))
        data[idx + 2] = Math.max(0, Math.min(255, b))
      }
    }
  }

  // Advanced Adjustments
  async adjustImage(imageData: Blob, adjustments: any) {
    const bitmap = await this.loadImage(imageData)
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      bitmap.close()
      throw new Error('Failed to get canvas context')
    }

    ctx.drawImage(bitmap, 0, 0)
    const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageDataObj.data
    const width = canvas.width
    const height = canvas.height

    // Apply adjustments
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i]
      let g = data[i + 1]
      let b = data[i + 2]

      // Brightness
      if (adjustments.brightness !== undefined) {
        const brightness = (adjustments.brightness - 50) * 2.55
        r = Math.max(0, Math.min(255, r + brightness))
        g = Math.max(0, Math.min(255, g + brightness))
        b = Math.max(0, Math.min(255, b + brightness))
      }

      // Contrast
      if (adjustments.contrast !== undefined) {
        const contrast = adjustments.contrast / 50
        const intercept = 128 * (1 - contrast)
        r = Math.max(0, Math.min(255, r * contrast + intercept))
        g = Math.max(0, Math.min(255, g * contrast + intercept))
        b = Math.max(0, Math.min(255, b * contrast + intercept))
      }

      // Exposure (compounds brightness)
      if (adjustments.exposure !== undefined) {
        const exposure = Math.pow(2, (adjustments.exposure - 50) / 50)
        r = Math.max(0, Math.min(255, r * exposure))
        g = Math.max(0, Math.min(255, g * exposure))
        b = Math.max(0, Math.min(255, b * exposure))
      }

      // Saturation
      if (adjustments.saturation !== undefined) {
        const saturation = adjustments.saturation / 50
        const gray = 0.299 * r + 0.587 * g + 0.114 * b
        r = Math.max(0, Math.min(255, gray + saturation * (r - gray)))
        g = Math.max(0, Math.min(255, gray + saturation * (g - gray)))
        b = Math.max(0, Math.min(255, gray + saturation * (b - gray)))
      }

      // Vibrance (protects skin tones)
      if (adjustments.vibrance !== undefined) {
        const vibrance = (adjustments.vibrance - 50) / 50
        const max = Math.max(r, g, b)
        const avg = (r + g + b) / 3
        const amt = ((Math.abs(max - avg) * 2 / 255) * vibrance) / 100

        if (r !== max) r = r + (max - r) * amt
        if (g !== max) g = g + (max - g) * amt
        if (b !== max) b = b + (max - b) * amt

        r = Math.max(0, Math.min(255, r))
        g = Math.max(0, Math.min(255, g))
        b = Math.max(0, Math.min(255, b))
      }

      // Highlights and Shadows
      if (adjustments.highlights !== undefined || adjustments.shadows !== undefined) {
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b

        if (adjustments.highlights !== undefined && luminance > 180) {
          const highlightAdjust = (adjustments.highlights - 50) / 50
          const factor = 1 + highlightAdjust * 0.5
          r = Math.max(0, Math.min(255, r * factor))
          g = Math.max(0, Math.min(255, g * factor))
          b = Math.max(0, Math.min(255, b * factor))
        }

        if (adjustments.shadows !== undefined && luminance < 80) {
          const shadowAdjust = (adjustments.shadows - 50) / 50
          const factor = 1 + shadowAdjust * 0.5
          r = Math.max(0, Math.min(255, r * factor))
          g = Math.max(0, Math.min(255, g * factor))
          b = Math.max(0, Math.min(255, b * factor))
        }
      }

      // Temperature & Tint (White Balance)
      if (adjustments.temperature !== undefined) {
        const temp = (adjustments.temperature - 50) / 50
        r = Math.max(0, Math.min(255, r * (1 + temp * 0.3)))
        b = Math.max(0, Math.min(255, b * (1 - temp * 0.3)))
      }

      if (adjustments.tint !== undefined) {
        const tint = (adjustments.tint - 50) / 50
        g = Math.max(0, Math.min(255, g * (1 + tint * 0.2)))
        r = Math.max(0, Math.min(255, r * (1 - tint * 0.1)))
        b = Math.max(0, Math.min(255, b * (1 - tint * 0.1)))
      }

      // Clarity (mid-tone contrast)
      if (adjustments.clarity !== undefined) {
        const clarity = adjustments.clarity / 50
        const midtoneBoost = 1 + (clarity - 1) * 0.5
        const currentLuminance = 0.299 * r + 0.587 * g + 0.114 * b
        if (currentLuminance > 60 && currentLuminance < 200) {
          r = Math.max(0, Math.min(255, r * midtoneBoost))
          g = Math.max(0, Math.min(255, g * midtoneBoost))
          b = Math.max(0, Math.min(255, b * midtoneBoost))
        }
      }

      data[i] = r
      data[i + 1] = g
      data[i + 2] = b
    }

    // Sharpening (applied after color adjustments)
    if (adjustments.sharpness !== undefined && adjustments.sharpness > 50) {
      const sharpenAmount = (adjustments.sharpness - 50) / 100
      const sharpenKernel = [
        0, -1 * sharpenAmount, 0,
        -1 * sharpenAmount, 1 + 4 * sharpenAmount, -1 * sharpenAmount,
        0, -1 * sharpenAmount, 0
      ]
      this.applyConvolution(data, width, height, sharpenKernel)
    }

    ctx.putImageData(imageDataObj, 0, 0)
    bitmap.close()
    return canvas
  }

  // Advanced Filters
  async applyAdvancedFilter(imageData: Blob, filterType: string, intensity = 100) {
    const bitmap = await this.loadImage(imageData)
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      bitmap.close()
      throw new Error('Failed to get canvas context')
    }

    ctx.drawImage(bitmap, 0, 0)
    const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageDataObj.data
    const factor = intensity / 100

    switch (filterType) {
      case 'vintage':
        // Vintage/warm filter
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.2 * factor + data[i] * (1 - factor))
          data[i + 1] = Math.min(255, data[i + 1] * 1.0 * factor + data[i + 1] * (1 - factor))
          data[i + 2] = Math.min(255, data[i + 2] * 0.8 * factor + data[i + 2] * (1 - factor))
        }
        break

      case 'cold':
        // Cold/blue filter
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 0.9 * factor + data[i] * (1 - factor))
          data[i + 1] = Math.min(255, data[i + 1] * 0.95 * factor + data[i + 1] * (1 - factor))
          data[i + 2] = Math.min(255, data[i + 2] * 1.3 * factor + data[i + 2] * (1 - factor))
        }
        break

      case 'dramatic':
        // High contrast drama filter
        for (let i = 0; i < data.length; i += 4) {
          const contrast = 1.5 * factor
          data[i] = Math.max(0, Math.min(255, (data[i] - 128) * contrast + 128))
          data[i + 1] = Math.max(0, Math.min(255, (data[i + 1] - 128) * contrast + 128))
          data[i + 2] = Math.max(0, Math.min(255, (data[i + 2] - 128) * contrast + 128))
        }
        break

      case 'fade':
        // Faded/retro filter
        for (let i = 0; i < data.length; i += 4) {
          const fade = 0.2 * factor
          data[i] = Math.min(255, data[i] + (255 - data[i]) * fade)
          data[i + 1] = Math.min(255, data[i + 1] + (255 - data[i + 1]) * fade)
          data[i + 2] = Math.min(255, data[i + 2] + (255 - data[i + 2]) * fade)
        }
        break

      case 'vignette':
        // Vignette effect (darken edges)
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const maxDist = Math.sqrt(centerX * centerX + centerY * centerY)
        const vignetteStrength = factor * 0.7

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)
            const vignette = 1 - (dist / maxDist) * vignetteStrength

            const idx = (y * canvas.width + x) * 4
            data[idx] *= vignette
            data[idx + 1] *= vignette
            data[idx + 2] *= vignette
          }
        }
        break
    }

    ctx.putImageData(imageDataObj, 0, 0)
    bitmap.close()
    return canvas
  }

  // Background blur
  async applyBackgroundBlur(imageData: Blob, blurStrength = 20) {
    const bitmap = await this.loadImage(imageData)
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      bitmap.close()
      throw new Error('Failed to get canvas context')
    }

    // Draw the original image
    ctx.drawImage(bitmap, 0, 0)

    // Apply a strong blur filter to the entire image
    ctx.filter = `blur(${blurStrength}px)`
    ctx.drawImage(canvas, 0, 0)

    bitmap.close()
    return canvas
  }

  // Remove red eye
  async removeRedEye(imageData: Blob, eyeRegions: any[]) {
    const bitmap = await this.loadImage(imageData)
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      bitmap.close()
      throw new Error('Failed to get canvas context')
    }

    ctx.drawImage(bitmap, 0, 0)

    for (const region of eyeRegions) {
      const { x, y, width, height } = region
      const eyeData = ctx.getImageData(x, y, width, height)
      const data = eyeData.data

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]

        // Detect red eye (high red channel, low green and blue)
        if (r > 150 && g < 100 && b < 100 && r > g * 1.5 && r > b * 1.5) {
          // Desaturate the red
          const gray = 0.299 * r + 0.587 * g + 0.114 * b
          data[i] = gray
          data[i + 1] = gray
          data[i + 2] = gray
        }
      }

      ctx.putImageData(eyeData, x, y)
    }

    bitmap.close()
    return canvas
  }

  // Skin smoothing
  async smoothSkin(imageData: Blob, strength = 50) {
    const bitmap = await this.loadImage(imageData)
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      bitmap.close()
      throw new Error('Failed to get canvas context')
    }

    ctx.drawImage(bitmap, 0, 0)
    const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageDataObj.data
    const factor = strength / 100

    // Simple skin smoothing using bilateral filter approximation
    const tempData = new Uint8ClampedArray(data)
    const width = canvas.width
    const height = canvas.height
    const radius = Math.floor(3 * factor)

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4
        const r = data[idx]
        const g = data[idx + 1]
        const b = data[idx + 2]

        // Detect skin tones (simplified)
        const isSkin = r > 95 && g > 40 && b > 20 &&
                     r > g && r > b &&
                     Math.abs(r - g) > 15 &&
                     Math.max(r, g, b) - Math.min(r, g, b) > 15

        if (isSkin) {
          let sumR = 0, sumG = 0, sumB = 0, count = 0

          for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
              const nx = x + dx
              const ny = y + dy

              if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                const nIdx = (ny * width + nx) * 4
                sumR += tempData[nIdx]
                sumG += tempData[nIdx + 1]
                sumB += tempData[nIdx + 2]
                count++
              }
            }
          }

          data[idx] = sumR / count
          data[idx + 1] = sumG / count
          data[idx + 2] = sumB / count
        }
      }
    }

    ctx.putImageData(imageDataObj, 0, 0)
    bitmap.close()
    return canvas
  }

  // Teeth whitening
  async whitenTeeth(imageData: Blob, strength = 50) {
    const bitmap = await this.loadImage(imageData)
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      bitmap.close()
      throw new Error('Failed to get canvas context')
    }

    ctx.drawImage(bitmap, 0, 0)
    const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageDataObj.data
    const factor = strength / 100

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      // Detect teeth (white/light yellow areas)
      const brightness = (r + g + b) / 3
      const isTeeth = brightness > 200 && r > 200 && g > 200 && b > 180 &&
                     r > b && Math.abs(r - g) < 30

      if (isTeeth) {
        const whitenFactor = 1 + factor * 0.3
        data[i] = Math.min(255, r * whitenFactor)
        data[i + 1] = Math.min(255, g * whitenFactor)
        data[i + 2] = Math.min(255, b * whitenFactor * 1.1) // Slight blue tint reduction
      }
    }

    ctx.putImageData(imageDataObj, 0, 0)
    bitmap.close()
    return canvas
  }
}

// Initialize processor
const processor = new ImageProcessor()

// Handle messages from main thread
self.addEventListener('message', async (event: MessageEvent) => {
  const { type, id, data } = event.data as any

  try {
    let result

    switch (type) {
      case 'crop':
        result = await processor.cropImage(data.imageData, data.cropArea)
        break

      case 'resize':
        result = await processor.resizeImage(
          data.imageData,
          data.width,
          data.height,
          data.maintainAspect
        )
        break

      case 'rotate':
        result = await processor.rotateImage(data.imageData, data.angle)
        break

      case 'flip':
        result = await processor.flipImage(data.imageData, data.direction)
        break

      case 'filter':
        result = await processor.applyFilter(
          data.imageData,
          data.filterType,
          data.intensity
        )
        break

      case 'advancedFilter':
        result = await processor.applyAdvancedFilter(
          data.imageData,
          data.filterType,
          data.intensity
        )
        break

      case 'adjust':
        result = await processor.adjustImage(data.imageData, data.adjustments)
        break

      case 'backgroundBlur':
        result = await processor.applyBackgroundBlur(
          data.imageData,
          data.blurStrength
        )
        break

      case 'removeRedEye':
        result = await processor.removeRedEye(
          data.imageData,
          data.eyeRegions
        )
        break

      case 'smoothSkin':
        result = await processor.smoothSkin(
          data.imageData,
          data.strength
        )
        break

      case 'whitenTeeth':
        result = await processor.whitenTeeth(
          data.imageData,
          data.strength
        )
        break

      default:
        throw new Error(`Unknown operation type: ${type}`)
    }

    // Convert result to blob
    const blob = await result.convertToBlob({ type: 'image/png' })

    // Send back result
    self.postMessage({
      type: 'success',
      id,
      data: blob
    })

  } catch (error: any) {
    self.postMessage({
      type: 'error',
      id,
      error: error?.message || 'Unknown error occurred'
    })
  }
})

// Worker ready signal
self.postMessage({
  type: 'worker-ready'
})