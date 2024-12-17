export const getContactProvider = (id: number) => {
  switch (id) {
    case 2:
      return "telegram";
    case 3:
      return "whatsapp";
    default:
      return "phone";
  }
};

export const getContactUrl = (id: number) => {
  switch (id) {
    case 2:
      return "https://t.me/";
    case 3:
      return "https://wa.me/";
    default:
      return "tel:+";
  }
};

export const getUrlTarget = (id: number) => {
  switch (id) {
    case 2:
    case 3:
      return "_blank";
    default:
      return "_self";
  }
};
