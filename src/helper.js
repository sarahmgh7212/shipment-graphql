function getDate(parsedDate) {
  const date = new Date(parsedDate.substring(0, 10));

  const stringifyDate = date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return stringifyDate;
}

function getTime(parsedTime) {
  const date = new Date(parsedTime);
  return date.toLocaleTimeString("en-US");
}

export { getDate, getTime };
