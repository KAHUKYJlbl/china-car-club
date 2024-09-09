export const getPaginationArray = (currentPage: number, pagesCount: number) => {
  if (pagesCount < 3) {
    return Array(pagesCount)
      .fill("")
      .map((_page, index) => index + 1);
  } else {
    switch (currentPage) {
      case 1:
        return [1, 2, 3];
      case pagesCount:
        return [pagesCount - 2, pagesCount - 1, pagesCount];
      default:
        return [currentPage - 1, currentPage, currentPage + 1];
    }
  }
};
