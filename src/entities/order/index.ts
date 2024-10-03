export {
  orderSlice,
  setCurrentTax,
  setAdd,
  toggleAdd,
  addItem,
  removeItem,
  increasePrice,
  decreasePrice,
  setCurrentColor,
  resetOrder,
  setQuestions,
} from "./model/order-slice";
export {
  getCurrentTax,
  getAdds,
  getAddItems,
  getAddItemsPrice,
  getCurrentColor,
  getCurrentOrder,
  getQuestionsLoadingStatus,
  getOrderLoadingStatus,
  getQuestions,
  getOffers,
  getOffersLoadingStatus,
} from "./model/order-selectors";
export { postUsedOrder } from "./model/api-actions/post-used-order";
export { postUsedAnswers } from "./model/api-actions/post-used-answers";
export { postOrder } from "./model/api-actions/post-order";
export { postAnswers } from "./model/api-actions/post-answers";
export { fetchOffers } from "./model/api-actions/fetch-offers";
export { Offers } from "./ui/offers";
