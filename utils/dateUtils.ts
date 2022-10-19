export const getMonth = (
  month: number
): { mm: string; MM: string; n: number } | undefined => {
  switch (month) {
    case 0:
      return { mm: "01", MM: "Enero", n: 1 };
    case 1:
      return { mm: "02", MM: "Febrero", n: 2 };
    case 2:
      return { mm: "03", MM: "Marzo", n: 3 };
    case 3:
      return { mm: "04", MM: "Abril", n: 4 };
    case 4:
      return { mm: "05", MM: "Mayo", n: 5 };
    case 5:
      return { mm: "06", MM: "Junio", n: 6 };
    case 6:
      return { mm: "07", MM: "Julio", n: 7 };
    case 7:
      return { mm: "08", MM: "Agosto", n: 8 };
    case 8:
      return { mm: "09", MM: "Septiembre", n: 9 };
    case 9:
      return { mm: "10", MM: "Octubre", n: 10 };
    case 10:
      return { mm: "11", MM: "Noviembre", n: 11 };
    case 11:
      return { mm: "12", MM: "Diciembre", n: 12 };
    default:
      getMonth(new Date().getMonth());
  }
};

export const getMonthNumber = (month: string): { n: number } => {
  switch (month.toLowerCase()) {
    case "enero":
      return { n: 1 };
    case "febrero":
      return { n: 2 };
    case "marzo":
      return { n: 3 };
    case "abril":
      return { n: 4 };
    case "mayo":
      return { n: 5 };
    case "junio":
      return { n: 6 };
    case "julio":
      return { n: 7 };
    case "agosto":
      return { n: 8 };
    case "septiembre":
      return { n: 9 };
    case "octubre":
      return { n: 10 };
    case "noviembre":
      return { n: 11 };
    case "diciembre":
      return { n: 12 };
    default:
      return { n: 13 };
  }
};

export const formatDate = (d?: Date): string => {
  const date = d || new Date();
  const year = date.getFullYear();
  const month = getMonth(date.getMonth())!.mm;
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  return `${year}-${month}-${day}`;
};
