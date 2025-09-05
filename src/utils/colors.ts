const neonColors = [
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
  "#FFD700", // Gold
  "#00FF00", // Lime
  "#FF1493", // DeepPink
  "#00BFFF", // DeepSkyBlue
];

export const getRandomNeonColor = () => {
  const randomIndex = Math.floor(Math.random() * neonColors.length);
  return neonColors[randomIndex];
};
