export function filenameToTitle(filename: string): string {
  // Remove the file extension
  const nameWithoutExtension = filename.replace(/\.[^/.]+$/, "");

  // Split by hyphens or underscores
  const words = nameWithoutExtension.split(/[-_]/);

  // Capitalize each word and join with spaces
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
