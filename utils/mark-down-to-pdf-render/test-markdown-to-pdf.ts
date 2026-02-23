// Test file to demonstrate the usage of markdown-to-pdf-render functionality
import { convertMarkdownToPDF, convertMarkdownToPDFTextOnly, convertMarkdownToPDFWithBasicFormatting } from './markdown-to-pdf-render';

// Sample markdown content for testing
const sampleMarkdown = `# Sample Markdown Document

This is a sample document to demonstrate **markdown to PDF** conversion.

## Features

- Converts markdown text to PDF
- Supports basic formatting
- Allows custom file names
- Includes various layout options

### List Example

1. First item
2. Second item with *italic* text
3. Third item with **bold** text

### Code Block Example

\`\`\`javascript
function helloWorld() {
  console.log("Hello, world!");
}
\`\`\`

### Additional Paragraph

This is an example of a longer paragraph that should wrap properly when converted to PDF. The text should flow naturally within the page margins and create new pages as needed when the content is too long.

> This is a blockquote that should also be handled properly.

[Link to Google](https://www.google.com)

![Sample Image](https://via.placeholder.com/150)

Thank you for using the markdown to PDF converter!
`;

// Example usage of the functions
const testConversion = () => {
  console.log('Testing markdown to PDF conversion...');

  // Method 1: HTML-based conversion (with styling)
  try {
    convertMarkdownToPDF(sampleMarkdown, 'sample-markdown-html.pdf', {
      orientation: 'portrait',
      fontSize: 12,
      lineHeight: 1.5,
      margin: [20, 20, 20, 20]
    });
    console.log('HTML-based PDF conversion started');
  } catch (error) {
    console.error('HTML-based conversion failed:', error);
  }

  // Method 2: Text-only conversion (more reliable)
  try {
    convertMarkdownToPDFTextOnly(sampleMarkdown, 'sample-markdown-text-only.pdf', {
      orientation: 'portrait',
      fontSize: 12,
      lineHeight: 1.5,
      margin: [20, 20, 20, 20]
    });
    console.log('Text-only PDF conversion started');
  } catch (error) {
    console.error('Text-only conversion failed:', error);
  }

  // Method 3: Basic formatting conversion
  try {
    convertMarkdownToPDFWithBasicFormatting(sampleMarkdown, 'sample-markdown-basic-formatting.pdf', {
      orientation: 'portrait',
      fontSize: 12,
      lineHeight: 1.5,
      margin: [20, 20, 20, 20]
    });
    console.log('Basic formatting PDF conversion started');
  } catch (error) {
    console.error('Basic formatting conversion failed:', error);
  }
};

// Note: This function should be called in a browser environment
// testConversion();

export { sampleMarkdown, testConversion };