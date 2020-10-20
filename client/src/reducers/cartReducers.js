import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ADD_ITEM: {
      const item = payload;
      const existItem = state.cartItems.find(x => x.product === item.product);

      const cartItems = existItem
        ? state.cartItems.map(x => x.product === existItem.product ? item : x)
        : [...state.cartItems, item];

      return {
        ...state,
        cartItems
      }
    }

    case CART_REMOVE_ITEM: {
      const cartItems = state.cartItems.filter(x => x.product !== payload);
      return {
        ...state,
        cartItems
      }
    }
  
    default: {
      return state;
    }
  }
}