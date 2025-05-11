export const getDateDifferenceFromNow = (fromDate) => {
  let difference = new Date().getTime() - new Date(fromDate).getTime();
  difference = difference / 1000; // in seconds

  const units = [
    { label: "year", seconds: 3600 * 24 * 365 },
    { label: "month", seconds: 3600 * 24 * 30 },
    { label: "day", seconds: 3600 * 24 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const value = Math.floor(difference / unit.seconds);
    if (value > 0) {
      return `${value} ${unit.label}${value > 1 ? 's' : ''} ago`;
    }
  }

  return "just now";
};
