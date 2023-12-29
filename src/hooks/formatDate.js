export const formatDate = (inputDate) => {
  const parsedDate = new Date(inputDate);

  const day = parsedDate?.getDate();
  const monthIndex = parsedDate?.getMonth();
  const year = parsedDate?.getFullYear();

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName = monthNames[monthIndex];

  const formattedDate = `${day} ${monthName} ${year}`;

  return formattedDate;
};
