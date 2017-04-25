// import { PRODUCT_LOAD_SUCCESS } from './constants'

const initialSate = {
  cart: []
}

const reducer = function productReducer (state = initialSate, action) {
  switch (action.type) {
    case 'ADD_TO_CART_SUCCESS':
      return {
        cart: [
          ...state.cart,
          action.payload
        ]
      }
    case 'REMOVE_FROM_CART_SUCCESS':
      // Do not mutate state (ie use splice)
      const index = state.cart.indexOf(action.payload);
      return {
        cart: [
          ...state.cart.slice(0, index),
          ...state.cart.slice(index + 1)
        ]
      }
    default:
      return state
  }
}

export default reducer