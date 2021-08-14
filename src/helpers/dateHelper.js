export const dateToShow = (date, separator) => {
  const tDate = new Date(date);
  return `${tDate.getDate().toString().padStart(2, 0)}${separator}${(
    tDate.getMonth() + 1
  )
    .toString()
    .padStart(2, 0)}${separator}${tDate.getFullYear()}`;
};
