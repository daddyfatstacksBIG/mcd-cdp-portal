export const groupThousands = (number, separator = ',') => {
  const parts = number.toString().split(".");
  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator) + (parts[1] ? `.${parts[1]}` : "");
}
