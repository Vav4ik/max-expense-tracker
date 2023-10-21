export const getFormattedDate = (date) =>
  `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })} ${date.getFullYear()}`;

export const getDateMinusDays = (date, days) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
