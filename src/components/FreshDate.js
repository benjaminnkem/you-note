const useNoteDate = (jsonStoredDate, onlyTime, onlyDate) => {
  let formattedDate = "";

  const date = new Date(jsonStoredDate);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  if (onlyTime === true && onlyDate !== true) {
    formattedDate = `${date.toLocaleTimeString()}`;
  } else if (onlyDate === true && onlyTime !== true) {
    formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  } else {
    formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${date.toLocaleTimeString()}`;
  }

  return { formattedDate };
};

export default useNoteDate;
