export const getBasepath = (currentMode: number) => {
  switch (currentMode) {
    case 1:
      return window.location.pathname.slice(5) || "/";
    case 2:
      return `/used${window.location.pathname}`;
    default:
      return window.location.pathname.slice(5) || "/";
  }
};
