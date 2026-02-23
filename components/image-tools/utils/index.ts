// Export image-to-pdf conversion utilities
export {
  fileToBase64,
  getImageDimensions,
  createPdfFromImages,
  convertImagesToPdf,
  validateImageFiles,
  createImageFiles,
  cleanupImageFiles,
  formatFileSize,
  DEFAULT_IMAGE_TO_PDF_OPTIONS,
  type ImageToPdfOptions,
  type ImageFile,
  type ConversionResult,
  type ImageDimensions
} from './image-to-pdf'

// Export ZIP utilities
export {
  createZipFile,
  downloadFile,
  createAndDownloadZip,
  type ZipFile,
  type ZipOptions
} from './zip-utils'

// Export image format conversion utilities
export {
  SUPPORTED_INPUT_FORMATS,
  SUPPORTED_OUTPUT_FORMATS,
  FORMAT_DESCRIPTIONS,
  MIME_TYPE_MAP,
  validateInputFormat,
  validateOutputFormat,
  getInputFormatInfo,
  getOutputFormatInfo,
  detectFormatFromFileName,
  detectFormatFromFile,
  getMimeType,
  validateImageFile,
  validateImageFiles as validateImageFormatFiles,
  convertImageFile,
  convertMultipleImageFiles,
  getAvailableOutputFormats,
  convertImageToDownloadUrl,
  convertImagesToZip,
  downloadBlob,
  downloadConvertedImage,
  downloadConvertedImagesAsZip,
  formatFileSize as formatImageFileSize,
  createImagePreview,
  cleanupImagePreview,
  type ImageConversionOptions,
  type ImageConversionResult,
  type ImageFormatInfo
} from './image-format-converter'

// Export image resizing utilities
export {
  resizeAndGetImageData,
  getImageDimensions as getImageResizeDimensions,
  validateImageFile as validateResizeImageFile,
  validateImageFiles as validateResizeImageFiles,
  createResizedImage,
  getAspectRatio,
  calculateResizedDimensions,
  IMAGE_DIMENSION_PRESETS,
  type ImageDataInput,
  type ImageDimensions as ResizeImageDimensions,
  type ImageDimensionPreset
} from './image-resizer'

// Export bulk image processing utilities
export {
  createImageFiles as createBulkImageFiles,
  updateImageFileStatus,
  processBulkImages,
  createZipFromProcessedImages,
  downloadProcessedImagesAsZip,
  cleanupImageFiles as cleanupBulkImageFiles,
  calculateProcessingStats,
  filterImagesByStatus,
  formatFileSize as formatBulkFileSize,
  type ProcessingProgress,
  type ProcessedImageFile,
  type BulkProcessingOptions,
  type ZipCreationOptions
} from './bulk-image-processor'

// Export compression utilities
export {
  compressImage,
  compressImageData,
  createCompressionResult,
  validateCompressionOptions,
  getCompressionPreset,
  estimateQualityForTargetSize,
  analyzeCompressionPotential,
  COMPRESSION_PRESETS,
  type CompressionOptions,
  type CompressionResult,
  type CompressionProgress,
  type CompressionPreset
} from './compression-utils'

// Export background removal utilities
export {
  loadImageData as loadBackgroundImageData,
  validateImageFile as validateBackgroundImageFile,
  removeImageBackground,
  processBackgroundRemoval,
  downloadProcessedImage,
  extractImageMetadata,
  calculateAspectRatio as calculateBackgroundAspectRatio,
  cleanupObjectUrls,
  getBackgroundRemovalPreset,
  analyzeImageForBackgroundRemoval,
  BACKGROUND_REMOVAL_PRESETS,
  formatFileSize as formatBackgroundFileSize,
  type ImageData as BackgroundImageData,
  type BackgroundRemovalOptions,
  type BackgroundRemovalResult,
  type BackgroundRemovalPreset
} from './background-remover'