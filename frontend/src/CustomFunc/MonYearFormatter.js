function dateFormatter(date) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = date.split("-")[1];
  const year = date.split("-")[0];
  return (`${monthNames[parseInt(month) - 1]}-${year}`);
}
export default dateFormatter;
