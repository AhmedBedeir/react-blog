const containerStyle =
  "container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-24 2xl:px-32";

const badgeStyles = [
  "badge-pink",
  "badge-blue",
  "badge-purple",
  "badge-green",
  "badge-red",
  "badge-yellow",
];
const handleResponseError = (error) => {
  if (error.response) {
    return error.response.data;
  } else if (error.request) {
    return "Network error, please try again later.";
  } else {
    return "An unexpected error occurred.";
  }
};
export { containerStyle, badgeStyles, handleResponseError };
