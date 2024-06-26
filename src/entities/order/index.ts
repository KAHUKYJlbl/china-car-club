export { Order } from './ui/order';
export { Calculation } from './ui/calculation';
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
} from './model/order-slice';
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
  getMycars,
  getMycarsLoadingStatus,
} from './model/order-selectors';
export { postOrder } from './model/api-actions/post-order';
export { postAnswers } from './model/api-actions/post-answers';
export { fetchMycars } from './model/api-actions/fetch-mycars';
