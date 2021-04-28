import { CREATE_PRODUCT_INFO, PRODUCTS_INFO } from "./ActionTypes";

export function ProductsReducer(state = {}, action) {
  const { productsInfo, type } = action;

  switch (type) {
    case PRODUCTS_INFO:
      return productsInfo;
    default:
      return state;
  }
}

export function CreateProductReducer(state = {}, action) {
  const { createProductInfo, type } = action;

  switch (type) {
    case CREATE_PRODUCT_INFO:
      return createProductInfo;
    default:
      return state;
  }
}