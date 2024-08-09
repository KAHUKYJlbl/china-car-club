export const getDealer = () => {
  switch (window.location.origin) {
    case "https://import2.lixiangrussia.ru":
      return "E.N.CARS";
    case "https://import.lixiangrussia.ru":
      return "Рольф";
    default:
      return "Chinacar.club";
  }
};
