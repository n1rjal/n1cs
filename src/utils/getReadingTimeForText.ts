function estimateReadingTime(markdown: string, wpm: number = 200): string {
  // Remove markdown syntax (links, formatting, etc.)
  const text = markdown
    .replace(/[#_*>\-\[\]()`~]/g, "") // remove markdown symbols
    .replace(/!\[.*?\]\(.*?\)/g, "") // remove images
    .replace(/\[.*?\]\(.*?\)/g, "") // remove links
    .replace(/\s+/g, " ") // normalize whitespace
    .trim();

  const words = text.split(" ").filter(Boolean).length;
  const minutes = words / wpm;

  if (minutes < 1) {
    return "< 1 min read";
  }


  return `${Math.ceil(minutes)} mins read`;
}
