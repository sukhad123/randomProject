{
  /*The utils returns the current Date and Time */
}

export const currentDate = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});
