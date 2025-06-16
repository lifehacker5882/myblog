export const levels = [
  { level: 0, minimumPoint: 0 },
  { level: 1, minimumPoint: 50 },
  { level: 2, minimumPoint: 100 },
  { level: 3, minimumPoint: 250 },
  { level: 4, minimumPoint: 500 },
  { level: 5, minimumPoint: 1000 },
];

export const getLevels = (points: number): number => {
  let currentLevel = 0;
  for (const l of levels) {
    if (points >= l.minimumPoint) {
      currentLevel = l.level;
    } else {
      break;
    }
  }
  return currentLevel;
};
