export interface Heading {
  depth: number;
  text: string;
  slug: string;
}

/**
 * Generates a URL-friendly slug from heading text
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
    .trim()
    .replace(/\s+/g, "-"); // Spaces to hyphens
}

/**
 * Strips markdown formatting from text (bold, italic, code, links)
 */
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1") // Bold **text**
    .replace(/\*(.+?)\*/g, "$1") // Italic *text*
    .replace(/__(.+?)__/g, "$1") // Bold __text__
    .replace(/_(.+?)_/g, "$1") // Italic _text_
    .replace(/`(.+?)`/g, "$1") // Inline code `text`
    .replace(/\[(.+?)\]\(.+?\)/g, "$1") // Links [text](url)
    .trim();
}

/**
 * Extracts H2 and H3 headings from raw markdown content
 */
export function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split("\n");
  const headings: Heading[] = [];

  for (const line of lines) {
    // Match ## or ### at start of line (H2 and H3 only)
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const depth = match[1].length;
      const rawText = match[2].trim();
      const text = stripMarkdown(rawText);
      const slug = generateSlug(text);

      headings.push({ depth, text, slug });
    }
  }

  return headings;
}
