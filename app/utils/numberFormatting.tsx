export function formatLargeNumber(value: number) {
  if (value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(1)} t`;
  } else if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1) + "b";
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1) + "m";
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(1) + "k";
  } else {
    return value?.toString();
  }
}

export function formatPercentage(value: number) {
  // check if value is already in percentage format
  if (Math.abs(value) >= 1) {
    return `${value.toFixed(2)}%`;
  }
  // as a decimal and convert to percentage
  return `${(value * 100).toFixed(2)}%`;
}
