export const getMonth = (
  month: number
): { mm: string; MM: string } | undefined => {
  switch (month) {
    case 0:
      return { mm: "01", MM: "January" };
    case 1:
      return { mm: "02", MM: "February" };
    case 2:
      return { mm: "03", MM: "March" };
    case 3:
      return { mm: "04", MM: "April" };
    case 4:
      return { mm: "05", MM: "May" };
    case 5:
      return { mm: "06", MM: "June" };
    case 6:
      return { mm: "07", MM: "July" };
    case 7:
      return { mm: "08", MM: "August" };
    case 8:
      return { mm: "09", MM: "September" };
    case 9:
      return { mm: "10", MM: "Octuber" };
    case 10:
      return { mm: "11", MM: "November" };
    case 11:
      return { mm: "12", MM: "December" };
    default:
      getMonth(new Date().getMonth());
  }
};

export const formatDate = (d?: Date): string => {
  const date = d || new Date();
  const year = date.getFullYear();
  const month = getMonth(date.getMonth())!.mm;
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  return `${year}-${month}-${day}`;
};
