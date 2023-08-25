export function getRankByPoints(points) {
  if (points >= 0 && points < 100) {
    return "Beginner";
  } else if (points >= 100 && points < 500) {
    return "Intermediate";
  } else if (points >= 500) {
    return "Advanced";
  }
}
