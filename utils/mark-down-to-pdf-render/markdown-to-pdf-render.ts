import { jsPDF } from 'jspdf';
import { marked } from 'marked';
import html2canvas from 'html2canvas';

/**
 * Converts markdown text to PDF and downloads it
 * @param markdownContent - The markdown text to convert to PDF
 * @param fileName - The name of the PDF file to download (optional, defaults to 'document.pdf')
 * @param options - Additional options for PDF generation
 */
export const convertMarkdownToPDF = async (
  markdownContent: string,
  fileName: string = 'document.pdf',
  options?: {
    orientation?: 'portrait' | 'landscape';
    unit?: 'pt' | 'mm' | 'cm' | 'in' | 'px';
    format?: string | [number, number];
    fontSize?: number;
    lineHeight?: number;
    margin?: [number, number, number, number]; // [top, right, bottom, left]
  }
): Promise<void> => {
  try {
    // Parse markdown to HTML
    const htmlContent = await marked(markdownContent);

    // Create a temporary element to render HTML content for styling
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;
    tempElement.style.position = 'absolute';
    tempElement.style.left = '-9999px';
    tempElement.style.top = '0';
    tempElement.style.width = '210mm'; // A4 width
    tempElement.style.padding = '20px';
    tempElement.style.fontFamily = 'Arial, sans-serif';
    tempElement.style.fontSize = `${options?.fontSize || 12}pt`;
    tempElement.style.lineHeight = `${options?.lineHeight || 1.5}`;
    tempElement.style.whiteSpace = 'pre-wrap';
    tempElement.style.wordWrap = 'break-word';

    document.body.appendChild(tempElement);

    // Wait for any images to load
    await new Promise(resolve => setTimeout(resolve, 500));

    // Create a new jsPDF instance
    const doc = new jsPDF({
      orientation: options?.orientation || 'portrait',
      unit: options?.unit || 'mm',
      format: options?.format || 'a4',
    });

    // Use html2canvas to convert the HTML element to canvas, then add to PDF
    const canvas = await html2canvas(tempElement, {
      scale: 2, // Better quality rendering
      useCORS: true, // Handle cross-origin images
      allowTaint: true,
    } as any); // Type assertion to bypass TypeScript error for scale property

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = doc.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add image to PDF
    doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Clean up
    document.body.removeChild(tempElement);

    // Download the PDF
    doc.save(fileName);
  } catch (error) {
    console.error('Error converting markdown to PDF:', error);
    throw error;
  }
};

/**
 * Alternative method to convert markdown to PDF using plain text rendering
 * This method is more reliable for simple formatting
 */
export const convertMarkdownToPDFTextOnly = (
  markdownContent: string,
  fileName: string = 'document.pdf',
  options?: {
    orientation?: 'portrait' | 'landscape';
    unit?: 'pt' | 'mm' | 'cm' | 'in' | 'px';
    format?: string | [number, number];
    fontSize?: number;
    lineHeight?: number;
    margin?: [number, number, number, number]; // [top, right, bottom, left]
  }
): void => {
  try {
    // Parse markdown to plain text with basic formatting
    const plainText = markdownToPlainText(markdownContent);
    
    const doc = new jsPDF({
      orientation: options?.orientation || 'portrait',
      unit: options?.unit || 'mm',
      format: options?.format || 'a4',
    });

    const fontSize = options?.fontSize || 12;
    const lineHeight = options?.lineHeight || 1.5;
    doc.setFontSize(fontSize);

    const margins = options?.margin || [20, 20, 20, 20]; // [top, right, bottom, left]
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const textWidth = pageWidth - margins[1] - margins[3]; // width accounting for left and right margins
    
    // Split text into lines that fit within the page width
    const splitText = doc.splitTextToSize(plainText, textWidth);
    
    let yPosition = margins[0]; // Start with top margin
    const lineHeightPx = fontSize * lineHeight;
    
    for (let i = 0; i < splitText.length; i++) {
      // Check if we need a new page
      if (yPosition + lineHeightPx > pageHeight - margins[2]) {
        doc.addPage();
        yPosition = margins[0]; // Reset y position with top margin
      }
      
      doc.text(splitText[i], margins[3], yPosition); // x position with left margin
      yPosition += lineHeightPx;
    }

    doc.save(fileName);
  } catch (error) {
    console.error('Error converting markdown to PDF (text only):', error);
    throw error;
  }
};

/**
 * Helper function to convert markdown to plain text with minimal formatting
 */
const markdownToPlainText = (markdown: string): string => {
  // Basic conversion by removing markdown syntax
  const plainText = markdown
  
    // Remove headers
    .replace(/^### (.*$)/gim, '$1')
    .replace(/^## (.*$)/gim, '$1')
    .replace(/^# (.*$)/gim, '$1')
    
    // Remove bold/italic formatting
    .replace(/\*\*(.*?)\*\*/g, '$1')  // Bold
    .replace(/\*(.*?)\*/g, '$1')      // Italic
    .replace(/__(.*?)__/g, '$1')      // Bold
    .replace(/_(.*?)_/g, '$1')        // Italic
    
    // Remove links and images, keeping just the text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // Links
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1') // Images
    
    // Remove inline code
    .replace(/`([^`]+)`/g, '$1')
    
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    
    // Remove blockquotes
    .replace(/^\s*>\s*/gm, '')
    
    // Remove list items indicators
    .replace(/^\s*[\*\-\+]\s/gm, '')
    .replace(/^\s*\d+\.\s/gm, '')
    
    // Normalize whitespace
    .replace(/\n\s*\n/g, '\n\n')
    .trim();

  return plainText;
};

/**
 * Convert markdown with basic formatting preservation
 */
export const convertMarkdownToPDFWithBasicFormatting = (
  markdownContent: string,
  fileName: string = 'document.pdf',
  options?: {
    orientation?: 'portrait' | 'landscape';
    unit?: 'pt' | 'mm' | 'cm' | 'in' | 'px';
    format?: string | [number, number];
    fontSize?: number;
    lineHeight?: number;
    margin?: [number, number, number, number];
  }
): void => {
  try {
    const doc = new jsPDF({
      orientation: options?.orientation || 'portrait',
      unit: options?.unit || 'mm',
      format: options?.format || 'a4',
    });

    const fontSize = options?.fontSize || 12;
    const lineHeight = options?.lineHeight || 1.5;
    const margins = options?.margin || [20, 20, 20, 20];
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = pageWidth - margins[1] - margins[3];
    const pageHeight = doc.internal.pageSize.getHeight();
    
    let yPosition = margins[0];
    const lineHeightPx = fontSize * lineHeight;
    
    // Split markdown into lines
    const lines = markdownContent.split('\n');
    
    for (const line of lines) {
      // Check if line is a header
      if (line.startsWith('#')) {
        const headerLevel = line.match(/^#+/)?.[0].length || 1;
        const headerSize = fontSize * (headerLevel >= 3 ? 1.2 : 1.5 / headerLevel);
        
        // Add new page if needed
        if (yPosition + headerSize * lineHeight > pageHeight - margins[2]) {
          doc.addPage();
          yPosition = margins[0];
        }
        
        doc.setFontSize(headerSize);
        doc.setFont('', 'bold');
        const headerText = line.replace(/^#+\s*/, '');
        const headerSplit = doc.splitTextToSize(headerText, textWidth);

        for (let i = 0; i < headerSplit.length; i++) {
          doc.text(headerSplit[i], margins[3], yPosition);
          yPosition += headerSize * lineHeight;

          // Add extra space after headers
          if (i === headerSplit.length - 1) {
            yPosition += fontSize * 0.5;
          }
        }
        doc.setFont('', 'normal');
        doc.setFontSize(fontSize);
      }
      // Check if line is a list item
      else if (line.trim().startsWith('- ') || /^\d+\.\s/.test(line)) {
        // Add new page if needed
        if (yPosition + lineHeightPx > pageHeight - margins[2]) {
          doc.addPage();
          yPosition = margins[0];
        }
        
        const listItem = line.replace(/^[\s\-\d\.]+\s*/, '• ');
        const listItemSplit = doc.splitTextToSize(listItem, textWidth);
        
        for (let i = 0; i < listItemSplit.length; i++) {
          doc.text(listItemSplit[i], margins[3] + 5, yPosition); // Indent list items
          yPosition += lineHeightPx;
        }
      }
      // Regular paragraph
      else {
        const paragraphText = line.trim();
        if (paragraphText) {
          const paragraphSplit = doc.splitTextToSize(paragraphText, textWidth);
          
          for (let i = 0; i < paragraphSplit.length; i++) {
            // Add new page if needed
            if (yPosition + lineHeightPx > pageHeight - margins[2]) {
              doc.addPage();
              yPosition = margins[0];
            }
            
            doc.text(paragraphSplit[i], margins[3], yPosition);
            yPosition += lineHeightPx;
          }
        } else {
          // Add extra space for paragraph breaks
          if (yPosition + lineHeightPx > pageHeight - margins[2]) {
            doc.addPage();
            yPosition = margins[0];
          }
          yPosition += lineHeightPx;
        }
      }
    }

    doc.save(fileName);
  } catch (error) {
    console.error('Error converting markdown to PDF with formatting:', error);
    throw error;
  }
};