function calculateDayDifference(second, first = Date.now()) {
  const dayInterval = 1000 * 60 * 60 * 24;
  const floorToDay = (d) => Math.floor(d / dayInterval) * dayInterval;
  return Math.floor((floorToDay(second) - floorToDay(first)) / dayInterval);
}

function getCountdown(second, first = Date.now()) {
  const days = calculateDayDifference(second, first);
  if (days == 1) return 'Tomorrow';
  if (days == 0) return 'Today';
  if (days == -1) return 'Yesterday';
  if (days > 0) return `in ${days} days`;
  return `${Math.abs(days)} days ago`;
}

function getNights(second, first = Date.now()) {
  const days = calculateDayDifference(second, first);
  if (days == 1) return '1 night';
  if (days >= 0) return `${days} nights`;
  return `back to future`;
}

export { getNights, getCountdown };
