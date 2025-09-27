const getRelativeDuration = (input: string | number | Date): string => {
  const now = new Date();
  const date = new Date(input);
  const diffMs = now.getTime() - date.getTime();

  if (diffMs < 0) return "just now"; // future-safe

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // approx
  const years = Math.floor(days / 365); // approx

  if (seconds < 60) return "<1m ago";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
};

export default getRelativeDuration;
