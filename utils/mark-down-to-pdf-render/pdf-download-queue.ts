interface PDFDownloadItem {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}

/**
 * Adds a result to the PDF download queue in localStorage
 * @param title The title of the result
 * @param content The content of the result in markdown format
 * @returns The ID of the added item
 */
export const addToPDFDownloadQueue = (
  title: string,
  content: string,
): string => {
  // Generate a unique ID using timestamp and random number
  const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Get current page URL without query parameters
  const pageUrl = typeof window !== "undefined" ? window.location.pathname : "";

  // Create the key using the page URL
  const queueKey = `${pageUrl}-pdf-download-result`;

  // Get existing items from localStorage
  const existingItemsJSON =
    typeof window !== "undefined" ? localStorage.getItem(queueKey) : null;
  const existingItems: PDFDownloadItem[] = existingItemsJSON
    ? JSON.parse(existingItemsJSON)
    : [];

  // Create new item
  const newItem: PDFDownloadItem = {
    id,
    title,
    content,
    timestamp: Date.now(),
  };

  // Add new item to the beginning of the array
  const updatedItems = [newItem, ...existingItems];

  // Store updated items back to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem(queueKey, JSON.stringify(updatedItems));
  }

  return id;
};

/**
 * Gets all items from the PDF download queue
 * @returns Array of items in the queue
 */
export const getPDFDownloadQueue = (): PDFDownloadItem[] => {
  // Get current page URL without query parameters
  const pageUrl = typeof window !== "undefined" ? window.location.pathname : "";

  // Create the key using the page URL
  const queueKey = `${pageUrl}-pdf-download-result`;

  // Get items from localStorage
  const itemsJSON =
    typeof window !== "undefined" ? localStorage.getItem(queueKey) : null;

  return itemsJSON ? JSON.parse(itemsJSON) : [];
};

/**
 * Gets the count of items in the PDF download queue
 * @returns Number of items in the queue
 */
export const getPDFDownloadQueueCount = (): number => {
  return getPDFDownloadQueue().length;
};

/**
 * Clears all items from the PDF download queue
 */
export const clearPDFDownloadQueue = (): void => {
  // Get current page URL without query parameters
  const pageUrl = typeof window !== "undefined" ? window.location.pathname : "";

  // Create the key using the page URL
  const queueKey = `${pageUrl}-pdf-download-result`;

  // Remove the item from localStorage
  if (typeof window !== "undefined") {
    localStorage.removeItem(queueKey);
  }
};

/**
 * Removes a specific item from the PDF download queue
 * @param id The ID of the item to remove
 */
export const removeFromPDFDownloadQueue = (id: string): void => {
  // Get current page URL without query parameters
  const pageUrl = typeof window !== "undefined" ? window.location.pathname : "";

  // Create the key using the page URL
  const queueKey = `${pageUrl}-pdf-download-result`;

  // Get existing items from localStorage
  const existingItemsJSON =
    typeof window !== "undefined" ? localStorage.getItem(queueKey) : null;
  const existingItems: PDFDownloadItem[] = existingItemsJSON
    ? JSON.parse(existingItemsJSON)
    : [];

  // Filter out the item with the specified ID
  const updatedItems = existingItems.filter((item) => item.id !== id);

  // Store updated items back to localStorage if there are items remaining, otherwise remove the key
  if (typeof window !== "undefined") {
    if (updatedItems.length > 0) {
      localStorage.setItem(queueKey, JSON.stringify(updatedItems));
    } else {
      localStorage.removeItem(queueKey);
    }
  }
};

/**
 * Generates a markdown string for all items in the queue
 * @returns Markdown content for all items
 */
export const generatePDFMarkdownContent = (): string => {
  const items = getPDFDownloadQueue();

  if (items.length === 0) {
    return "# No results to download";
  }

  let markdown = "# Calculation Results\n";
  markdown += `Generated on: ${new Date().toLocaleString()}\n\n`;

  items.forEach((item, index) => {
    markdown += `## ${index + 1}. ${item.title}\n`;
    markdown += `${item.content}\n`;
    markdown += "---"; // Separator between results
  });

  markdown += "by 1000freetools.com";

  return markdown;
};
