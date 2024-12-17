export {
  orderSlice,
  setCurrentTax,
  setAdd,
  toggleAdd,
  addItem,
  removeItem,
  increaseItemsPrice,
  decreaseItemsPrice,
  resetOrder,
  setQuestions,
  addOption,
  removeOption,
  increaseOptionsPrice,
  decreaseOptionsPrice,
  setCurrentColor,
  setAddColorPrice,
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
  getOffer,
  getOfferLoadingStatus,
  getAddedOptions,
  getAddedOptionsPrice,
  getCurrentColorPrice,
} from "./model/order-selectors";
export { postUsedOrder } from "./model/api-actions/post-used-order";
export { postUsedAnswers } from "./model/api-actions/post-used-answers";
export { postOrder } from "./model/api-actions/post-order";
export { postAnswers } from "./model/api-actions/post-answers";
export { fetchOffer } from "./model/api-actions/fetch-offer";
export { Offer } from "./ui/offer";
export type { OfferStateType } from "./lib/types";
