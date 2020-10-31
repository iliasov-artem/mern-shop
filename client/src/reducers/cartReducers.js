import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'

const initialState = {
  cartItems: [],
  shippingAddress: {}
}

export const cartReducer = (state = initialState, action) => {
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

    case CART_SAVE_SHIPPING_ADDRESS: {
      return {
        ...state,
        shippingAddress: payload
      }
    }

    case CART_SAVE_PAYMENT_METHOD: {
      return {
        ...state,
        paymentMethod: payload
      }
    }
  
    default: {
      return state;
    }
  }
}