export const getDealerLogin = () => {
  console.log(window.location.origin);
  switch (window.location.origin) {
    case "https://import2.lixiangrussia.ru":
      return "E.N.CARS";
    case "https://import2.lixiangrussia.ru":
      return "Рольф Импорт";
    default:
      return "Chinacar.club";
  }
};
