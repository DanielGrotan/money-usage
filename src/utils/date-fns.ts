export function unpackDate(date: Date) {
  const day = date.getUTCDate();
  const dayOfTheWeek = date.getUTCDay();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  return { day, dayOfTheWeek, month, year };
}
