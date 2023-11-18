// export const getFormattedDate = (date) =>
//   `${date.getDate()} ${date.toLocaleString("default", {
//     month: "long",
//   })} ${date.getFullYear()}`;

export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

export const getDateMinusDays = (date, days) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
