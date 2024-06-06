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
  getOrderLoadingStatus,
  getQuestions,
} from './model/order-selectors';
export { postOrder } from './model/api-actions/post-order';
export { postAnswers } from './model/api-actions/post-answers';
