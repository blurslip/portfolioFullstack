function capitalizeFirstLetter(str) {
  if (str.length === 0) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function capitalizeWords(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default capitalizeWords;
