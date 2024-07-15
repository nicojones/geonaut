export const formatDate = (date: Date): string => {
  const pad = (num: number): string => num.toString().padStart(2, "0");

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  if (date.getHours() + date.getMinutes() === 0) {
    return `${day}-${month}-${year}`;
  }

  return `${hours}:${minutes} ${day}-${month}-${year}`;
};
